"use client";

import React from "react";
import Link from "next/link";
import { Mail, MessageSquare } from "lucide-react";
import { CONTACT_INFO } from "@/data/portfolio";
import { usePreferences } from "@/context/PreferencesContext";
import { UI_COPY } from "@/data/translations";
import MicroSlats from "./MicroSlats";

export function Footer() {
  const { lang, theme } = usePreferences();
  const copy = UI_COPY[lang].footer;
  const isEs = lang === "es";

  return (
    <footer className="relative border-t border-slate-200 dark:border-white/10 bg-[#f8fafc] dark:bg-[#09090d] text-slate-700 dark:text-slate-300 pt-10 pb-8 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
        {/* Centerpiece: Interactive <MicroSlats /> Canvas Field (React Bits) */}
        <div className="relative w-full h-[300px] sm:h-[360px] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-[#050508] shadow-2xl">
          <MicroSlats
            preset="swell"
            color="#A855F7"
            glintColor="#ffffff"
            backgroundColor={theme === "dark" ? "#08080c" : "#0b0b12"}
            slatWidth={10}
            slatHeight={25}
            gap={3}
            roundness={0.75}
            interactive
            cursorStrength={1}
            cursorSize={40}
            swirl={0}
            trail={1.4}
            lean={0}
            intro
          />

          {/* Subtle Center Emblem Overlay (pointer-events-none so cursor interacts with MicroSlats) */}
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center px-4 text-center">
            <div className="px-5 py-2.5 rounded-2xl bg-black/45 backdrop-blur-md border border-white/10 shadow-xl">
              <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-purple-300">
                {isEs ? "Mueve el cursor para interactuar" : "Move cursor to interact"}
              </p>
              <p className="text-lg sm:text-2xl font-bold text-white mt-0.5 tracking-tight">
                AI AUTOMATION &amp; FULLSTACK
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal, Social Icons & Copyright Bar */}
        <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          {/* Legal Links */}
          <nav
            aria-label="Enlaces legales"
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="/privacidad"
              className="hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
            >
              {copy.privacy}
            </Link>
            <span className="text-slate-300 dark:text-slate-700">&bull;</span>
            <Link
              href="/terminos"
              className="hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
            >
              {copy.terms}
            </Link>
            <span className="text-slate-300 dark:text-slate-700">&bull;</span>
            <Link
              href="/cookies"
              className="hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
            >
              {copy.cookies}
            </Link>
          </nav>

          {/* Center Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href={CONTACT_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a
              href={CONTACT_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              aria-label="Email"
              className="text-slate-500 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400 transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Copyright */}
          <p className="font-mono text-center md:text-right">{copy.rights}</p>
        </div>
      </div>
    </footer>
  );
}
