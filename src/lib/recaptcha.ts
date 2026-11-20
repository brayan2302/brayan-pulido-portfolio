/**
 * Google reCAPTCHA v3 Verification Helper
 * Configura RECAPTCHA_SECRET_KEY en tu .env.local cuando registres tu dominio en Google reCAPTCHA.
 */
export async function verifyRecaptchaToken(
  token?: string
): Promise<{ success: boolean; score?: number }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    // Si no está configurada la clave en .env, permite el paso en modo desarrollo
    return { success: true, score: 1.0 };
  }

  if (!token) {
    return { success: false, score: 0 };
  }

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    const data = await res.json();
    return {
      success: Boolean(data?.success && (data?.score ?? 0) >= 0.5),
      score: data?.score ?? 0,
    };
  } catch {
    // Fallback tolerante en caso de corte en red externa
    return { success: true, score: 0.5 };
  }
}
