/**
 * Build-time webfont source.
 *
 * The site is set in Switzer (Indian Type Foundry, via Fontshare) as the
 * stand-in for Neue Haas Grotesk. Its ITF Free Font License allows commercial
 * use and self-hosting on our own site, but forbids redistributing the files —
 * and naming a public repository as redistribution. This repo is public, so
 * the font files are never committed: they are pulled from Fontshare, unmodified,
 * into public/fonts/switzer/ (gitignored) before every dev server and build.
 *
 * A build must not fail because Fontshare blinked. If the download fails, the
 * last good copy in node_modules/.cache is used; failing that the site still
 * renders in the metric-matched Arial fallback declared in src/fonts.css.
 *
 *   npm run fonts:pull     (also runs automatically before dev and build)
 */
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const outDir = join(root, 'public', 'fonts', 'switzer');
const cacheDir = join(root, 'node_modules', '.cache', 'ebw-fonts');
const force = process.argv.includes('--force');

// Fontshare's CSS API is the stable interface; the file URLs it returns are
// content-hashed and change when ITF ships an update.
const API = 'https://api.fontshare.com/v2/css?f[]=switzer@1,2&display=swap';
const FILES = {
  normal: 'Switzer-Variable.woff2',
  italic: 'Switzer-VariableItalic.woff2',
};

const have = () => Object.values(FILES).every((f) => existsSync(join(outDir, f)));

async function download() {
  const css = await (await fetch(API)).text();
  const faces = [...css.matchAll(/@font-face\s*{[^}]*}/g)].map((m) => m[0]);
  const urls = {};
  for (const face of faces) {
    const style = /font-style:\s*(\w+)/.exec(face)?.[1];
    const url = /url\('([^']+\.woff2)'\)/.exec(face)?.[1];
    if (FILES[style] && url) urls[style] = url.startsWith('//') ? `https:${url}` : url;
  }
  for (const style of Object.keys(FILES)) {
    if (!urls[style]) throw new Error(`no ${style} woff2 in the Fontshare response`);
  }

  mkdirSync(outDir, { recursive: true });
  mkdirSync(cacheDir, { recursive: true });
  for (const [style, url] of Object.entries(urls)) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} for ${style}`);
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(join(outDir, FILES[style]), buf);
    writeFileSync(join(cacheDir, FILES[style]), buf);
  }
}

if (have() && !force) {
  console.log('[fonts] Switzer already in public/fonts/switzer — skipping download.');
} else {
  try {
    await download();
    console.log('[fonts] pulled Switzer from Fontshare into public/fonts/switzer.');
  } catch (error) {
    const cached = Object.values(FILES).every((f) => existsSync(join(cacheDir, f)));
    if (cached) {
      mkdirSync(outDir, { recursive: true });
      for (const f of Object.values(FILES)) copyFileSync(join(cacheDir, f), join(outDir, f));
      console.warn(`[fonts] Fontshare unreachable (${error.message}) — using the cached copy.`);
    } else {
      console.warn('');
      console.warn(`[fonts] Fontshare unreachable (${error.message}) and no cached copy.`);
      console.warn('        The site will render in the Arial fallback until the next build.');
      console.warn('');
    }
  }
}
