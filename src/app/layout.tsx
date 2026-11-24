import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { PreferencesProvider } from "@/context/PreferencesContext";
import { CookieBanner } from "@/components/CookieBanner";
import { AiChatbot } from "@/components/AiChatbot";
import { AppleCursor } from "@/components/AppleCursor";
import { CornerRouteLoader } from "@/components/CornerRouteLoader";
import { RecaptchaBadge } from "@/components/RecaptchaBadge";
import { CONTACT_INFO } from "@/data/portfolio";
import "./globals.css";

const SITE_URL = "https://www.brayanantonio.lat";
const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
  "6LfLRSkuAAAAAHyDl1AeJWvAHk6RDIpAiqeqlVlM";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Brayan Pulido | AI Automation Engineer & Full-Stack Developer",
    template: "%s | Brayan Pulido",
  },
  description:
    "Especialista en Automatización con IA (n8n, Agentes LLM), desarrollo frontend y fullstack de alta conversión en Next.js y edición de video vertical. +6 años de experiencia 100% remoto.",
  keywords: [
    "Brayan Pulido",
    "AI Automation Engineer",
    "Automatización con IA",
    "n8n Developer",
    "Next.js Developer",
    "Full-Stack Developer",
    "Desarrollador Web Remoto",
    "Landing Pages de Alta Conversión",
    "Supabase CRM",
    "Edición de video vertical",
    "La Victoria Aragua Venezuela",
    "Remote Developer LatAm",
    "Agentes de IA B2B",
  ],
  authors: [{ name: "Brayan Pulido", url: SITE_URL }],
  creator: "Brayan Pulido",
  publisher: "Brayan Pulido",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "es-VE": SITE_URL,
      "en-US": `${SITE_URL}?lang=en`,
    },
  },
  openGraph: {
    title: "Brayan Pulido | AI Automation & Fullstack Developer",
    description:
      "Sistemas y webs que la gente recuerda. Automatización de procesos con IA (n8n), desarrollo en Next.js y contenido vertical de alto impacto. +6 años trabajando remoto.",
    url: SITE_URL,
    siteName: "Brayan Pulido - Portafolio Oficial",
    locale: "es_LA",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brayan Pulido | AI Automation & Fullstack Developer",
    description:
      "Automatización con IA (n8n), Next.js y edición vertical de alta conversión.",
    creator: "@brayanpulido",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "VE-A",
    "geo.placename": "La Victoria, Aragua, Venezuela",
    "geo.position": "10.2241;-67.3236",
    ICBM: "10.2241, -67.3236",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Person", "ProfessionalService"],
      "@id": `${SITE_URL}/#person`,
      name: "Brayan Pulido",
      url: SITE_URL,
      jobTitle: "AI Automation Engineer & Full-Stack Developer",
      description:
        "Especialista en flujos de trabajo inteligentes con IA (n8n, LLMs), desarrollo web con Next.js y edición de contenido vertical.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "La Victoria",
        addressRegion: "Aragua",
        addressCountry: "VE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 10.2241,
        longitude: -67.3236,
      },
      sameAs: [
        CONTACT_INFO.linkedinUrl,
        CONTACT_INFO.githubUrl,
        CONTACT_INFO.whatsappUrl,
        "https://www.workana.com/e/1caf0e229a2e54c333c187de6a47d431",
        "https://es.fiverr.com/s/ZozQ7Rp",
        "https://www.freelancer.es/u/brayanelcrack23",
      ],
      knowsAbout: [
        "AI Automation",
        "n8n",
        "Next.js",
        "React",
        "TypeScript",
        "Supabase",
        "Tailwind CSS",
        "Framer Motion",
        "LLMs & OpenAI API",
        "Video Editing (DaVinci Resolve, CapCut)",
      ],
      priceRange: "$$",
      areaServed: ["Global", "Latin America", "United States", "Spain"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios Profesionales de Brayan Pulido",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Automatización con IA (n8n & LLMs)",
              description:
                "Integración de agentes, WhatsApp y CRMs con flujos autónomos en n8n.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Desarrollo Web & Landing Pages (Next.js)",
              description:
                "Landing pages y plataformas de alta velocidad optimizadas para conversión.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Edición Vertical & Email Marketing",
              description:
                "Piezas audiovisuales dinámicas para TikTok/Reels y secuencias de retención.",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Brayan Pulido | Portafolio Oficial",
      publisher: {
        "@id": `${SITE_URL}/#person`,
      },
      inLanguage: ["es", "en"],
    },
  ],
};

const PREFS_DETECTION_SCRIPT = `
(function() {
  try {
    var storedTheme = window.localStorage.getItem('bp_theme');
    var theme = (storedTheme === 'light' || storedTheme === 'dark') ? storedTheme : 'light';
    var root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.style.colorScheme = theme;

    var storedLang = window.localStorage.getItem('bp_lang');
    var navLang = (navigator.language || navigator.userLanguage || 'es').toLowerCase();
    var detectedLang = navLang.startsWith('es') ? 'es' : 'en';
    var lang = (storedLang === 'es' || storedLang === 'en') ? storedLang : detectedLang;
    root.lang = lang;

    window.__INITIAL_PREFS__ = { theme: theme, lang: lang };
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: PREFS_DETECTION_SCRIPT }} />
        <link rel="preconnect" href="https://fonts.cdnfonts.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/google-sans-2" />
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/google-sans" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-purple-500/30 selection:text-white antialiased"
        suppressHydrationWarning
      >
        <PreferencesProvider>
          <AppleCursor />
          {children}
          <CookieBanner />
          <AiChatbot />
          <CornerRouteLoader />
          <RecaptchaBadge />
        </PreferencesProvider>
        <Analytics />
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
