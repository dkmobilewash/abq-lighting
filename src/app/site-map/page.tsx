import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui";
import { applications } from "@/data/applications";
import { cities, cityLabel } from "@/data/cities";
import { cityServices } from "@/data/cityServices";
import { holidaysOrdered } from "@/data/nav";
import { neighborhoods } from "@/data/neighborhoods";
import { posts } from "@/data/posts";
import { services } from "@/data/services";
import { metaFor } from "@/lib/page";
import { holidayHubPath, paths, routeInfo } from "@/lib/routes";
import { pageGraph } from "@/lib/schema";

const path = "/site-map/";
export const metadata = metaFor(path);

/** Human-readable sitemap: every indexable page, grouped. Helps visitors and crawl depth. */
export default function Page() {
  const info = routeInfo(path);
  const crumbs = [{ name: "Home", path: "/" }, { name: "Site Map", path }];
  const groups: { heading: string; links: { href: string; label: string }[] }[] = [
    {
      heading: "Company",
      links: [
        { href: "/", label: "Home" },
        { href: "/permanent-outdoor-lighting/", label: "What Is Permanent Outdoor Lighting?" },
        { href: "/why-us/", label: "Why Choose Us" },
        { href: "/how-it-works/", label: "How It Works" },
        { href: "/smart-app/", label: "Smart App & Controls" },
        { href: "/warranty/", label: "Warranty" },
        { href: "/project-showcase/", label: "Project Showcase" },
        { href: "/faqs/", label: "FAQs" },
        { href: "/get-a-quote/", label: "Get a Free Quote" },
        { href: "/contact-us/", label: "Contact Us" },
        { href: "/privacy-policy/", label: "Privacy Policy" },
        { href: "/terms-and-conditions/", label: "Terms & Conditions" },
      ],
    },
    { heading: "Lighting Services", links: services.map((s) => ({ href: paths.service(s), label: `${s.name} in Albuquerque` })) },
    { heading: "Applications", links: applications.map((a) => ({ href: paths.application(a.slug), label: a.name })) },
    {
      heading: "Holiday Lighting",
      links: [{ href: holidayHubPath, label: "Permanent Holiday Lights" }, ...holidaysOrdered.map((h) => ({ href: paths.holiday(h), label: `${h.navLabel} Lights` }))],
    },
    { heading: "Service Areas", links: [{ href: "/service-areas/", label: "All Service Areas" }, ...cities.map((c) => ({ href: paths.city(c.slug), label: `Permanent Lighting in ${cityLabel(c)}, NM` }))] },
    { heading: "Albuquerque Neighborhoods", links: neighborhoods.map((n) => ({ href: paths.neighborhood(n.slug), label: `Permanent Lighting in ${n.name}` })) },
    { heading: "Local Service Pages", links: cityServices.map((cs) => ({ href: paths.cityService(cs), label: `${cs.name} in ${cityLabel(cities.find((c) => c.slug === cs.city)!)}` })) },
    { heading: "Blog", links: [{ href: "/blog/", label: "All Articles" }, ...posts.map((p) => ({ href: paths.post(p.slug), label: p.title }))] },
  ];
  return (
    <>
      <JsonLd data={pageGraph({ path, title: info.title, description: info.description, crumbs, pageType: "CollectionPage" })} />
      <PageHeader eyebrow="Site Map" title="Site Map" intro="Every page on our site, in one place." />
      <Breadcrumbs crumbs={crumbs} />
      <Section tone="light">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <section key={g.heading} aria-labelledby={`sm-${g.heading}`}>
              <h2 id={`sm-${g.heading}`} className="text-xl font-semibold text-ink">{g.heading}</h2>
              <ul className="mt-3 space-y-1">
                {g.links.map((l) => (
                  <li key={l.href}><Link href={l.href} className="inline-flex min-h-9 items-center text-slate-700 underline-offset-4 hover:text-chile hover:underline">{l.label}</Link></li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}
