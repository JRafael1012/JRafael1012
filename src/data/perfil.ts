export interface Experiencia {
  puesto: string;
  empresa: string;
  periodo: string;
  resumen: string;
  logros: string[];
  stack: string[];
  /**
   * Nombres de las fotos del collage de este bloque. Solo el nombre: la
   * carpeta es `public/img/`. Si falta, no se pinta collage, y el bloque se
   * mantiene como un item normal de la trayectoria.
   */
  galeria?: string[];
}

/**
 * Un proyecto de la sección "Proyectos".
 *
 * IMPORTANTE: todos los campos menos `titulo` son opcionales a propósito.
 * Un dato que no se tiene no se inventa: se deja el campo fuera y la tarjeta
 * dibuja solo lo que hay. Ver D21 en plans/plan_midegs_completo.md.
 */
export interface Proyecto {
  /** Único campo obligatorio: es el nombre del proyecto. */
  titulo: string;
  /** Aparece en "Proyectos destacados", antes de la lista completa. */
  destacado?: boolean;
  /** Qué es, en una o dos frases. */
  descripcion?: string;
  /** El problema concreto que resuelve. */
  problema?: string;
  /** Tecnologías usadas. */
  stack?: string[];
  /** Qué hace, en concreto. Lista corta. */
  funcionalidades?: string[];
  /** Qué hiciste tú dentro del equipo. Importante en trabajos de equipo. */
  participacion?: string;
  /** En qué punto está: "En desarrollo", "Terminado", "En pausa"... */
  estado?: string;
  /** Ruta dentro de `public/`, por ejemplo `img/proyectos/finovatech.webp`. */
  imagen?: string;
  /** URL real del repositorio. Nunca un enlace al perfil. */
  repositorio?: string;
  /** URL de la demo publicada. */
  demo?: string;
}

/** Una pregunta y su respuesta, tal como se muestran en "Sobre mí". */
export interface Pregunta {
  pregunta: string;
  respuesta: string;
  /** Etiquetas opcionales que se muestran debajo de la respuesta. */
  intereses?: string[];
}

/** La sección "Sobre mí" completa. */
export interface SobreMi {
  eyebrow: string;
  titulo: string;
  subtitulo: string;
  items: Pregunta[];
  valor: { label: string; texto: string };
}

/** Una competencia o torneo en el que participaste. */
export interface Competencia {
  /** Temporada o nombre del torneo, por ejemplo "Cargo Connect". */
  titulo: string;
  /** Fase o programa, por ejemplo "Torneo regional y nacional". */
  evento?: string;
  /** Temporada o fecha, por ejemplo "2021 — 2022". */
  periodo: string;
  /** Puesto obtenido, por ejemplo "Campeones regionales y nacionales". */
  resultado?: string;
  /** Ciudad y país donde se hizo, por ejemplo "Sydney, Australia". */
  lugar?: string;
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
  /** Nombre de la plataforma, en el formato del sitio: "GitHub", no "github". */
  label: string;
  /** Lo que se lee en la tarjeta. No siempre es el `href`: LinkedIn muestra
   *  el nombre de la persona, no la URL larga. */
  valor: string;
  /** Enlace completo, listo para usar en un `href`. */
  href: string;
  /** Segunda línea de la tarjeta: qué encuentra el usuario al pulsar. */
  descripcion?: string;
  /**
   * Icono de la tarjeta.
   *
   * `Mail`, `Github` y `Linkedin` vienen de `lucide-astro`. `Whatsapp` es
   * aparte: Lucide retiró los iconos de marca, así que ese glifo es el que ya
   * usa el Hero en `.hero-social__icon--whatsapp`, reutilizado tal cual para
   * que el WhatsApp se vea igual en las dos secciones.
   *
   * Si es `undefined`, la tarjeta sale sin icono.
   */
  icono?: 'Mail' | 'Github' | 'Linkedin' | 'Whatsapp';
  /** Marca la tarjeta como vía principal: recibe borde y acento reforzado. */
  destacado?: boolean;
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
  /** El nombre que va en el `<h1>` del hero: corto, como se presenta uno. */
  nombreCorto: 'Rafael Arlant',
  marca: 'Rafael.dev',
  rol: 'Estudiante de Ingeniería de Sistemas y Computación',
  subtitulo: 'Técnico en Desarrollo de Software',
  titular: 'Desarrollador de software enfocado en soluciones reales.',
  descripcion:
    'Hola, soy Rafael. Soy estudiante de Ingeniería de Sistemas y Computación y Técnico en Desarrollo de Software. Me apasiona aprender y construir cosas nuevas. Aprendo rápido, me adapto a nuevas tecnologías y utilizo la inteligencia artificial como herramienta para investigar, potenciar mis conocimientos y mejorar mi proceso de desarrollo. Me gusta enfrentar problemas reales y convertir ideas en soluciones funcionales.',
  ciudad: 'Bogotá, Colombia',
  areas: 'Frontend · Backend · SQL · Sistemas',
  coordenadas: ["04° 42' N", "04° 04' W"],
  fotoCaption: 'APRENDER HACIENDO',
  fotoAlt: 'Fotografía de Jonatan Rafael Arlant Cortes',
  badge: 'Software',
  /**
   * Tecnologías principales, en la línea de puntos bajo el titular del hero.
   * Es una lista corta y deliberada: lo primero que se lee, no el catálogo
   * entero. El catálogo completo con logos es `stack`.
   *
   * Ojo: aquí aparece SQL, que sí aparece en la formación del SENA
   * (`experiencia`) pero que el usuario quitó de la cinta de logos en D12.
   * Son dos listas distintas con distinta función: esta es una declaración de
   * CABECERA, la cinta es el inventario.
   */
  tecnologiasClave: [
    'HTML',
    'CSS',
    'JavaScript',
    'Python',
    'SQL',
    'PHP',
    'Java',
    'TypeScript',
  ],
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
  { label: 'Stack', href: '#stack' },
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Trayectoria', href: '#trayectoria' },
  { label: 'Destacados', href: '#destacados' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Contacto', href: '#contacto' },
];

/**
 * Sección "Sobre mí". Cinco preguntas que se pliegan y se despliegan: quien
 * entra ve las preguntas y abre solo la que le interesa.
 *
 * REGLA DE ESTA SECCIÓN: no se inventa. Cada respuesta se apoya en datos que
 * ya están en este mismo archivo —`perfil.descripcion`, `experiencia`,
 * `competencias` y `proyectos`—, así que si cambia uno de ellos hay que
 * actualizarla también.
 */
export const sobreMi: SobreMi = {
  eyebrow: 'SOBRE MÍ',
  titulo: 'Quién soy',
  subtitulo: 'Seis preguntas, seis respuestas. Abre las que te interesen.',
  /**
   * ORDEN DE LAS PREGUNTAS: no es el que se le ocurrió primero, es un arco.
   * Identidad → lo que resuelvo (la capacidad, antes que el papel) → la base
   * técnica → lo que me atrae → qué quiero construir → qué busco. Quien solo
   * lea los títulos ya se queda con el resumen.
   */
  items: [
    {
      pregunta: '¿Quién soy?',
      /** El párrafo largo: aquí es donde de verdad se lee. */
      respuesta: perfil.descripcion,
    },
    {
      pregunta: '¿Qué problemas me gusta resolver?',
      respuesta:
        'Los que existen de verdad: inventarios y ventas, gestión académica y robots que deben seguir una línea de forma estable. Me gusta convertir ideas en soluciones funcionales.',
    },
    {
      pregunta: '¿Qué estudio?',
      respuesta:
        'Técnico en Desarrollo de Software en el SENA y carrera de Ingeniería de Sistemas y Computación en la Universidad Central, con foco en bases de datos, algoritmos y arquitectura de sistemas.',
    },
    {
      pregunta: '¿Qué me interesa?',
      respuesta:
        'Que la tecnología sirva para algo: software que una empresa necesita de verdad y proyectos que mejoran la vida de alguien concreto. La programación y la robótica son el oficio; esto es para qué lo uso.',
      /** Etiquetas de la respuesta anterior: nombran, no repiten. */
      intereses: [
        'Programación',
        'Robótica',
        'Automatización',
        'Inteligencia artificial',
        'Software empresarial',
        'Emprendimiento',
        'Impacto social',
        'Aprendizaje continuo',
      ],
    },
    {
      pregunta: '¿Qué quiero construir?',
      respuesta:
        'Empresas de software que resuelvan un problema concreto y le sirvan a más de una persona. Empiezo por lo que veo cerca: inventarios, gestión académica y formación.',
    },
    {
      pregunta: '¿Qué estoy buscando?',
      respuesta:
        'Un lugar donde aprender de quien ya lo hace, ya sea en un trabajo o en un proyecto propio, y la posibilidad de convertir eso en algo propio.',
    },
  ],
  /** La propuesta de valor: lo que aporto frente a un listado de tecnologías. */
  valor: {
    label: 'Mi propuesta de valor',
    texto:
      'Aprendo rápidamente nuevas tecnologías y utilizo herramientas de inteligencia artificial para investigar, prototipar y acelerar el desarrollo de soluciones.',
  },
};

/**
 * Formación y actividades. Solo información verificable: aquí no van
 * métricas inventadas ni empresas que nunca existieron.
 *
 * ⚠ PENDIENTE
 *   · Los logros describen el programa, ni resultados medidos.
 *   · Faltan las competencias y los torneos: están en `competencias`, más
 *     abajo. Con la lista vacía la sección sale con un aviso en vez de datos
 *     inventados.
 */
export const experiencia: Experiencia[] = [  {
    puesto: 'Técnico en Desarrollo de Software',
    empresa: 'SENA',
    periodo: '2025 — 2026',
    resumen:
      'Formación técnica en desarrollo de software: programación, bases de datos, redes y construcción de aplicaciones web.',
    logros: [
      'Bases sólidas en algorítmica, estructuras de datos y modelado de datos.',
      'Práctica del ciclo completo: del requerimiento al despliegue de una aplicación.',
    ],
    stack: ['JavaScript', 'Python', 'SQL', 'MySQL', 'HTML5', 'CSS3', 'Java'],
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
    stack: [
      'Arduino',
      'C++',
      'Scratch',
      'Python',
      'Sensores',
      'Electrónica',
      'Diseño 3D',
      'Diseño 2D',
    ],
    galeria: [
      'robotica-1.jpg',
      'robotica-2.jpg',
      'robotica-3.jpg',
      'robotica-4.jpg',
      'robotica-5.jpg',
      'robotica-6.jpg',
    ],
  },
];

/**
 * Competencias y torneos, nacionales e internacionales.
 *
 * De más reciente a más antiguo. Lo que falta va anotado en cada entrada:
 *
 * Todos los regionales y nacionales fueron en Bogotá, salvo *Submerged*, que
 * fue en Cartagena. Cada torneo tiene puesto y ciudad.
 */
export const competencias: Competencia[] = [
  {
    titulo: 'WRO Future Innovator Senior',
    periodo: '2026',
    resultado: '1.er lugar',
  },
  {
    titulo: 'Open International FIRST LEGO League',
    evento: 'Torneo internacional',
    periodo: 'Mayo 2026',
    resultado: '15.º lugar',
    lugar: 'Guadalajara, México',
  },
  {
    titulo: 'Unearthed',
    evento: 'Torneo regional y nacional',
    periodo: '2025 — 2026',
    resultado: 'Segundo lugar',
    lugar: 'Bogotá, Colombia',
  },
  {
    titulo: 'Submerged',
    evento: 'Torneo regional y nacional',
    periodo: '2024 — 2025',
    resultado: 'Cuarto lugar',
    lugar: 'Cartagena, Colombia',
  },
  {
    titulo: 'Masterpiece',
    evento: 'Torneo regional y nacional',
    periodo: '2023 — 2024',
    resultado: 'Tercer lugar',
    lugar: 'Bogotá, Colombia',
  },
  {
    titulo: 'SuperPowered',
    evento: 'Torneo regional y nacional',
    periodo: '2022 — 2023',
    resultado: 'Segundo lugar',
    lugar: 'Bogotá, Colombia',
  },
  {
    titulo: 'Cargo Connect',
    evento: 'Torneo regional y nacional',
    periodo: '2021 — 2022',
    resultado: 'Campeones (1.er lugar)',
    lugar: 'Bogotá, Colombia',
  },
  {
    titulo: 'Asia Pacific Open Championship',
    periodo: '2024',
    resultado: '15.º lugar',
    lugar: 'Sydney, Australia',
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
 *   · ChatGPT → Wikimedia Commons (ChatGPT-Logo.svg), dominio público. Se le
 *     añadió fill="#ffba08": el primer archivo que se probó era el icono de
 *     la app, un cuadrado verde azulado que desentonaba con la cinta.
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

/**
 * PROYECTOS — PENDIENTE de datos.
 *
 * Solo hay dos proyectos confirmados por el usuario: el título. Todo lo demás
 * está vacío a propósito (ver D21 en plans/plan_midegs_completo.md): la
 * tarjeta dibuja solo los campos que existen, así que **no se inventa nada**.
 * Los 4 proyectos de relleno que había antes se borraron porque eran
 * inventados y sus enlaces apuntaban al perfil de GitHub, no a repositorios.
 *
 * PARA TERMINAR CADA TARJETA, rellena lo que falte en este array:
 *   descripcion    qué es, en una o dos frases
 *   problema       el problema concreto que resuelve
 *   stack          ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL']
 *   funcionalidades ['Registro de usuarios', 'Ingresos', ...]
 *   participacion  qué hiciste tú dentro del equipo
 *   estado         'En desarrollo' | 'Terminado' | 'En pausa' | ...
 *   imagen         'img/proyectos/finovatech.webp'  (déjalo en public/)
 *   repositorio    'https://github.com/JRafael1012/...'  URL REAL del repo
 *   demo           'https://...'                        URL REAL publicada
 *
 * `destacado: true` lo sube a la sección "Proyectos destacados". El usuario
 * pidió los 3 mejores; de momento solo hay 2 confirmados, y el tercero sigue
 * vacante en vez de rellenarse con lo que haya.
 */
export const proyectos: Proyecto[] = [
  {
    titulo: 'Sistema Integral de Gestión Vehicular',
    destacado: true,
  },
  {
    titulo: 'FinovaTech',
    destacado: true,
    // El proyecto final del SENA, según D13.
  },
  {
    titulo: 'RAF VESTIGIA',
    destacado: true,
    // PENDIENTE: confirmar el título. Viene de la lista de candidatos que
    // escribió el usuario en el documento de contenido, no de los datos del
    // sitio. En `experiencia` la robótica aparece como "Robótica" en
    // Fundación Biosbot Robótica (Team Biosbot Colombia), con 6 fotos en
    // `robotica-N.jpg`. Si el nombre correcto es otro, cámbialo aquí.
  },
];

/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  DATOS CONFIGURABLES — CONTACTO
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  Este bloque es el ÚNICO sitio donde se tocan las coordenadas de contacto.
 *  Todo lo demás (las tarjetas, el CTA, el `mailto:`) se construye a partir de
 *  aquí, así que no hay URLs repetidas por el código.
 *
 *  · ¿Cambiaste tu número de WhatsApp?  → `whatsappNumber`, línea de abajo.
 *  · ¿Cambiaste tu LinkedIn?             → `linkedinUrl`, línea de abajo.
 *  · ¿Cambiaste tu correo?               → `email`, línea de abajo.
 *
 *  ── WhatsApp ──────────────────────────────────────────────────────────────
 *  `whatsappNumber` es SOLO el número, en formato internacional y SIN `+`,
 *  sin espacios, guiones ni paréntesis. Ejemplo: `573238176273`.
 *
 *  El número no se inventa: es el que ya usaba el Hero en sus redes. Si ya no
 *  es el tuyo, cámbialo aquí y se actualiza la tarjeta de Contacto. La tarjeta
 *  del Hero tiene su propia copia hardcodeada en `Hero.astro`, que no se toca
 *  aquí porque esa sección queda fuera de este trabajo.
 */
export const datosContacto = {
  email: 'rafaelarlant1012@gmail.com',
  githubUrl: 'https://github.com/JRafael1012',
  githubUsername: '@JRafael1012',
  linkedinUrl: 'https://www.linkedin.com/in/rafael-arlant-cortes-b735412b3/',
  whatsappNumber: '573238176273',
  /** Texto que WhatsApp abre ya escrito. Se codifica solo, no a mano. */
  whatsappMessage:
    'Hola Rafael, vi tu portafolio y me gustaría hablar contigo sobre un proyecto.',
} as const;

/** `true` si hay número de WhatsApp con el que construir el enlace. */
export const whatsappConfigurado = datosContacto.whatsappNumber.length > 0;

/**
 * Enlace de WhatsApp con el mensaje ya codificado, o `null` si falta el número.
 * Se construye con `encodeURIComponent` porque el mensaje lleva acentos y signos
 * de interrogación, que romperían la URL si se escribieran a mano.
 */
export const whatsappUrl = whatsappConfigurado
  ? `https://wa.me/${datosContacto.whatsappNumber}?text=${encodeURIComponent(
      datosContacto.whatsappMessage,
    )}`
  : null;

/** Enlace `mailto:` del correo, listo para el CTA. */
export const correoUrl = `mailto:${datosContacto.email}`;

/**
 * El número tal como se lee en la tarjeta, que es distinto de como se usa en
 * la URL: aquí sí lleva `+` y espacios, porque es para ojos humanos. Un número
 * colombiano (57 + 10 dígitos) sale como `+57 323 817 6273`; cualquier otro
 * formato cae en `+573...` sin inventar agrupamientos.
 */
export const whatsappDisplay = (() => {
  const n = datosContacto.whatsappNumber;
  if (!n) return 'Sin número configurado';
  if (/^57\d{10}$/.test(n)) {
    return `+57 ${n.slice(2, 5)} ${n.slice(5, 8)} ${n.slice(8)}`;
  }
  return `+${n}`;
})();

/**
 * PENDIENTE: hay un segundo correo, jonatanarlantcortes14@gmail.com, que
 * puede añadirse como entrada aparte si se quiere publicarlo también.
 */
export const contacto: Contacto[] = [
  {
    label: 'Correo',
    valor: datosContacto.email,
    href: correoUrl,
    descripcion: 'La forma más rápida de contactarme.',
    icono: 'Mail',
    destacado: true,
  },
  {
    label: 'GitHub',
    valor: datosContacto.githubUsername,
    href: datosContacto.githubUrl,
    descripcion: 'Mis proyectos y código.',
    icono: 'Github',
  },
  {
    label: 'LinkedIn',
    valor: 'Rafael Arlant',
    href: datosContacto.linkedinUrl,
    descripcion: 'Perfil profesional.',
    icono: 'Linkedin',
  },
  {
    label: 'WhatsApp',
    valor: whatsappDisplay,
    href: whatsappUrl ?? '#contacto',
    descripcion: 'Hablemos directamente.',
    icono: 'Whatsapp',
  },
];

export const años = String(new Date().getFullYear());
