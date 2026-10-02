# Rafael.dev — Portafolio

Portafolio personal de **Rafael Arlant Cortes**, estudiante de Ingeniería de
Sistemas y Computación y técnico en Desarrollo de Software.

Sitio estático de una sola página, en español, construido con
[Astro](https://astro.build) y desplegado en GitHub Pages.

**URL:** https://jrafael1012.github.io/JRafael1012/

---

## Stack

| Pieza | Elección | Motivo |
| --- | --- | --- |
| Generador | Astro 7 | HTML por defecto, sin JavaScript en el cliente salvo el que se pide |
| Lenguaje | TypeScript | Contenido tipado y errores detectados antes de compilar |
| Estilos | CSS puro | Un solo archivo, sin framework ni dependencias |
| Tipografías | Inter + JetBrains Mono | Autoalojadas vía `@fontsource-variable`, sin peticiones a terceros |
| Comportamiento | JavaScript nativo | ~3 KB, sin librería |
| Logos del stack | Simple Icons + Devicon + SVG locales | 29 en ámbar (Simple Icons), 3 a color (Devicon), 5 en `public/img/logos/` |
| Despliegue | GitHub Actions → Pages | Publica `dist/` en cada push a `main` |

---

## Estructura

```
PortafolioAstro/              Página única. Orden de las secciones:
public/                       Hero → Stack → Trayectoria → Proyectos → Contacto
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
                         fotos del hero, galería de credenciales y pausa
                         del marquee
├── src/
│   ├── components/          Un componente por sección (solo marcado, sin CSS)
│   │   ├── Header.astro
│   │   ├── Hero.astro        Carrusel de 3 fotos y cartel de disponibilidad
│   │   ├── Stack.astro       Marquesina infinita de logos
│   │   ├── Trayectoria.astro Timeline con línea que avanza al hacer scroll,
│   │   │                     y galería del diploma del SENA (Finovateh)
│   │   ├── Proyectos.astro
│   │   ├── Contacto.astro
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
npm run dev      # http://localhost:4321/JRafael1012
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
| Enlaces del menú | `nav` |
| Título y descripción del SEO | `perfil.meta` |
| Ruta de la hoja de vida | `perfil.cv.href` |
| Formación y actividades | `experiencia` |
| Tecnologías del marquee | `stack` |
| Proyectos | `proyectos` |
| Correo, GitHub, LinkedIn | `contacto` |

### Botones de redes sociales del hero

Debajo de la foto de portada hay botones circulares con los logos de WhatsApp,
Instagram, LinkedIn, Discord y Gmail. Los botones externos abren en una pestaña
nueva; Gmail abre el cliente de correo. Los enlaces de LinkedIn y Gmail se toman
de `contacto` en `src/data/perfil.ts`. Para cambiar WhatsApp, Instagram o Discord,
edita la constante `redes` de `src/components/Hero.astro`.

### ⚠ Antes de publicar, revisa esto

1. `stack` — **un logo es una afirmación.** Quita las tecnologías que no
   manejes: quien lo ve da por hecho que sí.
2. Coloca tu hoja de vida en `public/cv.pdf`.
3. `proyectos[].enlace.url` apunta al perfil de GitHub, no a repositorios.
4. Añade `public/img/diploma-tecnico.jpg` y `public/img/entrega-diploma.jpg`
   para llenar los dos huecos de la galería, y borra `public/img/foto.jpg`
   cuando ya no la uses.

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

El archivo está divided en diez bloques numerados y comentados:

| Bloque | Contenido |
| --- | --- |
| 1 | Tokens: paleta, tipografías y medidas |
| 2 | Base: reset y utilidades |
| 3 | Componentes compartidos: secciones, tarjetas, botones, etiquetas |
| 4 | Header |
| 5 | Hero |
| 6 | Trayectoria |
| 7 | Stack: marquesina infinita de logos |
| 8 | Proyectos |
| 9 | Contacto |
| 10 | Footer |

### Cambiar los colores de todo el sitio

Edita la paleta de la sección 1. Los diez colores están en orden, de oscuro a
cálido. Para cambiar la marca global lo normal es ajustar los tres acentos:

```css
--accent:   var(--amber-flame);  /* títulos y cifras */
--accent-2: var(--cayenne-red);  /* enlaces y bordes */
--accent-3: var(--brick-ember);  /* palabra del titular */
```

### Breakpoints

Dos, y coinciden en todos los bloques: **1050 px** y **700 px**.

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
   arregla desde el código. En <https://github.com/JRafael1012/JRafael1012/settings/pages>
   la fuente debe ser **GitHub Actions**. Se comprueba sin credenciales:
   `has_pages` en `https://api.github.com/repos/JRafael1012/JRafael1012` debe
   ser `true`; si es `false`, el repositorio no tiene Pages activo y
   `deploy-pages` falla.
2. **La URL correcta lleva subcarpeta**: `https://jrafael1012.github.io/JRafael1012/`.
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
base: '/JRafael1012',
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
