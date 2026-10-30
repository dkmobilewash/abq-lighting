import { SiteRelated } from "@/components/RelatedLinks";
import { Linker } from "@/lib/linker";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTABand } from "@/components/CTABand";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/ui";
import { faqGroups } from "@/data/faqs";
import { processSteps } from "@/data/process";
import { metaFor } from "@/lib/page";
import { routeInfo } from "@/lib/routes";
import { faqNode, howToNode, pageGraph } from "@/lib/schema";

const path = "/how-it-works/";
export const metadata = metaFor(path);

const details: Record<number, string[]> = {
  1: ["Call, text or fill out the quote form", "Share photos or schedule an on-site visit", "Talk through looks, zones and budget", "Get answers about HOAs, power and timing"],
  2: ["Roofline, parapet and wall layout", "Track color matched to fascia or stucco", "Zone plan and controller location", "Written, itemized quote"],
  3: ["Track mounted along your design lines", "LEDs, wiring and controller installed", "Clean wire routing and site cleanup", "Full system test before we leave"],
  4: ["App connected to your Wi-Fi", "Sunset-to-sunrise schedule set", "Starter holiday scenes loaded", "Local support whenever you need it"],
};

export default function Page() {
  const info = routeInfo(path);
  const crumbs = [{ name: "Home", path: "/" }, { name: "How It Works", path }];
  const faqs = faqGroups.find((g) => g.slug === "installation")?.faqs ?? [];
  const linker = new Linker(path);
  return (
    <>
      <JsonLd data={pageGraph({ path, title: info.title, description: info.description, crumbs, extra: [howToNode(path, "How permanent lighting installation works", processSteps), ...(faqs.length ? [faqNode(path, faqs)] : [])] })} />
      <PageHeader eyebrow="Our Process" title="How Permanent Lighting Installation Works" intro="From the first conversation to the first night your lights come on, here's exactly what to expect." />
      <Breadcrumbs crumbs={crumbs} />
      <Section>
        <ol className="space-y-6">
          {processSteps.map((s) => (
            <li key={s.step} id={`step-${s.step}`} className="card reveal scroll-mt-28 grid gap-6 p-6 sm:p-8 md:grid-cols-[auto_1fr_1fr] md:items-start">
              <div className="flex items-center gap-4 md:flex-col md:items-start">
                <span className="font-heading text-5xl font-semibold text-gradient">0{s.step}</span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan/10 text-cyan"><Icon name={s.icon} /></span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">{s.title}</h2>
                <p className="mt-3 leading-relaxed text-slate-300">{linker.link(s.body)}</p>
              </div>
              <ul className="space-y-2 text-slate-400">
                {details[s.step].map((d) => <li key={d} className="flex gap-2"><span className="text-zia">✓</span>{d}</li>)}
              </ul>
            </li>
          ))}
        </ol>
      </Section>
      {faqs.length > 0 && (
        <Section tone="light">
          <SectionHeading tone="light" eyebrow="FAQs" title="Installation Questions" />
          <div className="max-w-4xl"><FAQAccordion faqs={faqs} linker={linker} /></div>
        </Section>
      )}
      <SiteRelated current={path} />
      <CTABand title="Start With a Free Consultation" />
    </>
  );
}
