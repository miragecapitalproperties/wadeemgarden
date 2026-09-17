"use client";

import { motion, useReducedMotion } from "framer-motion";
import { locationDistances } from "@/config/project";
import { useSite } from "@/providers";
import SectionReveal from "@/components/SectionReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import type { IconName } from "@/lib/utils";

const locationIcons: Record<IconName, React.ReactNode> = {
  city: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" />
    </svg>
  ),
  plane: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 15.75v-3.75a3.75 3.75 0 01-3.75-3.75H4.5l1.5 16.5h15.75M8.25 5.25l3-3 3 3M12 2.25v12" />
    </svg>
  ),
  entertainment: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
    </svg>
  ),
  museum: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 5.25V21H3V8.25L12 3zM6.75 21v-9m3.75 9v-9m3.75 9v-9M6 8.25h12M6 5.25h12" />
    </svg>
  ),
  business: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 21V6.75A2.25 2.25 0 016.25 4.5h11.5A2.25 2.25 0 0120 6.75V21M12 8.25V21m-8.25 0h16.5M9 8.25h2.25m-.75 4.5h2.25M9 17.25h2.25" />
    </svg>
  ),
  shopping: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
    </svg>
  ),
  health: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75a6 6 0 0111.573-2.226 3.75 3.75 0 014.133 4.303A4.5 4.5 0 0118 19.5H6.75a3.75 3.75 0 01-3.75-3.75V12.75a6 6 0 011.5 0z" />
    </svg>
  ),
  education: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 15.75a11.97 11.97 0 00-6.825 2.307 12.083 12.083 0 01.665-6.479L12 14zm-4.5 5.25A15.111 15.111 0 0112 18.75a15.111 15.111 0 014.5 0.658" />
    </svg>
  ),
};

export default function Location() {
  const prefersReducedMotion = useReducedMotion();
  const { c } = useSite();

  return (
    <section id="location" className="relative bg-[#f7f7f7] py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionReveal>
              <p className="mb-6 text-tiny font-medium uppercase tracking-[0.45em] text-black">
                {c.location.eyebrow}
              </p>
              <h2 className="font-serif text-heading-1 text-[#141414]">
                {c.location.title}
              </h2>
              <p className="mt-8 text-body-lg font-light leading-relaxed text-[#9a9a9a]">
                {c.location.body}
              </p>
            </SectionReveal>

            <div className="mt-14 border-t border-black/10">
              {locationDistances.map((item, index) => (
                <SectionReveal key={`${item.place}-${index}`} delay={index * 0.06}>
                  <div className="group flex items-center justify-between gap-6 border-b border-black/10 py-5 transition-colors duration-300 hover:bg-black/[0.02]">
                    <div className="flex items-center gap-4">
                      <span className="text-black/60 transition-colors duration-300 group-hover:text-black">
                        {locationIcons[item.icon]}
                      </span>
                      <span className="text-sm font-light text-[#4a4a4a] transition-colors duration-300 group-hover:text-[#141414]">
                        {c.location.places[index].place}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <AnimatedCounter
                        value={c.location.places[index].minutes}
                        suffix={c.location.driveSuffix}
                        duration={1600}
                        className="font-serif text-lg text-black tabular-nums"
                      />
                      <span className="pb-0.5 text-[11px] font-light uppercase tracking-[0.1em] text-[#8a8a8a]">
                        {c.location.drive}
                      </span>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <SectionReveal delay={0.2} className="h-full">
              <div className="relative h-full min-h-[480px] overflow-hidden border border-black/10 bg-white">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d29070.915991322556!2d54.42772052679679!3d24.386016716099846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sae!4v1789469432321!5m2!1sen!2sae"
                  title={`${c.projectName} — ${c.location.cityLine}`}
                  className="absolute inset-0 h-full w-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />

                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.4 }}
                  className="absolute bottom-8 end-8 border border-black/10 bg-white/80 px-5 py-4 backdrop-blur-md"
                >
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#8a8a8a]">
                    {c.location.masterLocation}
                  </p>
                  <p className="mt-1 font-serif text-lg text-[#141414]">
                    {c.location.cityLine}
                  </p>
                </motion.div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}