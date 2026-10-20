"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { mainNav, simpleNav } from "@/data/nav";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the drawer after navigation (render-time state sync; no effect needed).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-drawer"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-white"
      >
        <Menu className="h-5 w-5" />
      </button>
      {open && (
        <div className="fixed inset-0 z-50">
          <button type="button" aria-label="Close menu" className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <nav id="mobile-drawer" aria-label="Mobile" className="absolute right-0 top-0 flex h-full w-[min(22rem,100%)] flex-col overflow-y-auto bg-panel p-5 shadow-2xl">
            <div className="mb-4 flex justify-end">
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="space-y-1">
              {mainNav.map((g) => (
                <li key={g.label}>
                  <details className="group">
                    <summary className="flex min-h-12 cursor-pointer items-center justify-between rounded-lg px-3 font-heading text-lg text-white">
                      {g.label}
                      <ChevronDown className="h-5 w-5 transition group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <ul className="mb-2 ml-3 border-l border-line pl-2">
                      {g.links.flatMap((l) => [l, ...(l.children ?? [])]).map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} className="flex min-h-11 items-center rounded-lg px-3 text-slate-300 hover:text-cyan">{l.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ))}
              {simpleNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="flex min-h-12 items-center rounded-lg px-3 font-heading text-lg text-white">{l.label}</Link>
                </li>
              ))}
              <li><Link href="/contact-us/" className="flex min-h-12 items-center rounded-lg px-3 font-heading text-lg text-white">Contact</Link></li>
            </ul>
            <Link href="/get-a-quote/#quote-form" className="bg-gradient-accent mt-6 inline-flex min-h-12 items-center justify-center rounded-full font-semibold text-night">
              Get A Free Quote
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
