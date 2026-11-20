import { CONTACT_INFO } from "@/data/portfolio";

let lastErrorReportAt = 0;
const ERROR_REPORT_COOLDOWN_MS = 60_000;

export async function reportErrorByEmail(context: {
  source: string;
  error: unknown;
  details?: Record<string, unknown>;
}) {
  const now = Date.now();
  if (now - lastErrorReportAt < ERROR_REPORT_COOLDOWN_MS) {
    return;
  }
  lastErrorReportAt = now;

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  const errorMessage =
    context.error instanceof Error
      ? `${context.error.name}: ${context.error.message}`
      : String(context.error);

  console.error(`[ErrorReport:${context.source}]`, errorMessage, context.details ?? {});

  if (!accessKey) return;

  try {
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `[Portafolio Error] ${context.source}`,
        from_name: "Portafolio Error Monitor",
        email: CONTACT_INFO.email,
        message: [
          `Origen: ${context.source}`,
          `Fecha: ${new Date().toISOString()}`,
          `Error: ${errorMessage}`,
          context.details ? `Detalles: ${JSON.stringify(context.details)}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
      }),
    });
  } catch {
    // Avoid throwing from error reporter
  }
}
