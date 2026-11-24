"use client";

import React from "react";
import { Star } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import { UI_COPY, getTestimonials } from "@/data/translations";
import { TextReveal } from "./TextReveal";
import { CircleFlag } from "./CircleFlag";

export function Testimonials() {
  const { lang } = usePreferences();
  const copy = UI_COPY[lang].testimonials;
  const testimonials = getTestimonials(lang);

  const rotations = ["md:-rotate-1", "md:translate-y-3 md:rotate-1", "md:-rotate-1"];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Header (no 04 / prefix) */}
        <div className="max-w-2xl mb-14">
          <TextReveal>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              {copy.titleStart}{" "}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-500 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                {copy.titleAccent}
              </span>
            </h2>
          </TextReveal>
        </div>

        {/* Floating Cards Showcase (5-star reviews style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-4">
          {testimonials.map((item, idx) => (
            <article
              key={item.id}
              className={`rounded-2xl p-6 bg-white dark:bg-[#0e0e14] border border-slate-200/90 dark:border-white/10 shadow-[0_12px_35px_rgba(15,23,42,0.06)] dark:shadow-[0_12px_35px_rgba(0,0,0,0.45)] hover:rotate-0 hover:-translate-y-1 hover:border-purple-400/50 transition-all duration-300 flex flex-col justify-between ${
                rotations[idx % rotations.length]
              }`}
            >
              <div>
                {/* Author Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-11 h-11 rounded-full bg-gradient-to-br ${item.avatarGradient} flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-sm overflow-hidden border border-slate-200 dark:border-white/15`}
                  >
                    {"avatarUrl" in item && item.avatarUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={item.avatarUrl}
                        alt={item.author}
                        width={44}
                        height={44}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      item.avatarInitials
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 dark:text-white text-sm truncate">
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

                {/* 5 Purple Stars */}
                <div className="flex items-center gap-1 mb-3" aria-label="5 de 5 estrellas">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star
                      key={s}
                      className="w-4 h-4 fill-purple-600 text-purple-600 dark:fill-purple-400 dark:text-purple-400"
                    />
                  ))}
                </div>

                <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
