// Renderiza index.html a MP4 vertical (1080x1920) frame por frame con Chromium headless + ffmpeg.
//   node render.mjs                         → out/video.mp4
//   node render.mjs --sheet=0.5,2,5,9,12    → out/sheet.jpg (hoja de contactos para revisar)
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const args = Object.fromEntries(process.argv.slice(2).map(a => { const [k, v] = a.replace(/^--/, '').split('='); return [k, v ?? true]; }));
mkdirSync(resolve(here, 'out'), { recursive: true });

const browser = await chromium.launch({ args: ['--allow-file-access-from-files'] });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
page.on('pageerror', e => console.error('[página]', e.message));
await page.goto(pathToFileURL(resolve(here, 'index.html')).href + '?render');
const { DURATION, FPS } = await page.evaluate(() => window.ready);
const stage = page.locator('#stage');

const frame = async t => { await page.evaluate(t => window.seek(t), t); return stage.screenshot({ type: 'jpeg', quality: 94 }); };

function ffmpeg(argv) {
  const p = spawn('ffmpeg', argv, { stdio: ['pipe', 'inherit', 'inherit'] });
  const done = new Promise((ok, bad) => p.on('close', c => (c ? bad(new Error('ffmpeg ' + c)) : ok())));
  return { stdin: p.stdin, done };
}

if (args.sheet) {
  const times = String(args.sheet).split(',').map(Number);
  const f = ffmpeg(['-y', '-loglevel', 'error', '-f', 'image2pipe', '-c:v', 'mjpeg', '-i', '-',
    '-vf', `scale=360:-1,tile=${times.length}x1:padding=8:color=white`, '-frames:v', '1', resolve(here, 'out/sheet.jpg')]);
  for (const t of times) f.stdin.write(await frame(t));
  f.stdin.end(); await f.done;
  console.log('out/sheet.jpg');
} else {
  const out = resolve(here, args.out || 'out/video.mp4');
  const total = Math.round(DURATION * FPS);
  const f = ffmpeg(['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out]);
  const t0 = Date.now();
  for (let i = 0; i < total; i++) {
    const buf = await frame(i / FPS);
    if (!f.stdin.write(buf)) await new Promise(r => f.stdin.once('drain', r));
    if (i % 60 === 0) process.stdout.write(`frame ${i}/${total}\r`);
  }
  f.stdin.end(); await f.done;
  console.log(`\n${out} (${total} frames en ${((Date.now() - t0) / 1000).toFixed(1)}s)`);
}
await browser.close();
