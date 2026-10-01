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

Los dos controles automáticos, antes de mandar (salen con error si encuentran algo):

```bash
python3 herramientas/cotejar.py videos/NN/guion.md videos/NN/audio/voz-editada.json   # guion contra subtítulos
python3 herramientas/quietud.py videos/NN/NN.mp4                                       # pantalla vacía o quieta
```

## Variar de un video a otro

Pedido de Dano al ver el storyboard del 03: tener una gama reconocible, pero no repetir la misma paleta ni los mismos efectos
en cada reel. Lo que se mantiene es la identidad (tipografías, tiras rasgadas, fichas, láminas, grano, subtítulos sobre banda
oscura); lo que cambia en cada video es el color, las composiciones y los efectos.

11. **Antes de diseñar, mirar el reel anterior terminado.** Están en el Drive de Dano (cómo encontrarlos: `docs/linea-editorial.md`);
    se bajan a `referencias/` (no se sube al repo) y se revisan con una hoja de fotogramas:
    `ffmpeg -i referencias/NN.mp4 -vf "fps=1/2.5,scale=180:-1,tile=11x4" -frames:v 1 hoja.jpg`.
12. **La paleta sale de las obras del video.** Cinco colores: un fondo principal, uno o dos fondos de tramo, el del cierre y un
    acento. Se definen como variables en el `<style>` del `video.html` (no se toca `sistema.css`).
13. **Cambiar al menos dos recursos de movimiento** respecto del video anterior (tabla de abajo), y alternar composiciones:
    obra a sangre con cámara, lámina, dos láminas, texto solo. Que no haya tres tramos seguidos con el título arriba a la
    izquierda y la lámina al medio.

| Video | Paleta | Recursos |
|---|---|---|
| 01 · No hay nadie | noche `#15233A`, teal, papel tibio, amarillo reflector | láminas, tira rasgada, reflector, sala de figuras |
| 02 · Ícaro | noche `#15233A`, teal `#0F5E5A`, papel tibio `#E7D9C0`, amarillo `#E9C46A`, rojo | zoom logarítmico dentro del cuadro, aro que busca, flechas de mirada, papel rasgado que sube, conteo de porcentajes |
| 03 · Narciso | estanque `#0E2420`, rosa Eco `#E5BDB3`, vino `#3E1820`, pétalo `#F2EEE4`, azafrán `#E8A33D` | obras a sangre con cámara, giro de 180°, marea (`marea()` en `motor.js`), agua (filtros SVG de desplazamiento), eco tipográfico sincronizado con el eco de la voz, citas palabra por palabra (`porPalabra()`), título reflejado, final que vuelve al primer cuadro |
