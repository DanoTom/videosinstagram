// Siluetas del 06, al estilo de la intro de Las Chicas Superpoderosas: formas negras geométricas con pocos detalles en
// blanco (el cuello, la corbata, los guantes, el ojo) y una línea blanca que separa el brazo del cuerpo.
// Stendhal está articulado (caja de 400×1000, de perfil, mirando a la derecha): caderas, rodillas, hombros, codos,
// faldones, cabeza y galera se mueven por separado, así la caminata y el tambaleo salen fluidos.

const N = '#141414', B = '#F4EEE3';
const rad = g => (g * Math.PI) / 180;
const rot = ([x, y], [cx, cy], g) => { const a = rad(g), c = Math.cos(a), s = Math.sin(a); return [cx + (x - cx) * c - (y - cy) * s, cy + (x - cx) * s + (y - cy) * c]; };
const pts = (arr, piv, g) => arr.map(p => rot(p, piv, g));
const poli = (arr, fill = N, extra = '') => `<path d="M${arr.map(p => p.map(v => v.toFixed(1)).join(' ')).join(' L ')} Z" fill="${fill}" ${extra}/>`;
const linea = (arr, w, color = N) => `<path d="M${arr.map(p => p.map(v => v.toFixed(1)).join(' ')).join(' L ')}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"/>`;
const desde = (p, largo, g) => [p[0] + Math.sin(rad(g)) * largo, p[1] + Math.cos(rad(g)) * largo];   // g: grados desde la vertical, + hacia adelante

// Una pierna: muslo y canilla (pantalón), y el zapato
function pierna(cadera, muslo, rodilla) {
  const k = desde(cadera, 175, muslo), t = desde(k, 170, muslo - rodilla);
  const zap = poli([[t[0] - 16, t[1] - 8], [t[0] + 50, t[1] + 2], [t[0] + 54, t[1] + 20], [t[0] - 18, t[1] + 20]]);
  return linea([cadera, k, t], 44) + zap;
}
// Un brazo: hombro, codo, mano (guante blanco). Con contorno blanco si va delante del cuerpo.
function brazo(hombro, a1, a2, contorno) {
  const c = desde(hombro, 140, a1), m = desde(c, 128, a2);
  return (contorno ? linea([hombro, c, m], 54, B) : '') + linea([hombro, c, m], 38) +
    `<ellipse cx="${m[0].toFixed(1)}" cy="${m[1].toFixed(1)}" rx="20" ry="17" fill="${B}" stroke="${N}" stroke-width="4"/>`;
}
// La cabeza con la galera (pivote en el cuello). caida: la galera se va para atrás (0 a 1); alza: la galera salta (px).
function cabeza(g, caida = 0, alza = 0) {
  const P = [215, 352];
  const cara = 'M162 238 Q 170 196 222 196 Q 272 198 284 236 L 292 262 L 310 282 L 294 292 L 298 305 L 285 317 Q 283 342 256 353 Q 228 362 204 352 Q 170 338 165 300 Z';
  const ojo = pts([[258, 252], [280, 247], [279, 256], [259, 259]], P, g);
  const ceja = pts([[252, 238], [284, 232]], P, g), boca = pts([[281, 300], [293, 298]], P, g);
  const piv = [230, 205], hg = g - 70 * caida, hd = [-60 * caida, -120 * caida + 260 * caida * caida - alza];
  const copa = pts([[176, 62], [288, 54], [277, 200], [187, 205]], piv, hg - g).map(p => rot([p[0] + hd[0], p[1] + hd[1]], P, g));
  const ala = pts([[146, 204], [230, 188], [316, 196], [318, 214], [230, 206], [144, 224]], piv, hg - g).map(p => rot([p[0] + hd[0], p[1] + hd[1]], P, g));
  const cinta = pts([[186, 182], [279, 176], [278, 190], [186, 196]], piv, hg - g).map(p => rot([p[0] + hd[0], p[1] + hd[1]], P, g));
  return `<g transform="rotate(${g} ${P[0]} ${P[1]})"><path d="${cara}" fill="${N}"/></g>` + poli(ojo, B) + linea(ceja, 6, B) + linea(boca, 5, B) +
    poli(copa) + poli(ala) + poli(cinta, B);
}

// Stendhal entero. phi: fase de la caminata (0 a 1); camina: 0 quieto, 1 caminando; inclina: el cuerpo entero (grados);
// mira: la cabeza hacia arriba (grados, negativo); galera: cuánto se cae; alza: la galera salta (px);
// brazoDelante: 'balancea' | 'pecho' | 'pared' | 'equilibrio' (los dos brazos abiertos; vaiven los mece, en grados).
export function stendhal({ phi = 0, camina = 1, inclina = 0, mira = 0, galera = 0, alza = 0, brazoDelante = 'balancea', vaiven = 0 } = {}) {
  const s = Math.sin(2 * Math.PI * phi), s2 = Math.sin(2 * Math.PI * (phi + 0.5));
  const muslo = 27 * s * camina, rodilla = Math.max(0, Math.sin(2 * Math.PI * phi - 1.3)) * 42 * camina;
  const musloB = 27 * s2 * camina, rodillaB = Math.max(0, Math.sin(2 * Math.PI * (phi + 0.5) - 1.3)) * 42 * camina;
  const bob = -9 * Math.abs(Math.cos(2 * Math.PI * phi)) * camina;
  const braz = -22 * s * camina;
  let o = '';
  // atrás: brazo de atrás, pierna de atrás, faldón
  if (brazoDelante === 'equilibrio') o += brazo([196, 402 + bob], -62 - vaiven, -100 - vaiven * 1.4, true);
  else o += brazo([196, 402 + bob], -braz - 4, -braz + 12, false);
  o += pierna([196, 612 + bob], musloB, rodillaB);
  const fald = 5 * Math.sin(2 * Math.PI * phi + 1) * camina;
  o += poli(pts([[150, 596], [192, 606], [176, 770], [126, 760]], [170, 600], -fald).map(p => [p[0], p[1] + bob]));
  // el cuerpo (levita con panza), la pechera y el cuello blancos
  const torso = 'M150 368 L 248 370 Q 286 400 302 470 Q 320 548 282 614 L 156 618 Q 130 520 140 430 Z';
  o += `<path d="${torso}" fill="${N}" transform="translate(0 ${bob})"/>`;
  o += poli([[230, 372 + bob], [262, 378 + bob], [252, 452 + bob]], B);
  o += poli([[236, 372 + bob], [270, 380 + bob], [254, 406 + bob], [232, 398 + bob]], B, `stroke="${N}" stroke-width="3"`);
  o += poli([[240, 352 + bob], [264, 342 + bob], [258, 378 + bob]], B);
  // pierna de adelante, cabeza, brazo de adelante
  o += pierna([226, 612 + bob], muslo, rodilla);
  o += `<g transform="translate(0 ${bob})">${cabeza(mira, galera, alza)}</g>`;
  const H = [226, 404 + bob];
  if (brazoDelante === 'pecho') o += brazo(H, 32, 150, true);
  else if (brazoDelante === 'pared') o += brazo(H, 95, 80, true);
  else if (brazoDelante === 'equilibrio') o += brazo(H, 66 + vaiven, 104 + vaiven * 1.4, true);
  else o += brazo(H, braz + 4, braz + 16, true);
  return `<g transform="rotate(${inclina} 210 960)">${o}</g>`;
}

// Solo la cabeza con la galera, el cuello y la corbata (para la cortina del retrato a la silueta)
export const perfil = (mira = 0) => `<path d="M150 368 L 248 370 Q 286 400 302 470 L 302 1000 L 140 1000 L 140 430 Z" fill="${N}"/>` +
  poli([[240, 352], [264, 342], [258, 378]], B) + poli([[236, 372], [270, 380], [254, 406], [232, 398]], B, `stroke="${N}" stroke-width="3"`) + cabeza(mira);

// Vista desde arriba: la galera (un círculo con el ala), los hombros y la sombra larga
export function desdeArriba(phi = 0) {
  const p = Math.sin(2 * Math.PI * phi) * 10;
  return `<ellipse cx="200" cy="520" rx="150" ry="70" fill="${N}" opacity=".35" transform="rotate(-20 200 520) translate(170 60)"/>
    <path d="M90 470 Q 200 400 310 470 Q 330 540 200 560 Q 70 540 90 470 Z" fill="${N}"/>
    <rect x="${150 + p}" y="530" width="34" height="90" rx="12" fill="${N}"/><rect x="${216 - p}" y="530" width="34" height="90" rx="12" fill="${N}"/>
    <circle cx="200" cy="480" r="86" fill="${N}"/><circle cx="200" cy="480" r="58" fill="${N}" stroke="${B}" stroke-width="5"/>`;
}

// Florencia en silueta: la cúpula de Brunelleschi, el campanile de Giotto y la torre del Palazzo Vecchio (caja 1080×700)
export const florencia = (c = N) => `
  <path d="M0 520 L 1080 520 L 1080 700 L 0 700 Z" fill="${c}"/>
  <path d="M420 520 Q 420 330 560 300 Q 700 330 700 520 Z" fill="${c}"/>
  <path d="M540 300 L 580 300 L 574 250 L 546 250 Z M552 250 L 568 250 L 560 214 Z" fill="${c}"/>
  <path d="M380 520 L 390 470 L 730 470 L 740 520 Z" fill="${c}"/>
  <path d="M760 520 L 760 240 L 830 240 L 830 520 Z M754 240 L 836 240 L 836 222 L 754 222 Z" fill="${c}"/>
  <path d="M150 520 L 150 330 L 196 330 L 196 520 Z M140 330 L 206 330 L 206 300 L 140 300 Z M156 300 L 190 300 L 190 230 L 156 230 Z M150 230 L 196 230 L 173 196 Z" fill="${c}"/>
  <path d="M0 520 L 0 450 L 120 450 L 120 520 Z M230 520 L 230 430 L 360 430 L 360 520 Z M860 520 L 860 440 L 1080 440 L 1080 520 Z" fill="${c}"/>`;
