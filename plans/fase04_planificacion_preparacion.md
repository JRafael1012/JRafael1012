# Fase 04 — Planificación y preparación

## Objetivo

Preparar el entorno y dejar la ejecutar la
[Fase 05](fase05_desarrollo_integracion.md) sin bloqueos.

## Tareas

- **T1 — Git.** `git init`, rama `main`, `.gitignore` para Node/Astro.
- **T2 — Remoto.** Enlazar con `origin` → `https://github.com/JRafael1012/JRafael1012.git`.
- **T3 — Dependencias.** `npm init` + `astro` como dependencia de desarrollo.
- **T4 — Configuración.** `astro.config.mjs` con `site`, `base`, `output: 'static'`.
- **T5 — Estructura.** Crear carpetas de `src/` y datos tipados vacíos.
- **T6 — Verificación de base.** `npm run build` debe terminar con exit code 0
  sobre la estructura mínima antes de añadir contenido.
- **T7 — CI/CD.** Workflow de GitHub Actions que hace `build` y publica en
  `gh-pages` con `actions/deploy-pages`.

## Comandos previstos

```text
npm install
npm run build
npm run preview
```

## Criterios de aceptación

- `git status` limpio, rama `main`, remoto `origin` correcto.
- `npm run build` finaliza sin errores ni advertencias bloqueantes.
- `dist/` contiene `index.html` generado.

## Riesgos

- **R1 — Autenticación de GitHub.** El push requiere credenciales. Si `gh` no
  está autenticado, la preparación se detiene en T2 y se pide intervención
  manual.
- **R2 — OneDrive.** La carpeta está bajo OneDrive, que puede bloquear
  operaciones de Git o crear archivos `desktop.ini` espurios. Si aparece
  interferencia, considerar mover el proyecto fuera de la sincronización.
