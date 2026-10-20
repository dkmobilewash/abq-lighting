import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTABand } from "@/components/CTABand";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui";
import { faqGroups } from "@/data/faqs";
import { metaFor } from "@/lib/page";
import { routeInfo } from "@/lib/routes";
import { faqNode, pageGraph } from "@/lib/schema";

const path = "/faqs/";
export const metadata = metaFor(path);

export default function Page() {
  const info = routeInfo(path);
  const crumbs = [{ name: "Home", path: "/" }, { name: "FAQs", path }];
  return (
    <>
      <JsonLd data={pageGraph({ path, title: info.title, description: info.description, crumbs, extra: [faqNode(path, faqGroups.flatMap((g) => g.faqs))] })} />
      <PageHeader eyebrow="FAQs" title="Permanent Lighting FAQs" intro="Straight answers about permanent outdoor lighting in Albuquerque. Don't see your question? Give us a call." />
      <Breadcrumbs crumbs={crumbs} />
      <nav aria-label="FAQ topics" className="border-b border-line bg-night">
        <ul className="container-x flex gap-2 overflow-x-auto py-4 text-sm">
          {faqGroups.map((g) => (
            <li key={g.slug} className="shrink-0"><a href={`#${g.slug}`} className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-slate-300 hover:text-cyan">{g.heading}</a></li>
          ))}
        </ul>
      </nav>
      <Section tone="light">
        <div className="mx-auto max-w-4xl space-y-14">
          {faqGroups.map((g) => (
            <section key={g.slug} id={g.slug} aria-labelledby={`${g.slug}-h`} className="scroll-mt-28">
              <h2 id={`${g.slug}-h`} className="mb-6 text-2xl font-semibold text-ink sm:text-3xl">{g.heading}</h2>
              <FAQAccordion faqs={g.faqs} />
            </section>
          ))}
        </div>
      </Section>
      <CTABand title="Still Have Questions? Let's Talk." />
    </>
  );
}
