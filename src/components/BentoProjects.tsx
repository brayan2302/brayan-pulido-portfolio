"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  X,
  Sparkles,
} from "lucide-react";
import { CONTACT_INFO, type BentoProject } from "@/data/portfolio";
import { usePreferences } from "@/context/PreferencesContext";
import { UI_COPY, getBentoProjects } from "@/data/translations";
import { TechBadge } from "./TechBadge";
import { TextReveal } from "./TextReveal";
import { Pipeline } from "./Pipeline";

export function BentoProjects() {
  const [selected, setSelected] = useState<BentoProject | null>(null);
  const { lang } = usePreferences();
  const copy = UI_COPY[lang].bento;
  const projects = getBentoProjects(lang);

  return (
    <section id="trabajos" className="relative py-20 sm:py-28 scroll-mt-20">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-600 dark:text-purple-400 font-semibold mb-3 inline-block">
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

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
          {projects.map((project) => {
            const spanClass =
              project.size === "featured"
                ? "md:col-span-4 md:row-span-2"
                : project.size === "medium"
                ? "md:col-span-3"
                : "md:col-span-2";

            return (
              <button
                key={project.id}
                type="button"
                onClick={() => setSelected(project)}
                className={`group relative text-left rounded-2xl p-6 sm:p-7 glass-card glass-card-hover overflow-hidden flex flex-col justify-between cursor-pointer ${spanClass}`}
              >
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-40 dark:opacity-60 group-hover:opacity-80 dark:group-hover:opacity-100 transition-opacity`}
                />

                <div className="relative z-10 w-full">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-purple-500/10 dark:bg-white/[0.06] text-purple-800 dark:text-purple-200 border border-purple-500/20 dark:border-white/10">
                      {project.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-slate-500 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                      {project.format}
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>

                  <h3
                    className={`font-bold text-slate-900 dark:text-white mb-2.5 ${
                      project.size === "featured"
                        ? "text-2xl sm:text-3xl"
                        : "text-xl sm:text-2xl"
                    }`}
                  >
                    {project.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300/90 text-sm sm:text-base leading-relaxed mb-5">
                    {project.subtitle}
                  </p>

                  {project.size === "featured" && (
                    <div className="mb-6 space-y-2.5 p-4 rounded-xl bg-white/70 dark:bg-black/35 border border-slate-200 dark:border-white/10">
                      <p className="text-xs font-mono uppercase tracking-wider text-purple-700 dark:text-purple-300">
                        {copy.featuredImpact}
                      </p>
                      {project.results.map((res) => (
                        <div
                          key={res}
                          className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{res}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative z-10 pt-4 border-t border-slate-200 dark:border-white/10 w-full flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <TechBadge key={tech} name={tech} size="sm" />
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Case Study Full-Screen Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-black/85 backdrop-blur-xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[1500px] h-[94vh] max-h-[94vh] rounded-3xl bg-[#0b0b12] border border-purple-500/30 shadow-[0_0_80px_rgba(139,92,246,0.3)] flex flex-col overflow-hidden text-left"
            >
              {/* Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-8 py-4 border-b border-white/10 bg-[#101018]/90 backdrop-blur-md shrink-0">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-purple-500/15 text-purple-300 border border-purple-500/30">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>{selected.category}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                    &bull; {selected.format}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={CONTACT_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all cursor-pointer"
                  >
                    <span>{copy.modalCta}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    aria-label="Cerrar detalle"
                    onClick={() => setSelected(null)}
                    className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body - 2 Columns on Desktop */}
              <div className="flex-1 overflow-y-auto lg:overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-6 lg:p-8">
                {/* Col 1: Main Interactive Showcase (8 Cols) */}
                <div className="lg:col-span-8 flex flex-col h-full lg:overflow-y-auto pr-0 lg:pr-3 space-y-5">
                  <div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2 font-sans">
                      {selected.title}
                    </h2>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      {selected.subtitle}
                    </p>
                  </div>

                  {/* Interactive Showcase */}
                  {selected.id === "widestep" ? (
                    <Pipeline />
                  ) : (
                    <div className="rounded-2xl border border-white/10 bg-[#12121c] p-6 sm:p-8 space-y-6">
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
                          <h4 className="text-base sm:text-lg font-bold text-white font-sans">
                            Arquitectura y Solución Técnica
                          </h4>
                        </div>
                        <span className="text-xs font-mono text-purple-400">
                          {selected.format}
                        </span>
                      </div>

                      <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                        {selected.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                          <span className="text-xs font-mono uppercase text-purple-400 font-semibold">
                            Enfoque del Proyecto
                          </span>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            Diseñado y programado desde cero con foco en velocidad de carga, UX intuitiva y conversión directa de tráfico frío.
                          </p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                          <span className="text-xs font-mono uppercase text-emerald-400 font-semibold">
                            Entrega & Escalabilidad
                          </span>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            Arquitectura modular con soporte multilenguaje, modo oscuro, optimización SEO/GEO y despliegue continuo.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Col 2: Executive Details & Specs (4 Cols) */}
                <div className="lg:col-span-4 flex flex-col gap-5 lg:overflow-y-auto pl-0 lg:pl-3">
                  {/* Executive Summary Card */}
                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-semibold">
                      Resumen Ejecutivo
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {selected.description}
                    </p>
                  </div>

                  {/* Key Results Card */}
                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                      {copy.modalResults}
                    </span>
                    <div className="space-y-2.5">
                      {selected.results.map((res) => (
                        <div
                          key={res}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{res}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Card */}
                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                      Stack Tecnológico
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selected.stack.map((tech) => (
                        <TechBadge key={tech} name={tech} size="md" />
                      ))}
                    </div>
                  </div>

                  {/* Contact Callout Card */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-900/30 via-violet-900/20 to-black/40 border border-purple-500/30 text-center space-y-3">
                    <h5 className="font-bold text-sm text-white">
                      ¿Necesitas un sistema similar?
                    </h5>
                    <p className="text-xs text-slate-300">
                      Puedo diseñar y automatizar una solución a la medida de tu equipo u operación en tiempo récord.
                    </p>
                    <a
                      href={CONTACT_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-lg shadow-purple-500/25 cursor-pointer"
                    >
                      <span>Cotizar por WhatsApp</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
