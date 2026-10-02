# 02 · La caída de Ícaro: nadie mira

Formato B (leer un cuadro) · Duración final: 1 min 44 s · 1080×1920 · Sistema visual v1.

## Guion (voz en off) · versión de 90 s, para YouTube Shorts (octubre de 2026)

La versión publicada en Instagram dura 1:44. Para YouTube se acortó la misma grabación con el método de los 90 s
(`herramientas/recortar.py`, ver `docs/guia-de-escritura.md`): salen dos frases, los silencios largos se achican a 0,32 s y la
voz se acelera un 3 %. Las frases que reescribió Dano quedan intactas. Lo que se dice:

> En este cuadro hay un hombre que cayó del cielo. ¿Lo encontrás?
>
> Acá: las piernas de Ícaro, hundiéndose en el mar. Y lo raro no es lo chiquito que es. Es que nadie lo mira.
>
> Su padre, Dédalo, le había hecho alas de plumas y cera, y le advirtió que no volara cerca del sol. No le hizo caso.
>
> En el poema de Ovidio que cuenta este mito hay tres testigos: un pescador, un pastor y un campesino. Ven volar a Dédalo y a Ícaro, y creen que son dioses. Bruegel pintó a los tres… mirando para otro lado.
>
> ¿Por qué nadie ayuda? La psicología social tiene una respuesta. Cuando alguien cree que es el único que presencia una emergencia, el 85% corre a buscar ayuda. Pero cuando cree que hay más personas alrededor, la responsabilidad se diluye y la ayuda cae al 31%. Al haber tanta gente y estar cada uno en lo suyo, la tragedia de Ícaro se vuelve invisible.
>
> Pero en el cuadro hay alguien que sí mira: esta perdiz.
> Ovidio cuenta que, cuando Dédalo entierra a su hijo, una perdiz lo mira y aplaude con las alas. Es su sobrino, que había sido transformado en ave luego de que Dédalo, por envidia, lo empujara desde lo alto de un templo.
>
> Bruegel pintó dos maneras de mirar el dolor ajeno: seguir con lo tuyo por indiferencia, o festejarlo por venganza. Falta una tercera: la del que se detiene a ayudar. No está en el cuadro. Esa queda afuera, del lado de los que miramos.

Qué se sacó:

| Frase | Por qué se puede sacar |
|---|---|
| "En 1968, un artículo fundamental demostró que" | La fuente sigue nombrada ("La psicología social tiene una respuesta") y el año y los autores quedan en la ficha en pantalla (Darley y Latané, 1968). |
| "En el cuadro de Bruegel pasa algo parecido." | Anunciaba lo que la frase siguiente dice completo ("la tragedia de Ícaro se vuelve invisible"), y la imagen ya vuelve al cuadro. |

Además: los tres recortes de los testigos entran apenas se nombra el poema y las personitas, apagadas, apenas se hace la
pregunta (antes había ~3 s y ~10 s de pantalla vacía, que marcaba `herramientas/quietud.py`), la palabra
"Bruegel" ya no sale dos veces en los subtítulos y los subtítulos respetan la zona segura común con YouTube.
Voz: `audio/voz-90.wav` (87,7 s), con 1,5 s de silencio después de "¿Lo encontrás?" para buscar.

### Versión publicada en Instagram (1:44) · versión final de Dano, con las correcciones de la revisión del video

> En este cuadro hay un hombre que cayó del cielo. ¿Lo encontrás?
>
> Acá: las piernas de Ícaro, hundiéndose en el mar. Y lo raro no es lo chiquito que es. Es que nadie lo mira.
>
> Su padre, Dédalo, le había hecho alas de plumas y cera, y le advirtió que no volara cerca del sol. No le hizo caso.
>
> En el poema de Ovidio que cuenta este mito hay tres testigos: un pescador, un pastor y un campesino. Ven volar a Dédalo y a Ícaro, y creen que son dioses. Bruegel pintó a los tres… mirando para otro lado.
>
> ¿Por qué nadie ayuda? La psicología social tiene una respuesta. En 1968, un artículo fundamental demostró que cuando alguien cree que es el único que presencia una emergencia, el 85% corre a buscar ayuda. Pero cuando cree que hay más personas alrededor, la responsabilidad se diluye y la ayuda cae al 31%. En el cuadro de Bruegel pasa algo parecido: al haber tanta gente y estar cada uno en lo suyo, la tragedia de Ícaro se vuelve invisible.
>
> Pero en el cuadro hay alguien que sí mira: esta perdiz.
> Ovidio cuenta que, cuando Dédalo entierra a su hijo, una perdiz lo mira y aplaude con las alas. Es su sobrino, que había sido transformado en ave luego de que Dédalo, por envidia, lo empujara desde lo alto de un templo.
>
> Bruegel pintó dos maneras de mirar el dolor ajeno: seguir con lo tuyo por indiferencia, o festejarlo por venganza. Falta una tercera: la del que se detiene a ayudar. No está en el cuadro. Esa queda afuera, del lado de los que miramos.

Las diferencias con el primer borrador dieron origen a [la guía de escritura](../../docs/guia-de-escritura.md).

## Guion visual

| # | Tramo | Imagen | Texto en pantalla |
|---|---|---|---|
| 1 | Gancho | El cuadro entero; un aro amarillo recorre la escena buscando | "¿Lo encontrás?" |
| 2 | Revelación | Zoom a las piernas en el agua; el marcador rojo las rodea | "Ícaro" · "Nadie lo mira." |
| 3 | El mito | Landon, *Dédalo e Ícaro* (1799): el padre lo suelta al vuelo; el sol del cuadro de Bruegel | "«No vueles cerca del sol.»" |
| 4 | Los testigos | Tres recortes (pescador, pastor, campesino, en el orden de la voz) con flechas hacia donde miran | "Tres testigos." · "«Creyeron que eran dioses.»" · "Mirando para otro lado." |
| 5 | El dato | Una persona sola se enciende y corre; en el grupo, el brillo de la responsabilidad se reparte y se apaga. Vuelve el cuadro: aros sobre cada personaje y un parche de papel tapa a Ícaro | "¿Por qué nadie ayuda?" · "85%" · "31%" · "Cada uno en lo suyo." · fichas Psicología social / Darley y Latané, 1968 |
| 6 | El giro | Zoom a la perdiz; marcas de aplauso. Grabado de Legrand: Dédalo empuja a Perdix desde la torre y Atenea lo transforma | "Esta perdiz." · "Su sobrino." · "Por envidia." |
| 7 | Cierre | Papel tibio; el cuadro entero con rótulos "indiferencia" (campesino) y "venganza" (perdiz). En "esa queda afuera" la cámara se aleja: el cuadro se achica y el recuadro vacío queda de este lado | "detenerse a ayudar" · "Del lado de los que miramos." |

## Obras

- Pieter Bruegel el Viejo (atribuido; probablemente copia de un original perdido), *Paisaje con la caída de Ícaro*, c. 1560 — Museos Reales de Bellas Artes de Bélgica, Bruselas
- Charles Paul Landon, *Dédalo e Ícaro*, 1799 — Museo de Bellas Artes y Encajes de Alençon
- Louis Legrand, según Charles Eisen, *Perdix transformado en perdiz*, grabado para las *Metamorfosis* (París, c. 1770)

## Fuentes

- Ovidio, *Metamorfosis*, libro VIII: los tres testigos (vv. 217–220) y Perdix (vv. 236–259).
- Darley y Latané (1968), "Bystander intervention in emergencies: diffusion of responsibility".
- Refrán flamenco "Ningún arado se detiene por un hombre que muere" (cabeza de un muerto entre los arbustos, a la izquierda). Queda fuera del guion, pero se puede usar.

## Para ElevenLabs

- Velocidad un poco más baja que en el 01 (0,9–0,95) y estabilidad más alta (~60) para un tono más pausado.
- Después de "¿Lo encontrás?" hace falta un silencio de más de un segundo, para que la gente busque. Si el modelo acepta
  `<break time="1.5s" />`, ponelo; si no, lo agrego yo al editar.
- Leé "85%" y "31%" como "ochenta y cinco por ciento" y "treinta y uno por ciento" (escritos así le salen mejor).

## Producción

Versión de 90 s (YouTube):

```bash
cd videos/02-icaro/audio
python3 ../../../herramientas/recortar.py voz-editada.wav voz-editada.json voz-90-recortada.wav voz-90-recortada.json \
  --cortar="en el cuadro de bruegel pasa algo parecido" --cortar="en 1968 un artículo fundamental demostró que" --silencio=0.32 --tempo=1.03
python3 ../../../herramientas/pausas.py voz-90-recortada.wav voz-90-recortada.json voz-90.wav voz-90.json \
  "encontrás?:1.5" "invisible.:0.4" "templo.:0.5" "caso.:0.2" --cola=2.0
cd ../../..
node herramientas/render.mjs videos/02-icaro/video.html --audio=videos/02-icaro/audio/voz-90.wav --workers=4
```

Versión publicada en Instagram (1:44):

- Voz: ElevenLabs (voz "Javier – Deep, Confident and Measured"). Hasta "…lo alto de un templo" es la grabación v2; el cierre (opción B)
  se grabó aparte (`audio/cierre-v3.mp3`), se empalmó en el silencio previo y se bajó 1,1 dB para igualar volumen.
  Las grabaciones anteriores quedan en `audio/v1/` y `audio/v2/`.
- Tiempos por palabra: los de v2 (ya verificados) hasta el empalme y la transcripción nueva para el cierre.
- Pausas agregadas: 1,3 s después de "¿Lo encontrás?" (para buscar), y 0,3–0,6 s antes de los giros → `audio/voz-editada.wav` (104,1 s).
- Animación: `video.html`. La cámara entra en el cuadro (del cuadro entero a las piernas de Ícaro y a la perdiz) con zoom logarítmico.

```bash
node herramientas/render.mjs videos/02-icaro/video.html --audio=videos/02-icaro/audio/voz-editada.wav
```

## Después de publicar

Dos observaciones de una amiga de Dano, ya publicado el video:

- **Pantalla vacía:** de 36 a 48 s quedan casi 10 s de "¿Por qué nadie ayuda?" sobre el fondo verde, hasta que aparecen las
  personitas. Dio origen a la regla 8 de la [guía visual](../../docs/guia-visual.md) y a `herramientas/quietud.py`, que lo
  detecta (también marca 22–25 s).
- **"Bruegel Bruegel" en los subtítulos** (86,7 s): al empalmar el cierre regrabado, la palabra del empalme quedó dos veces
  en `audio/voz-editada.json`. La voz la dice una sola vez. Ya está corregido en el JSON (si se vuelve a renderizar, sale
  bien); lo detecta `herramientas/cotejar.py`.
