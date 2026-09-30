// Renderiza una composición (window.seek(t), window.DURACION, window.listo) a MP4 1080x1920 con audio.
//   node herramientas/render.mjs videos/01-no-hay-nadie/video.html --audio=videos/01-no-hay-nadie/audio/voz-editada.wav
//   node herramientas/render.mjs <pagina> --hoja=0.5,3,6.2           → out/hoja.jpg (fotogramas elegidos)
//   node herramientas/render.mjs <pagina> --tira=4:5 --cols=8         → out/tira.jpg (todos los frames de un tramo)
// Opciones: --workers=3 --fps=30 --desde=0 --hasta=<fin> --out=out/video.mp4
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, mkdir, rm, readdir } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { resolve, dirname, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pagina = resolve(process.argv[2]);
const opt = Object.fromEntries(process.argv.slice(3).map(a => { const [k, v] = a.replace(/^--/, '').split('='); return [k, v ?? true]; }));
const dir = resolve(dirname(pagina), 'out');
const fps = +(opt.fps || 30), workers = +(opt.workers || 3);
const TIPOS = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.wav': 'audio/wav', '.mp3': 'audio/mpeg' };

const server = createServer(async (req, res) => {
  try {
    const ruta = resolve(raiz, '.' + decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (!ruta.startsWith(raiz)) throw 0;
    res.writeHead(200, { 'Content-Type': TIPOS[extname(ruta)] || 'application/octet-stream' });
    res.end(await readFile(ruta));
  } catch { res.writeHead(404); res.end(); }
}).listen(0);
const url = `http://127.0.0.1:${server.address().port}/${relative(raiz, pagina)}?render`;
const browser = await chromium.launch();

async function abrir() {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  page.on('pageerror', e => console.error('[página]', e.message));
  page.on('response', r => { if (r.status() >= 400) console.error('[' + r.status() + ']', r.url()); });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.listo === true, null, { timeout: 60000 });
  return page;
}
const cuadro = async (page, t, tipo = 'jpeg') => {
  await page.evaluate(t => window.seek(t), t);
  return page.locator('#video').screenshot({ type: tipo, ...(tipo === 'jpeg' ? { quality: 93 } : {}) });
};
function ffmpeg(args, entrada) {
  const p = spawn('ffmpeg', ['-y', '-loglevel', 'error', ...args], { stdio: [entrada ? 'pipe' : 'ignore', 'inherit', 'inherit'] });
  return { stdin: p.stdin, fin: new Promise((ok, mal) => p.on('close', c => (c ? mal(new Error('ffmpeg ' + c)) : ok()))) };
}
await mkdir(dir, { recursive: true });

if (opt.hoja || opt.tira) {
  const page = await abrir();
  let tiempos;
  if (opt.hoja) tiempos = String(opt.hoja).split(',').map(Number);
  else { const [a, b] = String(opt.tira).split(':').map(Number); tiempos = []; for (let t = a; t < b; t += 1 / fps) tiempos.push(t); }
  const cols = +(opt.cols || Math.min(tiempos.length, 6)), w = +(opt.w || 270);
  const salida = resolve(dir, opt.out || (opt.hoja ? 'hoja.jpg' : 'tira.jpg'));
  const f = ffmpeg(['-f', 'image2pipe', '-c:v', 'mjpeg', '-i', '-', '-vf',
    `scale=${w}:-1,tile=${cols}x${Math.ceil(tiempos.length / cols)}:padding=6:color=white`, '-frames:v', '1', salida], true);
  for (const t of tiempos) f.stdin.write(await cuadro(page, t));
  f.stdin.end(); await f.fin;
  console.log(relative(raiz, salida));
} else {
  const probe = await abrir();
  const dur = await probe.evaluate(() => window.DURACION);
  await probe.close();
  const desde = +(opt.desde || 0), hasta = +(opt.hasta || dur);
  const total = Math.round((hasta - desde) * fps);
  const frames = resolve(dir, 'frames');
  await rm(frames, { recursive: true, force: true });
  await mkdir(frames, { recursive: true });
  const t0 = Date.now();
  let hechos = 0;
  await Promise.all(Array.from({ length: workers }, async (_, w) => {
    const page = await abrir();
    for (let i = w; i < total; i += workers) {
      const buf = await cuadro(page, desde + i / fps);
      await import('node:fs/promises').then(fs => fs.writeFile(resolve(frames, `f${String(i).padStart(5, '0')}.jpg`), buf));
      if (++hechos % 90 === 0) process.stdout.write(`  ${hechos}/${total} frames\r`);
    }
  }));
  console.log(`\n${total} frames en ${((Date.now() - t0) / 1000).toFixed(0)} s`);
  const out = resolve(dirname(pagina), opt.out || 'out/video.mp4');
  const audio = opt.audio ? ['-ss', String(desde), '-i', resolve(opt.audio), '-map', '0:v', '-map', '1:a', '-c:a', 'aac', '-b:a', '192k', '-shortest'] : [];
  await ffmpeg(['-framerate', String(fps), '-i', resolve(frames, 'f%05d.jpg'), ...audio,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out]).fin;
  console.log(relative(raiz, out));
}
await browser.close();
server.close();
