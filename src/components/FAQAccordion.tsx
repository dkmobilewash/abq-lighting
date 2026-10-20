import { Plus } from "lucide-react";
import type { FAQ } from "@/data/types";

/** Zero-JS accordion. Pair with faqNode() in the page's JSON-LD graph. */
export function FAQAccordion({ faqs, tone = "light" }: { faqs: FAQ[]; tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <div className="space-y-3">
      {faqs.map((f, i) => (
        <details key={i} className={dark ? "card group" : "card-light group"}>
          <summary className={`flex min-h-11 cursor-pointer items-center justify-between gap-4 p-5 text-left font-heading text-lg font-medium ${dark ? "text-white" : "text-ink"}`}>
            <h3 className="text-base sm:text-lg">{f.q}</h3>
            <Plus className={`faq-icon h-5 w-5 shrink-0 transition-transform ${dark ? "text-cyan" : "text-chile"}`} aria-hidden="true" />
          </summary>
          <p className={`px-5 pb-5 leading-relaxed ${dark ? "text-slate-300" : "text-slate-600"}`}>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
