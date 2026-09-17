"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { propertyTypes } from "@/config/project";
import { useSite } from "@/providers";
import SectionReveal from "@/components/SectionReveal";
import LuxuryImagePlaceholder from "@/components/LuxuryImagePlaceholder";
import Button from "@/components/Button";

type Variant = "arabian" | "modern";

function PropertyCard({
  property,
  card,
  index,
}: {
  property: (typeof propertyTypes)[number];
  card: { name: string; style: string; features: string[] };
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const { c, money } = useSite();
  const [variant, setVariant] = useState<Variant>("arabian");

  return (
    <motion.div
      className="group relative bg-white"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={variant}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <LuxuryImagePlaceholder
              label={card.name.toUpperCase()}
              aspectRatio="card"
              showFrame={false}
              image={property.images[variant]}
              className="transition-transform duration-1000 ease-out group-hover:scale-[1.06]"
            />
          </motion.div>
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80" />
        <span className="pointer-events-none absolute right-5 top-5 font-serif text-lg text-black/80">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-col p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="font-serif text-heading-3 text-[#141414]">{card.name}</h3>
        </div>

        <div className="mt-5 flex w-max divide-x divide-black/15 border border-black/15">
          <button
            type="button"
            onClick={() => setVariant("arabian")}
            className={`px-5 py-2 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
              variant === "arabian"
                ? "bg-[#010101] text-white"
                : "text-[#4a4a4a] hover:bg-black/5"
            }`}
          >
            {c.propertyTypes.arabian}
          </button>
          <button
            type="button"
            onClick={() => setVariant("modern")}
            className={`px-5 py-2 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
              variant === "modern"
                ? "bg-[#010101] text-white"
                : "text-[#4a4a4a] hover:bg-black/5"
            }`}
          >
            {c.propertyTypes.modern}
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 divide-x divide-black/10 border-y border-black/10">
          <div className="py-4">
            <p className="text-tiny uppercase tracking-[0.2em] text-[#8a8a8a]">
              {c.propertyTypes.plotAreaLabel}
            </p>
            <p className="mt-1 font-serif text-lg text-[#141414]">{property.plotArea}</p>
          </div>
          <div className="px-4">
            <p className="text-tiny uppercase tracking-[0.2em] text-[#8a8a8a]">
              {c.propertyTypes.gsaLabel}
            </p>
            <p className="mt-1 font-serif text-lg text-[#141414]">{property.gsa}</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {card.features.slice(0, 3).map((feature) => (
            <p key={feature} className="flex items-center gap-3 text-sm font-light text-[#9a9a9a]">
              <span className="h-px w-4 bg-black/40" />
              {feature}
            </p>
          ))}
        </div>

        <div className="mt-8 border-t border-black/10 pt-6">
          <div className="flex items-baseline justify-between">
            <span className="text-tiny uppercase tracking-[0.2em] text-[#8a8a8a]">
              {property.bedrooms} {c.stats.labels.bedrooms}
            </span>
            <span className="text-tiny uppercase tracking-[0.2em] text-[#8a8a8a]">
              {variant === "arabian" ? c.propertyTypes.arabian : c.propertyTypes.modern}
            </span>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-sm font-medium uppercase tracking-[0.15em] text-[#141414]">
              {c.propertyTypes.startingFrom}
            </span>
            <span className="font-serif text-body-lg text-black">
              {money(property.priceValue)}
            </span>
          </div>
        </div>

        <div className="mt-8">
          <Button
            variant="outline"
            size="sm"
            href="#register"
            className="w-full justify-center"
          >
            {c.propertyTypes.explore}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function PropertyTypes() {
  const { c } = useSite();

  return (
    <section className="relative overflow-hidden bg-[#f7f7f7] py-28 md:py-40">
      <div className="pointer-events-none absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-black/5 blur-[120px]" />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionReveal>
            <p className="mb-6 text-tiny font-medium uppercase tracking-[0.45em] text-black">
              {c.propertyTypes.eyebrow}
            </p>
            <h2 className="max-w-2xl font-serif text-heading-1 text-[#141414]">
              {c.propertyTypes.title}
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="max-w-md text-body font-light text-[#8a8a8a]">
              {c.propertyTypes.body}
            </p>
          </SectionReveal>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
          {propertyTypes.map((property, index) => (
            <PropertyCard
              key={property.name}
              property={property}
              card={c.propertyTypes.cards[index]}
              index={index}
            />
          ))}
        </div>

        <SectionReveal delay={0.2}>
          <p className="mt-12 text-center text-sm font-light text-[#8a8a8a]">
            {c.propertyTypes.footnote}
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}