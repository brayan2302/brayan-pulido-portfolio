"use client";

import React from "react";
import { Sparkles, Scissors, Mail, MessageCircle, Globe, Cpu } from "lucide-react";

const SLUG_MAP: Record<string, { slug: string; invertInDark?: boolean }> = {
  n8n: { slug: "n8n" },
  "next.js": { slug: "nextdotjs", invertInDark: true },
  react: { slug: "react" },
  typescript: { slug: "typescript" },
  supabase: { slug: "supabase" },
  "tailwind css": { slug: "tailwindcss" },
  tailwind: { slug: "tailwindcss" },
  "framer motion": { slug: "framer", invertInDark: true },
  figma: { slug: "figma" },
  mistral: { slug: "mistralai" },
  imagekit: { slug: "imagekit" },
  "davinci resolve": { slug: "davinciresolve" },
  whatsapp: { slug: "whatsapp" },
  "whatsapp api": { slug: "whatsapp" },
  linkedin: { slug: "linkedin" },
  "linkedin b2b": { slug: "linkedin" },
  tiktok: { slug: "tiktok", invertInDark: true },
  "reels / tiktok": { slug: "tiktok", invertInDark: true },
};

function FallbackIcon({ name }: { name: string }) {
  const lower = name.toLowerCase();
  if (lower.includes("capcut")) {
    return <Scissors className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />;
  }
  if (lower.includes("klaviyo")) {
    return <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />;
  }
  if (lower.includes("whatsapp")) {
    return <MessageCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />;
  }
  if (lower.includes("webhook") || lower.includes("api")) {
    return <Globe className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />;
  }
  if (lower.includes("openai") || lower.includes("ai")) {
    return <Sparkles className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400 shrink-0" />;
  }
  return <Cpu className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />;
}

interface TechBadgeProps {
  name: string;
  size?: "sm" | "md";
}

export function TechBadge({ name, size = "sm" }: TechBadgeProps) {
  const match = SLUG_MAP[name.toLowerCase()];
  const paddingClass =
    size === "md" ? "px-3.5 py-2 text-xs sm:text-sm" : "px-2.5 py-1 text-[11px]";
  const iconSize = size === "md" ? "w-4 h-4" : "w-3.5 h-3.5";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg font-mono bg-slate-900/[0.04] dark:bg-white/[0.05] hover:bg-purple-500/15 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 hover:border-purple-400/40 transition-colors ${paddingClass}`}
    >
      {match ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://cdn.simpleicons.org/${match.slug}`}
          alt={name}
          width={16}
          height={16}
          loading="lazy"
          className={`${iconSize} shrink-0 ${
            match.invertInDark ? "dark:invert" : ""
          }`}
        />
      ) : (
        <FallbackIcon name={name} />
      )}
      <span>{name}</span>
    </span>
  );
}
