import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { CONTACT_INFO } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Política de Cookies | Brayan Pulido",
  description:
    "Información sobre el uso de cookies, almacenamiento local y analítica en el portafolio de Brayan Pulido.",
};

export default function CookiesPage() {
  return (
    <LegalPageLayout
      badge="COOKIES"
      title="Política de Cookies"
      updatedAt="18 de noviembre de 2026"
    >
      <section className="space-y-3">
        <h2 className="font-[var(--font-space-grotesk)] text-xl font-bold text-white">
          1. ¿Qué son las cookies?
        </h2>
        <p>
          Las cookies y tecnologías similares (como{" "}
          <code className="px-1.5 py-0.5 rounded bg-white/10 text-purple-200 text-xs font-mono">
            localStorage
          </code>
          ) son pequeños archivos o registros que el navegador guarda en tu
          dispositivo para recordar preferencias técnicas o mejorar la
          experiencia de navegación.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[var(--font-space-grotesk)] text-xl font-bold text-white">
          2. Cookies y tecnologías utilizadas en este sitio
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-slate-300">
          <li>
            <strong className="text-white">Preferencias esenciales:</strong>{" "}
            Almacenamos tu elección sobre el aviso de cookies en{" "}
            <code className="px-1.5 py-0.5 rounded bg-white/10 text-purple-200 text-xs font-mono">
              localStorage
            </code>{" "}
            para no volver a mostrar el banner en futuras visitas.
          </li>
          <li>
            <strong className="text-white">
              Analítica respetuosa con la privacidad (Vercel Analytics):
            </strong>{" "}
            Utilizamos Vercel Analytics para medir visitas agregadas, páginas
            más consultadas y rendimiento general sin emplear cookies
            publicitarias ni rastreo entre sitios web.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-[var(--font-space-grotesk)] text-xl font-bold text-white">
          3. Cómo gestionar o desactivar cookies
        </h2>
        <p>
          Puedes configurar tu navegador en cualquier momento para bloquear o
          eliminar cookies y datos almacenados localmente (Chrome, Firefox,
          Safari, Edge). Ten en cuenta que limpiar el almacenamiento local solo
          hará que el aviso informativo vuelva a mostrarse en tu próxima visita.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[var(--font-space-grotesk)] text-xl font-bold text-white">
          4. Contacto
        </h2>
        <p>
          Si tienes dudas sobre esta política, puedes escribir a{" "}
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="text-purple-300 hover:text-purple-200 underline underline-offset-4"
          >
            {CONTACT_INFO.email}
          </a>
          .
        </p>
      </section>
    </LegalPageLayout>
  );
}
