# 02 · La caída de Ícaro: nadie mira

Formato B (leer un cuadro) · Duración estimada: 80–88 s · 1080×1920 · Sistema visual v1.

## Guion (voz en off)

> **1. Gancho.** En este cuadro hay un hombre cayéndose del cielo. ¿Lo encontrás?
>
> **2. Revelación.** Acá: las piernas de Ícaro, hundiéndose en el mar. Y lo raro no es lo chiquito que es. Es que nadie lo mira.
>
> **3. El mito.** Su padre, Dédalo, le había hecho alas de plumas y cera, y le advirtió que no volara cerca del sol. No le hizo caso.
>
> **4. Los testigos.** En el poema de Ovidio que cuenta este mito hay tres testigos: un pescador, un pastor y un campesino. Los ven volar y creen que son dioses. Bruegel pintó a los tres… mirando para otro lado.
>
> **5. El dato.** No hace falta ser cruel para seguir de largo. En 1968 se midió: cuando alguien cree que es el único que escucha una emergencia, el 85% sale a pedir ayuda. Cuando cree que hay cuatro personas más, solo el 31%.
>
> **6. El giro.** Pero en el cuadro hay alguien que sí mira: esta perdiz. Ovidio cuenta que, cuando Dédalo entierra a su hijo, una perdiz lo mira y aplaude con las alas. Es su sobrino, al que Dédalo, por envidia, había empujado desde lo alto de un templo.
>
> **7. Cierre.** Bruegel pintó dos maneras de mirar el dolor ajeno: seguir con lo tuyo, o festejarlo. Falta una: la del que se da vuelta a buscarlo. No está en el cuadro. Es lo que hiciste vos hace un minuto.

~218 palabras. Si querés un video más corto (~72 s), el párrafo 5 se puede sacar sin que se rompa la historia.

**Por qué funciona:** el gancho es un juego (buscar a Ícaro) y el cierre lo devuelve. El espectador que lo buscó es justamente el que "se dio vuelta". Así el final rima con el principio e invita a volver a verlo.

## Guion visual

| # | Tramo | Imagen | Texto en pantalla |
|---|---|---|---|
| 1 | Gancho | El cuadro entero; un aro amarillo recorre la escena buscando | "¿Lo encontrás?" |
| 2 | Revelación | Zoom a las piernas en el agua; el marcador rojo las rodea | "Ícaro" · "Nadie lo mira." |
| 3 | El mito | Landon, *Dédalo e Ícaro* (1799): el padre lo suelta al vuelo; el sol del cuadro de Bruegel | "«No vueles cerca del sol.»" |
| 4 | Los testigos | Tres recortes (campesino, pastor, pescador) con flechas hacia donde miran | "«Creyeron que eran dioses.» — Ovidio" · "Mirando para otro lado." |
| 5 | El dato | Una persona sola se enciende; en un grupo de cinco, casi nadie | "85%" · "31%" · ficha Darley y Latané, 1968 |
| 6 | El giro | Zoom a la perdiz en la rama; marcas de aplauso | "Esta perdiz." · ficha: "Perdix · 12 años · inventó la sierra y el compás" |
| 7 | Cierre | Vuelve el cuadro entero; rótulos "seguir con lo tuyo" (campesino) y "festejarlo" (perdiz), y un marco vacío fuera del cuadro | "darse vuelta" · "Es lo que hiciste vos." |

## Obras

- Pieter Bruegel el Viejo (atribuido; probablemente copia de un original perdido), *Paisaje con la caída de Ícaro*, c. 1560 — Museos Reales de Bellas Artes de Bélgica, Bruselas
- Charles Paul Landon, *Dédalo e Ícaro*, 1799 — Museo de Bellas Artes y Encajes de Alençon

## Fuentes

- Ovidio, *Metamorfosis*, libro VIII: los tres testigos (vv. 217–220) y Perdix (vv. 236–259).
- Darley y Latané (1968), "Bystander intervention in emergencies: diffusion of responsibility".
- Refrán flamenco "Ningún arado se detiene por un hombre que muere" (cabeza de un muerto entre los arbustos, a la izquierda). Queda fuera del guion, pero se puede usar.

## Para ElevenLabs

- Velocidad un poco más baja que en el 01 (0,9–0,95) y estabilidad más alta (~60) para un tono más pausado.
- Después de "¿Lo encontrás?" hace falta un silencio de más de un segundo, para que la gente busque. Si el modelo acepta
  `<break time="1.5s" />`, ponelo; si no, lo agrego yo al editar.
- Leé "85%" y "31%" como "ochenta y cinco por ciento" y "treinta y uno por ciento" (escritos así le salen mejor).
