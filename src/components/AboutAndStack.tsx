"use client";

import React from "react";
import { ShieldCheck, Globe2, Wifi } from "lucide-react";
import { TECH_STACK_ITEMS } from "@/data/portfolio";
import { usePreferences } from "@/context/PreferencesContext";
import { UI_COPY } from "@/data/translations";
import { TechBadge } from "./TechBadge";
import { TextReveal } from "./TextReveal";

const HIGHLIGHT_ICONS = [
  <Globe2 key="g" className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
  <Wifi key="w" className="w-5 h-5 text-violet-600 dark:text-violet-400" />,
  <ShieldCheck
    key="s"
    className="w-5 h-5 text-emerald-600 dark:text-emerald-400"
  />,
];

export function AboutAndStack() {
  const { lang } = usePreferences();
  const copy = UI_COPY[lang].about;

  return (
    <section id="sobre-mi" className="relative py-20 sm:py-28 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
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

            <p className="mt-5 text-slate-600 dark:text-slate-300/90 text-base sm:text-lg leading-relaxed">
              {copy.bioStart}{" "}
              <strong className="text-slate-950 dark:text-white">
                Brayan Pulido
              </strong>
              , {copy.bioBody}
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {copy.highlights.map((item, idx) => (
                <div
                  key={item.title}
                  className="p-4 rounded-xl glass-card border border-slate-200 dark:border-white/10"
                >
                  <div className="mb-2.5">{HIGHLIGHT_ICONS[idx]}</div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl p-6 sm:p-8 glass-card border border-purple-500/25 overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-purple-600/15 dark:bg-purple-600/20 blur-3xl"
              />

              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono uppercase tracking-wider text-purple-700 dark:text-purple-300">
                  {copy.stackTitle}
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {TECH_STACK_ITEMS.length} {copy.stackCount}
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5 relative z-10">
                {TECH_STACK_ITEMS.map((item) => (
                  <TechBadge key={item.name} name={item.name} size="md" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
