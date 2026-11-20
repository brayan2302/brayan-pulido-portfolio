"use client";

import React, { useState } from "react";
import { ShieldCheck } from "lucide-react";

export function RecaptchaBadge() {
  const [hovered, setHovered] = useState(false);

  return (
    <aside
      aria-label="Google reCAPTCHA v3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`fixed bottom-20 right-3 z-30 transition-all duration-300 ease-out select-none hidden sm:flex items-center rounded-l-lg border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#111118]/95 shadow-md backdrop-blur-md overflow-hidden ${
        hovered ? "pr-3 pl-2 py-1.5 translate-x-0" : "p-1.5 translate-x-0 opacity-80 hover:opacity-100"
      }`}
    >
      <div className="flex items-center gap-1.5 text-[#4285F4]">
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.06L6.71 12.83l1.41-1.41 2.88 2.88 6.18-6.18 1.41 1.41L11 17.06z"
            fill="currentColor"
          />
        </svg>
      </div>

      {hovered ? (
        <div className="ml-2 flex flex-col text-[10px] font-sans leading-tight text-slate-600 dark:text-slate-300">
          <span className="font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            reCAPTCHA v3
          </span>
          <span className="text-[9px] text-slate-500 dark:text-slate-400">
            Protegido invisiblemente
          </span>
          <div className="flex gap-1 text-[9px] text-[#4285F4]">
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Privacidad
            </a>
            <span>•</span>
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Términos
            </a>
          </div>
        </div>
      ) : null}
    </aside>
  );
}
