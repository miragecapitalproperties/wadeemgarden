"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CURRENCIES, type CurrencyCode } from "@/lib/content";
import { useSite } from "@/providers";
import { joinClassNames } from "@/lib/utils";

export default function SettingsMenu() {
  const { c, lang, setLang, currency, setCurrency } = useSite();
  const prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const langToggleClass = (active: boolean) =>
    joinClassNames(
      "flex-1 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300",
      active
        ? "bg-[#010101] text-white"
        : "text-[#4a4a4a] hover:text-[#141414]"
    );

  return (
    <div ref={ref} className="relative flex items-center">
      <button
        onClick={() => setOpen((value) => !value)}
        aria-label={c.floating.settings}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 bg-white/90 text-[#010101] backdrop-blur-md transition-all duration-300 hover:border-black hover:bg-[#010101] hover:text-white xl:h-11 xl:w-11"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute end-0 top-full z-50 mt-3 w-64 bg-white p-5 shadow-2xl shadow-black/25"
            role="dialog"
            aria-modal="true"
            aria-label={c.floating.settings}
          >
            <div className="absolute inset-0 border border-black/15" aria-hidden="true" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#8a8a8a]">
                  {c.floating.settings}
                </p>
                <button
                  onClick={() => setOpen(false)}
                  aria-label={c.nav.close}
                  className="flex h-7 w-7 items-center justify-center text-[#4a4a4a] transition-colors duration-300 hover:text-[#010101]"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-4 w-4">
                    <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              <div className="mt-5">
                <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.25em] text-[#8a8a8a]">
                  {c.floating.language}
                </p>
                <div className="flex border border-black/15">
                  <button onClick={() => setLang("en")} className={langToggleClass(lang === "en")} aria-pressed={lang === "en"}>
                    EN
                  </button>
                  <button onClick={() => setLang("ar")} className={langToggleClass(lang === "ar")} aria-pressed={lang === "ar"}>
                    عربي
                  </button>
                </div>
              </div>

              <div className="mt-5">
                <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.25em] text-[#8a8a8a]">
                  {c.floating.currency}
                </p>
                <ul className="space-y-1" role="listbox" aria-label={c.floating.currency}>
                  {CURRENCIES.map((item) => (
                    <li key={item.code} role="option" aria-selected={currency === item.code}>
                      <button
                        onClick={() => setCurrency(item.code as CurrencyCode)}
                        className={joinClassNames(
                          "flex w-full items-center justify-between gap-4 px-3 py-2.5 text-left text-xs transition-colors duration-300",
                          currency === item.code
                            ? "bg-[#010101] text-white"
                            : "text-[#4a4a4a] hover:bg-black/5 hover:text-[#141414]"
                        )}
                      >
                        <span className="font-medium tracking-[0.12em]">{item.code}</span>
                        <span className="font-light">{c.currencies[item.code as CurrencyCode].name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}