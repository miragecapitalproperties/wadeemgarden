"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { WHATSAPP_NUMBER } from "@/config/project";
import { useSite } from "@/providers";
import { joinClassNames } from "@/lib/utils";

type FloatingCTAProps = {
  onRegisterInterest: () => void;
};

export default function FloatingCTA({ onRegisterInterest }: FloatingCTAProps) {
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { c, dir } = useSite();
  const hasWhatsApp = Boolean(WHATSAPP_NUMBER);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      const shouldShow = position > window.innerHeight * 0.7;
      setVisible(shouldShow);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  const siteUrl = typeof window !== "undefined" ? window.location.href : "";
  const whatsappText = `Hi I am interested in this project. May I have more details accordingly? "${siteUrl}"`;

  const whatsappHref = hasWhatsApp
    ? `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(
        whatsappText
      )}`
    : undefined;

  const edge = dir === "rtl" ? "left-4 lg:left-6" : "right-4 lg:right-6";
  const align = dir === "rtl" ? "items-start" : "items-end";

  const roundButtonClass =
    "flex h-12 w-12 items-center justify-center border border-black/15 bg-white/90 text-[#010101] backdrop-blur-md transition-all duration-300 hover:border-black hover:bg-[#010101] hover:text-white";

  return (
    <div className={joinClassNames("fixed bottom-6 z-40 flex flex-col", edge, align)}>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={joinClassNames("flex flex-col gap-3", align)}
          >
            <button onClick={scrollToTop} aria-label={c.floating.backToTop} className={roundButtonClass}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5M12 5.25v13.5" />
              </svg>
            </button>

            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={c.floating.whatsapp}
                className={roundButtonClass}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </a>
            )}

            <button
              onClick={onRegisterInterest}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#292929] to-[#010101] px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-xl shadow-black/20 transition-all duration-400 hover:from-[#3d3d3d] hover:to-[#010101]"
            >
              {c.floating.register}
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 rtl:rotate-180">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}