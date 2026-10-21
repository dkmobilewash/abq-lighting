import { SiteRelated } from "@/components/RelatedLinks";
import { Linker } from "@/lib/linker";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTABand } from "@/components/CTABand";
import { FeatureGrid } from "@/components/FeatureGrid";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { ReviewPlaceholder } from "@/components/ReviewPlaceholder";
import { CardLink, Prose, Section, SectionHeading } from "@/components/ui";
import { business } from "@/data/business";
import { systemFeatures } from "@/data/features";
import type { Feature } from "@/data/types";
import { metaFor } from "@/lib/page";
import { routeInfo } from "@/lib/routes";
import { pageGraph } from "@/lib/schema";

const path = "/why-us/";
export const metadata = metaFor(path);

const reasons: Feature[] = [
  { icon: "map-pin", title: "We're Local", body: "Our crew lives and works in the Albuquerque metro. When you call, you reach people who know the difference between a Northeast Heights parapet and a Corrales portal." },
  { icon: "home", title: "Designed for New Mexico Homes", body: "Stucco, parapets, canales, Territorial brick coping, tile and metal roofs. We plan mounting and wire routing for the way homes here are actually built." },
  { icon: "sun", title: "Built for the High Desert", body: "We choose materials and mounting methods with intense UV, spring wind, monsoon storms and freeze-thaw nights in mind, not a mild coastal climate." },
  { icon: "users", title: "HOA-Friendly Process", body: "Many planned communities require architectural review. We provide drawings, track color and placement details so your submission is clear and complete." },
  { icon: "shield", title: "Local Warranty & Service", body: "Your system is backed by our warranty and serviced by the same local team that installed it. No call centers, no waiting on an out-of-state crew." },
  { icon: "badge-check", title: "Licensed & Insured", body: `We're a licensed and insured New Mexico contractor (License ${business.licenseNumber}). Clean installs, clear quotes and no surprises.` },
];

export default function Page() {
  const info = routeInfo(path);
  const crumbs = [{ name: "Home", path: "/" }, { name: "Why Us", path }];
  const linker = new Linker(path);
  return (
    <>
      <JsonLd data={pageGraph({ path, title: info.title, description: info.description, crumbs, localBusiness: true, pageType: "AboutPage" })} />
      <PageHeader eyebrow="Why Choose Us" title="A Local Albuquerque Crew for Permanent Lighting Done Right" intro="Permanent lighting is a long-term part of your home. Who designs and installs it matters as much as the lights themselves." />
      <Breadcrumbs crumbs={crumbs} />
      <Section>
        <SectionHeading eyebrow="Six Reasons" title="Why Albuquerque Homeowners Choose a Local Permanent Lighting Installer" />
        <FeatureGrid items={reasons} linker={linker} />
      </Section>
      <Section tone="light">
        <div className="grid gap-2 lg:gap-10 lg:grid-cols-2">
          <SectionHeading tone="light" eyebrow="Our Approach" title="Clean Lines, Hidden Track, Honest Quotes" />
          <Prose tone="light" linker={linker} paragraphs={[
            "Good permanent lighting should look like it came with the house. We take time on the design: following the true lines of your roof and parapets, matching track color to your fascia or stucco, and placing the controller and power where they stay out of sight.",
            "Our quotes are written and itemized so you can see exactly what you're getting. We'll tell you what affects your price, what we'd recommend and what you can skip. If permanent lighting isn't a fit for your home, we'll say so.",
            "After the install, we set up the app with you, load a few scenes and a sunset schedule, and make sure everyone in the house knows how to use it.",
          ]} />
        </div>
      </Section>
      <Section>
        <SectionHeading eyebrow="The Technology" title="What You Get With Every System" />
        <FeatureGrid items={systemFeatures} cols={4} />
        <div className="mt-8 flex flex-wrap gap-x-6">
          <CardLink href="/how-it-works/">How it works</CardLink>
          <CardLink href="/smart-app/">The app</CardLink>
          <CardLink href="/warranty/">Our warranty</CardLink>
        </div>
      </Section>
      <Section tone="light">
        <SectionHeading tone="light" eyebrow="Reviews" title="From Our Customers" />
        <div className="grid gap-5 md:grid-cols-3">{[1, 2, 3].map((i) => <ReviewPlaceholder key={i} index={i} />)}</div>
      </Section>
      <SiteRelated current={path} />
      <CTABand title="Let's Design Your Lighting Together" />
    </>
  );
}
