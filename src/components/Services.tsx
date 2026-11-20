"use client";

import React from "react";
import { Bot, Code2, Video, ArrowUpRight, Sparkles } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import { UI_COPY, getServices } from "@/data/translations";
import { TechBadge } from "./TechBadge";
import { TextReveal } from "./TextReveal";

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "ai-automation": (
    <Bot className="w-6 h-6 text-purple-600 dark:text-purple-400" />
  ),
  "web-dev": (
    <Code2 className="w-6 h-6 text-violet-600 dark:text-violet-400" />
  ),
  "video-email": (
    <Video className="w-6 h-6 text-fuchsia-600 dark:text-fuchsia-400" />
  ),
};

export function Services() {
  const { lang } = usePreferences();
  const copy = UI_COPY[lang].services;
  const services = getServices(lang);

  return (
    <section id="servicios" className="relative py-20 sm:py-28 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-violet-600 dark:text-violet-400 font-semibold mb-3 inline-block">
            {copy.badge}
          </span>
          <TextReveal>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              {copy.titleStart}{" "}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-500 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                {copy.titleAccent}
              </span>
            </h2>
          </TextReveal>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
            {copy.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <article
              key={service.id}
              className="group relative rounded-2xl p-7 glass-card glass-card-hover flex flex-col justify-between overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-purple-600/10 dark:bg-purple-600/15 blur-3xl group-hover:bg-purple-500/20 dark:group-hover:bg-purple-500/25 transition-colors"
              />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center">
                    {SERVICE_ICONS[service.id] ?? (
                      <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    )}
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25">
                    {service.metric}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {service.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div className="pt-5 border-t border-slate-200 dark:border-white/10 flex items-end justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <TechBadge key={tag} name={tag} size="sm" />
                  ))}
                </div>

                <a
                  href="#contacto"
                  aria-label={service.title}
                  className="shrink-0 w-9 h-9 rounded-full bg-slate-900/[0.04] dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:text-purple-700 dark:group-hover:text-white group-hover:bg-purple-500/15 dark:group-hover:bg-purple-600/30 group-hover:border-purple-400/40 transition-all cursor-pointer"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
