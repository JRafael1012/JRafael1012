# Fase 01 — Dirección estratégica y viabilidad

## Objetivo

Definir el proyecto `PortafolioAstro` y confirmar que es viable y rentable
construirlo.

## Decisiones

- **D1 — Nombre:** PortafolioAstro
- **D2 — Objetivo:** conseguir empleo. El sitio funciona como CV vivo: debe
  comunicar experiencia, skills y casos concretos de forma escaneable.
- **D3 — Stack:** Astro (sitio estático, sin framework de UI en runtime).
- **D4 — Plataforma objetivo:** web estática servida por GitHub Pages.
- **D5 — Idioma:** bilingüe (es / en).
- **D6 — Perfil MIDEGS:** Ligero. Proyecto personal, sin datos sensibles, sin
  usuarios registrados, sin persistencia, despliegue estático.
- **D7 — Repositorio:** `https://github.com/JRafael1012/JRafael1012.git`

## Alcance

### Incluye

- Sitio de una página (home) + páginas de contenido.
- Versión bilingüe con selector de idioma.
- Despliegue en GitHub Pages.

### No incluye

- CMS, panel de administración o backend.
- Autenticación, comentarios, formularios con persistencia.
- Analítica de terceros ni cookies de seguimiento.
- Blog con MDX en esta fase.

## Criterios de aceptación

- Objetivo, stack, plataforma, idioma y perfil quedan documentados.
- No hay dependencias de pago ni servicios externos que mantener.

## Riesgos

- **R1 — Contenido real desconocido.** El sitio arranca con contenido de
  marcador (placeholder) y datos de contacto provisionales. Se reemplaza en
  la Fase 5 una vez el usuario aporte su información real.
- **R2 — Base path de GitHub Pages.** El repositorio es
  `JRafael1012/JRafael1012` (no `JRafael1012.github.io`), por lo que las rutas
  se publicarán bajo `/JRafael1012`. Esto obliga a configurar `base` en Astro.

## Evidencia

Decisiones registradas en este plan. Entorno verificado: Node v22.17.0,
npm 10.9.2, git 2.50.0, gh 2.101.0.
