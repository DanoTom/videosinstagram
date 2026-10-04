// Siluetas del 07 (copia del personaje del 06, con otra cabeza y otra ropa: ver docs/guia-visual.md § "Secuencias en
// silueta"). El tintorero: gorra y delantal en vez de galera y levita. Además, la oveja, la tina de tinte y el vellón.
// Las piernas van con cinemática inversa: el pie apoyado queda clavado en el piso mientras la cadera avanza; para que no
// patine en pantalla, el que llama mueve la figura fase × ZANCADA unidades (× la escala del svg) por cada ciclo.

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
// sombrero: 'galera' | 'gorra'
function cabeza({ mira = 0, caida = 0, alza = 0, aplasta = 0, parpadeo = 0, boca = 0.6, sombrero = 'gorra' } = {}) {
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
  // la gorra del tintorero: copa baja y la visera hacia adelante
  const gorra = `<g transform="translate(0 ${f1(-alza)})"><path d="M160 232 Q 158 176 222 172 Q 286 174 290 218 L 334 224 Q 336 236 322 238 L 168 240 Z" fill="${N}"/>
    <path d="M176 222 Q 230 214 284 220" fill="none" stroke="${B}" stroke-width="5" opacity=".7"/></g>`;
  return `<g transform="rotate(${f1(mira)} 215 352)"><path d="${cara}" fill="${N}"/>${ojo}${ceja}${labios}${sombrero === 'galera' ? galera : gorra}</g>`;
}

// ───── El cuerpo entero ─────
// fase: del ciclo de la caminata (0 a 1, sigue de largo); camina: 0 quieto, 1 caminando; inclina: el cuerpo entero (grados,
// sobre los pies); brazos: 'balancea' | 'pecho' | 'equilibrio'; vaiven: mece los brazos abiertos (grados);
// respira: 0 a 1 (sube y baja el torso); y lo de la cabeza (mira, caida, alza, aplasta, parpadeo).
// ropa: 'delantal' (el tintorero) | 'levita'; brazos también puede ser 'sumerge' (los dos brazos adelante, sosteniendo la
// vara; baja: 0 arriba, 1 abajo).
export function figura({ fase = 0, camina = 1, inclina = 0, brazos = 'balancea', vaiven = 0, respira = 0, ropa = 'delantal', baja = 0, ...cab } = {}) {
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
  const sumA = [lerp(52, 30, baja), lerp(92, 40, baja)], sumD = [lerp(62, 40, baja), lerp(98, 46, baja)];
  if (brazos === 'equilibrio') o += brazo(hA, -64 - vaiven, -100 - vaiven * 1.3, true);
  else if (brazos === 'sumerge') o += brazo(hA, sumA[0], sumA[1], false);
  else o += brazo(hA, sw - 4, swTarde + 10, false);
  o += pierna(HA, pA);
  if (ropa === 'levita') {
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
  } else {
    // el tintorero: camisa (negra, como todo), cuello abierto blanco y un pañuelo
    o += `<g transform="translate(0 ${f1(bob)})">
      <path d="M152 368 L 246 370 Q 280 396 290 470 Q 300 548 276 614 L 158 618 Q 134 520 142 430 Z" fill="${N}"/>
      <path d="M236 356 L 262 350 L 250 392 Z" fill="${B}"/></g>`;
  }
  o += pierna(HD, pD);
  // el delantal: blanco, del pecho a las rodillas, con la tira al cuello y un poco manchado de los tintes
  if (ropa === 'delantal') o += `<g transform="translate(0 ${f1(bob)})">
      <path d="M236 352 Q 214 380 222 410" fill="none" stroke="${B}" stroke-width="5"/>
      <path d="M220 410 L 286 416 Q 300 520 304 600 L 300 790 Q 262 800 214 792 Q 206 640 214 520 Z" fill="${B}" stroke="${N}" stroke-width="4"/>
      <circle cx="262" cy="700" r="14" fill="#C8322B" opacity=".8"/><circle cx="240" cy="742" r="9" fill="#2C4BA0" opacity=".8"/><circle cx="282" cy="640" r="7" fill="#D9A441" opacity=".8"/></g>`;
  o += `<g transform="translate(0 ${f1(bob)})">${cabeza(cab)}</g>`;
  if (brazos === 'pecho') o += brazo(hD, 34, 150, true);
  else if (brazos === 'equilibrio') o += brazo(hD, 66 + vaiven, 106 + vaiven * 1.3, true);
  else if (brazos === 'sumerge') o += brazo(hD, sumD[0], sumD[1], true);
  else o += brazo(hD, -sw + 4, -swTarde + 16, true);
  return `<g transform="rotate(${f1(inclina)} 212 970)">${o}</g>`;
}

// Dónde queda la mano de adelante en la pose 'sumerge' (para colgar la vara): misma cuenta que brazo()
export function manoSumerge({ baja = 0, respira = 0 } = {}) {
  const bob = -2.5 * respira;
  const c = desde([228, 404 + bob], 140, lerp(62, 40, baja)), m = desde(c, 124, lerp(98, 46, baja));
  return m;
}

// ───── La oveja (caja 520×380, de perfil, mirando a la derecha) ─────
// lana: el color del vellón; fase: de la caminata (las patas de a pares cruzados); come: baja la cabeza (0 a 1).
export function oveja({ lana = B, fase = 0, camina = 0, come = 0, parpadeo = 0 } = {}) {
  const s = Math.sin(2 * Math.PI * fase) * camina, bob = -6 * Math.abs(Math.cos(2 * Math.PI * fase)) * camina;
  const pata = (x, g) => linea([[x, 250 + bob], desde([x, 250 + bob], 104, g)], 20);
  let o = pata(140, -18 * s) + pata(330, 18 * s);                      // las de atrás
  // el vellón: una nube de rulos
  const rulos = [[150, 150, 70], [215, 120, 74], [290, 118, 72], [355, 148, 66], [120, 200, 56], [200, 205, 66], [285, 210, 66], [360, 200, 54]];
  const borde = lana === N ? B : N;
  o += `<g transform="translate(0 ${f1(bob)})">${rulos.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r + 5}" fill="${borde}" opacity="${lana === N ? 0.0 : 1}"/>`).join('')}
    ${rulos.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${lana}"/>`).join('')}</g>`;
  o += pata(175, 18 * s) + pata(365, -18 * s);                         // las de adelante
  // la cabeza: negra, con la oreja, el ojo blanco; baja para comer
  const ab = Math.max(0.15, 1 - parpadeo);
  o += `<g transform="translate(0 ${f1(bob)}) rotate(${f1(38 * come)} 400 150)">
    <path d="M392 110 Q 440 96 478 136 Q 500 168 486 196 Q 470 214 446 204 Q 410 190 396 160 Z" fill="${N}"/>
    <path d="M408 120 Q 384 104 376 126 Q 388 138 410 134 Z" fill="${N}"/>
    <ellipse cx="452" cy="140" rx="8" ry="${f1(6 * ab)}" fill="${B}"/></g>`;
  return o;
}

// ───── La tina de tinte (caja 420×300): madera con zunchos, el líquido del color arriba ─────
export function tina(color, { ola = 0 } = {}) {
  const sup = [];
  for (let x = 40; x <= 380; x += 20) sup.push(`${x} ${f1(66 + Math.sin(x * 0.05 + ola) * 4)}`);
  return `<path d="M20 60 L 400 60 L 370 290 L 50 290 Z" fill="${N}"/>
    <path d="M34 66 L ${sup.join(' L ')} L 386 66 L 384 88 Q 210 110 36 88 Z" fill="${color}"/>
    <path d="M30 130 L 390 130 M 40 230 L 380 230" stroke="${B}" stroke-width="7" opacity=".55"/>
    <path d="M20 60 L 400 60" stroke="${B}" stroke-width="5"/>`;
}

// ───── Un vellón de lana colgado de la vara (caja 220×200, colgado desde arriba en x=110) ─────
export function vellon(color, { gotea = 0 } = {}) {
  const rulos = [[110, 70, 52], [64, 96, 44], [156, 96, 44], [92, 140, 46], [140, 138, 42], [110, 170, 34]];
  const borde = color === N ? B : N;
  let o = `<path d="M110 0 L 110 30" stroke="${N}" stroke-width="6"/>`;
  o += rulos.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r + 4}" fill="${borde}"/>`).join('');
  o += rulos.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`).join('');
  if (gotea > 0) for (const [x, d] of [[80, 0], [120, 0.35], [150, 0.7]]) {
    const q = (gotea + d) % 1;
    o += `<ellipse cx="${x}" cy="${f1(196 + 120 * q * q)}" rx="7" ry="${f1(7 + 6 * q)}" fill="${color}" opacity="${f1(1 - q * 0.6)}"/>`;
  }
  return o;
}
