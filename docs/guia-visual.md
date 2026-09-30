# Guía visual

Reglas aprendidas de las revisiones de Dano. Complementa `diseno/sistema.css` (colores, tipografías, piezas).

## Marcadores (aros, elipses, flechas)

1. **Nunca tapan lo que señalan.** Ni ojos, ni caras, ni el gesto del que se habla. Si el tema es la mirada, la mirada queda libre.
   Se usa una elipse que contiene toda la figura con margen, no un círculo ajustado.
2. **Se ubican midiendo, no a ojo.** Se calculan las coordenadas en la imagen original (grilla sobre el cuadro) y se verifican
   con una captura a tamaño real antes del render (en el 01, los aros sobre las caras de *Nighthawks* quedaron corridos).
3. Las flechas salen de la cabeza de cada figura y apuntan hacia donde mira.

## Texto en pantalla

4. Nada de texto en la zona de la interfaz de Instagram (columna de íconos a la derecha desde y≈1100; usuario y descripción abajo).
5. Los titulares entran en una o dos líneas pensadas: si una palabra queda sola en la segunda línea, se corta a mano con `<br>`.
6. Los subtítulos van sobre una banda negra (legibles sobre cualquier fondo) y no repiten lo que ya está escrito en pantalla.

## Revisión

7. Antes del render completo: hoja de fotogramas de todos los momentos clave y una captura a tamaño real de cada marcador.
