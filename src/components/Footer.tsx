"use client";

import { BRAND_LOGO_URL, MIRAGE_LOGO_URL, MIRAGE_WEBSITE, WHATSAPP_NUMBER } from "@/config/project";
import { motion, useReducedMotion } from "framer-motion";
import { useSite } from "@/providers";

type FooterProps = {
  onRegisterInterest: () => void;
};

const MIRAGE_NAME = "Mirage Capital Properties";

export default function Footer({ onRegisterInterest }: FooterProps) {
  const prefersReducedMotion = useReducedMotion();
  const { c } = useSite();
  const whatsappDigits = WHATSAPP_NUMBER.replace(/\D/g, "");
  const whatsappHref = whatsappDigits ? `https://wa.me/${whatsappDigits}` : undefined;
  const whatsappLabel = whatsappDigits
    ? `+${whatsappDigits.slice(0, 3)} ${whatsappDigits.slice(3, 5)} ${whatsappDigits.slice(
        5,
        8
      )} ${whatsappDigits.slice(8)}`
    : c.footer.whatsapp;

  const currentYear = new Date().getFullYear();

  const navigate = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(href.slice(1))?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#010101] pt-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-14 pb-16 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-6">
            <a
                href={MIRAGE_WEBSITE}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center"
              >
                <img
                  src={MIRAGE_LOGO_URL}
                  alt={MIRAGE_NAME}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-36 object-contain transition-opacity duration-300 group-hover:opacity-80 lg:w-40"
                />
              </a>
              <img
                src={BRAND_LOGO_URL}
                alt={c.projectName}
                loading="lazy"
                decoding="async"
                className="mb-0 h-auto w-36 object-contain lg:w-40"
              />
            </div>

            <p className="mt-8 max-w-sm text-body font-light leading-relaxed text-white/60">
              {c.footer.blurb}
            </p>

            <div className="mt-10 space-y-3 text-sm font-light text-white/70">
              <p className="flex items-center gap-3">
                <span className="text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </span>
                {c.location.cityLine}
              </p>
              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-colors duration-300 hover:text-white"
                >
                  <span className="text-white">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </span>
                  {whatsappLabel}
                </a>
              )}
              <a
                href={MIRAGE_WEBSITE}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors duration-300 hover:text-white"
              >
                <span className="text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-4 w-4">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18M12 3a15.3 15.3 0 010 18 15.3 15.3 0 010-18z" strokeLinejoin="round" />
                  </svg>
                </span>
                mcpuae.com
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="mb-8 text-tiny font-medium uppercase tracking-[0.35em] text-white/50">
              {c.footer.explore}
            </p>
            <ul className="space-y-4">
              {c.nav.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={navigate(link.href)}
                    className="text-sm font-light text-white/70 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="mb-8 text-tiny font-medium uppercase tracking-[0.35em] text-white/50">
              {c.footer.getInTouch}
            </p>
            <div className="space-y-5">
              <button
                onClick={onRegisterInterest}
                className="w-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#010101] transition-colors duration-400 hover:bg-white/85"
              >
                {c.footer.register}
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-10">
          <div className="space-y-6">
            <p className="max-w-4xl text-[11px] font-light leading-relaxed text-white/40">
              {c.footer.disclaimer}
            </p>

            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              

              <p className="text-[11px] font-light tracking-[0.1em] text-white/50">
                © {currentYear} {MIRAGE_NAME}. {c.footer.rights}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}