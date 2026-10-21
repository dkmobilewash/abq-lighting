import { SiteRelated } from "@/components/RelatedLinks";
import { Linker } from "@/lib/linker";
import { AppSection } from "@/components/AppSection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTABand } from "@/components/CTABand";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FeatureGrid } from "@/components/FeatureGrid";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { CardLink, Prose, Section, SectionHeading } from "@/components/ui";
import { faqGroups } from "@/data/faqs";
import { smartFeatures, systemFeatures } from "@/data/features";
import { metaFor } from "@/lib/page";
import { routeInfo } from "@/lib/routes";
import { faqNode, pageGraph } from "@/lib/schema";

const path = "/smart-app/";
export const metadata = metaFor(path);

export default function Page() {
  const info = routeInfo(path);
  const crumbs = [{ name: "Home", path: "/" }, { name: "Smart App", path }];
  const faqs = faqGroups.find((g) => g.slug === "app")?.faqs ?? [];
  const linker = new Linker(path);
  return (
    <>
      <JsonLd data={pageGraph({ path, title: info.title, description: info.description, crumbs, extra: faqs.length ? [faqNode(path, faqs)] : [] })} />
      <PageHeader eyebrow="App & Controls" title="Your Whole Lighting System, From One App" intro="Colors, scenes, zones and schedules, all from your phone. Set it once for the year or change it on a whim." />
      <Breadcrumbs crumbs={crumbs} />
      <Section><AppSection /></Section>
      <Section tone="panel">
        <SectionHeading eyebrow="Features" title="What You Can Do in the App" />
        <FeatureGrid items={smartFeatures} />
      </Section>
      <Section tone="light">
        <div className="grid gap-2 lg:gap-10 lg:grid-cols-2">
          <SectionHeading tone="light" eyebrow="A Year in the App" title="Set Your Calendar Once" />
          <Prose tone="light" linker={linker} paragraphs={[
            "Most of our customers load their year in one sitting: Valentine's red in February, green for St. Patrick's Day, red, white and blue for the Fourth, a rainbow for Balloon Fiesta week, orange and purple for Halloween, and the Christmas scene from Thanksgiving through Three Kings Day.",
            "Between holidays, a warm white scene runs on a sunset-to-sunrise timer that shifts with the seasons, so your home looks finished every night without anyone touching a switch.",
            "Want something spontaneous? Open the app, pick a color and go. Anyone you share access with can do the same.",
          ]} />
        </div>
        <div className="mt-8 flex flex-wrap gap-x-6"><CardLink href="/permanent-holiday-lights/">Holiday color ideas</CardLink></div>
      </Section>
      <Section>
        <SectionHeading eyebrow="The Hardware" title="Built Around a Reliable System" />
        <FeatureGrid items={systemFeatures.filter((f) => ["sun", "zap", "users", "shield"].includes(f.icon))} cols={4} />
      </Section>
      {faqs.length > 0 && (
        <Section tone="light">
          <SectionHeading tone="light" eyebrow="FAQs" title="App & Control Questions" />
          <div className="max-w-4xl"><FAQAccordion faqs={faqs} linker={linker} /></div>
        </Section>
      )}
      <SiteRelated current={path} />
      <CTABand title="See the App in Action on Your Home" />
    </>
  );
}
