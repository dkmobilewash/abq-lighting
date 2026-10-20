import Image from "next/image";
import { applications } from "@/data/applications";
import { cities, cityLabel } from "@/data/cities";
import type { Application } from "@/data/types";
import { paths, routeInfo } from "@/lib/routes";
import { faqNode, pageGraph, serviceNode, type Crumb } from "@/lib/schema";
import { Breadcrumbs } from "../Breadcrumbs";
import { CTABand } from "../CTABand";
import { FAQAccordion } from "../FAQAccordion";
import { FeatureGrid } from "../FeatureGrid";
import { Hero } from "../Hero";
import { JsonLd } from "../JsonLd";
import { ProjectCarousel } from "../ProjectCarousel";
import { CardLink, Prose, Section, SectionHeading } from "../ui";

export function ApplicationPage({ a }: { a: Application }) {
  const path = paths.application(a.slug);
  const info = routeInfo(path);
  const parent = a.parent ? applications.find((x) => x.slug === a.parent) : undefined;
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    ...(parent ? [{ name: parent.shortName, path: paths.application(parent.slug) }] : []),
    { name: a.shortName, path },
  ];
  const related = applications.filter((x) => x.slug !== a.slug);

  return (
    <>
      <JsonLd
        data={pageGraph({
          path, title: info.title, description: info.description, crumbs,
          extra: [serviceNode({ path, name: a.name, serviceType: a.primaryKeyword, description: a.metaDescription }), faqNode(path, a.faqs)],
        })}
      />
      <Hero eyebrow={`${a.shortName} · Albuquerque`} title={a.h1} subhead={a.heroSubhead} image={a.image} imageAlt={a.imageAlt} form primaryLabel={a.ctaLabel} />
      <Breadcrumbs crumbs={crumbs} />

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow={a.shortName} title={`${a.shortName} Lighting That Stays Up Year-Round`} />
            <Prose paragraphs={a.intro} />
          </div>
          <div className="glow relative aspect-[4/3]">
            <Image src={a.image} alt={a.imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="rounded-2xl object-cover" />
          </div>
        </div>
      </Section>

      <Section tone="light">
        <SectionHeading tone="light" eyebrow="The Problem" title="What Permanent Lighting Replaces" />
        <FeatureGrid tone="light" items={a.painPoints.map((p, i) => ({ ...p, icon: (["hammer", "calendar", "wrench", "palette", "shield"] as const)[i % 5] }))} />
      </Section>

      <Section>
        <SectionHeading eyebrow="The Upside" title="Visibility, Curb Appeal & Simpler Seasons" />
        <FeatureGrid items={a.benefits.map((b, i) => ({ ...b, icon: (["sparkles", "store", "smartphone", "zap", "users"] as const)[i % 5] }))} />
      </Section>

      <Section tone="panel">
        <div className="grid gap-2 lg:gap-10 lg:grid-cols-2">
          <SectionHeading eyebrow="Who It's For" title={`${a.shortName} Properties We Light`} />
          <ul className="grid gap-3 sm:grid-cols-2">
            {a.useCases.map((u) => <li key={u} className="card px-4 py-3 text-slate-200">{u}</li>)}
          </ul>
        </div>
      </Section>

      <Section>
        <ProjectCarousel title={`${a.shortName} Lighting Projects`} />
      </Section>

      <Section tone="light">
        <SectionHeading tone="light" eyebrow="FAQs" title={`${a.shortName} Lighting FAQs`} />
        <div className="max-w-4xl"><FAQAccordion faqs={a.faqs} /></div>
      </Section>

      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-white">More Applications</h2>
            <ul className="mt-3">{related.map((r) => <li key={r.slug}><CardLink href={paths.application(r.slug)}>{r.name}</CardLink></li>)}</ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Areas We Serve</h2>
            <ul className="mt-3 flex flex-wrap gap-x-5">
              {cities.slice(0, 8).map((c) => <li key={c.slug}><CardLink href={paths.city(c.slug)}>{cityLabel(c)}</CardLink></li>)}
              <li><CardLink href="/service-areas/">All areas</CardLink></li>
            </ul>
          </div>
        </div>
      </Section>

      <CTABand title={a.parent || a.slug !== "residential-permanent-lighting" ? "Schedule a Free Site Walk" : "Ready to Light Up Your Home?"} primaryLabel={a.ctaLabel} />
    </>
  );
}
