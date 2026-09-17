"use client";

import { useSite } from "@/providers";
import type React from "react";

const ASPECT_RATIOS: Record<string, string> = {
  hero: "aspect-[16/10] md:aspect-[16/9]",
  landscape: "aspect-[16/10]",
  portrait: "aspect-[4/5] md:aspect-[3/4]",
  square: "aspect-square",
  gallery: "aspect-[4/3]",
  card: "aspect-[3/2]",
  wide: "aspect-[21/9]",
};

type LuxuryImagePlaceholderProps = {
  label?: string;
  aspectRatio?: "hero" | "landscape" | "portrait" | "square" | "gallery" | "card" | "wide";
  className?: string;
  fillClassName?: string;
  showFrame?: boolean;
  ariaLabel?: string;
  image?: string;
};

export default function LuxuryImagePlaceholder({
  label = "[PROJECT IMAGE]",
  aspectRatio = "landscape",
  className = "",
  fillClassName = "",
  showFrame = true,
  ariaLabel,
  image,
}: LuxuryImagePlaceholderProps) {
  const { c, lang } = useSite();
  const isArabic = lang === "ar";
  const serifFont = isArabic ? "Amiri, Georgia, serif" : "Taviraj, Georgia, 'Times New Roman', serif";
  const sansFont = isArabic ? "Cairo, Arial, sans-serif" : "Urbanist, Arial, sans-serif";
  const titleSpacing = isArabic ? 0 : 3;
  const subSpacing = isArabic ? 0 : 6;

  if (image) {
    return (
      <div
        className={`relative overflow-hidden bg-[#e6e6e6] ${ASPECT_RATIOS[aspectRatio] || ASPECT_RATIOS.landscape} ${className}`}
        role="img"
        aria-label={ariaLabel || label || "Project image"}
      >
        <div className={`absolute inset-0 ${fillClassName}`}>
          <img
            src={image}
            alt={ariaLabel || label || "Project image"}
            className="h-full w-full object-cover"
            loading={aspectRatio === "hero" ? "eager" : "lazy"}
            decoding="async"
            {...(aspectRatio === "hero"
              ? { fetchPriority: "high" }
              : { fetchPriority: "low" })}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${ASPECT_RATIOS[aspectRatio] || ASPECT_RATIOS.landscape} ${className}`}
      role="img"
      aria-label={ariaLabel || `Architectural placeholder image: ${label}`}
    >
      <svg
        className={`absolute inset-0 h-full w-full ${fillClassName}`}
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ph-bg-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f7f7f7" />
            <stop offset="50%" stopColor="#efefef" />
            <stop offset="100%" stopColor="#e6e6e6" />
          </linearGradient>
          <linearGradient id="ph-bg-2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f0f0f0" />
            <stop offset="100%" stopColor="#e8e8e8" />
          </linearGradient>
          <linearGradient id="ph-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,0,0,0)" />
            <stop offset="50%" stopColor="rgba(0,0,0,0.3)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
          <linearGradient id="ph-building" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4d4d4" />
            <stop offset="100%" stopColor="#c8c8c8" />
          </linearGradient>
          <linearGradient id="ph-building-2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d0d0d0" />
            <stop offset="100%" stopColor="#c2c2c2" />
          </linearGradient>
          <pattern id="ph-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="rgba(0,0,0,0.06)"
              strokeWidth="1"
            />
          </pattern>
          <filter id="ph-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.04" />
            </feComponentTransfer>
          </filter>
          <linearGradient id="ph-sun" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.1)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
        </defs>

        <rect width="1200" height="800" fill="url(#ph-bg-1)" />

        <rect width="1200" height="800" fill="url(#ph-bg-2)" opacity="0.35" />

        <rect width="1200" height="800" fill="url(#ph-grid)" />

        <circle cx="900" cy="180" r="160" fill="url(#ph-sun)" />

        <circle cx="900" cy="180" r="70" fill="rgba(0,0,0,0.08)" />
        <circle cx="900" cy="180" r="38" fill="rgba(0,0,0,0.12)" />

        <rect
          x="0"
          y="620"
          width="1200"
          height="180"
          fill="rgba(255,255,255,0.5)"
        />

        <path d="M 120 620 L 120 470 L 250 470 L 250 370 L 380 370 L 380 620" fill="url(#ph-building)" stroke="rgba(0,0,0,0.08)" />
        <path d="M 470 620 L 470 300 L 640 300 L 640 430 L 700 430 L 700 620" fill="url(#ph-building-2)" stroke="rgba(0,0,0,0.12)" />
        <path d="M 780 620 L 780 420 L 900 420 L 900 260 L 1040 260 L 1040 620" fill="url(#ph-building)" stroke="rgba(0,0,0,0.08)" />

        <g stroke="rgba(0,0,0,0.25)" strokeWidth="2">
          <line x1="300" y1="500" x2="300" y2="540" />
          <line x1="360" y1="500" x2="360" y2="530" />
          <line x1="530" y1="330" x2="530" y2="365" />
          <line x1="590" y1="330" x2="590" y2="355" />
          <line x1="675" y1="460" x2="675" y2="500" />
          <line x1="855" y1="290" x2="855" y2="330" />
          <line x1="915" y1="290" x2="915" y2="330" />
        </g>

        {showFrame && (
          <>
            <rect
              x="60"
              y="60"
              width="1080"
              height="680"
              fill="none"
              stroke="rgba(0,0,0,0.2)"
              strokeWidth="1"
            />
            <line x1="60" y1="120" x2="60" y2="60" stroke="rgba(0,0,0,0.35)" strokeWidth="2" />
            <line x1="60" y1="60" x2="120" y2="60" stroke="rgba(0,0,0,0.35)" strokeWidth="2" />
            <line x1="1140" y1="60" x2="1140" y2="120" stroke="rgba(0,0,0,0.35)" strokeWidth="2" />
            <line x1="1140" y1="60" x2="1080" y2="60" stroke="rgba(0,0,0,0.35)" strokeWidth="2" />
            <line x1="60" y1="740" x2="60" y2="680" stroke="rgba(0,0,0,0.35)" strokeWidth="2" />
            <line x1="60" y1="740" x2="120" y2="740" stroke="rgba(0,0,0,0.35)" strokeWidth="2" />
            <line x1="1140" y1="740" x2="1140" y2="680" stroke="rgba(0,0,0,0.35)" strokeWidth="2" />
            <line x1="1140" y1="740" x2="1080" y2="740" stroke="rgba(0,0,0,0.35)" strokeWidth="2" />
          </>
        )}

        <line x1="360" y1="438" x2="840" y2="438" stroke="url(#ph-line)" strokeWidth="1" />

        <text
          x="600"
          y="428"
          textAnchor="middle"
          fontFamily={serifFont}
          fontSize="34"
          letterSpacing={titleSpacing}
          fill="rgba(20,20,20,0.85)"
        >
          {label}
        </text>

        <text
          x="600"
          y="458"
          textAnchor="middle"
          fontFamily={sansFont}
          fontSize="11"
          letterSpacing={subSpacing}
          fill="rgba(0,0,0,0.6)"
        >
          {c.location.cityLine.toUpperCase()}
        </text>

        <rect width="1200" height="800" filter="url(#ph-noise)" />
      </svg>
    </div>
  );
}