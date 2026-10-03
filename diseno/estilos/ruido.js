// Azar y ruido deterministas: el mismo cuadro sale siempre igual (el render lo pide cuadro por cuadro, en desorden).

// Números al azar con semilla (mulberry32)
export function azar(semilla) {
  let a = semilla >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const hash = (x, y, s) => {
  let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(s, 1442695041)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};

// Ruido suave (value noise) en 2D, de 0 a 1
export function ruido(x, y, s = 0) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi, s), b = hash(xi + 1, yi, s), c = hash(xi, yi + 1, s), d = hash(xi + 1, yi + 1, s);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

// Ruido con detalle (varias octavas), de 0 a 1
export function fbm(x, y, s = 0, oct = 4) {
  let v = 0, amp = 0.5, f = 1, tot = 0;
  for (let i = 0; i < oct; i++) { v += amp * ruido(x * f, y * f, s + i * 17); tot += amp; f *= 2; amp *= 0.5; }
  return v / tot;
}

// El "hervor" de la animación a mano: la semilla cambia `fps` veces por segundo (8 a 12, como el dibujo animado
// clásico) y entre cambio y cambio todo queda quieto.
export const hervor = (t, fps = 10) => Math.floor(t * fps);
export const paso = (t, fps = 12) => Math.floor(t * fps) / fps;
