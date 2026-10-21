import Link from "next/link";
import { applications } from "@/data/applications";
import { business, hoursDisplay, telHref } from "@/data/business";
import { cities, cityLabel } from "@/data/cities";
import { holidaysOrdered } from "@/data/nav";
import { services } from "@/data/services";
import { cityServices } from "@/data/cityServices";
import { neighborhoods } from "@/data/neighborhoods";
import { Logo } from "./Logo";

const company = [
  { label: "Why Us", href: "/why-us/" },
  { label: "How It Works", href: "/how-it-works/" },
  { label: "Smart App", href: "/smart-app/" },
  { label: "Warranty", href: "/warranty/" },
  { label: "Project Showcase", href: "/project-showcase/" },
  { label: "FAQs", href: "/faqs/" },
  { label: "Blog", href: "/blog/" },
  { label: "Contact", href: "/contact-us/" },
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms & Conditions", href: "/terms-and-conditions/" },
  { label: "Site Map", href: "/site-map/" },
];

const socialIcons: Record<string, string> = {
  facebook: "M14 8h3V4h-3c-2.8 0-4 1.7-4 4.3V10H7v4h3v8h4v-8h3l1-4h-4V8.6c0-.4.3-.6.6-.6Z",
  instagram: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.5-1.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z",
  google: "M21 12.2c0-.7-.1-1.3-.2-1.9H12v3.6h5a4.3 4.3 0 0 1-1.9 2.8v2.3h3A9 9 0 0 0 21 12.2ZM12 21c2.5 0 4.6-.8 6.1-2.2l-3-2.3c-.8.6-1.9.9-3.1.9a5.4 5.4 0 0 1-5.1-3.7H3.8v2.4A9 9 0 0 0 12 21ZM6.9 13.7a5.4 5.4 0 0 1 0-3.4V7.9H3.8a9 9 0 0 0 0 8.2l3.1-2.4ZM12 6.6c1.4 0 2.6.5 3.6 1.4l2.7-2.7A9 9 0 0 0 3.8 7.9l3.1 2.4A5.4 5.4 0 0 1 12 6.6Z",
  nextdoor: "M12 3 3 10v11h6v-6h6v6h6V10l-9-7Z",
};

function Col({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.16em] text-zia">{title}</h2>
      <ul className="mt-4 space-y-1">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-flex min-h-9 items-center text-sm text-slate-400 hover:text-cyan">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const socials = Object.entries(business.socials).filter(([, url]) => url);
  return (
    <footer className="border-t border-line bg-night pb-24 lg:pb-0">
      <div className="container-x grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-5">
        <Col title="Lighting" links={[{ label: "Permanent Outdoor Lighting", href: "/permanent-outdoor-lighting/" }, ...services.map((s) => ({ label: s.name, href: `/${s.slug}/` }))]} />
        <Col title="Applications" links={applications.map((a) => ({ label: a.shortName, href: `/${a.slug}/` }))} />
        <Col title="Holiday Lights" links={[{ label: "All Holiday Lights", href: "/permanent-holiday-lights/" }, ...holidaysOrdered.map((h) => ({ label: h.navLabel, href: `/permanent-holiday-lights/${h.slug}/` }))]} />
        <Col title="Service Areas" links={[{ label: "All Service Areas", href: "/service-areas/" }, ...cities.map((c) => ({ label: cityLabel(c), href: `/service-areas/${c.slug}/` }))]} />
        <Col title="Company" links={company} />
      </div>
      <div className="border-t border-line">
        <div className="container-x grid gap-8 py-10 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.16em] text-zia">Popular Local Services</h2>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
              {cityServices.map((cs) => (
                <li key={cs.city + cs.service}>
                  <Link href={`/service-areas/${cs.city}/${cs.service}/`} className="inline-flex min-h-9 items-center text-sm text-slate-400 hover:text-cyan">
                    {cs.name} in {cityLabel(cities.find((c) => c.slug === cs.city)!)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.16em] text-zia">Albuquerque Neighborhoods</h2>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
              {neighborhoods.map((n) => (
                <li key={n.slug}>
                  <Link href={`/service-areas/albuquerque/${n.slug}/`} className="inline-flex min-h-9 items-center text-sm text-slate-400 hover:text-cyan">{n.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-8 py-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <Logo />
            <p className="max-w-sm text-sm text-slate-400">Serving Albuquerque, Rio Rancho &amp; the Middle Rio Grande Valley.</p>
          </div>
          <address className="space-y-1 text-sm not-italic text-slate-400">
            <p className="font-semibold text-slate-200">{business.name}</p>
            <p>{business.street}, {business.city}, {business.state} {business.zip}</p>
            <p><a href={telHref()} className="hover:text-cyan">{business.phone}</a> · <a href={`mailto:${business.email}`} className="hover:text-cyan">{business.email}</a></p>
            <p>{hoursDisplay}</p>
            <p>NM License {business.licenseNumber} · Licensed &amp; Insured</p>
          </address>
          {socials.length > 0 && (
            <ul className="flex gap-3" aria-label="Social media">
              {socials.map(([name, url]) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noopener noreferrer" aria-label={name} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-slate-300 hover:text-cyan">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d={socialIcons[name]} /></svg>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <p className="container-x pb-8 text-xs text-slate-400">© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
