# Videos para @dano_arte

Reels de arte y psicología para la cuenta de Instagram de Dano (psicólogo; escribe el newsletter El Reflejo).
Claude trabaja como director, guionista, diseñador y animador. Todo se escribe y se habla en español rioplatense.

**Cada video dura 90 s como máximo** (la música de Instagram se corta ahí): guiones de 190 a 220 palabras.

Antes de escribir un guion, leer:
- `docs/guia-de-escritura.md`: reglas de escritura (claridad antes que ingenio, nada dado por sabido, volver siempre a la obra).
- `docs/estrategia-contenido.md`: fórmula de historia primero, formatos y banco de temas.
- `docs/linea-editorial.md`: decisiones de Dano (sin placa final de El Reflejo, frecuencia, voz).
- `docs/guia-visual.md`: marcadores que no tapan lo que señalan, zonas seguras, titulares y subtítulos, y cómo variar paleta y
  efectos de un video a otro (antes de diseñar, mirar el reel anterior terminado, que está en el Drive de Dano: ver
  `docs/linea-editorial.md`).

Para elegir tema: el banco de temas de `docs/estrategia-contenido.md` y `docs/banco-de-pistas.md` (obras leídas por
Freud, Lacan, Winnicott, Langer, Pichon-Rivière y otros; separar siempre el dato de la interpretación y no diagnosticar
artistas). Los informes completos de donde salen las pistas están en `docs/investigacion/`.

Flujo de un video (ver `README.md` y `videos/01-no-hay-nadie/` como ejemplo completo):
guion → storyboard → voz (Dano o ElevenLabs) → `herramientas/transcribir.py` → `herramientas/pausas.py` →
`video.html` (cada momento anclado a una palabra de la voz con `W('palabra')`) → `herramientas/render.mjs`.
`herramientas/eco.py` agrega eco a palabras puntuales de la voz (03). `herramientas/recortar.py` acorta una voz ya grabada
(saca frases enteras, achica silencios, acelera apenas) y recalcula los tiempos por palabra.

- Cada video se publica en Instagram y en YouTube Shorts con el mismo archivo: `publicacion.md` lleva las dos descripciones
  (ver `docs/linea-editorial.md`).
- Obras: Wikimedia Commons con `herramientas/commons.py` (solo anchos 960/1280/1920/3840; los originales dan 429).
- Verificar cada dato antes de ponerlo en un guion y citar la fuente en `guion.md`.
- Revisar siempre con hojas de fotogramas (`--hoja`) y tiras (`--tira`) antes del render completo, y antes de mandar correr
  `herramientas/cotejar.py` (los subtítulos dicen exactamente el guion) y `herramientas/quietud.py` (nunca más de 2,5 s de
  pantalla vacía ni 4 s quieta). Ver `docs/guia-visual.md` § Revisión.
- Si un guion o una voz pasa de 90 s: el método de recorte de `docs/guia-de-escritura.md` (qué se saca y en qué orden).
- El MP4 para mandar tiene que pesar menos de 30 MB: codificar en dos pasadas con video a `240 / duración_en_s − 0,13` Mbps y
  audio a 128 kbps (02: 104 s → 2,0 Mbps; 03: 117 s → 1,85 Mbps). Los comandos están en `videos/03-narciso/guion.md`.
