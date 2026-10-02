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
 * ⚠ CAMPOS QUE DEBES REVISAR ANTES DE PUBLICAR
 *   1. contacto[].valor / href  → tu correo real y tu URL de LinkedIn.
 *   2. experiencia[].empresa    → los nombres reales de empresa.
 *   3. proyectos[].enlace.url   → los repositorios reales.
 *   4. El PDF de la hoja de vida: colócalo en `public/cv.pdf`.
 */
export const perfil = {
  nombre: 'Jonatan Rafael Arlant Cortes',
  marca: 'Rafael.dev',
  rol: 'Estudiante de Ingeniería de Sistemas y Computación',
  subtitulo: 'Técnico en Desarrollo de Software',
  titular: 'Software que resuelve.',
  descripcion:
    'Me interesa convertir problemas reales en soluciones digitales: entender la necesidad, estructurar la idea y llevarla a código. La robótica es una experiencia complementaria donde también practico en equipo.',
  ciudad: 'Bogotá, Colombia',
  areas: 'Frontend · Backend · Sistemas',
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
 *   · 'Institución'  → el nombre de tu universidad (el técnico sí es SENA).
 *   · Las fechas están como 'AÑO — AÑO' a propósito, para que no se
 *     publiques un dato sin confirmar.
 *   · Los logros describen el programa, ni resultados medidos.
 */
export const experiencia: Experiencia[] = [
  {
    puesto: 'Técnico en Desarrollo de Software',
    empresa: 'SENA',
    periodo: 'AÑO — AÑO',
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
    empresa: 'Institución',
    periodo: 'AÑO — Actualidad',
    resumen:
      'Carrera de ingeniería en curso. Bases fuertes de matemáticas, algoritmos y arquitectura de sistemas.',
    logros: [
      'Cursando asignaturas de sistemas, bases de datos e ingeniería de software.',
      'Los proyectos de esta sección nacen de las asignaturas y del trabajo personal.',
    ],
    stack: ['Algoritmos', 'Estructuras de datos', 'Arquitectura de sistemas'],
  },
  {
    puesto: 'Equipo de robótica',
    empresa: 'Institución / comunidad',
    periodo: 'AÑO — Actualidad',
    resumen:
      'Experiencia en equipo aplicando lo que estudio: sensado, control de motores y ajuste de parámetros hasta que el prototipo funciona.',
    logros: [
      'Trabajo en equipo con una meta común: que el prototipo funcione de forma estable.',
      'Aprendizaje directo de hardware, mentoría y trabajo en equipo.',
    ],
    stack: ['Arduino', 'C++', 'Sensores', 'Electrónica'],
  },
];

/**
 * Tecnologías y herramientas — las que realmente usa.
 *
 * Cada `slug` es el identificador en Simple Icons, de donde se descarga el
 * logo: https://cdn.simpleicons.org/<slug>/ffba08
 *
 * Si un `slug` falta, el nombre se muestra sin logo. Así la cinta nunca
 * muestra un icono roto.
 *
 * ⚠ IMPORTANTE
 *   Un logo es una afirmación: quien lo ve da por hecho que la manejas.
 *   Quita lo que no sepas antes de publicar.
 *
 * SLUGS QUE NO EXISTEN (dan 404), por si los necesitas después:
 *   visualstudiocode / vscode   → VS Code no tiene logo en Simple Icons
 *   microsoftword / microsoftexcel → Word y Excel tampoco
 *   antigravity / makecode      → tampoco hay logo
 *   css3 → usa 'css'
 *   sql   → no existe
 *
 * NOTA SOBRE 'PROGRAMACIÓN POR BLOQUES'
 *   Va sin logo a propósito. Si lo que usas es Scratch específicamente,
 *   ponle el slug 'scratch' (verificado) y cámbiale el nombre.
 */
export const stack: Tecnologia[] = [
  // Lenguajes
  { nombre: 'HTML', slug: 'html5' },
  { nombre: 'CSS', slug: 'css' },
  { nombre: 'JavaScript', slug: 'javascript' },
  { nombre: 'SQL' },
  { nombre: 'Python', slug: 'python' },
  { nombre: 'C++', slug: 'cplusplus' },
  { nombre: 'Dart', slug: 'dart' },

  // Frameworks, motores y entornos
  { nombre: 'React', slug: 'react' },
  { nombre: 'Astro', slug: 'astro' },
  { nombre: 'XAMPP', slug: 'xampp' },
  { nombre: 'MySQL', slug: 'mysql' },
  { nombre: 'SQLite', slug: 'sqlite' },
  { nombre: 'Arduino', slug: 'arduino' },
  { nombre: 'Programación por bloques' },

  // Diseño
  { nombre: 'AutoCAD 2D y 3D', slug: 'autocad' },

  // Control de versiones
  { nombre: 'Git', slug: 'git' },
  { nombre: 'GitHub', slug: 'github' },

  // Herramientas
  { nombre: 'VS Code' },
  { nombre: 'Notion', slug: 'notion' },
  { nombre: 'Word' },
  { nombre: 'Excel' },

  // Asistentes de IA
  { nombre: 'Claude Code', slug: 'claude' },
  { nombre: 'GitHub Copilot', slug: 'githubcopilot' },
  { nombre: 'OpenCode' },
  { nombre: 'AntiGravity' },
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
      'Proyecto de robótica en equipo: sensado, control de motores y ajuste de parámetros para que el robot siga el trayectoria de forma estable.',
    stack: ['C++', 'Arduino', 'Sensores'],
  },
  {
    titulo: 'Este portafolio',
    resumen:
      'Sitio estático bilingüe hecho con Astro, con carga rápida, SEO por página y despliegue automatizado desde GitHub.',
    stack: ['Astro', 'TypeScript', 'CSS', 'GitHub Actions'],
  },
];

/** PENDIENTE: reemplaza el correo y la URL de LinkedIn por los reales. */
export const contacto: Contacto[] = [
  {
    label: 'Correo',
    valor: 'correo@ejemplo.com',
    href: 'mailto:correo@ejemplo.com',
  },
  {
    label: 'GitHub',
    valor: 'JRafael1012',
    href: 'https://github.com/JRafael1012',
  },
  {
    label: 'LinkedIn',
    valor: 'linkedin.com/in/tu-usuario',
    href: 'https://www.linkedin.com/in/',
  },
];

export const años = String(new Date().getFullYear());
