interface RateLimitRule {
  windowMs: number;
  max: number;
}

interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
  reason?: "minute" | "day" | "limit";
}

// In-memory store keyed by route:ip:window
const store = new Map<string, number[]>();

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim() || "unknown";
  }
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

export function checkRateLimit(
  namespace: string,
  ip: string,
  rules: Array<RateLimitRule & { label: "minute" | "day" | "limit" }>
): RateLimitResult {
  const now = Date.now();

  for (const rule of rules) {
    const key = `${namespace}:${ip}:${rule.windowMs}`;
    const timestamps = (store.get(key) ?? []).filter(
      (ts) => now - ts < rule.windowMs
    );

    if (timestamps.length >= rule.max) {
      const oldest = timestamps[0];
      const retryAfterSeconds = Math.max(
        1,
        Math.ceil((rule.windowMs - (now - oldest)) / 1000)
      );
      store.set(key, timestamps);
      return {
        allowed: false,
        retryAfterSeconds,
        reason: rule.label,
      };
    }
  }

  // Record hit across all windows only if all rules pass
  for (const rule of rules) {
    const key = `${namespace}:${ip}:${rule.windowMs}`;
    const timestamps = (store.get(key) ?? []).filter(
      (ts) => now - ts < rule.windowMs
    );
    timestamps.push(now);
    store.set(key, timestamps);
  }

  return { allowed: true, retryAfterSeconds: 0 };
}
