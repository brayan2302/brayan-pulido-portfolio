"use client";

export const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
  "6LfLRSkuAAAAAHyDl1AeJWvAHk6RDIpAiqeqlVlM";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

/**
 * Generates an invisible Google reCAPTCHA v3 token on the client.
 * Safely resolves to undefined if blocked or unavailable so UX is never broken.
 */
export async function getRecaptchaToken(action: string): Promise<string | undefined> {
  if (typeof window === "undefined") return undefined;

  return new Promise((resolve) => {
    const timeout = setTimeout(() => resolve(undefined), 2500);

    try {
      const api = window.grecaptcha;
      if (!api || typeof api.ready !== "function") {
        clearTimeout(timeout);
        resolve(undefined);
        return;
      }

      api.ready(async () => {
        try {
          const token = await api.execute(RECAPTCHA_SITE_KEY, { action });
          clearTimeout(timeout);
          resolve(token);
        } catch {
          clearTimeout(timeout);
          resolve(undefined);
        }
      });
    } catch {
      clearTimeout(timeout);
      resolve(undefined);
    }
  });
}
