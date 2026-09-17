"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { eoiTimeline, paymentPlan, projectData } from "@/config/project";
import { CURRENCIES } from "@/lib/content";
import { useSite } from "@/providers";
import SectionReveal from "@/components/SectionReveal";
import { joinClassNames } from "@/lib/utils";

const PRESET_PRICES = [8700000, 10200000, 11600000];
const MIN_PRICE = 100000;

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const parsePrice = (raw: string) => {
  const clean = raw.replace(/[^\d]/g, "");
  return clean ? parseInt(clean, 10) : 0;
};

export default function PaymentCalculator() {
  const prefersReducedMotion = useReducedMotion();
  const { c, lang, currency, grouped, money } = useSite();
  const [propertyPrice, setPropertyPrice] = useState(projectData.startingPriceValue);
  const [priceInput, setPriceInput] = useState(() => grouped(projectData.startingPriceValue));
  const [animateKey, setAnimateKey] = useState(0);
  const propertyPriceRef = useRef(propertyPrice);
  propertyPriceRef.current = propertyPrice;

  const rate = useMemo(
    () => CURRENCIES.find((item) => item.code === currency)?.rate ?? 1,
    [currency]
  );

  const [nationality, setNationality] = useState<"uae" | "other">("other");
  const isUae = nationality === "uae";

  useEffect(() => {
    setPriceInput(grouped(propertyPriceRef.current));
  }, [currency, lang, grouped]);

  useEffect(() => {
    setAnimateKey((key) => key + 1);
  }, [propertyPrice]);

  const breakdown = useMemo(
    () =>
      paymentPlan.schedule.map((item) => ({
        ...item,
        amount: (propertyPrice * item.percent) / 100,
      })),
    [propertyPrice]
  );

  const buyerAmount = (propertyPrice * paymentPlan.buyerPercent) / 100;
  const financedAmount = (propertyPrice * paymentPlan.financedPercent) / 100;
  const MODON_REBATE_PERCENT = 5;
  const modonRebate = isUae ? (propertyPrice * MODON_REBATE_PERCENT) / 100 : 0;
  const netBuyerAmount = buyerAmount - modonRebate;

  const handlePriceBlur = () => {
    const value = Math.max(MIN_PRICE, propertyPrice);
    setPropertyPrice(value);
    setPriceInput(grouped(value));
  };

  const handlePreset = (price: number) => {
    setPropertyPrice(price);
    setPriceInput(grouped(price));
  };

  const maxPercent = Math.max(
    ...paymentPlan.schedule.map((item) => item.percent),
    0.0001
  );

  const formatEoiDate = (raw: string) => {
    const [day, month, year] = raw.split(" ");
    const monthIndex = MONTHS.indexOf(month);
    if (monthIndex === -1) return raw;
    return new Intl.DateTimeFormat(lang === "ar" ? "ar-AE" : "en-AE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(Number(year), monthIndex, Number(day)));
  };

  const numberBlock = (
    <motion.div
      key={animateKey}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <p
        className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] leading-tight text-[#141414] tabular-nums"
        aria-live="polite"
      >
        {money(propertyPrice)}
      </p>
    </motion.div>
  );

  const payerBadge = (payer: string) =>
    payer === "ADIB" ? (
      <span className="border border-black/30 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.15em] text-black">
        ADIB
      </span>
    ) : (
      <span className="bg-[#141414] px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.15em] text-white">
        {c.payment.payerBuyer}
      </span>
    );

  return (
    <section id="payment" className="relative overflow-hidden bg-white py-28 md:py-40">
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-black/5 blur-[120px]" />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionReveal>
          <p className="mb-6 text-tiny font-medium uppercase tracking-[0.45em] text-black">
            {c.payment.eyebrow}
          </p>
          <h2 className="max-w-3xl font-serif text-heading-1 text-[#141414]">
            {c.payment.title}
          </h2>
          <p className="mt-8 max-w-xl text-body-lg font-light text-[#9a9a9a]">
            {c.payment.body1} {paymentPlan.buyerPercent}% {c.payment.body2}{" "}
            {paymentPlan.financedPercent}%.
          </p>
        </SectionReveal>

        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionReveal delay={0.1}>
              <div className="border border-black/10 bg-[#f7f7f7] p-8 md:p-10">
                <label
                  htmlFor="property-price"
                  className="mb-4 block text-tiny font-medium uppercase tracking-[0.3em] text-[#8a8a8a]"
                >
                  {c.payment.propertyPrice}
                </label>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-2xl text-black">{currency}</span>
                  <input
                    id="property-price"
                    type="text"
                    inputMode="numeric"
                    value={priceInput}
                    disabled
                    readOnly
                    onBlur={handlePriceBlur}
                    className="w-full border-b border-black/15 bg-transparent pb-3 font-serif text-[clamp(1.8rem,3vw,2.6rem)] text-[#141414] tabular-nums focus:border-black/70 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                    aria-label={`${c.payment.propertyPrice} (${currency})`}
                  />
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {PRESET_PRICES.map((price) => (
                    <button
                      key={price}
                      onClick={() => handlePreset(price)}
                      className={joinClassNames(
                        "border px-4 py-2 text-xs tracking-[0.1em] transition-all duration-300",
                        propertyPrice === price
                          ? "border-black bg-black/5 text-black"
                          : "border-black/15 text-[#8a8a8a] hover:border-black/40 hover:text-[#141414]"
                      )}
                    >
                      {money(price)}
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-[11px] font-light text-[#8a8a8a]">
                  {c.payment.selectPreset}
                </p>

                <div className="mt-10">
                  <p className="mb-4 text-tiny font-medium uppercase tracking-[0.3em] text-[#8a8a8a]">
                    {c.payment.nationality}
                  </p>
                  <div className="flex border border-black/15">
                    <button
                      onClick={() => setNationality("other")}
                      aria-pressed={!isUae}
                      className={joinClassNames(
                        "flex-1 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300",
                        !isUae
                          ? "bg-[#010101] text-white"
                          : "bg-transparent text-[#4a4a4a] hover:text-[#141414]"
                      )}
                    >
                      {c.payment.otherNationality}
                    </button>
                    <button
                      onClick={() => setNationality("uae")}
                      aria-pressed={isUae}
                      className={joinClassNames(
                        "flex-1 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300",
                        isUae
                          ? "bg-[#010101] text-white"
                          : "bg-transparent text-[#4a4a4a] hover:text-[#141414]"
                      )}
                    >
                      {c.payment.uaeNational}
                    </button>
                  </div>
                  {isUae && (
                    <p className="mt-3 text-[11px] font-light leading-relaxed text-[#9a9a9a]">
                      {c.payment.modonRebateHint}
                    </p>
                  )}
                </div>

                <div className="mt-10 border border-black/10 bg-white p-6">
                  <p className="text-tiny font-medium uppercase tracking-[0.28em] text-[#8a8a8a]">
                    {c.payment.solution}
                  </p>
                  <p className="mt-3 font-serif text-heading-3 text-[#141414]">
                    {c.payment.planName}
                  </p>
                  <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.3em] text-black">
                    {c.payment.withPartner}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-y border-black/10 py-5">
                    <div>
                      <p className="font-serif text-2xl text-black tabular-nums">
                        {paymentPlan.buyerPercent}%
                      </p>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#8a8a8a]">
                        {c.payment.buyerPocket}
                      </p>
                    </div>
                    <div className="h-px w-8 bg-black/40" />
                    <div className="text-right">
                      <p className="font-serif text-2xl text-[#141414] tabular-nums">
                        {paymentPlan.financedPercent}%
                      </p>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#8a8a8a]">
                        {c.payment.financed}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 border border-black/10 bg-white p-6">
                  <p className="text-tiny font-medium uppercase tracking-[0.28em] text-[#8a8a8a]">
                    {c.payment.eoi}
                  </p>
                  <ul className="mt-5 space-y-3">
                    <li className="flex items-center justify-between gap-4 text-sm">
                      <span className="font-light text-[#8a8a8a]">{c.payment.eoiWindow}</span>
                      <span className="font-medium text-[#141414]">
                        {formatEoiDate(eoiTimeline.starts)} &ndash; {formatEoiDate(eoiTimeline.ends)}
                      </span>
                    </li>
                    <li className="flex items-center justify-between gap-4 text-sm">
                      <span className="font-light text-[#8a8a8a]">{c.payment.eoiVip}</span>
                      <span className="font-medium text-[#141414]">{formatEoiDate(eoiTimeline.vipSales)}</span>
                    </li>
                    <li className="flex items-center justify-between gap-4 text-sm">
                      <span className="font-light text-[#8a8a8a]">{c.payment.eoiLaunch}</span>
                      <span className="font-medium text-[#141414]">{formatEoiDate(eoiTimeline.salesLaunch)}</span>
                    </li>
                    <li className="flex items-center justify-between gap-4 text-sm">
                      <span className="font-light text-[#8a8a8a]">{c.payment.eoiValue}</span>
                      <span className="font-medium text-black">{money(50000)}</span>
                    </li>
                  </ul>
                  <p className="mt-5 pt-4 text-xs font-light leading-relaxed text-[#9a9a9a]">
                    {c.payment.eoiNote}
                  </p>
                </div>
              </div>
            </SectionReveal>
          </div>

          <div className="lg:col-span-7">
            <SectionReveal delay={0.2}>
              <div className="border border-black/10 bg-[#f7f7f7] p-8 md:p-12">
                <div className="flex items-baseline justify-between gap-6">
                  <div>
                    <p className="mb-3 text-tiny font-medium uppercase tracking-[0.3em] text-[#8a8a8a]">
                      {c.payment.totalPrice}
                    </p>
                    {numberBlock}
                  </div>
                  <p className="text-right font-serif text-4xl text-black tabular-nums">
                    {c.paymentPlan}
                  </p>
                </div>

                <div className="mt-12 space-y-8">
                  {breakdown.map((item, index) => (
                    <div key={item.stage}>
                      <div className="mb-3 flex items-baseline justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#141414]">
                              {c.payment.stageLabels[index]}
                            </p>
                            {payerBadge(item.payer)}
                          </div>
                          <p className="mt-1 text-xs font-light text-[#8a8a8a]">{c.payment.details[index]}</p>
                        </div>
                        <div className="text-right">
                          <AnimatePresence mode="wait">
                            <motion.p
                              key={`${item.stage}-${animateKey}`}
                              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
                              transition={{ duration: 0.4, delay: index * 0.05 }}
                              className="font-serif text-xl text-[#141414] tabular-nums md:text-2xl"
                            >
                              {money(item.amount)}
                            </motion.p>
                          </AnimatePresence>
                          <p className="mt-1 text-xs tracking-[0.1em] text-black">
                            {item.percent}%
                          </p>
                        </div>
                      </div>
                      <div className="relative h-px bg-black/10">
                        <motion.div
                          key={`bar-${item.stage}-${animateKey}`}
                          initial={prefersReducedMotion ? { width: `${(item.percent / maxPercent) * 100}%` } : { width: 0 }}
                          animate={{ width: `${(item.percent / maxPercent) * 100}%` }}
                          transition={{ duration: 1.2, delay: 0.2 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute inset-y-0 start-0 bg-gradient-to-r from-[#292929] to-[#010101]"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 border-t border-black/10 pt-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-tiny uppercase tracking-[0.3em] text-[#8a8a8a]">
                      {c.payment.financedBy}
                    </p>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={`balance-${animateKey}`}
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
                        transition={{ duration: 0.5 }}
                        className="font-serif text-2xl text-black tabular-nums"
                      >
                        {money(financedAmount)}
                      </motion.p>
                    </AnimatePresence>
                  </div>
<p className="mt-3 text-sm font-light leading-relaxed text-[#9a9a9a]">
                  {c.payment.summary} {paymentPlan.buyerPercent}% {c.payment.summary2} (
                  {money(buyerAmount)}); {c.payment.summary3} {paymentPlan.financedPercent}%{" "}
                  {c.payment.summary4}
                </p>

                {isUae && (
                  <div className="mt-5 border border-black/15 bg-[#010101] p-5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/70">
                        {c.payment.modonRebate}
                      </span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={`rebate-${animateKey}`}
                          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
                          transition={{ duration: 0.5 }}
                          className="font-serif text-xl text-white tabular-nums"
                        >
                          -{money(modonRebate)}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-4 border-t border-white/15 pt-3">
                      <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/70">
                        {c.payment.netOutOfPocket}
                      </span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={`net-${animateKey}`}
                          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
                          transition={{ duration: 0.5 }}
                          className="font-serif text-2xl font-medium text-white tabular-nums"
                        >
                          {money(netBuyerAmount)}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </div>
                )}
                </div>

                <div className="mt-10 flex flex-col gap-3 border border-black/15 bg-black/[0.03] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-light text-[#8a8a8a]">
                    {c.payment.startingFrom}{" "}
                    <span className="font-medium text-black">{money(projectData.startingPriceValue)}</span>{" "}
                    {c.payment.withHandover} {c.handover}.
                  </p>
                </div>

                <p className="mt-8 text-[11px] font-light leading-relaxed text-[#5f5f5f]">
                  {c.payment.footnote}
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}