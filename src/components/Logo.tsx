import Link from "next/link";
import { business } from "@/data/business";

/** Wordmark + original Zia-inspired sun-and-roofline mark. Replace with final logo artwork. */
export function Logo() {
  return (
    <Link href="/" className="flex min-h-11 items-center gap-2.5" aria-label={`${business.name} home`}>
      <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
        <circle cx="20" cy="20" r="6" fill="#F2B705" />
        <g stroke="#F2B705" strokeWidth="2.2" strokeLinecap="round">
          <path d="M20 4v6M16 5v5M24 5v5M20 36v-6M16 35v-5M24 35v-5M4 20h6M5 16h5M5 24h5M36 20h-6M35 16h-5M35 24h-5" />
        </g>
        <path d="M6 27 L20 17 L34 27" fill="none" stroke="#22D3EE" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="leading-tight">
        <span className="block font-heading text-base font-semibold text-white">ABQ Permanent</span>
        <span className="block text-xs font-medium uppercase tracking-[0.2em] text-cyan">Lighting Co.</span>
      </span>
    </Link>
  );
}
