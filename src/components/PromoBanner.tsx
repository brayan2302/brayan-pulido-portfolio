"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, X } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";

export function PromoBanner() {
  const [visible, setVisible] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(9 * 3600 + 23 * 60 + 39);
  const { lang } = usePreferences();
  const isEs = lang === "es";

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 9 * 3600 + 23 * 60 + 39));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="relative z-50 w-full bg-gradient-to-r from-[#6d28d9] via-[#7c3aed] to-[#4f46e5] text-white border-b border-white/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs sm:text-sm pr-10">
        <span className="inline-flex items-center gap-1.5 font-extrabold uppercase tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span>{isEs ? "OFERTA ESPECIAL" : "SPECIAL OFFER"}</span>
        </span>

        <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 font-extrabold text-[11px] -rotate-2 shadow-sm">
          20% OFF
        </span>

        <span className="text-white/95 font-medium text-center">
          {isEs
            ? "En automatizaciones n8n y Landings Next.js este mes"
            : "On n8n automations & Next.js Landings this month"}
        </span>

        {/* Countdown */}
        <div className="hidden md:flex items-center gap-1.5 font-mono text-xs">
          <span className="text-white/80">{isEs ? "Faltan" : "Ends in"}</span>
          <span className="px-1.5 py-0.5 rounded bg-amber-100 text-slate-950 font-bold">
            {hours}h
          </span>
          <span className="px-1.5 py-0.5 rounded bg-amber-100 text-slate-950 font-bold">
            {minutes}m
          </span>
          <span className="px-1.5 py-0.5 rounded bg-amber-100 text-slate-950 font-bold">
            {seconds}s
          </span>
        </div>

        <Link
          href="/?offer=20off#contacto"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("bp:claim-offer"));
              const el = document.getElementById("contacto");
              if (el) {
                setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50);
              }
            }
          }}
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold text-xs shadow-sm transition-transform hover:scale-105 cursor-pointer"
        >
          <span>{isEs ? "Ver oferta" : "Claim offer"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label={isEs ? "Cerrar barra de oferta" : "Dismiss offer banner"}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1 rounded-full text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
