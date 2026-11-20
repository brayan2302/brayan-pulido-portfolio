"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error
    console.error("Application error boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-md w-full rounded-2xl p-8 glass-card border border-purple-500/30 text-center space-y-5">
        <div className="w-14 h-14 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-500 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Algo no cargó correctamente
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Ocurrió un error temporal al renderizar la vista. Puedes reintentar
            de inmediato.
          </p>
        </div>

        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-500/25 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reintentar</span>
        </button>
      </div>
    </div>
  );
}
