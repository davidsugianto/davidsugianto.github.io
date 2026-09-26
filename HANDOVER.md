# Handover — davidsugianto.github.io

State as of commit `9dd7c14` on `master` (pushed 2026-09-26).

## What the site is
- Astro 7 static site, deployed to GitHub Pages at https://davidsugianto.github.io.
- Design ported from [devportfolio](https://github.com/RyanFitzgerald/devportfolio) (MIT, `LICENSE-devportfolio.md`), in plain CSS (no Tailwind), IBM Plex Mono via `@fontsource/ibm-plex-mono`, dark/light toggle.
- Routes: `/` (one-pager), `/blog/`, `/blog/<id>/`, `/404`, `/rss.xml`, `/sitemap-index.xml`, `/DAVID_SUGIANTO_RESUME.pdf` (generated at build).
- Old Jekyll site was removed in `9dd7c14`, including `CNAME` (no custom domain now).

## Run / build / deploy
```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # astro check + build to dist/
npm run preview  # serves dist/ (detached; stop: npx astro preview stop)
```
Push to `master` → `.github/workflows/deploy.yml` (withastro/action) → Pages.
Repo setting required once: Settings → Pages → Source: **GitHub Actions**. Not yet confirmed that the first run succeeded (gh CLI here is not authenticated) — check the Actions tab.

## Where content lives
| File | Drives |
|---|---|
| `src/data/site.ts` | name, `role` (“Platform Engineer”: hero, footer, page title, PDF), email, summary (About + PDF), socials (`icon: 'github' \| 'linkedin'`), `description` (meta) |
| `src/data/resume.ts` | `experience` (Experience section + PDF), `skills` (About chips, flattened; PDF by category), `education` |
| `src/data/portfolio.ts` | projects: `description` shown on cards; `context`/`solution`/`impact` kept but not rendered |
| `src/content/blog/*.md` | posts (frontmatter: title, description, pubDate, updatedDate?, draft?) |

## Page structure
- `src/pages/index.astro`: Hero → About → Projects → Experience → Education → LatestPosts (renders only if posts exist).
- Components in `src/components/`: `Hero`, `About`, `Projects`, `Experience`, `Education`, `LatestPosts`, `Section` (4/8 grid wrapper), `SectionTitle` (heading + accent bar), `SocialIcons`, `Header`, `Footer`, `ThemeToggle`.
- `src/styles/global.css`: theme tokens (`--bg --fg --muted --border --surface --accent --chip --shadow-*`), `.container.page` wrapper for non-home pages, shared `.timeline-card` and `.bullets`.
- `src/lib/resume-pdf.ts`: pdfkit, single A4 page; shrinks font to fit, build fails below 7pt.

## Decisions made (owner-approved)
- Header nav: About, Projects, Experience, Education + theme toggle. Blog and Resume links removed from header; footer nav has the same 4 links, no Blog/RSS, no “design adapted from” credit (attribution stays in README + `LICENSE-devportfolio.md`).
- Hero keeps the “Download resume (PDF)” button.
- Sections are full width (no max-width), matching the template. Section title size is fluid at ≥1024px: `min(4.5rem, calc(100vw / 18 - 19px))` so “Experience” never overflows its 4-column cell (IBM Plex Mono = 0.6em/glyph).
- Hero top padding is 9rem below 768px (wrapped mobile nav is ~135px tall).
- About = summary paragraph + one flat chip list (27 skills).
- Project cards = number, title, short description, stack chips. Descriptions were drafted by the assistant from existing text; owner may still revise.
- `Experience.summary` is optional; Experience section and PDF skip missing summary/empty highlights.

## Open items
1. **Cekat.AI entry** (`src/data/resume.ts`, first `experience` item): currently `summary: 'In progress — details coming soon.'`, `highlights: []`. Owner will supply real summary/highlights. A draft (inferred from Cekat.AI’s public product info, not confirmed) was proposed: platform/infra for the omnichannel AI customer-service product — K8s/IaC, CI/CD, observability across WhatsApp/Instagram/Facebook/LiveChat, LLM/cloud cost tracking, on-call/runbooks, internal tooling. Needs owner’s real tools and tasks before use.
2. ByteDance role still reads “Site Reliability Engineer” (actual job title, intentionally kept). `site.description` (meta) still starts with “Site Reliability Engineer…” — ask owner whether to change.
3. Verify first GitHub Actions deploy succeeded and live site shows the new design.
4. Blog has no posts; `/blog/` and `/rss.xml` exist but are unlinked from nav.

## Verification tips
- After content edits: `npm run build` must report 0 errors; check `dist/index.html` and `dist/DAVID_SUGIANTO_RESUME.pdf`.
- Browser checks: the omp browser relay is not connected on this machine; install a throwaway Chrome with `npx -y @puppeteer/browsers install chrome@stable --path /tmp/cft` and open it via `app.path` with `--headless=new`; set viewport with Puppeteer `page.setViewport` (the `viewport` open option did not apply). Remove `/tmp/cft` after.
- The file reader may return a stale extraction of a rebuilt PDF; copy it to a new path to read fresh text.
