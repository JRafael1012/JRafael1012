# PortafolioAstro — Plan único MIDEGS (fases 1 a 10)

Plan consolidado de las diez fases. **Fuente de verdad del estado del
proyecto.** Los planes detallados de las fases 1 a 4 ya escritos siguen en
`plans/historial/` como historial y no se eliminan.

- **Perfil:** Ligero (ver fase01, D6). Sitio personal estático, sin datos
  sensibles, sin usuarios, sin persistencia.
- **Fase actual:** **05 — Desarrollo e integración.**
- **Regla aplicada:** no se escribe código sin plan aprobado de la fase
  (este documento). Este archivo es también el plan de la Fase 5, que estaba
  referenciado en `fase04` pero nunca se creó.

---

## Estado por fase

| Fase | Nombre | Estado | Evidencia |
| --- | --- | --- | --- |
| 1 | Dirección estratégica y viabilidad | Cerrada | `plans/historial/fase01_direccion_viabilidad.md` |
| 2 | Descubrimiento y requisitos | Cerrada | `plans/historial/fase02_descubrimiento_requisitos.md` |
| 3 | Arquitectura y diseño | Cerrada | `plans/historial/fase03_arquitectura_diseno.md` |
| 4 | Planificación y preparación | Cerrada | Git en `main`, `origin` correcto, CI/CD, `base: '/JRafael1012'`, `dist/` generado |
| 5 | Desarrollo e integración | **En curso** | Cerrados P1, P2, P3, P5. Pendientes P4 (pospuesto), P6, P7 (parcial) |
| 6 | Verificación y validación | Pendiente | — |
| 7 | Liberación y despliegue | Pendiente | Primer deploy ya publicado en `/JRafael1012` |
| 8 | Operación y mantenimiento | Pendiente | — |
| 9 | Evaluación y mejora | Pendiente | — |
| 10 | Retiro o reemplazo | Pendiente | — |

---

## Fase 05 — Desarrollo e integración

### Objetivo

Sustituir el contenido de marcador por información real verificada y dejar el
sitio listo para publicar.

### Decisiones

- **D5 — Contenido:** todo el texto vive en `src/data/perfil.ts`. No se editan
  componentes para cambiar contenido. Excepción registrada: la frase del hero
  (`titular`) estaba escrita a mano en `Hero.astro`; se corrigió el 2026-10-02
  para que el dato de `perfil.ts` sea el que se ve.
- **D9 — Presentación (2026-10-02):** por petición del usuario se reescribieron
  `perfil.titular` («Desarrollador de software enfocado en soluciones reales.»)
  y `perfil.descripcion` (texto completo del usuario). Sigue pendiente
  revisar el hero renderizado: ambos textos son más largos que los anteriores.
- **D10 — Iconos de la cinta (2026-10-02):** la cinta resuelve el logo en tres
  pasos y se detiene en el primero que exista: Simple Icons (29, SVG teñido en
  ámbar), Devicon (3 a color: Java, PowerShell y VS Code) y `icono`, un SVG de
  `public/img/logos/` leído con `withBase()` (5: Windows, Copilot, ChatGPT,
  AntiGravity y Canva). Resultado: **37 de 37 con icono**. Verificación: las 32
  URLs remotas del `dist/index.html` responden 200 una a una, los 5 SVG locales
  están en `dist/img/logos/` y no queda ningún archivo huérfano en esa carpeta.
  Se descartaron los `-plain` de Devicon porque no son monocromos y varios
  salen en negro invisible sobre este fondo.
- **D11 — Iconos locales (2026-10-02):** Windows (skillicons.dev, licencia no
  verificada), Copilot (Wikimedia Commons, dominio público; se le añadió
  `fill="#ffba08"` porque venía negro), ChatGPT (Wikimedia Commons, dominio
  público; se cambió de `ChatGPT_logo.svg`, que era el icono de la app —un
  cuadrado verde azulado que desentonaba con la cinta— a `ChatGPT-Logo.svg`,
  el nudo pelado, y se le añadió `fill="#ffba08"`), AntiGravity y Canva
  (thesvg.org, MIT). Cada SVG lleva su fuente y
  licencia en un comentario interno. Canva no está en `cdn.simpleicons.org`
  aunque sí en el paquete npm: se usa el SVG local en vez de saltarse esa
  retirada.
- **D12 — Recorte del stack (2026-10-02):** por decisión del usuario se quitaron
  SQL, Word, Excel y "Programación por bloques" —este último sustituido por
  Scratch, que es la herramienta concreta que usa en robótica— y se añadieron
  Figma y Canva. Python ya estaba y se mantiene. La lista pasó de 38 a 37, sin
  huecos: todo lo que aparece tiene logo. Los SVG de Word y Excel se borraron
  por quedar sin uso.
- **D13 — Hero con carrusel y galería de credenciales (2026-10-02):** cambios de
  presentación hechos por el usuario y verificados antes de subirlos.
  - *Carrusel del hero*: tres fotos (`foto1.jpeg`, `foto2.jpeg`, `foto3.png`)
    que rotan cada 15 s, con `object-position` distinto por foto
    (`.photo--1/2/3`) para encuadrar cada una. Botón de pausa. Solo se activa
    si hay más de una foto y `prefers-reduced-motion` no está activo. La
    primera foto lleva `fetchpriority="high"` y `BaseLayout` la precarga.
  - *Galería de credenciales* en el bloque del SENA: dos "huecos" con icono
    SVG en línea que indican dónde irá cada foto
    (`public/img/diploma-tecnico.jpg` y `public/img/entrega-diploma.jpg`).
    Son marcadores, no imágenes: no generan 404. Rotan cada 5 s, con botón de
    pausa y flecha. Se añade el proyecto final del SENA, **Finovateh**.
  - *Línea de tiempo*: la línea de la trayectoria se rellena según el scroll
    mediante la variable CSS `--timeline-progress`, actualizada con
    `requestAnimationFrame` (no en cada evento de scroll).
  - El cartel "Disponible para trabajar" pasa a flotar sobre la foto, con
    entrada propia (`placard-enter`) en lugar de ir inclinado sobre el nombre.
  - **Pendiente**: `public/img/foto.jpg` (255 KB) quedó sin uso al pasar a
    `foto1.jpeg`. No se borra sin autorización del usuario, que es una
    fotografía original.
- **D6 — CSS:** un único archivo, `src/styles/global.css`. Los `.astro` no
  llevan estilos dentro.
- **D7 — Imagen pendiente:** `public/cv.pdf` es un archivo binario. La IA lo
  deja preparado (enlace y texto ya existentes); el archivo lo aporta el
  usuario. No se inventa un PDF.
- **D8 — Divergencia con la Fase 1:** D5 de la fase 1 declara el sitio
  «bilingüe (es/en)» y la fase 1 incluye en alcance «páginas de contenido».
  La implementación actual es **una sola página, solo español**. Decisión
  pendiente del usuario: (a) mantener así y corregir la fase 1, o
  (b) ampliar a bilingüe/páginas, lo que abre fases 3, 4 y 5 de nuevo.
  **Bloqueante para cualquier ampliación de alcance.**

### Alcance

#### Incluye (P1–P7)

- **P1** `contacto[0].correo` → correo real (hoy `correo@ejemplo.com`). **Cerrado.**
- **P2** `contacto[2]` → URL real de LinkedIn (hoy perfil vacío). **Cerrado.**
- **P3** `experiencia` → fechas reales; el técnico sí es SENA, la universidad
  sigue como `Institución` hasta que se confirme su nombre. **Cerrado:** SENA
  2025 — 2026, Universidad Central 2027 — Actualidad, Fundación Biosbot
  Robótica (equipos Team Biosbot Colombia) 2020 — Actualidad.
- **P4** `proyectos[].enlace.url` → URL de cada repositorio, no del perfil.
  **Pospuesto por decisión del usuario (2026-10-02):** se deja el enlace al
  perfil `github.com/JRafael1012` hasta que existan repositorios públicos.
  Pendiente para Fase 6 o para cuando haya repos.
- **P5** `stack` → quitar tecnologías que no se manejen. Un logo es una
  afirmación. Comprobar cada slug en `https://cdn.simpleicons.org/<slug>/ffba08`.
  **Cerrado 2026-10-02:** el usuario confirma el listado de tecnologías y
  decide añadirlas todas. La cinta pasó de 25 a 38 entradas. Todos los `slug`
  se verificaron con HEAD uno a uno (26 con logo, 12 sin logo porque Simple
  Icons no los tiene: Java, SQL, Programación por bloques, VS Code, Word,
  Excel, Bash, PowerShell, ChatGPT, Windows, Copilot (Windows) y AntiGravity).
  Añadidos: TypeScript, Java, C, PHP, Node.js, Bash, PowerShell, ChatGPT,
  Android Studio, Linux, Kali Linux, Windows y Copilot (Windows). A `OpenCode`
  se le puso su logo tras verificarlo.
  **Reabierto y cerrado 2026-10-02 (ver D10, D11 y D12):** los huecos se
  cubrieron con Devicon y con SVG locales, de modo que las 37 tecnologías que
  quedaron tienen logo. El usuario quitó SQL, Word, Excel y Programación por
  bloques —este último sustituido por Scratch— y pidió Figma y Canva. Estado
  final: 37 entradas, 37 con logo, 0 huecos.
- **P6** `public/cv.pdf` → lo aporta el usuario (ver D7). **Abierto por
  decisión del usuario (2026-10-02):** se deja el enlace tal cual y se acepta
  el 404 hasta que entregue el PDF. `perfil.cv.href = 'cv.pdf'` apunta hoy a un
  archivo inexistente; revisar antes de publicar o antes de cerrar la Fase 7.
- **P7** Verificación de enlaces externos y del favicon. **Parcial 2026-10-02:**
  `github.com/JRafael1012` 200; `favicon.png`, `favicon-32.png` y
  `apple-touch-icon.png` presentes en `dist/`. LinkedIn devuelve 999 (bloqueo
  anti-bot a peticiones sin sesión), lo que no prueba que el enlace esté roto.

#### No incluye

- Backend, CMS, autenticación, analítica, blog, i18n (ver D8).
- Rediseño, nuevas secciones o cambios de paleta.

### Criterios de aceptación

1. `npm run build` (que ejecuta `astro check && astro build`) termina con exit
   code 0, sin errores de tipos.
2. `dist/index.html` existe y contiene el correo real.
3. Ningún `correo@ejemplo.com`, ningún `AÑO — AÑO` sin confirmar y ningún
   enlace a perfil genérico en lugar de repositorio.
4. Cada slug de `stack` responde 200 en el CDN, o la tecnología se muestra sin
   logo.
5. Consola del navegador sin errores ni 404 de recursos.
6. `git status` limpio tras el commit.

### Riesgos

- **R1 — Datos que solo tiene el usuario.** Si falta un dato, se deja el
  marcador y se lista como pendiente. No se inventa información.
- **R2 — OneDrive.** La carpeta está bajo sincronización; puede generar
  `desktop.ini` o bloquear Git. Vigilar antes de commits grandes.
- **R3 — Afirmar sin tener.** Publicar una tecnología o proyecto no real
  aumenta el riesgo en una entrevista. P5 prioriza eliminar sobre inventivear.

---

## Fase 06 — Verificación y validación

Objetivo: evidencia de que el sitio funciona, no de que compila.

- `npm run build` con exit code 0 (evidencia: salida del comando).
- `npm run preview` y recorrido de las cinco secciones.
- Comprobación de teclado: `:focus-visible`, enlace «Saltar al contenido».
- Comprobación con `prefers-reduced-motion` activado.
- Revisión del Lighthouse básico: peso de página y accesibilidad.

Cierre: la fase no se cierra sin evidencia registrada aquí.

---

## Fase 07 — Liberación y despliegue

- Push a `main` → `.github/workflows/deploy.yml` publica `dist/`.
- Verificar en `https://jrafael1012.github.io/JRafael1012/`.
- Confirmar que *Settings → Pages* usa la fuente **GitHub Actions**.
- Si cambia el nombre del repositorio, actualizar `base` en
  `astro.config.mjs` (ver `README.md`).

---

## Fase 08 — Operación y mantenimiento

- Revisar el sitio tras cada push (favicon, `cv.pdf`, enlaces externos).
- Los logos del marquee dependen de un CDN externo: si Simple Icons cambia un
  slug, aparece un hueco. Revisar si desaparece un logo.
- No hay servicios que mantener: no hay base de datos ni procesos abiertos.

---

## Fase 09 — Evaluación y mejora

- Métrica: contactos reales (cv descargado, correos, clics a repos).
- Retroalimentación real de entrevistas: qué preguntan y qué falta en el sitio.
- Solo entonces se evalúa D8 (bilingüe / páginas de contenido).

---

## Fase 10 — Retiro o reemplazo

- Sustituir cuando: GitHub Pages quede insuficiente, el dominio cambie o
  Astro 7 deje de recibir mantenimiento.
- Procedimiento: exportar el contenido de `perfil.ts`, conservar el
  `dist/` publicado y crear el nuevo proyecto. El contenido es lo único
 >data; los componentes son sustituibles.

---

## Trazabilidad

```text
Necesidad (D2 fase 1: conseguir empleo)
  → Requisito (comunicar experiencia, skills y casos de forma escaneable)
  → Diseño (fase 3, arquitectura de una página)
  → Código (src/components, src/data/perfil.ts, src/styles/global.css)
  → Prueba (fase 6: build + preview + recorrido)
  → Versión (commit en main)
  → Despliegue (GitHub Actions → /JRafael1012)
```

Cada pendiente P1–P7 corresponde a una línea concreta de `perfil.ts` o a un
archivo de `public/`. Si un cambio no se puede señalar con un P#, es alcance
nuevo y debe agregarse aquí antes de implementarse.