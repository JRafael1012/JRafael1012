/**
 * `BASE` refleja el campo `base` de `astro.config.mjs` sin la barra final.
 * Con `base: '/'` queda vacío; con `base: '/JRafael1012'` queda '/JRafael1012'.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/**
 * Antepone el `base` a una ruta interna del sitio.
 *
 * En GitHub Pages el sitio no vive en la raíz del dominio sino en
 * `https://<usuario>.github.io/<repositorio>/`. Sin esto, un enlace a
 * `/img/foto.jpg` apunta a la raíz del dominio y devuelve 404.
 *
 * Solo para rutas absolutas internas. Las anclas (`#proyectos`) y las URLs
 * externas no deben pasar por aquí.
 */
export function withBase(path: string): string {
  if (!path.startsWith('/')) return path;
  return `${BASE}${path}`;
}
