import Image from "next/image";
import Link from "next/link";
import { AppSection } from "@/components/AppSection";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { CTABand } from "@/components/CTABand";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FeatureGrid } from "@/components/FeatureGrid";
import { Hero } from "@/components/Hero";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { NAPCard } from "@/components/NAPCard";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { ReviewPlaceholder } from "@/components/ReviewPlaceholder";
import { ServiceCards } from "@/components/ServiceCards";
import { BuildersBand } from "@/components/templates/CityPage";
import { CardLink, Prose, Section, SectionHeading } from "@/components/ui";
import { applications } from "@/data/applications";
import { business } from "@/data/business";
import { cities, cityLabel } from "@/data/cities";
import { homeFaqs } from "@/data/faqs";
import { smartFeatures, systemFeatures, trustItems } from "@/data/features";
import { holidaysOrdered } from "@/data/nav";
import { neighborhoods } from "@/data/neighborhoods";
import { posts } from "@/data/posts";
import { processSteps } from "@/data/process";
import { metaFor } from "@/lib/page";
import { paths, routeInfo } from "@/lib/routes";
import { faqNode, pageGraph } from "@/lib/schema";

export const metadata = metaFor("/");

const topApps = ["residential-permanent-lighting", "commercial-permanent-lighting", "hoa-and-community-lighting"];

export default function Home() {
  const info = routeInfo("/");
  const counties = [...new Set(cities.map((c) => c.county))];

  return (
    <>
      <JsonLd data={pageGraph({ path: "/", title: info.title, description: info.description, localBusiness: true, extra: [faqNode("/", homeFaqs)] })} />

      <Hero
        eyebrow="Serving Albuquerque, New Mexico"
        title={<>Permanent Outdoor Lighting in <span className="accent-underline">Albuquerque</span></>}
        subhead="Year-round, app-controlled LED lights for your roofline, parapets and walls. Warm white every night, any color for every holiday, and no more ladders."
        imageAlt="Albuquerque Pueblo Revival home glowing with permanent warm white lights along its parapets at night"
        form
        cityName="Albuquerque"
        citySlug="albuquerque"
      />

      {/* Trust strip */}
      <section aria-label="Why homeowners trust us" className="border-y border-line bg-panel">
        <ul className="container-x grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
          {trustItems.map((t) => (
            <li key={t.title} className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zia/10 text-zia"><Icon name={t.icon} /></span>
              <span>
                <span className="block font-semibold text-white">{t.title}</span>
                <span className="block text-sm text-slate-400">{t.body}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <Section>
        <div className="grid gap-2 lg:gap-10 lg:grid-cols-2">
          <SectionHeading eyebrow="Permanent Lighting Albuquerque" title="Smart LED Roofline Lights That Stay Up Year-Round" />
          <div>
            <Prose paragraphs={[
              "Permanent lighting is a slim, color-matched track installed once along your roofline, parapets or walls, with individually controllable LEDs tucked inside. By day it blends into your fascia or stucco. At night it becomes whatever you want: a soft warm white for everyday curb appeal, or full color for every holiday on the calendar.",
              "Everything runs from an app on your phone. Schedule red and green from Thanksgiving to Three Kings Day, cherry and silver for Lobos game nights, a sunrise rainbow for Balloon Fiesta week and amber on Christmas Eve, then let your lights switch themselves at dusk and dawn. No ladders, no tangled strands, no January takedown.",
              "We're a local Albuquerque crew, and we design for the homes here: stucco parapets, flat roofs with canales, Territorial brick coping, pitched tile and metal roofs, and the HOA guidelines that come with many planned communities.",
            ]} />
            <div className="mt-6"><CardLink href="/permanent-outdoor-lighting/">What is permanent outdoor lighting?</CardLink></div>
          </div>
        </div>
      </Section>

      <Section tone="light">
        <SectionHeading tone="light" eyebrow="How It Works" title="Four Simple Steps to Year-Round Light" />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s) => (
            <li key={s.step} className="card-light reveal p-6">
              <span className="font-heading text-3xl font-semibold text-chile">0{s.step}</span>
              <h3 className="mt-2 text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-slate-600">{s.body}</p>
            </li>
          ))}
        </ol>
        <Link href="/how-it-works/" className="mt-8 inline-flex min-h-11 items-center font-semibold text-chile hover:underline">More about our process →</Link>
      </Section>

      <Section tone="panel">
        <SectionHeading eyebrow="Lighting Services" title="One System for Every Surface of Your Albuquerque Property" />
        <ServiceCards includeSecurity />
      </Section>

      <Section>
        <SectionHeading align="center" eyebrow="Day vs. Night" title="Invisible by Day, Stunning at Night" intro="Drag the slider to see how the low-profile track disappears against stucco in daylight." />
        <div className="mx-auto max-w-4xl">
          <BeforeAfterSlider
            before="/images/placeholders/before-day-home.jpg"
            after="/images/placeholders/after-night-home.jpg"
            beforeAlt="Albuquerque stucco home during the day with the permanent light track hidden along its parapet"
            afterAlt="The same Albuquerque home at night with permanent lights glowing along the parapet"
          />
        </div>
      </Section>

      <Section tone="light">
        <SectionHeading tone="light" eyebrow="Applications" title="Homes, Businesses and Whole Communities" />
        <ul className="grid gap-5 md:grid-cols-3">
          {topApps.map((slug) => {
            const a = applications.find((x) => x.slug === slug)!;
            return (
              <li key={slug} className="card-light overflow-hidden">
                <Link href={paths.application(slug)} className="group block">
                  <div className="relative aspect-[16/10]">
                    <Image src={a.image} alt={a.imageAlt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-ink">{a.shortName}</h3>
                    <p className="mt-2 text-slate-600">{a.cardBlurb}</p>
                    <span className="mt-3 inline-block text-sm font-semibold text-chile">Learn more →</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="panel">
        <SectionHeading eyebrow="Holiday Calendar" title="Permanent Christmas Lights, and Every Holiday After" intro="One install covers the whole year. Tap a holiday to see color ideas." />
        <ul className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-3 sm:mx-0 sm:flex-wrap sm:px-0" aria-label="Holiday lighting pages">
          {holidaysOrdered.map((h) => (
            <li key={h.slug} className="shrink-0 snap-start">
              <Link href={paths.holiday(h)} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-zia/30 bg-night px-4 text-sm text-slate-200 hover:border-chile hover:text-zia">
                <span className="flex h-3 w-6 overflow-hidden rounded-full" aria-hidden="true">
                  {h.palettes[0]?.colors.slice(0, 3).map((c) => <span key={c.hex + c.name} className="flex-1" style={{ backgroundColor: c.hex }} />)}
                </span>
                {h.navLabel}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading eyebrow="Why Us" title={`Why Albuquerque Homeowners Choose ${business.name}`} />
        <FeatureGrid items={systemFeatures} cols={4} />
        <div className="mt-8 flex flex-wrap gap-x-6">
          <CardLink href="/why-us/">Why choose a local crew</CardLink>
          <CardLink href="/warranty/">Our warranty</CardLink>
        </div>
      </Section>

      <Section tone="panel">
        <ProjectCarousel />
      </Section>

      <Section>
        <AppSection />
      </Section>

      <Section tone="panel">
        <SectionHeading eyebrow="Smart Features" title="Smart Lighting Features for Albuquerque, NM" />
        <FeatureGrid items={smartFeatures} />
      </Section>

      <Section tone="light">
        <SectionHeading tone="light" eyebrow="Service Areas" title="Serving Albuquerque, Rio Rancho & the Middle Rio Grande Valley" />
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="grid gap-6 sm:grid-cols-2">
            {counties.map((county) => (
              <div key={county}>
                <h3 className="font-semibold text-ink">{county} County</h3>
                <ul className="mt-2 space-y-1">
                  {cities.filter((c) => c.county === county).map((c) => (
                    <li key={c.slug}><Link href={paths.city(c.slug)} className="inline-flex min-h-9 items-center text-chile hover:underline">{cityLabel(c)}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div>
            <h3 className="font-semibold text-ink">Albuquerque neighborhoods</h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {neighborhoods.map((n) => (
                <li key={n.slug}><Link href={paths.neighborhood(n.slug)} className="inline-flex min-h-9 items-center rounded-full border border-slate-300 bg-white px-3 text-sm text-slate-700 hover:border-chile hover:text-chile">{n.name}</Link></li>
              ))}
            </ul>
            <Link href="/service-areas/" className="mt-6 inline-flex min-h-11 items-center font-semibold text-chile hover:underline">View the service area map →</Link>
          </div>
        </div>
      </Section>

      <Section tone="light" className="pt-0 sm:pt-0">
        <SectionHeading tone="light" eyebrow="Reviews" title="What Albuquerque Homeowners Say" />
        <div className="grid gap-5 md:grid-cols-3">{[1, 2, 3].map((i) => <ReviewPlaceholder key={i} index={i} />)}</div>
      </Section>

      <Section tone="light" className="pt-0 sm:pt-0">
        <SectionHeading tone="light" eyebrow="FAQs" title="Permanent Lighting FAQs for Albuquerque" />
        <div className="max-w-4xl"><FAQAccordion faqs={homeFaqs} /></div>
        <Link href="/faqs/" className="mt-6 inline-flex min-h-11 items-center font-semibold text-chile hover:underline">See all FAQs →</Link>
      </Section>

      <Section>
        <SectionHeading eyebrow="From the Blog" title="Permanent Lighting Guides for Albuquerque" />
        <ul className="grid gap-5 md:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <li key={p.slug} className="card overflow-hidden">
              <Link href={paths.post(p.slug)} className="group block">
                <div className="relative aspect-[16/9]"><Image src={p.image} alt={p.imageAlt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" /></div>
                <div className="p-6">
                  <h3 className="font-semibold text-white group-hover:text-cyan">{p.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{p.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="panel">
        <NAPCard heading="Your Local Permanent Lighting Installer in Albuquerque, NM" />
      </Section>

      <CTABand title="Ready to Light Up Your Albuquerque Home?" />
      <BuildersBand />
    </>
  );
}
