"use client";

import React, { useEffect, useState } from "react";
import { InlineWidget } from "react-calendly";
import { usePreferences } from "@/context/PreferencesContext";
import { Loader2 } from "lucide-react";

interface CalendlyWidgetProps {
  url?: string;
  height?: string;
  className?: string;
}

export function CalendlyWidget({
  url = "https://calendly.com/brayanelcrack2302/30min",
  height = "700px",
  className = "",
}: CalendlyWidgetProps) {
  const { theme } = usePreferences();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[620px] rounded-xl flex flex-col items-center justify-center gap-3 bg-slate-50/50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
        <Loader2 className="w-6 h-6 animate-spin text-purple-600 dark:text-purple-400" />
        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
          Cargando Calendly...
        </span>
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <div className={`w-full overflow-hidden rounded-xl ${className}`}>
      <InlineWidget
        url={url}
        styles={{
          height,
          width: "100%",
        }}
        pageSettings={{
          backgroundColor: isDark ? "09090d" : "ffffff",
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: "8b5cf6",
          textColor: isDark ? "f8fafc" : "0f172a",
        }}
      />
    </div>
  );
}
