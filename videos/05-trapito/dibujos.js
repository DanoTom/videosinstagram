// Dibujos de línea del 05 (la personita y sus cosas). Cada trazo es un <path pathLength="1"> que motor.dibujo() dibuja
// en orden; las piezas con relleno (el trapito, los cachetes) llevan class="relleno" y las costuras class="costura":
// las dos aparecen con un fundido.
// Colores por variable CSS: --linea (el trazo), --trapo (el coral del trapito), --trapo2 (sus costuras), --fondo.

const P = (d, w = 9) => `<path pathLength="1" d="${d}" stroke-width="${w}"/>`;
const R = (d, extra = '') => `<path class="relleno" d="${d}" ${extra}/>`;
const C = (d, w = 5) => `<path class="costura" d="${d}" fill="none" stroke="var(--trapo2)" stroke-width="${w}" stroke-linecap="round" stroke-dasharray="1 13"/>`;

// 1 · El nene dormido, abrazado al trapito (viewBox 0 0 1000 760). El trapito: una tela blanda con el borde cosido y una
// punta que sube hasta el cachete (la que se frota).
export const nene = `
<g class="rellenos">
  ${R('M262 392 a 26 18 0 1 0 52 0 a 26 18 0 1 0 -52 0', 'fill="#E8907F" opacity=".85" data-desde=".3"')}
  ${R('M392 478 C 460 456, 560 452, 640 470 C 660 520, 652 576, 634 610 C 554 628, 456 626, 392 606 C 376 562, 378 516, 392 478 Z', 'fill="var(--trapo)"')}
  ${R('M560 458 C 590 452, 620 456, 640 470 C 646 492, 646 508, 642 520 C 620 500, 590 480, 560 458 Z', 'fill="var(--trapo2)" opacity=".55"')}
  ${C('M410 494 C 470 476, 560 472, 624 486 C 638 526, 634 568, 620 594 C 552 608, 464 608, 408 592 C 396 560, 398 524, 410 494 Z')}
</g>
<g class="trazos" fill="none" stroke="var(--linea)" stroke-linecap="round" stroke-linejoin="round">
  ${P('M478 318 C 478 404, 418 458, 346 458 C 266 458, 214 400, 216 326 C 218 248, 278 196, 350 198 C 426 200, 478 246, 478 318')}
  ${P('M232 270 C 256 214, 316 188, 372 196 C 350 212, 352 236, 378 242 C 396 222, 428 214, 456 232')}
  ${P('M360 198 C 346 164, 384 150, 394 176', 7)}
  ${P('M282 326 Q 304 348 326 326', 8)}
  ${P('M374 330 Q 396 352 418 330', 8)}
  ${P('M340 396 Q 352 406 364 396', 7)}
  ${P('M226 474 C 280 500, 330 504, 386 494 M644 480 C 740 448, 840 432, 930 446 L 948 640 C 700 664, 420 664, 186 646 C 190 570, 202 510, 226 474', 9)}
  ${P('M244 522 C 300 542, 340 544, 384 538 M658 520 C 740 492, 840 478, 916 488', 5)}
  ${P('M292 500 C 360 548, 470 572, 548 548 C 572 540, 590 552, 580 570 C 572 584, 546 580, 538 566', 8)}
  ${P('M640 330 h 44 l -44 44 h 44', 7)}
  ${P('M712 236 h 60 l -60 60 h 60', 8)}
</g>`;

// 8 · La misma pose, de grande: pelo corto, auriculares coral, la frazada más larga (viewBox 0 0 1000 760)
export const grande = `
<g class="trazos" fill="none" stroke="var(--linea)" stroke-linecap="round" stroke-linejoin="round">
  ${P('M452 334 C 452 402, 404 446, 342 446 C 276 446, 230 400, 230 336 C 230 270, 280 224, 342 224 C 406 224, 452 270, 452 334')}
  ${P('M234 318 C 236 262, 282 228, 340 228 C 400 228, 448 262, 450 318 C 420 282, 384 270, 352 286 C 320 268, 266 280, 234 318', 7)}
  ${P('M284 346 Q 304 364 324 346', 8)}
  ${P('M362 346 Q 382 364 402 346', 8)}
  ${P('M330 398 Q 342 406 354 398', 7)}
  ${P('M200 480 C 260 506, 340 508, 430 496 C 580 474, 760 446, 960 456 L 972 640 C 700 664, 420 664, 176 646 C 178 584, 184 520, 200 480', 9)}
  ${P('M214 522 C 300 546, 380 540, 450 532 C 600 514, 780 490, 946 496', 5)}
  ${P('M840 456 C 852 420, 900 414, 920 452', 8)}
</g>
<g class="rellenos">
  ${R('M214 300 C 194 300, 186 330, 190 352 C 194 380, 214 392, 232 388 C 244 386, 248 360, 246 340 C 244 316, 234 300, 214 300 Z', 'fill="var(--trapo)"')}
  ${R('M470 300 C 490 300, 500 330, 496 352 C 492 380, 472 392, 454 388 C 442 386, 438 360, 440 340 C 442 316, 452 300, 470 300 Z', 'fill="var(--trapo)"')}
  <path class="relleno" d="M218 306 C 206 170, 482 170, 466 306" fill="none" stroke="var(--trapo)" stroke-width="16" stroke-linecap="round"/>
</g>`;

// 5 · La personita de pie (viewBox 0 0 400 600). Los brazos los dibuja el video, de los hombros (172,200) y (228,200)
// hasta donde estén las manos.
export const dePie = `
<g class="trazos" fill="none" stroke="var(--linea)" stroke-linecap="round" stroke-linejoin="round">
  ${P('M252 100 C 252 142, 230 168, 200 168 C 170 168, 148 142, 148 100 C 148 62, 172 38, 200 38 C 230 38, 252 62, 252 100')}
  ${P('M150 92 C 156 52, 194 30, 232 44 C 250 56, 258 78, 252 104', 7)}
  ${P('M176 106 L 176 112 M222 106 L 222 112', 9)}
  ${P('M188 138 L 212 138', 6)}
  ${P('M172 184 C 152 264, 142 344, 132 424 L 268 424 C 258 344, 248 264, 228 184 C 212 176, 188 176, 172 184', 9)}
  ${P('M164 424 L 160 562 M236 424 L 240 562', 9)}
</g>`;

// 3 · Los tres objetos: una sábana, un pañuelo, un muñeco (cada uno en un viewBox 0 0 260 240)
export const sabana = `
<g class="rellenos">
  ${R('M42 186 C 32 206, 34 224, 46 232 C 54 214, 70 204, 88 200 Z', 'fill="var(--trapo)"')}
</g>
<g class="trazos" fill="none" stroke="var(--linea)" stroke-linecap="round" stroke-linejoin="round">
  ${P('M30 74 C 96 58, 170 60, 232 74 L 226 138 C 236 160, 230 186, 222 200 C 160 188, 96 192, 42 202 C 50 170, 34 140, 38 110 Z', 8)}
  ${P('M38 110 C 100 96, 170 98, 226 138', 5)}
  ${P('M60 150 C 110 140, 160 146, 200 170', 5)}
</g>`;

export const panuelo = `
<g class="rellenos">
  ${R('M46 70 C 110 58, 176 60, 214 74 C 206 124, 214 168, 204 208 C 150 200, 96 206, 40 198 C 52 154, 38 110, 46 70 Z', 'fill="var(--trapo)"')}
  ${C('M66 90 C 116 80, 168 82, 194 92 C 188 130, 194 166, 186 188 C 144 182, 100 186, 60 180 C 70 148, 60 116, 66 90 Z', 4)}
</g>
<g class="trazos" fill="none" stroke="var(--linea)" stroke-linecap="round" stroke-linejoin="round">
  ${P('M46 70 C 110 58, 176 60, 214 74 C 206 124, 214 168, 204 208 C 150 200, 96 206, 40 198 C 52 154, 38 110, 46 70', 8)}
  ${P('M214 74 C 226 56, 246 50, 250 66 C 254 82, 232 86, 214 74 C 230 60, 236 40, 226 28', 6)}
</g>`;

export const muneco = `
<g class="rellenos">
  ${R('M130 136 C 106 136, 98 160, 100 180 C 102 200, 116 210, 130 210 C 144 210, 158 200, 160 180 C 162 160, 154 136, 130 136 Z', 'fill="var(--trapo)"')}
</g>
<g class="trazos" fill="none" stroke="var(--linea)" stroke-linecap="round" stroke-linejoin="round">
  ${P('M170 76 C 170 104, 152 122, 130 122 C 108 122, 90 104, 90 76 C 90 50, 108 32, 130 32 C 152 32, 170 50, 170 76', 8)}
  ${P('M98 52 C 80 46, 78 22, 98 18 C 110 16, 118 26, 116 36 M162 52 C 180 46, 182 22, 162 18 C 150 16, 142 26, 144 36', 7)}
  ${P('M116 72 L 116 78 M144 72 L 144 78', 10)}
  ${P('M124 94 Q 130 100 136 94 M130 88 L 130 94', 5)}
  ${P('M104 120 C 80 136, 72 176, 82 206 C 90 226, 170 226, 178 206 C 188 176, 180 136, 156 120', 8)}
  ${P('M86 146 C 66 150, 54 166, 58 180 M174 146 C 194 150, 206 166, 202 180', 8)}
</g>`;

// 6 · La cómoda (viewBox 0 0 600 600). El cajón de arriba es aparte (#cajon) para abrirlo: cuando se abre baja y se agranda,
// y arriba aparece su interior (#hueco).
export const comoda = `
<g class="trazos" fill="none" stroke="var(--linea)" stroke-linecap="round" stroke-linejoin="round">
  ${P('M90 160 L 510 160 L 510 520 L 90 520 Z', 9)}
  ${P('M90 340 L 510 340 M270 430 L 330 430', 9)}
  ${P('M110 520 L 110 566 M490 520 L 490 566', 9)}
</g>`;
export const cajon = `
<g fill="none" stroke="var(--linea)" stroke-linecap="round" stroke-linejoin="round" stroke-width="9">
  <path id="hueco" d="M96 166 L 504 166 L 504 330 L 96 330 Z" fill="var(--hueco)" stroke="none"/>
  <g id="dentro"></g>
  <g id="frente"><path d="M90 160 L 510 160 L 510 340 L 90 340 Z" fill="var(--fondo)"/><path d="M270 250 L 330 250"/></g>
</g>`;
