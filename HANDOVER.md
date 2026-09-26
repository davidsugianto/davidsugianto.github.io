# Handover — davidsugianto.github.io

State as of commit `0b4fbaa` on `master` (pushed 2026-09-26): terminal-style redesign (ponytail.dev look), built and browser-verified before push.

## What the site is
- Astro 7 static site, deployed to GitHub Pages at https://davidsugianto.github.io.
- Terminal/code-editor design inspired by [ponytail.dev](https://ponytail.dev), in plain CSS (no Tailwind), JetBrains Mono via `@fontsource-variable/jetbrains-mono`, dark/light toggle (dark default on first visit; choice stored in `localStorage.theme`).
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
| `src/data/site.ts` | name, `role` (“Platform Engineer”: hero, page title, PDF), `location` (hero), email, avatar (hero + footer), summary (About + PDF), socials (hero + footer buttons), `description` (meta + hero `//` sub-line) |
| `src/data/resume.ts` | `experience` (Experience panels + PDF), `skills` (About tag list, flattened; PDF by category), `education` |
| `src/data/portfolio.ts` | projects: `description` shown on cards; `context`/`solution`/`impact` kept but not rendered |
| `src/content/blog/*.md` | posts (frontmatter: title, description, pubDate, updatedDate?, draft?) |

## Page structure
- `src/pages/index.astro`: Hero → About → Projects → Experience → Education → LatestPosts (renders only if posts exist).
- Components in `src/components/`: `Hero`, `About`, `Projects`, `Experience`, `Education`, `LatestPosts`, `Section` (`## label` heading derived from `title`, e.g. “About Me” → `about_me`), `Header` (sticky editor chrome: dots, `~/davidsugianto`, `*.md` section tabs with scroll-spy, theme button), `Footer`, `ThemeToggle`.
- `src/styles/global.css`: theme tokens (`--bg --panel --chrome --fg --dim --faint --line --grn --red --amber --mono`), `.wrap` (820px column), `.page` (non-home pages), `.label`, `.cur` (blinking cursor), `.btn` (`[ bracket ]` buttons; `.fill` = solid), `.rows` (hairline list used by Education, posts, blog index), `.dim`, `.cmt`.
- `src/lib/resume-pdf.ts`: pdfkit, single A4 page; shrinks font to fit, build fails below 7pt.

## Decisions made (owner-approved)
- Header tabs: about.md, projects.md, experience.md, education.md + theme toggle. Blog and Resume stay out of the header; footer nav has the same 4 links, no Blog/RSS.
- Hero: GitHub avatar, name + blinking cursor, role · location, `//` description, `[ download resume ]` + email/github/linkedin buttons.
- Single 820px column; sections separated by 1px hairlines.
- About = summary paragraph + one flat skill tag list (27 skills).
- Projects = numbered ladder (01, 02, …): title, short description, stack. Descriptions were drafted by the assistant from existing text; owner may still revise.
- Experience = one diff-style panel per job (company/period bar, role, `//` summary, green `+` highlights).
- `Experience.summary` is optional; Experience section and PDF skip missing summary/empty highlights.

## Open items
1. **Cekat.AI entry** (`src/data/resume.ts`, first `experience` item): currently `summary: 'In progress — details coming soon.'`, `highlights: []`. Owner will supply real summary/highlights. A draft (inferred from Cekat.AI’s public product info, not confirmed) was proposed: platform/infra for the omnichannel AI customer-service product — K8s/IaC, CI/CD, observability across WhatsApp/Instagram/Facebook/LiveChat, LLM/cloud cost tracking, on-call/runbooks, internal tooling. Needs owner’s real tools and tasks before use.
2. ByteDance role still reads “Site Reliability Engineer” (actual job title, intentionally kept). `site.description` (meta + hero sub-line) still starts with “Site Reliability Engineer…” while `role` is “Platform Engineer” — ask owner whether to change.
3. Verify the GitHub Actions deploy of `0b4fbaa` succeeded and the live site shows the redesign (first-ever deploy also still unconfirmed).
4. Blog has no posts; `/blog/` and `/rss.xml` exist but are unlinked from nav.

## Verification tips
- After content edits: `npm run build` must report 0 errors; check `dist/index.html` and `dist/DAVID_SUGIANTO_RESUME.pdf`.
- Browser checks: the omp browser relay is not connected on this machine; install a throwaway Chrome with `npx -y @puppeteer/browsers install chrome@stable --path /tmp/cft` and open it via `app.path` with `--headless=new`; set viewport with Puppeteer `page.setViewport` (the `viewport` open option did not apply). Remove `/tmp/cft` after.
- The file reader may return a stale extraction of a rebuilt PDF; copy it to a new path to read fresh text.
