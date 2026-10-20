import Link from "next/link";
import { cities, cityLabel } from "@/data/cities";
import { cityServices } from "@/data/cityServices";
import { holidays } from "@/data/holidays";
import type { Holiday } from "@/data/types";
import { holidayHubPath, paths, routeInfo } from "@/lib/routes";
import { faqNode, pageGraph, serviceNode, type Crumb } from "@/lib/schema";
import { Breadcrumbs } from "../Breadcrumbs";
import { CTABand } from "../CTABand";
import { FAQAccordion } from "../FAQAccordion";
import { FeatureGrid } from "../FeatureGrid";
import { Hero } from "../Hero";
import { JsonLd } from "../JsonLd";
import { CardLink, Prose, Section, SectionHeading } from "../ui";

const holidayImage: Record<string, string> = {
  "christmas-lights": "christmas-roofline-colors",
  "halloween-lights": "holiday-orange-purple",
  "thanksgiving-lights": "holiday-orange-purple",
  "luminaria-and-farolito-season": "luminaria-amber-glow",
  "balloon-fiesta-lights": "balloon-fiesta-colors",
  "game-day-lights": "game-day-red-silver",
  "diwali-lights": "luminaria-amber-glow",
};

export function holidayH1(h: Holiday) {
  return h.h1 ?? `Permanent ${h.name} Lights in Albuquerque`;
}

export function HolidayPage({ h }: { h: Holiday }) {
  const path = paths.holiday(h);
  const info = routeInfo(path);
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Holiday Lights", path: holidayHubPath },
    { name: h.navLabel, path },
  ];
  const christmas = holidays.find((x) => x.slug === "christmas-lights")!;
  const siblings = h.siblings.map((s) => holidays.find((x) => x.slug === s)).filter((x): x is Holiday => Boolean(x));
  const image = `/images/placeholders/${holidayImage[h.slug] ?? "christmas-roofline-colors"}.jpg`;
  const localXmas = h.slug === "christmas-lights" ? cityServices.filter((cs) => cs.service === "permanent-christmas-lights") : [];

  return (
    <>
      <JsonLd
        data={pageGraph({
          path, title: info.title, description: info.description, crumbs,
          extra: [serviceNode({ path, name: holidayH1(h), serviceType: h.primaryKeyword, description: h.metaDescription }), faqNode(path, h.faqs)],
        })}
      />
      <Hero eyebrow={`${h.month} · Albuquerque`} title={holidayH1(h)} subhead={h.heroSubhead} image={image} imageAlt={`Albuquerque home with permanent lights set to a ${h.name} color scene`} form />
      <Breadcrumbs crumbs={crumbs} />

      <Section>
        <div className="grid gap-2 lg:gap-10 lg:grid-cols-2">
          <SectionHeading eyebrow={h.navLabel} title={`${h.name} Lighting Without the Ladder`} />
          <Prose paragraphs={h.intro} />
        </div>
      </Section>

      <Section tone="panel">
        <SectionHeading eyebrow="Color Palettes" title={`${h.name} Color Ideas`} intro="Every color here is one tap away in the app. Mix them, chase them, twinkle them, or run them solid." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {h.palettes.map((p) => (
            <div key={p.name} className="card p-6">
              <h3 className="font-semibold text-white">{p.name}</h3>
              <div className="mt-4 flex h-14 overflow-hidden rounded-xl" aria-hidden="true">
                {p.colors.map((c) => <span key={c.hex + c.name} className="flex-1" style={{ backgroundColor: c.hex }} />)}
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.colors.map((c) => (
                  <li key={c.hex + c.name} className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs text-slate-300">
                    <span className="h-3.5 w-3.5 rounded-full border border-white/20" style={{ backgroundColor: c.hex }} aria-hidden="true" />
                    {c.name} <span className="text-slate-400">{c.hex}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Scene Ideas" title={`${h.name} Patterns to Try`} />
        <FeatureGrid items={h.ideas.map((x, i) => ({ ...x, icon: (["sparkles", "palette", "music", "sunset", "heart"] as const)[i % 5] }))} />
      </Section>

      {h.sections?.map((s, i) => (
        <Section key={s.heading} tone={i % 2 === 0 ? "light" : "dark"}>
          <div className="grid gap-2 lg:gap-10 lg:grid-cols-2">
            <SectionHeading tone={i % 2 === 0 ? "light" : "dark"} title={s.heading} />
            <Prose tone={i % 2 === 0 ? "light" : "dark"} paragraphs={s.paragraphs} />
          </div>
        </Section>
      ))}

      <Section tone="light">
        <div className="card-light grid gap-6 p-8 md:grid-cols-[auto_1fr] md:items-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-zia/20 font-heading text-2xl text-chile" aria-hidden="true">⏱</span>
          <div>
            <h2 className="text-2xl font-semibold text-ink">Scheduling Tip: Set It and Forget It</h2>
            <p className="mt-2 text-lg text-slate-700">{h.schedulingTip}</p>
          </div>
        </div>
      </Section>

      <Section tone="light" className="pt-0 sm:pt-0">
        <SectionHeading tone="light" eyebrow="FAQs" title={`${h.name} Lighting FAQs`} />
        <div className="max-w-4xl"><FAQAccordion faqs={h.faqs} /></div>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold text-white">More Holiday Looks From the Same Lights</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {(h.slug === "christmas-lights" ? siblings : [christmas, ...siblings]).map((x) => (
            <li key={x.slug}>
              <Link href={paths.holiday(x)} className="card flex min-h-14 items-center justify-between px-5 py-4 text-slate-200 hover:border-zia/60 hover:text-zia">
                {x.navLabel} <span className="text-xs text-slate-400">{x.month}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-x-6">
          <CardLink href={holidayHubPath}>All holiday lighting</CardLink>
          <CardLink href="/roofline-lighting/">Roofline lighting</CardLink>
          {localXmas.map((cs) => (
            <CardLink key={cs.city} href={paths.cityService(cs)}>Permanent Christmas lights in {cityLabel(cities.find((c) => c.slug === cs.city)!)}</CardLink>
          ))}
        </div>
      </Section>

      <CTABand title={`Ready for ${h.name} at the Tap of a Button?`} />
    </>
  );
}
