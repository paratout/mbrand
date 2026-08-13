# mehdibamou.com

Personal website of [Mehdi Bamou](https://www.linkedin.com/in/mehdi-bamou/) -
enterprise architecture, governance, and technology in large organizations.

Fully static: articles, library entries and glossary terms live as Markdown in
this repository, are compiled to JSON at build time, and ship as plain files on
Firebase Hosting. No database, no cookies, no tracking, no analytics.

## Stack

- **Frontend**: Angular 19 - standalone components, signals, zoneless, SCSS
- **Content**: Markdown under `content/`, compiled by `scripts/build-content.mjs` (marked)
- **Hosting**: Firebase Hosting

The build step also emits per-article Open Graph stubs under `public/share/`,
`sitemap.xml`, and `feed.xml`.

## Pages

| Route | What it is |
|---|---|
| `/` | Home, newest pieces first |
| `/publications` | The archive, sequenced as a curriculum rather than by writing date |
| `/publications/:slug` | One article |
| `/library` | Downloadable templates, workbooks and decks, plus every diagram |
| `/glossary` | A searchable dictionary of enterprise architecture terms |
| `/speaking` | Talks and workshops, grouped into four tracks |
| `/about` | Background |

## Content workflow

### Articles

One file per article: `content/publications/<slug>.md`. The file name is the URL slug.

```
---
title: The article title
summary: One or two sentences shown in lists and previews.
date: 2026-04-20          <- publication date, orders the archive
time: 09:20               <- optional, orders same-day pieces
updated: 2026-08-09       <- last-updated date
cover: /images/pub/<slug>/cover-v1.png
status: published         <- or "draft" (drafts never ship)
---

Markdown body. Images live in public/images/pub/<slug>/ and are referenced
with absolute paths: ![alt](/images/pub/<slug>/figure-v1.png)
```

Both dates are displayed. `date` drives ordering, the RSS `pubDate`, and JSON-LD
`datePublished`; `updated` drives `dateModified` and the sitemap `lastmod`.
Reading time is computed from the word count.

### Library

One file per entry, frontmatter only: `content/library/<slug>.md`.

```
---
title: Object Model Workbook
description: One or two sentences.
category: tool            <- or "article-resource" for diagrams
file: /files/data-object-model-workbook.xlsx
filetype: XLSX
related: data-strategy-object-model
order: 19
---
```

File sizes are read from disk at build time, so they never go stale.

### Glossary

A single file, `content/glossary.md`, structured as `# Category` sections each
holding `## Term` entries with a one-paragraph body.

```
# Integration

## Idempotency
The property that processing the same message twice has the same effect as
processing it once. Unglamorous, and the difference between a bad night and a
boring morning.
```

The build emits `{ categories, terms }`, where each term carries its category,
rendered HTML, and a plain-text field used by the search on the page.

## Development

```bash
npm install
npm start          # content build + dev server on :4200
npm run content    # regenerate public/content/*, sitemap.xml and feed.xml only
```

`npm run content` runs automatically as part of `npm run build`.

## Deploy

```bash
npm run deploy     # content build + ng build + firebase deploy --only hosting
```

Requires a Firebase-authenticated CLI (`npx firebase-tools login`).

## Repository notes

- `firestore.rules` / `storage.rules` protect legacy Firestore and Storage data;
  the site itself no longer reads or writes Firestore.
- A deployed Cloud Function `subscribeNewsletter` exists in the Firebase project
  but is deliberately not wired into the site - it would contradict the footer.
- Everything under `public/content/`, `public/share/`, `public/sitemap.xml` and
  `public/feed.xml` is generated. Never hand-edit it.

## Licence

The code in this repository is free to reuse. The written content, the
illustrations, and the downloadable artifacts are the author's own work -
the artifacts in `/library` are explicitly free to use and adapt.
