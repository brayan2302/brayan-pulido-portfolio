import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { CONTACT_INFO } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Política de Privacidad | Brayan Pulido",
  description:
    "Información sobre cómo se recopilan, utilizan y protegen los datos personales en el portafolio de Brayan Pulido.",
};

export default function PrivacidadPage() {
  return (
    <LegalPageLayout
      badge="PRIVACIDAD"
      title="Política de Privacidad"
      updatedAt="18 de noviembre de 2026"
    >
      <section className="space-y-3">
        <h2 className="font-[var(--font-space-grotesk)] text-xl font-bold text-white">
          1. Responsable del tratamiento
        </h2>
        <p>
          El titular y responsable de este sitio web es{" "}
          <strong className="text-white">{CONTACT_INFO.name}</strong>. Para
          cualquier consulta relacionada con la privacidad o el tratamiento de
          tus datos, puedes escribir directamente a{" "}
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="text-purple-300 hover:text-purple-200 underline underline-offset-4"
          >
            {CONTACT_INFO.email}
          </a>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[var(--font-space-grotesk)] text-xl font-bold text-white">
          2. Datos que recopilamos
        </h2>
        <p>
          Este portafolio es de carácter informativo y comercial. No contamos con
          registros de usuarios ni bases de datos públicas de visitantes. Los
          únicos datos que podemos recibir son:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
          <li>
            Información de contacto que nos envíes voluntariamente por correo
            electrónico o WhatsApp (nombre, empresa, detalles del proyecto).
          </li>
          <li>
            Métricas agregadas y anónimas de tráfico y rendimiento mediante{" "}
            <strong className="text-white">Vercel Analytics</strong>, sin
            identificar personalmente a los visitantes.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-[var(--font-space-grotesk)] text-xl font-bold text-white">
          3. Finalidad del tratamiento
        </h2>
        <p>
          Los datos compartidos por correo o WhatsApp se utilizan exclusivamente
          para responder consultas, elaborar propuestas técnicas o presupuestos y
          mantener la comunicación comercial solicitada. Nunca vendemos,
          alquilamos ni cedemos tus datos a terceros.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[var(--font-space-grotesk)] text-xl font-bold text-white">
          4. Conservación y derechos
        </h2>
        <p>
          Conservamos las comunicaciones únicamente durante el tiempo necesario
          para gestionar la relación comercial o cumplir obligaciones legales.
          Puedes solicitar en cualquier momento el acceso, rectificación o
          eliminación de tu información escribiendo a{" "}
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
