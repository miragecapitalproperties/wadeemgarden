"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { joinClassNames } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost" | "light";
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  ariaLabel?: string;
  icon?: React.ReactNode;
  isExternal?: boolean;
  magnetic?: boolean;
};

const VARIANT_STYLES = {
  primary:
    "bg-gradient-to-r from-[#292929] to-[#010101] text-white border border-transparent hover:from-[#3d3d3d] hover:to-[#010101]",
  outline:
    "bg-transparent text-[#141414] border border-black/20 hover:border-black hover:bg-black/5",
  ghost:
    "bg-transparent text-[#141414] hover:text-black border border-transparent",
  light:
    "bg-white text-black border border-transparent hover:bg-[#f2f2f2]",
};

const SIZE_STYLES = {
  sm: "px-6 py-3 text-xs",
  md: "px-8 py-4 text-sm",
  lg: "px-10 py-5 text-sm md:text-base",
  xl: "px-12 py-6 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  type = "button",
  className = "",
  disabled = false,
  onClick,
  ariaLabel,
  icon,
  isExternal = false,
  magnetic = true,
}: ButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const buttonRef = useRef<HTMLElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!magnetic || prefersReducedMotion || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const strength = Math.min(Math.abs(x), 18) * Math.sign(x) * 0.15;
    const strengthY = Math.min(Math.abs(y), 18) * Math.sign(y) * 0.15;
    buttonRef.current.style.transform = `translate(${strength}px, ${strengthY}px)`;
  };

  const handleLeave = () => {
    if (!buttonRef.current) return;
    buttonRef.current.style.transform = "translate(0, 0)";
  };

  const classNameString = joinClassNames(
    "group inline-flex items-center justify-center gap-3 overflow-hidden font-medium tracking-[0.18em] uppercase transition-all duration-[400ms] ease-out",
    VARIANT_STYLES[variant],
    SIZE_STYLES[size],
    disabled && "cursor-not-allowed opacity-50 pointer-events-none",
    className
  );

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {icon && <span className="relative z-10 inline-flex transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
    </>
  );

  if (href) {
    const isAnchor = href.startsWith("#");
    if (isAnchor && !isExternal) {
      return (
        <a
          href={href}
          className={classNameString}
          aria-label={ariaLabel}
          onClick={(e) => {
            e.preventDefault();
            const element = document.getElementById(href.slice(1));
            if (element) element.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {content}
        </a>
      );
    }
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={classNameString}
        aria-label={ariaLabel}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {content}
      </a>
    );
  }

  return (
    <motion.button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
      type={type}
      className={classNameString}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {content}
    </motion.button>
  );
}