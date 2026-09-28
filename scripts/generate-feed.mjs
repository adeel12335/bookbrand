/**
 * Write dist/rss.xml from the blog articles baked into src/generated/posts.js.
 * Runs after prerender in `npm run build`, so the feed always matches the
 * articles the same build shipped. Answer engines and AI crawlers use the
 * feed for discovery; index.html advertises it with a rel="alternate" link.
 */
import { writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const { posts } = await import(new URL('../src/generated/posts.js', import.meta.url));
const { SITE_ORIGIN } = await import(new URL('../src/site.js', import.meta.url));
const { BLOG_REDIRECTS } = await import(new URL('../src/blogRedirects.js', import.meta.url));

const esc = s => String(s || '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/\*\*/g, '');

const items = posts
  .filter(post => !BLOG_REDIRECTS[post.slug])
  .map(post => {
    const url = `${SITE_ORIGIN}/blog/${post.slug}`;
    const pubDate = new Date(`${post.date}T12:00:00Z`).toUTCString();
    return `    <item>
      <title>${esc(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${esc(post.category)}</category>
      <description>${esc(post.description)}</description>
    </item>`;
  })
  .join('\n');

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ebook Writing &amp; Ghostwriting Blog — ebookwriters.us</title>
    <link>${SITE_ORIGIN}/blog</link>
    <atom:link href="${SITE_ORIGIN}/rss.xml" rel="self" type="application/rss+xml"/>
    <description>Guides on ghostwriting, ebook writing costs, Amazon KDP publishing, and hiring writers — from the ebookwriters.us studio.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

const distDir = join(root, 'dist');
if (!existsSync(distDir)) {
  console.error('[feed] dist/ not found — run after `vite build`.');
  process.exit(1);
}
writeFileSync(join(distDir, 'rss.xml'), feed, 'utf8');
console.log(`[feed] wrote dist/rss.xml with ${posts.length} item(s).`);
