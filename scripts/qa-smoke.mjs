import { chromium } from 'playwright';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const errors = [];
const baseUrl = process.env.QA_BASE_URL || 'http://127.0.0.1:5173/';
const captureDir = process.env.QA_CAPTURE_DIR;

async function captureSection(page, selector, filename) {
  const section = page.locator(selector);
  await section.scrollIntoViewIfNeeded();
  await page.evaluate(() => document.activeElement?.blur());
  if (await page.evaluate(() => window.innerWidth <= 760)) {
    await page.waitForFunction(() => document.querySelector('.mobile-bar')?.classList.contains('is-away'));
  }
  await page.waitForTimeout(1100);
  await section.screenshot({ path: join(captureDir, filename) });
}

async function check(page, label) {
  const r = await page.evaluate(() => {
    const pick = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const s = getComputedStyle(el);
      return { bg: s.backgroundColor, color: s.color };
    };
    const imgs = [...document.images].map((i) => ({
      src: i.currentSrc || i.src,
      loaded: i.complete && i.naturalWidth > 0,
      broken: i.complete && Boolean(i.currentSrc || i.src) && i.naturalWidth === 0,
    }));
    const broken = imgs.filter((i) => i.broken);
    const pendingLazy = imgs.filter((i) => !i.complete && !i.currentSrc).length;
    const orangeish = [];
    document
      .querySelectorAll('header, main section, footer, .ref-cta, a, button, .pill, .pr-cta, .ct-submit')
      .forEach((el) => {
        const s = getComputedStyle(el);
        for (const prop of ['backgroundColor', 'color', 'borderTopColor']) {
          const v = s[prop];
          const m = v && v.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
          if (!m) continue;
          const r = Number(m[1]);
          const g = Number(m[2]);
          const b = Number(m[3]);
          if (r > 200 && g > 80 && g < 160 && b < 80) {
            orangeish.push({
              tag: `${el.tagName}.${String(el.className || '').slice(0, 40)}`,
              prop,
              v,
            });
          }
        }
      });
    const em = document.querySelector('#services em, .ref-services-head em');
    return {
      header: pick('.site-header'),
      process: pick('#process'),
      quotes: pick('.quotes, .qt'),
      services: pick('#services'),
      benefits: pick('.ref-benefits'),
      why: pick('#why'),
      pricing: pick('#pricing'),
      footer: pick('.footer'),
      refCta: pick('.ref-cta'),
      goldEm: em ? getComputedStyle(em).color : null,
      overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
      brokenImgs: broken.slice(0, 10),
      pendingLazy,
      imgCount: imgs.length,
      orangeish: orangeish.slice(0, 15),
      navHrefs: [...document.querySelectorAll('.site-nav a, nav a')].map((a) => ({
        t: a.textContent.trim(),
        h: a.getAttribute('href'),
      })),
      hxExact: (() => {
        const el = document.querySelector('.hx-exact');
        return el ? getComputedStyle(el).display : null;
      })(),
      hxLive: (() => {
        const el = document.querySelector('.hx-live');
        return el ? getComputedStyle(el).display : null;
      })(),
    };
  });
  console.log(`=== ${label} ===`);
  console.log(JSON.stringify(r, null, 2));
  return r;
}

const localChrome = [
  process.env.PLAYWRIGHT_CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
].find((candidate) => candidate && existsSync(candidate));

const browser = await chromium.launch(localChrome ? { executablePath: localChrome } : {});
const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
desktop.on('pageerror', (e) => errors.push(String(e)));
desktop.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text());
});
await desktop.goto(baseUrl, { waitUntil: 'networkidle' });
await desktop.waitForTimeout(1000);
await check(desktop, 'desktop');
if (captureDir) {
  mkdirSync(captureDir, { recursive: true });
  await captureSection(desktop, '#portfolio', 'portfolio-desktop.png');
  await captureSection(desktop, '#faq', 'faq-desktop.png');
}

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
mobile.on('pageerror', (e) => errors.push(String(e)));
await mobile.goto(baseUrl, { waitUntil: 'networkidle' });
await mobile.waitForTimeout(800);
await check(mobile, 'mobile');
if (captureDir) {
  await captureSection(mobile, '#portfolio', 'portfolio-mobile.png');
  await captureSection(mobile, '#faq', 'faq-mobile.png');
}

console.log('pageErrors', errors);
await browser.close();
process.exit(errors.length ? 1 : 0);
