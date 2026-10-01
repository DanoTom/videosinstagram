# Videos para @dano_arte

Reels de arte y psicología hechos desde Claude Code: guion, guion visual, animación y render, sin editor de video.

## Estructura

- `diseno/`: sistema visual compartido por todos los videos (colores, tipografías, piezas de collage, maqueta de la interfaz de Instagram).
- `videos/NN-nombre/`: un video por carpeta, con `guion.md` (voz y guion visual), `storyboard.html` y sus obras en `assets/`.
- `herramientas/`: `commons.py` (buscar y bajar obras de Wikimedia), `capturar.mjs` (captura cada fotograma), `tablero.py` (arma tableros de revisión),
  `transcribir.py` y `pausas.py` (tiempos de la voz), `recortar.py` (acortar una voz grabada), `eco.py` (eco en palabras
  puntuales), `render.mjs` (video, hojas y tiras), `cotejar.py` (guion contra subtítulos) y `quietud.py` (pantalla vacía o quieta).
- `experimentos/`: pruebas que dieron origen al sistema (render de video, direcciones de arte).
- `docs/`: análisis y notas.

## Flujo por video

1. Tema y guion en el tono de El Reflejo. Dano lo corrige.
2. Guion visual con tiempos y fotogramas clave (`storyboard.html` → `node herramientas/capturar.mjs …`).
3. Dano graba la voz. Se transcribe para sincronizar cortes y subtítulos.
4. Animación y render a MP4 1080×1920. Revisión con hojas de fotogramas.
5. La música en tendencia se agrega en Instagram al publicar.

## Preparar el entorno

En Claude Code en la web no hace falta hacer nada: el hook `.claude/hooks/session-start.sh` instala todo al iniciar cada sesión
(dependencias de Node y de Python según `package.json` y `requirements.txt`, y ffmpeg). El modelo de transcripción se baja solo
la primera vez que se transcribe una voz.

A mano, en otra máquina:

```bash
npm install
pip install -r requirements.txt
ln -sf "$(python3 -c 'import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())')" /usr/local/bin/ffmpeg
```

Dominios que la red del entorno tiene que permitir: `commons.wikimedia.org`, `upload.wikimedia.org`, `drive.google.com`,
`drive.usercontent.google.com`, `huggingface.co` y `*.hf.co` (modelo de transcripción).
