export interface Experiencia {
  puesto: string;
  empresa: string;
  periodo: string;
  resumen: string;
  logros: string[];
  stack: string[];
}

export interface Proyecto {
  titulo: string;
  resumen: string;
  stack: string[];
  enlace?: { label: string; url: string };
}

export interface Tecnologia {
  nombre: string;
  /** Slug de Simple Icons. Opcional: si falta, el nombre se muestra sin logo. */
  slug?: string;
  /**
   * Nombre del icono en Devicon, para las tecnologías que Simple Icons no
   * tiene (Java, PowerShell, VS Code). Solo entra en juego si no hay `slug`.
   */
  di?: string;
  /**
   * Ruta a un SVG guardado en `public/img/logos/`, para lo que no existe en
   * ninguna fuente (Windows, Copilot, ChatGPT, AntiGravity, Canva). Es la
   * última opción.
   */
  icono?: string;
}

export interface Contacto {
  label: string;
  valor: string;
  href: string;
}

/**
 * CONTENIDO DEL SITIO — fuente única de verdad.
 *
 * Este archivo es la base editable del portafolio. La estructura, el diseño y
 * las secciones ya están listos; lo que cambia es solo el texto de aquí.
 *
 * ⚠ PENDIENTE ANTES DE PUBLICAR
 *   1. proyectos[].enlace.url → los repositorios reales.
 *   2. El PDF de la hoja de vida: colócalo en `public/cv.pdf`.
 *
 * YA RESUELTO: correo de contacto, URL de LinkedIn, fechas de SENA
 * (2025 — 2026), ingeniería (2027 — Actualidad) y robótica (2020 — Actualidad),
 * y nombre de la universidad (Universidad Central) y de la fundación de
 * robótica (Fundación Biosbot Robótica / Team Biosbot Colombia).
 */
export const perfil = {
  nombre: 'Jonatan Rafael Arlant Cortes',
  marca: 'Rafael.dev',
  rol: 'Estudiante de Ingeniería de Sistemas y Computación',
  subtitulo: 'Técnico en Desarrollo de Software',
  titular: 'Desarrollador de software enfocado en soluciones reales.',
  descripcion:
    'Hola, soy Rafael. Soy estudiante de Ingeniería de Sistemas y Computación y Técnico en Desarrollo de Software. Me apasiona aprender y construir cosas nuevas. Aprendo rápido, me adapto a nuevas tecnologías y utilizo la inteligencia artificial como herramienta para investigar, potenciar mis conocimientos y mejorar mi proceso de desarrollo. Me gusta enfrentar problemas reales y convertir ideas en soluciones funcionales.',
  ciudad: 'Bogotá, Colombia',
  areas: 'Frontend · Backend · SQL · Sistemas',
  coordenadas: ["04° 42' N", "74° 04' W"],
  fotoCaption: 'APRENDER HACIENDO',
  fotoAlt: 'Fotografía de Jonatan Rafael Arlant Cortes',
  badge: 'Software',
  cv: {
    label: 'Hoja de vida',
    // Coloca el PDF en `public/cv.pdf` o cambia esta ruta.
    href: 'cv.pdf',
  },
  meta: {
    title: 'Rafael.dev — Portafolio',
    description:
      'Portafolio de Rafael Arlant Cortes: desarrollo de software, sistemas y experiencia técnica en Bogotá, Colombia.',
    themeColor: '#03071e',
  },
};

export const nav = [
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Trayectoria', href: '#trayectoria' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contacto', href: '#contacto' },
];

/**
 * Formación y actividades. Solo información verificable: aquí no van
 * métricas inventadas ni empresas que nunca existieron.
 *
 * ⚠ PENDIENTE
 *   · Los logros describen el programa, ni resultados medidos.
 */
export const experiencia: Experiencia[] = [
  {
    puesto: 'Técnico en Desarrollo de Software',
    empresa: 'SENA',
    periodo: '2025 — 2026',
    resumen:
      'Formación técnica en desarrollo de software: programación, bases de datos, redes y construcción de aplicaciones web.',
    logros: [
      'Bases sólidas en algorítmica, estructuras de datos y modelado de datos.',
      'Práctica del ciclo completo: del requerimiento al despliegue de una aplicación.',
    ],
    stack: ['JavaScript', 'SQL', 'MySQL', 'HTML5', 'CSS3', 'Java'],
  },
  {
    puesto: 'Ingeniería de Sistemas y Computación',
    empresa: 'Universidad Central',
    periodo: '2027 — Actualidad',
    resumen:
      'Carrera de ingeniería en curso. Bases fuertes de matemáticas, algoritmos y arquitectura de sistemas.',
    logros: [
      'Cursando asignaturas de sistemas, bases de datos e ingeniería de software.',
      'Los proyectos de esta sección nacen de las asignaturas y del trabajo personal.',
    ],
    stack: ['Algoritmos', 'Estructuras de datos', 'Arquitectura de sistemas'],
  },
  {
    puesto: 'Robótica',
    empresa: 'Fundación Biosbot Robótica',
    periodo: '2020 — Actualidad',
    resumen:
      'Participé en los equipos de robótica Team Biosbot Colombia aplicando lo que estudio: sensado, control de motores y ajuste de parámetros hasta que el prototipo funciona. Hoy el rol es de coach: acompañar y guiar a otras personas en el aprendizaje.',
    logros: [
      'Trabajo en equipo con una meta común: que el prototipo funcione de forma estable.',
      'Aprendizaje directo de hardware, mentoría y trabajo en equipo.',
      'Como coach, transmito lo aprendido acompañando a quienes empiezan.',
    ],
    stack: ['Arduino', 'C++', 'Sensores', 'Electrónica'],
  },
];

/**
 * Tecnologías y herramientas — las que realmente usa.
 *
 * DOS FUENTES DE ICONOS (verificadas una a una el 2026-10-02):
 *   1. `slug` → Simple Icons, teñido del color de acento:
 *      https://cdn.simpleicons.org/<slug>/ffba08
 *   2. `di`   → Devicon, solo para lo que Simple Icons no tiene:
 *      https://cdn.jsdelivr.net/gh/devicons/devicon/icons/<di>/<di>-original.svg
 *      Hoy: Java, PowerShell y VS Code. Estos tres salen a color; los otros
 *      29 salen en ámbar.
 *   3. `icono` → un SVG guardado en `public/img/logos/`, para lo que no está
 *      en ninguna de las dos fuentes. Se lee con `withBase()`, sin esto
 *      devolvería 404 en GitHub Pages.
 *
 * Si no hay `slug`, ni `di`, ni `icono`, el nombre se muestra sin logo. Así la
 * cinta nunca muestra un icono roto.
 *
 * ⚠ IMPORTANTE
 *   Un logo es una afirmación: quien lo ve da por hecho que la manejas.
 *   Quita lo que no sepas antes de publicar.
 *
 * ICONOS GUARDADOS EN EL PROYECTO (public/img/logos/), 2026-10-02:
 *   · Windows → skillicons.dev (licencia del origen no verificada).
 *   · Copilot → Wikimedia Commons, dominio público. Se le añadió
 *     fill="#ffba08" porque venía en negro y no se veía sobre este fondo.
 *   · ChatGPT → Wikimedia Commons, dominio público. Sin modificar.
 *   · AntiGravity → thesvg.org, MIT. Conserva sus colores de marca.
 *   · Canva → thesvg.org, MIT. Conserva su degradado de marca.
 *   Cada archivo lleva su fuente y licencia anotadas dentro del propio SVG.
 *
 * ERRORES EVITADOS AL BUSCAR LOS SLUGS:
 *   · Node.js → 'nodejs' da 404; el correcto es 'nodedotjs'.
 *   · Bash → 'bash' da 404; el correcto es 'gnubash'.
 *   · CSS → 'css3' da 404; el correcto es 'css'.
 *   · En Devicon el archivo es '<nombre>-original.svg'. Ojo: los '-plain'
 *     NO son monocromos (JavaScript sale amarillo con cuadrado de fondo) y
 *     algunos salen en negro puro, invisible sobre este fondo oscuro.
 *   · ChatGPT: ni 'chatgpt' ni 'openai' existen en ninguna de las dos fuentes.
 *   · Canva sí está en el paquete npm de Simple Icons, pero NO en
 *     cdn.simpleicons.org (lo retiraron). Por eso va como icono local.
 *
 * QUITADAS POR DECISIÓN DEL USUARIO (2026-10-02): SQL, Word, Excel y
 * 'Programación por bloques'. En su lugar entra Scratch, que sí es la
 * herramienta concreta que usa en robótica. Python ya estaba en la lista.
 */
export const stack: Tecnologia[] = [
  // Lenguajes
  { nombre: 'HTML', slug: 'html5' },
  { nombre: 'CSS', slug: 'css' },
  { nombre: 'JavaScript', slug: 'javascript' },
  { nombre: 'TypeScript', slug: 'typescript' },
  { nombre: 'Python', slug: 'python' },
  { nombre: 'Java', di: 'java' },
  { nombre: 'C', slug: 'c' },
  { nombre: 'C++', slug: 'cplusplus' },
  { nombre: 'Dart', slug: 'dart' },
  { nombre: 'PHP', slug: 'php' },

  // Frameworks, motores y entornos
  { nombre: 'React', slug: 'react' },
  { nombre: 'Astro', slug: 'astro' },
  { nombre: 'Node.js', slug: 'nodedotjs' },
  { nombre: 'XAMPP', slug: 'xampp' },
  { nombre: 'MySQL', slug: 'mysql' },
  { nombre: 'SQLite', slug: 'sqlite' },
  { nombre: 'Arduino', slug: 'arduino' },
  { nombre: 'Android Studio', slug: 'androidstudio' },
  { nombre: 'Scratch', slug: 'scratch' },

  // Diseño
  { nombre: 'AutoCAD 2D y 3D', slug: 'autocad' },
  { nombre: 'Figma', slug: 'figma' },
  { nombre: 'Canva', icono: 'img/logos/canva.svg' },

  // Control de versiones
  { nombre: 'Git', slug: 'git' },
  { nombre: 'GitHub', slug: 'github' },

  // Terminal
  { nombre: 'Bash', slug: 'gnubash' },
  { nombre: 'PowerShell', di: 'powershell' },

  // Sistemas operativos
  { nombre: 'Linux', slug: 'linux' },
  { nombre: 'Kali Linux', slug: 'kalilinux' },
  { nombre: 'Windows', icono: 'img/logos/windows.svg' },

  // Herramientas
  { nombre: 'VS Code', di: 'vscode' },
  { nombre: 'Notion', slug: 'notion' },

  // Asistentes de IA
  { nombre: 'Claude Code', slug: 'claude' },
  { nombre: 'ChatGPT', icono: 'img/logos/chatgpt.svg' },
  { nombre: 'GitHub Copilot', slug: 'githubcopilot' },
  { nombre: 'Copilot (Windows)', icono: 'img/logos/copilot.svg' },
  { nombre: 'OpenCode', slug: 'opencode' },
  { nombre: 'AntiGravity', icono: 'img/logos/antigravity.svg' },
];

/** PENDIENTE: enlaza tus repositorios reales. */
export const proyectos: Proyecto[] = [
  {
    titulo: 'Sistema de inventario y ventas',
    resumen:
      'Aplicación web para controlar stock, registrar ventas y generar reportes. Diseñé el modelo de datos y la API que consume la interfaz.',
    stack: ['Node.js', 'Express', 'MySQL', 'JavaScript'],
    enlace: { label: 'Repositorio', url: 'https://github.com/JRafael1012' },
  },
  {
    titulo: 'API REST de gestión académica',
    resumen:
      'Servicio con autenticación por token, validación de datos y documentación de endpoints, consumido por una interfaz web separada.',
    stack: ['Java', 'Spring', 'MySQL', 'Postman'],
    enlace: { label: 'Repositorio', url: 'https://github.com/JRafael1012' },
  },
  {
    titulo: 'Robot de seguimiento de línea',
    resumen:
      'Proyecto de robótica en equipo: sensado, control de motores y ajuste de parámetros para que el robot siga la trayectoria de forma estable.',
    stack: ['C++', 'Arduino', 'Sensores'],
  },
  {
    titulo: 'Este portafolio',
    resumen:
      'Sitio estático de una sola página, en español, hecho con Astro, con carga rápida, SEO y despliegue automatizado desde GitHub.',
    stack: ['Astro', 'TypeScript', 'CSS', 'GitHub Actions'],
  },
];

/**
 * PENDIENTE: hay un segundo correo, jonatanarlantcortes14@gmail.com, que
 * puede añadirse como entrada aparte si se quiere publicarlo también.
 */
export const contacto: Contacto[] = [
  {
    label: 'Correo',
    valor: 'rafaelarlant1012@gmail.com',
    href: 'mailto:rafaelarlant1012@gmail.com',
  },
  {
    label: 'GitHub',
    valor: 'JRafael1012',
    href: 'https://github.com/JRafael1012',
  },
  {
    label: 'LinkedIn',
    valor: 'linkedin.com/in/rafael-arlant-cortes-b735412b3',
    href: 'https://www.linkedin.com/in/rafael-arlant-cortes-b735412b3/',
  },
];

export const años = String(new Date().getFullYear());
