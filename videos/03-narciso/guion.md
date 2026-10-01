# 03 · Narciso: no se enamoró de sí mismo

Formato C (*Mitos al revés* · 1) · Duración final: 1 min 29 s (versión de 90 s) · 1080×1920 · Sistema visual v1 con paleta propia (ver abajo).

Escrito desde Ovidio: no apareció la entrega de El Reflejo sobre Narciso. Dano revisó el guion y lo aprobó sin cambios.

## Guion (voz en off) · versión de 90 s (la que se publica)

Instagram no deja pasar de 90 s la música de su biblioteca, y Dano publica desde el celular. La voz ya estaba grabada, así
que en vez de regrabar se sacaron frases enteras de la grabación (`herramientas/recortar.py`), se achicaron los silencios a
0,32 s y se aceleró un 3 %. Lo que se dice:

> Narciso no se enamoró de sí mismo. Se enamoró de un chico que vio en el agua, sin saber que era él. Y cuando por fin supo que era él, saberlo no lo salvó.
>
> El poeta romano Ovidio cuenta que, cuando Narciso nació, un adivino le dijo a su madre que iba a llegar a viejo «si nunca se conoce a sí mismo».
>
> Narciso creció tan hermoso que todos lo deseaban, y tan orgulloso que los rechazaba a todos.
>
> Una de las que lo amaban era Eco, una ninfa castigada por la diosa Juno a repetir las últimas palabras que escuchaba. Eco quiso abrazarlo, y él la rechazó: «Antes me muero que entregarme a vos». Y ella solo pudo repetir: «Entregarme a vos».
>
> Un día, Narciso se inclinó a tomar agua y vio a un chico hermoso. Lo quiso besar, y besó el agua.
>
> Hasta que entendió: «¡Ese soy yo!». No pudo dejar de mirarse. Lo último que dijo, antes de morir, fue «adiós». Y Eco, que todavía lo quería, le devolvió: «adiós».
>
> Se conoció a sí mismo, y no llegó a viejo.
>
> ¿Por qué saberlo no lo salvó? Freud escribió: «Al final uno tiene que empezar a amar para no caer enfermo». Narciso nunca empezó: rechazó a todos, y todo ese amor terminó en su propio reflejo. No murió por quererse demasiado. Murió porque no pudo querer a otro.
>
> Quizás querer a alguien empieza cuando el otro nos contesta algo que no dijimos nosotros.

245 palabras: 84,3 s de voz, 88,7 s con las pausas para los ecos y la cola.

**Qué se sacó y por qué** (en ese orden de prioridad, cuidando que cada paso de la historia se siga diciendo):

| Frase | s | Por qué se puede sacar |
|---|---|---|
| «Lo que quiero lo tengo conmigo», dijo, «y por eso no lo puedo tener». | 4,8 | La más linda, pero lo mismo lo explican Freud y "todo ese amor terminó en su propio reflejo". |
| Avergonzada, se escondió en el bosque hasta que de ella solo quedó la voz. | 4,6 | Lo cuenta la imagen: Eco se deshace mientras su voz rebota. |
| Le sonrió, y el chico le sonrió. | 2,5 | "Vio a un chico hermoso" y "besó el agua" alcanzan para entender que era un reflejo. |
| Pero saberlo no lo salvó. | 2,2 | Se repetía: la pregunta "¿Por qué saberlo no lo salvó?" vuelve más adelante. |
| Se cumplió lo que dijo el adivino. | 2,1 | "Se conoció a sí mismo, y no llegó a viejo" repite las palabras de la profecía; se entiende sola. |
| en su ensayo sobre el narcisismo | 1,8 | Queda en la ficha en pantalla (*Introducción del narcisismo*, 1914). |

Si Dano prefiere otra combinación (por ejemplo, volver a poner la frase del espejo y sacar el orgullo), se rehace en minutos
con los comandos de abajo: la animación se resincroniza sola.

### Versión larga (1 min 57 s)

Es la primera, con el guion completo. No se publica, pero queda en la historia del repo (commit `258f3d6`):

> Narciso no se enamoró de sí mismo. Se enamoró de un chico que vio en el agua, sin saber que era él. Y cuando por fin supo que era él, saberlo no lo salvó.
>
> El poeta romano Ovidio cuenta que, cuando Narciso nació, un adivino le dijo a su madre que iba a llegar a viejo «si nunca se conoce a sí mismo».
>
> Narciso creció tan hermoso que todos lo deseaban, y tan orgulloso que los rechazaba a todos.
>
> Una de las que lo amaban era Eco, una ninfa castigada por la diosa Juno a repetir las últimas palabras que escuchaba. Eco quiso abrazarlo, y él la rechazó: «Antes me muero que entregarme a vos». Y ella solo pudo repetir: «Entregarme a vos». Avergonzada, se escondió en el bosque hasta que de ella solo quedó la voz.
>
> Un día, Narciso se inclinó a tomar agua y vio a un chico hermoso. Le sonrió, y el chico le sonrió. Lo quiso besar, y besó el agua.
>
> Hasta que entendió: «¡Ese soy yo!». Pero saberlo no lo salvó. «Lo que quiero lo tengo conmigo», dijo, «y por eso no lo puedo tener». No pudo dejar de mirarse. Lo último que dijo, antes de morir, fue «adiós». Y Eco, que todavía lo quería, le devolvió: «adiós».
>
> Se cumplió lo que dijo el adivino: se conoció a sí mismo, y no llegó a viejo.
>
> ¿Por qué saberlo no lo salvó? Freud, en su ensayo sobre el narcisismo, escribió: «Al final uno tiene que empezar a amar para no caer enfermo». Narciso nunca empezó: rechazó a todos, y todo ese amor terminó en su propio reflejo. No murió por quererse demasiado. Murió porque no pudo querer a otro.
>
> Quizás querer a alguien empieza cuando el otro nos contesta algo que no dijimos nosotros.

298 palabras: 108,8 s de voz (2,7 palabras por segundo, el mismo ritmo que el 02) y 116,8 s con las pausas.
Por eso, desde el 04, los guiones tienen como máximo 220 palabras.

### Por qué está armado así

- **El mito al revés, dos veces.** Todos creen que Narciso se quería demasiado; en Ovidio no sabe que el chico del agua es él
  (gancho). Y la frase más famosa de los griegos, "conocete a vos mismo", acá es una condena: el adivino dice que va a vivir
  mucho *si nunca* se conoce (promesa y vuelta al final).
- **Una revelación cada 10 segundos:** la profecía, Eco que solo repite, "entregarme a vos", "besó el agua", "¡Ese soy yo!",
  el último "adiós" que vuelve, la profecía cumplida, Freud.
- **Eco y el agua son dos espejos:** una le devuelve las palabras y el otro, los gestos. Nadie le contesta algo propio. Esa es
  la idea que el cierre le devuelve a quien mira, sin juzgarlo, e incluye a quien habla ("nos", "nosotros").
- **El giro es uno solo y está dicho simple:** la frase de Freud, conectada enseguida con la historia ("Narciso nunca empezó").
  Es una cita textual, no una lectura nuestra; la lectura ("no murió por quererse demasiado") va después y es del video.

## Guion visual

Dano pidió, al ver el storyboard, no repetir la paleta ni los efectos del 02. El storyboard (`storyboard.jpg`) quedó como
plan de contenido; el video final cambia la paleta, las composiciones y los efectos (ver [guía visual](../../docs/guia-visual.md#variar-de-un-video-a-otro)).

**Paleta, sacada de las obras:** estanque `#0E2420` (el agua de Waterhouse; fondo principal), rosa Eco `#E5BDB3` (su vestido;
fondo del tramo de Eco, con tinta `#8E3B36`), vino `#3E1820` (Freud), pétalo `#F2EEE4` (el cierre) y azafrán `#E8A33D`
(acento y marcadores). El blanco y el azafrán son los colores de la flor del narciso como la describe Ovidio.

**Lo que cambia respecto del 02:**
- Obras a sangre (llenan la pantalla) con la cámara moviéndose adentro, en vez de láminas fijas en el centro.
- La transición entre tramos es una "marea": el color nuevo sube desde abajo con el borde ondulado.
- El agua se mueve: un filtro de desplazamiento ondula las imágenes del estanque; el beso abre anillos y sacude la imagen.
- Eco se ve y se oye: sus palabras rebotan en pantalla cada vez más débiles, sincronizadas con el eco de la voz; al final su
  figura se deshace y queda una onda de sonido.
- Las citas aparecen palabra por palabra, al ritmo de la voz.
- El sello de la serie es dar vuelta la imagen: la ficha "Mitos al revés" entra invertida, el gancho es el reflejo girado
  180° y el último segundo vuelve a ese primer cuadro, así el loop de Instagram empalma.

| # | Tramo | Imagen | Texto en pantalla |
|---|---|---|---|
| 1 | Gancho | El reflejo de Caravaggio girado 180° y aclarado, a sangre: parece un chico que se asoma | "Mitos al revés · 1" · "No se enamoró de sí mismo." · "Se enamoró de un chico." |
| 2 | Revelación y promesa | En "sin saber que era él" la imagen gira, se achica y queda el cuadro entero al derecho. Elipse sobre la cabeza, línea punteada y elipse punteada sobre el reflejo | "Era él." · "él" / "su reflejo" · "Saberlo no lo salvó." |
| 3 | La profecía | Carpioni a sangre: la cámara va de la madre con el bebé al adivino y se abre | Cita palabra por palabra: «Va a llegar a viejo si nunca se conoce a sí mismo.» |
| 4 | El orgullo | Lámina con la cara de Caravaggio; una columna de "todos" que se tachan en "los rechazaba a todos" | "Tan hermoso." · "Tan orgulloso." |
| 5 | Eco | Fondo rosa. Waterhouse, Eco. Se acerca en "quiso abrazarlo" y se sacude en "la rechazó"; mientras su voz rebota, se deshace y queda una onda | "Eco" · fichas de Juno · «Antes me muero que entregarme a vos.» · "entregarme a vos." · "a vos." ×3 |
| 6 | El agua | Caravaggio a sangre: la cámara baja de la cara al reflejo y vuelve a subir; el beso abre anillos en la línea del agua | "Besó el agua." |
| 7 | ¡Ese soy yo! | Waterhouse a sangre: de la cara en el agua a la cara de Narciso; se oscurece en "no pudo dejar de mirarse" | "¡Ese soy yo!" con su reflejo invertido |
| 8 | Adiós | Poussin a sangre: de Narciso a Eco, que le devuelve la palabra | "«Adiós.»" · "adiós." ×4, cada vez más débil |
| 9 | Se cumplió | Poussin entero, oscurecido; Tiresias en un espejo redondo | "Se conoció." · "No llegó a viejo." |
| 10 | Freud | Fondo vino. Freud en un espejo ovalado, que en "su propio reflejo" pasa a mostrar a Narciso | "¿Por qué saberlo no lo salvó?" · cita palabra por palabra · "Narciso nunca empezó." |
| 11 | Al revés | El reflejo girado del principio, apenas visible | "No murió por quererse demasiado." (tachado) · "Murió porque no pudo querer a otro." |
| 12 | Cierre | Fondo pétalo. Waterhouse entero; las flechas de mirada se dibujan en "cuando el otro" y "nos contesta". Sube la marea y vuelve el primer cuadro | "Quizás querer a alguien empieza cuando el otro nos contesta" · "algo que no dijimos nosotros." |

## Obras

- Caravaggio (atribuido), *Narciso*, c. 1597–1599 — Galleria Nazionale d'Arte Antica (Palazzo Barberini), Roma
- Giulio Carpioni, *Liríope lleva a Narciso ante Tiresias*, c. 1671 — Kunsthistorisches Museum, Viena (GG 1646)
- John William Waterhouse, *Eco y Narciso*, 1903 — Walker Art Gallery, Liverpool
- Nicolas Poussin, *Eco y Narciso*, c. 1629–1630 — Museo del Louvre, París (INV 7297)
- Max Halberstadt, retrato de Sigmund Freud, c. 1921

Todas de dominio público, bajadas de Wikimedia Commons.

## Fuentes

Ovidio, *Metamorfosis*, libro III, vv. 339–510 (traducción literal de Ana Pérez Vega, el PDF «Ovidio - Metamorfosis» del Drive).

| Lo que dice la voz | Verso | Texto de la traducción |
|---|---|---|
| La madre le pregunta al adivino si llegará a viejo | 346–348 | "consultado si habría los tiempos largos de ver de una madura senectud, el fatídico vate: «Si a sí no se conociera», dijo." |
| Lo deseaban muchos; los rechazaba por orgullo | 353–355 | "Muchos jóvenes a él, muchas muchachas lo desearon. Pero –hubo en su tierna hermosura tan dura soberbia– ninguno […] lo conmovió" |
| Eco, castigada por Juno a repetir | 359–369 | "que devolver, de las muchas, las palabras postreras pudiese. Había hecho esto Juno…" |
| "Antes me muero que entregarme a vos" / "Entregarme a vos" | 388–392 | "«Antes», dice, «pereceré, de que tú dispongas de nos.» Repite ella nada sino: «tú dispongas de nos.»" (en latín: *sit tibi copia nostri*). En boca de Eco, la frase del rechazo se vuelve un ofrecimiento; "entregarme a vos" conserva el doble sentido. |
| Avergonzada, se esconde; solo queda la voz | 393–401 | "Despreciada se esconde en las espesuras, y pudibunda con frondas su cara protege […] voz tan solo y huesos restan" |
| Se inclina a beber y ve a un chico | 413–417 | "mientras su sed sedar desea, sed otra le creció […] una esperanza sin cuerpo ama" |
| No sabe que es él | 425 | "A sí se desea, imprudente" |
| Besó el agua | 427 | "Cuántas veces, inútiles, dio besos al falaz manantial." |
| Le sonríe y el chico le sonríe | 459 | "cuando he reído sonríes" |
| "¡Ese soy yo!" | 463 | "Éste yo soy. Lo he sentido, y no me engaña a mí imagen mía" |
| "Lo que quiero lo tengo conmigo, y por eso no lo puedo tener" | 466 | "Lo que deseo conmigo está: pobre a mí mi provisión me hace." (en latín: *inopem me copia fecit*). Traducción libre, para que se entienda al oído. |
| No pudo dejar de mirarse | 437–439 | "No a él de Ceres, no a él cuidado de descanso abstraerlo de ahí puede" |
| Eco todavía lo quería | 395, 494–495 | "prendido tiene el amor, y crece por el dolor del rechazo" · "aunque airada y memoriosa, hondo se dolió" |
| "Adiós" / "adiós" | 499–501 | "La última voz fue ésta […] y díchose adiós, «adiós» dice también Eco." |
| Se cumplió la profecía | 349–350 | "Vana largo tiempo parecióle la voz del augur: el resultado a ella […] la hace buena" |

Sigmund Freud, *Introducción del narcisismo* (1914), capítulo II (Amorrortu, *Obras completas*, t. XIV): "Un fuerte egoísmo
preserva de enfermar, pero al final uno tiene que empezar a amar para no caer enfermo, y por fuerza enfermará si a consecuencia
de una frustración no puede amar." La voz cita solo la parte del medio.

Datos que quedan fuera del guion, pero se pueden usar en la descripción: Narciso tenía dieciséis años (vv. 351–352); el
manantial era uno que nadie había tocado, ni pastores, ni animales, ni una rama caída (vv. 407–410); en el lugar del cuerpo
apareció una flor amarilla rodeada de pétalos blancos (vv. 509–510); y la palabra "narcisismo" la usaron los psiquiatras
Havelock Ellis y Paul Näcke antes que Freud, que cita a Näcke al comienzo del ensayo (esto último, de memoria: verificarlo antes de usarlo).

## Producción

- Voz: ElevenLabs, "Javier – Deep, Confident and Measured", velocidad 1,03, estabilidad 30 y similitud 47 (según el nombre
  del archivo que mandó Dano). Toma única, sin regrabaciones: `audio/voz-elevenlabs.mp3` (108,8 s).
- Transcripción con faster-whisper "medium" (`audio/voz.json`). Correcciones a mano, verificadas transcribiendo de nuevo esos
  tramos: faltaba "a todos" (después de "los rechazaba"), "se inclinó" había salido "se intimidó" y los dos "adiós" estaban
  partidos en "A Dios".
- Versión de 90 s (`herramientas/recortar.py`, nuevo): saca seis frases de la grabación cortando en el medio de los silencios,
  achica a 0,32 s todo silencio más largo y acelera un 3 % sin cambiar el tono → `audio/voz-recortada.json` (84,3 s). Se
  verificó transcribiendo de nuevo la voz editada: no se perdió ninguna sílaba en los empalmes.
- Pausas (`herramientas/pausas.py`): 0,3 s después del gancho y antes de Freud; 0,8 s después del "entregarme a vos" de Eco y
  0,9 s después de su "adiós" (para que se oiga el eco); 2,1 s de cola, donde el video vuelve a su primer cuadro.
- Eco (`herramientas/eco.py`, nuevo): tres rebotes de "a vos" y de "adiós", cada 0,42 s, cada vez más bajos y opacos →
  `audio/voz-editada.wav` (88,7 s). Los rebotes en pantalla usan los mismos tiempos.
- Animación: `video.html`. Cada momento está anclado a una palabra de la voz con `W('palabra')`.

```bash
python3 herramientas/transcribir.py videos/03-narciso/audio/voz-elevenlabs.mp3 videos/03-narciso/audio/voz.json --modelo=medium
cd videos/03-narciso/audio
python3 ../../../herramientas/recortar.py voz-elevenlabs.mp3 voz.json voz-recortada.wav voz-recortada.json \
  --cortar="avergonzada se escondió en el bosque hasta que de ella solo quedó la voz" --cortar="le sonrió y el chico le sonrió" \
  --cortar="pero saberlo no lo salvó" --cortar="lo que quiero lo tengo conmigo dijo y por eso no lo puedo tener" \
  --cortar="se cumplió lo que dijo el adivino" --cortar="en su ensayo sobre el narcisismo" --silencio=0.32 --tempo=1.03
python3 ../../../herramientas/pausas.py voz-recortada.wav voz-recortada.json voz-pausas.wav voz-editada.json \
  "salvó.:0.3" "vos».#2:0.8" "«adiós».#2:0.9" "viejo.:0.3" --cola=2.1
python3 ../../../herramientas/eco.py voz-pausas.wav voz-editada.json voz-editada.wav "a vos#2" "adiós#2"
cd ../../..
node herramientas/render.mjs videos/03-narciso/video.html --audio=videos/03-narciso/audio/voz-editada.wav --workers=4
cd videos/03-narciso   # menos de 30 MB: 240 / 88,7 − 0,13 ≈ 2,4 Mbps de video
ffmpeg -y -i out/video.mp4 -c:v libx264 -preset slow -b:v 2400k -pass 1 -passlogfile out/ffmpeg2pass -an -f mp4 /dev/null
ffmpeg -y -i out/video.mp4 -c:v libx264 -preset slow -b:v 2400k -pass 2 -passlogfile out/ffmpeg2pass -pix_fmt yuv420p \
  -c:a aac -b:a 128k -movflags +faststart 03-narciso.mp4
```
