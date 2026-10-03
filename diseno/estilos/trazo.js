// Trazos a mano sobre <canvas>: líneas que tiemblan y cambian de grosor, rellenos con el borde imperfecto y rayados.
// Las formas vienen como "d" de SVG (las mismas de los dibujos de línea) y se muestrean en puntos.
import { ruido } from './ruido.js';

const NS = 'http://www.w3.org/2000/svg';
let medidor;
const cache = new Map();

// Puntos cada `paso` px a lo largo de un "d" de SVG; un "d" con varios M da varias listas
export function muestrear(d, paso = 4) {
  const k = d + '|' + paso;
  if (cache.has(k)) return cache.get(k);
  if (!medidor) {
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('style', 'position:absolute;width:0;height:0;overflow:hidden');
    medidor = document.createElementNS(NS, 'path');
    svg.appendChild(medidor); document.body.appendChild(svg);
  }
  const listas = d.split(/(?=M)/).filter(s => s.trim()).map(sub => {
    medidor.setAttribute('d', sub);
    const L = medidor.getTotalLength(), n = Math.max(2, Math.ceil(L / paso)), pts = [];
    for (let i = 0; i <= n; i++) { const p = medidor.getPointAtLength((L * i) / n); pts.push([p.x, p.y]); }
    return pts;
  });
  cache.set(k, listas);
  return listas;
}

// Lleva puntos de un dibujo (su viewBox) a la pantalla: escala s y origen (x, y)
export const ubicar = (listas, { x = 0, y = 0, s = 1 }) => listas.map(pts => pts.map(([a, b]) => [x + a * s, y + b * s]));

// Línea a mano: tiembla (temblor, en px), cambia de grosor y se afina en las puntas. `hasta` (0 a 1) la dibuja en parte.
export function lineaViva(ctx, pts, { ancho = 8, temblor = 2, semilla = 0, hasta = 1 } = {}) {
  const n = Math.max(2, Math.round(pts.length * Math.min(1, hasta)));
  if (hasta <= 0 || pts.length < 2) return;
  const L = [], R = [];
  for (let i = 0; i < n; i++) {
    const p = pts[i], a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    let tx = b[0] - a[0], ty = b[1] - a[1]; const l = Math.hypot(tx, ty) || 1; tx /= l; ty /= l;
    const nx = -ty, ny = tx, s = i / (pts.length - 1);
    const off = (ruido(i * 0.09, 0.5, semilla) - 0.5) * 2 * temblor;
    const punta = Math.min(1, s * 7 + 0.3, (1 - s) * 7 + 0.3);
    const w = ancho * (0.7 + 0.6 * ruido(i * 0.05, 7.3, semilla + 11)) * punta;
    const x = p[0] + nx * off, y = p[1] + ny * off;
    L.push([x + (nx * w) / 2, y + (ny * w) / 2]); R.push([x - (nx * w) / 2, y - (ny * w) / 2]);
  }
  ctx.beginPath();
  ctx.moveTo(L[0][0], L[0][1]);
  for (const q of L) ctx.lineTo(q[0], q[1]);
  for (let i = R.length - 1; i >= 0; i--) ctx.lineTo(R[i][0], R[i][1]);
  ctx.closePath(); ctx.fill();
}

// Relleno a mano: el contorno se corre un poco (temblor) y cambia con cada semilla
export function rellenoVivo(ctx, listas, { temblor = 2, semilla = 0 } = {}) {
  ctx.beginPath();
  for (const pts of listas) pts.forEach(([x, y], i) => {
    const dx = (ruido(i * 0.08, 1.7, semilla) - 0.5) * 2 * temblor, dy = (ruido(i * 0.08, 9.1, semilla) - 0.5) * 2 * temblor;
    i ? ctx.lineTo(x + dx, y + dy) : ctx.moveTo(x + dx, y + dy);
  });
  ctx.fill();
}

// Rayado: líneas paralelas a mano dentro de lo que ya esté recortado (ctx.clip) en la caja [x, y, w, h]
export function rayado(ctx, [x, y, w, h], { angulo = 30, sep = 14, ancho = 3, temblor = 1.5, semilla = 0, largo = 1 } = {}) {
  const a = (angulo * Math.PI) / 180, ca = Math.cos(a), sa = Math.sin(a), cx = x + w / 2, cy = y + h / 2, R = Math.hypot(w, h) / 2;
  let k = 0;
  for (let d = -R; d <= R; d += sep, k++) {
    const pts = [], j = (ruido(k * 0.7, 3.3, semilla) - 0.5) * sep * 0.5, l = R * largo * (0.75 + 0.25 * ruido(k, 5, semilla));
    for (let u = -l; u <= l; u += 6) pts.push([cx + ca * u - sa * (d + j), cy + sa * u + ca * (d + j)]);
    lineaViva(ctx, pts, { ancho, temblor, semilla: semilla + k * 7 });
  }
}
