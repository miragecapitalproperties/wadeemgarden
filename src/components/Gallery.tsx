"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { galleryItems } from "@/config/project";
import { useSite } from "@/providers";
import LuxuryImagePlaceholder from "@/components/LuxuryImagePlaceholder";
import { useLockBodyScroll } from "@/hooks/useBodyLock";

export default function Gallery() {
  const prefersReducedMotion = useReducedMotion();
  const { c } = useSite();
  const [selected, setSelected] = useState<number | null>(null);

  useLockBodyScroll(selected !== null);

  const handlePrev = useCallback(() => {
    setSelected((current) =>
      current === null ? null : (current - 1 + galleryItems.length) % galleryItems.length
    );
  }, []);

  const handleNext = useCallback(() => {
    setSelected((current) =>
      current === null ? null : (current + 1) % galleryItems.length
    );
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

  const openLightbox = (index: number) => setSelected(index);

  return (
    <section id="gallery" className="relative bg-[#f7f7f7] py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeadingInline />

        <GalleryCarousel onOpen={openLightbox} />
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
            aria-label={`${c.gallery.items[selected] || c.gallery.itCaption} (${selected + 1}/${galleryItems.length})`}
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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-6 w-6">
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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            <motion.div
              key={selected}
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-5xl px-16 md:px-24"
              onClick={(e) => e.stopPropagation()}
            >
              <LuxuryImagePlaceholder
                label={c.gallery.items[selected] || c.gallery.itCaption}
                image={galleryItems[selected].image}
                aspectRatio="landscape"
                showFrame={false}
              />
              <div className="mt-6 flex items-center justify-between">
                {c.gallery.items[selected] ? (
                  <p className="font-serif text-xl italic text-[#e8e4dd]">
                    {c.gallery.items[selected]}
                  </p>
                ) : (
                  <span />
                )}
                <p className="font-serif text-lg tabular-nums text-white">
                  {String(selected + 1).padStart(2, "0")} /{" "}
                  {String(galleryItems.length).padStart(2, "0")}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function GalleryCarousel({ onOpen }: { onOpen: (index: number) => void }) {
  const prefersReducedMotion = useReducedMotion();
  const { c } = useSite();
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByStep = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({
      left: direction * track.clientWidth * 0.85,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <>
      <div
        role="region"
        aria-label="Project gallery carousel"
      >
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          {galleryItems.map((item, index) => (
            <motion.button
              key={`${item.image}-${index}`}
              onClick={() => onOpen(index)}
              className="group relative w-[78vw] shrink-0 snap-center overflow-hidden sm:w-[60vw]"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              aria-label={`${c.gallery.items[index] || c.gallery.itCaption} (${index + 1})`}
            >
              <LuxuryImagePlaceholder
                label={c.gallery.items[index] || c.gallery.itCaption}
                image={item.image}
                aspectRatio="gallery"
                showFrame={false}
                className="transition-transform duration-800 group-hover:scale-[1.03]"
              />
              <div className="flex items-center justify-between px-5 py-4">
                {c.gallery.items[index] ? (
                  <p className="text-sm font-light text-[#141414]">{c.gallery.items[index]}</p>
                ) : (
                  <span />
                )}
                <p className="text-xs tabular-nums text-black">
                  {String(index + 1).padStart(2, "0")}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            onClick={() => scrollByStep(-1)}
            aria-label={c.gallery.prev}
            className="flex h-10 w-10 items-center justify-center border border-[#010101] bg-[#010101] text-white transition-all duration-300 hover:bg-white hover:text-[#010101]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 rtl:rotate-180">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={() => scrollByStep(1)}
            aria-label={c.gallery.next}
            className="flex h-10 w-10 items-center justify-center border border-[#010101] bg-[#010101] text-white transition-all duration-300 hover:bg-white hover:text-[#010101]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 rtl:rotate-180">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

function SectionHeadingInline() {
  const { c } = useSite();
  return (
    <>
      <p className="mb-6 text-tiny font-medium uppercase tracking-[0.45em] text-black">
        {c.gallery.eyebrow}
      </p>
      <h2 className="max-w-3xl font-serif text-heading-1 text-[#141414]">
        {c.gallery.title}
      </h2>
      <p className="mt-8 max-w-xl text-body-lg font-light text-[#9a9a9a]">
        {c.gallery.body}
      </p>
    </>
  );
}