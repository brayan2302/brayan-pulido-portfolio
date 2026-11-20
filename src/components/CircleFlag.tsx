"use client";

import React from "react";

interface CircleFlagProps {
  countryCode: string; // e.g. "es", "us", "co", "ve", "br"
  size?: number;
  className?: string;
  title?: string;
}

export function CircleFlag({
  countryCode,
  size = 18,
  className = "",
  title,
}: CircleFlagProps) {
  const code = (countryCode || "un").toLowerCase();
  const px = typeof size === "number" ? size : 18;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://circle-flags.cdn.skk.moe/flags/${code}.svg`}
      alt={title || `Bandera ${code.toUpperCase()}`}
      title={title}
      width={px}
      height={px}
      loading="lazy"
      style={{
        width: `${px}px`,
        height: `${px}px`,
        minWidth: `${px}px`,
        minHeight: `${px}px`,
        maxWidth: `${px}px`,
        maxHeight: `${px}px`,
        display: "inline-block",
        verticalAlign: "middle",
        borderRadius: "9999px",
        objectFit: "cover",
      }}
      className={`shrink-0 rounded-full ${className}`}
    />
  );
}
