// Siluetas del 06, al estilo de la intro de Las Chicas Superpoderosas: formas negras geométricas con pocos detalles en
// blanco (el cuello, la corbata, los guantes, el ojo) y una línea blanca que separa el brazo del cuerpo.
// Stendhal está articulado (caja de 400×1000, de perfil, mirando a la derecha). Las piernas van con cinemática inversa:
// el pie apoyado queda clavado en el piso mientras la cadera avanza (no patina), y la cadera sube y baja sola, porque la
// pierna no se estira más de lo que mide. Para que el pie no patine en pantalla, el que llama mueve la figura
// fase × ZANCADA unidades (× la escala del svg) por cada ciclo.

const N = '#141414', B = '#F4EEE3';
const rad = g => (g * Math.PI) / 180;
const f1 = v => v.toFixed(1);
const lerp = (a, b, u) => a + (b - a) * u;
const clamp01 = u => Math.max(0, Math.min(1, u));
const suave = u => u * u * (3 - 2 * u);
const linea = (arr, w, color = N) => `<path d="M${arr.map(p => p.map(f1).join(' ')).join(' L ')}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"/>`;
const poli = (arr, fill = N, extra = '') => `<path d="M${arr.map(p => p.map(f1).join(' ')).join(' L ')} Z" fill="${fill}" ${extra}/>`;
const desde = (p, largo, g) => [p[0] + Math.sin(rad(g)) * largo, p[1] + Math.cos(rad(g)) * largo];   // g: grados desde la vertical, + hacia adelante

// ───── Piernas ─────
const MUSLO = 175, CANILLA = 170, TOBILLO = 946;
export const ZANCADA = 290;          // lo que avanza el cuerpo en un ciclo (dos pasos), en unidades de la caja
const APOYO = 0.58;                  // parte del ciclo con el pie en el piso
const ALTO_PASO = 44;

// Dónde está el tobillo respecto de la cadera en la fase p, y cuánto gira el zapato
function pie(p, camina, quieto) {
  p = ((p % 1) + 1) % 1;
  const media = (APOYO * ZANCADA) / 2;
  let x, y = TOBILLO, ang = 0;
  if (p < APOYO) {                                   // apoyado: el pie va para atrás tan rápido como avanza el cuerpo
    const u = p / APOYO;
    x = media * (1 - 2 * u);
    if (u > 0.72) ang = suave((u - 0.72) / 0.28) * 30;   // despega el talón y empuja con la punta
  } else {                                           // en el aire: un arco hacia adelante
    const u = (p - APOYO) / (1 - APOYO);
    x = media * (2 * suave(u) - 1);
    y = TOBILLO - ALTO_PASO * Math.sin(Math.PI * Math.min(1, u * 1.1));
    ang = u < 0.6 ? lerp(30, -14, suave(u / 0.6)) : lerp(-14, 0, suave((u - 0.6) / 0.4));   // la punta sube antes de pisar
  }
  // con el talón levantado, el tobillo sube girando sobre la punta del zapato
  if (ang > 0 && p < APOYO) { x += (1 - Math.cos(rad(ang))) * 58; y -= Math.sin(rad(ang)) * 58; }
  return { x: lerp(quieto, x, camina), y: lerp(TOBILLO, y, camina), ang: ang * camina };
}
// Rodilla por cinemática inversa (dos huesos), siempre hacia adelante
function rodilla(H, A) {
  const dx = A[0] - H[0], dy = A[1] - H[1];
  const d = Math.min(Math.hypot(dx, dy), MUSLO + CANILLA - 0.5);
  const th = Math.atan2(dy, dx), al = Math.acos((MUSLO * MUSLO + d * d - CANILLA * CANILLA) / (2 * MUSLO * d));
  const k1 = [H[0] + MUSLO * Math.cos(th - al), H[1] + MUSLO * Math.sin(th - al)];
  const k2 = [H[0] + MUSLO * Math.cos(th + al), H[1] + MUSLO * Math.sin(th + al)];
  return k1[0] > k2[0] ? k1 : k2;
}
function pierna(H, P) {
  const A = [H[0] + P.x, P.y], K = rodilla(H, A);
  // el zapato, girado sobre el tobillo: talón, suela, punta redondeada, empeine
  const zap = `<path d="M-22 -4 L -22 22 L 52 22 Q 66 22 64 10 Q 60 0 40 -2 L 16 -10 Z" fill="${N}" transform="translate(${f1(A[0])} ${f1(A[1])}) rotate(${f1(P.ang)})"/>`;
  return linea([H, K], 48) + linea([K, A], 40) + zap;
}

// ───── Brazos y guantes ─────
function guante(m, g) {
  return `<g transform="translate(${f1(m[0])} ${f1(m[1])}) rotate(${f1(-g)})" fill="${B}" stroke="${N}" stroke-width="4">
    <ellipse cx="13" cy="9" rx="7" ry="11" transform="rotate(-38 13 9)"/><ellipse cx="0" cy="17" rx="17" ry="19"/>
    <rect x="-16" y="-9" width="32" height="13" rx="5"/></g>`;
}
// hombro, codo, mano. Con contorno blanco si va delante del cuerpo (solo desde la mitad del brazo: así el hombro se funde
// con la levita y no queda un rulo blanco)
function brazo(hombro, a1, a2, contorno) {
  const c = desde(hombro, 140, a1), m = desde(c, 124, a2), medio = desde(hombro, 70, a1);
  return (contorno ? linea([medio, c, m], 52, B) : '') + linea([hombro, c, m], 38) + guante(m, a2);
}

// ───── Cabeza ─────
// mira: grados (negativo, hacia arriba). caida: la galera se va para atrás dando vueltas (0 a 1); alza: salta (px);
// aplasta: se achata al caer (0 a 1); parpadeo: 0 abierto, 1 cerrado.
// boca: de -1 (para abajo) a 1 (sonríe), o 'o' (abierta, asombro)
function cabeza({ mira = 0, caida = 0, alza = 0, aplasta = 0, parpadeo = 0, boca = 0.6 } = {}) {
  const cara = 'M162 238 Q 170 196 222 196 Q 272 198 284 236 L 292 262 L 310 282 L 294 292 L 298 305 L 285 317 Q 283 342 256 353 Q 228 362 204 352 Q 170 338 165 300 Z';
  const abre = Math.max(0.12, 1 - parpadeo);
  const ojo = `<ellipse cx="266" cy="254" rx="14" ry="${f1(10 * abre)}" fill="${B}"/>` + (abre > 0.5 ? `<circle cx="273" cy="254" r="5.5" fill="${N}"/>` : '');
  const ceja = `<path d="M248 ${f1(236 - 4 * parpadeo)} Q 266 ${f1(226 - 3 * parpadeo)} 286 232" fill="none" stroke="${B}" stroke-width="6" stroke-linecap="round"/>`;
  const labios = boca === 'o' ? `<ellipse cx="284" cy="305" rx="7" ry="9" fill="${B}"/>`
    : `<path d="M274 ${f1(304 - 2 * boca)} Q 284 ${f1(304 + 7 * boca)} 293 ${f1(302 - 2 * boca)}" fill="none" stroke="${B}" stroke-width="5" stroke-linecap="round"/>`;
  // la galera: copa con un poco de vuelo arriba, ala curva, cinta blanca
  const hd = [-70 * caida, -150 * caida + 330 * caida * caida - alza];
  const sx = 1 + 0.45 * aplasta, sy = 1 - 0.3 * aplasta;
  const galera = `<g transform="translate(${f1(hd[0])} ${f1(hd[1])}) rotate(${f1(-140 * caida)} 230 205) translate(230 205) scale(${f1(sx)} ${f1(sy)}) translate(-230 -205)">
    <path d="M178 202 L 172 60 Q 230 46 292 56 L 280 200 Z" fill="${N}"/>
    <path d="M182 180 L 280 176 L 279 192 L 181 196 Z" fill="${B}"/>
    <path d="M140 210 Q 150 196 230 192 Q 306 190 322 200 Q 322 212 312 214 Q 232 206 150 222 Q 136 222 140 210 Z" fill="${N}"/></g>`;
  return `<g transform="rotate(${f1(mira)} 215 352)"><path d="${cara}" fill="${N}"/>${ojo}${ceja}${labios}${galera}</g>`;
}

// ───── El cuerpo entero ─────
// fase: del ciclo de la caminata (0 a 1, sigue de largo); camina: 0 quieto, 1 caminando; inclina: el cuerpo entero (grados,
// sobre los pies); brazos: 'balancea' | 'pecho' | 'equilibrio'; vaiven: mece los brazos abiertos (grados);
// respira: 0 a 1 (sube y baja el torso); y lo de la cabeza (mira, caida, alza, aplasta, parpadeo).
export function stendhal({ fase = 0, camina = 1, inclina = 0, brazos = 'balancea', vaiven = 0, respira = 0, ...cab } = {}) {
  const pA = pie(fase + 0.5, camina, -12), pD = pie(fase, camina, 18);          // pierna de atrás y de adelante
  // la cadera queda lo más alta posible sin estirar las piernas de más: de ahí sale el sube y baja de la caminata
  const largo = (MUSLO + CANILLA) * 0.985;
  const alto = Math.max(...[[pA, 198], [pD, 226]].map(([p, hx]) => p.y - Math.sqrt(Math.max(0, largo * largo - p.x * p.x))));
  const bob = alto - 606 - 2.5 * respira;
  const HA = [198, alto], HD = [226, alto];
  // brazos: el de adelante va al revés que la pierna de adelante; el antebrazo llega un poco tarde (superposición)
  const adelante = q => pie(q, 1, 0).x / ((APOYO * ZANCADA) / 2);
  const sw = 26 * adelante(fase) * camina, swTarde = 26 * adelante(fase - 0.07) * camina;
  let o = '';
  const hA = [196, 402 + bob], hD = [228, 404 + bob];
  if (brazos === 'equilibrio') o += brazo(hA, -64 - vaiven, -100 - vaiven * 1.3, true);
  else o += brazo(hA, sw - 4, swTarde + 10, false);
  o += pierna(HA, pA);
  // faldones: se mecen con el paso, un poco después que las piernas
  const fald = (6 * Math.sin(2 * Math.PI * (fase - 0.12)) + 3) * camina;
  o += `<path d="M150 596 L 192 606 L 178 772 Q 152 774 126 762 Z" fill="${N}" transform="translate(0 ${f1(bob)}) rotate(${f1(-fald)} 170 600)"/>`;
  // la levita con panza; la pechera, la corbata y el cuello blancos; la línea donde se abre la levita
  o += `<g transform="translate(0 ${f1(bob)})">
    <path d="M150 368 L 248 370 Q 286 400 302 470 Q 320 548 282 614 L 156 618 Q 130 520 140 430 Z" fill="${N}"/>
    <path d="M230 372 L 262 378 L 252 452 Z" fill="${B}"/>
    <path d="M236 372 L 270 380 L 254 406 L 232 398 Z" fill="${B}" stroke="${N}" stroke-width="3"/>
    <path d="M240 352 L 264 342 L 258 378 Z" fill="${B}"/>
    <path d="M254 452 Q 290 520 276 606" fill="none" stroke="${B}" stroke-width="4" opacity=".8"/></g>`;
  o += pierna(HD, pD);
  o += `<g transform="translate(0 ${f1(bob)})">${cabeza(cab)}</g>`;
  if (brazos === 'pecho') o += brazo(hD, 34, 150, true);
  else if (brazos === 'equilibrio') o += brazo(hD, 66 + vaiven, 106 + vaiven * 1.3, true);
  else o += brazo(hD, -sw + 4, -swTarde + 16, true);
  return `<g transform="rotate(${f1(inclina)} 212 970)">${o}</g>`;
}

// Solo la cabeza con la galera, el cuello y la corbata (para la cortina del retrato a la silueta)
export const perfil = (mira = 0) => `<path d="M150 368 L 248 370 Q 286 400 302 470 L 302 1000 L 140 1000 L 140 430 Z" fill="${N}"/>
  <path d="M236 372 L 270 380 L 254 406 L 232 398 Z" fill="${B}" stroke="${N}" stroke-width="3"/><path d="M240 352 L 264 342 L 258 378 Z" fill="${B}"/>` + cabeza({ mira });

// Florencia en silueta: la cúpula de Brunelleschi, el campanile de Giotto y la torre del Palazzo Vecchio (caja 1080×700)
export const florencia = (c = N) => `
  <path d="M0 520 L 1080 520 L 1080 700 L 0 700 Z" fill="${c}"/>
  <path d="M420 520 Q 420 330 560 300 Q 700 330 700 520 Z" fill="${c}"/>
  <path d="M540 300 L 580 300 L 574 250 L 546 250 Z M552 250 L 568 250 L 560 214 Z" fill="${c}"/>
  <path d="M380 520 L 390 470 L 730 470 L 740 520 Z" fill="${c}"/>
  <path d="M760 520 L 760 240 L 830 240 L 830 520 Z M754 240 L 836 240 L 836 222 L 754 222 Z" fill="${c}"/>
  <path d="M150 520 L 150 330 L 196 330 L 196 520 Z M140 330 L 206 330 L 206 300 L 140 300 Z M156 300 L 190 300 L 190 230 L 156 230 Z M150 230 L 196 230 L 173 196 Z" fill="${c}"/>
  <path d="M0 520 L 0 450 L 120 450 L 120 520 Z M230 520 L 230 430 L 360 430 L 360 520 Z M860 520 L 860 440 L 1080 440 L 1080 520 Z" fill="${c}"/>`;

// Una fila de casas florentinas para el travelling del final (caja 2160×700, se repite): techos, una torre, ventanas claras
export const casas = (c = N, v = B) => {
  let o = '';
  const xs = [[0, 300, 330], [300, 220, 420], [520, 330, 300], [850, 120, 560], [970, 280, 360], [1250, 360, 280], [1610, 250, 400], [1860, 300, 330]];
  for (const [x, w, h] of xs) {
    const y = 700 - h;
    o += `<path d="M${x} 700 L ${x} ${y} L ${x + w} ${y} L ${x + w} 700 Z M${x - 10} ${y} L ${x + w + 10} ${y} L ${x + w + 10} ${y - 16} L ${x - 10} ${y - 16} Z" fill="${c}"/>`;
    for (let fx = x + 30; fx < x + w - 40; fx += 70) for (let fy = y + 40; fy < 640; fy += 90) o += `<rect x="${fx}" y="${fy}" width="28" height="48" rx="12" fill="${v}"/>`;
  }
  o += `<path d="M850 160 L 850 120 L 860 120 L 860 90 L 910 90 L 910 120 L 920 120 L 920 160 Z" fill="${c}"/>`;
  return o;
};
