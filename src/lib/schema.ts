import { business, sameAs, siteUrl } from "@/data/business";
import { cities, cityLabel } from "@/data/cities";
import type { FAQ } from "@/data/types";
import { absoluteUrl } from "./seo";

/**
 * JSON-LD graph builders. Every page renders WebSite + Organization + WebPage +
 * BreadcrumbList; templates add LocalBusiness, Service and FAQPage nodes as needed.
 * No AggregateRating until real reviews exist.
 */

const ids = {
  website: `${siteUrl}/#website`,
  organization: `${siteUrl}/#organization`,
  localBusiness: `${siteUrl}/#localbusiness`,
};

export type Crumb = { name: string; path: string };
type Node = Record<string, unknown>;

export function websiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: `${siteUrl}/`,
    name: business.name,
    alternateName: business.shortName,
    publisher: { "@id": ids.organization },
    inLanguage: "en-US",
  };
}

export function organizationNode(): Node {
  return {
    "@type": "Organization",
    "@id": ids.organization,
    name: business.name,
    alternateName: business.shortName,
    url: `${siteUrl}/`,
    logo: absoluteUrl("/icon.svg"),
    email: business.email,
    telephone: business.phone,
    ...(sameAs.length ? { sameAs } : {}),
  };
}

const [days, open, close] = (() => {
  const m = business.hours.match(/^(\w\w)-(\w\w) (\d\d:\d\d)-(\d\d:\d\d)$/);
  const all = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const names: Record<string, string> = { Mo: "Monday", Tu: "Tuesday", We: "Wednesday", Th: "Thursday", Fr: "Friday", Sa: "Saturday", Su: "Sunday" };
  if (!m) return [[] as string[], "08:00", "18:00"] as const;
  const list = all.slice(all.indexOf(m[1]), all.indexOf(m[2]) + 1).map((d) => names[d]);
  return [list, m[3], m[4]] as const;
})();

export function localBusinessNode(): Node {
  return {
    "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
    "@id": ids.localBusiness,
    name: business.name,
    alternateName: business.shortName,
    url: `${siteUrl}/`,
    image: absoluteUrl("/images/hero-albuquerque-stucco-home-night.jpg"),
    telephone: business.phone,
    email: business.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.street,
      addressLocality: business.city,
      addressRegion: business.state,
      postalCode: business.zip,
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng },
    openingHours: business.hours,
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: days, opens: open, closes: close }],
    areaServed: areaServedNodes(),
    parentOrganization: { "@id": ids.organization },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function areaServedNodes(): Node[] {
  return cities.map((c) => ({
    "@type": "City",
    name: `${cityLabel(c)}, NM`,
    containedInPlace: { "@type": "AdministrativeArea", name: `${c.county} County, New Mexico` },
  }));
}

export function webPageNode(path: string, title: string, description: string, crumbs?: Crumb[]): Node {
  const url = absoluteUrl(path);
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { "@id": ids.website },
    about: { "@id": ids.organization },
    inLanguage: "en-US",
    ...(crumbs ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
  };
}

export function breadcrumbNode(path: string, crumbs: Crumb[]): Node {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function serviceNode(opts: { path: string; name: string; description: string; serviceType: string; area?: string }): Node {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(opts.path)}#service`,
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: absoluteUrl(opts.path),
    provider: { "@id": ids.localBusiness },
    areaServed: opts.area
      ? { "@type": "City", name: opts.area }
      : areaServedNodes(),
  };
}

export function faqNode(path: string, faqs: FAQ[]): Node {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleNode(opts: { path: string; title: string; description: string; date: string; image: string }): Node {
  return {
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(opts.path)}#article`,
    headline: opts.title,
    description: opts.description,
    datePublished: opts.date,
    dateModified: opts.date,
    image: absoluteUrl(opts.image),
    mainEntityOfPage: { "@id": `${absoluteUrl(opts.path)}#webpage` },
    author: { "@id": ids.organization },
    publisher: { "@id": ids.organization },
  };
}

type GraphInput = {
  path: string;
  title: string;
  description: string;
  crumbs?: Crumb[];
  localBusiness?: boolean;
  extra?: Node[];
};

/** Build the full @graph for a page. Needs a LocalBusiness node whenever a Service references it. */
export function pageGraph({ path, title, description, crumbs, localBusiness, extra = [] }: GraphInput) {
  const needsBusiness = localBusiness || extra.some((n) => n["@type"] === "Service");
  const graph: Node[] = [websiteNode(), organizationNode(), webPageNode(path, title, description, crumbs)];
  if (crumbs) graph.push(breadcrumbNode(path, crumbs));
  if (needsBusiness) graph.push(localBusinessNode());
  graph.push(...extra);
  return { "@context": "https://schema.org", "@graph": graph };
}
