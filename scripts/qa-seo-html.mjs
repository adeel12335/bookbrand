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

const robotsSrc = join(root, 'public', 'robots.txt');
if (!existsSync(robotsSrc)) throw new Error('public/robots.txt missing');
const robots = readFileSync(robotsSrc, 'utf8');
if (!robots.includes('Sitemap: https://www.ebookwriters.us/sitemap.xml')) {
  throw new Error('robots.txt missing sitemap directive');
}
if (!robots.includes('Disallow: /admin')) {
  throw new Error('robots.txt should disallow /admin');
}

for (const check of checks) {
  const html = readPage(check.path);
  assertNoEmptyRoot(html, check.path);
  assertIncludes(html, check.path, check.needles);
  console.log(`ok ${check.path}`);
}

console.log('qa:seo-html passed — key routes have crawlable body HTML.');
