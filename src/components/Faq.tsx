"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import { UI_COPY, getFaqs } from "@/data/translations";
import { TextReveal } from "./TextReveal";

export function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const { lang } = usePreferences();
  const copy = UI_COPY[lang].faq;
  const faqs = getFaqs(lang);

  const toggleItem = (idx: number) => {
    setOpenIdx((current) => (current === idx ? null : idx));
  };

  return (
    <section id="faq" className="relative py-20 sm:py-28 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
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
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={faq.question}
                  className={`rounded-2xl glass-card transition-all duration-200 overflow-hidden ${isOpen
                    ? "border-purple-500/50 shadow-[0_4px_24px_rgba(168,85,247,0.12)]"
                    : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
                    }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleItem(idx)}
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left cursor-pointer group"
                  >
                    <span className="font-semibold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                      {faq.question}
                    </span>
                    <div
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen
                        ? "bg-purple-500/15 text-purple-600 dark:text-purple-300 rotate-180"
                        : "bg-slate-100 dark:bg-white/[0.04] text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                        }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 pt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300/90 leading-relaxed border-t border-slate-100 dark:border-white/[0.05]">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
    </section>
  );
}
