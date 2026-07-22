# mehdibamou.com

Personal website of Mehdi Bamou - organization, governance & technology.

Fully static site: articles live as Markdown in this repository, are compiled
to JSON at build time, and ship as plain files on Firebase Hosting.
No database, no cookies, no tracking.

## Stack

- **Frontend**: Angular 19 (standalone components, signals, SCSS)
- **Content**: Markdown in `content/publications/`, compiled by `scripts/build-content.mjs` (marked)
- **Hosting**: Firebase Hosting (project `mbamou-2fc1b`)

## Content workflow

Each article is one file: `content/publications/<slug>.md`. The file name is the URL slug.

```
---
title: The article title
summary: One or two sentences shown in lists and previews.
date: 2026-07-22
cover: /images/pub/<slug>/cover.png
status: published        <- or "draft" (drafts never ship)
---

Markdown body. Images go in public/images/pub/<slug>/ and are referenced
with absolute paths: ![alt](/images/pub/<slug>/figure.png)
```

To edit an article: change the `.md` file, then build & deploy. That's all.

`npm run content` regenerates `public/content/*` and `public/sitemap.xml`.
It runs automatically as part of `npm run build`.

## Development

```bash
npm install
npm start          # content build + dev server on :4200
```

## Deploy

```bash
npm run deploy     # content build + ng build + firebase deploy --only hosting
```

Requires a Firebase-authenticated CLI (`npx firebase-tools login`).

## Repository notes

- `firestore.rules` / `storage.rules` protect legacy Firestore/Storage data;
  the site itself no longer reads or writes Firestore.
- A deployed Cloud Function `subscribeNewsletter` exists in the Firebase
  project but is not yet wired into the site.
