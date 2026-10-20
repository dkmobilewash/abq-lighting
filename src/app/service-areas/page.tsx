import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTABand } from "@/components/CTABand";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { ServiceAreaMap } from "@/components/ServiceAreaMap";
import { Section, SectionHeading } from "@/components/ui";
import { cities, cityLabel } from "@/data/cities";
import { cityServices } from "@/data/cityServices";
import { neighborhoods } from "@/data/neighborhoods";
import { metaFor } from "@/lib/page";
import { paths, routeInfo } from "@/lib/routes";
import { pageGraph } from "@/lib/schema";

const path = "/service-areas/";
export const metadata = metaFor(path);

export default function Page() {
  const info = routeInfo(path);
  const crumbs = [{ name: "Home", path: "/" }, { name: "Service Areas", path }];
  const counties = [...new Set(cities.map((c) => c.county))];
  const points = cities.map((c) => ({ name: cityLabel(c), href: paths.city(c.slug), lat: c.geo.lat, lng: c.geo.lng }));
  return (
    <>
      <JsonLd data={pageGraph({ path, title: info.title, description: info.description, crumbs, localBusiness: true })} />
      <PageHeader eyebrow="Service Areas" title="Permanent Lighting Across the Albuquerque Metro" intro="From the Westside mesa to the East Mountains and down the valley to Belen, our local crew installs permanent lighting throughout the Middle Rio Grande Valley." />
      <Breadcrumbs crumbs={crumbs} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <ServiceAreaMap points={points} />
          <div className="space-y-8">
            {counties.map((county) => (
              <div key={county}>
                <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.16em] text-zia">{county} County</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {cities.filter((c) => c.county === county).map((c) => (
                    <li key={c.slug}>
                      <Link href={paths.city(c.slug)} className="inline-flex min-h-11 items-center rounded-full border border-cyan/40 bg-cyan/10 px-4 text-sm text-cyan hover:text-zia">{cityLabel(c)}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section tone="light">
        <SectionHeading tone="light" eyebrow="Albuquerque" title="Albuquerque Neighborhoods We Serve" />
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {neighborhoods.map((n) => (
            <li key={n.slug}>
              <Link href={paths.neighborhood(n.slug)} className="card-light flex min-h-12 items-center px-4 py-3 text-slate-700 hover:border-chile hover:text-chile">{n.name}</Link>
            </li>
          ))}
          <li>
            <Link href={paths.city("north-valley")} className="card-light flex min-h-12 items-center px-4 py-3 text-slate-700 hover:border-chile hover:text-chile">North Valley</Link>
          </li>
        </ul>
      </Section>
      <Section>
        <SectionHeading eyebrow="Local Guides" title="Popular Local Lighting Pages" />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cityServices.map((cs) => (
            <li key={`${cs.city}-${cs.service}`}>
              <Link href={paths.cityService(cs)} className="card flex min-h-12 items-center px-4 py-3 text-sm text-slate-200 hover:text-cyan">
                {cs.name} in {cityLabel(cities.find((c) => c.slug === cs.city)!)}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <CTABand title="Don't See Your Area? Ask Us." body="We regularly travel throughout central New Mexico. Tell us where you are and we'll let you know if we can help." />
    </>
  );
}
