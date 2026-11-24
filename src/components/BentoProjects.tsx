"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Sparkles, Workflow, Zap } from "lucide-react";
import { CLIENTS_SOCIAL_PROOF, CONTACT_INFO } from "@/data/portfolio";
import { usePreferences } from "@/context/PreferencesContext";
import { UI_COPY, getBentoProjects } from "@/data/translations";
import { TechBadge } from "./TechBadge";
import { TextReveal } from "./TextReveal";

function ProjectMiniPreview({ id, isEs }: { id: string; isEs: boolean }) {
  if (id === "widestep") {
    return (
      <div className="mb-5 p-3.5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200/80 dark:border-white/10 space-y-2">
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white dark:bg-[#14141c] border border-emerald-500/30 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center text-[10px] font-bold">
              AI
            </span>
            <div>
              <p className="text-[11px] font-semibold text-slate-900 dark:text-white leading-tight">
                Listicle #1042 &bull; WideStep
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                n8n &rarr; UTF-8 Buffer &rarr; Storage
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold">
            {isEs ? "Completado ✓" : "Completed ✓"}
          </span>
        </div>
        <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/80 dark:bg-[#14141c]/70 border border-slate-200/70 dark:border-white/10">
          <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
            /api/preview &bull; Proxy CORS
          </span>
          <span className="px-2 py-0.5 rounded-md bg-purple-500/15 text-purple-700 dark:text-purple-300 text-[10px] font-semibold">
            Live
          </span>
        </div>
      </div>
    );
  }

  if (id === "kimmon") {
    return (
      <div className="mb-5 p-3.5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200/80 dark:border-white/10 space-y-2">
        <div className="flex flex-wrap gap-1.5">
          {["Figma UI", "Next.js", "LinkedIn B2B", "Framer"].map((chip) => (
            <span
              key={chip}
              className="px-2 py-0.5 rounded-md bg-white dark:bg-[#14141c] border border-slate-200 dark:border-white/10 text-[10px] font-medium text-slate-700 dark:text-slate-300"
            >
              {chip}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white dark:bg-[#14141c] border border-emerald-500/30 shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-slate-900 dark:text-white">
              {isEs ? "Conversión B2B +42%" : "B2B Conversion +42%"}
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              {isEs ? "Flujo optimizado en LinkedIn" : "Optimized LinkedIn funnel"}
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
      <div className="mb-5 p-3.5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200/80 dark:border-white/10 space-y-2">
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white dark:bg-[#14141c] border border-purple-500/25 shadow-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <div>
              <p className="text-[11px] font-bold text-slate-900 dark:text-white">
                99 Lighthouse Performance
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                ImageKit CDN &bull; WebP/AVIF
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-purple-600 text-white text-[10px] font-bold">
            Fast
          </span>
        </div>
        <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/80 dark:bg-[#14141c]/70 border border-emerald-500/30">
          <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300">
            {isEs ? "Cita directa por WhatsApp" : "Direct WhatsApp booking"}
          </span>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
        </div>
      </div>
    );
  }

  if (id === "reels-tiktok") {
    return (
      <div className="mb-5 p-3.5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200/80 dark:border-white/10 space-y-2">
        <div className="grid grid-cols-4 gap-1.5 text-center">
          {["0:03 Hook", "B-Roll", "SFX", "CTA"].map((step, i) => (
            <div
              key={step}
              className={`py-1.5 rounded-lg text-[10px] font-bold ${
                i === 0
                  ? "bg-purple-600 text-white"
                  : "bg-white dark:bg-[#14141c] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10"
              }`}
            >
              {step}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white dark:bg-[#14141c] border border-emerald-500/30">
          <span className="text-[11px] font-semibold text-slate-900 dark:text-white">
            {isEs ? "Retención inicial 3s" : "3s Initial Retention"}
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
      <div className="mb-5 p-3.5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200/80 dark:border-white/10 space-y-2">
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white dark:bg-[#14141c] border border-purple-500/25">
          <div className="flex items-center gap-2">
            <Workflow className="w-4 h-4 text-[#ea4b71]" />
            <span className="text-[11px] font-semibold text-slate-900 dark:text-white">
              WhatsApp &rarr; OpenAI &rarr; CRM
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold">
            &lt; 10s ✓
          </span>
        </div>
        <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/80 dark:bg-[#14141c]/70 border border-slate-200 dark:border-white/10">
          <span className="text-[11px] text-slate-600 dark:text-slate-300">
            {isEs ? "Calificación automática 24/7" : "24/7 Auto-Qualification"}
          </span>
          <Zap className="w-3.5 h-3.5 text-amber-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="mb-5 p-3.5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200/80 dark:border-white/10 space-y-2">
      <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white dark:bg-[#14141c] border border-purple-500/25">
        <span className="text-[11px] font-bold text-slate-900 dark:text-white">
          Next.js 16 + Framer Motion
        </span>
        <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold">
          60 FPS ✓
        </span>
      </div>
      <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/80 dark:bg-[#14141c]/70 border border-slate-200 dark:border-white/10">
        <span className="text-[11px] text-slate-600 dark:text-slate-300">
          {isEs ? "UI Modular & Dark Mode" : "Modular UI & Dark Mode"}
        </span>
        <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400">
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

        {/* Section Header (clean, no 01 / prefix) */}
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

        {/* Uniform 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/proyectos/${project.id}`}
              className="group relative text-left rounded-2xl p-6 glass-card glass-card-hover border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              <div className="relative z-10 w-full">
                {/* Mini Visual UI Preview */}
                <ProjectMiniPreview id={project.id} isEs={isEs} />

                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono text-purple-700 dark:text-purple-300 font-semibold">
                    {project.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                    {isEs ? "Ver caso" : "View case"}
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>

                <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                  {project.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-300/90 text-sm leading-relaxed mb-5">
                  {project.subtitle}
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-slate-200 dark:border-white/10 w-full flex flex-wrap gap-1.5">
                {project.stack.slice(0, 4).map((tech) => (
                  <TechBadge key={tech} name={tech} size="sm" />
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
