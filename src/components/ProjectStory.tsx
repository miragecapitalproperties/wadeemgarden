"use client";

import { useSite } from "@/providers";
import SectionReveal from "@/components/SectionReveal";

export default function ProjectStory() {
  const { c } = useSite();

  return (
    <section id="project" className="relative overflow-hidden bg-white py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionReveal className="mx-auto max-w-4xl text-center">
          <h2 className="font-serif leading-[0.9] tracking-tight text-[#141414]">
            <span className="block text-heading-1 md:text-display">{c.story.titleLine1}</span>
            <span className="block text-heading-1 md:text-display italic">{c.story.titleLine2}</span>
          </h2>
          <p className="mx-auto mt-10 max-w-2xl text-body-lg font-light leading-relaxed text-[#8a8a8a]">
            {c.story.brief}
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}