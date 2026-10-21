import { SiteRelated } from "@/components/RelatedLinks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { NAPCard } from "@/components/NAPCard";
import { PageHeader } from "@/components/PageHeader";
import { QuoteForm } from "@/components/QuoteForm";
import { Section, SectionHeading } from "@/components/ui";
import { metaFor } from "@/lib/page";
import { routeInfo } from "@/lib/routes";
import { pageGraph } from "@/lib/schema";

const path = "/contact-us/";
export const metadata = metaFor(path);

export default function Page() {
  const info = routeInfo(path);
  const crumbs = [{ name: "Home", path: "/" }, { name: "Contact Us", path }];
  return (
    <>
      <JsonLd data={pageGraph({ path, title: info.title, description: info.description, crumbs, localBusiness: true, catalog: true, pageType: "ContactPage" })} />
      <PageHeader eyebrow="Contact" title="Contact Albuquerque Permanent Lighting Co." intro="Questions, quotes or service requests: call, email or send us a message and a local team member will get back to you." />
      <Breadcrumbs crumbs={crumbs} />
      <Section>
        <NAPCard heading="Visit, Call or Email" />
      </Section>
      <Section tone="panel">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Send a Message" title="Request a Free Quote" />
          <div className="card p-6 sm:p-8"><QuoteForm variant="full" idPrefix="contact" /></div>
        </div>
      </Section>
      <SiteRelated current={path} title="Find Your Service Area & Lighting Options" />
    </>
  );
}
