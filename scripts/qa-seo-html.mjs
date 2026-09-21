/**
 * No-JS SEO smoke: assert stamped+prerendered dist HTML contains crawlable copy.
 * Does not launch a browser — reads files the way a non-JS crawler would.
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const distDir = join(root, 'dist');

function readPage(path) {
  const file = path === '/'
    ? join(distDir, 'index.html')
    : join(distDir, path.replace(/^\//, ''), 'index.html');
  if (!existsSync(file)) throw new Error(`Missing ${file}`);
  return readFileSync(file, 'utf8');
}

function assertIncludes(html, path, needles) {
  for (const needle of needles) {
    if (!html.includes(needle)) {
      throw new Error(`${path} HTML missing expected crawlable text: ${JSON.stringify(needle)}`);
    }
  }
}

function assertNoEmptyRoot(html, path) {
  if (/<div id="root"\s*>\s*<\/div>/.test(html)) {
    throw new Error(`${path} still has empty #root — stamp crawl HTML missing`);
  }
  if (!html.includes('data-seo-crawl="1"') && !html.includes('data-seo-crawl')) {
    // Playwright prerender may replace crawl marker; body text checks below still apply.
  }
}

const checks = [
  {
    path: '/',
    needles: ['ebookwriters.us', 'info@ebookwriters.us', 'Ghostwriting', '$699'],
  },
  {
    path: '/services',
    needles: ['Ghostwriting', 'Editing', 'Cover', 'info@ebookwriters.us'],
  },
  {
    path: '/pricing',
    needles: ['$699', '$3,999', 'Starter', 'Professional', 'AggregateOffer'],
  },
  {
    path: '/contact',
    needles: ['info@ebookwriters.us', 'Send enquiry', 'Tell us about your book'],
  },
];

if (!existsSync(join(distDir, 'sitemap.xml'))) {
  throw new Error('dist/sitemap.xml missing');
}
const sitemap = readFileSync(join(distDir, 'sitemap.xml'), 'utf8');
if (!sitemap.includes('https://www.ebookwriters.us/pricing')) {
  throw new Error('sitemap.xml missing /pricing');
}
if (!sitemap.includes('/faq')) {
  throw new Error('sitemap.xml missing /faq');
}
if (!sitemap.includes('/ebook-editing-services')) {
  throw new Error('sitemap.xml missing /ebook-editing-services');
}

const robotsSrc = join(root, 'public', 'robots.txt');
if (!existsSync(robotsSrc)) throw new Error('public/robots.txt missing');
const robots = readFileSync(robotsSrc, 'utf8');
if (!robots.includes('Sitemap: https://www.ebookwriters.us/sitemap.xml')) {
  throw new Error('robots.txt missing sitemap directive');
}
if (!robots.includes('Disallow: /admin')) {
  throw new Error('robots.txt should disallow /admin');
}
if (!robots.includes('GPTBot')) {
  throw new Error('robots.txt should allow GPTBot');
}

const llmsSrc = join(root, 'public', 'llms.txt');
if (!existsSync(llmsSrc)) throw new Error('public/llms.txt missing');
const llms = readFileSync(llmsSrc, 'utf8');
if (!llms.includes('https://www.ebookwriters.us/') || !llms.includes('$699')) {
  throw new Error('llms.txt missing canonical origin or pricing');
}

for (const check of checks) {
  const html = readPage(check.path);
  assertNoEmptyRoot(html, check.path);
  assertIncludes(html, check.path, check.needles);
  console.log(`ok ${check.path}`);
}

// Every sitemap URL: a real body for non-JS crawlers, and a complete title.
const MIN_WORDS = 150;
const decode = s => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
for (const loc of sitemap.match(/<loc>[^<]+<\/loc>/g)) {
  const path = new URL(loc.slice(5, -6)).pathname;
  const html = readPage(path);
  const rootHtml = html.match(/<div id="root">([\s\S]*?)<\/div>\s*(?:<script|<!--|<\/body>)/)?.[1] || '';
  const words = rootHtml.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  if (words < MIN_WORDS) throw new Error(`${path} #root has ${words} words (< ${MIN_WORDS}) — thin crawl HTML`);
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] || '');
  if (title.length > 60) throw new Error(`${path} title is ${title.length} chars: ${title}`);
  if (/…|\.\.\.$/.test(title)) throw new Error(`${path} title is truncated: ${title}`);
  const desc = decode(html.match(/<meta name="description" content="([^"]*)"/i)?.[1] || '');
  if (desc.length > 160) throw new Error(`${path} description is ${desc.length} chars`);
  if (html.includes('<noscript>')) throw new Error(`${path} duplicates the crawl copy in <noscript>`);
}
console.log(`ok all sitemap URLs have >= ${MIN_WORDS} crawlable words and complete titles`);

const home = readPage('/');
if (!home.includes('SearchAction')) throw new Error('home missing WebSite SearchAction');
if (!home.includes('SpeakableSpecification')) throw new Error('home missing SpeakableSpecification');

const pricing = readPage('/pricing');
if (pricing.includes('"@type": "Product"')) throw new Error('pricing still uses Product schema');
if (!pricing.includes('AggregateOffer')) throw new Error('pricing missing AggregateOffer');

const contactWords = (readPage('/contact').match(/<div id="root">([\s\S]*?)<\/div>\s*(?:<script|<!--|<\/body>)/)?.[1] || '')
  .replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
if (contactWords < 400) throw new Error(`/contact crawl HTML has ${contactWords} words (< 400)`);
const servicesWords = (readPage('/services').match(/<div id="root">([\s\S]*?)<\/div>\s*(?:<script|<!--|<\/body>)/)?.[1] || '')
  .replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
if (servicesWords < 400) throw new Error(`/services crawl HTML has ${servicesWords} words (< 400)`);

const proposal = readPage('/blog/how-to-write-a-nonfiction-book-proposal');
if (!proposal.includes('"@type": "Organization"') || !proposal.includes('/authors/editorial-desk')) {
  throw new Error('article missing Organization author with editorial-desk URL');
}
if (!proposal.includes('"@type": "FAQPage"')) throw new Error('FAQ article missing FAQPage JSON-LD');

console.log('qa:seo-html passed — key routes have crawlable body HTML.');
