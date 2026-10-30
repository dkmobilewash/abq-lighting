import Link from "next/link";
import { business } from "@/data/business";
import { getCity } from "@/data/cities";
import { smartFeatures } from "@/data/features";
import { neighborhoods } from "@/data/neighborhoods";
import type { Neighborhood } from "@/data/types";
import { paths, routeInfo } from "@/lib/routes";
import { Linker } from "@/lib/linker";
import { localHolidayLinks, localOverrides, matrixFor, popularServiceLinks, postLinks, relatedPosts } from "@/lib/related";
import { RelatedLinks } from "../RelatedLinks";
import { faqNode, pageGraph, placeNode, serviceNode, type Crumb } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import { BeforeAfterSlider } from "../BeforeAfterSlider";
import { Breadcrumbs } from "../Breadcrumbs";
import { CTABand } from "../CTABand";
import { FAQAccordion } from "../FAQAccordion";
import { FeatureGrid } from "../FeatureGrid";
import { Hero } from "../Hero";
import { JsonLd } from "../JsonLd";
import { NAPCard } from "../NAPCard";
import { ServiceCards } from "../ServiceCards";
import { Prose, Section, SectionHeading } from "../ui";

export function NeighborhoodPage({ n }: { n: Neighborhood }) {
  const path = paths.neighborhood(n.slug);
  const info = routeInfo(path);
  const abq = getCity("albuquerque")!;
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Service Areas", path: "/service-areas/" },
    { name: "Albuquerque", path: paths.city("albuquerque") },
    { name: n.name, path },
  ];
  const linker = new Linker(path, { overrides: localOverrides("albuquerque") });
  const popular = popularServiceLinks("albuquerque");
  const nearby = n.nearby.map((s) => neighborhoods.find((x) => x.slug === s)).filter((x): x is Neighborhood => Boolean(x));

  return (
    <>
      <JsonLd
        data={pageGraph({
          path, title: info.title, description: info.description, crumbs,
          place: `${absoluteUrl(path)}#place`,
          mainEntity: `${absoluteUrl(path)}#service`,
          extra: [
            placeNode(`${n.name}, Albuquerque, NM`, path),
            serviceNode({ path, name: `Permanent Outdoor Lighting in ${n.name}`, serviceType: "Permanent outdoor LED lighting installation", description: info.description, areaId: `${absoluteUrl(path)}#place` }),
            faqNode(path, n.faqs),
          ],
        })}
      />
      <Hero
        eyebrow={`Serving ${n.name}, Albuquerque`}
        title={<>Permanent Lighting in <span className="accent-underline">{n.name}</span>, Albuquerque</>}
        subhead={n.heroSubhead}
        imageAlt={`Home in ${n.name}, Albuquerque with permanent outdoor lighting at night`}
        form
        cityName="Albuquerque"
        citySlug="albuquerque"
      />
      <Breadcrumbs crumbs={crumbs} />

      <Section>
        <div className="grid gap-2 lg:gap-10 lg:grid-cols-2">
          <SectionHeading eyebrow={n.name} title={`Smart Permanent Lighting for ${n.name} Homes`} />
          <Prose paragraphs={n.intro} linker={linker} />
        </div>
      </Section>

      <Section tone="light">
        <div className="grid gap-2 lg:gap-10 lg:grid-cols-2">
          <SectionHeading tone="light" eyebrow="Homes & Architecture" title={`Designed for ${n.name} Rooflines`} />
          <Prose tone="light" paragraphs={n.homes} linker={linker} />
        </div>
      </Section>

      <Section tone="panel">
        <div className="grid gap-2 lg:gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Living Here" title={`Lighting for Life in ${n.name}`} />
            <h3 className="font-semibold text-white">Around the neighborhood</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {n.landmarks.map((l) => <li key={l} className="rounded-full border border-line bg-night px-3 py-1.5 text-sm text-slate-300">{l}</li>)}
            </ul>
          </div>
          <Prose paragraphs={n.lifestyle} linker={linker} />
        </div>
      </Section>

      <Section>
        <SectionHeading align="center" eyebrow="Day vs. Night" title="Invisible by Day, Stunning at Night" />
        <div className="mx-auto max-w-4xl">
          <BeforeAfterSlider
            before="/images/placeholders/before-day-home.jpg"
            after="/images/placeholders/after-night-home.jpg"
            beforeAlt={`${n.name} home by day with the low-profile permanent light track barely visible`}
            afterAlt={`The same ${n.name} home at night with permanent lights on`}
          />
        </div>
      </Section>

      <Section tone="panel">
        <SectionHeading eyebrow="Services" title={`Lighting Services in ${n.name}`} />
        <ServiceCards cityName="Albuquerque" localLinks={Object.fromEntries(matrixFor("albuquerque").map((cs) => [cs.service, paths.cityService(cs)]))} />
      </Section>

      <Section>
        <SectionHeading eyebrow="Smart Features" title="Everything Runs From One App" />
        <FeatureGrid items={smartFeatures} />
      </Section>

      <Section tone="light">
        <SectionHeading tone="light" eyebrow="FAQs" title={`${n.name} Permanent Lighting FAQs`} />
        <div className="max-w-4xl"><FAQAccordion faqs={n.faqs} linker={linker} /></div>
      </Section>

      <Section>
        <NAPCard heading={`Your Local Installer Near ${n.name}`} mapQuery={`${n.name}, Albuquerque, NM`} />
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-white">More Albuquerque Neighborhoods</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {nearby.map((x) => (
              <li key={x.slug}>
                <Link href={paths.neighborhood(x.slug)} className="inline-flex min-h-11 items-center rounded-full border border-cyan/40 bg-cyan/10 px-4 text-sm text-cyan hover:text-zia">{x.name}</Link>
              </li>
            ))}
            <li><Link href={paths.city(abq.slug)} className="inline-flex min-h-11 items-center rounded-full border border-zia/40 bg-zia/10 px-4 text-sm text-zia hover:text-cyan">All of Albuquerque</Link></li>
            <li><Link href="/service-areas/" className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm text-slate-300 hover:text-cyan">All service areas</Link></li>
          </ul>
          <p className="mt-6 text-sm text-slate-400">ZIP codes: {n.zips.join(", ")} · {business.name}</p>
        </div>
      </Section>

      <RelatedLinks
        title={`Explore Lighting Near ${n.name}`}
        groups={[
          { heading: `Services in ${n.name}`, links: popular.slice(0, 6).map((l) => ({ ...l, label: l.label.replace("in Albuquerque", `in ${n.name}`) })) },
          {
            heading: "Nearby Neighborhoods",
            links: [
              ...nearby.map((x) => ({ href: paths.neighborhood(x.slug), label: `Permanent lighting in ${x.name}` })),
              { href: paths.city("albuquerque"), label: "Permanent lighting in Albuquerque" },
            ],
          },
          { heading: "Holiday & Event Lighting", links: localHolidayLinks().slice(0, 5) },
          { heading: "Guides", links: postLinks(relatedPosts({ city: "albuquerque" })) },
        ]}
      />

      <CTABand title={`Ready to Light Up Your ${n.name} Home?`} />
    </>
  );
}
