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

// Los ángulos de brazo() para que la mano llegue a m (el codo, abajo): cinemática inversa de dos huesos
function alcanzar(hombro, m) {
  const dx = m[0] - hombro[0], dy = m[1] - hombro[1], d = Math.max(17, Math.min(Math.hypot(dx, dy), 263.5));
  const g0 = Math.atan2(dx, dy) * 180 / Math.PI, al = Math.acos((140 * 140 + d * d - 124 * 124) / (2 * 140 * d)) * 180 / Math.PI;
  const a1 = g0 - al, c = desde(hombro, 140, a1);
  return [a1, Math.atan2(m[0] - c[0], m[1] - c[1]) * 180 / Math.PI];
}
const girar = ([x, y], g, [cx, cy]) => { const a = rad(g), c = Math.cos(a), s = Math.sin(a); return [cx + (x - cx) * c - (y - cy) * s, cy + (x - cx) * s + (y - cy) * c]; };

// ───── Cabeza ─────
// mira: grados (negativo, hacia arriba). caida: la galera se va para atrás dando vueltas (0 a 1); alza: salta (px);
// aplasta: se achata al caer (0 a 1); parpadeo: 0 abierto, 1 cerrado.
// boca: de -1 (para abajo) a 1 (sonríe), o 'o' (abierta, asombro)
// sombrero: 'galera' | 'gorra' | 'frigio' (el gorro rojo de los revolucionarios) | 'bicornio' (la guardia) | 'casco' (fútbol
// americano, con la reja blanca) | 'nada'
const ROJO = '#B8282E';
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
  const frigio = `<g transform="translate(0 ${f1(-alza)})"><path d="M158 240 Q 146 168 206 146 Q 262 128 300 160 Q 330 186 312 222 Q 300 238 286 226 Q 296 206 276 196 Q 286 222 292 242 Z" fill="${ROJO}"/>
    <circle cx="180" cy="222" r="15" fill="${B}"/><circle cx="180" cy="222" r="8" fill="#2C4BA0"/></g>`;
  const bicornio = `<g transform="translate(0 ${f1(-alza)})"><path d="M120 222 Q 210 104 330 208 Q 300 196 226 200 Q 160 206 120 222 Z" fill="${N}"/>
    <path d="M128 216 Q 214 118 322 204" fill="none" stroke="${B}" stroke-width="5" opacity=".6"/><circle cx="236" cy="168" r="13" fill="${B}"/><circle cx="236" cy="168" r="6" fill="${ROJO}"/></g>`;
  const casco = `<path d="M156 262 Q 148 172 226 166 Q 300 168 304 240 L 300 270 L 262 274 L 250 236 L 200 240 L 196 290 L 168 292 Z" fill="${N}"/>
    <path d="M296 238 L 334 246 M 300 268 L 336 272 M 334 246 L 336 300 Q 330 314 304 312" fill="none" stroke="${B}" stroke-width="7" stroke-linecap="round"/>
    <path d="M176 200 Q 226 178 286 204" fill="none" stroke="${B}" stroke-width="9"/>`;
  const sombreros = { galera, gorra, frigio, bicornio, casco, nada: '' };
  return `<g transform="rotate(${f1(mira)} 215 352)"><path d="${cara}" fill="${N}"/>${ojo}${ceja}${labios}${sombreros[sombrero] ?? gorra}</g>`;
}

// ───── El cuerpo entero ─────
// fase: del ciclo de la caminata (0 a 1, sigue de largo); camina: 0 quieto, 1 caminando; inclina: el cuerpo entero (grados,
// sobre los pies); brazos: 'balancea' | 'pecho' | 'equilibrio'; vaiven: mece los brazos abiertos (grados);
// respira: 0 a 1 (sube y baja el torso); y lo de la cabeza (mira, caida, alza, aplasta, parpadeo).
// ropa: 'delantal' (el tintorero) | 'levita' | 'camiseta' (el jugador) | 'arbitro' | 'camisa'; brazos también puede ser 'sumerge' (los dos brazos adelante, sosteniendo la
// vara; baja: 0 arriba, 1 abajo).
// lleva: 'fusil' (los dos brazos adelante, apuntando) | 'bandera' (los brazos arriba, la vara y una bandera que flamea;
// ondea: el tiempo, para la tela; colorBandera; texto: una leyenda en la tela).
// vara: { G: [x, y], ang, largo, atras } una vara tomada con las dos manos: G es la mano de adelante y ang los grados bajo la
// horizontal, los dos ya con la inclinación (coordenadas de la caja); los brazos la alcanzan por cinemática inversa.
// bA, bD: [a1, a2] los ángulos de un brazo a mano (pisan los de 'brazos'); manoA, manoD: o el punto adonde llega la mano.
export function figura({ fase = 0, camina = 1, inclina = 0, brazos = 'balancea', vaiven = 0, respira = 0, ropa = 'delantal', baja = 0,
  lleva = null, ondea = 0, colorBandera = ROJO, apunta = 0, vara = null, bA = null, bD = null, manoA = null, manoD = null, ...cab } = {}) {
  if (lleva === 'fusil') brazos = 'fusil';
  if (lleva === 'bandera') brazos = 'bandera';
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
  let palo = '';
  // manoA, manoD: adónde va cada mano (caja, sin la inclinación): los brazos la alcanzan por cinemática inversa
  if (manoA) bA = alcanzar(hA, [manoA[0], manoA[1] + bob]);
  if (manoD) bD = alcanzar(hD, [manoD[0], manoD[1] + bob]);
  if (vara) {
    const { G, ang, largo = 320, atras = 120 } = vara, al = rad(ang - inclina), d = [Math.cos(al), Math.sin(al)];
    const g = girar([G[0], G[1] + bob], -inclina, [212, 970]), b = [g[0] - d[0] * atras, g[1] - d[1] * atras];
    bD = alcanzar(hD, g); bA = alcanzar(hA, b);
    palo = linea([[b[0] - d[0] * 70, b[1] - d[1] * 70], [g[0] + d[0] * largo, g[1] + d[1] * largo]], 14);
  }
  const sumA = [lerp(52, 30, baja), lerp(92, 40, baja)], sumD = [lerp(62, 40, baja), lerp(98, 46, baja)];
  if (bA) o += brazo(hA, bA[0], bA[1], false);
  else if (brazos === 'equilibrio') o += brazo(hA, -64 - vaiven, -100 - vaiven * 1.3, true);
  else if (brazos === 'sumerge') o += brazo(hA, sumA[0], sumA[1], false);
  else if (brazos === 'fusil') o += brazo(hA, 64 + apunta, 96 + apunta, false);
  else if (brazos === 'bandera') o += brazo(hA, 150 + vaiven, 170 + vaiven, false);
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
  } else if (ropa === 'camiseta') {
    // el jugador: camiseta con hombreras y un número
    o += `<g transform="translate(0 ${f1(bob)})">
      <path d="M134 372 Q 190 350 262 368 Q 300 400 296 470 Q 300 548 276 614 L 158 618 Q 132 520 134 430 Z" fill="${N}"/>
      <text x="214" y="520" text-anchor="middle" font-family="Inter Tight, sans-serif" font-weight="800" font-size="84" fill="${B}">7</text></g>`;
  } else if (ropa === 'arbitro') {
    // el árbitro: camiseta a rayas blancas y negras
    const torso = 'M140 372 Q 190 352 258 368 Q 292 400 292 470 Q 300 548 276 614 L 158 618 Q 132 520 138 430 Z';
    o += `<g transform="translate(0 ${f1(bob)})"><clipPath id="torsoArb"><path d="${torso}"/></clipPath><path d="${torso}" fill="${B}"/>
      <g clip-path="url(#torsoArb)">${[0, 1, 2, 3, 4].map(k => `<rect x="${136 + k * 36}" y="340" width="18" height="300" fill="${N}"/>`).join('')}</g>
      <path d="${torso}" fill="none" stroke="${N}" stroke-width="5"/></g>`;
  } else {
    // el tintorero: camisa (negra, como todo), cuello abierto blanco y un pañuelo
    o += `<g transform="translate(0 ${f1(bob)})">
      <path d="M152 368 L 246 370 Q 280 396 290 470 Q 300 548 276 614 L 158 618 Q 134 520 142 430 Z" fill="${N}"/>
      <path d="M236 356 L 262 350 L 250 392 Z" fill="${B}"/></g>`;
  }
  o += pierna(HD, pD);
  // el delantal (solo el tintorero; 'camisa' es lo mismo sin delantal): blanco, del pecho a las rodillas, manchado
  if (ropa === 'delantal') o += `<g transform="translate(0 ${f1(bob)})">
      <path d="M236 352 Q 214 380 222 410" fill="none" stroke="${B}" stroke-width="5"/>
      <path d="M220 410 L 286 416 Q 300 520 304 600 L 300 790 Q 262 800 214 792 Q 206 640 214 520 Z" fill="${B}" stroke="${N}" stroke-width="4"/>
      <circle cx="262" cy="700" r="14" fill="#C8322B" opacity=".8"/><circle cx="240" cy="742" r="9" fill="#2C4BA0" opacity=".8"/><circle cx="282" cy="640" r="7" fill="#D9A441" opacity=".8"/></g>`;
  o += `<g transform="translate(0 ${f1(bob)})">${cabeza(cab)}</g>` + palo;
  if (bD) o += brazo(hD, bD[0], bD[1], true);
  else if (brazos === 'pecho') o += brazo(hD, 34, 150, true);
  else if (brazos === 'equilibrio') o += brazo(hD, 66 + vaiven, 106 + vaiven * 1.3, true);
  else if (brazos === 'sumerge') o += brazo(hD, sumD[0], sumD[1], true);
  else if (brazos === 'fusil') {
    o += brazo(hD, 72 + apunta, 92 + apunta, true);
    const a = rad(90 - apunta - 2), x0 = 150, y0 = 452 + bob, L = 400;
    o += `<g transform="rotate(${f1(apunta)} 230 452)"><path d="M${x0} ${f1(y0)} L ${x0 + L} ${f1(y0 - 6)}" stroke="${N}" stroke-width="16" stroke-linecap="round"/>
      <path d="M${x0 - 10} ${f1(y0 + 4)} L ${x0 + 60} ${f1(y0)} L ${x0 + 40} ${f1(y0 + 34)} L ${x0 - 14} ${f1(y0 + 30)} Z" fill="${N}"/>
      <path d="M${x0 + L} ${f1(y0 - 6)} L ${x0 + L + 80} ${f1(y0 - 10)}" stroke="${B}" stroke-width="5" stroke-linecap="round"/></g>`;
  }
  else if (brazos === 'bandera') {
    o += brazo(hD, 160 - vaiven, 176 - vaiven, true);
    // la vara pasa por la mano de adelante y sube; la tela flamea (ondas que viajan hacia la punta)
    const cD = desde(hD, 140, 160 - vaiven), mD = desde(cD, 124, 176 - vaiven);
    const px = mD[0], py0 = mD[1] + 160, py1 = mD[1] - 560, W = 420, H = 300, pts = [], pb = [];
    for (let k = 0; k <= 20; k++) { const u = k / 20, x = px + W * u, a = Math.sin(u * 6 - ondea * 7) * 26 * u; pts.push(`${f1(x)} ${f1(py1 + a)}`); pb.unshift(`${f1(x)} ${f1(py1 + H + a + 10 * u)}`); }
    o += `<path d="M${px} ${f1(py0)} L ${px} ${f1(py1 - 30)}" stroke="${N}" stroke-width="12" stroke-linecap="round"/>
      <path d="M${pts.join(' L ')} L ${pb.join(' L ')} Z" fill="${colorBandera}" stroke="${N}" stroke-width="4"/>`;
  }
  else o += brazo(hD, -sw + 4, -swTarde + 16, true);
  return `<g transform="rotate(${f1(inclina)} 212 970)">${o}</g>`;
}

// Cuánto sube o baja el cuerpo en la caminata (lo mismo que calcula figura)
export function bobDe(fase = 0, camina = 1, respira = 0) {
  const pA = pie(fase + 0.5, camina, -12), pD = pie(fase, camina, 18), largo = (MUSLO + CANILLA) * 0.985;
  return Math.max(...[pA, pD].map(p => p.y - Math.sqrt(Math.max(0, largo * largo - p.x * p.x)))) - 606 - 2.5 * respira;
}

// Dónde queda la mano de adelante en la pose 'sumerge' (para colgar la vara): misma cuenta que brazo()
export function manoSumerge({ baja = 0, respira = 0 } = {}) {
  const bob = -2.5 * respira;
  const c = desde([228, 404 + bob], 140, lerp(62, 40, baja)), m = desde(c, 124, lerp(98, 46, baja));
  return m;
}

// ───── La oveja (caja 520×380, de perfil, mirando a la derecha) ─────
// lana: el color del vellón; fase: de la caminata (las patas de a pares cruzados); come: baja la cabeza (0 a 1).
// mira: la pupila (-1 hacia atrás, 0 al frente, 1 adelante); ceno: frunce el ceño (0 a 1).
export function oveja({ lana = B, fase = 0, camina = 0, come = 0, parpadeo = 0, mira = 0.3, ceno = 0, oreja = 0 } = {}) {
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
    <path d="M408 120 Q 384 104 376 126 Q 388 138 410 134 Z" fill="${N}" stroke="${lana === N ? B : 'none'}" stroke-width="3" transform="rotate(${f1(-oreja)} 408 128)"/>
    <ellipse cx="452" cy="142" rx="12" ry="${f1(10 * ab)}" fill="${B}"/>${ab > 0.5 ? `<circle cx="${f1(452 + 6 * mira)}" cy="143" r="5" fill="${N}"/>` : ''}
    <path d="M440 ${f1(126 + 6 * ceno)} L 466 ${f1(126 - 4 * ceno)}" stroke="${B}" stroke-width="4" stroke-linecap="round" opacity="${f1(0.4 + 0.6 * Math.abs(ceno))}"/></g>`;
  return o;
}

// ───── La tina de tinte (caja 420×300): madera con zunchos, el líquido del color arriba ─────
export function tina(color, { ola = 0, amp = 4 } = {}) {
  const sup = [];
  for (let x = 40; x <= 380; x += 20) sup.push(`${x} ${f1(66 + Math.sin(x * 0.05 + ola) * amp)}`);
  return `<path d="M20 60 L 400 60 L 370 290 L 50 290 Z" fill="${N}"/>
    <path d="M34 66 L ${sup.join(' L ')} L 386 66 L 384 88 Q 210 110 36 88 Z" fill="${color}"/>
    <path d="M30 130 L 390 130 M 40 230 L 380 230" stroke="${B}" stroke-width="7" opacity=".55"/>
    <path d="M20 60 L 400 60" stroke="${B}" stroke-width="5"/>`;
}

// ───── Un vellón de lana colgado de la vara (caja 220×200, colgado desde arriba en x=110) ─────
// tinte: el color que sube por la lana al meterla en la tina (nivel 0 a 1, de abajo hacia arriba, con el borde que ondula);
// gotea: gotas del color que caen (0 a 1, en loop); id: para el recorte (único por vellón en pantalla).
export function vellon(color, { gotea = 0, tinte = null, nivel = 0, id = 'v', ola = 0, colorGota = null } = {}) {
  const rulos = [[110, 70, 52], [64, 96, 44], [156, 96, 44], [92, 140, 46], [140, 138, 42], [110, 170, 34]];
  const borde = color === N ? B : N;
  let o = `<path d="M110 0 L 110 30" stroke="${N}" stroke-width="6"/>`;
  o += rulos.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r + 4}" fill="${borde}"/>`).join('');
  o += rulos.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`).join('');
  if (tinte && nivel > 0) {
    const y0 = 206 - 196 * nivel, pts = [];
    for (let x = 0; x <= 220; x += 10) pts.push(`${x} ${f1(y0 + Math.sin(x * 0.07 + ola) * 8)}`);
    o += `<clipPath id="${id}-c"><path d="M0 ${f1(y0)} L ${pts.join(' L ')} L 220 230 L 0 230 Z"/></clipPath>
      <g clip-path="url(#${id}-c)">${rulos.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${tinte}"/>`).join('')}</g>`;
  }
  if (gotea > 0) for (const [x, d] of [[80, 0], [120, 0.35], [150, 0.7]]) {
    const q = (gotea + d) % 1;
    o += `<ellipse cx="${x}" cy="${f1(196 + 120 * q * q)}" rx="7" ry="${f1(7 + 6 * q)}" fill="${colorGota || tinte || color}" opacity="${f1(1 - q * 0.6)}"/>`;
  }
  return o;
}

// ───── La balanza del mercado (caja 700×560, el fiel en x=350): inclina en grados (+ baja el platillo izquierdo) ─────
export function balanza(inclina = 0, izq = '', der = '') {
  const a = rad(inclina), L = 250, cx = 350, cy = 120;
  const pi = [cx - L * Math.cos(a), cy + L * Math.sin(a)], pd = [cx + L * Math.cos(a), cy - L * Math.sin(a)];
  const plato = ([x, y], cont) => `<path d="M${f1(x)} ${f1(y)} L ${f1(x - 90)} ${f1(y + 190)} M ${f1(x)} ${f1(y)} L ${f1(x + 90)} ${f1(y + 190)}" stroke="${N}" stroke-width="4"/>
    <path d="M${f1(x - 120)} ${f1(y + 190)} Q ${f1(x)} ${f1(y + 250)} ${f1(x + 120)} ${f1(y + 190)} Z" fill="${N}"/>
    <g transform="translate(${f1(x)} ${f1(y + 190)})">${cont}</g>`;
  return `<path d="M${cx} ${cy} L ${cx} 540 M ${cx - 120} 540 L ${cx + 120} 540" stroke="${N}" stroke-width="16" stroke-linecap="round"/>
    <path d="M${f1(pi[0])} ${f1(pi[1])} L ${f1(pd[0])} ${f1(pd[1])}" stroke="${N}" stroke-width="14" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy}" r="16" fill="${B}" stroke="${N}" stroke-width="6"/>
    ${plato(pi, izq)}${plato(pd, der)}`;
}
// una moneda de oro, de canto o de frente (gira: 0 de frente, 1 de canto)
export const moneda = (gira = 0) => `<ellipse cx="0" cy="0" rx="${f1(30 * Math.max(0.15, Math.abs(Math.cos(gira * Math.PI / 2))))}" ry="30" fill="#D9A441" stroke="${N}" stroke-width="4"/>`;

// ───── Un televisor de 1988 (caja 600×500): la pantalla va de (50,50) a (450,370) ─────
export const tele = (pantalla = '') => `<rect x="0" y="0" width="600" height="440" rx="34" fill="#6B4A2F" stroke="${N}" stroke-width="8"/>
  <rect x="40" y="40" width="420" height="340" rx="26" fill="#1E2A22"/>
  <svg x="50" y="50" width="400" height="320" viewBox="0 0 400 320" overflow="hidden">${pantalla}</svg>
  <rect x="40" y="40" width="420" height="340" rx="26" fill="none" stroke="${N}" stroke-width="10"/>
  <circle cx="530" cy="110" r="22" fill="${N}"/><circle cx="530" cy="180" r="22" fill="${N}"/>
  ${Array.from({ length: 6 }, (_, k) => `<path d="M505 ${250 + k * 18} L 555 ${250 + k * 18}" stroke="${N}" stroke-width="6"/>`).join('')}
  <path d="M120 440 L 90 500 M 480 440 L 510 500" stroke="${N}" stroke-width="12" stroke-linecap="round"/>`;
