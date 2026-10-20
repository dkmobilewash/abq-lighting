import Image from "next/image";
import Link from "next/link";
import { cities, cityLabel } from "@/data/cities";
import { cityServices } from "@/data/cityServices";
import { processSteps } from "@/data/process";
import { services } from "@/data/services";
import type { Service } from "@/data/types";
import { paths, routeInfo } from "@/lib/routes";
import { faqNode, pageGraph, serviceNode, type Crumb } from "@/lib/schema";
import { Breadcrumbs } from "../Breadcrumbs";
import { CTABand } from "../CTABand";
import { FAQAccordion } from "../FAQAccordion";
import { FeatureGrid } from "../FeatureGrid";
import { Hero } from "../Hero";
import { Icon } from "../Icon";
import { JsonLd } from "../JsonLd";
import { ProjectCarousel } from "../ProjectCarousel";
import { CardLink, Prose, Section, SectionHeading } from "../ui";

export function ServicePage({ s }: { s: Service }) {
  const path = paths.service(s);
  const info = routeInfo(path);
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Lighting", path: "/permanent-outdoor-lighting/" },
    { name: s.name, path },
  ];
  const local = cityServices.filter((cs) => cs.service === s.slug);
  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      <JsonLd
        data={pageGraph({
          path, title: info.title, description: info.description, crumbs,
          extra: [serviceNode({ path, name: s.name, serviceType: s.primaryKeyword, description: s.metaDescription }), faqNode(path, s.faqs)],
        })}
      />
      <Hero
        eyebrow="Albuquerque, New Mexico"
        title={<><span className="accent-underline">{s.name}</span> in Albuquerque, NM</>}
        subhead={s.heroSubhead}
        image={s.image}
        imageAlt={s.imageAlt}
        form
      />
      <Breadcrumbs crumbs={crumbs} />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <SectionHeading eyebrow={s.shortName} title={`What Is Permanent ${s.name}?`} />
          <Prose paragraphs={s.whatItIs} />
        </div>
      </Section>

      <Section tone="light">
        <SectionHeading tone="light" eyebrow="Benefits" title={`Why Albuquerque Homeowners Choose ${s.name}`} />
        <FeatureGrid tone="light" items={s.benefits.map((b, i) => ({ ...b, icon: (["sparkles", "smartphone", "sun", "zap", "shield", "palette"] as const)[i % 6] }))} />
      </Section>

      <Section>
        <SectionHeading eyebrow="Where It Goes" title={`Where ${s.name} Works Best`} />
        <ul className="grid gap-6 md:grid-cols-2">
          {s.placements.map((p) => (
            <li key={p.title} className="card reveal overflow-hidden">
              <div className="relative aspect-[16/9]">
                <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-slate-400">{p.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="panel">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Built for New Mexico" title="Made for High-Desert Sun, Wind & Monsoons" />
            <ul className="grid grid-cols-2 gap-3 text-sm text-slate-300">
              {([["sun", "Intense UV"], ["wind", "Spring wind"], ["cloud-rain", "Monsoon storms"], ["snowflake", "Freeze-thaw nights"]] as const).map(([icon, t]) => (
                <li key={t} className="card flex items-center gap-2 p-3"><Icon name={icon} className="h-5 w-5 text-zia" />{t}</li>
              ))}
            </ul>
          </div>
          <Prose paragraphs={s.durability} />
        </div>
      </Section>

      <Section>
        <ProjectCarousel title={`${s.name} Ideas Across the Metro`} />
      </Section>

      <Section tone="panel">
        <SectionHeading eyebrow="Our Process" title="From Free Consultation to First Glow" />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((st) => (
            <li key={st.step} className="card p-6">
              <span className="font-heading text-3xl font-semibold text-gradient">0{st.step}</span>
              <h3 className="mt-2 font-semibold text-white">{st.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{st.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6"><CardLink href="/how-it-works/">See how it works</CardLink></div>
      </Section>

      <Section tone="light">
        <SectionHeading tone="light" eyebrow="FAQs" title={`${s.name} FAQs`} />
        <div className="max-w-4xl"><FAQAccordion faqs={s.faqs} /></div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Service Areas" title={`${s.name} Available In`} />
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {cities.map((c) => {
            const lp = local.find((x) => x.city === c.slug);
            return (
              <li key={c.slug}>
                <Link href={lp ? paths.cityService(lp) : paths.city(c.slug)} className="card flex min-h-12 items-center px-4 py-3 text-sm text-slate-200 hover:border-cyan/50 hover:text-cyan">
                  {lp ? `${s.shortName} in ${cityLabel(c)}` : cityLabel(c)}
                </Link>
              </li>
            );
          })}
        </ul>
        <h2 className="mt-12 text-xl font-semibold text-white">Other Lighting Services</h2>
        <ul className="mt-3 flex flex-wrap gap-x-6">
          {others.map((o) => <li key={o.slug}><CardLink href={paths.service(o)}>{o.name}</CardLink></li>)}
        </ul>
      </Section>

      <CTABand title={`Ready for ${s.name} on Your Albuquerque Home?`} />
    </>
  );
}
