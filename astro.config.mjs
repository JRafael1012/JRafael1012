// @ts-check
import { defineConfig } from 'astro/config';

// El repositorio de GitHub Pages es `JRafael1012/JRafael1012` (no el repo
// especial `<usuario>.github.io`), por lo que el sitio se publica bajo
// `/JRafael1012`. Si en el futuro hay dominio propio, se define SITE y
// se deja BASE vacío.
const SITE = process.env.SITE ?? 'https://jrafael1012.github.io';
const BASE = process.env.BASE ?? '/JRafael1012';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
});
