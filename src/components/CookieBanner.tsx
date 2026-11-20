"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import { UI_COPY } from "@/data/translations";

const STORAGE_KEY = "bp_cookie_consent";

export function CookieBanner() {
  const { lang } = usePreferences();
  const copy = UI_COPY[lang].cookieBanner;

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      try {
        const consent = window.localStorage.getItem(STORAGE_KEY);
        if (!consent) {
          setVisible(true);
        }
      } catch {
        // Ignorar errores
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleChoice = (value: "accepted" | "dismissed") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {}
    setVisible(false);
  };

  if (!mounted || !visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-5 left-4 right-4 sm:right-auto sm:left-6 sm:max-w-md z-40 rounded-2xl p-4 sm:p-5 bg-white/95 dark:bg-[#0b0b10]/95 backdrop-blur-xl border border-purple-500/30 shadow-[0_10px_40px_rgba(0,0,0,0.18)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.7)]"
    >
      <div className="flex items-start gap-3">
        <span className="shrink-0 w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-700 dark:text-purple-300 mt-0.5">
          <Cookie className="w-4 h-4" />
        </span>

        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
            {copy.textStart}{" "}
            <strong className="text-slate-950 dark:text-white">
              Vercel Analytics
            </strong>{" "}
            {copy.textMid}{" "}
            <Link
              href="/cookies"
              className="text-purple-700 dark:text-purple-300 hover:text-purple-500 underline underline-offset-2"
            >
              {copy.cookiesLink}
            </Link>{" "}
            {copy.and}{" "}
            <Link
              href="/privacidad"
              className="text-purple-700 dark:text-purple-300 hover:text-purple-500 underline underline-offset-2"
            >
              {copy.privacyLink}
            </Link>
            .
          </p>

          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleChoice("accepted")}
              className="px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 transition-all cursor-pointer"
            >
              {copy.accept}
            </button>
            <button
              type="button"
              onClick={() => handleChoice("dismissed")}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
            >
              {copy.dismiss}
            </button>
          </div>
        </div>

        <button
          type="button"
          aria-label="Cerrar aviso de cookies"
          onClick={() => handleChoice("dismissed")}
          className="text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
