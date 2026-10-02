# Fase 02 — Descubrimiento y requisitos

## Objetivo

Convertir el objetivo de la [Fase 01](fase01_direccion_viabilidad.md) en
requisitos comprobables.

## Requisitos

| ID | Requisito | Criterio de aceptación |
|----|-----------|------------------------|
| RQ-01 | Home con nombre, titular y presentación | Visible en `/es/` y `/en/` |
| RQ-02 | Sección de experiencia laboral | Lista de puestos con fechas y logros |
| RQ-03 | Sección de skills agrupadas por categoría | Render desde datos, no HTML hardcodeado |
| RQ-04 | Sección de proyectos con detalle | Cada proyecto abre una página propia |
| RQ-05 | Selector de idioma es/en | Cambia de ruta y conserva la página actual |
| RQ-06 | Contacto vía enlaces (email, GitHub, LinkedIn) | Sin backend ni formularios persistidos |
| RQ-07 | SEO básico por página | `title` y `description` únicos y traducibles |
| RQ-08 | Accesible y responsive | Navegable por teclado, legible en móvil |
| RQ-09 | Desplegable en GitHub Pages | `base` correcto; build sin errores |

## Datos de contenido pendientes

El usuario aún no ha aportado su información real. Se creará una capa de datos
centralizada (`src/data/`) con contenido de marcador claramente identificado,
para que sustituirlo sea una edición de un solo archivo por idioma.

## Fuera de alcance

Ver la sección "No incluye" de la [Fase 01](fase01_direccion_viabilidad.md).

## Riesgos

- **R1 (heredado):** si el contenido de marcador no se reemplaza, el sitio no
  cumple su objetivo real aunque pase todas las verificaciones técnicas.
