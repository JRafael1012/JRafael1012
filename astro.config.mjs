// @ts-check
import { defineConfig } from 'astro/config';

// El repositorio `JRafael1012/PorfolioJR` se publica bajo `/PorfolioJR`.
// Si se configura un dominio propio, se puede definir SITE y dejar BASE vacío.
const SITE = process.env.SITE ?? 'https://jrafael1012.github.io/PorfolioJR/';
const BASE = process.env.BASE ?? '/PorfolioJR';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
});
