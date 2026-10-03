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
      const nombre = /^[«¿¡]?[A-ZÁÉÍÓÚÑ]/.test(f[i - 1].w) && /^[A-ZÁÉÍÓÚÑ]/.test(f[i].w);   // "Santa / Croce" no se separa
      const p = Math.abs(i - f.length / 2) - bonus + (DEBILES.has(f[i - 1].n) ? 5 : 0) + (nombre ? 5 : 0);
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
  // oculta también con opacidad: un hijo con visibility: visible (un trazo ya dibujado) se vería igual
  if (pe <= 0 || ps >= 1) { el.style.visibility = 'hidden'; el.style.opacity = 0; return; }
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

// ───── Efectos estrenados en el 04 ─────
// Anamorfosis: la obra (un div con la imagen de fondo a su tamaño original) se comprime con factor k en la dirección
// `ang` (grados, la de la mancha), alrededor del punto (cx, cy) de la obra, que queda en (px, py) de su caja.
// Con k = 1 es la obra tal cual; con k ≈ 0,2 la calavera de Holbein se ve como desde el costado.
export function anamorfosis(el, { cx, cy, px, py, s = 1, k = 1, ang = 0 }) {
  el.style.left = `${px - cx}px`;
  el.style.top = `${py - cy}px`;
  el.style.transformOrigin = `${cx}px ${cy}px`;
  el.style.transform = `scale(${s}) rotate(${-ang}deg) scaleX(${k}) rotate(${ang}deg)`;
}

// Tinta: cada .linea del contenedor se escribe de izquierda a derecha, una después de la otra (p de 0 a 1).
export function tinta(el, p) {
  const ls = [...el.querySelectorAll('.linea')], q = clamp(p) * ls.length;
  ls.forEach((l, i) => {
    const f = clamp(q - i) * 112 - 6, m = `linear-gradient(to right, #000 ${f}%, transparent ${f + 6}%)`;
    l.style.webkitMaskImage = m; l.style.maskImage = m;
  });
  el.style.visibility = p > 0 ? 'visible' : 'hidden';
}

// Desteñir: una copia en gris de la imagen (el) la va cubriendo de arriba hacia abajo, con el borde suave (p de 0 a 1).
export function destenir(el, p) {
  const f = clamp(p) * 130 - 15, m = `linear-gradient(to bottom, #000 ${f}%, transparent ${f + 15}%)`;
  el.style.webkitMaskImage = m; el.style.maskImage = m;
  el.style.visibility = p > 0 ? 'visible' : 'hidden';
}

// ───── Efectos estrenados en el 05 ─────
// Dibujo: los trazos de un dibujo (<path pathLength="1">) se dibujan en orden, uno después del otro, repartiendo p según
// su largo: como una mano que dibuja sin levantar el lápiz. Con p bajando, se borra al revés. Las piezas .relleno y
// .costura aparecen con un fundido entre las fracciones `rellenos` = [a, b] de p (con a < 0 están desde el principio;
// con a > 1, nunca).
export function dibujo(el, p, { rellenos = [0.7, 0.95] } = {}) {
  const ps = [...el.querySelectorAll('path[pathLength]')].filter(x => !x.closest('.relleno, .costura'));
  if (!el._largos) el._largos = ps.map(x => x.getTotalLength());
  const total = el._largos.reduce((a, b) => a + b, 0);
  let q = clamp(p) * total;
  ps.forEach((x, i) => { trazo(x, q / el._largos[i]); q -= el._largos[i]; });
  const f = rellenos[0] < 0 ? 1 : rellenos[0] > 1 ? 0 : ease.out(prog(p, rellenos[0], rellenos[1]));
  for (const r of el.querySelectorAll('.relleno, .costura')) {
    const d = r.dataset.desde;  // un relleno puede aparecer con su trazo (el cachete con la cara): data-desde="0.3"
    r.style.opacity = (d === undefined ? f : ease.out(prog(p, +d, +d + 0.08))) * (+(r.getAttribute('opacity') ?? 1));
  }
  el.style.visibility = p > 0 || rellenos[0] < 0 ? 'visible' : 'hidden';
}

// Hilo: una cuerda de A a B. `comba` es cuánto cuelga (px) y `amp` cuánto vibra (px), como una cuerda pulsada: una onda
// estacionaria con su armónico. Con p < 1 el hilo todavía se está tendiendo de A hacia B.
export function hilo(path, [ax, ay], [bx, by], { comba = 0, amp = 0, t = 0, frec = 3.2, p = 1 } = {}) {
  const dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L, n = 48, pts = [];
  const fin = clamp(p);
  for (let i = 0; i <= n; i++) {
    const u = (i / n) * fin;
    const vib = amp * (Math.sin(Math.PI * u) * Math.sin(2 * Math.PI * frec * t) + 0.3 * Math.sin(2 * Math.PI * u) * Math.sin(2 * Math.PI * frec * 2.1 * t + 1));
    pts.push(`${(ax + dx * u + nx * vib).toFixed(1)} ${(ay + dy * u + comba * 4 * u * (1 - u) + ny * vib).toFixed(1)}`);
  }
  path.setAttribute('d', 'M' + pts.join(' L '));
  path.style.visibility = p > 0 ? 'visible' : 'hidden';
}

// Cinta sin fin: el texto de la cinta (un <span> con el texto repetido dos veces) corre hacia la izquierda sin terminar
// nunca. `x` es cuánto avanzó, en px (se pasa ya integrado, para poder frenarla y volver a arrancarla).
export function cinta(el, x) {
  const s = el.firstElementChild, w = s.scrollWidth / 2;
  s.style.transform = `translateX(${-(((x % w) + w) % w)}px)`;
}

// Cine: dibuja en un <canvas> el cuadro de la película (imágenes ya decodificadas) que corresponde al instante t,
// a `fps` cuadros por segundo desde t0, con el parpadeo de un proyector. `recorte` = [x, y, ancho, alto] del cuadro.
export function cine(canvas, cuadros, t, t0, fps = 12, recorte) {
  const k = clamp(Math.floor((t - t0) * fps), 0, cuadros.length - 1), im = cuadros[k];
  const [sx, sy, sw, sh] = recorte || [0, 0, im.naturalWidth, im.naturalHeight];
  canvas.getContext('2d').drawImage(im, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  canvas.style.filter = `brightness(${(1 + 0.05 * Math.sin(k * 2.7) + 0.03 * Math.sin(k * 7.3)).toFixed(3)}) contrast(1.05)`;
}

// ───── Estrenado en el 06 ─────
// Pulso: una línea de electrocardiograma que corre de derecha a izquierda. `fase(τ)` dice cuántos latidos van hasta el
// instante τ (así el ritmo puede acelerarse y frenarse sin saltos). La forma de cada latido: onda P, complejo QRS y onda T.
export const latido = u => {
  const g = (c, w, h) => h * Math.exp(-((u - c) ** 2) / (2 * w * w));
  return g(0.12, 0.025, 0.12) - g(0.22, 0.008, 0.18) + g(0.245, 0.011, 1) - g(0.272, 0.009, 0.32) + g(0.46, 0.045, 0.24);
};
export function pulso(path, t, { x0 = 0, x1 = 1080, y = 960, amp = 120, vel = 420, fase }) {
  const pts = [];
  for (let x = x0; x <= x1; x += 3) {
    const f = fase(t - (x1 - x) / vel);
    pts.push(`${x} ${(y - amp * latido(f - Math.floor(f))).toFixed(1)}`);
  }
  path.setAttribute('d', 'M' + pts.join(' L '));
}
// Ritmo cardíaco a partir de puntos clave [[tiempo, latidos por minuto], …]: devuelve fase(τ), la integral del ritmo
export function ritmo(claves, duracion, paso = 0.01) {
  const bpm = t => {
    if (t <= claves[0][0]) return claves[0][1];
    for (let i = 1; i < claves.length; i++) if (t <= claves[i][0]) {
      const [a, va] = claves[i - 1], [b, vb] = claves[i], p = (t - a) / (b - a);
      return va + (vb - va) * (-(Math.cos(Math.PI * p) - 1) / 2);
    }
    return claves[claves.length - 1][1];
  };
  const F = [0];
  for (let i = 1; i * paso <= duracion + 2; i++) F.push(F[i - 1] + (bpm(i * paso) / 60) * paso);
  return tau => {
    if (tau <= 0) return (tau * claves[0][1]) / 60;
    const i = Math.min(F.length - 2, Math.floor(tau / paso)), r = tau / paso - i;
    return F[i] + (F[i + 1] - F[i]) * r;
  };
}
