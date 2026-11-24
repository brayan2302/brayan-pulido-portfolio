"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  CheckCircle2,
  Compass,
  ExternalLink,
  Rocket,
  ShieldCheck,
  User,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TechBadge } from "@/components/TechBadge";
import { CONTACT_INFO, TECH_STACK_ITEMS } from "@/data/portfolio";
import { usePreferences } from "@/context/PreferencesContext";

export default function SobreMiPage() {
  const { lang } = usePreferences();
  const isEs = lang === "es";

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <main className="flex-1 pt-36 pb-20 sm:pt-44 sm:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors mb-6 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isEs ? "Volver al inicio" : "Back to home"}</span>
            </Link>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              {isEs ? "Quién soy, qué busco y " : "Who I am, what I want & "}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-500 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                {isEs ? "hacia dónde voy." : "where I'm going."}
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              {isEs
                ? "Soy Brayan Pulido, ingeniero en automatización con IA y desarrollador Full-Stack desde La Victoria, Aragua (Venezuela). Llevo más de 6 años trabajando 100% remoto con startups, agencias y empresas B2B."
                : "I'm Brayan Pulido, an AI Automation Engineer & Full-Stack Developer based in La Victoria, Aragua (Venezuela), with 6+ years working 100% remotely with B2B teams, startups, and agencies."}
            </p>
          </div>

          {/* 3 Pillars: Quién soy / Qué quiero / Para dónde voy */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 sm:p-7 rounded-2xl glass-card border border-slate-200 dark:border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <User className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {isEs ? "Quién soy" : "Who I am"}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {isEs
                  ? "Un constructor híbrido que une desarrollo web moderno (Next.js, TypeScript, Supabase) con flujos inteligentes en n8n, IA generativa y edición visual de alto impacto. Resuelvo problemas complejos con autonomía total."
                  : "A hybrid builder combining modern web engineering (Next.js, TypeScript, Supabase) with smart n8n workflows, generative AI, and high-retention visual storytelling. Built for autonomous remote execution."}
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl glass-card border border-slate-200 dark:border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Compass className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {isEs ? "Qué quiero" : "What I want"}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {isEs
                  ? "Colaborar con equipos y fundadores ambiciosos que quieran eliminar trabajo manual repetitivo, lanzar productos SaaS o landings de alta conversión en semanas y escalar sus ventas con sistemas medibles."
                  : "Partner with ambitious founders and teams looking to eliminate repetitive manual ops, ship high-converting SaaS MVPs or landing pages in weeks, and scale with measurable systems."}
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl glass-card border border-slate-200 dark:border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Rocket className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {isEs ? "Para dónde voy" : "Where I'm going"}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {isEs
                  ? "Consolidarme como referente en arquitectura de Agentes de IA y plataformas No-Code/Full-Stack para empresas globales, creando ecosistemas autónomos que operen 24/7 sin fricción."
                  : "Becoming a go-to architect for production AI Agents and hybrid No-Code/Full-Stack B2B systems for global companies—building autonomous pipelines that run 24/7."}
              </p>
            </div>
          </div>

          {/* Licencias y certificaciones */}
          <section className="rounded-3xl p-6 sm:p-10 glass-card border border-purple-500/25 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-5">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                  <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  <span>
                    {isEs ? "Licencias y certificaciones" : "Licenses & Certifications"}
                  </span>
                </h2>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25 text-xs font-mono self-start sm:self-center">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isEs ? "Credencial Oficial" : "Official Credential"}</span>
              </span>
            </div>

            {/* Airtable Certification Card */}
            <div className="p-6 rounded-2xl bg-white/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                    {/* Airtable emblem */}
                    <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
                      <path fill="#FCB400" d="M11.99 2L2.5 5.8v1.1l9.49 3.8 9.51-3.8V5.8L11.99 2z" />
                      <path fill="#18BFFF" d="M2.5 8.15v8.2l8.6 3.45v-8.2L2.5 8.15z" />
                      <path fill="#F82B60" d="M21.5 8.15l-8.6 3.45v8.2l8.6-3.45v-8.2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      Airtable No Code AI App Builder Certification
                    </h3>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Airtable
                    </p>
                  </div>
                </div>

                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-1 pl-1">
                  <p>
                    {isEs
                      ? "Expedición: jul. de 2026 · Vencimiento: ago. de 2028"
                      : "Issued: Jul 2026 · Expires: Aug 2028"}
                  </p>
                  <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
                    {isEs ? "ID de la credencial:" : "Credential ID:"}{" "}
                    <span className="text-slate-800 dark:text-slate-200 font-semibold">
                      qyzi7xt9rey3
                    </span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {isEs ? "Aptitudes:" : "Skills:"}
                  </span>
                  <a
                    href="https://www.linkedin.com/in/brayanpoficial/overlay/1068110141/skill-associations-details/?associationType=certifications"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/25 hover:bg-purple-500/20 transition-colors cursor-pointer"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{isEs ? "Automatización" : "Automation"}</span>
                  </a>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
                <a
                  href="https://verify.skilljar.com/c/qyzi7xt9rey3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-all cursor-pointer"
                >
                  <span>{isEs ? "Mostrar credencial" : "Show credential"}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>

          {/* Stack Técnico */}
          <section className="space-y-5">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {isEs ? "Herramientas & Stack" : "Tools & Stack"}
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {TECH_STACK_ITEMS.map((item) => (
                <TechBadge key={item.name} name={item.name} size="md" />
              ))}
            </div>
          </section>

          {/* CTA Final */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-600/10 via-violet-600/10 to-indigo-600/10 border border-purple-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {isEs
                  ? "¿Listo para automatizar o lanzar tu próximo proyecto?"
                  : "Ready to automate or launch your next project?"}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                {isEs
                  ? "Agenda una llamada de 30 minutos o escríbeme directo por WhatsApp."
                  : "Schedule a 30-min call or message me directly on WhatsApp."}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/agendar"
                className="px-5 py-2.5 rounded-full text-sm font-semibold glass-card border border-purple-500/35 text-slate-900 dark:text-white hover:bg-purple-500/10 transition-colors cursor-pointer"
              >
                {isEs ? "Agendar 30 min" : "Schedule 30 min"}
              </Link>
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all cursor-pointer"
              >
                <span>WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
