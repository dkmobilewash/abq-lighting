import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTABand } from "@/components/CTABand";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FeatureGrid } from "@/components/FeatureGrid";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { ServiceCards } from "@/components/ServiceCards";
import { Prose, Section, SectionHeading } from "@/components/ui";
import { pillar } from "@/data/pillar";
import { metaFor } from "@/lib/page";
import { routeInfo } from "@/lib/routes";
import { faqNode, pageGraph, serviceNode } from "@/lib/schema";

const path = "/permanent-outdoor-lighting/";
export const metadata = metaFor(path);

export default function Page() {
  const info = routeInfo(path);
  const crumbs = [{ name: "Home", path: "/" }, { name: "Permanent Outdoor Lighting", path }];
  const [first, second, comparison, ...rest] = pillar.sections;
  return (
    <>
      <JsonLd data={pageGraph({ path, title: info.title, description: info.description, crumbs, extra: [serviceNode({ path, name: "Permanent Outdoor Lighting", serviceType: "Permanent outdoor LED lighting installation", description: info.description }), faqNode(path, pillar.faqs)] })} />
      <Hero
        eyebrow="The Complete Guide"
        title={<>What Is Permanent <span className="accent-underline">Outdoor Lighting</span>?</>}
        subhead={pillar.heroSubhead}
        imageAlt="Albuquerque home with permanent outdoor lighting installed along the roofline at night"
      />
      <Breadcrumbs crumbs={crumbs} />

      <nav aria-label="On this page" className="border-b border-line bg-night">
        <ul className="container-x flex gap-2 overflow-x-auto py-4 text-sm">
          {pillar.sections.map((s) => (
            <li key={s.id} className="shrink-0"><a href={`#${s.id}`} className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-slate-300 hover:text-cyan">{s.heading}</a></li>
          ))}
          <li className="shrink-0"><a href="#cost-factors" className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-slate-300 hover:text-cyan">Cost Factors</a></li>
        </ul>
      </nav>

      <Section id={first.id}>
        <div className="grid gap-2 lg:gap-10 lg:grid-cols-2">
          <SectionHeading title={first.heading} />
          <Prose paragraphs={first.paragraphs} />
        </div>
      </Section>

      <Section tone="panel" id={second.id}>
        <SectionHeading title={second.heading} />
        <div className="grid gap-2 lg:gap-10 lg:grid-cols-2">
          <Prose paragraphs={second.paragraphs} />
          <FeatureGrid cols={2} items={pillar.howItWorks.map((p, i) => ({ ...p, icon: (["ruler", "sparkles", "zap", "smartphone"] as const)[i % 4] }))} />
        </div>
      </Section>

      <Section tone="light" id={comparison.id}>
        <SectionHeading tone="light" title={comparison.heading} />
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Prose tone="light" paragraphs={comparison.paragraphs} />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[32rem] border-collapse overflow-hidden rounded-2xl bg-white text-left text-sm">
              <caption className="sr-only">Permanent vs. traditional Christmas lights</caption>
              <thead>
                <tr className="bg-ink text-white">
                  <th scope="col" className="p-4">&nbsp;</th>
                  <th scope="col" className="p-4">Permanent lighting</th>
                  <th scope="col" className="p-4">Traditional strands</th>
                </tr>
              </thead>
              <tbody>
                {pillar.comparison.map((r) => (
                  <tr key={r.aspect} className="border-b border-slate-200 align-top">
                    <th scope="row" className="p-4 font-semibold text-ink">{r.aspect}</th>
                    <td className="p-4 text-slate-700">{r.permanent}</td>
                    <td className="p-4 text-slate-600">{r.traditional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section id="cost-factors">
        <SectionHeading eyebrow="Permanent Lighting Cost" title="What Affects the Cost of Permanent Lighting?" intro="Every home is different, so we quote each project individually. These are the factors that move the number." />
        <FeatureGrid items={pillar.costFactors.map((p, i) => ({ ...p, icon: (["ruler", "home", "layers", "zap", "hammer", "palette", "mountain", "wrench"] as const)[i % 8] }))} />
        <p className="mt-8 text-slate-400">Want a real number for your home? <Link href="/get-a-quote/" className="font-semibold text-cyan hover:text-zia">Request a free quote</Link>.</p>
      </Section>

      {rest.map((s, i) => (
        <Section key={s.id} id={s.id} tone={i % 2 === 0 ? "panel" : "dark"}>
          <div className="grid gap-2 lg:gap-10 lg:grid-cols-2">
            <SectionHeading title={s.heading} />
            <Prose paragraphs={s.paragraphs} />
          </div>
        </Section>
      ))}

      <Section tone="panel">
        <SectionHeading eyebrow="Services" title="Where Permanent Lighting Goes" />
        <ServiceCards includeSecurity />
      </Section>

      <Section tone="light">
        <SectionHeading tone="light" eyebrow="FAQs" title="Permanent Outdoor Lighting FAQs" />
        <div className="max-w-4xl"><FAQAccordion faqs={pillar.faqs} /></div>
      </Section>

      <CTABand title="See What Permanent Lighting Looks Like on Your Home" />
    </>
  );
}
