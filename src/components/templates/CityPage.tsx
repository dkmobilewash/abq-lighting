import Link from "next/link";
import { business } from "@/data/business";
import { cities, cityLabel, getCity } from "@/data/cities";
import { cityServices } from "@/data/cityServices";
import { smartFeatures, systemFeatures } from "@/data/features";
import { neighborhoods } from "@/data/neighborhoods";
import type { City } from "@/data/types";
import { paths } from "@/lib/routes";
import { faqNode, pageGraph, type Crumb } from "@/lib/schema";
import { routeInfo } from "@/lib/routes";
import { AppSection } from "../AppSection";
import { BeforeAfterSlider } from "../BeforeAfterSlider";
import { Breadcrumbs } from "../Breadcrumbs";
import { CTABand } from "../CTABand";
import { FAQAccordion } from "../FAQAccordion";
import { FeatureGrid } from "../FeatureGrid";
import { Hero } from "../Hero";
import { JsonLd } from "../JsonLd";
import { NAPCard } from "../NAPCard";
import { ProjectCarousel } from "../ProjectCarousel";
import { ReviewPlaceholder } from "../ReviewPlaceholder";
import { ServiceCards } from "../ServiceCards";
import { ZipGrid } from "../ZipGrid";
import { CardLink, Prose, Section, SectionHeading } from "../ui";

const heroImages: Partial<Record<City["slug"], { src: string; alt: string }>> = {
  "rio-rancho": { src: "/images/placeholders/new-build-two-story-night.jpg", alt: "Two-story stucco home in Rio Rancho with permanent roofline lighting at night" },
  "sandia-park-cedar-crest": { src: "/images/placeholders/mountain-home-night.jpg", alt: "East Mountains home in Cedar Crest with warm white permanent lights along a pitched metal roof" },
  tijeras: { src: "/images/placeholders/mountain-home-night.jpg", alt: "Mountain home near Tijeras with permanent roofline lighting" },
  corrales: { src: "/images/placeholders/valley-adobe-night.jpg", alt: "Adobe home in Corrales with warm permanent lights along the parapet" },
  "north-valley": { src: "/images/placeholders/valley-adobe-night.jpg", alt: "North Valley adobe home with permanent warm white lighting" },
  "south-valley": { src: "/images/placeholders/valley-adobe-night.jpg", alt: "South Valley adobe home with permanent warm lighting along the roofline" },
  "los-ranchos-de-albuquerque": { src: "/images/placeholders/territorial-home-warm-white.jpg", alt: "Territorial-style home in Los Ranchos de Albuquerque with permanent warm white lights" },
  edgewood: { src: "/images/placeholders/ranch-home-night.jpg", alt: "Ranch home in Edgewood with permanent roofline lighting" },
  belen: { src: "/images/placeholders/ranch-home-night.jpg", alt: "Ranch-style home in Belen with permanent roofline lights at night" },
  "los-lunas": { src: "/images/placeholders/new-build-two-story-night.jpg", alt: "Newer two-story home in Los Lunas with permanent roofline lighting" },
};

export function CityPage({ city }: { city: City }) {
  const label = cityLabel(city);
  const path = paths.city(city.slug);
  const info = routeInfo(path);
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Service Areas", path: "/service-areas/" },
    { name: label, path },
  ];
  const nearby = city.nearby.map((s) => getCity(s)).filter((c): c is City => Boolean(c));
  const matrix = cityServices.filter((cs) => cs.city === city.slug);
  const localLinks = Object.fromEntries(matrix.map((cs) => [cs.service, paths.cityService(cs)]));
  const hero = heroImages[city.slug] ?? { src: "/images/hero-albuquerque-stucco-home-night.jpg", alt: `Home in ${label}, New Mexico with permanent outdoor lighting at night` };
  const neighborhoodSlugs = new Set(neighborhoods.map((n) => n.slug));

  return (
    <>
      <JsonLd data={pageGraph({ path, title: info.title, description: info.description, crumbs, localBusiness: true, extra: [faqNode(path, city.faqs)] })} />

      {/* 1. Hero */}
      <Hero
        eyebrow={`Serving ${label}, New Mexico`}
        title={<>Permanent Outdoor Lighting in <span className="accent-underline">{label}</span>, New Mexico</>}
        subhead={city.heroSubhead}
        image={hero.src}
        imageAlt={hero.alt}
        form
        cityName={city.slug === "albuquerque" ? "Albuquerque" : label}
        citySlug={city.slug}
      />

      {/* 2. Breadcrumb */}
      <Breadcrumbs crumbs={crumbs} />

      {/* 3. Transform */}
      <Section>
        <div className="grid gap-2 lg:gap-10 lg:grid-cols-2">
          <SectionHeading eyebrow={`${label} Permanent Lighting`} title={`Transform Your ${label} Home with Smart Permanent Lighting`} />
          <Prose paragraphs={city.intro} />
        </div>
      </Section>

      {/* 4. Built for homes */}
      <Section tone="light">
        <div className="grid gap-2 lg:gap-10 lg:grid-cols-2">
          <SectionHeading tone="light" eyebrow="Built for New Mexico" title={`Permanent Lighting Built for ${label} Homes`} />
          <Prose tone="light" paragraphs={city.homes} />
        </div>
      </Section>

      {/* 5. Areas */}
      <Section>
        <SectionHeading eyebrow={`Serving ${label}, NM`} title={`Areas We Serve Across ${label}`} intro={city.areas.intro} />
        <ul className="flex flex-wrap gap-3">
          {city.areas.places.map((p) => {
            const href = p.neighborhoodSlug && neighborhoodSlugs.has(p.neighborhoodSlug) ? paths.neighborhood(p.neighborhoodSlug) : undefined;
            return (
              <li key={p.name}>
                {href ? (
                  <Link href={href} className="inline-flex min-h-11 items-center rounded-full border border-cyan/40 bg-cyan/10 px-4 text-sm font-medium text-cyan hover:border-zia hover:text-zia">{p.name}</Link>
                ) : (
                  <span className="inline-flex min-h-11 items-center rounded-full border border-line bg-panel px-4 text-sm text-slate-300">{p.name}</span>
                )}
              </li>
            );
          })}
        </ul>
        <h3 className="mt-10 text-lg font-semibold text-white">Nearby communities we also serve</h3>
        <ul className="mt-4 flex flex-wrap gap-3">
          {nearby.map((c) => (
            <li key={c.slug}>
              <Link href={paths.city(c.slug)} className="inline-flex min-h-11 items-center rounded-full border border-zia/40 bg-zia/10 px-4 text-sm font-medium text-zia hover:border-cyan hover:text-cyan">
                {cityLabel(c)}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/service-areas/" className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm text-slate-300 hover:text-cyan">All service areas →</Link>
          </li>
        </ul>
      </Section>

      {/* 6. Lifestyle */}
      <Section tone="panel">
        <div className="grid gap-2 lg:gap-10 lg:grid-cols-2">
          <SectionHeading eyebrow="Year-Round Scheduling" title={`Lighting Made for the Way ${label} Lives Outdoors`} />
          <Prose paragraphs={city.lifestyle} />
        </div>
      </Section>

      {/* 7. Local installer */}
      <Section tone="light">
        <div className="grid gap-2 lg:gap-10 lg:grid-cols-2">
          <SectionHeading tone="light" eyebrow="Local Crew" title={`A Local ${label} Installer You Can Count On`} />
          <div>
            <Prose tone="light" paragraphs={city.localInstaller} />
            <p className="mt-4 text-sm text-slate-600">Licensed &amp; insured · NM License {business.licenseNumber}</p>
          </div>
        </div>
      </Section>

      {/* 8. NAP */}
      <Section>
        <NAPCard heading={`Your Local Permanent Lighting Installer in ${label}, NM`} mapQuery={`${label}, NM`} />
      </Section>

      {/* 9. ZIPs */}
      <Section tone="light">
        <SectionHeading tone="light" eyebrow="Coverage" title={`ZIP Codes We Serve Near ${label}, NM`} />
        <ZipGrid cities={[city, ...nearby]} />
      </Section>

      {/* 10. Why choose */}
      <Section>
        <SectionHeading eyebrow="Why Us" title={`Why ${label} Homeowners Choose ${business.name}`} />
        <FeatureGrid items={systemFeatures} cols={4} />
      </Section>

      {/* 11. Before/after */}
      <Section tone="panel">
        <SectionHeading align="center" eyebrow="Day vs. Night" title="Invisible by Day, Stunning at Night" intro="Drag the slider. The low-profile track is color-matched to your fascia or stucco, so you barely see it until the sun goes down." />
        <div className="mx-auto max-w-4xl">
          <BeforeAfterSlider
            before="/images/placeholders/before-day-home.jpg"
            after="/images/placeholders/after-night-home.jpg"
            beforeAlt={`Stucco home in ${label} during the day with the permanent light track hidden along the parapet`}
            afterAlt={`The same ${label} home at night with permanent lights glowing along the parapet`}
          />
        </div>
      </Section>

      {/* 12. Projects */}
      <Section>
        <ProjectCarousel />
      </Section>

      {/* 13. Services */}
      <Section tone="panel">
        <SectionHeading eyebrow="Lighting Services" title={`One System for Every Surface of Your ${label} Property`} />
        <ServiceCards blurbs={city.serviceBlurbs} localLinks={localLinks} cityName={label} />
        <p className="mt-8 text-slate-400">
          Also see <Link className="text-cyan hover:text-zia" href="/security-accent-lighting/">security &amp; accent lighting</Link>,{" "}
          <Link className="text-cyan hover:text-zia" href="/permanent-holiday-lights/christmas-lights/">permanent Christmas lights</Link> and{" "}
          <Link className="text-cyan hover:text-zia" href="/commercial-permanent-lighting/">commercial lighting</Link>.
        </p>
        {matrix.length > 0 && (
          <div className="mt-8">
            <h3 className="font-semibold text-white">{label} lighting guides</h3>
            <ul className="mt-3 flex flex-wrap gap-x-6">
              {matrix.map((cs) => (
                <li key={cs.service}><CardLink href={paths.cityService(cs)}>{cs.name} in {label}</CardLink></li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      {/* 14. App */}
      <Section>
        <AppSection />
      </Section>

      {/* 15. Smart features */}
      <Section tone="panel">
        <SectionHeading eyebrow="Smart Features" title={`Smart Lighting Features for ${label}, NM`} />
        <FeatureGrid items={smartFeatures} />
      </Section>

      {/* 16. Reviews */}
      <Section tone="light">
        <SectionHeading tone="light" eyebrow="Reviews" title={`What ${label} Neighbors Say`} />
        <div className="grid gap-5 md:grid-cols-3">
          {[1, 2, 3].map((i) => <ReviewPlaceholder key={i} index={i} />)}
        </div>
        {business.googleReviewsUrl ? (
          <a href={business.googleReviewsUrl} className="mt-6 inline-flex min-h-11 items-center font-semibold text-chile hover:underline" target="_blank" rel="noopener noreferrer">See our Google reviews →</a>
        ) : (
          <p className="mt-6 text-sm text-slate-600">[PLACEHOLDER] &quot;See our Google reviews&quot; link appears once business.googleReviewsUrl is set.</p>
        )}
      </Section>

      {/* 17. FAQ */}
      <Section tone="light" className="pt-0 sm:pt-0">
        <SectionHeading tone="light" eyebrow="FAQs" title={`Permanent Lighting FAQs for ${label}`} />
        <div className="max-w-4xl"><FAQAccordion faqs={city.faqs} /></div>
      </Section>

      {/* 18. CTA */}
      <CTABand title={`Ready to Light Up Your ${label} Home?`} />

      {/* 19. Builders / HOAs */}
      <BuildersBand />
    </>
  );
}

export function BuildersBand() {
  return (
    <section className="bg-adobe py-14">
      <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-semibold text-ink">Builders, HOAs &amp; Businesses</h2>
          <p className="mt-2 max-w-2xl text-slate-600">Storefronts, dealerships, community entrances and new builds: one permanent system, every season, no lift rentals.</p>
        </div>
        <div className="flex flex-wrap gap-x-6">
          <Link href="/commercial-permanent-lighting/" className="inline-flex min-h-11 items-center font-semibold text-chile hover:underline">Commercial lighting →</Link>
          <Link href="/hoa-and-community-lighting/" className="inline-flex min-h-11 items-center font-semibold text-chile hover:underline">HOA &amp; community →</Link>
        </div>
      </div>
    </section>
  );
}

/** All cities except the given one — handy for "Available in" grids. */
export function otherCities(exclude?: string) {
  return cities.filter((c) => c.slug !== exclude);
}
