import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { absoluteUrl, getPrerenderPages, getSitemapEntries } from '../src/seo.js';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const distDir = join(root, 'dist');

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function setMeta(html, attr, key, content) {
  const re = new RegExp(`<meta ${attr}="${key}" content="[^"]*"`, 'i');
  const tag = `<meta ${attr}="${key}" content="${escapeHtml(content)}"`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace('</head>', `    ${tag} />\n  </head>`);
}

function setCanonical(html, href) {
  const re = /<link rel="canonical" href="[^"]*"/i;
  const tag = `<link rel="canonical" href="${escapeHtml(href)}"`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace('</head>', `    ${tag} />\n  </head>`);
}

function replaceJsonLd(html, blocks) {
  const scripts = blocks
    .map(data => `    <script type="application/ld+json">\n${JSON.stringify(data, null, 6)}\n    </script>`)
    .join('\n');
  const stripped = html.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
  if (!scripts) return stripped;
  return stripped.replace('</head>', `${scripts}\n  </head>`);
}

function injectNoscript(html, page) {
  const noscript = `    <noscript>
      <main>
        <h1>${escapeHtml(page.title)}</h1>
        <p>${escapeHtml(page.description)}</p>
        <p><a href="/contact">Contact</a> · <a href="/pricing">Pricing</a> · <a href="/services">Services</a></p>
      </main>
    </noscript>
`;
  if (html.includes('<noscript>')) {
    return html.replace(/<noscript>[\s\S]*?<\/noscript>\n?/, noscript);
  }
  return html.replace('<div id="root"></div>', `<div id="root"></div>\n${noscript}`);
}

function applyPage(html, page) {
  const url = absoluteUrl(page.path);
  const image = page.image.startsWith('http') ? page.image : absoluteUrl(page.image);

  let next = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
  next = setMeta(next, 'name', 'description', page.description);
  next = setMeta(next, 'name', 'robots', page.robots);
  next = setCanonical(next, url);
  next = setMeta(next, 'property', 'og:title', page.title);
  next = setMeta(next, 'property', 'og:description', page.description);
  next = setMeta(next, 'property', 'og:url', url);
  next = setMeta(next, 'property', 'og:type', page.type);
  next = setMeta(next, 'property', 'og:image', image);
  next = setMeta(next, 'property', 'og:image:alt', page.imageAlt);
  next = setMeta(next, 'name', 'twitter:title', page.title);
  next = setMeta(next, 'name', 'twitter:description', page.description);
  next = setMeta(next, 'name', 'twitter:image', image);
  next = setMeta(next, 'name', 'twitter:image:alt', page.imageAlt);
  next = replaceJsonLd(next, page.jsonLd || []);
  next = injectNoscript(next, page);
  return next;
}

function outFileFor(path) {
  if (path === '/') return join(distDir, 'index.html');
  return join(distDir, path.replace(/^\//, ''), 'index.html');
}

function sitemapXml(entries) {
  const urls = entries
    .map(entry => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export function stampHtml() {
  const template = readFileSync(join(distDir, 'index.html'), 'utf8');
  const pages = getPrerenderPages();
  const titles = new Set();

  for (const page of pages) {
    if (titles.has(page.title)) {
      throw new Error(`Duplicate title for ${page.path}: ${page.title}`);
    }
    titles.add(page.title);
    const html = applyPage(template, page);
    const file = outFileFor(page.path);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    if (!canonical || !canonical.startsWith('https://www.ebookwriters.us')) {
      throw new Error(`Bad canonical on ${page.path}: ${canonical}`);
    }
    if (!title || title !== escapeHtml(page.title)) {
      throw new Error(`Title mismatch on ${page.path}: ${title}`);
    }
  }

  writeFileSync(join(distDir, 'sitemap.xml'), sitemapXml(getSitemapEntries()));

  const home = readFileSync(join(distDir, 'index.html'), 'utf8');
  const contact = readFileSync(join(distDir, 'contact/index.html'), 'utf8');
  const homeTitle = home.match(/<title>([^<]+)<\/title>/)[1];
  const contactTitle = contact.match(/<title>([^<]+)<\/title>/)[1];
  if (homeTitle === contactTitle) throw new Error('Home and contact share a title in built HTML');
  if (contact.includes('"@type": "FAQPage"')) {
    throw new Error('Contact HTML still contains homepage FAQ JSON-LD');
  }
  const contactOg = contact.match(/<meta property="og:url" content="([^"]+)"/i)?.[1];
  if (contactOg !== 'https://www.ebookwriters.us/contact') {
    throw new Error(`Contact og:url is ${contactOg}`);
  }

  console.log(`Stamped unique HTML for ${pages.length} routes (www host).`);
}

const invoked = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (invoked) stampHtml();
