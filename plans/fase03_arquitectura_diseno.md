# Fase 03 — Arquitectura y diseño

## Objetivo

Definir la estructura de carpetas, el modelo de datos de contenido y las
decisiones técnicas que sostienen los requisitos de la
[Fase 02](fase02_descubrimiento_requisitos.md).

## Decisiones

- **AD1 — i18n por rutas, sin librería.** Rutas `/es/...` y `/en/...`
  generadas con `getStaticPaths`. Evita una dependencia extra y da URLs
  indexables por idioma.
- **AD2 — Contenido en TypeScript tipado, no en Markdown/MDX.** El volumen de
  contenido es pequeño y se beneficia más de una capa tipada
  (`Experiencia`, `Proyecto`, `Skill`) validada en build que de un pipeline
  MDX. Ver [RQ-03](fase02_descubrimiento_requisitos.md).
- **AD3 — Separación `es` / `en` por archivo.** `src/data/es.ts` y
  `src/data/en.ts` exportan la misma forma de objeto. La ausencia de una
  traducción se detecta al comparar claves.
- **AD4 — Layout único.** `BaseLayout.astro` centraliza `<head>`, SEO,
  navegación y footer. Las páginas solo aportan contenido.
- **AD5 — `base` configurable.** `site` y `base` en `astro.config.mjs`
  apuntan al repositorio de GitHub Pages, con lectura desde variable de
  entorno si en el futuro hay dominio propio.
- **AD6 — CSS scoped nativo.** Sin framework de estilos. Un único
  `global.css` con custom properties para tokens de diseño.

## Estructura

```text
src/
├── components/     # Header, Footer, secciones reutilizables
├── data/           # es.ts, en.ts  ← contenido a sustituir
├── layouts/        # BaseLayout.astro
├── pages/
│   ├── index.astro # redirección a /es/
│   ├── es/         # index, experiencia, proyectos/[slug]
│   └── en/         # index, experiencia, proyectos/[slug]
└── styles/global.css
```

## Modelo de datos

`Perfil`, `Experiencia[]`, `Proyecto[]`, `SkillGroup[]`, `Contacto`.
Cada entrada de colección lleva `id`/`slug` estable: es la clave de traducción
y de verificación entre idiomas.

## Riesgos

- **R1 — Contenido de marcador.** `src/data/*.ts` contiene texto de ejemplo.
  Es el punto único de sustitución.
