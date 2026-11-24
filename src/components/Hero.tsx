"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  MessageSquare,
  Check,
  Copy,
  Globe,
  Clock,
  Zap,
} from "lucide-react";
import { CLIENTS_SOCIAL_PROOF } from "@/data/portfolio";
import { usePreferences } from "@/context/PreferencesContext";
import { UI_COPY, getHeroMetrics } from "@/data/translations";
import { GradientWaves } from "./GradientWaves";
import { TextReveal } from "./TextReveal";
import ColorBends from "./ColorBends";

const CODE_TABS = [
  {
    id: "n8n",
    label: "n8n-ai-pipeline.ts",
    code: `// Flujo B2B: Lead WhatsApp -> IA -> Supabase CRM
export async function processInboundLead(payload: WebhookEvent) {
  const qualified = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: "Califica presupuesto y urgencia" },
               { role: "user", content: payload.message }],
  });

  await supabase.from("leads").insert({
    source: "whatsapp_automation",
    score: qualified.score,
    status: "ready_to_close",
  });

  return { ok: true, latencyMs: 142 };
}`,
  },
  {
    id: "nextjs",
    label: "NextLanding.tsx",
    code: `// Landing Page de Alta Conversión (Next.js + Motion)
export function ConversionHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card border-purple-500/30"
    >
      <Badge>99 Lighthouse Performance</Badge>
      <h1>Convierte tráfico frío en clientes B2B</h1>
      <PrimaryButton href="#contacto">Escalar ahora</PrimaryButton>
    </motion.section>
  );
}`,
  },
];

export function Hero() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const { lang } = usePreferences();
  const copy = UI_COPY[lang].hero;
  const metrics = getHeroMetrics(lang);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(CODE_TABS[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
      {/* Background: ColorBends Dynamic Shader Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-45 dark:opacity-65 overflow-hidden">
        <ColorBends
          colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
          rotation={90}
          speed={0.2}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1}
          noise={0.15}
          parallax={0.5}
          iterations={1}
          intensity={1.5}
          bandWidth={6}
          transparent
        />
      </div>
      <GradientWaves className="absolute inset-0" intensity="normal" />

      {/* Smooth bottom fade into page background so there is no hard horizontal seam */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 sm:h-48 bg-gradient-to-b from-transparent to-[var(--background)] z-[1]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Availability Status */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-medium text-emerald-700 dark:text-emerald-300 mb-6 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>{copy.pill}</span>
        </div>

        {/* Social Proof Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="flex -space-x-2.5">
            {CLIENTS_SOCIAL_PROOF.map((client) => (
              <a
                key={client.name}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${client.name} (visitar)`}
                aria-label={`Visitar sitio de ${client.name}`}
                className="group relative w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-2 ring-white dark:ring-[#050505] hover:ring-purple-500 bg-white dark:bg-[#111118] overflow-hidden flex items-center justify-center shadow-md hover:scale-125 hover:z-20 transition-all duration-200 cursor-pointer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={client.logo}
                  alt={client.name}
                  width={36}
                  height={36}
                  className="w-full h-full object-cover group-hover:brightness-105 transition-all"
                  loading="eager"
                />
              </a>
            ))}
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            {copy.exClients}{" "}
            <span className="font-medium text-slate-900 dark:text-slate-200">
              {CLIENTS_SOCIAL_PROOF.map((client, idx) => (
                <React.Fragment key={client.name}>
                  <a
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-purple-600 dark:hover:text-purple-400 underline decoration-slate-300 dark:decoration-white/20 hover:decoration-purple-500 transition-colors cursor-pointer"
                  >
                    {client.name}
                  </a>
                  {idx < CLIENTS_SOCIAL_PROOF.length - 1 ? ", " : ""}
                </React.Fragment>
              ))}
            </span>
          </p>
        </div>

        {/* Giant Headline with TextReveal */}
        <TextReveal>
          <h1
            className="font-bold tracking-tight text-slate-900 dark:text-white max-w-5xl leading-[1.04]"
            style={{ fontSize: "clamp(2.3rem, 6.5vw, 6.25rem)" }}
          >
            {copy.headlinePrefix}{" "}
            <span className="bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-500 dark:from-purple-300 dark:via-purple-500 dark:to-indigo-400 bg-clip-text text-transparent">
              {copy.headlineAccent}
            </span>
          </h1>
        </TextReveal>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-xl text-slate-600 dark:text-slate-300/90 max-w-2xl leading-relaxed">
          {copy.subtitleStart}{" "}
          <strong className="text-slate-950 dark:text-white font-semibold">
            Brayan Pulido
          </strong>
          . {copy.subtitleBody}
        </p>

        {/* Metrics Row */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {metrics.map((metric, idx) => (
            <div
              key={metric.label}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-slate-200 dark:border-white/10"
            >
              {idx === 0 && (
                <Clock className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              )}
              {idx === 1 && (
                <Zap className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              )}
              {idx === 2 && (
                <Globe className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              )}
              <span>{metric.label}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#trabajos"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border border-purple-400/30 shadow-[0_0_32px_rgba(139,92,246,0.4)] hover:shadow-[0_0_45px_rgba(168,85,247,0.65)] transition-all cursor-pointer"
          >
            {copy.ctaPrimary}
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-100 glass-card hover:bg-slate-900/[0.05] dark:hover:bg-white/[0.08] border border-slate-300 dark:border-white/15 hover:border-purple-400/40 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            {copy.ctaSecondary}
          </a>
        </div>

        {/* Code Terminal Container */}
        <div className="relative w-full max-w-4xl mt-14">
          <div
            aria-hidden="true"
            className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-purple-600/25 via-violet-600/15 to-indigo-600/25 blur-2xl opacity-70"
          />

          <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 dark:border-white/15 bg-[#09090d]/95 backdrop-blur-2xl shadow-2xl text-left">
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
              </div>

              <div className="flex items-center gap-1.5">
                {CODE_TABS.map((tab, idx) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`px-3 py-1 rounded-lg text-xs transition-colors cursor-pointer ${
                      activeTab === idx
                        ? "bg-purple-500/20 text-purple-200 border border-purple-500/30"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={handleCopy}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                  copied
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0, scale: 0.75, y: 2 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.75, y: -2 }}
                      transition={{ duration: 0.16 }}
                      className="inline-flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{copy.copied}</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.14 }}
                      className="inline-flex items-center gap-1.5"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{copy.copy}</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            <div className="p-5 sm:p-6 overflow-x-auto">
              <pre className="text-xs sm:text-sm leading-relaxed text-slate-200">
                <code>{CODE_TABS[activeTab].code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
