import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cityLinks, localHolidayLinks, postLinks, relatedPosts, serviceLinks, topCityOrder, type LinkGroup } from "@/lib/related";

/** "Explore more" block: grouped, descriptive internal links shown near the bottom of every template. */
export function RelatedLinks({ title = "Explore More", groups, tone = "dark" }: { title?: string; groups: LinkGroup[]; tone?: "dark" | "light" }) {
  const shown = groups.filter((g) => g.links.length > 0);
  if (!shown.length) return null;
  const dark = tone === "dark";
  return (
    <section aria-labelledby="explore-more" className={`${dark ? "bg-night" : "bg-adobe"} py-14 sm:py-20`}>
      <div className="container-x">
        <h2 id="explore-more" className={`text-2xl font-semibold sm:text-3xl ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
        <div className={`mt-8 grid gap-8 sm:grid-cols-2 ${shown.length >= 4 ? "lg:grid-cols-4" : shown.length === 3 ? "lg:grid-cols-3" : ""}`}>
          {shown.map((g) => (
            <nav key={g.heading} aria-label={g.heading}>
              <h3 className={`font-heading text-sm font-semibold uppercase tracking-[0.14em] ${dark ? "text-zia" : "text-orange-800"}`}>{g.heading}</h3>
              <ul className="mt-3 space-y-1">
                {g.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href} className={`group inline-flex min-h-10 items-start gap-2 py-1.5 text-sm leading-snug ${dark ? "text-slate-300 hover:text-cyan" : "text-slate-700 hover:text-chile"}`}>
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 opacity-60 transition group-hover:translate-x-0.5" aria-hidden="true" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Default cross-linking block for utility/static pages. */
export function SiteRelated({ current, title = "Explore Permanent Lighting in Albuquerque", tone = "dark" }: { current: string; title?: string; tone?: "dark" | "light" }) {
  const not = (l: { href: string }) => l.href !== current;
  return (
    <RelatedLinks
      title={title}
      tone={tone}
      groups={[
        { heading: "Lighting Services", links: serviceLinks().filter(not) },
        { heading: "Popular Areas", links: cityLinks({ only: topCityOrder.slice(0, 7) }).filter(not) },
        { heading: "Holiday & Event Lighting", links: localHolidayLinks().slice(0, 6).filter(not) },
        { heading: "Guides & Help", links: [...postLinks(relatedPosts({ limit: 3 })), ...helpLinks.filter(not)] },
      ]}
    />
  );
}

const helpLinks = [
  { href: "/permanent-outdoor-lighting/", label: "What is permanent outdoor lighting?" },
  { href: "/how-it-works/", label: "How installation works" },
  { href: "/faqs/", label: "Permanent lighting FAQs" },
  { href: "/why-us/", label: "Why choose a local Albuquerque installer" },
  { href: "/site-map/", label: "Full site map" },
];
