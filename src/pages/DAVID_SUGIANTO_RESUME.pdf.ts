import type { APIRoute } from 'astro';
import { renderResumePdf } from '../lib/resume-pdf';

export const GET: APIRoute = async () =>
  new Response(await renderResumePdf(), { headers: { 'Content-Type': 'application/pdf' } });
