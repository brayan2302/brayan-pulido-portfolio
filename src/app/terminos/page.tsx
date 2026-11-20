import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { CONTACT_INFO } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Políticas de Uso | Brayan Pulido",
  description:
    "Términos y condiciones de uso del sitio web y portafolio profesional de Brayan Pulido.",
};

export default function TerminosPage() {
  return (
    <LegalPageLayout
      badge="TÉRMINOS_DE_USO"
      title="Políticas y Términos de Uso"
      updatedAt="18 de noviembre de 2026"
    >
      <section className="space-y-3">
        <h2 className="font-[var(--font-space-grotesk)] text-xl font-bold text-white">
          1. Aceptación de los términos
        </h2>
        <p>
          Al acceder y navegar por este sitio web, aceptas cumplir con las
          presentes Políticas de Uso y la legislación aplicable. Si no estás de
          acuerdo con alguno de estos términos, te recomendamos no utilizar el
          sitio.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[var(--font-space-grotesk)] text-xl font-bold text-white">
          2. Propiedad intelectual
        </h2>
        <p>
          Todo el contenido mostrado en este portafolio —incluyendo textos,
          diseño visual, fragmentos de código, estructura y casos de estudio— es
          propiedad de <strong className="text-white">{CONTACT_INFO.name}</strong>{" "}
          o se presenta con fines demostrativos de trabajos realizados para
          clientes. Queda prohibida su reproducción, distribución o uso comercial
          sin autorización previa por escrito.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[var(--font-space-grotesk)] text-xl font-bold text-white">
          3. Alcance de los servicios y presupuestos
        </h2>
        <p>
          La información sobre servicios, tiempos y métricas publicada en la web
          tiene carácter orientativo. Todo proyecto contratado se regirá por una
          propuesta formal o acuerdo específico donde se definirán entregables,
          plazos, hitos de pago y condiciones de soporte.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[var(--font-space-grotesk)] text-xl font-bold text-white">
          4. Enlaces externos y disponibilidad
        </h2>
        <p>
          Este sitio incluye enlaces a plataformas externas (como WhatsApp,
          LinkedIn o GitHub). No nos responsabilizamos por las políticas o
          disponibilidad de dichos servicios de terceros. Asimismo, podemos
          actualizar o modificar el contenido de este sitio en cualquier momento
          sin previo aviso.
        </p>
      </section>
    </LegalPageLayout>
  );
}
