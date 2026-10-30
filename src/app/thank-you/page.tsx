import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { routeInfo } from "@/lib/routes";
import { pageGraph } from "@/lib/schema";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui";
import { business, telHref } from "@/data/business";
import { metaFor } from "@/lib/page";

export const metadata = metaFor("/thank-you/");

/** Conversion page (noindex). Fire ad/analytics conversion events here. */
export default function Page() {
  return (
    <>
    <JsonLd data={pageGraph({ path: "/thank-you/", title: routeInfo("/thank-you/").title, description: routeInfo("/thank-you/").description, crumbs: [{ name: "Home", path: "/" }, { name: "Thank You", path: "/thank-you/" }] })} />
    <PageHeader eyebrow="Request Received" title="Thank You! Your Quote Request Is In." intro={`A member of our Albuquerque team will reach out soon to talk through your project. Need us sooner? Call ${business.phone}.`}>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/project-showcase/">Browse Project Ideas</Button>
        <Button href={telHref()} variant="secondary">Call Us</Button>
      </div>
    </PageHeader>
    <Breadcrumbs crumbs={[{ name: "Home", path: "/" }, { name: "Thank You", path: "/thank-you/" }]} />
    </>
  );
}
