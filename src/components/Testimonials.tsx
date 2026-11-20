"use client";

import React from "react";
import { Hash } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import { UI_COPY, getTestimonials } from "@/data/translations";
import { TextReveal } from "./TextReveal";
import { CircleFlag } from "./CircleFlag";

export function Testimonials() {
  const { lang } = usePreferences();
  const copy = UI_COPY[lang].testimonials;
  const testimonials = getTestimonials(lang);

  return (
    <section className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl p-6 glass-card glass-card-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 pb-4 mb-5 border-b border-slate-200 dark:border-white/10">
                  <span className="inline-flex items-center gap-1 text-purple-700 dark:text-purple-300">
                    <Hash className="w-3.5 h-3.5" />
                    {item.channel.replace(/^#/, "")}
                  </span>
                  <span>{item.time}</span>
                </div>

                <p className="text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.avatarGradient} flex items-center justify-center text-xs font-bold text-white shrink-0`}
                >
                  {item.avatarInitials}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-slate-900 dark:text-white text-sm truncate">
                      {item.author}
                    </span>
                    <CircleFlag
                      countryCode={item.countryCode || "un"}
                      size={15}
                      title={item.country}
                    />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {item.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
