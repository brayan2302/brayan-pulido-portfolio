const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const CHAT_MAX_CHARS = 250;
export const MIN_HUMAN_SUBMIT_MS = 1200;

export function sanitizeText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function isValidEmail(email: string): boolean {
  return email.length >= 5 && email.length <= 160 && EMAIL_REGEX.test(email);
}

export function isBotSubmission(payload: {
  honeypot?: unknown;
  startedAt?: unknown;
}): boolean {
  // Honeypot must remain empty
  if (typeof payload.honeypot === "string" && payload.honeypot.trim() !== "") {
    return true;
  }

  // Optional timing check: reject inhumanly fast form submissions (< 1.2s)
  if (typeof payload.startedAt === "number" && Number.isFinite(payload.startedAt)) {
    const elapsed = Date.now() - payload.startedAt;
    if (elapsed >= 0 && elapsed < MIN_HUMAN_SUBMIT_MS) {
      return true;
    }
  }

  return false;
}
