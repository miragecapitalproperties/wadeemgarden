"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  offset?: number;
  direction?: "up" | "down";
};

export default function Parallax({
  children,
  className = "",
  offset = 80,
  direction = "up",
}: ParallaxProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const sign = direction === "up" ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [offset * sign, -offset * sign]);

  if (prefersReducedMotion) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}