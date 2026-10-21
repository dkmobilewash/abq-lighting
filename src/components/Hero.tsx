import Image from "next/image";
import type { ReactNode } from "react";
import { Button, Eyebrow, QuoteButton } from "./ui";
import { QuoteForm } from "./QuoteForm";

/**
 * Full-bleed night hero. `title` may include an <span className="accent-underline"> accent word.
 * With `form`, a compact quote form shows on the right (desktop only).
 */
export function Hero({
  eyebrow, title, subhead, image = "/images/hero-albuquerque-stucco-home-night.jpg", imageAlt,
  form, cityName, citySlug, secondary = { href: "/project-showcase/", label: "View Projects" }, primaryLabel, children,
}: {
  eyebrow: string;
  title: ReactNode;
  subhead: string;
  image?: string;
  imageAlt: string;
  form?: boolean;
  cityName?: string;
  citySlug?: string;
  secondary?: { href: string; label: string };
  primaryLabel?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <Image src={image} alt={imageAlt} fill loading="eager" fetchPriority="high" quality={50} sizes="100vw" className="-z-20 object-cover" />
      {/* Mobile: even scrim so text over the photo stays readable. Desktop: scrim only behind the copy on the left. */}
      <div className="absolute inset-0 -z-10 bg-night/55 lg:bg-transparent lg:bg-gradient-to-r lg:from-night/85 lg:via-night/40 lg:to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-night to-transparent" aria-hidden="true" />
      <div className={`container-x grid items-center gap-10 py-16 sm:py-24 ${form ? "lg:grid-cols-[1.15fr_1fr] lg:py-20" : "lg:py-28"}`}>
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.08] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-100 drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)] sm:text-xl">{subhead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <QuoteButton label={primaryLabel} />
            <Button href={secondary.href} variant="secondary">{secondary.label}</Button>
          </div>
          {children}
        </div>
        {form && (
          <div id="hero-quote" className="card hidden bg-panel/90 p-6 backdrop-blur lg:block">
            <p className="font-heading text-xl font-semibold text-white">Get Your Free Quote</p>
            <p className="mb-5 mt-1 text-sm text-slate-400">No pressure. A local designer will follow up.</p>
            <QuoteForm variant="compact" cityName={cityName} citySlug={citySlug} idPrefix="hero" />
          </div>
        )}
      </div>
    </section>
  );
}
