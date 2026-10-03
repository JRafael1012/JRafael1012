# Rafael.dev — Portafolio

Portafolio personal de **Rafael Arlant Cortes**, estudiante de Ingeniería de
Sistemas y Computación y técnico en Desarrollo de Software.

Sitio estático de una sola página, en español, construido con
[Astro](https://astro.build) y desplegado en GitHub Pages.

**URL:** https://jrafael1012.github.io/PorfolioJR/

---

## Stack

| Pieza | Elección | Motivo |
| --- | --- | --- |
| Generador | Astro 7 | HTML por defecto, sin JavaScript en el cliente salvo el que se pide |
| Lenguaje | TypeScript | Contenido tipado y errores detectados antes de compilar |
| Estilos | CSS puro | Un solo archivo, sin framework ni dependencias |
| Tipografías | Inter + JetBrains Mono | Autoalojadas vía `@fontsource-variable`, sin peticiones a terceros |
| Comportamiento | JavaScript nativo | ~3 KB, sin librería |
| Iconos de interfaz | `lucide-astro` | Iconos SVG reales de Mail, GitHub, LinkedIn y flechas |
| Logos del stack | Simple Icons + Devicon + SVG locales | 29 en ámbar (Simple Icons), 3 a color (Devicon), 5 en `public/img/logos/` |
| Despliegue | GitHub Actions → Pages | Publica `dist/` en cada push a `main` |

---

## Estructura

```
PortafolioAstro/              Página única. Orden de las secciones:
public/                       Hero → Stack → Sobre mí → Trayectoria →
                              Proyectos → Contacto
├── favicon.png              256×256, generado desde el logo
├── favicon-32.png           32×32
├── apple-touch-icon.png     180×180
├── img/
│   ├── logo.png             Logotipo (header y favicon)
│   ├── foto1.jpeg           Foto 1 del hero (la que se precarga)
│   ├── foto2.jpeg           Foto 2 del hero
│   ├── foto3.png            Foto 3 del hero
│   ├── logos/               SVG locales: canva, chatgpt, copilot,
│   │                        antigravity y windows. Cada uno lleva su
│   │                        fuente y licencia en un comentario interno
│   └── cv.pdf               ← PENDIENTE: colocar la hoja de vida
└── js/
    └──     main.js              Revelado al hacer scroll, anclas, carrusel de
                         fotos del hero, galería de credenciales,
                         collage de robótica, paneles plegables y pausa
                         del marquee
├── src/
│   ├── components/          Un componente por sección (solo marcado, sin CSS)
│   │   ├── Header.astro
│   │   ├── Hero.astro        Carrusel de 3 fotos, cartel de disponibilidad,
│   │   │                     línea de tecnologías clave y 4 botones
│   │   ├── Stack.astro       Marquesina infinita de logos
│   │   ├── SobreMi.astro     Seis preguntas plegables y propuesta de valor
│   │   ├── Trayectoria.astro Timeline con línea que avanza al hacer scroll,
│   │   │                     galería del diploma del SENA (Finovateh) y
│   │   │                     collage de fotos de robótica
│   │   ├── Destacados.astro  Solo los proyectos con `destacado: true`,
│   │   │                     tarjetas anchas imagen + texto
│   │   ├── ProyectoCard.astro Tarjeta compartida de las dos secciones
│   │   ├── Proyectos.astro   Todos los proyectos en la rejilla
│   │   ├── Contacto.astro    Cuatro tarjetas de contacto + CTA de correo
│   │   └── Footer.astro
│   ├── data/
│   │   └── perfil.ts        ← TODO el contenido del sitio
│   ├── layouts/
│   │   └── BaseLayout.astro <head>, SEO, fuentes y esqueleto
│   ├── pages/
│   │   └── index.astro      La página única
│   ├── styles/
│   │   └── global.css       ← TODO el CSS, documentado por bloques
│   └── paths.ts             Helper de rutas con `base`
├── plans/                   Planes MIDEGS de las fases 1–4
├── .github/workflows/
│   └── deploy.yml           Despliegue automático
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## Puesta en marcha

```bash
npm install
npm run dev      # http://localhost:4321/PorfolioJR
```

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor con recarga automática |
| `npm run build` | Genera el sitio estático en `dist/` |
| `npm run preview` | Sirve `dist/` como lo hará producción |
| `npx astro check` | Revisa tipos y errores de Astro |

Requiere Node.js 22 o superior.

### `@types/node` no es opcional

`astro.config.mjs` lee `process.env.SITE` y `process.env.BASE`, y lleva
`// @ts-check`, así que necesita los tipos de Node. Por eso `@types/node` está
en `devDependencies`.

Esto no es puramente teórico: mientras faltaba, `astro check` **fallaba en GitHub
Actions y pasaba en local**. La causa era que en este equipo existe
`C:\Users\User\node_modules\@types\node` fuera del proyecto, y TypeScript sube
por las carpetas buscando `node_modules/@types`; en Linux ese ancestro no
existe. O sea: **un `npm run build` verde aquí puede mentir si depende de tipos
heredados del entorno.** La prueba válida es el workflow de GitHub.

No borres `@types/node` del `package.json` sin comprobar `npx astro check` en
Actions.

---

## Cómo editar el contenido

**Todo el texto del sitio está en `src/data/perfil.ts`.** No hace falta tocar
los componentes para cambiar textos.

| Qué cambiar | Dónde |
| --- | --- |
| Nombre, cargo, ciudad, descripción | `perfil` |
| Nombre corto del `<h1>` (por defecto «Rafael Arlant») | `perfil.nombreCorto` |
| Tecnologías de la línea del hero | `perfil.tecnologiasClave` |
| Enlaces del menú | `nav` |
| Título y descripción del SEO | `perfil.meta` |
| Ruta de la hoja de vida | `perfil.cv.href` |
| Preguntas y respuestas de «Sobre mí» | `sobreMi` |
| Formación y actividades | `experiencia` |
| Tecnologías del marquee | `stack` |
| Proyectos | `proyectos` |
| Correo, GitHub, LinkedIn, WhatsApp (datos editables) | `datosContacto` |
| Tarjetas de contacto (textos y orden) | `contacto` |

### Los botones del hero

Son cuatro: **Conoce mis proyectos** (baja a `#proyectos`), **Descargar CV**,
**GitHub** y **Contacto** (baja a `#contacto`). Los dos externos abren en una
pestaña nueva. El enlace de GitHub se toma de `datosContacto.githubUrl` en
`src/data/perfil.ts`.

### «Sobre mí»: seis preguntas que se despliegan hacia la derecha

Cada pregunta es un botón; al pulsarla su respuesta aparece **al lado**, y la
pregunta se encoge. La primera arranca abierta. No hay JavaScript propio de la
sección: usa el patrón `data-exp-toggle` + `aria-controls` que
`public/js/main.js` ya tenía para «Ver experiencia» en la trayectoria. Para
abrir otra de entrada por defecto, añade `data-exp-open` a su botón.

**Las dos diferencias con un acordeón normal**, por si hay que tocarlo:

1. Los botones de esta sección llevan **`data-exp-css`**. Es lo que permite
   que el despliegue se anime: `display: none` no transiciona, así que el
   estado no puede vivir en `hidden` sino en `visibility`, que sí se anima y
   aun así saca el panel del tabulado y de los lectores de pantalla. El
   atributo `hidden` sigue en el HTML para quien llegue sin JavaScript, y el
   script lo quita en cuanto arranca. **Los paneles que no lleven
   `data-exp-css` siguen funcionando igual que antes.**
2. Hay un envoltorio extra, `.about-panel__inner`, que es el que recorta el
   alto. Sin él el contenido seguiría marcando el alto y las seis filas
   quedarían altas siempre.

Dos mandos si quieres ajustar el ancho:

| Qué cambiar | Dónde | Efecto |
| --- | --- | --- |
| Ancho total de las filas | `max-width` de `.about-list` (en `rem`) | **1 cm ≈ 2,36 rem.** Ahora `54rem` |
| Reparto entre pregunta y respuesta | `1fr / 1.07fr` de `.about-item` | Más `fr` en la respuesta = más ancha |
| Tope del texto | **no hay**, que el ancho lo manda la columna | Si lo añades, el texto se corta |

Debajo de 700 px no cabe de lado y la respuesta vuelve a caer hacia abajo: solo
se anima el alto.

El orden de las preguntas es un arco y conviene mantenerlo: identidad → lo que
resuelvo → la base técnica → lo que me interesa → qué quiero construir → qué
busco. Quien solo lea los títulos ya se queda con el resumen.

El texto y las etiquetas de la respuesta entran desde la derecha, el mismo
sentido en que crece la columna. Las etiquetas de «¿Qué me interesa?» se abren
además como una cortina de izquierda a derecha y entran escalonada. Si el
sistema pide menos movimiento (`prefers-reduced-motion`), todo el despliegue
sale instantáneo.

### Botones de redes sociales del hero

Debajo de la foto de portada hay botones circulares con los logos de WhatsApp,
Instagram, LinkedIn, Discord y Gmail. Los botones externos abren en una pestaña
nueva; Gmail abre el cliente de correo. El hero busca LinkedIn y Correo dentro de
`contacto` por su `label` y toma su `href`, así que el enlace sale de
`datosContacto`. Para cambiar WhatsApp, Instagram o Discord (o reordenar los
botones), edita la constante `redes` de `src/components/Hero.astro`.

### ⚠ Antes de publicar, revisa esto

1. `stack` — **un logo es una afirmación.** Quita las tecnologías que no
   manejes: quien lo ve da por hecho que sí.
2. Coloca tu hoja de vida en `public/cv.pdf`.
3. `proyectos[].enlace.url` apunta al perfil de GitHub, no a repositorios. **RESUELTO en D21:** los cuatro proyectos inventados se borraron y ahora los enlaces van a repositorios reales.
4. Añade `public/img/diploma-tecnico.jpg` y `public/img/entrega-diploma.jpg`
   para llenar los dos huecos de la galería, y borra `public/img/foto.jpg`
   cuando ya no la uses.

### Los botones de contacto

Contacto **ya no reutiliza `.nav-cv`** del header: es un diseño propio (D24). Los
botones de «Hoja de vida» del header y los de esta sección son independientes y
cambian por separado.

Los cuatro medios de contacto se generan desde el array `contacto` en
`src/data/perfil.ts`. Cada tarjeta es un `<a>` completo (`.contact-card`), con
plataforma, valor, descripción corta y flecha:

1. **Correo** — destacado, con borde ámbar y degradado `--accent` → `--accent-2`.
2. **GitHub** — valor desde `datosContacto.githubUrl`.
3. **LinkedIn** — valor desde `datosContacto.linkedinUrl`.
4. **WhatsApp** — número desde `datosContacto.whatsappNumber`; la tarjeta se
   oculta (`aria-disabled`) si el número está vacío.

Los tres datos editables viven en el bloque `datosContacto` del mismo archivo:

- `email` — dirección y `mailto:` del botón principal.
- `githubUrl` / `githubUsername` — enlace y texto visible.
- `linkedinUrl` — enlace a tu perfil.
- `whatsappNumber` — solo el número, sin `+` ni espacios (ej. `573238176273`);
  el enlace `https://wa.me/...` y el texto `+57 323 817 6273` se calculan solos.

El mensaje de WhatsApp está en `datosContacto.whatsappMessage` y se codifica con
`encodeURIComponent`, así que los acentos y signos no rompen la URL.

El botón inferior (`¿Prefieres escribirme directamente?` → «Envíame un mensaje») y
la tarjeta de correo usan `correoUrl`, que es un `mailto:` y **no** abre pestaña.
GitHub, LinkedIn y WhatsApp abren en pestaña nueva con
`rel="noopener noreferrer"`.

Los valores largos llevan `overflow-wrap: anywhere` para no desbordarse en móvil.

### Dos secciones de proyectos, no una

`proyectos` alimenta **dos secciones independientes** del mismo array:

1. **`#destacados` — "Proyectos destacados"** (`Destacados.astro`). Los que
   llevan `destacado: true`, en tarjetas anchas de una columna: captura a la
   izquierda, texto a la derecha. Va **antes** en la página, para que quien
   entra vea primero lo mejor.
2. **`#proyectos` — "Todos los proyectos"** (`Proyectos.astro`). **Todos**,
   los destacados incluidos, en la rejilla de `.card-grid`. Aquí no se filtran.

Que un proyecto esté en las dos secciones es lo normal: la tarjeta destacada es
una llamada y la completa da el detalle. Ambas usan el mismo componente,
`src/components/ProyectoCard.astro`; la segunda lo llama sin `destacada`, y por
eso sale en la rejilla y no a ancho completo.

Hay una entrada de nav para cada una: **Destacados** y **Proyectos**. El nav
lleva `flex-wrap: wrap`, así que el sexto enlace envuelve en vez de desbordar.

**Todo menos el título está vacío a propósito.** Cada campo es opcional y la
tarjeta dibuja solo el que exista: `descripcion`, `problema`, `stack`,
`funcionalidades`, `participacion`, `estado`, `imagen`, `repositorio`, `demo`.
Un dato que no tienes **no se inventa ni se disimula**, simplemente no sale.

**El hueco de la imagen se reserva siempre**, tenga foto o no: `aspect-ratio`
fija la altura y el hueco vacío mide exactamente lo mismo que la captura, así
que la tarjeta no da saltos cuando la añadas. Lo decides así a propósito: los
proyectos se llenarán más adelante y el espacio se queda reservado mientras
tanto. Con la foto puesta:

```ts
imagen: 'img/proyectos/finovatech.webp'   // dentro de public/
```

Se acepta con o sin barra inicial (`'/img/...'` y `'img/...'`). **Importante:**
`withBase()` solo antepone el `base` de GitHub Pages a rutas que empiezan por
`/`, y sin él una ruta relativa devolvería 404 en `usuario.github.io`. Por eso
`ProyectoCard.astro` normaliza la ruta antes de usarla: si le pones la imagen
sin la barra inicial, funciona igual.

**Los botones solo salen con URL real.** Sin `demo` ni `repositorio`, la tarjeta
se queda sin botones; nunca se enlaza al perfil de GitHub para rellenar el hueco
(ver D21). Se llaman «Ver proyecto» (apunta a `demo`) y «GitHub» (apunta a
`repositorio`), y ambos abren en pestaña nueva con `rel="noopener noreferrer"`.

Los botones son propios, `.project-card__btn`, en vez de reutilizar `.btn`: los
del hero miden 56 px con 30 px de hueco y aquí van dos en paralelo y más
pequeños. El lenguaje visual es el mismo — primario con relleno `accent`,
secundario solo con borde — y el `min-height` es de 44 px, el objetivo táctil
mínimo. El elevamiento va dentro de `@media (hover: hover)` para que en táctil
no quede un estado pegado después de tocar.

**El tercer destacado es provisional.** Hay tres tarjetas marcadas, pero
«RAF VESTIGIA» salió de la lista de candidatos del documento de contenido, no de
los datos del sitio; en `experiencia` la robótica figura como «Robótica» en
Fundación Biosbot Robótica. Confirma el nombre o bórralo.

**Faltan proyectos.** El objetivo son 8 en la sección completa y 3 destacados, y
ahora mismo hay **3 confirmados**. La estructura ya aguanta los 8: se añaden al
array y aparecen solas, sin tocar los componentes.

### La marquesina de logos

Un logo se resuelve en este orden, y se para en el primero que exista:

1. `slug` → `https://cdn.simpleicons.org/<slug>/ffba08` (SVG teñido de ámbar).
2. `di` → Devicon, a color, para lo que Simple Icons no tiene.
3. `icono` → un SVG de `public/img/logos/`. Se lee con `withBase()`, sin eso
   devolvería 404 en GitHub Pages.

Si no hay ninguno de los tres, se muestra solo el nombre, con un hueco punteado
para no romper el ritmo de la fila. Hoy las 37 tecnologías tienen logo.

| Slug que da 404 | En su lugar |
| --- | --- |
| `css3` | usa `css` |
| `java` | usa `openjdk` |
| `vscode` / `visualstudiocode` | no existen; usa `di: 'vscode'` (Devicon) |
| `openai` | usa `anthropic` o `claude` |
| `canva` | está en el paquete npm de Simple Icons pero **no** en `cdn.simpleicons.org`; usa un SVG local |
| `chatgpt` / `openai` | no existen; usa el SVG local de Wikimedia Commons |
| `bash` | usa `gnubash` |
| `nodejs` | usa `nodedotjs` |

Para añadir una, comprueba que el slug responde antes de dar por hecho que
funciona:

```
https://cdn.simpleicons.org/<slug>/ffba08
```

---

## Cómo editar los estilos

**Todo el CSS está en `src/styles/global.css`** (~14 KB). Ningún componente
`.astro` lleva estilos dentro.

El archivo está dividido en once bloques numerados y comentados:

| Bloque | Contenido |
| --- | --- |
| 1 | Tokens: paleta, tipografías y medidas |
| 2 | Base: reset y utilidades |
| 3 | Componentes compartidos: secciones, tarjetas, botones, etiquetas |
| 4 | Header |
| 5 | Hero |
| 6 | Trayectoria |
| 7 | Stack: marquesina infinita de logos |
| 8 | Sobre mí: preguntas plegables y propuesta de valor |
| 9 | Proyectos |
| 10 | Contacto: fondo del hero, marco, tarjetas de contacto y CTA |
| 11 | Footer |

### Cambiar los colores de todo el sitio

Edita la paleta de la sección 1. Los diez colores están en orden, de oscuro a
cálido. Para cambiar la marca global lo normal es ajustar los tres acentos:

```css
--accent:   var(--amber-flame);  /* títulos y cifras */
--accent-2: var(--cayenne-red);  /* enlaces y bordes */
--accent-3: var(--brick-ember);  /* palabra del titular */
```

### Breakpoints

Dos, y coinciden en casi todos los bloques: **1050 px** y **700 px**.

Excepción conocida, sin arreglar: el bloque 11 (Footer, `800px` y `520px`) usa
cortes propios. Se nota entre 700 y 800 px, donde el resto ya va en layout móvil y
ese bloque todavía va a dos columnas.

El bloque 10 (Contacto) sí usa los cortes globales, más un tercero a **420 px**
para móvil pequeño.

### Accesibilidad

- `:focus-visible` dibuja el contorno de foco. No lo elimines.
- `.skip-link` es el enlace «Saltar al contenido».
- `prefers-reduced-motion` desactiva animaciones. No lo quites.
- Las cajas `aspect-ratio` de la foto evitan saltos de maquetación.

---

## Imágenes

| Archivo | Uso | Tamaño real |
| --- | --- | --- |
| `public/img/logo.png` | Header y favicon | 992×1061 px |
| `public/img/foto1.jpeg` | Foto 1 del hero (la precargada) | 960×1280 px, 177 KB |
| `public/img/foto2.jpeg` | Foto 2 del hero | 899×1599 px, 159 KB |
| `public/img/foto3.png` | Foto 3 del hero | 463×937 px, 634 KB |
| `public/img/foto.jpg` | Sin uso, quedó de la versión anterior | 992×1061 px, 255 KB |

Las fotos del hero están en `src/components/Hero.astro` (`const fotos`). El
carrusel rota cada 15 s y se apaga solo si el sistema pide menos movimiento
(`prefers-reduced-motion`). Cada foto tiene su propio encuadre en
`.photo--1`, `.photo--2` y `.photo--3` mediante `object-position`.

La galería de credenciales (`src/components/Trayectoria.astro`) usa por ahora
**marcadores**, no imágenes: dos huecos con icono SVG que indican dónde irá
`public/img/diploma-tecnico.jpg` y `public/img/entrega-diploma.jpg`. Al añadir
esas fotos hay que cambiar el `<div class="credential-slot">` por un `<img>`.

El collage de robótica (mismo archivo) también usa marcadores, en una rejilla de
2×2: cada casilla espera una de las seis fotos `public/img/robotica-1.jpg` …
`robotica-6.jpg`. Los nombres salen de `galeria` en `src/data/perfil.ts`; si un
bloque de experiencia no tiene ese campo, no se pinta collage. Al añadir las
fotos, cambia el `<div class="rob-slot">` de esa capa por un `<img>`.

Las dos galerías cambian solas cada 5 s, sin bordes ni botones: si el sistema
pide menos movimiento (`prefers-reduced-motion`), se quedan en la primera
combinación y no arrancan.

**Competencias y torneos.** Dentro del bloque de Robótica hay un botón *Ver
experiencia en competencias* que despliega la lista de
`competencias` (`src/data/perfil.ts`), de más reciente a más antigua. Cada
entrada lleva `titulo`, `periodo` y, si los tienes, `evento`, `resultado` y
`lugar`; los que faltan se pueden omitir y la tarjeta simplemente no los muestra.

Los 8 torneo llevan puesto y ciudad: los regionales y nacionales fueron en
Bogotá, salvo *Submerged* (Cartagena); el internacional en Guadalajara, México;
y el *Asia Pacific Open Championship* en Sydney, Australia.

Para reemplazar una imagen, mantén el mismo nombre de archivo. Para cambiar el
marco de la foto, ajusta `aspect-ratio` en `.photo-frame`.

El favicon se genera recortando el logo a un cuadrado centrado:

```powershell
Add-Type -AssemblyName System.Drawing
# ver el bloque que genera favicon.png, apple-touch-icon.png y favicon-32.png
```

---

## Publicar y despliegue

```bash
git add -A
git commit -m "descripcion"
git push origin main
```

Ese push dispara `.github/workflows/deploy.yml`: instala, comprueba tipos,
compila y publica `dist/` en GitHub Pages.

### Si el push no publica: revisa esto

1. **Pages puede no estar habilitado.** Es el fallo más probable y no se
   arregla desde el código. En <https://github.com/JRafael1012/PorfolioJR/settings/pages>
   la fuente debe ser **GitHub Actions**. Se comprueba sin credenciales:
   `has_pages` en `https://api.github.com/repos/JRafael1012/PorfolioJR` debe
   ser `true`; si es `false`, el repositorio no tiene Pages activo y
   `deploy-pages` falla.
2. **La URL correcta lleva subcarpeta**: `https://jrafael1012.github.io/PorfolioJR/`.
   `https://jrafael1012.github.io/` da 404 aunque todo esté bien, porque el
   repositorio no es `JRafael1012.github.io`.
3. **Ver los errores** en la pestaña *Actions* del repositorio. Cada paso va
   separado (`sync`, `check`, `build`, artefacto, despliegue) para que se vea
   en cuál falla.

### La ruta base

El sitio no vive en la raíz del dominio sino en
`https://<usuario>.github.io/<repositorio>/`. Por eso `astro.config.mjs`
declara:

```js
base: '/PorfolioJR',
```

Y por eso existe `src/paths.ts`: la función `withBase()` antepone ese prefijo a
las rutas internas. **Si cambias el nombre del repositorio, actualiza también
`base`**, o las imágenes y el favicon devolverán 404.

Las anclas (`#proyectos`) y las URLs externas no llevan el prefijo.

---

## Decisiones de diseño

- **Tema oscuro único**, sin modo claro: la paleta cálida sobre fondo casi
  negro es la identidad del sitio.
- **CSS global único** en lugar de estilos con alcance por componente, para que
  la cascada sea predecible y todo el diseño se lea en un archivo.
- **JavaScript mínimo**: sin framework. Solo dos comportamientos, y ambos se
  desactivan si el usuario pidió menos movimiento.
- **Contenido tipado** en un solo archivo, separado de la presentación.

---

## Planes

`plans/` sigue el modelo MIDEGS.

- `plans/plan_midegs_completo.md` — fuente de verdad: decisiones (D1…D15) y las
  10 fases con sus criterios de aceptación.
- `plans/historial/` — los planes de las fases 1 a 4 tal como se escribieron
  entonces: dirección y viabilidad, requisitos, arquitectura y planificación.

Las decisiones no se duplican aquí: si algo ya está en el plan, el README lo
enlaza en vez de repetirlo.
