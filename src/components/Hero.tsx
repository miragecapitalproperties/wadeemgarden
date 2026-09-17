"use client";

import { motion, useReducedMotion } from "framer-motion";
import { projectData, HERO_IMAGE_URL } from "@/config/project";
import { useSite } from "@/providers";
import LuxuryImagePlaceholder from "@/components/LuxuryImagePlaceholder";
import Button from "@/components/Button";

type HeroProps = {
  onRegisterInterest: () => void;
  onDownloadBrochure: () => void;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero({ onRegisterInterest, onDownloadBrochure }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const { c, money } = useSite();
  const name = c.projectName;

  const fadeUp = (delay: number) => ({
    initial: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 36 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.2, delay, ease: EASE },
  });

  return (
    <section id="hero" className="relative flex min-h-screen flex-col overflow-hidden bg-white">
      <motion.div
        initial={prefersReducedMotion ? { scale: 1 } : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <LuxuryImagePlaceholder
          label={c.hero.eyebrow.toUpperCase()}
          aspectRatio="hero"
          className="absolute inset-0 h-full w-full"
          showFrame={false}
          image={HERO_IMAGE_URL}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/55 to-white/90"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.6 }}
        className="absolute inset-0 bg-gradient-to-tr from-white/70 via-transparent to-white/40"
      />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-28 pt-36 text-center lg:px-10">
        <motion.p
          {...fadeUp(0.9)}
          className="mb-8 text-[11px] font-medium uppercase tracking-[0.5em] text-black md:text-xs"
        >
          {c.hero.eyebrow}
        </motion.p>

        <motion.h1
          {...fadeUp(1.1)}
          className="font-serif text-display text-[#141414]"
          aria-label={name}
        >
          {name.split(" ").map((word, index) => (
            <motion.span
              key={index}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 80, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.4, delay: 1 + index * 0.12, ease: EASE }}
              className="me-[0.25em] inline-block"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          {...fadeUp(1.7)}
          className="mt-6 max-w-2xl font-serif text-heading-3 font-light italic text-[#2a2a2a] md:mt-8"
        >
          {c.hero.tagline}
        </motion.p>

        <motion.p
          {...fadeUp(1.9)}
          className="mt-7 max-w-xl text-body-lg font-light leading-relaxed text-[#9a9a9a]"
        >
            
        </motion.p>

        <motion.div
          {...fadeUp(2.1)}
          className="mt-12 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:gap-5"
        >
          <Button size="lg" onClick={onRegisterInterest} className="w-full sm:w-auto">
            {c.hero.ctaPrimary}
          </Button>
          <Button size="lg" variant="outline" onClick={onDownloadBrochure} className="w-full sm:w-auto">
            {c.hero.ctaSecondary}
          </Button>
        </motion.div>

</div>

      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        aria-label={c.hero.scroll}
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#5f5f5f]">
          {c.hero.scroll}
        </span>
        <motion.span
          animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="block h-12 w-px bg-gradient-to-b from-black to-transparent"
        />
      </motion.a>
    </section>
  );
}