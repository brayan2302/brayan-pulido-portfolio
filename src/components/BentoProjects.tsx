"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Sparkles, Workflow, Zap } from "lucide-react";
import { CLIENTS_SOCIAL_PROOF, CONTACT_INFO } from "@/data/portfolio";
import { usePreferences } from "@/context/PreferencesContext";
import { UI_COPY, getBentoProjects } from "@/data/translations";
import { TextReveal } from "./TextReveal";

function ProjectCardVisual({ id, isEs }: { id: string; isEs: boolean }) {
  if (id === "widestep") {
    return (
      <div className="w-full max-w-[260px] space-y-2 -rotate-1 group-hover:rotate-0 transition-transform duration-300">
        <div className="p-3 rounded-xl bg-white dark:bg-[#14141e] border border-slate-200/90 dark:border-white/15 shadow-md flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
              n8n
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-slate-900 dark:text-white truncate">
                Listicle #1042
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                JSON &rarr; UTF-8 HTML
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold shrink-0">
            {isEs ? "Listo ✓" : "Done ✓"}
          </span>
        </div>
        <div className="ml-4 px-3 py-1.5 rounded-lg bg-white/95 dark:bg-[#14141e]/90 border border-emerald-500/35 shadow-sm flex items-center justify-between">
          <span className="text-[10px] font-medium text-slate-700 dark:text-slate-300">
            /api/preview &bull; Proxy
          </span>
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
            200 OK
          </span>
        </div>
      </div>
    );
  }

  if (id === "kimmon") {
    return (
      <div className="w-full max-w-[260px] space-y-2 rotate-1 group-hover:rotate-0 transition-transform duration-300">
        <div className="flex flex-wrap gap-1.5 justify-center">
          {["Figma UI", "Next.js", "LinkedIn B2B"].map((chip) => (
            <span
              key={chip}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#14141e] border border-slate-200 dark:border-white/15 shadow-xs text-[10px] font-semibold text-slate-700 dark:text-slate-200"
            >
              {chip}
            </span>
          ))}
        </div>
        <div className="p-3 rounded-xl bg-white dark:bg-[#14141e] border border-emerald-500/35 shadow-md flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-900 dark:text-white">
              {isEs ? "Conversión B2B +42%" : "B2B Conversion +42%"}
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              {isEs ? "Prospección automatizada" : "Automated outreach"}
            </p>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold">
            Verified ✓
          </span>
        </div>
      </div>
    );
  }

  if (id === "creandovisual") {
    return (
      <div className="w-full max-w-[260px] space-y-2 -rotate-1 group-hover:rotate-0 transition-transform duration-300">
        <div className="p-3 rounded-xl bg-white dark:bg-[#14141e] border border-purple-400/30 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-slate-900 dark:text-white">
                99 Lighthouse Score
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                ImageKit CDN &bull; AVIF
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-purple-600 text-white text-[10px] font-bold">
            Fast
          </span>
        </div>
        <div className="mr-4 px-3 py-1.5 rounded-lg bg-white/95 dark:bg-[#14141e]/90 border border-emerald-500/35 shadow-sm flex items-center justify-between">
          <span className="text-[10px] font-medium text-slate-700 dark:text-slate-300">
            {isEs ? "Agenda directa WhatsApp" : "Direct WhatsApp booking"}
          </span>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
        </div>
      </div>
    );
  }

  if (id === "reels-tiktok") {
    return (
      <div className="w-full max-w-[260px] space-y-2 rotate-1 group-hover:rotate-0 transition-transform duration-300">
        <div className="grid grid-cols-4 gap-1.5 text-center">
          {["0:03", "B-Roll", "SFX", "CTA"].map((step, i) => (
            <div
              key={step}
              className={`py-1.5 rounded-lg text-[10px] font-bold shadow-xs ${
                i === 0
                  ? "bg-purple-600 text-white"
                  : "bg-white dark:bg-[#14141e] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/15"
              }`}
            >
              {step}
            </div>
          ))}
        </div>
        <div className="p-2.5 rounded-xl bg-white dark:bg-[#14141e] border border-emerald-500/35 shadow-md flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-900 dark:text-white">
            {isEs ? "Retención 3 primeros seg." : "First 3s Retention"}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold">
            High CTR ✓
          </span>
        </div>
      </div>
    );
  }

  if (id === "n8n-flows") {
    return (
      <div className="w-full max-w-[260px] space-y-2 -rotate-1 group-hover:rotate-0 transition-transform duration-300">
        <div className="p-3 rounded-xl bg-white dark:bg-[#14141e] border border-purple-400/30 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Workflow className="w-4 h-4 text-[#ea4b71] shrink-0" />
            <span className="text-[11px] font-bold text-slate-900 dark:text-white">
              WhatsApp &rarr; OpenAI
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold">
            &lt; 10s ✓
          </span>
        </div>
        <div className="ml-4 px-3 py-1.5 rounded-lg bg-white/95 dark:bg-[#14141e]/90 border border-slate-200 dark:border-white/15 shadow-sm flex items-center justify-between">
          <span className="text-[10px] font-medium text-slate-700 dark:text-slate-300">
            {isEs ? "Sync CRM automático 24/7" : "24/7 Auto CRM Sync"}
          </span>
          <Zap className="w-3.5 h-3.5 text-amber-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[260px] space-y-2 rotate-1 group-hover:rotate-0 transition-transform duration-300">
      <div className="p-3 rounded-xl bg-white dark:bg-[#14141e] border border-purple-400/30 shadow-md flex items-center justify-between">
        <span className="text-[11px] font-bold text-slate-900 dark:text-white">
          Next.js 16 + Motion
        </span>
        <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold">
          60 FPS ✓
        </span>
      </div>
      <div className="mr-4 px-3 py-1.5 rounded-lg bg-white/95 dark:bg-[#14141e]/90 border border-slate-200 dark:border-white/15 shadow-sm flex items-center justify-between">
        <span className="text-[10px] font-medium text-slate-700 dark:text-slate-300">
          {isEs ? "UI Modular & Dark Mode" : "Modular UI & Dark Mode"}
        </span>
        <span className="text-[10px] font-mono font-bold text-purple-600 dark:text-purple-400">
          Ready
        </span>
      </div>
    </div>
  );
}

export function BentoProjects() {
  const { lang } = usePreferences();
  const copy = UI_COPY[lang].bento;
  const projects = getBentoProjects(lang);
  const isEs = lang === "es";

  return (
    <section id="trabajos" className="relative py-16 sm:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brands & Teams Strip ABOVE Projects */}
        <div className="pb-14 mb-14 border-b border-slate-200 dark:border-white/10">
          <p className="text-center text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-7">
            {isEs
              ? "Marcas y equipos que han confiado en mi trabajo"
              : "Brands & teams that have trusted my work"}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
            {CLIENTS_SOCIAL_PROOF.map((brand) => (
              <a
                key={brand.name}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                title={brand.name}
                className="group flex items-center gap-3 opacity-70 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 dark:border-white/15 bg-white shadow-sm shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <span className="text-base sm:text-lg font-bold tracking-tight text-slate-600 dark:text-slate-300 group-hover:text-slate-950 dark:group-hover:text-white transition-colors">
                  {brand.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
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

          <a
            href={CONTACT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card border border-slate-300 dark:border-white/15 hover:border-purple-400/40 text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white transition-all self-start md:self-auto cursor-pointer"
          >
            {copy.cta}
            <ArrowUpRight className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </a>
        </div>

        {/* Clean SaaS-Style Cards Grid (Visual Top Box + Uppercase Category + Title + Desc + Pill CTA) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/proyectos/${project.id}`}
              className="group rounded-3xl bg-white dark:bg-[#0e0e14] border border-slate-200/90 dark:border-white/10 shadow-[0_8px_30px_rgba(15,23,42,0.04)] dark:shadow-none hover:shadow-[0_16px_40px_rgba(139,92,246,0.12)] hover:border-purple-400/50 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
            >
              {/* Soft Purple Top Visual Container */}
              <div className="h-44 sm:h-48 px-5 py-4 bg-gradient-to-br from-purple-100/90 via-violet-50 to-indigo-100/60 dark:from-purple-950/50 dark:via-[#141422] dark:to-indigo-950/40 flex items-center justify-center border-b border-slate-100 dark:border-white/10 overflow-hidden">
                <ProjectCardVisual id={project.id} isEs={isEs} />
              </div>

              {/* Bottom Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="block text-[11px] font-mono uppercase tracking-wider text-purple-600 dark:text-purple-400 font-semibold mb-2">
                    {project.category}
                  </span>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug mb-2.5 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {project.subtitle}
                  </p>
                </div>

                <div>
                  <span className="inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-medium border border-slate-300 dark:border-white/15 text-slate-800 dark:text-slate-200 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600 transition-all">
                    {isEs ? "ver cómo funciona" : "see how it works"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
