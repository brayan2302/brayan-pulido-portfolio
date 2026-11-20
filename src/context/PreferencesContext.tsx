"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "light";
export type Lang = "es" | "en";

interface PreferencesContextValue {
  theme: Theme;
  lang: Lang;
  isReady: boolean;
  toggleTheme: () => void;
  toggleLang: () => void;
  setLang: (lang: Lang) => void;
  setTheme: (theme: Theme) => void;
}

const PreferencesContext = createContext<PreferencesContextValue>({
  theme: "dark",
  lang: "es",
  isReady: false,
  toggleTheme: () => {},
  toggleLang: () => {},
  setLang: () => {},
  setTheme: () => {},
});

declare global {
  interface Window {
    __INITIAL_PREFS__?: {
      theme?: Theme;
      lang?: Lang;
    };
  }
}

function applyThemeToDom(nextTheme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(nextTheme);
  root.style.colorScheme = nextTheme;
}

function detectSystemTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = window.localStorage.getItem("bp_theme") as Theme | null;
    if (stored === "light" || stored === "dark") return stored;
    if (window.__INITIAL_PREFS__?.theme) return window.__INITIAL_PREFS__.theme;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } catch {
    return "dark";
  }
}

function detectSystemLang(): Lang {
  if (typeof window === "undefined") return "es";
  try {
    const stored = window.localStorage.getItem("bp_lang") as Lang | null;
    if (stored === "es" || stored === "en") return stored;
    if (window.__INITIAL_PREFS__?.lang) return window.__INITIAL_PREFS__.lang;
    const navLang = (
      navigator.language ||
      (navigator as unknown as { userLanguage?: string }).userLanguage ||
      "es"
    ).toLowerCase();
    return navLang.startsWith("es") ? "es" : "en";
  } catch {
    return "es";
  }
}

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [lang, setLangState] = useState<Lang>("es");
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const initTimer = setTimeout(() => {
      const detectedTheme = detectSystemTheme();
      const detectedLang = detectSystemLang();

      setThemeState(detectedTheme);
      applyThemeToDom(detectedTheme);

      setLangState(detectedLang);
      document.documentElement.lang = detectedLang;

      setIsReady(true);
    }, 0);

    // Escuchar cambios en tiempo real si el usuario cambia el tema de su PC/SO
    // y no ha fijado una preferencia manual en localStorage
    let mediaQuery: MediaQueryList | null = null;
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      try {
        const manual = window.localStorage.getItem("bp_theme");
        if (!manual) {
          const next: Theme = e.matches ? "dark" : "light";
          setThemeState(next);
          applyThemeToDom(next);
        }
      } catch {}
    };

    try {
      if (window.matchMedia) {
        mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        mediaQuery.addEventListener("change", handleSystemThemeChange);
      }
    } catch {}

    return () => {
      clearTimeout(initTimer);
      try {
        mediaQuery?.removeEventListener("change", handleSystemThemeChange);
      } catch {}
    };
  }, []);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    applyThemeToDom(next);
    try {
      window.localStorage.setItem("bp_theme", next);
    } catch {}
  };

  const setLang = (next: Lang) => {
    setLangState(next);
    document.documentElement.lang = next;
    try {
      window.localStorage.setItem("bp_lang", next);
    } catch {}
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleLang = () => {
    setLang(lang === "es" ? "en" : "es");
  };

  return (
    <PreferencesContext.Provider
      value={{ theme, lang, isReady, toggleTheme, toggleLang, setLang, setTheme }}
    >
      {/* Pantalla de espera ultrarrápida mientras se sincroniza idioma y tema del sistema antes de mostrar el contenido */}
      {!isReady && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-[9999] bg-[var(--background)] flex items-center justify-center transition-opacity duration-200"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-9 h-9 rounded-full border-2 border-purple-500/25 border-t-purple-500 animate-spin" />
          </div>
        </div>
      )}
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  return useContext(PreferencesContext);
}
