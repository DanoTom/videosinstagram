# Búsqueda de estilo (octubre de 2026) · en pausa

> **Decisión de Dano (3/10/2026):** pausar la búsqueda y seguir con el sistema visual de siempre. Las pruebas "no están tan
> mal", pero prefiere el original, que tampoco es todavía lo que quisiera. Más adelante quizás se busque otra cosa que no sea
> ilustración, para lograr una pieza a la altura de las redes. No retomar sin que él lo pida.

Después del 05, Dano: "no está mal, pero lo noto muy simple y sin espíritu propio; tenemos que encontrar otros estilos de
animación". Mandó como referencia unas animaciones hechas enteramente en JavaScript (un teléfono que suena, una fogata, un
faro, el cerebro de una mosca, un monstruito que toca el piano). La prioridad ahora es encontrar un estilo y una dinámica
para los videos, más que el tema de cada uno.

## Qué tienen las referencias (y le faltaba al 05)

1. **Material.** Parecen impresas o pintadas, no "vectores": trama de puntos, grano, tinta que no cubre pareja, papel. El
   05 tenía colores planos y líneas perfectas: limpio, pero sin cuerpo.
2. **Pocas tintas que se mezclan.** Rosa flúor, azul, amarillo: donde se pisan aparecen el violeta, el naranja, el verde.
   Con tres tintas sale una paleta entera, y se reconoce.
3. **Líneas vivas.** El contorno tiembla y cambia de grosor; se redibuja 8 a 12 veces por segundo ("hervor", como el dibujo
   animado clásico). Aunque la escena esté quieta, respira.
4. **Desregistro.** Cada tinta está un poco corrida respecto de las otras, como en una impresión de verdad.
5. **Un movimiento que define la escena** y que vuelve en loop: el teléfono vibra y larga ondas, el fuego larga chispas, el
   faro gira su luz.
6. **Lo generativo** (la mosca): miles de fibras y partículas, una complejidad que nadie dibujaría a mano. Sirve para
   mostrar lo que pasa adentro.
7. **Lo ingenuo** (el piano): crayón sobre papel, trazo de chico, mucho papel a la vista. Cálido.

## Las cuatro pruebas (`videos/pruebas-estilo/`)

Misma escena que el gancho del 05, para comparar contra lo que ya vimos. Todo cuadro por cuadro en un `<canvas>`, con el
mismo render de siempre (`herramientas/render.mjs`), y determinista (el azar tiene semilla).

| Prueba | Archivo | Qué es | Para qué serviría |
|---|---|---|---|
| A · Riso | `riso.html` | Tres tintas (azul, rosa flúor, amarillo) en trama de puntos, desregistro, grano que respira, líneas que hierven. El trapito sale coral de pisar rosa con amarillo | Estilo de marca: escenas, personajes, títulos |
| B · Crayón | `crayon.html` | Lápices de cera que agarran solo en el diente del papel, en vetas; el dibujo se "vuelve a pintar" 8 veces por segundo | Temas de infancia, lo íntimo, lo cotidiano |
| C · Fibras | `fibras.html` | Lámina científica viva: una sola masa (el bebé con la mamá) que se divide, un nodo coral en el medio (el trapito), miles de fibras y lo que corre por ellas | "Cómo funciona la cabeza": el mecanismo, en el formato E |
| D · Obra en riso | `riso-obra.html` | *Desayuno en la cama* (Cassatt) separada en las tres tintas, en trama, con la cámara que se acerca | Que las obras del canal se vean "impresas por nosotros": una firma propia sobre el arte |

Una combinación posible: **riso como estilo de marca** (escenas, obras, títulos) y **fibras para lo de adentro** (el
mecanismo psíquico), con el crayón reservado para temas de infancia.

## El motor (`diseno/estilos/`)

- `ruido.js`: azar con semilla, ruido suave, y el hervor (`hervor(t, fps)`: la semilla cambia 8 a 12 veces por segundo).
- `trazo.js`: líneas a mano sobre canvas a partir de los mismos "d" de SVG de los dibujos (`lineaViva`, `rellenoVivo`,
  `rayado`).
- `riso.js`: cada tinta se dibuja como una densidad de 0 a 1 y al imprimir se vuelve trama con su ángulo, grano y
  desregistro; las tintas se multiplican. Tintas reales de risografía en `TINTAS`.
- `cera.js`: lo mismo para el crayón, con el diente del papel en vetas.

Se trabaja por "capas de tinta": para que algo no se ensucie hay que recortarlo de las otras tintas (por ejemplo, las
líneas azules se recortan del amarillo para que no salgan verdes).

## Lo que hay que cuidar en producción

- **Peso del video.** La trama y el grano se comprimen mal: 6 s de riso pesan 39 MB a calidad alta. A 2,5 Mbps (lo que
  usamos para que el reel pese menos de 30 MB) los puntos se ablandan, aunque a tamaño de celular se siguen leyendo. Para
  un reel: puntos más grandes (celda de 12 a 14 px), el grano que se mueva cada medio segundo y no cada décima, y probar
  la compresión antes del render completo.
- **Tiempo de render.** Cada cuadro de riso es una cuenta por píxel: unos 0,5 s por cuadro con 4 procesos; un reel de 90 s
  tarda unos 6 minutos. Está bien.
- **Legibilidad.** Los subtítulos y las fichas tienen que seguir leyéndose sobre la trama: banda de papel sin tinta debajo.

## Un recurso puntual que sí quedó: la secuencia en silueta (06)

Con la búsqueda en pausa, Dano propuso para el 06 un recurso acotado: escenas en silueta como las de la intro de *Las
Chicas Superpoderosas* (el diseño de mediados de siglo de UPA), "para partes muy puntuales" y "dedicándole especial
atención a la animación para que no resulte algo pobre". No reemplaza el sistema: lo interrumpe unos 15 s (en el 06, el
tramo de Stendhal) y vuelve. La prueba es `videos/pruebas-estilo/silueta.html`; lo que quedó, `videos/06-stendhal/siluetas.js`.

Lo que hace que no se vea pobre:

- **Una figura articulada**, no poses sueltas: caderas, rodillas, codos, faldones, cabeza y galera se mueven por separado,
  así la caminata, el tambaleo y la galera que salta salen fluidos. A 12 cuadros por segundo (el dibujo animado limitado),
  pero la cámara se mueve a 30.
- **Un color plano por plano** y un corte cada 1 a 2,5 s, sincronizado con la voz. Ángulos extremos: contrapicado de la
  fachada, la nave en perspectiva, la cabeza que mira hacia arriba, el iris.
- **Pocos detalles en blanco** (cuello, corbata, guante, ojo) y una línea blanca que separa el brazo del cuerpo. Si el
  fondo es negro, la figura se pierde: cambiar el color del fondo (la fachada de Santa Croce pasó de negro a marrón).
- **Una metáfora por plano**, no una ilustración de la frase: el corazón es un estallido que late, "se le iba la vida" es
  el negro que se le escurre de arriba abajo, "miedo de caerse" son los brazos abiertos y la calle que se ladea.
- **Entrar y salir con un pase**: la silueta de perfil que entra a cámara y tapa el retrato; un destello blanco para volver.

Lo que agregó la versión 2, después de que Dano la viera ("hay detalles de la animación y el dibujo mejorables"). Son los
principios clásicos de la animación, aplicados a mano en `siluetas.js`:

- **Los pies no patinan.** Las piernas van con cinemática inversa: el pie apoyado queda clavado mientras la cadera avanza,
  y la cadera sube y baja sola. La figura tiene que avanzar exactamente una zancada (`ZANCADA`) por ciclo; si la cámara la
  acompaña, el piso es el que se mueve a esa velocidad.
- **Superposición y seguimiento:** el antebrazo llega un poco después que el brazo, los faldones después que las piernas.
- **Aplastar y estirar:** la galera salta con cada latido y se aplasta al caer.
- **Anticipación:** antes de mirar hacia arriba, y antes de "aclaró", la cabeza baja un poco.
- **Que esté vivo aunque esté quieto:** parpadea cada tanto, respira (más rápido cuando le late el corazón).
- **Expresión:** la boca cambia con lo que siente (sonríe al llegar, "o" de asombro frente al fresco, para abajo cuando se
  le va la vida). En silueta, la cara es el ojo y la boca: tienen que estar bien dibujados, no ser rayitas.
- **Que la puesta en escena no se contradiga:** si camina de perfil, la cámara lo acompaña de costado (travelling), no una
  calle que se va al fondo. Y que la figura no se pierda contra un fondo del mismo negro.
