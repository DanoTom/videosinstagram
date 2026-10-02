# Guía visual

Reglas aprendidas de las revisiones de Dano. Complementa `diseno/sistema.css` (colores, tipografías, piezas).

## Marcadores (aros, elipses, flechas)

1. **Nunca tapan lo que señalan.** Ni ojos, ni caras, ni el gesto del que se habla. Si el tema es la mirada, la mirada queda libre.
   Se usa una elipse que contiene toda la figura con margen, no un círculo ajustado.
2. **Se ubican midiendo, no a ojo.** Se calculan las coordenadas en la imagen original (grilla sobre el cuadro) y se verifican
   con una captura a tamaño real antes del render (en el 01, los aros sobre las caras de *Nighthawks* quedaron corridos).
3. Las flechas salen de la cabeza de cada figura y apuntan hacia donde mira.

## Texto en pantalla

4. **Zona segura común, Instagram y YouTube Shorts** (el mismo archivo sirve para los dos). YouTube tapa más que Instagram:
   ~180 px arriba, ~390 px abajo (canal, título, suscribirse) y ~120 px a la derecha (botones).
   - Texto y piezas importantes: x 60–940, y 260–1460. Nada importante a la derecha de x 940 por debajo de y≈900.
   - Subtítulos: una sola línea entre y 1460 y 1515 (`.sub { top: 1460px }` y `subtitulos(voz, ocultar, 7)`).
   - En el 03, "Narciso nunca empezó." llegaba hasta x≈1060 y quedaba debajo de los botones en las dos apps: se partió en dos líneas.
5. Los titulares entran en una o dos líneas pensadas: si una palabra queda sola en la segunda línea, se corta a mano con `<br>`.
6. Los subtítulos van sobre una banda negra (legibles sobre cualquier fondo) y no repiten lo que ya está escrito en pantalla.
   Los rótulos sobre una obra (los objetos de la mesa del 04, nombres) van en papel claro con tinta oscura, y sus líneas,
   claras con un borde oscuro debajo. En el 04, dorado sobre una banda oscura translúcida no se leía (revisión de Dano).

## Revisión

7. Antes del render completo: hoja de fotogramas de todos los momentos clave y una captura a tamaño real de cada marcador.
8. **Nunca más de 2,5 s de pantalla vacía.** Una amiga de Dano lo notó en el 02: casi 10 s de "¿Por qué nadie ayuda?" sobre
   el fondo verde, mientras la voz decía "La psicología social tiene una respuesta. En 1968, un artículo…", hasta que
   aparecían las personitas. Cuando la voz introduce algo (una disciplina, una fuente, una fecha), en pantalla entra algo
   al mismo tiempo: la fuente, una imagen, el primer elemento del dato. Una frase sola sobre fondo liso, como mucho 2,5 s.
9. **Nada quieto más de 4 s:** si la voz sigue y la imagen no cambia, se mueve la cámara, entra una pieza o cambia el encuadre.
10. **Los subtítulos dicen exactamente el guion.** En el 02 salió "Bruegel Bruegel": al empalmar el cierre regrabado, la
   palabra del empalme quedó dos veces en los tiempos. La transcripción también se come palabras ("a todos") o las oye
   mal ("se intimidó" por "se inclinó", en el 03).

11. **Un texto que la voz no dice (una carta, una cita) necesita tiempo para leerse.** Revisión de Dano del 04: la carta del
    embajador entraba tarde, se escribía despacio y se iba antes de poder leerla. Entra apenas se nombra a quien la escribió,
    se termina de escribir en poco más de un segundo y queda completa y quieta al menos 2 s por cada 10 palabras. Si no hay
    ese tiempo, se saca.
12. **Cuando la voz nombra a quien pintó o escribió, que se le vea la cara** (un autorretrato, una foto). En el 04, el
    autorretrato de Holbein en "Londres, 1533. Holbein…". Variar el recurso: no hace falta en todos los videos ni en todas
    las portadas.
13. **Una idea nueva, una imagen nueva.** En el 04, el "duelo por adelantado" volvía al paisaje del paseo y no había
    novedad visual; se cambió por otro verano (el jardín con girasoles de Klimt) que se queda sin color.

Los dos controles automáticos, antes de mandar (salen con error si encuentran algo):

```bash
python3 herramientas/cotejar.py videos/NN/guion.md videos/NN/audio/voz-editada.json   # guion contra subtítulos
python3 herramientas/quietud.py videos/NN/NN.mp4                                       # pantalla vacía o quieta
```

## Explicar psicología (formato E)

El desafío que planteó Dano: explicar un mecanismo psíquico con imágenes atractivas, no con palabras flotando. Recursos,
todos posibles con el sistema (`sistema.css`, `motor.js`); cada video del formato E usa dos o tres y estrena uno:

1. **Quien mira hace el experimento.** El "¿La ves?" del 02 y el 04 llevado a la psicología: una figura ambigua, una mancha
   de tinta, una ilusión. El concepto se vive antes de explicarse.
2. **Una personita que vive el mecanismo.** Un personaje simple y recurrente (como las personitas del 02), dibujado con
   `trazo()`, con dos capas: lo que muestra y lo que siente (una sombra, un hilo, un color). Puede ser la firma del formato.
3. **Metáforas hechas objeto.** Proyectar es un proyector que tira su imagen sobre otro; un recuerdo, un cajón que se abre;
   un vínculo, un hilo que se estira con la distancia. La metáfora se arma en pantalla y se mueve.
4. **Escenas cotidianas en collage**, con fotos de época de dominio público (Biblioteca del Congreso de Estados Unidos, FSA)
   y recortes: la situación que quien mira reconoce.
5. **Datos que se ven:** personitas que se cuentan, barras, líneas de tiempo (como el 85 % → 31 % del 02).
6. **Palabras que hacen lo que dicen.** No flotan: "reprimir" se hunde debajo de una línea, "negar" se tacha y vuelve a
   aparecer, "proyectar" sale disparada hacia otro. Una o dos por video, no más.
7. **La obra como espejo emocional.** El arte sigue estando, como imagen del estado interior o como cierre.
8. **Cine de archivo de dominio público** (desde el 05). Películas de hace más de cien años que están en Wikimedia Commons:
   los Lumière, Edison, noticieros. Sirven para el mundo real (bebés, familias, la calle) y ya son un dato en sí ("una de
   las primeras películas de la historia es un bebé comiendo"). Se pasan a una secuencia de cuadros con ffmpeg y
   `video.html` muestra el cuadro de cada instante, así el render sigue siendo exacto. Bancos de video modernos (Pexels,
   Pixabay) no: se ven genéricos, rompen la estética de papel y grano, y además no se pueden bajar desde este entorno.

**Alternar** (pedido de Dano): ningún video del formato E usa todos los recursos, y dos seguidos no repiten la misma
combinación. Lo de afuera (la escena, el archivo, la obra) y lo de adentro (la personita, la metáfora) se combinan distinto
cada vez.

Lo que no: diagramas de clase (cajas y flechas con texto), íconos genéricos de bancos de imágenes, cerebros, fotos de
consultorio, y nada que sugiera un diagnóstico.

## Variar de un video a otro

Pedido de Dano al ver el storyboard del 03: tener una gama reconocible, pero no repetir la misma paleta ni los mismos efectos
en cada reel. Lo que se mantiene es la identidad (tipografías, tiras rasgadas, fichas, láminas, grano, subtítulos sobre banda
oscura); lo que cambia en cada video es el color, las composiciones y los efectos.

14. **Antes de diseñar, mirar el reel anterior terminado.** Están en el Drive de Dano (cómo encontrarlos: `docs/linea-editorial.md`);
    se bajan a `referencias/` (no se sube al repo) y se revisan con una hoja de fotogramas:
    `ffmpeg -i referencias/NN.mp4 -vf "fps=1/2.5,scale=180:-1,tile=11x4" -frames:v 1 hoja.jpg`.
15. **La paleta sale de las obras del video.** Cinco colores: un fondo principal, uno o dos fondos de tramo, el del cierre y un
    acento. Se definen como variables en el `<style>` del `video.html` (no se toca `sistema.css`).
16. **Cambiar al menos dos recursos de movimiento** respecto del video anterior (tabla de abajo), y alternar composiciones:
    obra a sangre con cámara, lámina, dos láminas, texto solo. Que no haya tres tramos seguidos con el título arriba a la
    izquierda y la lámina al medio.

17. **Cada video estrena algo.** Pedido de Dano: además de variar, en cada video hay un espacio, aunque sea corto, para
    probar un efecto o un movimiento que nunca se usó. Le da frescura sin romper la marca. Si funciona, pasa a `motor.js` y
    queda disponible para los siguientes. En la tabla, el estreno de cada video va en negrita.

| Video | Paleta | Recursos |
|---|---|---|
| 01 · No hay nadie | noche `#15233A`, teal, papel tibio, amarillo reflector | láminas, tira rasgada, reflector, sala de figuras |
| 02 · Ícaro | noche `#15233A`, teal `#0F5E5A`, papel tibio `#E7D9C0`, amarillo `#E9C46A`, rojo | zoom logarítmico dentro del cuadro, aro que busca, flechas de mirada, papel rasgado que sube, conteo de porcentajes |
| 03 · Narciso | estanque `#0E2420`, rosa Eco `#E5BDB3`, vino `#3E1820`, pétalo `#F2EEE4`, azafrán `#E8A33D` | obras a sangre con cámara, giro de 180°, **marea** (`marea()` en `motor.js`), **agua** (filtros SVG de desplazamiento), **eco tipográfico** sincronizado con el eco de la voz, citas palabra por palabra (`porPalabra()`), título reflejado, final que vuelve al primer cuadro |
| 04 · Los embajadores | nogal `#16120E`, hueso `#ECE4D2`, lacre `#B8362C`, oro viejo `#C49A45`, pizarra `#232A31` | **anamorfosis animada** (`anamorfosis()`: el cuadro se comprime en la dirección de la mancha y la calavera se endereza), **desteñir** (`destenir()`: un paisaje se queda sin color de arriba hacia abajo), **tinta** (`tinta()`: citas escritas línea por línea), plano visto desde arriba, líneas de catálogo, pantalla partida, transiciones de costado, final que vuelve al primer cuadro |
