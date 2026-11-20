"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function AppleCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { stiffness: 420, damping: 32, mass: 0.4 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);

      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        target?.closest(
          "a, button, input, textarea, select, [role='button'], label, [tabindex]"
        )
      );
      setHovering(isInteractive);
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [mouseX, mouseY]);

  if (!visible) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: hovering ? 44 : 20,
        height: hovering ? 44 : 20,
        scale: pressed ? 0.84 : 1,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      className={`pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block rounded-full backdrop-blur-[2px] transition-colors duration-150 ${
        hovering
          ? "bg-purple-500/20 dark:bg-purple-400/25 border border-purple-500/60 dark:border-purple-300/60 shadow-[0_0_24px_rgba(168,85,247,0.35)]"
          : "bg-slate-900/20 dark:bg-white/30 border border-slate-900/30 dark:border-white/50 shadow-sm"
      }`}
    />
  );
}
