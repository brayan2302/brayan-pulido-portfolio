import { NextResponse } from "next/server";
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

    // Web3Forms free tier blocks server-side Node.js requests (403 Cloudflare).
    // Return the public access key after passing server-side reCAPTCHA, rate-limit & validation
    // so the browser submits directly to Web3Forms.
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY || null;

    return NextResponse.json({
      ok: true,
      deliveredVia: accessKey ? "web3forms-client" : "validated",
      web3formsAccessKey: accessKey,
      sanitized: {
        name,
        email,
        service,
        message,
      },
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
