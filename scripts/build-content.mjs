/**
 * build-content.mjs
 * Turns content/publications/*.md into static JSON the site serves:
 *   public/content/publications.json            -> index (published only, newest first)
 *   public/content/publications/<slug>.json     -> { ...meta, html }
 *   public/share/<slug>.html                    -> crawler-friendly share stub (og tags + redirect)
 * Also regenerates public/sitemap.xml.
 *
 * Frontmatter: key: value lines between --- markers. Recognized keys:
 *   title, summary, date (YYYY-MM-DD), cover, status (published|draft)
 */
import { readdir, readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { marked } from 'marked';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SRC = path.join(ROOT, 'content', 'publications');
const OUT = path.join(ROOT, 'public', 'content');
const SHARE = path.join(ROOT, 'public', 'share');
const SITE = 'https://mehdibamou.com';

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return [{}, raw];
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return [meta, m[2]];
}

function readMinutes(markdown) {
  const words = markdown.replace(/[#>*`\-!\[\]()]/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function slugifyHeading(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Headings get ids + a hover anchor link, so sections are individually linkable.
const renderer = {
  heading({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    const plain = text.replace(/<[^>]+>/g, '');
    const id = slugifyHeading(plain);
    return `<h${depth} id="${id}">${text}<a class="h-anchor" href="#${id}" aria-label="Link to section: ${escapeHtml(plain)}">#</a></h${depth}>\n`;
  },
};

marked.use({ gfm: true, renderer });

const files = (await readdir(SRC)).filter((f) => f.endsWith('.md'));
const all = [];

for (const file of files) {
  const slug = file.replace(/\.md$/, '');
  const raw = await readFile(path.join(SRC, file), 'utf8');
  const [meta, body] = parseFrontmatter(raw);
  const html = marked.parse(body);
  all.push({
    slug,
    title: meta.title ?? slug,
    summary: meta.summary ?? '',
    coverImage: meta.cover ?? null,
    publishedAt: meta.date ? `${meta.date}T${meta.time ?? '09:00'}:00.000Z` : null,
    status: meta.status ?? 'draft',
    readMinutes: readMinutes(body),
    html,
  });
}

const published = all
  .filter((p) => p.status === 'published')
  .sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)));

await rm(OUT, { recursive: true, force: true });
await rm(SHARE, { recursive: true, force: true });
await mkdir(path.join(OUT, 'publications'), { recursive: true });
await mkdir(SHARE, { recursive: true });

// Index without html payloads
await writeFile(
  path.join(OUT, 'publications.json'),
  JSON.stringify(published.map(({ html, ...meta }) => meta))
);

// Detail files + share stubs (published only - drafts never ship)
for (const pub of published) {
  await writeFile(path.join(OUT, 'publications', `${pub.slug}.json`), JSON.stringify(pub));

  const url = `${SITE}/publications/${pub.slug}`;
  const img = pub.coverImage ? `${SITE}${pub.coverImage}` : `${SITE}/images/og-image.jpg`;
  const t = escapeHtml(pub.title);
  const d = escapeHtml(pub.summary);
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: pub.title,
    description: pub.summary,
    image: img,
    datePublished: pub.publishedAt,
    author: { '@type': 'Person', name: 'Mehdi Bamou', url: SITE },
    mainEntityOfPage: url,
  });
  const stub = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${t}</title>
<link rel="canonical" href="${url}">
<meta name="description" content="${d}">
<meta property="og:type" content="article">
<meta property="og:title" content="${t}">
<meta property="og:description" content="${d}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${img}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${t}">
<meta name="twitter:description" content="${d}">
<meta name="twitter:image" content="${img}">
<script type="application/ld+json">${jsonLd}</script>
<meta http-equiv="refresh" content="0;url=${url}">
<script>location.replace(${JSON.stringify(url)});</script>
</head>
<body><p>Redirecting to <a href="${url}">${t}</a>…</p></body>
</html>
`;
  await writeFile(path.join(SHARE, `${pub.slug}.html`), stub);
}

// RSS feed
const feedItems = published
  .map(
    (p) => `    <item>
      <title>${escapeHtml(p.title)}</title>
      <link>${SITE}/publications/${p.slug}</link>
      <guid isPermaLink="true">${SITE}/publications/${p.slug}</guid>
      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
      <description>${escapeHtml(p.summary)}</description>
    </item>`
  )
  .join('\n');
const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Mehdi Bamou</title>
    <link>${SITE}</link>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Essays and practical notes on enterprise architecture, governance, and technology in large organizations.</description>
    <language>en</language>
${feedItems}
  </channel>
</rss>
`;
await writeFile(path.join(ROOT, 'public', 'feed.xml'), feed);

// Sitemap
const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: `${SITE}/`, prio: '1.0' },
  { loc: `${SITE}/about`, prio: '0.8' },
  { loc: `${SITE}/publications`, prio: '0.9' },
  ...published.map((p) => ({ loc: `${SITE}/publications/${p.slug}`, prio: '0.7', date: String(p.publishedAt).slice(0, 10) })),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.date ?? today}</lastmod>\n    <priority>${u.prio}</priority>\n  </url>`).join('\n')}
</urlset>
`;
await writeFile(path.join(ROOT, 'public', 'sitemap.xml'), sitemap);

console.log(`content: ${published.length} published, ${all.length - published.length} draft(s), ${published.length} share stub(s), feed + sitemap ${urls.length} urls`);
