import { NextResponse } from "next/server";
import { CONTACT_INFO, SERVICES, BENTO_PROJECTS, FAQS } from "@/data/portfolio";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { CHAT_MAX_CHARS, sanitizeText } from "@/lib/validation";
import { reportErrorByEmail } from "@/lib/error-reporter";
import { verifyRecaptchaToken } from "@/lib/recaptcha";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const ONE_MINUTE_MS = 60 * 1000;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function buildFallbackReply(message: string, lang: "es" | "en"): string {
  const q = message.toLowerCase();

  if (
    q.includes("widestep") ||
    q.includes("kimmon") ||
    q.includes("creando") ||
    q.includes("caso") ||
    q.includes("case") ||
    q.includes("proyecto") ||
    q.includes("project")
  ) {
    return lang === "en"
      ? "Brayan has delivered projects like WideStep (Supabase admin MVP + n8n automation saving +25h/week), Kimmon (B2B UI/UX + LinkedIn growth), and Creandovisual (high-converting Next.js landing page with AI assets). Click any card in the Portfolio section to see full metrics!"
      : "Brayan ha desarrollado casos como WideStep (MVP admin en Supabase + flujos n8n ahorrando +25h/semana), Kimmon (UI/UX B2B + prospección en LinkedIn) y Creandovisual (landing de alta conversión en Next.js con assets IA). Puedes hacer clic en cualquier tarjeta del Portafolio para ver el detalle.";
  }

  if (
    q.includes("n8n") ||
    q.includes("ia") ||
    q.includes("ai") ||
    q.includes("automat")
  ) {
    return lang === "en"
      ? "In AI Automation, Brayan connects CRMs, WhatsApp, and APIs using n8n, OpenAI, and Mistral to qualify leads, summarize calls, and automate onboarding 24/7 — reducing manual ops by up to 80%."
      : "En Automatización con IA, Brayan conecta CRMs, WhatsApp y APIs usando n8n, OpenAI y Mistral para calificar leads, resumir llamadas y automatizar onboarding 24/7, reduciendo hasta un 80% el tiempo operativo.";
  }

  if (
    q.includes("precio") ||
    q.includes("cotiz") ||
    q.includes("cost") ||
    q.includes("price") ||
    q.includes("quote") ||
    q.includes("pago") ||
    q.includes("pay")
  ) {
    return lang === "en"
      ? `Brayan works on fixed-scope projects (50% upfront / 50% on delivery) or monthly retainers, accepting Wise, Payoneer, Binance/USDT, Zinli, and wire transfers. You can request a quote using the contact form below or via WhatsApp at +${CONTACT_INFO.whatsappNumber}.`
      : `Brayan trabaja por proyecto cerrado (50% adelanto / 50% contra entrega) o retainer mensual, aceptando Wise, Payoneer, Binance/USDT, Zinli y transferencia internacional. Puedes cotizar directo en el formulario de contacto o escribiendo al WhatsApp +${CONTACT_INFO.whatsappNumber}.`;
  }

  if (
    q.includes("servici") ||
    q.includes("service") ||
    q.includes("web") ||
    q.includes("next") ||
    q.includes("video")
  ) {
    const list = SERVICES.map((s) => s.title).join(", ");
    return lang === "en"
      ? "Brayan's core services are: AI Automation (n8n, OpenAI, Mistral), Web Development & Landing Pages (Next.js, Supabase, Tailwind), and High-Retention Vertical Video & Email Marketing (CapCut, DaVinci Resolve, Klaviyo)."
      : `Los servicios principales de Brayan son: ${list}. Combina flujos en n8n con IA, desarrollo web ultrarrápido en Next.js y edición vertical de alta retención.`;
  }

  if (
    q.includes("hola") ||
    q.includes("hello") ||
    q.includes("hi") ||
    q.includes("hey") ||
    q.includes("buenos")
  ) {
    return lang === "en"
      ? `Hello! I'm Brayan Pulido's AI assistant. Ask me anything about his AI automations (n8n), fullstack web development (Next.js), or past client work!`
      : `¡Hola! Soy el asistente IA de Brayan Pulido. ¿En qué puedo orientarte hoy? Pregúntame sobre automatizaciones con n8n, desarrollo en Next.js o sus casos de éxito.`;
  }

  return lang === "en"
    ? `I'm Brayan Pulido's AI assistant (+6 years remote experience in AI Automation with n8n, Next.js Fullstack Dev, and Vertical Video). Ask me about services, case studies (WideStep, Kimmon, Creandovisual), or how to request a quote!`
    : `Soy el asistente IA de Brayan Pulido (+6 años de experiencia remota en Automatización con IA/n8n, Desarrollo Fullstack Next.js y Video Vertical). Pregúntame sobre servicios, casos reales (WideStep, Kimmon, Creandovisual) o cómo cotizar tu proyecto.`;
}

export async function POST(req: Request) {
  const ip = getClientIp(req);

  try {
    const body = await req.json();
    const lang: "es" | "en" = body?.lang === "en" ? "en" : "es";

    // Anti-bot: solo honeypot oculto
    if (typeof body?.website === "string" && body.website.trim() !== "") {
      return NextResponse.json(
        { error: "Bot activity detected" },
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

    // Rate limiting (en desarrollo local no bloqueamos pruebas; en producción 3/min y 10/día)
    const isLocalhost = ip === "::1" || ip === "127.0.0.1" || ip === "unknown";
    if (!isLocalhost && process.env.NODE_ENV === "production") {
      const rate = checkRateLimit("api-chat", ip, [
        { windowMs: ONE_MINUTE_MS, max: 3, label: "minute" },
        { windowMs: ONE_DAY_MS, max: 10, label: "day" },
      ]);

      if (!rate.allowed) {
        const errorMsg =
          rate.reason === "day"
            ? lang === "en"
              ? "Daily limit reached (10 questions per day). Please use the contact form or WhatsApp."
              : "Has alcanzado el límite diario de 10 preguntas. Escríbeme por el formulario o WhatsApp."
            : lang === "en"
            ? `Too many questions. Maximum 3 per minute. Try again in ${rate.retryAfterSeconds}s.`
            : `Límite de 3 preguntas por minuto alcanzado. Intenta de nuevo en ${rate.retryAfterSeconds}s.`;

        return NextResponse.json(
          { error: errorMsg, retryAfterSeconds: rate.retryAfterSeconds },
          {
            status: 429,
            headers: { "Retry-After": String(rate.retryAfterSeconds) },
          }
        );
      }
    }

    // Validación estricta y sanitización de mensajes
    const rawMessages: unknown[] = Array.isArray(body?.messages)
      ? body.messages.slice(-8)
      : [];

    const messages: ChatMessage[] = rawMessages
      .filter(
        (m): m is { role: "user" | "assistant"; content: string } =>
          typeof m === "object" &&
          m !== null &&
          ((m as { role?: unknown }).role === "user" ||
            (m as { role?: unknown }).role === "assistant") &&
          typeof (m as { content?: unknown }).content === "string"
      )
      .map((m) => ({
        role: m.role,
        content: sanitizeText(m.content, CHAT_MAX_CHARS),
      }))
      .filter((m) => m.content.length > 0);

    const lastUserMessage =
      [...messages].reverse().find((m) => m.role === "user")?.content ?? "";

    if (!lastUserMessage) {
      return NextResponse.json(
        {
          error:
            lang === "en"
              ? "Please write a valid message (max 250 characters)."
              : "Escribe un mensaje válido (máximo 250 caracteres).",
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        reply: buildFallbackReply(lastUserMessage, lang),
        provider: "deepseek-fallback",
      });
    }

    const systemPrompt = `You are the official AI portfolio assistant for ${CONTACT_INFO.name} (AI Automation & Fullstack Developer, +6 years 100% remote, based in Venezuela working globally).
Reply concisely, helpfully, and professionally in ${lang === "en" ? "English" : "Spanish"}.
Portfolio facts:
- Email: ${CONTACT_INFO.email}
- WhatsApp: +${CONTACT_INFO.whatsappNumber}
- Services: ${SERVICES.map((s) => `${s.title} (${s.metric}): ${s.description}`).join(" | ")}
- Projects: ${BENTO_PROJECTS.map((p) => `${p.title} (${p.category}): ${p.subtitle}`).join(" | ")}
- FAQs: ${FAQS.map((f) => `${f.question} -> ${f.answer}`).join(" | ")}
Encourage the visitor to use the contact form or WhatsApp if they want a tailored quote.`;

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        temperature: 0.6,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      await reportErrorByEmail({
        source: "/api/chat (DeepSeek upstream)",
        error: new Error(`DeepSeek HTTP ${response.status}`),
        details: { ip },
      });

      return NextResponse.json({
        reply: buildFallbackReply(lastUserMessage, lang),
        provider: "deepseek-fallback",
      });
    }

    const data = await response.json();
    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      buildFallbackReply(lastUserMessage, lang);

    return NextResponse.json({
      reply,
      provider: "deepseek",
    });
  } catch (err) {
    await reportErrorByEmail({
      source: "/api/chat",
      error: err,
      details: { ip },
    });

    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}
