import { applications } from "@/data/applications";
import { business, fullAddress, sameAs, siteUrl } from "@/data/business";
import { cities, cityLabel } from "@/data/cities";
import { holidays } from "@/data/holidays";
import { services } from "@/data/services";
import type { City, FAQ } from "@/data/types";
import { allRoutes } from "./routes";
import { absoluteUrl } from "./seo";

/**
 * JSON-LD graph builders. Every page renders WebSite + Organization + WebPage
 * (+ BreadcrumbList on inner pages); templates add LocalBusiness, Service, Place,
 * FAQPage, ItemList, HowTo, ImageGallery or BlogPosting nodes as needed.
 * Nodes reference each other by @id so search engines see one connected entity.
 * No AggregateRating/Review markup until real reviews exist.
 */

const ids = {
  website: `${siteUrl}/#website`,
  organization: `${siteUrl}/#organization`,
  localBusiness: `${siteUrl}/#localbusiness`,
  logo: `${siteUrl}/#logo`,
  catalog: `${siteUrl}/#offer-catalog`,
};

export type Crumb = { name: string; path: string };
type Node = Record<string, unknown>;

const isPlaceholder = (v: string) => /^\[.*\]$/.test(v.trim());
/** Only emit a property when the business has filled in a real value. */
const real = (key: string, v: string) => (isPlaceholder(v) || !v ? {} : { [key]: v });

export function websiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: `${siteUrl}/`,
    name: business.name,
    alternateName: business.shortName,
    description: "Permanent, app-controlled LED roofline and outdoor lighting for Albuquerque, Rio Rancho and the Middle Rio Grande Valley.",
    publisher: { "@id": ids.organization },
    inLanguage: "en-US",
  };
}

const logoNode = { "@type": "ImageObject", "@id": ids.logo, url: absoluteUrl("/logo.png"), contentUrl: absoluteUrl("/logo.png"), width: 512, height: 512, caption: business.name };

const contactPoint = {
  "@type": "ContactPoint",
  contactType: "customer service",
  telephone: business.phone,
  email: business.email,
  areaServed: "US-NM",
  availableLanguage: ["English"],
};

const knowsAbout = [
  "Permanent outdoor lighting",
  "Permanent Christmas lights",
  "Roofline lighting",
  "Parapet and flat roof lighting",
  "Landscape lighting",
  "Holiday lighting installation",
  "Commercial building outline lighting",
  "Smart LED lighting",
];

export function organizationNode(): Node {
  return {
    "@type": "Organization",
    "@id": ids.organization,
    name: business.name,
    alternateName: business.shortName,
    url: `${siteUrl}/`,
    logo: logoNode,
    image: { "@id": ids.logo },
    ...real("email", business.email),
    ...real("telephone", business.phone),
    contactPoint,
    knowsAbout,
    areaServed: { "@type": "State", name: "New Mexico" },
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

/** Everything we sell, as an OfferCatalog (no prices, which we never publish). */
function offerCatalog(): Node {
  const offer = (name: string, path: string, description: string) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name, url: absoluteUrl(path), description, provider: { "@id": ids.localBusiness } },
  });
  return {
    "@type": "OfferCatalog",
    "@id": ids.catalog,
    name: "Permanent Lighting Services",
    itemListElement: [
      { "@type": "OfferCatalog", name: "Lighting Services", itemListElement: services.map((s) => offer(s.name, `/${s.slug}/`, s.cardBlurb)) },
      { "@type": "OfferCatalog", name: "Applications", itemListElement: applications.map((a) => offer(a.name, `/${a.slug}/`, a.cardBlurb)) },
      {
        "@type": "OfferCatalog",
        name: "Holiday Lighting",
        itemListElement: [
          offer(
            "Permanent Holiday Lighting",
            "/permanent-holiday-lights/",
            `Permanent, app-controlled lights for ${holidays.length} holidays and occasions, from Christmas and luminaria season to Balloon Fiesta and game day.`,
          ),
        ],
      },
    ],
  };
}

/**
 * LocalBusiness entity. `catalog` adds the full OfferCatalog (every service/application/holiday);
 * it's included on the entity's main pages (home, contact, hubs, city pages) and omitted elsewhere
 * to keep pages light. All pages share the same @id, so search engines merge them into one entity.
 */
export function localBusinessNode({ catalog = false }: { catalog?: boolean } = {}): Node {
  const mapQuery = isPlaceholder(business.street) ? `${business.name}, ${business.city}, ${business.state}` : fullAddress;
  return {
    "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
    "@id": ids.localBusiness,
    name: business.name,
    alternateName: business.shortName,
    description:
      "Local Albuquerque installer of permanent, app-controlled LED roofline, parapet, wall, landscape and holiday lighting for homes, businesses and HOA communities.",
    url: `${siteUrl}/`,
    logo: { "@id": ids.logo },
    image: [absoluteUrl("/images/hero-albuquerque-stucco-home-night.jpg"), absoluteUrl("/logo.png")],
    ...real("telephone", business.phone),
    ...real("email", business.email),
    priceRange: "$$",
    currenciesAccepted: "USD",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.street,
      addressLocality: business.city,
      addressRegion: business.state,
      postalCode: business.zip,
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`,
    openingHours: business.hours,
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: days, opens: open, closes: close }],
    areaServed: [
      ...areaServedNodes(),
      {
        "@type": "GeoCircle",
        geoMidpoint: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng },
        geoRadius: 80000, // meters: Belen to Placitas and the East Mountains
      },
    ],
    contactPoint,
    knowsAbout,
    ...(catalog ? { hasOfferCatalog: offerCatalog() } : {}),
    ...(isPlaceholder(business.licenseNumber)
      ? {}
      : {
          hasCredential: {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "license",
            name: "New Mexico Contractor License",
            identifier: business.licenseNumber,
            recognizedBy: { "@type": "GovernmentOrganization", name: "New Mexico Regulation & Licensing Department" },
          },
        }),
    parentOrganization: { "@id": ids.organization },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function cityNode(c: City): Node {
  return {
    "@type": "City",
    "@id": `${absoluteUrl(`/service-areas/${c.slug}/`)}#place`,
    name: `${cityLabel(c)}, NM`,
    geo: { "@type": "GeoCoordinates", latitude: c.geo.lat, longitude: c.geo.lng },
    containedInPlace: { "@type": "AdministrativeArea", name: `${c.county} County, New Mexico` },
  };
}

export function areaServedNodes(): Node[] {
  return cities.map((c) => ({
    "@type": "City",
    name: `${cityLabel(c)}, NM`,
    containedInPlace: { "@type": "AdministrativeArea", name: `${c.county} County, New Mexico` },
  }));
}

/** A named place (neighborhood) with optional coordinates, used as Service.areaServed / contentLocation. */
export function placeNode(name: string, path: string, geo?: { lat: number; lng: number }): Node {
  return {
    "@type": "Place",
    "@id": `${absoluteUrl(path)}#place`,
    name,
    ...(geo ? { geo: { "@type": "GeoCoordinates", latitude: geo.lat, longitude: geo.lng } } : {}),
    containedInPlace: { "@type": "City", name: "Albuquerque, NM" },
  };
}

export type PageType = "WebPage" | "CollectionPage" | "ContactPage" | "AboutPage" | "FAQPage" | "ItemPage";

export function webPageNode(opts: {
  path: string;
  title: string;
  description: string;
  crumbs?: Crumb[];
  pageType?: PageType;
  /** @id of the page's main entity (Service, Article, ...). */
  mainEntity?: string;
  /** @id of a Place node this page is about. */
  place?: string;
}): Node {
  const url = absoluteUrl(opts.path);
  const route = allRoutes().find((r) => r.path === opts.path);
  const image = route?.image;
  return {
    "@type": opts.pageType ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.title,
    description: opts.description,
    isPartOf: { "@id": ids.website },
    about: { "@id": ids.organization },
    publisher: { "@id": ids.organization },
    inLanguage: "en-US",
    ...(route?.lastModified ? { dateModified: route.lastModified } : {}),
    ...(image
      ? { primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(image), contentLocation: { "@type": "Place", name: "Albuquerque, New Mexico" } } }
      : {}),
    ...(opts.mainEntity ? { mainEntity: { "@id": opts.mainEntity } } : {}),
    ...(opts.place ? { contentLocation: { "@id": opts.place }, spatialCoverage: { "@id": opts.place } } : {}),
    ...(opts.crumbs ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
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

export function serviceNode(opts: {
  path: string;
  name: string;
  description: string;
  serviceType: string;
  /** Plain city/area name, or a Place/City @id. */
  area?: string;
  areaId?: string;
  image?: string;
  category?: string;
}): Node {
  const route = allRoutes().find((r) => r.path === opts.path);
  const image = opts.image ?? route?.image;
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(opts.path)}#service`,
    name: opts.name,
    serviceType: opts.serviceType,
    category: opts.category ?? "Permanent outdoor lighting",
    description: opts.description,
    url: absoluteUrl(opts.path),
    ...(image ? { image: absoluteUrl(image) } : {}),
    provider: { "@id": ids.localBusiness },
    brand: { "@id": ids.organization },
    providerMobility: "dynamic",
    areaServed: opts.areaId ? { "@id": opts.areaId } : opts.area ? { "@type": "City", name: opts.area } : areaServedNodes(),
    termsOfService: absoluteUrl("/warranty/"),
    potentialAction: { "@type": "Action", name: "Request a free quote", target: absoluteUrl("/get-a-quote/") },
  };
}

export function faqNode(path: string, faqs: FAQ[]): Node {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    isPartOf: { "@id": `${absoluteUrl(path)}#webpage` },
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function itemListNode(path: string, name: string, items: { name: string; path: string }[]): Node {
  return {
    "@type": "ItemList",
    "@id": `${absoluteUrl(path)}#itemlist`,
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: absoluteUrl(it.path) })),
  };
}

export function howToNode(path: string, name: string, steps: { title: string; body: string }[]): Node {
  return {
    "@type": "HowTo",
    "@id": `${absoluteUrl(path)}#howto`,
    name,
    description: "How a permanent lighting system is designed, installed and set up on an Albuquerque home.",
    step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.body, url: `${absoluteUrl(path)}#step-${i + 1}` })),
  };
}

export function imageGalleryNode(path: string, name: string, images: { url: string; caption: string; location: string }[]): Node {
  return {
    "@type": "ImageGallery",
    "@id": `${absoluteUrl(path)}#gallery`,
    name,
    associatedMedia: images.map((im) => ({
      "@type": "ImageObject",
      contentUrl: absoluteUrl(im.url),
      caption: im.caption,
      contentLocation: { "@type": "Place", name: im.location },
    })),
  };
}

export function articleNode(opts: {
  path: string;
  title: string;
  description: string;
  date: string;
  image: string;
  wordCount?: number;
  /** Paths of the service/city pages the article is about. */
  about?: { name: string; path: string }[];
}): Node {
  return {
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(opts.path)}#article`,
    headline: opts.title,
    description: opts.description,
    datePublished: opts.date,
    dateModified: opts.date,
    image: absoluteUrl(opts.image),
    ...(opts.wordCount ? { wordCount: opts.wordCount } : {}),
    articleSection: "Permanent Lighting",
    inLanguage: "en-US",
    isPartOf: { "@id": `${absoluteUrl(opts.path)}#webpage` },
    mainEntityOfPage: { "@id": `${absoluteUrl(opts.path)}#webpage` },
    author: { "@id": ids.organization },
    publisher: { "@id": ids.organization },
    contentLocation: { "@type": "Place", name: "Albuquerque, New Mexico" },
    ...(opts.about?.length ? { about: opts.about.map((a) => ({ "@type": "Thing", name: a.name, url: absoluteUrl(a.path) })) } : {}),
  };
}

/** Main navigation as SiteNavigationElement (homepage only). */
export function siteNavigationNode(links: { name: string; path: string }[]): Node {
  return {
    "@type": "ItemList",
    "@id": `${siteUrl}/#navigation`,
    name: "Main navigation",
    itemListElement: links.map((l, i) => ({ "@type": "SiteNavigationElement", position: i + 1, name: l.name, url: absoluteUrl(l.path) })),
  };
}

type GraphInput = {
  path: string;
  title: string;
  description: string;
  crumbs?: Crumb[];
  localBusiness?: boolean;
  /** Include the full OfferCatalog on the LocalBusiness node. */
  catalog?: boolean;
  pageType?: PageType;
  mainEntity?: string;
  place?: string;
  extra?: Node[];
};

/** Build the full @graph for a page. Adds the LocalBusiness node whenever another node references it. */
export function pageGraph({ path, title, description, crumbs, localBusiness, catalog, pageType, mainEntity, place, extra = [] }: GraphInput) {
  const needsBusiness = localBusiness || extra.some((n) => n["@type"] === "Service");
  const graph: Node[] = [websiteNode(), organizationNode(), webPageNode({ path, title, description, crumbs, pageType, mainEntity, place })];
  if (crumbs) graph.push(breadcrumbNode(path, crumbs));
  if (needsBusiness) graph.push(localBusinessNode({ catalog }));
  graph.push(...extra);
  return { "@context": "https://schema.org", "@graph": graph };
}
