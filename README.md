# Portafolio

Portafolio web minimalista construido con [Astro](https://astro.build/). Presenta proyectos, habilidades y contacto con un enfoque profesional y optimizado para SEO.

## Tecnologías

- [Astro 7.3.5](https://astro.build/) – Generador de sitios estáticos
- TypeScript
- CSS moderno (sin frameworks)
- Vite

## Estructura

- `src/pages/`: páginas y rutas de Astro.
- `src/layouts/`: estructura compartida y metadatos (`Layout.astro`).
- `src/styles/`: estilos CSS (`portfolio.css`).
- `src/data/`: textos y datos de proyectos (`portfolio.ts`).
- `src/scripts/`: lógica que se ejecuta en el navegador (`site.ts`).
- `public/images/`: imágenes (`logo.png`, `logo.jpeg`).
- `public/`: favicons, `site.webmanifest` y assets estáticos.
- `plans/`: documentación MIDEGS.

## Personalización

Edita `src/data/portfolio.ts` para cambiar:

- Nombre, inicial, rol y descripción
- Correo electrónico (`email`)
- Servicios (`services`)
- Proyectos (`projects`)

## Comandos

```sh
npm run dev        # Inicia servidor de desarrollo
npm run dev -- --background  # Modo background (según AGENTS.md)
npm run build      # Genera build estático en dist/
npm run preview    # Previsualiza build generado
npx astro dev stop   # Detiene servidor en background
npx astro dev status # Estado del servidor
```

## Paleta de colores

```css
--ink-black: #03071eff;
--night-bordeaux: #370617ff;
--black-cherry: #6a040fff;
--oxblood: #9d0208ff;
--brick-ember: #d00000ff;
--red-ochre: #dc2f02ff;
--cayenne-red: #e85d04ff;
--deep-saffron: #f48c06ff;
--orange: #faa307ff;
--amber-flame: #ffba08ff;
```

## Deploy

Genera archivos estáticos con `npm run build`. El contenido de `dist/` está listo para desplegarse en cualquier hosting estático (Vercel, Netlify, Cloudflare Pages, GitHub Pages, etc.).

## Live

Repositorio: [https://github.com/JRafael1012/JRafael1012.git](https://github.com/JRafael1012/JRafael1012.git)
