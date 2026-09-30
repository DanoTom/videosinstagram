# 00 · Prueba técnica: Medusa (Caravaggio)

Objetivo: comprobar que un reel vertical 1080×1920 se puede componer y renderizar entero desde el entorno de Claude Code, sin Canva.
No es una propuesta de estilo.

- `index.html`: la composición. Todo el estado visual es función del tiempo (`window.seek(t)`), así cada frame es reproducible.
  Abierto en un navegador normal se reproduce en loop para previsualizar.
- `render.mjs`: Chromium headless captura cada frame y ffmpeg lo codifica en H.264.
- `assets/medusa.jpg`: Wikimedia Commons, *Caravaggio – Medusa – Google Art Project* (dominio público), 1920 px.

```bash
npm install                                   # en la raíz del repo
node render.mjs --sheet=0.5,2.5,5,7,9.6,12    # hoja de contactos → out/sheet.jpg
node render.mjs                               # video → out/video.mp4
```

Requiere `ffmpeg` en el PATH.
