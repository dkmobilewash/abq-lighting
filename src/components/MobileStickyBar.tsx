import Link from "next/link";
import { Phone } from "lucide-react";
import { telHref } from "@/data/business";

export function MobileStickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-line bg-night/95 p-2 backdrop-blur lg:hidden" style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}>
      <a href={telHref()} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 font-semibold text-white">
        <Phone className="h-4 w-4" aria-hidden="true" /> Call
      </a>
      <Link href="/get-a-quote/#quote-form" className="bg-gradient-accent inline-flex min-h-12 items-center justify-center rounded-full font-semibold text-night">
        Free Quote
      </Link>
    </div>
  );
}
