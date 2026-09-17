"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { submitLead } from "@/lib/api";
import { useSite } from "@/providers";
import { joinClassNames } from "@/lib/utils";

export type LeadFormVariant = "modal" | "full" | "compact";

type LeadFormProps = {
  variant?: LeadFormVariant;
  ctaLabel?: string;
  onSuccess?: () => void;
  heading?: string;
  description?: string;
};

type FormState = "idle" | "submitting" | "success" | "error";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  propertyType: string;
  budget: string;
  message: string;
  consent: boolean;
};

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  propertyType: "",
  budget: "",
  message: "",
  consent: false,
};

const validEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const validPhone = (value: string) =>
  /^\+?\d{7,15}$/.test(value.replace(/[\s()-]/g, ""));

const inputClasses = (hasError: boolean) =>
  joinClassNames(
    "w-full rounded-none border bg-transparent px-4 py-3.5 text-sm text-[#141414] placeholder:text-gray-400 transition-colors duration-300 focus:outline-none focus:border-black/70",
    hasError ? "border-red-500/60" : "border-black/15 hover:border-black/30"
  );

const labelClasses = "mb-2 block text-tiny font-medium uppercase tracking-[0.25em] text-[#8a8a8a]";

export default function LeadForm({
  variant = "modal",
  ctaLabel,
  onSuccess,
  heading,
  description,
}: LeadFormProps) {
  const prefersReducedMotion = useReducedMotion();
  const { c } = useSite();
  const [form, setForm] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [formState, setFormState] = useState<FormState>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!form.fullName.trim()) newErrors.fullName = c.form.errFullName;
    if (!form.email.trim()) newErrors.email = c.form.errEmail;
    else if (!validEmail(form.email)) newErrors.email = c.form.errEmailInvalid;
    if (!form.phone.trim()) newErrors.phone = c.form.errPhone;
    else if (!validPhone(form.phone)) newErrors.phone = c.form.errPhoneInvalid;
    if (!form.country) newErrors.country = c.form.errCountry;
    if (!form.propertyType) newErrors.propertyType = c.form.errPropType;
    if (!form.budget) newErrors.budget = c.form.errBudget;
    if (!form.consent) newErrors.consent = c.form.errConsent;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const errorText = (field: keyof FormData) =>
    errors[field] ? <p className="mt-1 text-xs text-red-400">{errors[field]}</p> : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || formState === "submitting") return;

    setFormState("submitting");
    setSubmitError(null);
    try {
      await submitLead({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        country: form.country,
        propertyType: form.propertyType,
        budget: form.budget,
        message: form.message || undefined,
      });
      setFormState("success");
      onSuccess?.();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : null);
      setFormState("error");
    }
  };

  const showOptionalFields = variant === "full";
  const compact = variant === "compact";
  const submitLabel = ctaLabel ?? c.form.submit;

  if (formState === "success") {
    return (
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center py-14 text-center"
      >
        <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-black/20">
          <svg viewBox="0 0 24 24" fill="none" stroke="#010101" strokeWidth="1.5" className="h-7 w-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </span>
        <h3 className="font-serif text-heading-3 text-[#141414]">{c.form.successTitle}</h3>
        <p className="mt-4 max-w-md text-body font-light text-[#8a8a8a]">
          {c.form.successBody}
        </p>
      </motion.div>
    );
  }

  return (
    <div className={compact ? "" : "px-6 py-8 md:px-10 md:py-12"} id="lead-form">
      {(heading || variant !== "modal") && (
        <div className="mb-8">
          {heading && (
            <h3 className="font-serif text-heading-3 text-[#141414]">{heading}</h3>
          )}
          {description && (
            <p className="mt-3 text-body font-light text-[#8a8a8a]">{description}</p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label htmlFor="fullName" className={labelClasses}>
            {c.form.fullName}
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder={c.form.fullNamePh}
            value={form.fullName}
            onChange={handleChange}
            className={inputClasses(!!errors.fullName)}
            aria-invalid={!!errors.fullName}
          />
          {errorText("fullName")}
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            {c.form.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={c.form.emailPh}
            value={form.email}
            onChange={handleChange}
            className={inputClasses(!!errors.email)}
            aria-invalid={!!errors.email}
          />
          {errorText("email")}
        </div>

        <div>
          <label htmlFor="phone" className={labelClasses}>
            {c.form.phone}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder={c.form.phonePh}
            value={form.phone}
            onChange={handleChange}
            className={inputClasses(!!errors.phone)}
            aria-invalid={!!errors.phone}
          />
          {errorText("phone")}
        </div>

        <div>
          <label htmlFor="country" className={labelClasses}>
            {c.form.country}
          </label>
          <select
            id="country"
            name="country"
            value={form.country}
            onChange={handleChange}
            className={inputClasses(!!errors.country)}
            aria-invalid={!!errors.country}
          >
            <option value="" disabled className="bg-white">
              {c.form.countryPh}
            </option>
            {c.form.countries.map((country) => (
              <option key={country} value={country} className="bg-white">
                {country}
              </option>
            ))}
          </select>
          {errorText("country")}
        </div>

        <div className={compact ? "grid grid-cols-1 gap-5" : "grid grid-cols-1 gap-5 md:grid-cols-2"}>
          <div>
            <label htmlFor="propertyType" className={labelClasses}>
              {c.form.propType}
            </label>
            <select
              id="propertyType"
              name="propertyType"
              value={form.propertyType}
              onChange={handleChange}
              className={inputClasses(!!errors.propertyType)}
              aria-invalid={!!errors.propertyType}
            >
              <option value="" disabled className="bg-white">
                {c.form.propTypePh}
              </option>
              {c.form.propertyTypes.map((type) => (
                <option key={type} value={type} className="bg-white">
                  {type}
                </option>
              ))}
            </select>
            {errorText("propertyType")}
          </div>

          <div>
            <label htmlFor="budget" className={labelClasses}>
              {c.form.budget}
            </label>
            <select
              id="budget"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              className={inputClasses(!!errors.budget)}
              aria-invalid={!!errors.budget}
            >
              <option value="" disabled className="bg-white">
                {c.form.budgetPh}
              </option>
              {c.form.budgets.map((range) => (
                <option key={range} value={range} className="bg-white">
                  {range}
                </option>
              ))}
            </select>
            {errorText("budget")}
          </div>
        </div>

        {showOptionalFields && (
          <div>
            <label htmlFor="message" className={labelClasses}>
              {c.form.message}{" "}
              <span className="normal-case text-gray-600">{c.form.messageOptional}</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              placeholder={c.form.messagePh}
              value={form.message}
              onChange={handleChange}
              className={joinClassNames(inputClasses(false), "resize-none")}
            />
          </div>
        )}

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-xs text-[#8a8a8a]">
            <input
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={handleChange}
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-none border border-black/25 bg-transparent transition-colors duration-300 checked:border-black checked:bg-black"
              aria-invalid={!!errors.consent}
            />
            <span>
              {c.form.consent}
            </span>
          </label>
          {errorText("consent")}
        </div>

        <AnimatePresence>
          {formState === "error" && (
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="border border-red-500/40 bg-red-500/5 px-4 py-3 text-sm text-red-600"
            >
              {c.form.errorMsg}
              {submitError && <span className="mt-1 block text-xs opacity-80">{submitError}</span>}
            </motion.p>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={formState === "submitting"}
          className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden bg-gradient-to-r from-[#292929] to-[#010101] px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-white transition-all duration-400 hover:from-[#3d3d3d] hover:to-[#010101] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="relative z-10">
            {formState === "submitting" ? c.form.submitting : submitLabel}
          </span>
          {formState === "submitting" && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          )}
        </button>

        <p className="mt-4 text-center text-[11px] leading-relaxed text-[#5f5f5f]">
          {c.form.privacyNote}
        </p>
      </form>
    </div>
  );
}