"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { useForm, type FieldErrors, type Resolver } from "react-hook-form";
import { z } from "zod";
import { budgetRanges, compactQuoteSchema, contactPrefs, fullQuoteSchema, propertyTypes } from "@/lib/quoteSchema";

type Variant = "compact" | "full";
type Values = Record<string, unknown>;

/** Minimal zod → react-hook-form resolver (avoids an extra dependency). */
function zodResolver(schema: z.ZodType): Resolver<Values> {
  return async (values) => {
    // Unselected radios/selects come through as null; treat them as "not provided".
    const clean = Object.fromEntries(Object.entries(values).map(([k, v]) => [k, v === null ? undefined : v]));
    const r = schema.safeParse(clean);
    if (r.success) return { values: r.data as Values, errors: {} };
    const errors: Record<string, { type: string; message: string }> = {};
    for (const issue of r.error.issues) {
      const key = String(issue.path[0]);
      if (!errors[key]) errors[key] = { type: issue.code, message: issue.message };
    }
    return { values: {}, errors: errors as FieldErrors<Values> };
  };
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export function QuoteForm({
  variant = "full", cityName, citySlug, tone = "dark", idPrefix,
}: { variant?: Variant; cityName?: string; citySlug?: string; tone?: "dark" | "light"; idPrefix?: string }) {
  const router = useRouter();
  const autoId = useId();
  const pre = idPrefix ?? autoId;
  const [serverError, setServerError] = useState<string | null>(null);
  const schema = variant === "full" ? fullQuoteSchema : compactQuoteSchema;

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { variant, city: cityName ?? "", citySlug: citySlug ?? "", terms: false, smsConsent: false, company_website: "" },
  });

  useEffect(() => {
    setValue("pageUrl", window.location.href);
    const params = new URLSearchParams(window.location.search);
    for (const k of UTM_KEYS) {
      const v = params.get(k) ?? sessionStorageGet(k);
      if (v) {
        setValue(k, v);
        sessionStorageSet(k, v);
      }
    }
  }, [setValue]);

  async function onSubmit(values: Values) {
    setServerError(null);
    const res = await fetch("/api/quote/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }).catch(() => null);
    if (res?.ok) {
      router.push("/thank-you/");
      return;
    }
    setServerError("Something went wrong sending your request. Please try again or give us a call.");
  }

  const dark = tone === "dark";
  const label = `block text-sm font-medium ${dark ? "text-slate-200" : "text-slate-700"}`;
  const input = `mt-1 block w-full min-h-11 rounded-xl border px-3 py-2 text-base outline-none transition focus:border-cyan focus:ring-2 focus:ring-cyan/30 ${
    dark ? "border-white/15 bg-night/60 text-white placeholder:text-slate-500" : "border-slate-300 bg-white text-ink placeholder:text-slate-400"
  }`;
  const err = (name: string) => {
    const e = errors[name];
    return e?.message ? (
      <p id={`${pre}-${name}-err`} role="alert" className="mt-1 text-sm text-orange-400">{String(e.message)}</p>
    ) : null;
  };
  const field = (name: string, text: string, opts: { type?: string; autoComplete?: string; required?: boolean; placeholder?: string; inputMode?: "numeric" | "tel" | "email"; span?: boolean } = {}) => (
    <div className={opts.span ? "sm:col-span-2" : undefined}>
      <label htmlFor={`${pre}-${name}`} className={label}>{text}{opts.required && <span className="text-zia"> *</span>}</label>
      <input
        id={`${pre}-${name}`}
        type={opts.type ?? "text"}
        autoComplete={opts.autoComplete}
        inputMode={opts.inputMode}
        placeholder={opts.placeholder}
        aria-invalid={errors[name] ? true : undefined}
        aria-describedby={errors[name] ? `${pre}-${name}-err` : undefined}
        className={input}
        {...register(name)}
      />
      {err(name)}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit, () => setServerError("Please check the fields above and try again."))} noValidate className="space-y-4" aria-label="Free quote request">
      <div className="grid gap-4 sm:grid-cols-2">
        {field("firstName", "First name", { autoComplete: "given-name", required: true })}
        {field("lastName", "Last name", { autoComplete: "family-name", required: true })}
        {field("email", "Email", { type: "email", autoComplete: "email", required: true, inputMode: "email" })}
        {field("phone", "Phone", { type: "tel", autoComplete: "tel", required: true, inputMode: "tel" })}
        {variant === "full" && field("street", "Street address", { autoComplete: "street-address", required: true, span: true })}
        {variant === "full" && field("city", "City", { autoComplete: "address-level2", required: true })}
        {field("zip", "ZIP code", { autoComplete: "postal-code", required: true, inputMode: "numeric" })}
        <div className={variant === "compact" ? "" : "sm:col-span-2"}>
          <label htmlFor={`${pre}-propertyType`} className={label}>Property type<span className="text-zia"> *</span></label>
          <select id={`${pre}-propertyType`} className={input} defaultValue="" aria-invalid={errors.propertyType ? true : undefined} {...register("propertyType")}>
            <option value="" disabled>Select…</option>
            {propertyTypes.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          {err("propertyType")}
        </div>
        {variant === "full" && (
          <>
            {field("linearFeet", "Approx. linear feet", { placeholder: "e.g. 150, or “Not sure”" })}
            <div>
              <label htmlFor={`${pre}-budget`} className={label}>Budget range</label>
              <select id={`${pre}-budget`} className={input} defaultValue="" {...register("budget")}>
                <option value="">Select…</option>
                {budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <fieldset className="sm:col-span-2">
              <legend className={label}>Preferred contact</legend>
              <div className="mt-2 flex flex-wrap gap-3">
                {contactPrefs.map((c) => (
                  <label key={c} className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 ${dark ? "border-white/15 text-slate-200" : "border-slate-300 text-slate-700"}`}>
                    <input type="radio" value={c} className="accent-cyan-400" {...register("contactPref")} /> {c}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="sm:col-span-2">
              <label htmlFor={`${pre}-message`} className={label}>Message</label>
              <textarea id={`${pre}-message`} rows={4} className={input} placeholder="Tell us about your home, roofline or project" {...register("message")} />
            </div>
          </>
        )}
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${pre}-company_website`}>Leave this field empty</label>
        <input id={`${pre}-company_website`} tabIndex={-1} autoComplete="off" {...register("company_website")} />
      </div>
      <input type="hidden" {...register("variant")} />
      <input type="hidden" {...register("pageUrl")} />
      <input type="hidden" {...register("citySlug")} />
      {UTM_KEYS.map((k) => <input key={k} type="hidden" {...register(k)} />)}

      <div className={`space-y-3 text-sm ${dark ? "text-slate-400" : "text-slate-600"}`}>
        <label className="flex gap-3">
          <input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-cyan-400" {...register("smsConsent")} />
          <span>
            I agree to receive calls and text messages about my quote from Albuquerque Permanent Lighting Co. at the number
            provided, which may use automated technology. Consent is not a condition of purchase. Msg &amp; data rates may apply.
            Reply STOP to opt out.
          </span>
        </label>
        <label className="flex gap-3">
          <input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-cyan-400" aria-invalid={errors.terms ? true : undefined} {...register("terms")} />
          <span>
            I agree to the <Link href="/terms-and-conditions/" className="underline hover:text-cyan">Terms</Link> and{" "}
            <Link href="/privacy-policy/" className="underline hover:text-cyan">Privacy Policy</Link>.<span className="text-zia"> *</span>
          </span>
        </label>
        {err("terms")}
      </div>

      {serverError && <p role="alert" className="rounded-xl bg-orange-500/10 p-3 text-sm text-orange-400">{serverError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-gradient-accent inline-flex min-h-12 w-full items-center justify-center rounded-full px-6 py-3 font-semibold text-night shadow-lg shadow-cyan/20 transition hover:brightness-110 disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Get My Free Quote"}
      </button>
    </form>
  );
}

function sessionStorageGet(k: string): string | null {
  try {
    return window.sessionStorage.getItem(k);
  } catch {
    return null;
  }
}
function sessionStorageSet(k: string, v: string) {
  try {
    window.sessionStorage.setItem(k, v);
  } catch {
    /* storage unavailable */
  }
}
