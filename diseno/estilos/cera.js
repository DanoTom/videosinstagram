// Crayón (lápiz de cera) sobre papel: cada color se dibuja aparte como una densidad (0 a 1) y al "pintar" la cera
// solo agarra donde el diente del papel sobresale, en vetas que siguen la dirección del trazo. Con el hervor, la
// textura cambia como si cada cuadro se hubiera vuelto a pintar.
import { ruido } from './ruido.js';

const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
export const CRAYONES = {
  azul: '#5B86C5', celeste: '#9DB9DE', rojo: '#E0533D', coral: '#EE7B5B', amarillo: '#F7C948', rosa: '#E98AA4',
  grafito: '#2B2A2F', verde: '#6FA56B', marron: '#8A5A3C', violeta: '#7A64A8',
};

export class Cera {
  // colores: [{ id, color, angulo (dirección de las vetas, grados) }]
  constructor(w, h, colores, { margen = 48 } = {}) {
    Object.assign(this, { w, h, margen, capas: {} });
    const W = w + margen, H = h + margen;
    this.gw = W;
    for (const k of colores) {
      const c = Object.assign(document.createElement('canvas'), { width: w, height: h });
      const o = Object.assign(document.createElement('canvas'), { width: w, height: h });
      const a = (k.angulo * Math.PI) / 180, ca = Math.cos(a), sa = Math.sin(a), diente = new Float32Array(W * H);
      for (let y = 0, i = 0; y < H; y++) for (let x = 0; x < W; x++, i++) {
        const u = x * ca + y * sa, v = -x * sa + y * ca;
        diente[i] = 0.55 * ruido(u / 26, v / 2.1, 21) + 0.3 * ruido(x / 1.6, y / 1.6, 22) + 0.15 * ruido(x / 40, y / 40, 23);
      }
      this.capas[k.id] = { ...k, rgb: hex(k.color), c, x: c.getContext('2d', { willReadFrequently: true }), o, ox: o.getContext('2d'),
        img: o.getContext('2d').createImageData(w, h), diente };
    }
    // el papel: crema con manchas suaves y fibras
    this.papel = document.createElement('canvas'); this.papel.width = w; this.papel.height = h;
    const p = this.papel.getContext('2d'), im = p.createImageData(w, h), d = im.data;
    for (let y = 0, i = 0; y < h; y++) for (let x = 0; x < w; x++, i += 4) {
      const m = ruido(x / 160, y / 160, 31) * 0.6 + ruido(x / 3, y / 3, 32) * 0.4;
      d[i] = 246 - m * 14; d[i + 1] = 239 - m * 14; d[i + 2] = 224 - m * 16; d[i + 3] = 255;
    }
    p.putImageData(im, 0, 0);
  }
  ctx(id) { return this.capas[id].x; }
  limpiar() { for (const c of Object.values(this.capas)) c.x.clearRect(0, 0, this.w, this.h); }
  pintar(dest, { hervor = 0, orden } = {}) {
    const { w, h, margen, gw } = this;
    dest.globalCompositeOperation = 'source-over';
    dest.drawImage(this.papel, 0, 0);
    const gx = (hervor * 29) % margen, gy = (hervor * 41) % margen;
    for (const id of orden || Object.keys(this.capas)) {
      const c = this.capas[id], src = c.x.getImageData(0, 0, w, h).data, out = c.img.data, [r, g, b] = c.rgb, dn = c.diente;
      for (let y = 0, i = 0; y < h; y++) {
        const fila = (y + gy) * gw + gx;
        for (let x = 0; x < w; x++, i++) {
          const a = src[i * 4 + 3], j = i * 4;
          if (a < 2) { out[j + 3] = 0; continue; }
          let cov = ((a / 255) * 1.25 - dn[fila + x]) * 3.2 + 0.35;
          cov = cov < 0 ? 0 : cov > 1 ? 1 : cov;
          out[j] = r; out[j + 1] = g; out[j + 2] = b; out[j + 3] = cov * 235;
        }
      }
      c.ox.putImageData(c.img, 0, 0);
      dest.globalCompositeOperation = 'multiply';
      dest.drawImage(c.o, 0, 0);
    }
    dest.globalCompositeOperation = 'source-over';
  }
}
