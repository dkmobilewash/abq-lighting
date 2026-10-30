import Link from "next/link";
import { cityLabel, getCity } from "@/data/cities";
import { cityServices } from "@/data/cityServices";
import { systemFeatures } from "@/data/features";
import { processSteps } from "@/data/process";
import type { CityService } from "@/data/types";
import { cityServiceImages } from "@/data/pageImages";
import { paths, routeInfo } from "@/lib/routes";
import { Linker } from "@/lib/linker";
import { localHolidayLinks, localOverrides, neighborhoodLinks, popularServiceLinks, postLinks, relatedPosts } from "@/lib/related";
import { RelatedLinks } from "../RelatedLinks";
import { cityNode, faqNode, pageGraph, serviceNode, type Crumb } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import { Breadcrumbs } from "../Breadcrumbs";
import { CTABand } from "../CTABand";
import { FAQAccordion } from "../FAQAccordion";
import { FeatureGrid } from "../FeatureGrid";
import { Hero } from "../Hero";
import { JsonLd } from "../JsonLd";
import { NAPCard } from "../NAPCard";
import { ProjectCarousel } from "../ProjectCarousel";
import { CardLink, Prose, Section, SectionHeading } from "../ui";


export function CityServicePage({ cs }: { cs: CityService }) {
  const city = getCity(cs.city)!;
  const label = cityLabel(city);
  const path = paths.cityService(cs);
  const info = routeInfo(path);
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Service Areas", path: "/service-areas/" },
    { name: label, path: paths.city(city.slug) },
    { name: cs.name, path },
  ];
  const siblings = cityServices.filter((x) => x.city === cs.city && x.service !== cs.service);
  const otherCity = cityServices.filter((x) => x.service === cs.service && x.city !== cs.city);
  const img = cityServiceImages[cs.service];
  const linker = new Linker(path, { overrides: localOverrides(city.slug) });

  return (
    <>
      <JsonLd
        data={pageGraph({
          path, title: info.title, description: info.description, crumbs,
          place: `${absoluteUrl(paths.city(city.slug))}#place`,
          mainEntity: `${absoluteUrl(path)}#service`,
          extra: [
            cityNode(city),
            serviceNode({ path, name: `${cs.name} in ${label}, NM`, serviceType: cs.name, description: info.description, areaId: `${absoluteUrl(paths.city(city.slug))}#place` }),
            faqNode(path, cs.faqs),
          ],
        })}
      />
      <Hero
        eyebrow={`Serving ${label}, NM`}
        title={<>{cs.name} in <span className="accent-underline">{label}</span>, NM</>}
        subhead={cs.heroSubhead}
        image={img.src}
        imageAlt={img.alt(label)}
        form
        cityName={label}
        citySlug={city.slug}
      />
      <Breadcrumbs crumbs={crumbs} />

      <Section>
        <div className="grid gap-2 lg:gap-10 lg:grid-cols-2">
          <SectionHeading eyebrow={`${label} ${cs.name}`} title={`${cs.name} Designed for ${label}`} />
          <Prose paragraphs={cs.intro} linker={linker} />
        </div>
      </Section>

      {cs.sections.map((s, i) => (
        <Section key={s.heading} tone={i % 2 === 0 ? "light" : "dark"}>
          <div className="grid gap-2 lg:gap-10 lg:grid-cols-2">
            <SectionHeading tone={i % 2 === 0 ? "light" : "dark"} title={s.heading} />
            <Prose tone={i % 2 === 0 ? "light" : "dark"} paragraphs={s.paragraphs} linker={linker} />
          </div>
        </Section>
      ))}

      <Section tone="panel">
        <SectionHeading eyebrow="How It Works" title={`Getting ${cs.name} in ${label}`} />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s) => (
            <li key={s.step} className="card p-6">
              <span className="font-heading text-3xl font-semibold text-gradient">0{s.step}</span>
              <h3 className="mt-2 font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHeading eyebrow="The System" title={`Why ${label} Chooses Permanent Lighting`} />
        <FeatureGrid items={systemFeatures.slice(0, 6)} />
      </Section>

      <Section tone="panel">
        <ProjectCarousel />
      </Section>

      <Section tone="light">
        <SectionHeading tone="light" eyebrow="FAQs" title={`${cs.name} FAQs for ${label}`} />
        <div className="max-w-4xl"><FAQAccordion faqs={cs.faqs} linker={linker} /></div>
      </Section>

      <Section>
        <NAPCard heading={`Your Local ${cs.name} Installer in ${label}, NM`} mapQuery={`${label}, NM`} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-white">More in {label}</h2>
            <ul className="mt-3 space-y-1">
              <li><CardLink href={paths.city(city.slug)}>Permanent lighting in {label}</CardLink></li>
              {siblings.map((x) => <li key={x.service}><CardLink href={paths.cityService(x)}>{x.name} in {label}</CardLink></li>)}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Related</h2>
            <ul className="mt-3 space-y-1">
              <li><CardLink href={cs.parentPath}>{routeInfo(cs.parentPath).title.split(" | ")[0]}</CardLink></li>
              {otherCity.map((x) => <li key={x.city}><CardLink href={paths.cityService(x)}>{x.name} in {cityLabel(getCity(x.city)!)}</CardLink></li>)}
              <li><Link href="/get-a-quote/" className="inline-flex min-h-11 items-center text-sm font-semibold text-zia">Request a free quote →</Link></li>
            </ul>
          </div>
        </div>
      </Section>

      <RelatedLinks
        title={`More ${label} Lighting Resources`}
        groups={[
          { heading: `Other Services in ${label}`, links: popularServiceLinks(city.slug).filter((l) => l.href !== path).slice(0, 6) },
          {
            heading: city.slug === "albuquerque" ? "Albuquerque Neighborhoods" : "Nearby Areas",
            links:
              city.slug === "albuquerque"
                ? neighborhoodLinks({ only: ["northeast-heights", "nob-hill", "four-hills", "sandia-heights", "westside-ventana-ranch", "taylor-ranch"] }).map((l) => ({ ...l, label: l.label.replace("permanent lighting", cs.name) }))
                : city.nearby.map((s) => ({ href: paths.city(s), label: `Permanent lighting in ${cityLabel(getCity(s)!)}` })),
          },
          { heading: "Holiday & Event Lighting", links: localHolidayLinks().slice(0, 5) },
          { heading: "Guides", links: postLinks(relatedPosts({ service: cs.parentPath, city: city.slug })) },
        ]}
      />

      <CTABand title={`Ready for ${cs.name} in ${label}?`} />
    </>
  );
}
