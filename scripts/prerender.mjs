/**
 * Build-time body prerender for AI/search crawlers that do not execute JS.
 * Runs after Vite build + stamp-html: serves dist, Playwright-renders each
 * public route, writes the hydrated HTML back so view-source includes copy.
 */
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';
import { getPrerenderPages } from '../src/seo.js';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const distDir = join(root, 'dist');
const PORT = Number(process.env.PRERENDER_PORT || 4179);
const SKIP = new Set(['/admin']);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json',
};

function outFileFor(path) {
  if (path === '/') return join(distDir, 'index.html');
  if (path === '/404') return join(distDir, '404.html');
  return join(distDir, path.replace(/^\//, ''), 'index.html');
}

function resolveDistFile(pathname) {
  const clean = (pathname.replace(/\/+$/, '') || '/') ;
  if (clean === '/') {
    const home = join(distDir, 'index.html');
    return existsSync(home) ? home : null;
  }
  const nested = join(distDir, clean.replace(/^\//, ''), 'index.html');
  if (existsSync(nested)) return nested;
  const flat = join(distDir, `${clean.replace(/^\//, '')}.html`);
  if (existsSync(flat)) return flat;
  const asset = join(distDir, clean.replace(/^\//, ''));
  if (existsSync(asset) && statSync(asset).isFile()) return asset;
  return null;
}

function startStaticServer() {
  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      try {
        const url = new URL(req.url || '/', `http://127.0.0.1:${PORT}`);
        let file = resolveDistFile(url.pathname);
        if (!file) {
          const fallback = join(distDir, '404.html');
          file = existsSync(fallback) ? fallback : join(distDir, 'index.html');
          res.statusCode = existsSync(fallback) ? 404 : 200;
        } else {
          res.statusCode = 200;
        }
        const type = MIME[extname(file).toLowerCase()] || 'application/octet-stream';
        res.setHeader('Content-Type', type);
        res.end(readFileSync(file));
      } catch (error) {
        res.statusCode = 500;
        res.end(String(error.message || error));
      }
    });
    server.once('error', reject);
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });
}

async function ensurePlaywrightBrowser() {
  try {
    const browser = await chromium.launch({ headless: true });
    await browser.close();
    return;
  } catch {
    console.log('[prerender] Playwright browser missing — installing Chromium…');
  }
  await new Promise((resolve, reject) => {
    const child = spawn(
      process.platform === 'win32' ? 'npx.cmd' : 'npx',
      ['playwright', 'install', 'chromium'],
      { cwd: root, stdio: 'inherit', shell: process.platform === 'win32' },
    );
    child.on('exit', code => (code === 0 ? resolve() : reject(new Error(`playwright install exited ${code}`))));
  });
}

async function renderPath(page, path) {
  const url = path === '/' ? `http://127.0.0.1:${PORT}/` : `http://127.0.0.1:${PORT}${path}`;
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForSelector('#root h1, #root h2, #root main, #root .shell', { timeout: 30000 });
  await page.evaluate(() => {
    document.querySelectorAll('.reveal').forEach(node => node.classList.add('is-in'));
  });
  await page.waitForTimeout(250);
  const html = await page.content();
  if (!html.includes('id="root"') || html.includes('<div id="root"></div>')) {
    throw new Error(`Prerender produced empty #root for ${path}`);
  }
  return html.startsWith('<!DOCTYPE') || html.startsWith('<!doctype')
    ? html
    : `<!DOCTYPE html>${html}`;
}

function writeRendered(path, html) {
  const file = outFileFor(path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  if (path !== '/' && path !== '/404') {
    const flat = join(distDir, `${path.replace(/^\//, '')}.html`);
    mkdirSync(dirname(flat), { recursive: true });
    writeFileSync(flat, html);
  }
}

export async function prerender() {
  if (!existsSync(join(distDir, 'index.html'))) {
    throw new Error('dist/index.html missing — run vite build + stamp first');
  }

  const pages = getPrerenderPages().filter(page => !SKIP.has(page.path));
  await ensurePlaywrightBrowser();
  const server = await startStaticServer();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  let ok = 0;
  try {
    for (const item of pages) {
      process.stdout.write(`[prerender] ${item.path} … `);
      const html = await renderPath(page, item.path);
      writeRendered(item.path, html);
      ok += 1;
      console.log('ok');
    }
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }

  console.log(`[prerender] Wrote hydrated HTML for ${ok} routes.`);
}

const invoked = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (invoked) {
  prerender().catch(error => {
    console.error('[prerender] failed:', error);
    process.exitCode = 1;
  });
}
