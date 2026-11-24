"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TechBadge } from "@/components/TechBadge";
import { Pipeline } from "@/components/Pipeline";
import { CONTACT_INFO } from "@/data/portfolio";
import { UI_COPY, getBentoProjects } from "@/data/translations";
import { usePreferences } from "@/context/PreferencesContext";

export function ProjectDetailClient({ id }: { id: string }) {
  const { lang } = usePreferences();
  const isEs = lang === "es";
  const copy = UI_COPY[lang].bento;
  const projects = getBentoProjects(lang);
  const project = projects.find((p) => p.id === id) || projects[0];
  const otherProjects = projects.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <main className="flex-1 pt-36 pb-20 sm:pt-44 sm:pb-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Top Breadcrumb & Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/#trabajos"
              className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isEs ? "Volver a proyectos" : "Back to projects"}</span>
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href="/agendar"
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-medium glass-card border border-slate-200 dark:border-white/15 hover:border-purple-400/50 transition-colors cursor-pointer"
              >
                {isEs ? "Agendar 30 min" : "Schedule 30 min"}
              </Link>
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-all cursor-pointer"
              >
                <span>{copy.modalCta}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Project Hero */}
          <div className="space-y-4 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/25">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{project.category}</span>
              </span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                &bull; {project.format}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              {project.title}
            </h1>

            <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.subtitle}
            </p>
          </div>

          {/* Main 2-Column Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Main Showcase (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {project.id === "widestep" ? (
                <Pipeline />
              ) : (
                <div className="rounded-3xl p-6 sm:p-10 glass-card border border-slate-200 dark:border-white/10 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        {isEs ? "Arquitectura y Solución Técnica" : "Architecture & Technical Solution"}
                      </h2>
                    </div>
                    <span className="text-xs font-mono text-purple-600 dark:text-purple-400">
                      {project.format}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
                      <span className="text-xs font-mono uppercase text-purple-600 dark:text-purple-400 font-semibold">
                        {isEs ? "Enfoque del Proyecto" : "Project Focus"}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {isEs
                          ? "Diseñado y programado desde cero con foco en velocidad de carga, UX intuitiva y conversión directa."
                          : "Designed and engineered from scratch focusing on load speed, intuitive UX, and direct conversion."}
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
                      <span className="text-xs font-mono uppercase text-emerald-600 dark:text-emerald-400 font-semibold">
                        {isEs ? "Entrega & Escalabilidad" : "Delivery & Scalability"}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {isEs
                          ? "Arquitectura modular con soporte multilenguaje, rendimiento optimizado y despliegue continuo."
                          : "Modular architecture with multilingual support, optimized performance, and continuous deployment."}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar (4 cols) */}
            <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-32">
              <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-white/10 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-purple-600 dark:text-purple-400 font-semibold">
                  {isEs ? "Resumen Ejecutivo" : "Executive Summary"}
                </span>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-white/10 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
                  {copy.modalResults}
                </span>
                <div className="space-y-2.5">
                  {project.results.map((res) => (
                    <div
                      key={res}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-white/10 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                  Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <TechBadge key={tech} name={tech} size="md" />
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {/* More Projects Navigation */}
          <section className="pt-10 border-t border-slate-200 dark:border-white/10 space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {isEs ? "Otros casos y proyectos" : "More case studies"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {otherProjects.map((item) => (
                <Link
                  key={item.id}
                  href={`/proyectos/${item.id}`}
                  className="group p-6 rounded-2xl glass-card glass-card-hover border border-slate-200 dark:border-white/10 flex flex-col justify-between gap-4 cursor-pointer"
                >
                  <div>
                    <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">
                      {item.subtitle}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400">
                    <span>{isEs ? "Ver caso completo" : "View full case"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
