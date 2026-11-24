import type { Lang } from "@/context/PreferencesContext";
import {
  HERO_METRICS,
  SERVICES,
  BENTO_PROJECTS,
  TESTIMONIALS,
  FAQS,
  type BentoProject,
} from "./portfolio";

export const UI_COPY = {
  es: {
    nav: [
      { label: "Trabajos", href: "/#trabajos" },
      { label: "Servicios", href: "/#servicios" },
      { label: "Sobre mí", href: "/sobre-mi" },
      { label: "FAQ", href: "/#faq" },
      { label: "Contacto", href: "/#contacto" },
    ],
    headerCta: "Contáctame ahora",
    themeLight: "Modo claro",
    themeDark: "Modo oscuro",
    hero: {
      pill: "Disponible para proyectos B2B",
      exClients: "Ex-clientes:",
      headlinePrefix: "Sistemas y webs que la gente",
      headlineAccent: "recuerda.",
      subtitleStart: "Soy",
      subtitleBody:
        "Automatizo procesos con IA (n8n), construyo landings de alta conversión (Next.js) y edito video vertical de alto impacto.",
      ctaPrimary: "Ver portafolio",
      ctaSecondary: "Hablemos",
      copy: "Copiar",
      copied: "Copiado",
    },
    bento: {
      badge: "01 / Proyectos & Casos",
      titleStart: "Proyectos &",
      titleAccent: "casos reales.",
      subtitle:
        "Haz clic en cualquier tarjeta para explorar la arquitectura, el stack técnico y los resultados obtenidos.",
      cta: "Cotizar un caso similar",
      featuredImpact: "Impacto destacado",
      modalResults: "Resultados clave",
      modalClose: "Cerrar",
      modalCta: "Quiero algo similar",
    },
    services: {
      badge: "02 / Especialidades",
      titleStart: "Un perfil híbrido para",
      titleAccent: "escalar sin fricción.",
      subtitle:
        "Combino automatización con IA, desarrollo web de alto rendimiento y contenido vertical para resolver producto y crecimiento en un solo lugar.",
    },
    about: {
      badge: "03 / Trayectoria",
      titleStart: "Menos fricción técnica,",
      titleAccent: "más velocidad de ejecución.",
      bioStart: "Soy",
      bioBody:
        "desarrollador fullstack y especialista en automatización con IA. Ayudo a startups, agencias y negocios digitales a conectar sus operaciones con n8n, lanzar productos rápidos en Next.js y producir contenido vertical que retiene atención.",
      stackTitle: "Stack & Herramientas",
      stackCount: "tecnologías",
      highlights: [
        {
          title: "+6 años 100% Remoto",
          desc: "Colaboración asíncrona fluida con equipos en USA, España, Colombia y Latinoamérica.",
        },
        {
          title: "Continuidad garantizada",
          desc: "Doble conexión de internet y respaldo eléctrico dedicado para operar sin interrupciones.",
        },
        {
          title: "Enfoque en ROI",
          desc: "Cada línea de código, automatización o reel está diseñada para ahorrar tiempo o generar ingresos.",
        },
      ],
    },
    testimonials: {
      badge: "04 / Testimonios",
      titleStart: "Lo que dicen",
      titleAccent: "los equipos.",
    },
    faq: {
      badge: "05 / Preguntas Frecuentes",
      titleStart: "Dudas comunes antes de",
      titleAccent: "empezar.",
    },
    contact: {
      badge: "06 / Contacto Directo",
      titleStart: "¿Listo para automatizar o",
      titleAccent: "lanzar tu web?",
      subtitle:
        "Cuéntame qué necesitas construir o automatizar y te respondo con un plan claro de tiempos, arquitectura y presupuesto.",
      formTitle: "Envíame un mensaje directo",
      nameLabel: "Tu nombre",
      namePlaceholder: "Ej. Carlos Mendoza",
      emailLabel: "Correo electrónico",
      emailPlaceholder: "tu@empresa.com",
      serviceLabel: "Servicio de interés",
      serviceOptions: [
        "Automatización con IA (n8n / Agentes)",
        "Desarrollo Web & Landing Page (Next.js)",
        "Edición Vertical & Email Marketing",
        "Proyecto integral / Otro",
      ],
      messageLabel: "Cuéntame sobre tu proyecto",
      messagePlaceholder:
        "¿Qué proceso quieres automatizar o qué web necesitas lanzar?",
      submitBtn: "Enviar mensaje",
      sendingBtn: "Enviando...",
      successTitle: "¡Mensaje enviado!",
      successBody:
        "Gracias por escribir. Te responderé en menos de 24 horas hábiles.",
      sendAnother: "Enviar otro mensaje",
      errorMsg: "Por favor completa todos los campos para enviar tu mensaje.",
      whatsappBtn: "Escribir por WhatsApp",
      emailCopied: "Email copiado",
      sendEmail: "Enviar correo",
      platformsTitle: "Encuéntrame también en:",
      locationTitle: "La Victoria, Aragua • Venezuela (Remoto Global)",
    },
    footer: {
      privacy: "Privacidad",
      terms: "Políticas de uso",
      cookies: "Cookies",
      rights: "© 2026 Brayan Pulido. Construido con Next.js & Tailwind CSS.",
    },
    cookieBanner: {
      textStart: "Usamos almacenamiento esencial y",
      textMid: "sin cookies invasivas para medir el rendimiento. Consulta nuestra",
      cookiesLink: "Política de Cookies",
      and: "y",
      privacyLink: "Privacidad",
      accept: "Aceptar",
      dismiss: "Cerrar",
    },
    chatbot: {
      title: "Asistente de Brayan",
      online: "En línea",
      poweredBy: "Powered by DeepSeek",
      launcherCallout: "Alguna Pregunta",
      resetChat: "Reiniciar chat",
      deleteMessage: "Eliminar mensaje",
      emojiLabel: "Agregar emoji",
      placeholder: "Escribe tu pregunta...",
      welcome:
        "¡Hola! Soy el asistente IA de Brayan Pulido. ¿En qué puedo ayudarte hoy? Puedo contarte sobre automatizaciones con n8n, desarrollo en Next.js, casos de éxito o cómo cotizar.",
      quickPrompts: [
        "¿Qué servicios ofrece?",
        "Cuéntame del caso WideStep",
        "¿Cómo cotizar un proyecto?",
      ],
      errorReply:
        "Hubo un problema al conectar con el asistente. Puedes escribir directo por WhatsApp o usar el formulario de contacto.",
    },
  },
  en: {
    nav: [
      { label: "Work", href: "/#trabajos" },
      { label: "Services", href: "/#servicios" },
      { label: "About", href: "/sobre-mi" },
      { label: "FAQ", href: "/#faq" },
      { label: "Contact", href: "/#contacto" },
    ],
    headerCta: "Contact me",
    themeLight: "Light mode",
    themeDark: "Dark mode",
    hero: {
      pill: "Available for new B2B projects",
      exClients: "Past clients:",
      headlinePrefix: "Systems and websites people",
      headlineAccent: "remember.",
      subtitleStart: "I'm",
      subtitleBody:
        "I automate workflows with AI (n8n), build high-converting landing pages (Next.js), and edit high-retention vertical video.",
      ctaPrimary: "View portfolio",
      ctaSecondary: "Let's talk",
      copy: "Copy",
      copied: "Copied",
    },
    bento: {
      badge: "01 / Case Studies",
      titleStart: "Projects &",
      titleAccent: "real case studies.",
      subtitle:
        "Click any card to explore the architecture, tech stack, and measurable results.",
      cta: "Quote a similar project",
      featuredImpact: "Key impact",
      modalResults: "Key results",
      modalClose: "Close",
      modalCta: "I want something similar",
    },
    services: {
      badge: "02 / Capabilities",
      titleStart: "A hybrid profile to",
      titleAccent: "scale without friction.",
      subtitle:
        "I combine AI automation, high-performance web development, and vertical video to solve product and growth in one place.",
    },
    about: {
      badge: "03 / Background",
      titleStart: "Less technical friction,",
      titleAccent: "faster execution.",
      bioStart: "I'm",
      bioBody:
        "a fullstack developer and AI automation specialist. I help startups, agencies, and digital businesses connect operations with n8n, ship fast Next.js products, and produce high-retention vertical content.",
      stackTitle: "Stack & Tools",
      stackCount: "technologies",
      highlights: [
        {
          title: "+6 Years 100% Remote",
          desc: "Seamless async collaboration with teams in the US, Spain, Colombia, and LatAm.",
        },
        {
          title: "Guaranteed uptime",
          desc: "Dual internet connections and dedicated power backup to operate without interruptions.",
        },
        {
          title: "ROI-focused",
          desc: "Every line of code, automation, or reel is built to save hours or drive revenue.",
        },
      ],
    },
    testimonials: {
      badge: "04 / Reviews",
      titleStart: "What teams",
      titleAccent: "say.",
    },
    faq: {
      badge: "05 / FAQ",
      titleStart: "Common questions before",
      titleAccent: "getting started.",
    },
    contact: {
      badge: "06 / Contact",
      titleStart: "Ready to automate or",
      titleAccent: "launch your website?",
      subtitle:
        "Tell me what you need to build or automate and I'll reply with a clear plan covering timeline, architecture, and budget.",
      formTitle: "Send me a direct message",
      nameLabel: "Your name",
      namePlaceholder: "e.g. Alex Morgan",
      emailLabel: "Email address",
      emailPlaceholder: "you@company.com",
      serviceLabel: "Service of interest",
      serviceOptions: [
        "AI Automation (n8n / Agents)",
        "Web Development & Landing Page (Next.js)",
        "Vertical Video & Email Marketing",
        "Full-scope project / Other",
      ],
      messageLabel: "Tell me about your project",
      messagePlaceholder:
        "What workflow do you want to automate or what site do you need to launch?",
      submitBtn: "Send message",
      sendingBtn: "Sending...",
      successTitle: "Message sent!",
      successBody:
        "Thanks for reaching out. I'll get back to you within 24 business hours.",
      sendAnother: "Send another message",
      errorMsg: "Please fill in all fields before submitting.",
      whatsappBtn: "Message on WhatsApp",
      emailCopied: "Email copied",
      sendEmail: "Send email",
      platformsTitle: "Also find me on:",
      locationTitle: "La Victoria, Aragua • Venezuela (Remote Global)",
    },
    footer: {
      privacy: "Privacy",
      terms: "Terms of Use",
      cookies: "Cookies",
      rights: "© 2026 Brayan Pulido. Built with Next.js & Tailwind CSS.",
    },
    cookieBanner: {
      textStart: "We use essential storage and",
      textMid: "without invasive tracking cookies to measure performance. See our",
      cookiesLink: "Cookie Policy",
      and: "and",
      privacyLink: "Privacy",
      accept: "Accept",
      dismiss: "Close",
    },
    chatbot: {
      title: "Brayan's Assistant",
      online: "Online",
      poweredBy: "Powered by DeepSeek",
      launcherCallout: "Any Questions?",
      resetChat: "Reset chat",
      deleteMessage: "Delete message",
      emojiLabel: "Add emoji",
      placeholder: "Type your question...",
      welcome:
        "Hi! I'm Brayan Pulido's AI assistant. How can I help you today? Ask me about n8n automations, Next.js builds, case studies, or how to request a quote.",
      quickPrompts: [
        "What services do you offer?",
        "Tell me about WideStep",
        "How do I request a quote?",
      ],
      errorReply:
        "Couldn't reach the assistant right now. Feel free to message via WhatsApp or the contact form.",
    },
  },
} as const;

export function getHeroMetrics(lang: Lang) {
  if (lang === "es") return HERO_METRICS;
  return [
    { label: "+6 Years of experience", highlight: "+6 Years" },
    { label: "100% Remote", highlight: "100%" },
    { label: "Venezuela / Global", highlight: "Global" },
  ];
}

export function getServices(lang: Lang) {
  if (lang === "es") return SERVICES;
  return [
    {
      id: "ai-automation",
      title: "AI Automation",
      description:
        "I connect your tools, CRMs, and WhatsApp channels with smart n8n workflows and LLMs to eliminate manual work 24/7.",
      tags: ["n8n", "OpenAI", "Mistral", "Webhooks", "APIs"],
      metric: "-80% manual ops",
    },
    {
      id: "web-dev",
      title: "Web Dev & Landing Pages",
      description:
        "I design and engineer ultra-fast landing pages and SaaS MVPs with Next.js, Tailwind, and Framer Motion built to convert traffic.",
      tags: ["Next.js", "React", "Figma", "Supabase", "Tailwind"],
      metric: "+98 Lighthouse Score",
    },
    {
      id: "video-email",
      title: "Vertical Video & Email Mkt",
      description:
        "High-retention Reels/TikToks and automated Klaviyo sequences that nurture and close leads on autopilot.",
      tags: ["CapCut", "DaVinci Resolve", "Klaviyo", "Reels / TikTok"],
      metric: "High retention & CTR",
    },
  ];
}

export function getBentoProjects(lang: Lang): BentoProject[] {
  if (lang === "es") return BENTO_PROJECTS;
  return [
    {
      id: "widestep",
      title: "WideStep / Elevate Group Case Study",
      category: "Admin Tool + n8n Pipeline",
      format: "Fullstack + n8n AI",
      subtitle:
        "Internal admin platform for AI-powered pre-landing listicle generation and n8n orchestration.",
      description:
        "Internal Next.js admin tool built for Elevate Group / WideStep. Orchestrates JSON market research uploads, triggers webhooks to an n8n AI engine to draft and compile static HTML listicles, and handles callback with strict UTF-8 binary shielding to Supabase Storage with secure /api/preview proxy and real-time polling.",
      stack: [
        "Next.js",
        "n8n",
        "Supabase",
        "OpenAI / LLMs",
        "PrismJS",
        "Tailwind CSS",
      ],
      results: [
        "End-to-end orchestration with n8n, webhooks, and Supabase in real-time",
        "Strict UTF-8 binary shielding preventing special character distortion (★, ✓, ’, —)",
        "Secure /api/preview proxy for CORS-free iframe previews & direct download",
        "Real-time dashboard with 8-second polling and cascading deletion",
      ],
      size: "featured",
      accent: "from-purple-600/30 via-violet-600/10 to-transparent",
    },
    {
      id: "kimmon",
      title: "Kimmon Case Study",
      category: "UI/UX + B2B LinkedIn",
      format: "Product & Growth",
      subtitle:
        "B2B interface redesign and automated LinkedIn outreach system.",
      description:
        "Optimized the platform UX and built high-converting visual assets targeted at B2B decision-makers on LinkedIn, aligning product design with lead generation.",
      stack: ["Figma", "Next.js", "Framer Motion", "LinkedIn B2B"],
      results: [
        "Clearer value proposition and onboarding flow",
        "Consistent visual system for B2B campaigns",
      ],
      size: "medium",
      accent: "from-fuchsia-600/20 via-purple-900/10 to-transparent",
    },
    {
      id: "creandovisual",
      title: "Creandovisual Case Study",
      category: "Landing Page + AI Assets",
      format: "Web High-Conversion",
      subtitle:
        "High-impact landing page powered by AI-generated visual assets.",
      description:
        "UI/UX design and frontend engineering focused on direct conversion, integrating AI-generated visuals, smooth micro-interactions, and ImageKit CDN optimization.",
      stack: ["Next.js", "Tailwind CSS", "ImageKit", "AI Assets"],
      results: [
        "Instant load times with f_auto, q_auto images",
        "Structure engineered for direct WhatsApp booking",
      ],
      size: "medium",
      accent: "from-indigo-600/20 via-violet-900/10 to-transparent",
    },
    {
      id: "reels-tiktok",
      title: "High-Retention Vertical Editing",
      category: "Vertical Video",
      format: "Reels / TikTok",
      subtitle: "Visual hooks, dynamic captions, and retention-driven pacing.",
      description:
        "Vertical video package edited in CapCut and DaVinci Resolve with sound design, strategic B-roll, and 3-second hooks.",
      stack: ["CapCut", "DaVinci Resolve", "Sound Design"],
      results: ["Higher average retention in the first 3 seconds"],
      size: "small",
      accent: "from-purple-500/20 to-transparent",
    },
    {
      id: "n8n-flows",
      title: "AI Agents & n8n Flows",
      category: "Automation",
      format: "B2B Workflows",
      subtitle:
        "WhatsApp lead qualification, call summaries, and CRM syncing.",
      description:
        "Modular n8n workflows connected to OpenAI/Mistral to answer inquiries, extract structured data, and trigger follow-up sequences.",
      stack: ["n8n", "Mistral", "OpenAI", "WhatsApp API"],
      results: ["Instant lead response in under 10 seconds"],
      size: "small",
      accent: "from-violet-500/20 to-transparent",
    },
    {
      id: "saas-landing",
      title: "SaaS Dark UI Landing Page",
      category: "Web Development",
      format: "Next.js + Motion",
      subtitle:
        "Modular React Bits-style architecture with GPU-accelerated motion.",
      description:
        "High-contrast dark interfaces with glassmorphism, bento grids, and forms optimized to capture B2B demand.",
      stack: ["Next.js", "TypeScript", "Framer Motion"],
      results: ["Smooth 60fps experience across mobile and desktop"],
      size: "small",
      accent: "from-blue-500/20 to-transparent",
    },
  ];
}

export function getTestimonials(lang: Lang) {
  if (lang === "es") return TESTIMONIALS;
  return [
    {
      ...TESTIMONIALS[0],
      quote:
        "Brayan solved in weeks what would have taken months with a traditional agency. He connected our Supabase dashboard with n8n workflows and operations started running on autopilot. Total autonomy and spotless delivery.",
    },
    {
      ...TESTIMONIALS[1],
      country: "Spain",
      quote:
        "His hybrid profile is pure gold: he understands UI/UX, code, and automation alike. He helped us elevate our B2B LinkedIn aesthetic with impressive execution speed.",
    },
    {
      ...TESTIMONIALS[2],
      quote:
        "Working async with Brayan is super smooth. He always replies on time, suggests technical improvements we hadn't thought of, and the landing page flies in both performance and design.",
    },
  ];
}

export function getFaqs(lang: Lang) {
  if (lang === "es") return FAQS;
  return [
    {
      question: "What does your workflow look like?",
      answer:
        "I work 100% asynchronously with clear communication (Slack, WhatsApp, or Loom) and short calls only when they add real value. We split projects into visible weekly milestones so you see progress from day one.",
    },
    {
      question: "How do you guarantee uptime from Venezuela?",
      answer:
        "I operate with dedicated redundant remote infrastructure: dual high-speed internet connections (fiber + mobile/satellite backup) and battery/inverter power backup to work without interruptions.",
    },
    {
      question: "Do you work per project or hourly?",
      answer:
        "Mainly fixed-scope projects or monthly retainers for ongoing automations, recurring video editing, or product evolution. That way you have full clarity on budget and deliverables upfront.",
    },
    {
      question: "How are payments handled?",
      answer:
        "Fixed-scope projects start with a 50% upfront deposit and 50% upon final approved delivery. I accept international methods including Wise, Payoneer, Binance/USDT, Zinli, or international wire transfer.",
    },
  ];
}
