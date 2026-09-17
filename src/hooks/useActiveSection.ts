"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/config/project";

const NAV_OFFSET = 140;

export function useActiveSection() {
  const [activeHref, setActiveHref] = useState("");

  useEffect(() => {
    const ids = navLinks.map((link) => link.href.replace("#", ""));

    const updateActive = () => {
      let current = "";

      for (const id of ids) {
        const element = document.getElementById(id);
        if (!element) continue;
        if (element.getBoundingClientRect().top - NAV_OFFSET <= 0) {
          current = `#${id}`;
        }
      }

      setActiveHref(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  return { activeHref, setActiveHref };
}
