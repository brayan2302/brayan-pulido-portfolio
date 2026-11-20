import { NextResponse } from "next/server";
import { CONTACT_INFO } from "@/data/portfolio";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import {
  isBotSubmission,
  isValidEmail,
  sanitizeText,
} from "@/lib/validation";
import { reportErrorByEmail } from "@/lib/error-reporter";
import { verifyRecaptchaToken } from "@/lib/recaptcha";

const ONE_MINUTE_MS = 60 * 1000;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export async function POST(req: Request) {
  const ip = getClientIp(req);

  try {
    const body = await req.json();

    // Anti-bot check (honeypot + minimum fill time)
    if (
      isBotSubmission({
        honeypot: body?.website,
        startedAt: body?.startedAt,
      })
    ) {
      return NextResponse.json(
        { error: "Bot submission rejected" },
        { status: 400 }
      );
    }

    // Validación reCAPTCHA en segundo plano
    if (typeof body?.recaptchaToken === "string") {
      const captcha = await verifyRecaptchaToken(body.recaptchaToken);
      if (!captcha.success) {
        return NextResponse.json(
          { error: "reCAPTCHA validation failed" },
          { status: 403 }
        );
      }
    }

    // Rate limiting: max 3 submissions/min and 10/day per IP
    const rate = checkRateLimit("api-contact", ip, [
      { windowMs: ONE_MINUTE_MS, max: 3, label: "minute" },
      { windowMs: ONE_DAY_MS, max: 10, label: "day" },
    ]);

    if (!rate.allowed) {
      return NextResponse.json(
        {
          error: `Demasiados envíos. Intenta de nuevo en ${rate.retryAfterSeconds}s.`,
          retryAfterSeconds: rate.retryAfterSeconds,
        },
        {
          status: 429,
          headers: { "Retry-After": String(rate.retryAfterSeconds) },
        }
      );
    }

    // Strict field validation & sanitization
    const name = sanitizeText(body?.name, 80);
    const email = sanitizeText(body?.email, 160).toLowerCase();
    const service = sanitizeText(body?.service, 100) || "Consulta general";
    const message = sanitizeText(body?.message, 1500);

    if (name.length < 2) {
      return NextResponse.json(
        { error: "Nombre inválido (mínimo 2 caracteres)." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Correo electrónico inválido." },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: "El mensaje debe tener al menos 10 caracteres." },
        { status: 400 }
      );
    }

    // Send via Web3Forms to brayanelcrack2302@gmail.com
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (accessKey) {
      const w3Res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `[Portafolio] Nuevo lead: ${name} (${service})`,
          from_name: name,
          replyto: email,
          email: CONTACT_INFO.email,
          message: [
            `Nombre: ${name}`,
            `Email del contacto: ${email}`,
            `Servicio: ${service}`,
            `Mensaje:\n${message}`,
          ].join("\n\n"),
        }),
      });

      const w3Data = await w3Res.json().catch(() => ({}));
      if (!w3Res.ok || w3Data?.success === false) {
        await reportErrorByEmail({
          source: "/api/contact (Web3Forms)",
          error: new Error(`Web3Forms error ${w3Res.status}`),
          details: { ip, w3Data },
        });
        return NextResponse.json(
          { error: "No se pudo entregar el correo en este momento." },
          { status: 502 }
        );
      }
    }

    // Optional n8n webhook forwarding
    if (process.env.N8N_CONTACT_WEBHOOK_URL) {
      await fetch(process.env.N8N_CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          service,
          message,
          source: "portfolio",
        }),
      }).catch(() => {});
    }

    return NextResponse.json({
      ok: true,
      deliveredVia: accessKey ? "web3forms" : "local-validated",
    });
  } catch (err) {
    await reportErrorByEmail({
      source: "/api/contact",
      error: err,
      details: { ip },
    });

    return NextResponse.json(
      { error: "Error procesando la solicitud." },
      { status: 500 }
    );
  }
}
