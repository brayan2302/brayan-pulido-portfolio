"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Video } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CalendlyWidget } from "@/components/CalendlyWidget";
import { usePreferences } from "@/context/PreferencesContext";

export default function AgendarPage() {
  const { lang } = usePreferences();
  const isEs = lang === "es";

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <main className="flex-1 pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/#contacto"
            className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors mb-8 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isEs ? "Volver al inicio" : "Back to home"}</span>
          </Link>

          <div className="rounded-3xl p-6 sm:p-10 glass-card border border-purple-500/25 shadow-2xl overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200 dark:border-white/10">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-purple-600 dark:text-purple-400 font-semibold mb-1.5 inline-block">
                  {isEs ? "Agendamiento directo" : "Direct Scheduling"}
                </span>
                <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                  <Calendar className="w-7 h-7 text-purple-600 dark:text-purple-400 shrink-0" />
                  <span>
                    {isEs
                      ? "Agenda una videollamada de 30 min"
                      : "Schedule a 30-min video call"}
                  </span>
                </h1>
                <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
                  {isEs
                    ? "Revisemos tu proyecto en vivo. Selecciona el horario que mejor te convenga y la cita se agendará automáticamente en Google Meet."
                    : "Let's review your project live. Pick the best time for you and the meeting will automatically schedule in Google Meet."}
                </p>
              </div>

              <div className="shrink-0 self-start sm:self-center inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25 text-xs font-mono">
                <Video className="w-3.5 h-3.5" />
                <span>Google Meet</span>
              </div>
            </div>

            <CalendlyWidget
              url="https://calendly.com/brayanelcrack2302/30min"
              height="720px"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
