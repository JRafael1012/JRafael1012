# MIDEGS — Plan único (Perfil Ligero)
**Proyecto:** portafolio (Astro 7.3.5, ESM)

## 1. Dirección estratégica y viabilidad
**Objetivo:** Confirmar alcance y viabilidad.

**Decisiones:**
- D1: Perfil Ligero (confirmado).
- D2: Proyecto existente Astro estático (sin backend/BD/autenticación).
- D3: Usar plan único para todas las fases (por sencillez).

**Alcance:** Páginas, componentes, estilos y contenido en `src/` y `public/`. No incluye backend, APIs, BD o auth.

**Criterios de aceptación:** Estructura verificada y plan aprobado.
**Riesgos:** Muy bajos.

## 2. Descubrimiento y requisitos
**Objetivo:** Identificar estado actual y necesidades mínimas.

**Decisiones:**
- D1: Usar documentación existente (`README.md`, `AGENTS.md`, `astro.config.mjs`).
- D2: No crear colecciones/content collections innecesarias.

**Requisitos (mínimos):**
- R1: Mantener stack actual (Astro).
- R2: No romper build/preview existentes.

**Criterios de aceptación:** Estado documentado.
**Riesgos:** Bajos.

## 3. Arquitectura y diseño
**Objetivo:** Definir arquitectura suficiente.

**Decisiones:**
- D1: Arquitectura estándar Astro (islas, páginas `.astro`, componentes).
- D2: No refactorizar innecesariamente.

**Alcance:** Mantener estructura actual `src/`. Referencia: `README.md`.
**Criterios de aceptación:** No hay cambios de arquitectura no justificados.
**Riesgos:** Bajos.

## 4. Planificación y preparación
**Objetivo:** Preparar entorno.

**Decisiones:**
- D1: Node 22.17 disponible (>=22.12).
- D2: Usar scripts npm existentes (`dev`, `build`, `preview`).
- D3: Servidor dev en background según `AGENTS.md` (`astro dev --background`).

**Tareas:** Verificar dependencias, preparar desarrollo.
**Criterios de aceptación:** Entorno listo para desarrollo.
**Riesgos:** Bajos.

## 5. Desarrollo e integración
**Objetivo:** Implementar cambios mínimos solicitados.

**Principio:** Cambio mínimo. No refactorizar no solicitado.
**Trazabilidad:** Necesidad → Requisito → Código → Verificación.
**Criterios de aceptación:** Cambios cumplen lo solicitado y conservan código existente.
**Riesgos:** Bajos.

## 6. Verificación y validación
**Objetivo:** Verificar calidad mínima.

**Verificaciones:**
- Build: `npm run build` (tipo check + build Astro).
- Preview/Dev: funcionamiento básico.
- Revisar cambios (diff).

**Criterios de aceptación:** Build OK y cambios verificados.
**Riesgos:** Bajos.

## 7. Liberación y despliegue
**Objetivo:** Preparar artefactos estáticos.

**Decisiones:**
- D1: Sitio estático (`dist/` tras build). Despliegue no definido aquí (se aplica solo si solicitado).
- D2: No automatizar despliegue innecesario.

**Criterios de aceptación:** `dist/` generado correctamente si build OK.
**Riesgos:** Bajos.

## 8. Operación y mantenimiento
**Objetivo:** Mantener simple.

**Decisiones:** No requiere operación continua (estático).
**Criterios de aceptación:** Código mantenible, sin deuda innecesaria.
**Riesgos:** Bajos.

## 9. Evaluación y mejora
**Objetivo:** Detectar mejoras solo si solicitadas.

**Regla:** No proponer mejoras no solicitadas. Solo registrar si surgen.
**Criterios de aceptación:** Evaluación ligera realizada.
**Riesgos:** Bajos.

## 10. Retiro o reemplazo
**Objetivo:** Cierre del trabajo.

**Decisiones:** No aplica actualmente.
**Criterios de aceptación:** Trabajo completado y verificado. Evidencia registrada.
**Riesgos:** Bajos.
