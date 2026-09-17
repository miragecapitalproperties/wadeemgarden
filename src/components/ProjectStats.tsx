"use client";

import { projectData } from "@/config/project";
import { useSite } from "@/providers";
import SectionReveal from "@/components/SectionReveal";

export default function ProjectStats() {
  const { c, compact } = useSite();

  const stats = [
    {
      label: c.stats.labels.starting,
      display: compact(projectData.startingPriceValue),
    },
    {
      label: c.stats.labels.bedrooms,
      display: c.bedrooms,
    },
    {
      label: c.stats.labels.payment,
      display: c.paymentPlan,
    },
    {
      label: c.stats.labels.handover,
      display: c.handover,
    },
    {
      label: c.stats.labels.location,
      display: c.location.cityLine,
    },
    {
      label: c.stats.labels.status,
      display: c.status,
    },
  ];

  return (
    <section className="relative border-y border-black/10 bg-[#f7f7f7] py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.04),transparent_60%)]" />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionReveal>
          <p className="mb-4 text-center text-tiny font-medium uppercase tracking-[0.45em] text-black">
            {c.stats.eyebrow}
          </p>
          <h2 className="text-center font-serif text-heading-2 text-[#141414]">
            {c.stats.title}
          </h2>
        </SectionReveal>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat, index) => (
            <SectionReveal key={stat.label} delay={index * 0.08}>
              <div className="flex h-full flex-col justify-between gap-10 border-t border-black/15 pt-6">
                <span className="text-tiny font-medium tracking-[0.3em] text-[#b5b5b5]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-serif text-[1.6rem] leading-tight text-[#141414] md:text-heading-3">
                    {stat.display}
                  </p>
                  <p className="mt-3 text-tiny font-medium uppercase tracking-[0.25em] text-[#8a8a8a]">
                    {stat.label}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.2}>
          <p className="mt-10 text-center text-sm font-light text-[#8a8a8a]">
            {c.projectName} — {c.bedrooms} {c.stats.subtitle}{" "}
            {compact(projectData.startingPriceValue)}.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}