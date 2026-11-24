"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowUpRight,
  Sun,
  Moon,
  ChevronDown,
  Check,
  Calendar,
} from "lucide-react";
import { CONTACT_INFO } from "@/data/portfolio";
import { usePreferences } from "@/context/PreferencesContext";
import { UI_COPY } from "@/data/translations";
import { CircleFlag } from "./CircleFlag";
import { PromoBanner } from "./PromoBanner";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  const langMenuRef = useRef<HTMLDivElement>(null);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  const { theme, lang, setTheme, setLang } = usePreferences();
  const copy = UI_COPY[lang];
  const isEs = lang === "es";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node)) {
        setThemeMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("/#") && typeof window !== "undefined") {
      if (window.location.pathname === "/") {
        e.preventDefault();
        const id = href.replace("/#", "");
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
        }
      }
    }
  };

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex flex-col">
      <PromoBanner />
      <header
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "py-3 bg-white/85 dark:bg-[#050505]/85 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "py-4 bg-transparent"
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        {/* Left: Profile Photo Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus:outline-none shrink-0"
        >
          <span className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.3)] group-hover:scale-105 transition-transform shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://media.licdn.com/dms/image/v2/D4E03AQH6BCzDrTr0zA/profile-displayphoto-crop_800_800/B4EZ4FKOr5HQAI-/0/1778203029773?e=1796860800&v=beta&t=ha_E1Np4h279BtpFR5xNriUsx6eta1ZvjDR0KJ84794"
              alt="Brayan Pulido"
              width={36}
              height={36}
              className="w-full h-full object-cover"
            />
          </span>
          <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
            Brayan Pulido
          </span>
        </Link>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-full glass-card">
          {copy.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="px-4 py-1.5 text-sm text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white rounded-full hover:bg-slate-900/[0.05] dark:hover:bg-white/[0.06] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: Language Submenu + Theme Submenu + Schedule + CTA */}
        <div className="flex items-center gap-2">
          {/* Language Submenu Dropdown */}
          <div ref={langMenuRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setLangMenuOpen((prev) => !prev);
                setThemeMenuOpen(false);
              }}
              aria-expanded={langMenuOpen}
              aria-label={isEs ? "Seleccionar idioma" : "Select language"}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full glass-card text-xs font-semibold text-slate-700 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white hover:border-purple-400/40 transition-colors cursor-pointer"
            >
              <CircleFlag countryCode={isEs ? "es" : "us"} size={16} />
              <span>{isEs ? "ES" : "EN"}</span>
              <ChevronDown
                className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
                  langMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {langMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-40 rounded-2xl p-1.5 bg-white/95 dark:bg-[#0e0e14]/95 backdrop-blur-xl border border-slate-200 dark:border-white/15 shadow-2xl z-50"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setLang("es");
                      setLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      isEs
                        ? "bg-purple-500/15 text-purple-700 dark:text-purple-300"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <CircleFlag countryCode="es" size={16} />
                      <span>Español</span>
                    </span>
                    {isEs && <Check className="w-3.5 h-3.5 text-purple-500" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLang("en");
                      setLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      !isEs
                        ? "bg-purple-500/15 text-purple-700 dark:text-purple-300"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <CircleFlag countryCode="us" size={16} />
                      <span>English</span>
                    </span>
                    {!isEs && <Check className="w-3.5 h-3.5 text-purple-500" />}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Submenu Dropdown */}
          <div ref={themeMenuRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setThemeMenuOpen((prev) => !prev);
                setLangMenuOpen(false);
              }}
              aria-expanded={themeMenuOpen}
              aria-label={isEs ? "Seleccionar tema" : "Select theme"}
              className="inline-flex items-center gap-1 p-2.5 rounded-full glass-card text-slate-700 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white hover:border-purple-400/40 transition-colors cursor-pointer"
            >
              {theme === "dark" ? (
                <Moon className="w-4 h-4 text-purple-400" />
              ) : (
                <Sun className="w-4 h-4 text-amber-500" />
              )}
              <ChevronDown
                className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
                  themeMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {themeMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-40 rounded-2xl p-1.5 bg-white/95 dark:bg-[#0e0e14]/95 backdrop-blur-xl border border-slate-200 dark:border-white/15 shadow-2xl z-50"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setTheme("light");
                      setThemeMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      theme === "light"
                        ? "bg-purple-500/15 text-purple-700 dark:text-purple-300"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                      <span>{copy.themeLight}</span>
                    </span>
                    {theme === "light" && <Check className="w-3.5 h-3.5 text-purple-500" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTheme("dark");
                      setThemeMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      theme === "dark"
                        ? "bg-purple-500/15 text-purple-700 dark:text-purple-300"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Moon className="w-3.5 h-3.5 text-purple-400" />
                      <span>{copy.themeDark}</span>
                    </span>
                    {theme === "dark" && <Check className="w-3.5 h-3.5 text-purple-500" />}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Schedule 30-min button (/agendar) */}
          <Link
            href="/agendar"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium glass-card text-slate-800 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-300 border border-slate-200 dark:border-white/15 hover:border-purple-400/40 transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>{isEs ? "Contáctame" : "Let's Talk"}</span>
          </Link>

          <a
            href={CONTACT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 border border-purple-400/30 shadow-[0_0_24px_rgba(139,92,246,0.35)] hover:shadow-[0_0_32px_rgba(168,85,247,0.55)] transition-all cursor-pointer"
          >
            {copy.headerCta}
            <ArrowUpRight className="w-4 h-4" />
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden p-2.5 rounded-xl glass-card text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden mt-3 mx-4 p-4 rounded-2xl glass-card border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#0a0a0a]/95 space-y-2 shadow-xl">
          {copy.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                setMobileOpen(false);
                handleNavClick(e, item.href);
              }}
              className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
            >
              {item.label}
            </a>
          ))}

          <Link
            href="/agendar"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-medium glass-card text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/15"
          >
            <Calendar className="w-4 h-4 text-purple-500" />
            <span>{isEs ? "Agendar videollamada (30 min)" : "Schedule 30-min call"}</span>
          </Link>

          <a
            href={CONTACT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 w-full mt-2 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-violet-600 shadow-[0_0_20px_rgba(139,92,246,0.4)]"
          >
            {copy.headerCta}
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
      </header>
    </div>
  );
}
