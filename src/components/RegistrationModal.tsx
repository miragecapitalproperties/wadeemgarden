"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useSite } from "@/providers";
import { useLockBodyScroll } from "@/hooks/useBodyLock";
import LeadForm from "@/components/LeadForm";

type RegistrationModalProps = {
  delay?: number;
  triggerOpen?: boolean;
  onClose?: () => void;
};

export default function RegistrationModal({ delay = 10000, triggerOpen = false, onClose }: RegistrationModalProps) {
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { c } = useSite();
  const dialogRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(open);

  useEffect(() => {
    if (triggerOpen) setOpen(true);
  }, [triggerOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window === "undefined") return;
      setOpen(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const close = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`${c.modal.title} ${c.projectName}`}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" aria-hidden="true" />

          <motion.div
            ref={dialogRef}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="document"
            className="relative w-full max-w-lg bg-white shadow-2xl outline-none"
            tabIndex={-1}
          >
            <div className="pointer-events-none absolute inset-0 border border-black/10" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-0 bg-grain opacity-50" aria-hidden="true" />

            <button
              onClick={close}
              aria-label={c.modal.close}
              className="absolute right-3.5 top-3.5 z-20 flex h-9 w-9 items-center justify-center border border-black/15 bg-white text-[#141414] transition-colors duration-300 hover:border-black hover:text-black"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-4 w-4">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <div className="relative max-h-[82vh] overflow-y-auto">
              <LeadForm
                variant="full"
                heading={c.form.heading}
                description={c.form.description}
                ctaLabel={c.modal.cta}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}