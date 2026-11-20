"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";

export function CornerRouteLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [targetPath, setTargetPath] = useState("");
  const prevPathRef = useRef(pathname);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // When pathname changes, complete progress to 100% and hide
  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      setProgress(100);
      const timer = setTimeout(() => {
        setLoading(false);
        setProgress(0);
        setTargetPath("");
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Intercept internal link clicks to trigger corner loader
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (
        href &&
        href.startsWith("/") &&
        !href.startsWith("/#") &&
        href !== pathname &&
        target.target !== "_blank"
      ) {
        setLoading(true);
        setTargetPath(href);
        setProgress(15);

        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 92) {
              if (intervalRef.current) clearInterval(intervalRef.current);
              return 92;
            }
            const increment = Math.floor(Math.random() * 18) + 10;
            return Math.min(prev + increment, 92);
          });
        }, 120);
      }
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [pathname]);

  return (
    <div className="fixed bottom-4 left-4 z-[9998] pointer-events-none select-none">
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.92 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 px-3.5 py-2 rounded-xl glass-card border border-purple-500/40 bg-white/90 dark:bg-[#0b0b12]/90 shadow-2xl backdrop-blur-xl text-xs font-mono text-slate-800 dark:text-slate-100"
          >
            <div className="relative flex items-center justify-center">
              {progress >= 100 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              ) : (
                <Loader2 className="w-4 h-4 text-purple-600 dark:text-purple-400 animate-spin" />
              )}
            </div>

            <div className="flex flex-col min-w-[110px]">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold truncate max-w-[120px]">
                  {targetPath || pathname}
                </span>
                <span className="text-[11px] text-purple-600 dark:text-purple-400 font-bold">
                  {progress}%
                </span>
              </div>
              <div className="w-full h-1 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden mt-1">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.15 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
