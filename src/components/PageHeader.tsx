import type { ReactNode } from "react";
import { Eyebrow } from "./ui";

/** Compact (image-free) page header for utility and content pages. */
export function PageHeader({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-night">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[48rem] -translate-x-1/2 rounded-full bg-cyan/10 blur-3xl" aria-hidden="true" />
      <div className="container-x relative py-14 sm:py-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
