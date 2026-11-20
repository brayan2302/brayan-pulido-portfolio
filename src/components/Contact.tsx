"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  MessageCircle,
  CheckCircle2,
  Loader2,
  MapPin,
  Briefcase,
  Calendar,
} from "lucide-react";
import { CONTACT_INFO } from "@/data/portfolio";
import { usePreferences } from "@/context/PreferencesContext";
import { UI_COPY } from "@/data/translations";
import { GradientWaves } from "./GradientWaves";
import { TextReveal } from "./TextReveal";

export function Contact() {
  const { lang } = usePreferences();
  const copy = UI_COPY[lang].contact;

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [serviceIdx, setServiceIdx] = useState(0);
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [pastedField, setPastedField] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const startedAtRef = useRef(0);

  const service = copy.serviceOptions[serviceIdx] ?? copy.serviceOptions[0];

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  const triggerPasteFeedback = (field: string) => {
    setPastedField(field);
    setTimeout(() => {
      setPastedField((curr) => (curr === field ? null : curr));
    }, 900);
  };

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(CONTACT_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 1800);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError(copy.errorMsg);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          service,
          message,
          website: honeypot,
          startedAt: startedAtRef.current,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || copy.errorMsg);
        return;
      }

      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setError(copy.errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="relative py-20 sm:py-28 overflow-hidden scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-6 sm:p-12 glass-card border border-purple-500/30 overflow-hidden">
          <GradientWaves className="absolute inset-0" intensity="normal" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Direct Info & CTAs */}
            <div className="lg:col-span-5 text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-600 dark:text-purple-400 font-semibold mb-3 inline-block">
                {copy.badge}
              </span>

              <TextReveal>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {copy.titleStart}{" "}
                  <span className="bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-500 dark:from-purple-300 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    {copy.titleAccent}
                  </span>
                </h2>
              </TextReveal>

              <p className="mt-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {copy.subtitle}
              </p>

              <div className="mt-7 flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={CONTACT_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border border-purple-400/30 shadow-[0_0_28px_rgba(139,92,246,0.4)] transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <span>{copy.whatsappBtn}</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </a>

                  <Link
                    href="/agendar"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold text-slate-900 dark:text-white glass-card hover:bg-purple-500/10 border border-purple-500/35 hover:border-purple-400 transition-all cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                    <span>{lang === "es" ? "Agendar 30 min" : "Schedule 30 min"}</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </Link>
                </div>

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCopyEmail}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium glass-card border transition-all cursor-pointer ${
                    copiedEmail
                      ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                      : "text-slate-800 dark:text-slate-100 hover:bg-slate-900/[0.05] dark:hover:bg-white/[0.08] border-slate-300 dark:border-white/15 hover:border-purple-400/40"
                  }`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {copiedEmail ? (
                      <motion.span
                        key="copied"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.16 }}
                        className="inline-flex items-center gap-2"
                      >
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>{copy.emailCopied}</span>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.14 }}
                        className="inline-flex items-center gap-2 min-w-0"
                      >
                        <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                        <span className="truncate">{CONTACT_INFO.email}</span>
                        <Copy className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>

              <div className="mt-7 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="inline-flex items-center gap-1.5 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  {copy.sendEmail}
                </a>
                <span className="text-slate-300 dark:text-white/20">•</span>
                <a
                  href={CONTACT_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-purple-600 dark:text-purple-400"
                    aria-hidden="true"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" r="2" />
                  </svg>
                  LinkedIn
                </a>
                <span className="text-slate-300 dark:text-white/20">•</span>
                <a
                  href={CONTACT_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-purple-600 dark:text-purple-400"
                    aria-hidden="true"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  GitHub
                </a>
              </div>

              {/* Freelancer Platforms */}
              <div className="mt-6 pt-5 border-t border-slate-200 dark:border-white/10">
                <p className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 mb-3">
                  <Briefcase className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  <span>{copy.platformsTitle}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {CONTACT_INFO.freelancePlatforms.map((platform) => (
                    <a
                      key={platform.name}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-mono bg-slate-900/[0.04] dark:bg-white/[0.05] hover:bg-purple-500/15 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 hover:border-purple-400/40 transition-colors cursor-pointer"
                    >
                      <span>{platform.name}</span>
                      <ArrowUpRight className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Mini Map: La Victoria, Aragua */}
              <div className="mt-6 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30">
                <div className="px-3.5 py-2 flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.03]">
                  <MapPin className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                  <span className="truncate">{copy.locationTitle}</span>
                </div>
                <iframe
                  src={CONTACT_INFO.mapEmbedUrl}
                  title="Ubicación: La Victoria, Aragua, Venezuela"
                  width="400"
                  height="300"
                  className="w-full h-44 sm:h-48 border-0 grayscale-[20%] contrast-[1.05]"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7 rounded-2xl p-6 sm:p-8 bg-white/80 dark:bg-[#09090d]/85 border border-slate-200 dark:border-white/10 backdrop-blur-xl text-left shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-5">
                {copy.formTitle}
              </h3>

              {sent ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                    {copy.successTitle}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                    {copy.successBody}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="px-5 py-2.5 rounded-full text-xs font-semibold text-purple-700 dark:text-purple-200 bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 transition-colors cursor-pointer"
                  >
                    {copy.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Anti-bot honeypot */}
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-mono text-slate-600 dark:text-slate-300 mb-1.5"
                      >
                        {copy.nameLabel}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onPaste={() => triggerPasteFeedback("name")}
                        placeholder={copy.namePlaceholder}
                        required
                        className={`w-full rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-white/[0.04] border text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500 transition-all ${
                          pastedField === "name"
                            ? "border-purple-500 ring-2 ring-purple-500/30"
                            : "border-slate-200 dark:border-white/10"
                        }`}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-mono text-slate-600 dark:text-slate-300 mb-1.5"
                      >
                        {copy.emailLabel}
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onPaste={() => triggerPasteFeedback("email")}
                        placeholder={copy.emailPlaceholder}
                        required
                        className={`w-full rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-white/[0.04] border text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500 transition-all ${
                          pastedField === "email"
                            ? "border-purple-500 ring-2 ring-purple-500/30"
                            : "border-slate-200 dark:border-white/10"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-service"
                      className="block text-xs font-mono text-slate-600 dark:text-slate-300 mb-1.5"
                    >
                      {copy.serviceLabel}
                    </label>
                    <select
                      id="contact-service"
                      value={serviceIdx}
                      onChange={(e) => setServiceIdx(Number(e.target.value))}
                      className="w-full rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-[#111118] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors cursor-pointer"
                    >
                      {copy.serviceOptions.map((opt, idx) => (
                        <option key={opt} value={idx}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-mono text-slate-600 dark:text-slate-300 mb-1.5"
                    >
                      {copy.messageLabel}
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onPaste={() => triggerPasteFeedback("message")}
                      placeholder={copy.messagePlaceholder}
                      required
                      className={`w-full rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-white/[0.04] border text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500 transition-all resize-none ${
                        pastedField === "message"
                          ? "border-purple-500 ring-2 ring-purple-500/30"
                          : "border-slate-200 dark:border-white/10"
                      }`}
                    />
                  </div>

                  {error && (
                    <p className="text-xs text-rose-500 dark:text-rose-400">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_24px_rgba(139,92,246,0.35)] disabled:opacity-60 transition-all cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {copy.sendingBtn}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {copy.submitBtn}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
