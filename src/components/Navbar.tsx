"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { BRAND_LOGO_URL } from "@/config/project";
import { useSite } from "@/providers";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useLockBodyScroll } from "@/hooks/useBodyLock";
import { joinClassNames } from "@/lib/utils";
import SettingsMenu from "@/components/SettingsMenu";

type NavbarProps = {
  onRegisterInterest: () => void;
};

export default function Navbar({ onRegisterInterest }: NavbarProps) {
  const { c } = useSite();
  const { isScrolled } = useScrollPosition();
  const { activeHref, setActiveHref } = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useLockBodyScroll(menuOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    setActiveHref(href);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={joinClassNames(
          "fixed inset-x-0 top-0 z-40 transition-all duration-600",
          isScrolled
            ? "border-b border-black/10 bg-white/90 py-4 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent py-7"
        )}
      >
        <nav
          className="mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-10"
          aria-label="Main navigation"
        >
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              setActiveHref("");
              window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
            }}
            className="flex items-center gap-3"
            aria-label={c.nav.home}
          >
            <img
              src={BRAND_LOGO_URL}
              alt={c.projectName}
              decoding="async"
              className="h-auto w-32 object-contain [filter:invert(1)] lg:w-36"
            />
          </a>

          <LayoutGroup id="navbar-indicator">
            <div className="hidden items-center gap-1 rounded-full border border-black/10 bg-white/70 p-1.5 backdrop-blur-md xl:flex">
              {c.nav.links.map((link) => {
                const isActive = activeHref === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    aria-current={isActive ? "true" : undefined}
                    className={joinClassNames(
                      "relative rounded-full px-4 py-2 text-[11px] font-medium uppercase transition-colors duration-300",
                      isActive ? "text-white" : "text-[#6b6b6b] hover:text-black"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-[#010101]"
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 380, damping: 30, mass: 0.6 }
                        }
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                );
              })}
            </div>
          </LayoutGroup>

          <div className="hidden items-center gap-4 xl:flex">
            <button
              onClick={onRegisterInterest}
              className="bg-gradient-to-r from-[#292929] to-[#010101] px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-all duration-400 hover:from-[#3d3d3d] hover:to-[#010101]"
            >
              {c.nav.register}
            </button>
            <SettingsMenu />
          </div>

          <div className="flex items-center gap-3 xl:hidden">
            <SettingsMenu />
            <button
              onClick={() => setMenuOpen(true)}
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 border border-black/15"
              aria-label={c.nav.openMenu}
              aria-expanded={menuOpen}
            >
              <span className="block h-px w-5 bg-[#141414] transition-transform duration-300" />
              <span className="block h-px w-5 bg-[#141414]" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex flex-col bg-white"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="absolute inset-0 bg-grain opacity-60" aria-hidden="true" />
            <div className="relative flex items-center justify-between px-6 py-7">
              <span className="flex items-center">
                <img
                  src={BRAND_LOGO_URL}
                  alt={c.projectName}
                  decoding="async"
                  className="h-auto w-28 object-contain [filter:invert(1)]"
                />
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="flex h-12 w-12 items-center justify-center border border-black/15"
                aria-label={c.nav.closeMenu}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="#141414" strokeWidth="1.2" className="h-5 w-5">
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <nav className="relative flex flex-1 flex-col justify-center px-8" aria-label="Mobile menu">
              {c.nav.links.map((link, index) => {
                const isActive = activeHref === link.href;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.08 * index + 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    aria-current={isActive ? "true" : undefined}
                    className={joinClassNames(
                      "group relative flex items-center gap-5 border-b py-6 transition-colors duration-300",
                      isActive ? "border-black/40" : "border-black/10"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-mobile-active"
                        className="absolute inset-x-2 inset-y-2.5 rounded-2xl bg-black/[0.06]"
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 340, damping: 30 }
                        }
                      />
                    )}
                    <span className="relative z-10 font-serif text-sm text-black">
                      0{index + 1}
                    </span>
                    <span
                      className={joinClassNames(
                        "relative z-10 font-serif text-heading-3 transition-colors duration-300",
                        isActive ? "text-black" : "text-[#141414] group-hover:text-black"
                      )}
                    >
                      {link.label}
                    </span>
                  </motion.a>
                );
              })}

              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 flex flex-col gap-4"
              >
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onRegisterInterest();
                  }}
                  className="bg-gradient-to-r from-[#292929] to-[#010101] px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition-all duration-400"
                >
                  {c.nav.registerMobile}
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}