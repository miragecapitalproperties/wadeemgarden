"use client";

import { useSite } from "@/providers";
import SectionReveal from "@/components/SectionReveal";
import LeadForm from "@/components/LeadForm";
import LuxuryImagePlaceholder from "@/components/LuxuryImagePlaceholder";
import { IMAGE_PATH } from "@/config/project";

export default function FinalCTA() {
  const { c } = useSite();

  return (
    <section id="register" className="relative overflow-hidden bg-white py-28 md:py-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-black/40 to-transparent" />
      <div className="pointer-events-none absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-black/5 blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col justify-center lg:col-span-6">
            <SectionReveal>
              <p className="mb-6 text-tiny font-medium uppercase tracking-[0.45em] text-black">
                {c.finalCta.eyebrow}
              </p>
              <h2 className="font-serif text-heading-1 text-[#141414]">
                {c.finalCta.title}
              </h2>
              <p className="mt-8 max-w-lg text-body-lg font-light leading-relaxed text-[#9a9a9a]">
                {c.finalCta.body}
              </p>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <div className="mt-12 hidden lg:block">
                <LuxuryImagePlaceholder
                  label={`${c.projectName} — ${c.location.cityLine}`}
                  image={`${IMAGE_PATH}/ex/12.webp`}
                  aspectRatio="wide"
                  showFrame={false}
                />
              </div>
            </SectionReveal>
          </div>

          <div className="lg:col-span-6">
            <SectionReveal delay={0.2}>
              <div className="relative border border-black/10 bg-[#f7f7f7] shadow-2xl shadow-black/5">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/60 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-grain opacity-40" />
                <div className="relative">
                  <LeadForm
                    variant="full"
                    ctaLabel={c.form.submit}
                    heading={c.form.heading}
                    description={c.form.description}
                  />
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}