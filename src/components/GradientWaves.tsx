"use client";

import React from "react";

interface GradientWavesProps {
  className?: string;
  intensity?: "normal" | "strong";
}

export function GradientWaves({
  className = "",
  intensity = "normal",
}: GradientWavesProps) {
  const opacityClass =
    intensity === "strong"
      ? "opacity-25 dark:opacity-80"
      : "opacity-20 dark:opacity-55";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none overflow-hidden select-none ${className}`}
    >
      {/* Subtle React Bits style Dot Grid */}
      <div
        className="absolute inset-0 bg-dot-grid opacity-50"
        style={{
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 35%, black 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 35%, black 20%, transparent 100%)",
        }}
      />

      {/* Animated Gradient Waves */}
      <div
        className={`absolute -top-[25%] left-1/2 -translate-x-1/2 w-[140%] h-[75%] animate-wave-1 ${opacityClass}`}
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(139, 92, 246, 0.34), rgba(109, 40, 217, 0.16) 45%, rgba(30, 27, 75, 0.08) 70%, transparent 100%)",
          filter: "blur(64px)",
        }}
      />

      <div
        className={`absolute top-[10%] -left-[15%] w-[85%] h-[60%] animate-wave-2 ${opacityClass}`}
        style={{
          background:
            "radial-gradient(circle at 40% 50%, rgba(168, 85, 247, 0.24), rgba(76, 29, 149, 0.14) 50%, transparent 75%)",
          filter: "blur(80px)",
        }}
      />

      <div
        className={`absolute top-[5%] -right-[15%] w-[80%] h-[55%] animate-wave-1 ${opacityClass}`}
        style={{
          background:
            "radial-gradient(circle at 60% 45%, rgba(59, 130, 246, 0.16), rgba(124, 58, 237, 0.18) 45%, transparent 75%)",
          filter: "blur(80px)",
        }}
      />
    </div>
  );
}
