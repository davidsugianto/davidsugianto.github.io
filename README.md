# davidsugianto.github.io

Personal site of David Sugianto, served at <https://davidsugianto.github.io>.

Built with [Astro](https://astro.build) 7 as a fully static site: a single-page Home (About, Projects, Experience, Education, latest posts), Blog, RSS (`/rss.xml`), a sitemap (`/sitemap-index.xml`), and a one-page resume PDF (`/DAVID_SUGIANTO_RESUME.pdf`).

## Development

Requires Node.js 22.12 or newer.

```sh
npm install      # install dependencies
npm run dev      # dev server at http://localhost:4321
npm run build    # type-check (astro check) and build to dist/
npm run preview  # serve the built dist/
```

## Content

- `src/data/site.ts` — profile: name, role, summary, email, social links.
- `src/data/resume.ts` — experience, skills, education (Home page sections and the resume PDF).
- `src/data/portfolio.ts` — portfolio projects (Home page Projects section).
- `src/content/blog/*.md` — blog posts. The file name becomes the URL (`/blog/<file-name>/`).

The resume PDF is generated at build time from `src/data/site.ts` and `src/data/resume.ts` by `src/lib/resume-pdf.ts` (pdfkit, Inter font in `src/assets/fonts/`). It is always a single A4 page: the font size shrinks until everything fits, and the build fails if the content cannot fit at 7pt.

Blog post frontmatter:

```md
---
title: My first post
description: One-line summary shown in the post list and RSS feed.
pubDate: 2026-09-01
# updatedDate: 2026-09-15
draft: false
---

Post body in Markdown.
```

Posts with `draft: true` show up in `npm run dev` but are excluded from production builds and the RSS feed.

## Deployment

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages.

One-time repository setting: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Terminal-style design inspired by [ponytail.dev](https://ponytail.dev).
