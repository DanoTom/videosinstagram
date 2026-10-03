# 05 · El trapito: por qué, de grandes, necesitamos el arte

Formato E (*Cómo funciona*, más psicología) · primera prueba del formato · Duración: 86,3 s · 1080×1920.

Elegido de la tabla de temas del formato E (`docs/estrategia-contenido.md`): es universal (casi todos tuvimos uno o lo vimos),
está cerca de la clínica de Dano y termina en el vínculo entre la mente y el arte, que es la marca del canal. Además mide la
psicología "en limpio": no tiene el juego de buscar algo en un cuadro, que podría explicar por sí solo el resultado.

## Guion (voz en off) · versión 2 de Dano, recortada (grabada)

Dano reescribió el guion: el corazón ya no es solo "el trapito se vuelve cultura", sino la idea central de Winnicott en
*Realidad y juego*: aceptar la realidad es una tarea que nunca termina, y necesitamos un lugar donde descansar de ella. El
ejemplo de Beethoven pasó a ser una canción cualquiera, que cada uno pone (más cercano a quien mira). Tenía 278 palabras
(unos 108 s con las pausas); recortada con el método de los 90 s, sin tocar el giro:

> ¿Tuviste un trapito o un peluche sin el que no te podías dormir?
>
> Un pediatra inglés se lo tomó en serio, y lo que pensó explica por qué, de grandes, necesitamos el arte.
>
> Donald Winnicott atendió bebés y madres durante casi cuarenta años. Vio que, antes del año, muchos adoptan un objeto: una sábana, un pañuelo, un muñeco.
>
> ¿Para qué sirve? Al principio, el bebé no distingue entre él y su mamá. De a poco descubre que ella es otra persona, que se va y vuelve. El trapito ayuda a cruzar ese paso: es lo primero que siente suyo sin ser él, y que lo conecta con ella sin ser ella. Winnicott lo llamó objeto transicional.
>
> Y decía algo más: aceptar la realidad es una tarea que nunca termina. Nadie se libra de la tensión entre el mundo de adentro y el de afuera. Necesitamos un lugar donde descansar.
>
> De bebés, ese lugar fue el trapito. Con los años queda en un cajón, pero lo que hacía se extiende: se vuelve juego, y después, cultura.
>
> Pensalo así: una canción la escribió otro. Pero cuando suena, parece que habla de vos. Viene de afuera, y es tuya. No hay que decidir de quién es.
>
> Por eso, cuando el día pesa, ponés esa canción: un lugar para descansar de la tarea que nunca termina.

222 palabras: 80,9 s de voz grabada (ElevenLabs, igual que el 04), 86,3 s con las pausas.

**Qué se sacó de la versión de Dano y por qué** (método de los 90 s, `docs/guia-de-escritura.md`):

| Frase | Palabras | Por qué |
|---|---|---|
| Lo necesitan para dormirse. | 4 | Lo dice el gancho ("sin el que no te podías dormir"). |
| Y las madres suelen saber algo: no hay que lavarlo. Lavarlo cortaría la continuidad y podría borrar su valor para el bebé. | 22 | Es un gran dato, pero no es un paso del mecanismo. Pasa a una ficha en pantalla mientras se dibujan los objetos (punto 5). Si Dano lo quiere en la voz, entra acelerando un 3 % con `recortar.py`. |
| en Londres · entre los cuatro y los doce meses → antes del año · la punta de | 9 | La ciudad y las edades van en la ficha. |
| Que nadie se libra de la tensión de mantener, separados pero conectados, nuestro mundo interior y el de afuera | 6 | Más corto. "Separados pero conectados" ya se ve en el trapito: "sin ser él… sin ser ella". |
| una canción la escribió otro, en otro año, quizás en otro idioma | 6 | Con "otro" alcanza. |
| "no desaparece: se extiende" → "se extiende" · "es un lugar de descanso para" → "un lugar para descansar de" | 6 | Lo mismo, más corto. |

Además: "durante cuarenta años" pasó a "casi cuarenta": entró al Paddington Green en 1923 y se jubiló a los 65, en 1961.

### Versión 2 de Dano (completa, 278 palabras)

> ¿Tuviste un trapito o un peluche sin el que no te podías dormir?
>
> Un pediatra inglés se lo tomó en serio, y lo que pensó explica por qué, de grandes, necesitamos el arte.
>
> Donald Winnicott atendió bebés y madres durante cuarenta años en Londres. Vio que, entre los cuatro y los doce meses, muchos adoptan un objeto: la punta de una sábana, un pañuelo, un muñeco. Lo necesitan para dormirse. Y las madres suelen saber algo: no hay que lavarlo. Lavarlo cortaría la continuidad y podría borrar su valor para el bebé.
>
> ¿Para qué sirve? Al principio, el bebé no distingue entre él y su mamá. De a poco descubre que ella es otra persona, que se va y vuelve. El trapito ayuda a cruzar ese paso: es lo primero que siente suyo sin ser él, y que lo conecta con ella sin ser ella. Winnicott lo llamó objeto transicional.
>
> Y decía algo más. Que aceptar la realidad es una tarea que nunca termina. Que nadie se libra de la tensión de mantener, separados pero conectados, nuestro mundo interior y el de afuera. Y que necesitamos un lugar donde descansar de esa tarea.
>
> De bebés, ese lugar fue el trapito. Con los años queda en un cajón, pero lo que hacía no desaparece: se extiende. Se vuelve juego, y después, cultura.
>
> Pensalo así: una canción la escribió otro, en otro año, quizás en otro idioma. Y sin embargo, cuando suena, parece que habla de vos. Viene de afuera, y es tuya. No hay que decidir de quién es.
>
> Por eso, cuando el día pesa, ponés esa canción: es un lugar de descanso para la tarea que nunca termina.

### Versión 1 (de Claude)

Terminaba con el cuarteto de Beethoven, que Winnicott pone como ejemplo de la "tercera zona", y con "quizás nunca dejamos el
trapito" (commit `87c5170`).

### Qué se lleva quien mira

- **Datos que no conocía:** que un pediatra estudió el trapito en serio y que tiene nombre (objeto transicional).
- **Cómo funciona la cabeza:** el bebé no se separa de la mamá de un día para el otro; necesita algo en el medio, que es suyo
  sin ser él y lo conecta con ella sin ser ella. Y la tarea de aceptar la realidad (separar y conectar lo de adentro y lo de
  afuera) no termina nunca.
- **Una perspectiva:** poner una canción cuando el día pesa no es evasión: es buscar un lugar de descanso, algo que
  aprendimos a hacer antes de hablar.
- **Un vínculo entre arte y mente:** para Winnicott, la cultura es la versión adulta de aquel trapito: viene de afuera y es
  nuestra, y nadie nos pide decidir de quién es.

### Por qué está armado así

- **Entra por algo concreto y propio**, no por un concepto: la pregunta del gancho obliga a acordarse del suyo.
- **La promesa es rara a propósito** (un trapito y el arte) y se cumple al final.
- **Un solo mecanismo, contado como proceso:** la separación de a poco, con el trapito en el medio.
- **La canción es nuestra, no de Winnicott** ("Pensalo así"): ilustra la idea con algo que todos hicimos; su ejemplo era un
  cuarteto de Beethoven.
- **El cierre rima con el gancho:** el trapito para dormir y la canción cuando el día pesa; y vuelve a "la tarea que nunca
  termina".
- Quedó afuera, para El Reflejo: que si la mamá tarda demasiado el trapito pierde su sentido (funciona porque ella sigue viva
  adentro), y que un adulto en duelo deja de disfrutar de la cultura y la recupera al salir del duelo.

## Guion visual (como quedó)

Primera prueba del kit del formato E (`docs/guia-visual.md` § "Explicar psicología"). **Híbrido:** cine de archivo y
pinturas para el mundo de afuera (bebés de verdad, de hace más de cien años) y nuestra ilustración para lo que pasa adentro
(lo que ninguna filmación puede mostrar). El coral es el color de todo lo que hace lo mismo que el trapito: el trapito, el
hilo, el lugar donde descansar, la zona del juego y la cultura, los auriculares del final.

**Paleta**, sacada de una frazada de bebé y de Cassatt: azul frazada `#24324A` (fondo), algodón `#F1E8D8` (papel, la
personita), coral `#E07A5F` (el trapito y lo que hace lo mismo), salvia `#8FA98B` (fondo de tramo) y tinta `#1D1A17`.

| # | Tramo | Imagen | Texto en pantalla |
|---|---|---|---|
| 1 | Gancho (0–5 s) | **Estreno: la personita.** El nene dormido, abrazado al trapito, se dibuja solo (`dibujo()`): al principio solo están el trapito, la frazada a rayas y la luz de un velador. 1 s de silencio | "¿Tuviste uno?" |
| 2 | Promesa (5–13 s) | El dibujo se achica; del trapito cuelga una etiqueta de museo; un hilo coral cruza la pantalla hasta un cuadro (Khnopff, que vuelve en el tramo 7) | ficha "objeto de estudio" |
| 3 | Winnicott (13–25 s) | **Estreno: cine de archivo.** *El almuerzo del bebé* (Lumière, 1895) en una lámina, con parpadeo de proyector y la cámara que se acerca al bebé; los tres objetos se dibujan en fila | "Donald Winnicott" · ficha "pediatra y psicoanalista" · "Londres, 1923–1961" · "entre los 4 y los 12 meses" · ficha "Y las madres saben que no hay que lavarlo" · "¿Para qué sirve?" |
| 4 | Para qué sirve (25–45 s) | Fondo de frazada a cuadros (guinga). *Desayuno en la cama* (Cassatt) sube como una frazada; dos círculos sobre las caras, casi encimados; la pintura se va y cada círculo se lleva su cara (medallones); se separan en diagonal; el de la mamá se va y vuelve; el trapito cae en el hueco; un hilo a cada lado | "bebé" · "mamá" · "suyo, sin ser él" · "con ella, sin ser ella" · "objeto transicional" |
| 5 | La tarea que nunca termina (45–57 s) | Iris de cine mudo. Los mismos círculos pasan a ser adentro (dibujado: el nene dormido, la imaginación) y afuera (filmado: la película de los Lumière, la realidad y los otros); la personita de pie, un hilo en cada mano. **Estreno: el hilo que vibra** (`hilo()`) en la tensión, y **la cinta sin fin** (`cinta()`): "una tarea que nunca termina" corre sin parar. En "descansar" crece una zona coral y los hilos se aflojan | ficha "Aceptar la realidad es" · "adentro" · "afuera" |
| 6 | El trapito, el cajón, el juego y la cultura (57–67 s) | Papel claro: el nene vuelve con su luz, se borra y queda el trapito; se dibuja una cómoda, el cajón se abre, el trapito entra y se cierra. Del cajón crece la zona coral: adentro, *Juegos de niños* (Bruegel); después se llena de cuadros de los videos anteriores | "juego" · "cultura" |
| 7 | La canción (67–78 s) | La portada de *Escenas de niños* (Schumann). Después *Escuchando a Schumann* (Khnopff) a sangre: la cámara va del piano (el que toca casi no se ve) a ella; un hilo coral entra desde afuera del cuadro. Cierra con un iris sobre ella | "viene de afuera" · "y es tuya" · ficha "la que escucha es su madre" |
| 8 | Cierre (78–86 s) | La personita de grande, en la misma pose del nene; la cinta vuelve; en "ponés esa canción" aparecen los auriculares coral y suben notas; en "descansar" la cinta frena. Se borra y queda el trapito del principio: el loop empalma | — |

**El cine de archivo:** la película (Commons, dominio público) se pasó a 132 cuadros a 12 por segundo
(`assets/repas/`, del segundo 11,5 al 22,5) y `video.html` dibuja en un `<canvas>` el cuadro de cada instante (`cine()`), así
el render es exacto.

## Obras (Wikimedia Commons, dominio público)

- Louis Lumière, *Repas de bébé* (*El almuerzo del bebé*), 1895: Auguste Lumière, su mujer Marguerite y la hija de ambos,
  Andrée. Estuvo entre las diez películas de la primera función pública y paga del cinematógrafo (Salon Indien del Grand
  Café, París, 28 de diciembre de 1895). Archivo: "File:Repas de bébé (1895).webm".
- Mary Cassatt, *Breakfast in Bed* (*Desayuno en la cama*), 1897, Huntington Library.
- Pieter Bruegel el Viejo, *Juegos de niños*, 1560, Kunsthistorisches Museum, Viena.
- Robert Schumann, *Kinderszenen* (*Escenas de niños*), op. 15, 1838: portada de la edición de Breitkopf & Härtel.
- Fernand Khnopff, *En écoutant du Schumann* (*Escuchando a Schumann*), 1883, Museos Reales de Bellas Artes de Bélgica. La
  que escucha es la madre del pintor; del pianista solo se ve una mano sobre el teclado.
- De los videos anteriores (sus archivos se usan desde las carpetas de cada video): Hopper, *Nighthawks*; Bruegel (atrib.),
  *Paisaje con la caída de Ícaro*; Caravaggio (atrib.), *Narciso*; Holbein, *Los embajadores*.
- De Winnicott no hay fotos de dominio público seguras (murió en 1971): no se muestra su cara (regla 12 de la guía visual:
  el recurso se varía, no es obligatorio). El nombre va grande, en una tira.
- Descartada: *The Teddy Bears* (Porter, 1907): es la historia de Ricitos de Oro, no de un chico con su osito.

## Fuentes

D. W. Winnicott, *Obras completas* en español (el PDF «donald-winnicott-obras-completas» del Drive de Dano; páginas del PDF):

| Lo que dice la voz | Fuente |
|---|---|
| Pediatra en Londres durante casi cuarenta años | Designado en el Paddington Green Children's Hospital en 1923 y jubilado a los 65 años (es decir, en 1961): «yo había sido designado médico asistente (luego titular) del Paddington Green en 1923. Mi jubilación, al alcanzar la edad de 65 años…» (p. 587) |
| Cerca del año, adoptan un objeto: una punta de la frazada, un pañuelo, un muñeco; no lo sueltan para dormir | *El primer año de vida* (1958): «el primer objeto adoptado, quizás un trozo de frazada, una servilleta o un pañuelo de seda […] Es muy común que un niño se vaya a dormir aferrado a uno de esos objetos (que he llamado "objeto transicional")» (p. 1375). *Las psicosis y el cuidado de niños* (1952): «la parte de la manta o de la muñeca de trapo […] que algunos niños emplean para consolarse entre los ocho, diez o doce meses» (p. 1409) |
| Al principio no distingue entre él y la mamá | «en este período previo a la integración existe un área entre la madre y el niño que es madre y niño a la vez» (p. 948) |
| No es él ni es ella | *El destino del objeto transicional* (1959): «Poco a poco comienza a usar objetos que no son parte de él ni de la madre» (p. 629) |
| «Este objeto es parte de la realidad externa, y yo lo creé»; si lo dijera un adulto, lo encerrarían | Mismo texto: «Si el bebé pudiera hablar, diría: "Este objeto es parte de la realidad Externa y yo lo creé". Si alguno de ustedes o yo dijéramos esto, nos encerrarían, o tal vez nos practicarían una leucotomía» (p. 630) |
| Queda medio olvidado en un cajón | Mismo texto: «El objeto transicional tiende a ser relegado al limbo de las cosas a medias olvidadas que se amontonan en el fondo del cajón» (p. 634) |
| Ese espacio se agranda y se vuelve juego y cultura | Mismo texto: «estos fenómenos marcan el origen […] de una tercera zona de existencia […] Puede resultar que esta tercera zona sea la vida cultural del individuo» (p. 635). *El primer año de vida*: «Tales fenómenos (que llamo transicionales) parecen constituir la base de toda la vida cultural del ser humano adulto» (p. 1376). Y: «la vida cultural del hombre, que es el equivalente adulto de los fenómenos transicionales de la infancia» (p. 709) |
| El cuarteto de Beethoven | *El destino del objeto transicional*: «escuchamos uno de los últimos cuartetos de cuerdas de Beethoven […] Este cuarteto no es un mero hecho externo producido por Beethoven y ejecutado por los músicos; ni tampoco es un sueño mío […] lo disfruto porque, como digo, yo lo he creado […] y es real y estaría de todos modos allí aunque yo no hubiese sido concebido» (p. 635) |

D. W. Winnicott, «Objetos transicionales y fenómenos transicionales» (1951, publicado en 1953), capítulo 1 de *Realidad y
juego* (1971). No está en el PDF del Drive; se cotejó en resúmenes y citas que reproducen la traducción de Gedisa. **Dano:
confirmarlas en el libro.**

| Lo que dice la voz o la pantalla (versión 2) | Fuente |
|---|---|
| ◇ Aceptar la realidad es una tarea que nunca termina; nadie se libra de la tensión entre lo de adentro y lo de afuera; necesitamos un lugar donde descansar | «la tarea de aceptación de la realidad nunca queda terminada […] ningún ser humano se encuentra libre de la tensión de vincular la realidad interna con la exterior […] el alivio de esa tensión lo proporciona una zona intermedia de experiencia que no es objeto de ataques (las artes, la religión, etcétera)». Y: la zona intermedia es «un lugar de descanso para un individuo dedicado a la perpetua tarea humana de mantener separadas y a la vez interrelacionadas la realidad interna y la exterior» |
| ◇ (Ficha) Entre los cuatro y los doce meses | La pauta de los fenómenos transicionales empieza a aparecer «de los cuatro a seis meses hasta los ocho a doce» |
| ◇ (Ficha) Las madres saben que no hay que lavarlo | La madre deja que se ensucie y hasta que tenga mal olor, porque sabe que si lo lava provoca una ruptura en la continuidad de la experiencia del bebé, que puede destruir la significación y el valor del objeto para él |
| No hay que decidir de quién es | La paradoja: nunca se le pregunta al bebé si el objeto lo creó él o se lo dieron (en el PDF del Drive: «aceptar (no resolver) la paradoja según la cual el bebé crea lo que ya está ahí para ser creado», p. 1194) |

Fichas sobre las obras (verificadas en la web el 2 de octubre de 2026):

| Lo que dice la pantalla | Fuente |
|---|---|
| *El almuerzo del bebé* estuvo en la primera función pública de cine | Fue la séptima de las diez películas de la función del 28 de diciembre de 1895 en el Salon Indien del Grand Café, París, la primera función pública y paga de los Lumière (Wikipedia en inglés, "Repas de bébé" y "Salon Indien du Grand Café") |
| La que escucha (Khnopff) es su madre | "The composition shows a lady—the artist's mother—seated in an armchair […] listening to a piano discreetly suggested by a hand and a musical score" (DailyArt; lo mismo en Interlude, "Inspired and Fertilized by Music II"). Óleo, 1883, Museos Reales de Bellas Artes de Bélgica |

## Producción

- Voz: ElevenLabs, "Javier – Deep, Confident and Measured", velocidad 1,00, estabilidad 30, similitud 0 (igual que el 04).
  Dano la grabó tal cual el guion recortado. Transcripción con faster-whisper "medium"; correcciones: "40" → "cuarenta",
  "pones" → "ponés", comas en "juego, y después," y "de afuera,"; y dos límites de palabra que whisper pegaba ("mamá."/"De"
  y "trapito."/"Con"), ajustados mirando el volumen de la grabación. `cotejar.py`: 0 diferencias.
- Pausas: 1 s después de la primera pregunta (para acordarse del suyo), 0,4 s después de "el arte.", 0,8 s después de
  "objeto transicional." (el concepto, solo), 0,6 s después de "descansar." y de "cultura.", 0,5 s después de "de quién es."
  y 1,5 s de cola, donde se borra la personita y vuelve el trapito del principio → `audio/voz-editada.wav` (86,3 s).
- Revisión con `quietud.py` del primer render: 5 tramos "vacíos" (las líneas finas sobre un fondo liso ocupan menos del
  18 % del cuadro; de 29 a 55 s, casi todo). Se llenó sin salir del estilo: la luz del velador detrás del nene, la frazada
  a rayas, el fondo de guinga en el tramo de Cassatt, los medallones con las caras, los discos de adentro (dibujado) y
  afuera (filmado), la cómoda de madera y el cuadro de Khnopff desde "lo que pensó". Segundo render: 0 vacíos, 0 quietos.
- Animación: `video.html`, con los dibujos en `dibujos.js`. Efectos nuevos, ahora en `diseno/motor.js`: `dibujo()` (un dibujo
  de línea que se hace solo, trazo por trazo, y se borra al revés), `hilo()` (una cuerda que cuelga, se tiende y vibra),
  `cinta()` (texto que corre sin terminar nunca, y puede frenar) y `cine()` (una película cuadro por cuadro en un canvas).
  Transiciones nuevas: la frazada que sube (Cassatt) y el iris de cine mudo.

```bash
python3 herramientas/transcribir.py videos/05-trapito/audio/voz-elevenlabs.mp3 videos/05-trapito/audio/voz.json \
  --modelo=medium --prompt="Winnicott, objeto transicional, trapito, peluche."
cd videos/05-trapito/audio
python3 ../../../herramientas/pausas.py voz-elevenlabs.mp3 voz.json voz-editada.wav voz-editada.json "dormir?:1.0" "arte.:0.4" \
  "transicional.:0.8" "descansar.:0.6" "cultura.:0.6" "es.:0.5" --cola=1.5
cd ../../..
python3 herramientas/cotejar.py videos/05-trapito/guion.md videos/05-trapito/audio/voz-editada.json
# el clip de Lumière (480p de Commons) a cuadros
ffmpeg -ss 11.5 -t 11 -i repas.webm -vf "fps=12,format=gray" -q:v 8 videos/05-trapito/assets/repas/%03d.jpg
node herramientas/render.mjs videos/05-trapito/video.html --audio=videos/05-trapito/audio/voz-editada.wav --workers=4
cd videos/05-trapito   # menos de 30 MB: 240 / 86,3 − 0,13 ≈ 2,65 Mbps; con 2,55 queda en 29,2 MB
ffmpeg -y -i out/video.mp4 -c:v libx264 -preset slow -b:v 2550k -pass 1 -passlogfile out/ffmpeg2pass -an -f mp4 /dev/null
ffmpeg -y -i out/video.mp4 -c:v libx264 -preset slow -b:v 2550k -pass 2 -passlogfile out/ffmpeg2pass -pix_fmt yuv420p \
  -c:a aac -b:a 128k -movflags +faststart 05-trapito.mp4
cd ../..
python3 herramientas/quietud.py videos/05-trapito/05-trapito.mp4
```
