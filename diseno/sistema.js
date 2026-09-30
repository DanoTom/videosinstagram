// Utilidades compartidas por todas las composiciones.

// Encuadra una obra dentro de una caja: data-img="clave" data-crop="x,y,ancho,alto" (píxeles de la imagen original).
export function encuadrar(root, IMGS) {
  for (const el of root.querySelectorAll('[data-img]')) {
    const im = IMGS[el.dataset.img], [sx, sy, sw, sh] = el.dataset.crop.split(',').map(Number);
    const box = { width: el.offsetWidth, height: el.offsetHeight };  // tamaño propio, sin rotación
    const k = Math.max(box.width / sw, box.height / sh);
    el.style.backgroundImage = `url(${im.src})`;
    el.style.backgroundSize = `${im.w * k}px ${im.h * k}px`;
    el.style.backgroundPosition = `${-sx * k + (box.width - sw * k) / 2}px ${-sy * k + (box.height - sh * k) / 2}px`;
  }
}

// Bordes de papel rasgado, con semilla fija para que no cambien entre renders.
export function rasgar(root, semilla = 11) {
  let s = semilla;
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  for (const el of root.querySelectorAll('[data-rasgado]')) {
    const pts = [];
    for (let x = 0; x <= 100; x += 2.5) pts.push(`${x}% ${rnd() * 7}%`);
    for (let x = 100; x >= 0; x -= 2.5) pts.push(`${x}% ${100 - rnd() * 7}%`);
    el.style.clipPath = `polygon(${pts.join(',')})`;
  }
}

// Superpone una maqueta de la interfaz de Reels (íconos, usuario, texto y el corte 3:4 de la grilla del perfil).
export function interfazInstagram(root) {
  for (const f of root.querySelectorAll('.frame')) {
    f.insertAdjacentHTML('beforeend', `<div class="ui"><div class="sombra"></div><div class="top">Reels</div>
      <div class="grilla" style="top:240px"></div><div class="grilla" style="top:1680px"></div>
      <div class="col"><i></i><i></i><i></i><i></i></div><div class="user"><i></i>dano_arte · Seguir</div>
      <div class="cap">Texto del posteo… más</div></div>`);
  }
  if (location.search.includes('ui')) document.body.classList.add('con-ui');
}
