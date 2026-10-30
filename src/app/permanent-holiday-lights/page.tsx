import Link from "next/link";
import { SiteRelated } from "@/components/RelatedLinks";
import { Linker } from "@/lib/linker";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTABand } from "@/components/CTABand";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { Prose, Section, SectionHeading } from "@/components/ui";
import { holidaysOrdered } from "@/data/nav";
import { metaFor } from "@/lib/page";
import { holidayHubPath, paths, routeInfo } from "@/lib/routes";
import { itemListNode, pageGraph, serviceNode } from "@/lib/schema";

const path = holidayHubPath;
export const metadata = metaFor(path);

export default function Page() {
  const info = routeInfo(path);
  const crumbs = [{ name: "Home", path: "/" }, { name: "Holiday Lights", path }];
  const linker = new Linker(path).exclude(...holidaysOrdered.map((h) => paths.holiday(h)));
  return (
    <>
      <JsonLd data={pageGraph({ path, title: info.title, description: info.description, crumbs, pageType: "CollectionPage", extra: [itemListNode(path, "Permanent holiday lighting by occasion", holidaysOrdered.map((h) => ({ name: `${h.navLabel} lights`, path: paths.holiday(h) }))), serviceNode({ path, name: "Permanent Holiday Lighting", serviceType: "Holiday lighting installation", description: info.description })] })} />
      <Hero
        eyebrow="Every Holiday, One System"
        title={<>Permanent <span className="accent-underline">Holiday Lights</span> in Albuquerque</>}
        subhead="Install once, then switch from Christmas red and green to Balloon Fiesta rainbows, Lobos cherry and silver or luminaria-season amber with a tap."
        image="/images/placeholders/christmas-roofline-colors.jpg"
        imageAlt="Albuquerque home with permanent holiday lights in a festive color pattern"
        form
      />
      <Breadcrumbs crumbs={crumbs} />
      <Section>
        <div className="grid gap-2 lg:gap-10 lg:grid-cols-2">
          <SectionHeading eyebrow="Holiday Lighting Albuquerque" title="Stop Hanging Lights. Start Scheduling Them." />
          <Prose linker={linker} paragraphs={[
            "Traditional holiday lights mean a weekend on the ladder in November and another one in January. Permanent lighting replaces all of that with a low-profile track that stays up year-round and disappears against your fascia or stucco by day.",
            "Because every node can be any color, the same lights handle every occasion on the calendar. Load your favorite scenes once and the app runs them on schedule, from New Year's Eve to Christmas Eve, with warm white on every night in between.",
          ]} />
        </div>
      </Section>
      <Section tone="panel">
        <SectionHeading eyebrow="The Calendar" title="Holiday Lighting Ideas for the Whole Year" />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {holidaysOrdered.map((h) => (
            <li key={h.slug}>
              <Link href={paths.holiday(h)} className="card block h-full p-6 hover:border-zia/60">
                <span className="text-xs font-semibold uppercase tracking-wider text-zia">{h.month}</span>
                <h2 className="mt-1 text-xl font-semibold text-white">{h.navLabel}</h2>
                <div className="mt-4 flex h-3 overflow-hidden rounded-full" aria-hidden="true">
                  {h.palettes[0]?.colors.map((c) => <span key={c.hex + c.name} className="flex-1" style={{ backgroundColor: c.hex }} />)}
                </div>
                <p className="mt-4 text-sm text-slate-400">{h.heroSubhead}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <SiteRelated current={path} title="Holiday Lighting Across the Albuquerque Metro" />
      <CTABand title="Ready for Every Holiday at the Tap of a Button?" />
    </>
  );
}
