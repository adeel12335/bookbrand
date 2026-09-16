/**
 * Compress oversized brand PNGs to WebP for the critical path.
 * Keeps originals; writes sibling .webp files (quality ~78, max width 1600).
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, extname, basename } from 'node:path';

const dir = join(process.cwd(), 'public', 'assets', 'brand');
const MIN_BYTES = 180 * 1024;
const ffmpeg = process.env.FFMPEG || 'ffmpeg';

const files = readdirSync(dir)
  .filter(name => /\.png$/i.test(name))
  .map(name => ({ name, path: join(dir, name), size: statSync(join(dir, name)).size }))
  .filter(f => f.size >= MIN_BYTES)
  .sort((a, b) => b.size - a.size);

let ok = 0;
for (const file of files) {
  const out = join(dir, `${basename(file.name, extname(file.name))}.webp`);
  const args = [
    '-y', '-i', file.path,
    '-vf', 'scale=\'min(1600,iw)\':-2',
    '-c:v', 'libwebp',
    '-quality', '78',
    '-compression_level', '6',
    out,
  ];
  const result = spawnSync(ffmpeg, args, { encoding: 'utf8' });
  if (result.status !== 0 || !existsSync(out)) {
    console.error('FAIL', file.name, result.stderr?.slice(-200));
    continue;
  }
  const before = Math.round(file.size / 1024);
  const after = Math.round(statSync(out).size / 1024);
  console.log(`OK ${file.name} ${before}KB → ${basename(out)} ${after}KB`);
  ok += 1;
}
console.log(`Compressed ${ok}/${files.length} PNGs to WebP`);
