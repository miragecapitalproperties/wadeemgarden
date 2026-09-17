"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  content,
  CURRENCIES,
  DEFAULT_CURRENCY,
  DEFAULT_LANGUAGE,
  type Content,
  type CurrencyCode,
  type Language,
} from "@/lib/content";

type SiteContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
  c: Content;
  dir: "ltr" | "rtl";
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  money: (aedValue: number) => string;
  grouped: (aedValue: number) => string;
  compact: (aedValue: number) => string;
};

const SiteContext = createContext<SiteContextValue | null>(null);

const LANGUAGE_LOCALE: Record<Language, string> = {
  en: "en-AE",
  ar: "ar-AE-u-nu-latn",
};

function getRate(currency: CurrencyCode) {
  return CURRENCIES.find((item) => item.code === currency)?.rate ?? 1;
}

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>(DEFAULT_LANGUAGE);
  const [currency, setCurrency] = useState<CurrencyCode>(DEFAULT_CURRENCY);

  const c = content[lang] as Content;
  const dir = c.dir as "ltr" | "rtl";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const money = useCallback(
    (aedValue: number) =>
      new Intl.NumberFormat(LANGUAGE_LOCALE[lang], {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(aedValue * getRate(currency)),
    [lang, currency]
  );

  const grouped = useCallback(
    (aedValue: number) =>
      new Intl.NumberFormat(LANGUAGE_LOCALE[lang], {
        maximumFractionDigits: 0,
      }).format(aedValue * getRate(currency)),
    [lang, currency]
  );

  const compact = useCallback(
    (aedValue: number) => {
      const value = Math.abs(aedValue) * getRate(currency);
      const trim = (n: number) =>
        Number.isInteger(n) ? String(n) : String(n.toFixed(1)).replace(/\.0$/, "");
      if (value >= 1_000_000) return `${trim(value / 1_000_000)}M`;
      if (value >= 1_000) return `${trim(value / 1_000)}K`;
      return grouped(aedValue);
    },
    [currency, grouped]
  );

  const value = useMemo(
    () => ({ lang, setLang, c, dir, currency, setCurrency, money, grouped, compact }),
    [lang, c, dir, currency, money, grouped, compact]
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within a SiteProvider");
  return ctx;
}