# Búsqueda de estilo (octubre de 2026)

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
