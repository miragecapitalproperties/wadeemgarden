"use client";

import { motion, useReducedMotion } from "framer-motion";
import { amenitiesList } from "@/config/project";
import { useSite } from "@/providers";
import SectionReveal from "@/components/SectionReveal";

type AmenityIcon = {
  viewBox?: string;
  paths: string[];
};

const AMENITY_ICONS: AmenityIcon[] = [
  {
    viewBox: "0 0 24 24",
    paths: [
      "M3 20c0-8 3-13 9-13s9 5 9 13",
      "M5 20c0-6 2.5-10 7-10s7 4 7 10",
      "M12 3v2",
    ],
  },
  {
    viewBox: "0 0 24 24",
    paths: [
      "M3 20c0-6 4-9 9-9s9 3 9 9",
      "M12 17v3M8 21l4-4 4 4",
      "M12 21v-4",
    ],
  },
  {
    viewBox: "0 0 24 24",
    paths: [
      "M3 21h18",
      "M5 21V8l7-5 7 5v13",
      "M10 21v-6h4v6",
    ],
  },
  {
    viewBox: "0 0 24 24",
    paths: [
      "M3 21h18",
      "M6 21V6l6-3 6 3v15",
      "M10 12h4M10 16h4",
    ],
  },
  {
    viewBox: "0 0 24 24",
    paths: [
      "M12 3v18M3 12h18",
      "M9 3h6M9 21h6",
    ],
  },
  {
    viewBox: "0 0 24 24",
    paths: [
      "M3 21h18",
      "M3 15c1.8-2 3.4 1.2 5-.2 2.2-1.9 3.8 1.4 6-.2",
      "M18 9l1.5-2.5L21 9l-1.5 2.5z",
    ],
  },
  {
    viewBox: "0 0 24 24",
    paths: [
      "M4 21V7l8-4 8 4v14",
      "M9 21v-6h6v6",
      "M9 9h.01M15 9h.01",
    ],
  },
  {
    viewBox: "0 0 24 24",
    paths: [
      "M12 4L2 9l10 5 10-5L12 4z",
      "M6 11.5V17c0 1.6 2.7 3 6 3s6-1.4 6-3v-5.5",
      "M22 10v5.5",
    ],
  },
  {
    viewBox: "0 0 24 24",
    paths: [
      "M4 7h16v12H4z",
      "M4 11h16",
      "M8 7L6 11M12 7l-2 4M16 7l-2 4M20 7l-2 4",
      "M8 16h8",
    ],
  },
];

const viewBoxPath = (icon: AmenityIcon) => icon.viewBox || "0 0 24 24";

export default function Amenities() {
  const prefersReducedMotion = useReducedMotion();
  const { c } = useSite();

  return (
    <section id="amenities" className="relative bg-[#f7f7f7] py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionReveal>
            <p className="mb-6 text-tiny font-medium uppercase tracking-[0.45em] text-black">
              {c.amenities.eyebrow}
            </p>
            <h2 className="max-w-2xl font-serif text-heading-1 text-[#141414]">
              {c.amenities.title}
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <p className="max-w-md text-body font-light text-[#8a8a8a]">
              {c.amenities.body}
            </p>
          </SectionReveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-9">
          {amenitiesList.map((amenity, index) => (
            <motion.div
              key={`${amenity.name}-${index}`}
              className="group flex flex-col items-center px-2 py-8 text-center"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (index % 6) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="mb-4 flex h-12 w-12 items-center justify-center text-[#141414]">
                <svg viewBox={viewBoxPath(AMENITY_ICONS[index])} fill="none" stroke="currentColor" strokeWidth="1.2" className="h-6 w-6">
                  {AMENITY_ICONS[index].paths.map((path, i) => (
                    <path key={i} strokeLinecap="round" strokeLinejoin="round" d={path} />
                  ))}
                </svg>
              </span>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#4a4a4a]">
                {c.amenities.items[index]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}