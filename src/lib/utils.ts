import type React from "react";

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const formatAED = (value: number) =>
  new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(value);

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-AE").format(value);

export const formatCompactNumber = (value: number) =>
  new Intl.NumberFormat("en-AE", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

export const smoothScrollToId = (id: string) => {
  const element = document.getElementById(id);
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export const joinClassNames = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(" ");

export type IconName =
  | "city"
  | "plane"
  | "entertainment"
  | "museum"
  | "business"
  | "shopping"
  | "health"
  | "education";