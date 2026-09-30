// Captura cada .frame de una página como PNG 1080x1920, sirviendo el repo por HTTP local
// (los módulos ES no cargan desde file://).
//   node herramientas/capturar.mjs videos/01-no-hay-nadie/storyboard.html [--ui]
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { resolve, dirname, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pagina = resolve(process.argv[2]);
const conUI = process.argv.includes('--ui');
const TIPOS = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css',
  '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.json': 'application/json' };

const server = createServer(async (req, res) => {
  try {
    const ruta = resolve(raiz, '.' + decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (!ruta.startsWith(raiz)) throw new Error('fuera del repo');
    res.writeHead(200, { 'Content-Type': TIPOS[extname(ruta)] || 'application/octet-stream' });
    res.end(await readFile(ruta));
  } catch { res.writeHead(404); res.end(); }
}).listen(0);
const port = server.address().port;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 2000 } });
page.on('pageerror', e => console.error('[página]', e.message));
page.on('requestfailed', r => console.error('[no cargó]', r.url()));
page.on('response', r => { if (r.status() >= 400) console.error('[' + r.status() + ']', r.url()); });
await page.goto(`http://127.0.0.1:${port}/${relative(raiz, pagina)}${conUI ? '?ui' : ''}`, { waitUntil: 'networkidle' });
await page.waitForFunction(() => window.listo === true, null, { timeout: 30000 });

const out = resolve(dirname(pagina), 'out');
await mkdir(out, { recursive: true });
for (const id of await page.$$eval('.frame', fs => fs.map(f => f.id))) {
  const archivo = resolve(out, `${conUI ? 'ui-' : ''}${id}.png`);
  await page.locator('#' + id).screenshot({ path: archivo });
  console.log(relative(raiz, archivo));
}
await browser.close();
server.close();
