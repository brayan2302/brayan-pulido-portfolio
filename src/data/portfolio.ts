export const CONTACT_INFO = {
  name: "Brayan Pulido",
  email: "brayanelcrack2302@gmail.com",
  whatsappNumber: "584124032728",
  whatsappUrl:
    "https://wa.me/584124032728?text=Hola%20Brayan%2C%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto.",
  linkedinUrl: "https://www.linkedin.com/in/brayanpulido",
  githubUrl: "https://github.com/brayanpulido",
  location: "La Victoria, Aragua, Venezuela",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31411.713387573564!2d-67.32362864999999!3d10.2240968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2a9e634574d085%3A0x8e12163158540335!2sLa%20Victoria%202121%2C%20Aragua!5e0!3m2!1ses!2sve!4v1795022492141!5m2!1ses!2sve",
  freelancePlatforms: [
    {
      name: "Workana",
      url: "https://www.workana.com/e/1caf0e229a2e54c333c187de6a47d431",
    },
    {
      name: "Upwork",
      url: "https://www.upwork.com/",
    },
    {
      name: "Fiverr",
      url: "https://es.fiverr.com/s/ZozQ7Rp",
    },
    {
      name: "Freelancer",
      url: "https://www.freelancer.es/u/brayanelcrack23",
    },
  ],
};

export const CLIENTS_SOCIAL_PROOF = [
  {
    name: "WideStep",
    url: "https://widestepshoe.com/",
    logo: "https://ik.imagekit.io/ns9uknww8b/Logo%20Wide%20Step.jpg",
  },
  {
    name: "Kimmon",
    url: "https://kimoon.io/",
    logo: "https://ik.imagekit.io/ns9uknww8b/kimoon%20logo.jpg",
  },
  {
    name: "Creandovisual",
    url: "https://www.instagram.com/creandovisual/?hl=es-la",
    logo: "https://ik.imagekit.io/ns9uknww8b/Logo%20Creando%20Visual.jpg",
  },
  {
    name: "Winner World",
    url: "https://www.instagram.com/winnerworldoficial/?hl=es-la",
    logo: "https://ik.imagekit.io/ns9uknww8b/Logo%20Winner%20World.jpg",
  },
];

export const HERO_METRICS = [
  { label: "+6 Años de experiencia", highlight: "+6 Años" },
  { label: "100% Remoto", highlight: "100%" },
  { label: "Venezuela / Global", highlight: "Global" },
];

export const SERVICES = [
  {
    id: "ai-automation",
    title: "Automatización con IA",
    description:
      "Conecto tus herramientas, CRMs y canales de WhatsApp con flujos inteligentes en n8n y LLMs para eliminar tareas manuales 24/7.",
    tags: ["n8n", "OpenAI", "Mistral", "Webhooks", "APIs"],
    metric: "-80% tiempo operativo",
  },
  {
    id: "web-dev",
    title: "Desarrollo Web & Landing Pages",
    description:
      "Diseño y programo landing pages ultrarrápidas y MVPs SaaS con Next.js, Tailwind y Framer Motion pensados para convertir tráfico en clientes.",
    tags: ["Next.js", "React", "Figma", "Supabase", "Tailwind"],
    metric: "+98 Lighthouse Score",
  },
  {
    id: "video-email",
    title: "Edición Vertical & Email Mkt",
    description:
      "Producción de Reels/TikToks con retención agresiva y secuencias automatizadas en Klaviyo que nutren y cierran leads en piloto automático.",
    tags: ["CapCut", "DaVinci Resolve", "Klaviyo", "Reels / TikTok"],
    metric: "Alta retención & CTR",
  },
];

export interface BentoProject {
  id: string;
  title: string;
  category: string;
  format: string;
  subtitle: string;
  description: string;
  stack: string[];
  results: string[];
  size: "featured" | "medium" | "small";
  accent: string;
}

export const BENTO_PROJECTS: BentoProject[] = [
  {
    id: "widestep",
    title: "Caso WideStep / Elevate Group",
    category: "Admin Tool + Pipeline n8n",
    format: "Fullstack + n8n AI",
    subtitle:
      "Plataforma administrativa interna para generación de listicles pre-landing con IA y orquestación n8n.",
    description:
      "Aplicación web administrativa interna desarrollada en Next.js para Elevate Group / WideStep. Orquesta la carga de investigaciones de mercado en JSON, dispara webhooks al motor n8n con IA para redactar y compilar listicles HTML estáticos, y gestiona el callback con doble blindaje UTF-8 hacia Supabase Storage, con proxy seguro /api/preview y monitoreo en tiempo real.",
    stack: [
      "Next.js",
      "n8n",
      "Supabase",
      "OpenAI / LLMs",
      "PrismJS",
      "Tailwind CSS",
    ],
    results: [
      "Orquestación completa con n8n, webhooks y Supabase en tiempo real",
      "Doble blindaje UTF-8 (Buffer binario) que garantiza integridad de caracteres (★, ✓, ’, —)",
      "Proxy seguro /api/preview para previsualizar iframes sin CORS y descarga directa",
      "Dashboard en tiempo real con polling cada 8s y eliminación en cascada",
    ],
    size: "featured",
    accent: "from-purple-600/30 via-violet-600/10 to-transparent",
  },
  {
    id: "kimmon",
    title: "Caso Kimmon",
    category: "UI/UX + B2B LinkedIn",
    format: "Producto & Growth",
    subtitle: "Rediseño de interfaz B2B y sistema de prospección automatizada en LinkedIn.",
    description:
      "Optimicé la experiencia de usuario de su plataforma y construí activos visuales de alta conversión orientados a tomadores de decisión B2B en LinkedIn, alineando diseño de producto con captación.",
    stack: ["Figma", "Next.js", "Framer Motion", "LinkedIn B2B"],
    results: [
      "Mejora en claridad de propuesta de valor y flujo de registro",
      "Sistema visual consistente para campañas B2B",
    ],
    size: "medium",
    accent: "from-fuchsia-600/20 via-purple-900/10 to-transparent",
  },
  {
    id: "creandovisual",
    title: "Caso Creandovisual",
    category: "Landing Page + Assets IA",
    format: "Web High-Conversion",
    subtitle: "Landing page de alto impacto visual potenciada con assets generados con IA.",
    description:
      "Diseño UI/UX y desarrollo frontend enfocado en conversión directa, integrando visuales generados con IA, micro-interacciones fluidas y entrega optimizada con ImageKit CDN.",
    stack: ["Next.js", "Tailwind CSS", "ImageKit", "AI Assets"],
    results: [
      "Carga instantánea con CDN global de ImageKit y compresión WebP/AVIF",
      "Estructura orientada a agendamiento directo por WhatsApp",
    ],
    size: "medium",
    accent: "from-indigo-600/20 via-violet-900/10 to-transparent",
  },
  {
    id: "reels-tiktok",
    title: "Edición Vertical High-Retention",
    category: "Video Vertical",
    format: "Reels / TikTok",
    subtitle: "Hooks visuales, subtítulos dinámicos y ritmo optimizado para retención.",
    description:
      "Paquete de piezas verticales editadas en CapCut y DaVinci Resolve con diseño sonoro, B-roll estratégico y ganchos en los primeros 3 segundos.",
    stack: ["CapCut", "DaVinci Resolve", "Sound Design"],
    results: ["Mayor retención promedio en los primeros 3 segundos"],
    size: "small",
    accent: "from-purple-500/20 to-transparent",
  },
  {
    id: "n8n-flows",
    title: "Agentes IA & Flujos n8n",
    category: "Automatización",
    format: "Workflows B2B",
    subtitle: "Calificación de leads por WhatsApp, resumen de llamadas y sync con CRM.",
    description:
      "Workflows modulares en n8n conectados a OpenAI/Mistral para responder consultas, extraer datos estructurados y disparar secuencias de seguimiento.",
    stack: ["n8n", "Mistral", "OpenAI", "WhatsApp API"],
    results: ["Respuesta instantánea a leads en menos de 10 segundos"],
    size: "small",
    accent: "from-violet-500/20 to-transparent",
  },
  {
    id: "saas-landing",
    title: "Landing Page SaaS Dark UI",
    category: "Desarrollo Web",
    format: "Next.js + Motion",
    subtitle: "Arquitectura modular estilo React Bits con animaciones GPU-accelerated.",
    description:
      "Interfaces oscuras de alto contraste con glassmorphism, bento grids y formularios optimizados para capturar demanda B2B.",
    stack: ["Next.js", "TypeScript", "Framer Motion"],
    results: ["Experiencia fluida en móvil y escritorio (60fps)"],
    size: "small",
    accent: "from-blue-500/20 to-transparent",
  },
];

export interface TechStackItem {
  name: string;
  slug?: string;
  invertInDark?: boolean;
}

export const TECH_STACK_ITEMS: TechStackItem[] = [
  { name: "n8n", slug: "n8n" },
  { name: "Next.js", slug: "nextdotjs", invertInDark: true },
  { name: "React", slug: "react" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Supabase", slug: "supabase" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "Framer Motion", slug: "framer", invertInDark: true },
  { name: "Figma", slug: "figma" },
  { name: "Mistral", slug: "mistralai" },
  { name: "ImageKit", slug: "imagekit" },
  { name: "DaVinci Resolve", slug: "davinciresolve" },
  { name: "OpenAI API" },
  { name: "CapCut" },
  { name: "Klaviyo" },
];

export const TOOLS_STACK = [
  "n8n",
  "Next.js",
  "React",
  "Supabase",
  "Figma",
  "CapCut",
  "DaVinci Resolve",
  "OpenAI API",
  "Mistral",
  "Klaviyo",
  "Tailwind CSS",
  "ImageKit",
];

export const TESTIMONIALS = [
  {
    id: "t1",
    author: "Carlos M.",
    role: "Founder @ WideStep",
    countryCode: "us",
    flag: "🇺🇸",
    country: "USA",
    channel: "#widestep-mvp",
    time: "10:42 AM",
    avatarInitials: "CM",
    avatarGradient: "from-purple-500 to-indigo-600",
    quote:
      "Brayan resolvió en semanas lo que nos habría tomado meses con una agencia tradicional. Conectó nuestro panel en Supabase con flujos en n8n y la operación pasó a correr sola. Autonomía total y entregas impecables.",
  },
  {
    id: "t2",
    author: "Lucía R.",
    role: "Growth Manager @ Kimmon",
    countryCode: "es",
    flag: "🇪🇸",
    country: "España",
    channel: "#producto-b2b",
    time: "04:15 PM",
    avatarInitials: "LR",
    avatarGradient: "from-fuchsia-500 to-purple-600",
    quote:
      "Su perfil híbrido es oro puro: entiende tanto de UI/UX como de código y automatización. Nos ayudó a elevar la estética B2B para LinkedIn con una velocidad de ejecución impresionante.",
  },
  {
    id: "t3",
    author: "Andrés V.",
    role: "Director @ Creandovisual",
    countryCode: "co",
    flag: "🇨🇴",
    country: "Colombia",
    channel: "#lanzamientos",
    time: "06:30 PM",
    avatarInitials: "AV",
    avatarGradient: "from-violet-500 to-blue-600",
    quote:
      "Trabajar con Brayan de forma asíncrona es súper fluido. Siempre responde a tiempo, propone mejoras técnicas que no habíamos pensado y la landing quedó volando en rendimiento y diseño.",
  },
];

export const FAQS = [
  {
    question: "¿Cómo es tu proceso de trabajo?",
    answer:
      "Trabajo 100% asíncrono con comunicación clara (Slack, WhatsApp o Loom) y reuniones cortas solo cuando aportan valor real. Dividimos el proyecto en hitos semanales visibles para que veas avances reales desde los primeros días.",
  },
  {
    question: "¿Cómo garantizas la continuidad operativa en Venezuela?",
    answer:
      "Cuento con infraestructura redundante dedicada para trabajo remoto: doble conexión de internet de alta velocidad (fibra óptica + respaldo móvil/satelital) y sistema de respaldo eléctrico (inversor/baterías) que me permite operar sin interrupciones ni caídas.",
  },
  {
    question: "¿Trabajas por proyecto o por horas?",
    answer:
      "Principalmente por proyecto cerrado o retainer mensual para automatizaciones continuas, edición recurrente o evolución de producto. Así tienes claridad total del presupuesto y entregables desde el día uno.",
  },
  {
    question: "¿Cómo se realiza el pago?",
    answer:
      "Para proyectos cerrados trabajamos con 50% de adelanto al iniciar y 50% contra entrega final aprobada. Acepto métodos internacionales como Wise, Payoneer, Binance/USDT, Zinli o transferencia bancaria internacional.",
  },
];
