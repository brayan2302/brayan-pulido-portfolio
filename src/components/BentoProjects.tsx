"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { CONTACT_INFO } from "@/data/portfolio";
import { usePreferences } from "@/context/PreferencesContext";
import { UI_COPY, getBentoProjects } from "@/data/translations";
import { TechBadge } from "./TechBadge";
import { TextReveal } from "./TextReveal";

export function BentoProjects() {
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

        {/* Bento Grid — Each project links to its own /proyectos/[id] route */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
          {projects.map((project) => {
            const spanClass =
              project.size === "featured"
                ? "md:col-span-4 md:row-span-2"
                : project.size === "medium"
                ? "md:col-span-3"
                : "md:col-span-2";

            return (
              <Link
                key={project.id}
                href={`/proyectos/${project.id}`}
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
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
