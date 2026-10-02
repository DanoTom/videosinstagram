# Identidad: un mismo Dano en todos los canales

Decidido en octubre de 2026, cuando se sumó YouTube. Los canales de divulgación (Instagram, YouTube, Substack con El Reflejo y
las notas) son una sola propuesta en tres formatos. Las descripciones de cada video (`publicacion.md`) salen de acá.

## La idea que une todo

**Un psicólogo toma algo de la cultura (una obra, un mito, una historia) para pensar qué dice sobre lo que nos pasa.**

| Formato | Para qué sirve | Dónde |
|---|---|---|
| Video corto (90 s) | Que alguien nuevo te descubra | Instagram y YouTube Shorts (@dano_arte) |
| Notas | La conversación, ideas sueltas | Substack Notes |
| El Reflejo | Pensar con tiempo; la relación con quien lee | Substack (newsletter) |

Todo apunta a El Reflejo: es lo único que no depende de un algoritmo (las suscripciones por correo son tuyas). Cada
video invita a seguir la cuenta y a leer El Reflejo; El Reflejo menciona los videos.

## Reglas

- **El mismo nombre en todos lados:** "Dano Tommasi" como nombre visible y "Daniel Tommasi" en las presentaciones largas.
  El usuario @dano_arte se mantiene en Instagram y YouTube; si algún día se cambia, en los dos a la vez.
- **La misma foto en todos los perfiles.**
- **No prometer frecuencia.** El Reflejo sale cada dos o tres semanas: nada de "cada semana" en ningún texto.
- **El cierre de Dano se repite** como firma: "Para quienes quieren darse el tiempo de pensar, no solo consumir."

## Textos

### Substack · El Reflejo (descripción de la publicación)

> Soy Daniel Tommasi, psicólogo. En El Reflejo tomo algo de la cultura —una obra, un mito, una película— para pensar qué dice
> sobre lo que nos pasa. Escribo con todo lo que fui leyendo y aprendiendo en el camino. No llega todas las semanas: llega
> cuando hay algo que vale la pena pensar despacio. Para quienes quieren darse el tiempo de pensar, no solo consumir.

Si se prefiere dar un ritmo: cambiar "No llega todas las semanas: llega cuando…" por "Llega cada dos o tres semanas, cuando…".

**Descripción corta** (la que aparece al suscribirse y en las vistas previas):

> Un psicólogo lee la cultura para pensar lo que nos pasa.

### Substack · perfil (se ve en las notas)

> Psicólogo. Escribo El Reflejo: la cultura como espejo de lo que nos pasa. Videos cortos sobre arte y mitos en Instagram y
> YouTube (@dano_arte).

### Instagram

**Nombre** (es el campo que se busca; máximo 30 caracteres): Dano Tommasi · psicólogo

**Biografía** (máximo 150 caracteres):

> Psicólogo. Tomo una obra, un mito o una historia para pensar lo que nos pasa.
> El Reflejo, mi newsletter ↓

**Link:** El Reflejo (Instagram permite varios: sumar el canal de YouTube).

### YouTube

**Nombre del canal:** Dano Tommasi · psicólogo (el usuario sigue siendo @dano_arte)

**Descripción:**

> Soy Daniel Tommasi, psicólogo. Hago videos cortos sobre arte, mitos y cultura, y sobre lo que dicen de nosotros: cómo
> miramos, qué preferimos no ver, cómo amamos.
>
> También escribo El Reflejo, un newsletter para quienes quieren darse el tiempo de pensar, no solo consumir. El link está
> acá abajo.

**Links del canal:** El Reflejo e Instagram.

**Banner:** `canal/banner-youtube.jpg` (2560×1440, se sube en Personalizar canal → Marca). Obras de los videos apoyadas sobre
una línea de agua que las refleja (el reflejo: El Reflejo y Narciso), con el nombre en el centro. Lo que se ve en el celular
es solo la franja central de 1546×423 (x 507–2053, y 508–931); en la computadora, esa franja a todo el ancho; la imagen
entera, solo en la tele. Se arma con `canal/banner.html` y se captura con `node herramientas/capturar.mjs canal/banner.html`
(`--ui` muestra la franja del celular). Para cambiar las obras, editar las láminas: se ubican solas a los costados del nombre.

### Firma de cada video (`publicacion.md`)

- Instagram: "Si te interesa, seguime por acá. Y si querés pensarlo con más tiempo, escribo El Reflejo (link en la bio)."
- YouTube: "Soy psicólogo. Si te interesa, suscribite. También escribo El Reflejo, un newsletter para pensar con más tiempo: el
  link está en el perfil del canal."
