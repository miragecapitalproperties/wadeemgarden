"use client";

import { motion, useReducedMotion } from "framer-motion";

type TextRevealProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
};

export default function TextReveal({
  text,
  as: Component = "div",
  className = "",
  delay = 0,
  stagger = 0.045,
  duration = 0.8,
  once = true,
}: TextRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");

  if (prefersReducedMotion) {
    return <Component className={className}>{text}</Component>;
  }

  return (
    <Component className={className} aria-label={text}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        className="inline-block"
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-60px" }}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
      >
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            className="inline-block whitespace-pre"
            variants={{
              hidden: { opacity: 0, y: "60%", filter: "blur(6px)" },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}