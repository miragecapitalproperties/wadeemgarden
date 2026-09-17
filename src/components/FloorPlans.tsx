"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { floorPlans } from "@/config/project";
import { useSite } from "@/providers";
import { useLockBodyScroll } from "@/hooks/useBodyLock";
import SectionReveal from "@/components/SectionReveal";

export default function FloorPlans() {
  const { c } = useSite();
  const prefersReducedMotion = useReducedMotion();
  const [selected, setSelected] = useState<number | null>(null);

  useLockBodyScroll(selected !== null);

  const handlePrev = useCallback(() => {
    setSelected((current) =>
      current === null ? null : (current - 1 + floorPlans.length) % floorPlans.length
    );
  }, []);

  const handleNext = useCallback(() => {
    setSelected((current) => (current === null ? null : (current + 1) % floorPlans.length));
  }, []);

  useEffect(() => {
    if (selected === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected, handlePrev, handleNext]);

  return (
    <section id="floorplans" className="relative bg-white py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="mb-6 text-tiny font-medium uppercase tracking-[0.45em] text-black">
              {c.floorPlans.eyebrow}
            </p>
            <h2 className="font-serif text-heading-1 text-[#141414]">{c.floorPlans.title}</h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-body-lg font-light leading-relaxed text-[#9a9a9a] lg:text-end">
              {c.floorPlans.body}
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {floorPlans.map((plan, index) => (
            <SectionReveal key={plan.beds} delay={index * 0.1}>
              <button
                type="button"
                onClick={() => setSelected(index)}
                className="group block w-full cursor-pointer text-start"
                aria-label={`${c.propertyTypes.cards[index]?.name ?? `Floor Plan ${plan.beds} BR`} — ${c.floorPlans.view}`}
              >
                <div className="relative overflow-hidden bg-[#e6e6e6]">
                  <img
                    src={plan.image}
                    alt={c.propertyTypes.cards[index]?.name ?? `Floor Plan ${plan.beds} BR`}
                    loading="lazy"
                    decoding="async"
                    className="w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4">
                  <p className="font-serif text-lg text-[#141414]">
                    {c.propertyTypes.cards[index]?.name ?? `Floor Plan ${plan.beds} BR`}
                  </p>
                  <span className="text-xs font-light uppercase tracking-[0.15em] text-[#8a8a8a]">
                    {c.floorPlans.view}
                  </span>
                </div>
              </button>
            </SectionReveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95"
            role="dialog"
            aria-modal="true"
            aria-label={`${c.propertyTypes.cards[selected]?.name ?? `Floor Plan ${floorPlans[selected].beds} BR`} (${selected + 1}/${floorPlans.length})`}
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-grain opacity-40" aria-hidden="true" />

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelected(null);
              }}
              className="absolute right-6 top-6 z-20 flex h-12 w-12 items-center justify-center border border-white/25 text-white transition-colors duration-300 hover:border-white hover:text-white"
              aria-label={c.gallery.close}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-5 w-5">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-3 z-20 flex h-14 w-14 items-center justify-center border border-white/20 text-white/70 transition-all duration-300 hover:border-white hover:text-white md:left-8"
              aria-label={c.gallery.prev}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-6 w-6 rtl:rotate-180">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-3 z-20 flex h-14 w-14 items-center justify-center border border-white/20 text-white/70 transition-all duration-300 hover:border-white hover:text-white md:right-8"
              aria-label={c.gallery.next}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-6 w-6 rtl:rotate-180">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            <motion.div
              key={selected}
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-4xl px-16 md:px-24"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex items-center justify-center bg-[#e6e6e6]">
                <img
                  src={floorPlans[selected].image}
                  alt={c.propertyTypes.cards[selected]?.name ?? `Floor Plan ${floorPlans[selected].beds} BR`}
                  className="max-h-[78vh] w-full object-contain"
                />
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="font-serif text-xl italic text-[#e8e4dd]">
                  {c.propertyTypes.cards[selected]?.name ?? `Floor Plan ${floorPlans[selected].beds} BR`}
                </p>
                <p className="font-serif text-lg tabular-nums text-white">
                  {String(selected + 1).padStart(2, "0")} /{" "}
                  {String(floorPlans.length).padStart(2, "0")}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}