// Captura cada fotograma (1080x1920) en PNG, limpio y con la interfaz de Instagram encima.
//   node render.mjs  → out/A1.png … out/C2.png, out/ui-A1.png …
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
mkdirSync(resolve(here, 'out'), { recursive: true });
const browser = await chromium.launch({ args: ['--allow-file-access-from-files'] });
const page = await browser.newPage({ viewport: { width: 1200, height: 2000 } });
page.on('pageerror', e => console.error('[página]', e.message));
page.on('requestfailed', r => console.error('[no cargó]', r.url()));

for (const [query, prefix] of [['', ''], ['?ui', 'ui-']]) {
  await page.goto(pathToFileURL(resolve(here, 'index.html')).href + query, { waitUntil: 'networkidle' });
  await page.evaluate(() => window.ready);
  for (const id of await page.$$eval('.frame', fs => fs.map(f => f.id))) {
    await page.locator('#' + id).screenshot({ path: resolve(here, `out/${prefix}${id}.png`) });
    console.log(`out/${prefix}${id}.png`);
  }
}
await browser.close();
