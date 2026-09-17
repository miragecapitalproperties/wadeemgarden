"use client";

import { useSite } from "@/providers";
import SectionReveal from "@/components/SectionReveal";
import TextReveal from "@/components/TextReveal";
import Parallax from "@/components/Parallax";
import { MASTERPLAN_URL } from "@/config/project";

export default function ProjectIntro() {
  const { c } = useSite();

  return (
    <section id="about" className="relative bg-white py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionReveal>
              <p className="mb-8 text-tiny font-medium uppercase tracking-[0.45em] text-black">
                {c.about.eyebrow}
              </p>
            </SectionReveal>
            <TextReveal
              as="h2"
              text={c.about.heading}
              className="font-serif text-heading-1 text-[#141414]"
            />
          </div>

          <div className="flex items-end lg:col-span-5">
            <SectionReveal delay={0.2}>
              <p className="text-body-lg font-light leading-relaxed text-[#9a9a9a]">
                {c.about.para1}
              </p>
              <p className="mt-6 max-w-xl text-body font-light leading-relaxed text-[#8a8a8a]">
                {c.about.para2}
              </p>
            </SectionReveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:mt-24 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Parallax offset={40}>
              <SectionReveal delay={0.1}>
                <div className="relative overflow-hidden bg-white p-6 md:p-12">
                  <img
                    src={MASTERPLAN_URL}
                    alt={`${c.about.eyebrow} — Masterplan`}
                    className="pointer-events-none h-auto w-full mix-blend-multiply"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </SectionReveal>
            </Parallax>
          </div>

          <div className="hidden lg:col-span-5 lg:block">
            <div className="flex h-full flex-col justify-between">
              <div className="border-l-2 border-black/20 pl-8">
                <SectionReveal delay={0.25}>
                  <p className="font-serif text-heading-3 italic text-[#2a2a2a]">
                    &ldquo;{c.about.quote}&rdquo;
                  </p>
                </SectionReveal>
              </div>

              <div className="space-y-8">
                {c.about.facts.map((item, index) => (
                  <SectionReveal key={item.label} delay={0.15 * index}>
                    <div className="flex items-baseline justify-between border-b border-black/10 pb-4">
                      <span className="text-tiny uppercase tracking-[0.3em] text-[#8a8a8a]">
                        {item.label}
                      </span>
                      <span className="font-serif text-body-lg text-[#141414]">{item.value}</span>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 lg:hidden">
          {c.about.facts.map((item, index) => (
            <SectionReveal key={item.label} delay={0.1 * index}>
              <div className="flex items-baseline justify-between border-b border-black/10 pb-4">
                <span className="text-tiny uppercase tracking-[0.3em] text-[#8a8a8a]">
                  {item.label}
                </span>
                <span className="font-serif text-body-lg text-[#141414]">{item.value}</span>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}