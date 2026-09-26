import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import PDFDocument from 'pdfkit';
import { site } from '../data/site';
import { education, experience, skills } from '../data/resume';

// Read from the project root: the build and dev server both run there, and bundling would break module-relative paths.
const fontDir = join(process.cwd(), 'src/assets/fonts');
const fonts = {
  regular: readFileSync(join(fontDir, 'Inter-Regular.ttf')),
  bold: readFileSync(join(fontDir, 'Inter-Bold.ttf')),
  italic: readFileSync(join(fontDir, 'Inter-Italic.ttf')),
};

const color = { fg: '#0f172a', muted: '#475569', accent: '#2563eb', rule: '#cbd5e1' };
const margin = 36;
const maxFontSize = 10;
const minFontSize = 7;
const fontSizeStep = 0.25;

type Doc = InstanceType<typeof PDFDocument>;

function createDoc(): Doc {
  const doc = new PDFDocument({
    size: 'A4',
    margin,
    bufferPages: true,
    info: { Title: `${site.name} – Resume`, Author: site.name },
  });
  doc.registerFont('regular', fonts.regular);
  doc.registerFont('bold', fonts.bold);
  doc.registerFont('italic', fonts.italic);
  return doc;
}

/** Writes `left` and a right-aligned `right` on the same line, then moves below the taller of the two. */
function splitLine(doc: Doc, left: string, right: string, size: number, lineGap: number) {
  const x = margin;
  const y = doc.y;
  const width = doc.page.width - margin * 2;
  doc.font('regular').fontSize(size * 0.9).fillColor(color.muted);
  const rightWidth = doc.widthOfString(right);
  doc.text(right, x, y, { width, align: 'right', lineGap });
  const rightBottom = doc.y;
  doc.font('bold').fontSize(size * 1.05).fillColor(color.fg);
  doc.text(left, x, y, { width: width - rightWidth - 12, lineGap });
  doc.y = Math.max(doc.y, rightBottom);
}

function layout(doc: Doc, size: number) {
  const width = doc.page.width - margin * 2;
  const lineGap = size * 0.2;
  const gap = size * 0.45;

  const heading = (title: string) => {
    doc.moveDown(0.6);
    doc.font('bold').fontSize(size * 1.05).fillColor(color.accent).text(title.toUpperCase(), margin, doc.y, {
      width,
      characterSpacing: 0.6,
    });
    const y = doc.y + 1;
    doc.moveTo(margin, y).lineTo(margin + width, y).lineWidth(0.5).strokeColor(color.rule).stroke();
    doc.y = y + gap;
  };

  // Header
  doc.font('bold').fontSize(size * 2.2).fillColor(color.fg).text(site.name, margin, margin, { width });
  doc.font('regular').fontSize(size).fillColor(color.muted);
  doc.text(`${site.role} · ${site.location} · `, { continued: true, lineGap });
  doc.fillColor(color.accent).text(site.email, { link: `mailto:${site.email}`, continued: true });
  site.socials.forEach(({ href }, index) => {
    doc.fillColor(color.muted).text(' · ', { link: null, continued: true });
    doc.fillColor(color.accent).text(href.replace(/^https:\/\/(www\.)?/, ''), {
      link: href,
      continued: index < site.socials.length - 1,
    });
  });

  heading('Summary');
  doc.font('regular').fontSize(size).fillColor(color.fg).text(site.summary, { width, lineGap });

  heading('Experience');
  experience.forEach((item, index) => {
    if (index > 0) doc.moveDown(0.7);
    splitLine(doc, `${item.role} · ${item.company}`, item.period, size, lineGap);
    doc.moveDown(0.15);
    if (item.summary) {
      doc.font('italic').fontSize(size).fillColor(color.muted).text(item.summary, margin, doc.y, { width, lineGap });
      doc.moveDown(0.2);
    }
    doc.font('regular').fontSize(size).fillColor(color.fg);
    for (const highlight of item.highlights) {
      const y = doc.y;
      doc.text('•', margin + 2, y, { lineGap });
      doc.text(highlight, margin + size * 1.2, y, { width: width - size * 1.2, lineGap });
      doc.moveDown(0.1);
    }
  });

  heading('Skills');
  for (const { category, items } of skills) {
    doc.font('bold').fontSize(size).fillColor(color.fg).text(`${category}: `, margin, doc.y, { continued: true, lineGap });
    doc.font('regular').text(items.join(', '), { width, lineGap });
  }

  heading('Education');
  for (const { degree, school, period } of education) {
    splitLine(doc, `${degree} · ${school}`, period, size, lineGap);
  }
}

/**
 * Renders the resume as a single A4 page, shrinking the base font size until everything fits.
 * Fails the build instead of silently producing a second page.
 */
export async function renderResumePdf(): Promise<Uint8Array<ArrayBuffer>> {
  for (let size = maxFontSize; size >= minFontSize; size -= fontSizeStep) {
    const doc = createDoc();
    layout(doc, size);
    if (doc.bufferedPageRange().count > 1) continue;

    const chunks: Buffer[] = [];
    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    const done = new Promise<void>((resolve) => doc.on('end', resolve));
    doc.end();
    await done;
    return new Uint8Array(Buffer.concat(chunks));
  }
  throw new Error(`Resume does not fit on one A4 page even at ${minFontSize}pt; shorten src/data/resume.ts.`);
}
