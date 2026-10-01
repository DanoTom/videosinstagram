# Videos para @dano_arte

Reels de arte y psicología para la cuenta de Instagram de Dano (psicólogo; escribe el newsletter El Reflejo).
Claude trabaja como director, guionista, diseñador y animador. Todo se escribe y se habla en español rioplatense.

Antes de escribir un guion, leer:
- `docs/guia-de-escritura.md`: reglas de escritura (claridad antes que ingenio, nada dado por sabido, volver siempre a la obra).
- `docs/estrategia-contenido.md`: fórmula de historia primero, formatos y banco de temas.
- `docs/linea-editorial.md`: decisiones de Dano (sin placa final de El Reflejo, frecuencia, voz).
- `docs/guia-visual.md`: marcadores que no tapan lo que señalan, zonas seguras, titulares y subtítulos.

Para elegir tema: el banco de temas de `docs/estrategia-contenido.md` y `docs/banco-de-pistas.md` (obras leídas por
Freud, Lacan, Winnicott, Langer, Pichon-Rivière y otros; separar siempre el dato de la interpretación y no diagnosticar
artistas). Los informes completos de donde salen las pistas están en `docs/investigacion/`.

Flujo de un video (ver `README.md` y `videos/01-no-hay-nadie/` como ejemplo completo):
guion → storyboard → voz (Dano o ElevenLabs) → `herramientas/transcribir.py` → `herramientas/pausas.py` →
`video.html` (cada momento anclado a una palabra de la voz con `W('palabra')`) → `herramientas/render.mjs`.

- Obras: Wikimedia Commons con `herramientas/commons.py` (solo anchos 960/1280/1920/3840; los originales dan 429).
- Verificar cada dato antes de ponerlo en un guion y citar la fuente en `guion.md`.
- Revisar siempre con hojas de fotogramas (`--hoja`) y tiras (`--tira`) antes del render completo.
- El MP4 para mandar tiene que pesar menos de 30 MB (codificar en dos pasadas a ~3,8 Mbps).
