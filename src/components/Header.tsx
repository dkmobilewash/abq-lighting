import Link from "next/link";
import { ChevronDown, Phone } from "lucide-react";
import { business, telHref } from "@/data/business";
import { mainNav, simpleNav } from "@/data/nav";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-night/90 backdrop-blur supports-[backdrop-filter]:bg-night/75">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-20">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((g) => (
              <li key={g.label} className="group relative">
                <Link href={g.href} className="inline-flex min-h-11 items-center gap-1 rounded-full px-3 text-sm font-medium text-slate-200 hover:text-cyan">
                  {g.label} <ChevronDown className="h-4 w-4 transition group-hover:rotate-180" aria-hidden="true" />
                </Link>
                <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul className={`card grid gap-1 bg-panel p-3 shadow-2xl shadow-black/40 ${g.links.length > 8 ? "w-[34rem] grid-cols-2" : "w-72"}`}>
                    {g.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="block rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/5 hover:text-cyan">{l.label}</Link>
                        {l.children && (
                          <ul className="ml-3 border-l border-line pl-2">
                            {l.children.map((c) => (
                              <li key={c.href}>
                                <Link href={c.href} className="block rounded-lg px-3 py-1.5 text-sm text-slate-400 hover:bg-white/5 hover:text-cyan">{c.label}</Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
            {simpleNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-slate-200 hover:text-cyan">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a href={telHref()} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white hover:text-cyan">
            <Phone className="h-4 w-4 text-cyan" aria-hidden="true" /> {business.phone}
          </a>
          <Link href="/get-a-quote/#quote-form" className="bg-gradient-accent inline-flex min-h-11 items-center rounded-full px-5 text-sm font-semibold text-night hover:brightness-110">
            Get A Free Quote
          </Link>
        </div>
        <MobileMenu />
      </div>
    </header>
  );
}
