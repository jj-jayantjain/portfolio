# Jayant Jain — Portfolio

A premium, multi-page consulting portfolio built in plain HTML, CSS and JavaScript — no build step, no framework, deployable to GitHub Pages (or any static host) as-is.

**Design concept:** "Blueprint & Blocks" — grounded in Adobe Edge Delivery Services' own mental model of pages assembled from modular, named content blocks. Steel-blue schematic lines, brass annotation accents, registration-mark corner details, and a mono "block-tag" labeling system throughout.

## Structure

```
├── index.html              Home — concise overview, links out to every detail page
├── about.html               Story, mission/vision, core strengths, values
├── experience.html          Full accordion timeline — all 8 engagements
├── projects.html            Filterable/searchable case studies (tech, client, year)
├── skills.html               Categorized skills with animated proficiency bars
├── clients.html              Client roster — click through to filtered projects
├── services.html             Services offered + engagement process
├── achievements.html         Stat counters + achievement cards
├── certifications.html       Certifications (sample/in-progress, clearly marked)
├── education.html            Degree + continuing education
├── blog.html                 Sample articles, expandable (swap for real CMS later)
├── contact.html               Contact info, form (mailto-based), map placeholder
├── resume.html                View/download résumé (PDF + DOCX included)
├── css/style.css             Full design system (tokens, components, animations)
├── js/main.js                Theme toggle, nav, reveal animations, counters, forms
├── js/projects.js            Projects page filter/search/expand logic
├── assets/resume/            Generated résumé — Jayant_Jain_Resume.pdf / .docx
├── assets/og-cover.png       Social share image
├── fragments/                Source partials + build.py (see "Editing" below)
├── robots.txt, sitemap.xml, site.webmanifest
```

## Editing content

Every page was assembled from `fragments/` by `build.py`. If you only need to tweak
text or fix a typo, it's simplest to **edit the final `.html` file directly** — header,
footer and nav are duplicated across pages on purpose so the site works with zero
build step (just open any `.html` file in a browser).

If you're making a structural change that should apply to *every* page (e.g. a new
nav item, a footer link, a new icon), edit the matching file in `fragments/` and
re-run the builder:

```bash
python3 build.py
```

This regenerates all 13 `.html` files from `fragments/page-template.html` +
`fragments/header.html` + `fragments/footer.html` + `fragments/icons.html` +
each page's `fragments/body-*.html`. It's a plain Python 3 script — no dependencies.

## Before you publish — placeholder checklist

This site was generated from a resume that didn't include contact details, a
photo, or certifications, so realistic **sample data was used and marked** in a
few places. Search each file for `PLACEHOLDER` (HTML comments) to find every
spot, or just work through this list:

- [ ] **Contact details** — replace the sample email (`hello@jayantjain.dev`),
      phone, LinkedIn and GitHub URLs in `fragments/header.html`,
      `fragments/footer.html`, `fragments/body-contact.html`, and `js/main.js`
      (`CONTACT_EMAIL` constant), then re-run `build.py`.
- [ ] **Photo** — replace the initials avatar in `about.html` with a real headshot
      at `assets/headshot.jpg`.
- [ ] **Résumé** — `assets/resume/Jayant_Jain_Resume.docx` was generated fresh from
      your project history (not the original confidential client-branded file).
      Update contact details inside it, re-export to PDF, and replace both files
      in `assets/resume/`.
- [ ] **Certifications** — `certifications.html` clearly flags sample entries;
      replace with your verified credentials and (optionally) badge links.
- [ ] **Education dates** — `education.html` marks the degree years as estimated;
      confirm and update.
- [ ] **Blog posts** — `blog.html` ships with 6 sample articles; replace with real
      writing, or wire up a headless CMS (the markup is CMS-migration-ready).
- [ ] **Client logos** — client tiles currently use styled text wordmarks (no
      real logo files were available). Swap in real SVG/PNG logos under
      `assets/clients/` if you have permission to use them.
- [ ] **Domain** — `jayantjain.dev` is used as a placeholder domain throughout
      (canonical URLs, sitemap.xml, robots.txt, JSON-LD). Update to your real
      domain before publishing.

## Deploying to GitHub Pages

1. Push this folder to a GitHub repository (root of the repo, or a `/docs` folder).
2. In the repo, go to **Settings → Pages**.
3. Under **Source**, choose the branch (e.g. `main`) and folder (`/` or `/docs`).
4. Save — GitHub will publish at `https://<username>.github.io/<repo>/`.
5. Update `sitemap.xml`, `robots.txt`, `site.webmanifest` and the canonical/OG
   URLs in each page's `<head>` to match your real GitHub Pages (or custom) URL.

No build step, no `npm install`, no server required — it's static HTML/CSS/JS.

## Features implemented

- Dark/light theme — manual toggle + auto system-preference detection, persisted via `localStorage`
- Fully responsive — mobile, tablet, laptop, desktop, ultra-wide
- Scroll-reveal animations, animated counters, staggered card reveals (all respect `prefers-reduced-motion`)
- Filterable, searchable project case studies (technology / client / year)
- Client → filtered-projects deep linking
- Accordion timeline (experience) and expandable article cards (blog)
- Accessible: skip link, visible focus states, semantic landmarks, alt text
- SEO: per-page meta/OG/Twitter tags, canonical URLs, JSON-LD Person schema, sitemap.xml, robots.txt
- Zero external JS dependencies — only Google Fonts (progressive enhancement; falls back to system fonts offline)
