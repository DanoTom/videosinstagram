// Impresión risográfica: cada tinta se dibuja aparte como una densidad (0 a 1), y al "imprimir" se vuelve trama de
// puntos con su ángulo, con el grano moteado de la tinta y el papel, y se encima a las otras multiplicando (rosa sobre
// amarillo da coral; azul sobre rosa, violeta). Cada tinta puede correrse un poco: el desregistro.
import { fbm, ruido } from './ruido.js';

export const TINTAS = {           // colores de tintas de risografía reales
  azul: '#3255A4', rosaFluo: '#FF48B0', amarillo: '#FFE800', coral: '#FF8E91', verde: '#00A95C',
  violeta: '#765BA7', naranja: '#FF7477', teal: '#00838A', negro: '#2A2A2A', rojo: '#F15060',
};
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));

export class Riso {
  // tintas: [{ id, color, angulo (grados), celda (px por punto), opacidad }]
  constructor(w, h, tintas, { margen = 64 } = {}) {
    Object.assign(this, { w, h, margen, capas: {} });
    for (const t of tintas) {
      const c = Object.assign(document.createElement('canvas'), { width: w, height: h });
      const o = Object.assign(document.createElement('canvas'), { width: w, height: h });
      const a = (t.angulo * Math.PI) / 180, ca = Math.cos(a), sa = Math.sin(a), k = (2 * Math.PI) / t.celda;
      const umbral = new Float32Array(w * h);
      for (let y = 0, i = 0; y < h; y++) for (let x = 0; x < w; x++, i++) {
        const u = (x * ca + y * sa) * k, v = (-x * sa + y * ca) * k;
        umbral[i] = 1 - (0.5 + 0.25 * (Math.cos(u) + Math.cos(v)));
      }
      this.capas[t.id] = { ...t, rgb: hex(t.color), c, x: c.getContext('2d', { willReadFrequently: true }), o, ox: o.getContext('2d'),
        img: o.getContext('2d').createImageData(w, h), umbral, opacidad: t.opacidad ?? 0.92 };
    }
    // grano: la tinta no cubre parejo (manchas grandes) y deja poros blancos (motas chicas)
    const W = w + margen, H = h + margen;
    this.gw = W; this.grano = new Float32Array(W * H);
    for (let y = 0, i = 0; y < H; y++) for (let x = 0; x < W; x++, i++) {
      const mancha = fbm(x / 90, y / 90, 3, 3), poro = ruido(x * 0.9, y * 0.9, 8);
      this.grano[i] = (0.78 + 0.3 * mancha) * (poro > 0.93 ? 0.25 : 1);
    }
  }
  ctx(id) { return this.capas[id].x; }
  limpiar() { for (const c of Object.values(this.capas)) c.x.clearRect(0, 0, this.w, this.h); }
  // Imprime sobre dest. desregistro: { id: [dx, dy] }; hervor: corre el grano (la impresión "respira")
  imprimir(dest, { papel = '#F5F0E6', desregistro = {}, hervor = 0 } = {}) {
    const { w, h, margen, gw, grano } = this;
    dest.globalCompositeOperation = 'source-over';
    dest.fillStyle = papel; dest.fillRect(0, 0, w, h);
    const gx = (hervor * 37) % margen, gy = (hervor * 53) % margen;
    for (const c of Object.values(this.capas)) {
      const src = c.x.getImageData(0, 0, w, h).data, out = c.img.data, [r, g, b] = c.rgb, um = c.umbral, op = c.opacidad * 255;
      for (let y = 0, i = 0; y < h; y++) {
        const fila = (y + gy) * gw + gx;
        for (let x = 0; x < w; x++, i++) {
          const a = src[i * 4 + 3], j = i * 4;
          if (a < 2) { out[j + 3] = 0; continue; }
          const gr = grano[fila + x], d = (a / 255) * 1.12 * gr;
          let cov = (d - um[i]) * 7 + 0.5;
          cov = cov < 0 ? 0 : cov > 1 ? 1 : cov;
          out[j] = r; out[j + 1] = g; out[j + 2] = b; out[j + 3] = cov * op * (0.86 + 0.14 * gr);
        }
      }
      c.ox.putImageData(c.img, 0, 0);
      const [dx, dy] = desregistro[c.id] || [0, 0];
      dest.globalCompositeOperation = 'multiply';
      dest.drawImage(c.o, dx, dy);
    }
    dest.globalCompositeOperation = 'source-over';
  }
}

// Densidad de un degradé radial (para luces y sombras en trama)
export function degradeRadial(ctx, x, y, r, desde = 1, hasta = 0) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, `rgba(0,0,0,${desde})`); g.addColorStop(1, `rgba(0,0,0,${hasta})`);
  return g;
}
