import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LegalPageLayoutProps {
  badge: string;
  title: string;
  updatedAt: string;
  children: React.ReactNode;
}

export function LegalPageLayout({
  badge,
  title,
  updatedAt,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 sm:pt-36 sm:pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white mb-8 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            Volver al inicio
          </Link>

          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card border border-purple-500/30 text-xs font-mono text-purple-700 dark:text-purple-300 mb-4">
              <Shield className="w-3.5 h-3.5" />
              <span>{badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              {title}
            </h1>
            <p className="mt-3 text-xs font-mono text-slate-500 dark:text-slate-400">
              Última actualización: {updatedAt}
            </p>
          </div>

          <div className="rounded-2xl p-6 sm:p-10 glass-card border border-slate-200 dark:border-white/10 space-y-8 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed [&_h2]:text-slate-900 dark:[&_h2]:text-white [&_strong]:text-slate-950 dark:[&_strong]:text-white">
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
