"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const VISITED_KEY = "bp_visited_has_seen_reveal";

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function TextReveal({
  children,
  className = "",
  delay = 0,
}: TextRevealProps) {
  const [mounted, setMounted] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      try {
        const alreadyVisited = window.localStorage.getItem(VISITED_KEY);
        if (!alreadyVisited) {
          setIsFirstVisit(true);
          window.localStorage.setItem(VISITED_KEY, "true");
        } else {
          setIsFirstVisit(false);
        }
      } catch {
        setIsFirstVisit(false);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !isFirstVisit) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
