import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTABand } from "@/components/CTABand";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { CallButton, Section, SectionHeading } from "@/components/ui";
import { business } from "@/data/business";
import { faqGroups } from "@/data/faqs";
import { metaFor } from "@/lib/page";
import { routeInfo } from "@/lib/routes";
import { faqNode, pageGraph } from "@/lib/schema";

const path = "/warranty/";
export const metadata = metaFor(path);

export default function Page() {
  const info = routeInfo(path);
  const crumbs = [{ name: "Home", path: "/" }, { name: "Warranty", path }];
  const faqs = faqGroups.find((g) => g.slug === "warranty")?.faqs ?? [];
  return (
    <>
      <JsonLd data={pageGraph({ path, title: info.title, description: info.description, crumbs, extra: faqs.length ? [faqNode(path, faqs)] : [] })} />
      <PageHeader eyebrow="Warranty" title="Our Permanent Lighting Warranty" intro="Your system is backed locally by the team that installed it." />
      <Breadcrumbs crumbs={crumbs} />
      <Section tone="light">
        <div className="mx-auto max-w-3xl prose-site">
          <p className="rounded-xl border border-dashed border-chile/40 bg-white p-4 text-sm">
            [PLACEHOLDER] Replace this page with your final warranty terms. Current setting: <strong>{business.warrantyYears}-year</strong> warranty
            (edit <code>warrantyYears</code> in <code>src/data/business.ts</code>). Confirm separate coverage for workmanship, LEDs/components and the controller.
          </p>
          <h2>What&apos;s Covered</h2>
          <ul>
            <li><strong>Workmanship:</strong> the installation itself, including track mounting, wiring and connections. [CONFIRM TERMS]</li>
            <li><strong>LEDs and components:</strong> light nodes, power supplies and controller hardware, subject to the manufacturer&apos;s terms. [CONFIRM TERMS]</li>
            <li><strong>Local service:</strong> if something isn&apos;t working, our Albuquerque crew diagnoses and repairs it. [CONFIRM RESPONSE PROCESS]</li>
          </ul>
          <h2>What&apos;s Not Covered</h2>
          <ul>
            <li>Damage from roof work, remodeling, or other trades disturbing the track or wiring</li>
            <li>Acts of nature beyond normal weather, such as falling trees or lightning strikes [CONFIRM]</li>
            <li>Changes to your home&apos;s Wi-Fi network or power that affect the controller</li>
            <li>Modifications or repairs made by anyone other than our team</li>
          </ul>
          <h2>How to Request Service</h2>
          <p>Call or email us with your name, address and a short description (photos help). We&apos;ll troubleshoot with you remotely first, and schedule a visit if needed.</p>
          <p>Phone: {business.phone} · Email: {business.email}</p>
        </div>
        <div className="mx-auto mt-8 max-w-3xl"><CallButton variant="light" /></div>
      </Section>
      {faqs.length > 0 && (
        <Section tone="light" className="pt-0 sm:pt-0">
          <SectionHeading tone="light" eyebrow="FAQs" title="Warranty & Service Questions" />
          <div className="max-w-4xl"><FAQAccordion faqs={faqs} /></div>
        </Section>
      )}
      <CTABand title="Lighting That's Built to Last, Backed Locally" />
    </>
  );
}
