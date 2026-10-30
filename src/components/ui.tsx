import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { business, telHref } from "@/data/business";
import type { Linker } from "@/lib/linker";

export function Eyebrow({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${
        tone === "dark" ? "border-cyan/30 bg-cyan/10 text-cyan" : "border-chile/25 bg-chile/10 text-orange-800"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-zia" aria-hidden="true" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow, title, intro, tone = "dark", align = "left", as: H = "h2", id,
}: {
  eyebrow?: string; title: ReactNode; intro?: ReactNode; tone?: "dark" | "light"; align?: "left" | "center"; as?: "h2" | "h3"; id?: string;
}) {
  return (
    <div className={`mb-10 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <div className="mb-4"><Eyebrow tone={tone}>{eyebrow}</Eyebrow></div>}
      <H id={id} className={`text-3xl font-semibold sm:text-4xl ${tone === "dark" ? "text-white" : "text-ink"}`}>{title}</H>
      {intro && <div className={`mt-4 text-lg leading-relaxed ${tone === "dark" ? "text-slate-300" : "text-slate-600"}`}>{intro}</div>}
    </div>
  );
}

export function Section({
  children, tone = "dark", className = "", id, labelledBy,
}: { children: ReactNode; tone?: "dark" | "light" | "panel"; className?: string; id?: string; labelledBy?: string }) {
  const bg = tone === "light" ? "bg-adobe text-slate-700" : tone === "panel" ? "bg-panel" : "bg-night";
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${bg} py-16 sm:py-24 ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}

export function Prose({ paragraphs, tone = "dark", linker }: { paragraphs: string[]; tone?: "dark" | "light"; linker?: Linker }) {
  return (
    <div className={`space-y-4 text-lg leading-relaxed ${tone === "dark" ? "text-slate-300" : "text-slate-700"}`}>
      {paragraphs.map((p, i) => <p key={i}>{linker ? linker.link(p) : p}</p>)}
    </div>
  );
}

type BtnProps = { href: string; children: ReactNode; variant?: "primary" | "secondary" | "light"; className?: string };

export function Button({ href, children, variant = "primary", className = "" }: BtnProps) {
  const styles = {
    primary: "bg-gradient-accent text-night shadow-lg shadow-cyan/20 hover:brightness-110",
    secondary: "border border-white/20 bg-white/5 text-white hover:border-zia hover:text-zia",
    light: "border border-ink/15 bg-white text-ink hover:border-chile hover:text-chile",
  }[variant];
  return (
    <Link href={href} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${styles} ${className}`}>
      {children}
    </Link>
  );
}

export function QuoteButton({ className = "", label = "Get A Free Quote" }: { className?: string; label?: string }) {
  return (
    <Button href="/get-a-quote/#quote-form" className={className}>
      {label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Button>
  );
}

export function CallButton({ variant = "secondary", className = "" }: { variant?: BtnProps["variant"]; className?: string }) {
  return (
    <Button href={telHref()} variant={variant} className={className}>
      <Phone className="h-4 w-4" aria-hidden="true" /> Call {business.phone}
    </Button>
  );
}

export function CardLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-cyan hover:text-zia">
      {children} <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}
