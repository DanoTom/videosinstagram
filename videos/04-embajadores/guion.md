# 04 · Los embajadores: la calavera que no se ve de frente

Formato B (leer un cuadro), con la historia de los dos amigos · Duración estimada: 84 s · 1080×1920 · Sistema visual v1 con
paleta propia (ver abajo).

Elegido de las pistas ★★ del [banco de pistas](../../docs/banco-de-pistas.md#-la-calavera-que-solo-se-ve-de-costado): el mismo
juego que funcionó con Ícaro ("¿la ves?"), pero acá buscar no alcanza: para ver la calavera hay que cambiar de lugar.

## Guion (voz en off) · versión 2

Reescrita después de la devolución de Dano sobre la versión 1: además de mostrar la obra, ¿qué se lleva quien mira? (regla 13
de la [guía de escritura](../../docs/guia-de-escritura.md)). La versión 1 describía cómo negamos la muerte; la 2 propone algo
para pensar: darle a la muerte su lugar, y lo que eso le hace al valor de lo demás.

> Hay una calavera en este cuadro. ¿La ves?
>
> Está en el medio, a la vista de todos, y de frente es casi imposible verla. La razón dice algo de cómo vivimos sabiendo que vamos a morir.
>
> Londres, 1533. Un embajador francés le escribe a su hermano: «Soy el embajador más melancólico, cansado y pesado que se haya visto». Su amigo, un obispo, viaja a visitarlo, y eso lo alegra. El pintor Hans Holbein los retrata juntos.
>
> Entre ellos, globos, libros, instrumentos: todo lo que sabían y lo que tenían.
>
> Pero a sus pies hay una mancha larga. Si te parás a la derecha del cuadro, casi pegado a la pared, la mancha se acomoda: es una calavera.
>
> Con la muerte nos pasa lo mismo: sabemos que está, pero no la vemos. Freud escribió en 1915: «En el fondo, nadie cree en su propia muerte».
>
> Pero también propuso darle a la muerte el lugar que le corresponde. Ni delante de todo, ni afuera del cuadro. Este cuadro le da ese lugar: en el medio, pero de costado.
>
> Y Freud escribió algo más: lo que se termina no vale menos. Vale más.
>
> Ahora volvé a mirar el cuadro de frente. La calavera casi no se ve. Pero sabés que está. Y quizás por eso, todo lo demás se ve mejor.

218 palabras: unos 81 s de voz a 2,7 palabras por segundo, más 1,5 s de silencio después de "¿La ves?" (para buscar) y la
cola: 84–86 s.

**Para la voz:** "Holbein" se dice *jólbain*; "Freud", *fróid*. Si ElevenLabs lee mal "1533" o "1915", escribirlos con letras
solo en el texto que se le pasa.

### Qué se lleva quien mira

Tres ideas de Freud, encadenadas y dichas simple, sin nombrar escuelas:

1. **Sabemos que vamos a morir, pero no lo creemos** (*De guerra y muerte*, 1915). No es un defecto de nadie: es cómo
   funciona la cabeza. Por eso la calavera de frente no se ve.
2. **Negarla del todo tampoco sirve:** en el mismo texto, Freud propone darle a la muerte "el lugar que por derecho le
   corresponde". La voz lo traduce en imagen: ni delante de todo (vivir con miedo), ni afuera del cuadro (hacer como si no
   existiera). La anamorfosis es justo eso: está en el medio, pero se ve de costado.
3. **Lo que se termina vale más** (*La transitoriedad*, 1916): a un poeta que decía que la belleza perdía valor porque iba a
   terminarse, Freud le contestó que pasaba lo contrario.

El cierre no da una receta: "quizás por eso, todo lo demás se ve mejor". Lo demás es lo que el video ya mostró (lo que sabían,
lo que tenían, la visita del amigo) y lo que cada uno ponga.

### Por qué está armado así

- **El juego del 02, con otra vuelta.** En Ícaro bastaba con buscar bien. Acá la calavera está en el centro y aun así no se
  ve: hay que moverse. El truco del cuadro es el concepto del video.
- **Una persona con algo en juego:** un embajador triste, lejos de su casa, al que una visita le cambia el ánimo. El cuadro
  retrata esa amistad, y la calavera está en el medio.
- **Una revelación cada 10 segundos:** la carta, el amigo, la mancha, la calavera, Freud, "el lugar que le corresponde",
  "vale más".
- **Los nombres van en pantalla, no en la voz** (método de los 90 s, punto 5): la voz dice "un embajador" y "su amigo, un
  obispo"; las fichas dicen Jean de Dinteville y Georges de Selve, con sus edades (29 y 25, escritas en el cuadro).
- **El dato y la lectura, separados.** Que la calavera es una anamorfosis lo confirma el museo. Freud no escribió sobre este
  cuadro: "este cuadro le da ese lugar" describe dónde está la calavera, no lo que quiso Holbein.
- **Lacan y Žižek quedan para El Reflejo.** Lacan lee la calavera como una mirada que nos descoloca (Seminario 11, 1964);
  Žižek tomó la idea para el título de *Mirando al sesgo* (1991). Se nombran en la descripción.

### Versión 1 (descartada)

Describía bien el mecanismo, pero terminaba en "nos cuesta verla": a quien mira no le dejaba nada para pensar más allá del
cuadro. Queda en la historia del repo (commit `3e7fcdf`).

## Guion visual

**Paleta, sacada del cuadro y distinta de la del 03** (que era verde estanque y rosa): nogal `#16120E` (el fondo oscuro del
cuadro; fondo principal), hueso `#ECE4D2` (la calavera; papel de fichas y carta), lacre `#B8362C` (la alfombra; acento y
marcadores), oro viejo `#C49A45` (los instrumentos; líneas de catálogo) y pizarra `#232A31` (fondo del tramo de Freud).

**Lo que cambia respecto del 03** (ver [guía visual](../../docs/guia-visual.md#variar-de-un-video-a-otro)):
- El motivo es **el costado**: los tramos entran y salen deslizándose de lado (en el 03 subía una marea).
- **Estreno: la anamorfosis animada.** El cuadro entero se comprime en la dirección de la mancha (como se ve desde el
  costado) y la calavera se endereza. Probado con la imagen: con un 20 % del largo se lee perfecta.
- **Un plano visto desde arriba** (pared, cuadro y un ojo que camina hasta pegarse a la pared) explica dónde pararse.
- **Líneas de catálogo:** los objetos de la mesa se nombran con líneas finas que salen de cada uno.
- **La carta escrita con tinta:** la cita del embajador aparece línea por línea, como escrita a mano, sobre papel hueso.

| # | Tramo | Imagen | Texto en pantalla |
|---|---|---|---|
| 1 | Gancho | El cuadro entero en una lámina, sobre nogal; la cámara se acerca despacio. 1,5 s de silencio para buscar | "¿La ves?" |
| 2 | Promesa | Una elipse punteada lacre rodea la mancha sin taparla | "De frente, casi imposible." |
| 3 | La carta | Dinteville a sangre, oscurecido; entra de costado una hoja hueso con la cita escrita con tinta | ficha "Jean de Dinteville, embajador de Francia · carta a su hermano, 23 de mayo de 1533" · la cita |
| 4 | El amigo | La cámara cruza el cuadro hasta Selve; en "los retrata juntos" se abre al cuadro entero y aparecen el 29 de la daga y el 25 del libro | ficha "Georges de Selve, obispo de Lavaur" · ficha "Hans Holbein el Joven · Londres, 1533" · "29" · "25" |
| 5 | La mesa | La cámara en la mesa; líneas de catálogo a cada objeto | "globo celeste" · "reloj de sol" · "cuadrante" · "globo terrestre" · "laúd" · "libro de himnos" |
| 6 | La mancha | La cámara baja al piso. En "a la derecha del cuadro", el plano visto desde arriba: el ojo camina hasta la pared. En "se acomoda", la anamorfosis: el cuadro se comprime y aparece la calavera | "Es una calavera." · ficha "Anamorfosis: una imagen deformada a propósito, que se corrige mirándola desde otro ángulo" |
| 7 | Freud | Fondo pizarra. Freud en una lámina; la cita escrita con tinta | ficha "*De guerra y muerte*, 1915" · «En el fondo, nadie cree en su propia muerte.» |
| 8 | El lugar | En "delante de todo", la calavera enderezada crece hasta tapar la pantalla; en "afuera del cuadro", sale de costado y deja la pantalla vacía apenas un instante; en "este cuadro le da ese lugar", vuelve el cuadro entero, inclinado de costado, con la calavera a medio enderezar | ficha con la cita exacta: «el lugar que por derecho le corresponde» · "ni delante de todo" · "ni afuera del cuadro" |
| 9 | Vale más | Las caras de los dos amigos, juntas | ficha "*La transitoriedad*, 1916" · "Vale más." |
| 10 | Cierre | El cuadro de frente, apagado; la elipse punteada se dibuja y se borra en "sabés que está". En "todo lo demás se ve mejor", el cuadro se ilumina de a poco, menos la calavera. El último segundo vuelve al primer cuadro (el loop empalma) | "todo lo demás se ve mejor." |

## Obras

- Hans Holbein el Joven, *Los embajadores* (*Jean de Dinteville y Georges de Selve*), 1533. Óleo sobre roble, 207 × 209 cm.
  National Gallery, Londres. Dominio público; Wikimedia Commons, versión de Google Arts & Culture
  (`assets/embajadores.jpg`, 3840 px).
- Max Halberstadt, retrato de Sigmund Freud, c. 1921 (el mismo del 03).

## Fuentes

El sitio de la National Gallery y Wikipedia no se pueden abrir desde este entorno: los datos se cotejaron en los resultados de
búsqueda que citan esas páginas, en al menos dos fuentes cada uno. **Dano: revisar los marcados con ◇ antes de grabar.**

| Lo que dice la voz o la pantalla | Fuente |
|---|---|
| Londres, 1533; óleo sobre roble, 207 × 209 cm; National Gallery desde 1890 | National Gallery, ficha del cuadro; Wikipedia, *The Ambassadors (Holbein)* |
| Jean de Dinteville, embajador de Francia en Inglaterra (de febrero a noviembre de 1533), 29 años: "AET. SUAE 29" en la vaina de la daga | National Gallery; History Hit, *'The Ambassadors' by Holbein* |
| Georges de Selve, obispo de Lavaur, de visita en Londres de abril a junio de 1533; "AETATIS SUAE 25" en las páginas del libro (algunos lo leen como "en su año 25", es decir, 24) | National Gallery; History Hit; Every Picture, *The Ambassadors* |
| La calavera es una anamorfosis que se ve bien desde la derecha, en un ángulo muy oblicuo; el marco tiene una moldura baja para permitir esa vista | National Gallery; *thatsmaths.com*, "Holbein's anamorphic skull" |
| ◇ Carta del 23 de mayo de 1533 a su hermano François, obispo de Auxerre: «Je suis le plus mélancolique, fâché et fâcheux ambassadeur qu'on vit oncques». La National Gallery la traduce "the most melancholy, weary and wearisome ambassador that was ever seen"; extrañaba a su familia y el frío y la humedad lo enfermaban | National Gallery; Wikipedia en francés, *Les Ambassadeurs*. La traducción de la voz ("melancólico, cansado y pesado") es nuestra |
| Su amigo lo visita y eso lo alegra: "the arrival of his friend, who was in London briefly from April to June, cheered him up" | National Gallery. Se suele decir que Dinteville encargó el cuadro para recordar esa visita; la voz no lo afirma |
| (No va en la voz) prendedor con una calavera en el sombrero de Dinteville | National Gallery; Wikipedia |
| (No va en la voz) crucifijo medio tapado por la cortina, arriba a la izquierda | National Gallery; Wikipedia |
| ◇ Freud, *De guerra y muerte. Temas de actualidad* (1915), parte II, "Nuestra actitud hacia la muerte" (Amorrortu, *Obras completas*, t. XIV): «la muerte propia es inimaginable, y cuantas veces lo intentamos podemos notar que en verdad sobrevivimos como observadores. […] en el fondo nadie cree en su propia muerte, o, lo que viene a ser lo mismo: en el inconsciente cada uno de nosotros está convencido de su inmortalidad» | Citado igual en *Querencia* (Universidad de la República) y en *Psicopsi*; el tomo XIV no está en el Drive: confirmar la página en el libro |
| ◇ En el mismo texto: «¿No sería mejor dejar a la muerte, en la realidad y en nuestros pensamientos, el lugar que por derecho le corresponde, y sacar a relucir un poco más nuestra actitud inconciente hacia ella…?». Termina con «Si vis vitam, para mortem»: si querés soportar la vida, preparate para la muerte | Citado igual en *Psicopsi* y *Psicomundo*; confirmar en el tomo XIV |
| ◇ Freud, *La transitoriedad* (1916, escrito en 1915), tomo XIV: a un poeta que sentía que la belleza perdía valor por ser pasajera, Freud le responde que es al revés: «El valor de la transitoriedad es el de la escasez en el tiempo». La voz lo dice como "lo que se termina no vale menos: vale más" | *Psicopsi*; *Virtualia*, "Pandemia y transitoriedad"; confirmar en el tomo XIV |
| (No va en la voz) Slavoj Žižek, *Mirando al sesgo. Una introducción a Jacques Lacan a través de la cultura popular* (1991): el título viene de la anamorfosis de *Los embajadores* | Aula de Filosofía, reseña de *Mirando al sesgo* |
| (No va en la voz) Lacan describe la calavera en el Seminario 11 (1964): aparece cuando, al salir de la sala, uno se da vuelta a mirar el cuadro | Lacan, *Los cuatro conceptos fundamentales del psicoanálisis*, clases de febrero y marzo de 1964; doce-pensadores §11 [22] [23] |

Datos que quedan fuera del guion, para la descripción o para El Reflejo: el laúd tiene una cuerda rota; el libro de himnos
abierto trae traducciones de Lutero; Dinteville se llevó el cuadro a su castillo de Polisy, en Francia; 1533 es el año en que
Enrique VIII rompió con Roma y se casó con Ana Bolena.

## Producción

Pendiente: voz → `herramientas/transcribir.py` → `herramientas/pausas.py` (1,5 s después de "¿La ves?") → `video.html` →
`herramientas/render.mjs`.
