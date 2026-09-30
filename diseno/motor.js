// Motor de animación determinista: todo el estado visual es función del tiempo t (segundos).
// El renderizador llama a window.seek(t) para cada frame; el navegador normal reproduce en vivo.

export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const prog = (t, a, b) => clamp((t - a) / (b - a));
export const lerp = (a, b, p) => a + (b - a) * p;
export const ease = {
  lineal: p => p,
  out: p => 1 - Math.pow(1 - p, 3),
  in: p => p * p * p,
  inOut: p => (p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2),
  suave: p => -(Math.cos(Math.PI * p) - 1) / 2,
  // se pasa un poco y vuelve: para piezas que se pegan
  back: p => { const c = 1.9; return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2); },
};

// ───── Voz: tiempos por palabra ─────
const norm = s => s.toLowerCase().replace(/[¿?¡!.,;:«»"“”…]/g, '').trim();
export async function cargarVoz(url) {
  const d = await (await fetch(url)).json();
  d.palabras.forEach(p => (p.n = norm(p.w)));
  // W('mira', 2) → segunda vez que se dice "mira": { s, e }
  d.W = (texto, n = 1) => {
    const partes = texto.split(' ').map(norm);
    let visto = 0;
    for (let i = 0; i <= d.palabras.length - partes.length; i++) {
      if (partes.every((p, j) => d.palabras[i + j].n === p) && ++visto === n)
        return { s: d.palabras[i].s, e: d.palabras[i + partes.length - 1].e, i };
    }
    throw new Error(`La voz no dice "${texto}" (${n})`);
  };
  return d;
}

// ───── Subtítulos: frases cortas sincronizadas; se omiten las que ya están escritas en pantalla ─────
export function subtitulos(voz, ocultar, maxPalabras = 7) {
  const oculta = new Set();
  for (const [frase, n] of ocultar) {
    const r = voz.W(frase, n);
    for (let k = r.i; k < r.i + frase.split(' ').length; k++) oculta.add(k);
  }
  // Primero frases (cortan en . ? ! y en comas si ya hay 3 palabras); después, las largas se parten en partes parejas
  const frases = [];
  let cur = [];
  const cerrar = () => { if (cur.length) frases.push(cur); cur = []; };
  voz.palabras.forEach((p, k) => {
    if (oculta.has(k)) return cerrar();
    cur.push(p);
    if (/[.?!]$/.test(p.w) || (/,$/.test(p.w) && cur.length >= 3)) cerrar();
  });
  cerrar();
  const trozos = [];
  for (const f of frases) {
    const n = Math.ceil(f.length / maxPalabras), tam = Math.ceil(f.length / n);
    for (let i = 0; i < f.length; i += tam) trozos.push(f.slice(i, i + tam));
  }
  return trozos.map((ws, i) => ({
    texto: ws.map(w => w.w).join(' '),
    s: ws[0].s - 0.06,
    e: Math.min(ws[ws.length - 1].e + 0.35, trozos[i + 1] ? trozos[i + 1][0].s - 0.06 : Infinity),
  }));
}

// ───── Piezas de collage: entrada y salida ─────
// Cada elemento guarda su rotación base en data-rot (grados).
export function pieza(el, t, { t0, t1 = Infinity, entra = 'pegar', sale = 'fundido', dur = 0.45, dx = 0, dy = 0, escala = 1 } = {}) {
  const rot = +(el.dataset.rot || 0);
  const pe = prog(t, t0, t0 + dur), ps = prog(t, t1, t1 + 0.35);
  if (pe <= 0 || ps >= 1) { el.style.visibility = 'hidden'; return; }
  el.style.visibility = 'visible';
  let x = dx, y = dy, s = escala, r = rot, o = 1;
  if (entra === 'pegar') {           // cae sobre la mesa: grande, girado, y se asienta con rebote
    const e = ease.back(pe);
    s *= lerp(1.22, 1, e); r += 6 * (1 - e); o = clamp(pe * 4);
  } else if (entra === 'izq') {      // se desliza desde la izquierda
    x += lerp(-1200, 0, ease.out(pe));
  } else if (entra === 'der') {
    x += lerp(1200, 0, ease.out(pe));
  } else if (entra === 'abajo') {
    y += lerp(1400, 0, ease.out(pe)); r += 4 * (1 - ease.out(pe));
  } else if (entra === 'fundido') {
    o = ease.out(pe);
  }
  if (ps > 0) {
    const e = ease.in(ps);
    if (sale === 'fundido') o *= 1 - e;
    else if (sale === 'arriba') y -= 1600 * e;
    else if (sale === 'izq') x -= 1300 * e;
    else if (sale === 'der') x += 1300 * e;
  }
  el.style.opacity = o;
  el.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg) scale(${s})`;
}

// Trazo SVG que se dibuja (path con pathLength="1").
export function trazo(path, p) {
  path.style.strokeDasharray = '1';
  path.style.strokeDashoffset = String(1 - clamp(p));
}

// Trazo punteado que avanza: repite el patrón de puntos hasta la fracción p del largo.
export function punteado(path, p, punto = 1, hueco = 22) {
  const L = path.getTotalLength(), n = Math.floor((L * clamp(p)) / (punto + hueco));
  path.style.strokeDasharray = `${`${punto} ${hueco} `.repeat(n)}0 ${L + 100}`;
}

// Grano que "hierve" 12 veces por segundo, como el celuloide.
export function hervir(el, t) {
  const k = Math.floor(t * 12);
  el.style.backgroundPosition = `${(k * 137) % 400}px ${(k * 251) % 400}px`;
}
