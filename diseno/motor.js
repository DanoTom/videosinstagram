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
export function subtitulos(voz, ocultar, maxPalabras = 8) {
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
  // Las frases largas se parten cerca del medio, prefiriendo cortar después de una coma o antes de un nexo
  // ("y", "que", "pero"...), para no separar "a Dédalo y a / Ícaro".
  const NEXOS = new Set(['y', 'e', 'o', 'que', 'pero', 'cuando', 'porque', 'donde', 'como', 'sino', 'aunque']);
  // Nunca se corta después de una preposición o un artículo ("transformado en / ave"), ni se deja un trozo de menos de 3 palabras.
  const DEBILES = new Set(['a', 'al', 'de', 'del', 'en', 'el', 'la', 'los', 'las', 'un', 'una', 'por', 'para', 'con', 'sin', 'desde', 'hasta', 'hacia', 'sobre', 'entre', 'y', 'que', 'lo', 'se', 'su', 'sus']);
  const partir = f => {
    if (f.length <= maxPalabras) return [f];
    let mejor = Math.ceil(f.length / 2), puntaje = Infinity;
    for (let i = 3; i <= f.length - 3; i++) {
      const bonus = /,$/.test(f[i - 1].w) ? 3 : NEXOS.has(f[i].n) ? 2.5 : 0;
      const p = Math.abs(i - f.length / 2) - bonus + (DEBILES.has(f[i - 1].n) ? 5 : 0);
      if (p <= puntaje) { puntaje = p; mejor = i; }
    }
    return [...partir(f.slice(0, mejor)), ...partir(f.slice(mejor))];
  };
  const trozos = frases.flatMap(partir);
  return trozos.map((ws, i) => ({
    texto: ws.map(w => w.w).join(' ').replace(/ %/g, '%'),
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
// Mientras no empezó, se oculta: con stroke-linecap="round" un trazo de largo cero igual deja un punto.
export function trazo(path, p) {
  path.style.strokeDasharray = '1';
  path.style.strokeDashoffset = String(1 - clamp(p));
  path.style.visibility = p > 0 ? 'visible' : 'hidden';
}

// Trazo punteado que avanza: repite el patrón de puntos hasta la fracción p del largo.
export function punteado(path, p, punto = 1, hueco = 22) {
  const L = path.getTotalLength(), n = Math.floor((L * clamp(p)) / (punto + hueco));
  path.style.strokeDasharray = `${`${punto} ${hueco} `.repeat(n)}0 ${L + 100}`;
  path.style.visibility = p > 0 ? 'visible' : 'hidden';
}

// Grano que "hierve" 12 veces por segundo, como el celuloide.
export function hervir(el, t) {
  const k = Math.floor(t * 12);
  el.style.backgroundPosition = `${(k * 137) % 400}px ${(k * 251) % 400}px`;
}

// ───── Cámara dentro de una obra ─────
// encuadre: muestra la región [x, y, ancho, alto] (px de la imagen original) llenando la caja.
export function encuadre(el, im, [sx, sy, sw, sh]) {
  const bw = el.offsetWidth, bh = el.offsetHeight;
  const k = Math.max(bw / sw, bh / sh);
  el.style.backgroundImage = `url(${im.src})`;
  el.style.backgroundSize = `${im.w * k}px ${im.h * k}px`;
  el.style.backgroundPosition = `${-sx * k + (bw - sw * k) / 2}px ${-sy * k + (bh - sh * k) / 2}px`;
}
// Zoom entre dos encuadres: el ancho se interpola en escala logarítmica y el centro sigue la trayectoria
// que mantiene el punto de destino quieto en pantalla, como un zoom de cámara real.
export function entreEncuadres(a, b, p) {
  const wa = a[2], wb = b[2];
  const w = Math.exp(lerp(Math.log(wa), Math.log(wb), p));
  const h = Math.exp(lerp(Math.log(a[3]), Math.log(b[3]), p));
  const u = Math.abs(wa - wb) < 1e-6 ? p : (1 / wa - 1 / w) / (1 / wa - 1 / wb);
  const cx = lerp(a[0] + wa / 2, b[0] + wb / 2, u), cy = lerp(a[1] + a[3] / 2, b[1] + b[3] / 2, u);
  return [cx - w / 2, cy - h / 2, w, h];
}

// ───── Transiciones y efectos agregados en el 03 ─────
// Marea: un fondo de color sube desde abajo con el borde de arriba ondulado, como agua que llena la pantalla.
export function marea(el, t, t0, dur = 0.8, amp = 1.6) {
  const p = ease.inOut(prog(t, t0, t0 + dur));
  const alto = lerp(104, -2 * amp, p), fase = t * 3.2, pts = [];
  for (let x = 0; x <= 100; x += 4) pts.push(`${x}% ${alto + amp * Math.sin(x * 0.11 + fase) + amp * 0.5 * Math.sin(x * 0.29 - fase * 1.4)}%`);
  el.style.clipPath = `polygon(${pts.join(',')}, 100% 100%, 0% 100%)`;
  el.style.visibility = p > 0 ? 'visible' : 'hidden';
}

// Palabra por palabra: cada <span> del contenedor aparece cuando la voz dice su palabra (tiempos[i]).
export function porPalabra(el, t, tiempos, dur = 0.25) {
  [...el.querySelectorAll('span')].forEach((s, i) => {
    const p = ease.out(prog(t, tiempos[i] - 0.04, tiempos[i] - 0.04 + dur));
    s.style.opacity = p;
    s.style.display = 'inline-block';
    s.style.transform = `translateY(${lerp(18, 0, p)}px)`;
  });
}
