# Línea editorial (notas de Dano)

- El video 01 fue una prueba del método (funciona). Para publicar, a los guiones les falta storytelling y enganche,
  como los de los divulgadores con más visitas.
- Lo que funcionó del 01: el estilo visual, la búsqueda de obras e imágenes, los gráficos.
- **Sin placa final de El Reflejo.** Solo en algún video puntual. La invitación a seguir la cuenta (y El Reflejo) va en la descripción.
  La prioridad es contenido bueno que haga que la gente siga la cuenta.
- Dos formatos que interesan:
  1. **Una obra o un artista como relato**: tal pintor, pintora o escultor, o tal obra, representa algo, o quiso mostrar algo.
  2. **Un proceso humano visto a través del arte**: la memoria, el amor, los vínculos. Con un suceso concreto, un dato y un giro,
     algo más extenso que el 01.
- **El canal es de divulgación** (Dano, 2/10/2026): cada video deja algo a quien lo mira: una perspectiva sobre un tema,
  datos que no conocía, cómo funciona la cabeza en algo, o un vínculo entre el arte o la cultura y la mente o lo humano.
  Mostrar la obra y nombrar un concepto no alcanza. Cómo se escribe: regla 13 de `docs/guia-de-escritura.md`.
- **Cada video estrena algo** (un efecto o un movimiento nuevo, aunque sea en un momento corto), dentro del sistema visual
  propio: regla 17 de `docs/guia-visual.md`.
- Tono: el de El Reflejo, sin que sea obligatorio.
- Meta: 1 video por semana es un éxito; 2 es un éxito rotundo.
- **Ritmo (decisión de Dano, 2/10/2026):** sin compromiso fijo; se alternan semanas de 1 y de 2 videos según cuántos haya
  terminados. Cuando hay tiempo, se adelanta el video siguiente para tener reserva. Nunca dos el mismo día: entre uno y otro,
  al menos dos o tres días, para que un video no le quite público al otro. El mismo video sale el mismo
  día en Instagram y en YouTube (se pueden programar los dos). El Reflejo (cada dos o tres semanas) profundiza el tema de
  algún video reciente, así la investigación sirve dos veces.
- **Duración máxima: 90 s** (decisión del 1/10/2026). La música de Instagram no pasa de 90 s y Dano publica desde el celular.
  Los guiones se escriben para 80–88 s (190 a 220 palabras). Si una voz ya grabada queda larga, se acorta con
  `herramientas/recortar.py` (frases enteras y silencios largos; ver el 03).
- Voz: la de Dano cuando pueda grabar; ElevenLabs cuando no. En ElevenLabs funcionó la voz "Javier – Deep, Confident and Measured"
  con velocidad 1,00, estabilidad 30 y similitud 0 (video 02), y con velocidad 1,03, estabilidad 30 y similitud 47 (video 03).
  Si un tramo se regraba con otros ajustes, conviene regrabar el guion entero.
- Dano sube cada reel terminado a una carpeta de su Drive (el link no va acá porque el repo es público). Con el conector de
  Google Drive se encuentran buscando el nombre del archivo (por ejemplo `title contains '02-icaro'`), y con el id se bajan a
  `referencias/`: `curl -L -o referencias/NN.mp4 "https://drive.usercontent.google.com/download?id=<id>&export=download&confirm=t"`.
- Cada video varía la paleta y los efectos respecto del anterior, dentro de la misma identidad (ver `docs/guia-visual.md`).
- Descripción del posteo: la invitación a seguir la cuenta y El Reflejo va ahí, junto con las obras y las fuentes. Se guarda en `publicacion.md`.
  Nombre, biografías y firmas, iguales en todos los canales: `docs/identidad.md`. El Reflejo sale cada dos o tres semanas:
  nunca prometer "cada semana".
- **YouTube Shorts (desde octubre de 2026):** los mismos reels, sin trabajo extra. Reglas:
  - El mismo MP4 para las dos plataformas (por eso la zona segura común de `docs/guia-visual.md`). Nunca el archivo
    descargado de Instagram, que tiene marca de agua.
  - Sin música agregada desde afuera: un Short de más de 1 minuto con un reclamo de derechos se bloquea. Si se quiere
    música, solo desde la biblioteca de sonidos de la app de YouTube.
  - Cada `publicacion.md` trae una sección "YouTube Shorts" con título (YouTube lo usa para buscar: nombre de la obra, del
    mito o del artista) y descripción. En los Shorts los links de la descripción no se pueden tocar: El Reflejo va en los
    links del perfil del canal.
  - Prueba de 8 videos: mirar en YouTube Studio qué porcentaje lo mira en vez de pasarlo y hasta qué segundo llega.
  - El 02 (Ícaro) tiene una versión de 90 s solo para YouTube (`02-icaro-90.mp4`); la de Instagram quedó como se publicó.

Estrategia y banco de temas: [estrategia-contenido.md](estrategia-contenido.md).
