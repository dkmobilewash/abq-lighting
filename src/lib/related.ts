import { applications } from "@/data/applications";
import { cities, cityLabel, getCity } from "@/data/cities";
import { cityServices } from "@/data/cityServices";
import { holidays } from "@/data/holidays";
import { neighborhoods } from "@/data/neighborhoods";
import { posts } from "@/data/posts";
import { services } from "@/data/services";
import type { CitySlug, CityServiceSlug, Post } from "@/data/types";
import { paths } from "./routes";

/**
 * Relationship helpers that drive the cross-linking blocks on every template.
 * All anchors are descriptive (keyword + place) rather than "click here".
 */

export type LinkItem = { href: string; label: string };
export type LinkGroup = { heading: string; links: LinkItem[] };

/** Generic service/holiday/application page → the city×service page it maps to. */
const matrixParent: Record<CityServiceSlug, string> = {
  "permanent-christmas-lights": "/permanent-holiday-lights/christmas-lights/",
  "roofline-lighting": "/roofline-lighting/",
  "landscape-lighting": "/landscape-lighting/",
  "commercial-lighting": "/commercial-permanent-lighting/",
};

/** Linker overrides so in-copy links on a city's pages point at its local city×service pages. */
export function localOverrides(city: CitySlug): Record<string, string> {
  return Object.fromEntries(
    cityServices.filter((cs) => cs.city === city).map((cs) => [matrixParent[cs.service], paths.cityService(cs)]),
  );
}

export function matrixFor(city: CitySlug) {
  return cityServices.filter((cs) => cs.city === city);
}

const cityName = (slug: CitySlug) => cityLabel(getCity(slug)!);

/** Keyword-rich "popular services" anchors for a city (local page when one exists, otherwise the service page). */
export function popularServiceLinks(city: CitySlug): LinkItem[] {
  const name = cityName(city);
  const local = (s: CityServiceSlug) => cityServices.find((cs) => cs.city === city && cs.service === s);
  const href = (s: CityServiceSlug, fallback: string) => {
    const cs = local(s);
    return cs ? paths.cityService(cs) : fallback;
  };
  return [
    { href: href("permanent-christmas-lights", "/permanent-holiday-lights/christmas-lights/"), label: `Permanent Christmas lights in ${name}` },
    { href: href("roofline-lighting", "/roofline-lighting/"), label: `Roofline lighting in ${name}` },
    { href: "/parapet-and-flat-roof-lighting/", label: `Parapet & flat roof lighting for ${name} homes` },
    { href: href("landscape-lighting", "/landscape-lighting/"), label: `Landscape lighting in ${name}` },
    { href: "/fence-and-wall-lighting/", label: `Fence & block wall lighting in ${name}` },
    { href: "/patio-and-decorative-lighting/", label: `Patio, portal & ramada lighting in ${name}` },
    { href: "/security-accent-lighting/", label: `Security & accent lighting in ${name}` },
    { href: href("commercial-lighting", "/commercial-permanent-lighting/"), label: `Commercial permanent lighting in ${name}` },
    { href: "/permanent-holiday-lights/", label: `Holiday light installation in ${name}` },
  ];
}

/** Occasions that matter most locally; used on location pages. */
const localHolidaySlugs = [
  "christmas-lights",
  "luminaria-and-farolito-season",
  "balloon-fiesta-lights",
  "game-day-lights",
  "fourth-of-july-lights",
  "halloween-lights",
  "zia-red-and-yellow",
];

export function localHolidayLinks(): LinkItem[] {
  return localHolidaySlugs
    .map((s) => holidays.find((h) => h.slug === s))
    .filter((h): h is NonNullable<typeof h> => Boolean(h))
    .map((h) => ({ href: paths.holiday(h), label: h.slug === "christmas-lights" ? "Permanent Christmas lights" : `${h.navLabel} lighting` }));
}

/** Posts most relevant to a page: same service path first, then same city, then newest. */
export function relatedPosts(opts: { service?: string; city?: CitySlug; exclude?: string; limit?: number }): Post[] {
  const { service, city, exclude, limit = 3 } = opts;
  const score = (p: Post) => (service && p.relatedService === service ? 2 : 0) + (city && p.relatedCity === city ? 1 : 0);
  return posts
    .filter((p) => p.slug !== exclude)
    .map((p, i) => ({ p, s: score(p), i }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .slice(0, limit)
    .map((x) => x.p);
}

export const postLinks = (list: Post[]): LinkItem[] => list.map((p) => ({ href: paths.post(p.slug), label: p.title }));

export function serviceLinks(exclude?: string): LinkItem[] {
  return services.filter((s) => paths.service(s) !== exclude).map((s) => ({ href: paths.service(s), label: `${s.name} in Albuquerque` }));
}

export function applicationLinks(exclude?: string): LinkItem[] {
  return applications.filter((a) => paths.application(a.slug) !== exclude).map((a) => ({ href: paths.application(a.slug), label: a.name }));
}

export function cityLinks(opts: { exclude?: CitySlug; only?: CitySlug[]; suffix?: string } = {}): LinkItem[] {
  const list = opts.only ? opts.only.map((s) => getCity(s)!).filter(Boolean) : cities.filter((c) => c.slug !== opts.exclude);
  return list.map((c) => ({ href: paths.city(c.slug), label: `${opts.suffix ?? "Permanent lighting in"} ${cityLabel(c)}` }));
}

export function neighborhoodLinks(opts: { exclude?: string; only?: string[] } = {}): LinkItem[] {
  const list = opts.only ? opts.only.map((s) => neighborhoods.find((n) => n.slug === s)!).filter(Boolean) : neighborhoods.filter((n) => n.slug !== opts.exclude);
  return list.map((n) => ({ href: paths.neighborhood(n.slug), label: `${n.name} permanent lighting` }));
}

/** Services most relevant to an occasion (holiday pages). */
export function holidayServiceLinks(): LinkItem[] {
  return [
    { href: "/roofline-lighting/", label: "Roofline lighting for holiday displays" },
    { href: "/parapet-and-flat-roof-lighting/", label: "Holiday lights on flat roofs & parapets" },
    { href: "/fence-and-wall-lighting/", label: "Holiday lighting on walls & fences" },
    { href: "/patio-and-decorative-lighting/", label: "Patio & portal party lighting" },
    { href: "/permanent-outdoor-lighting/", label: "How permanent lighting works" },
  ];
}

/** Top cities for holiday/service/application pages. */
export const topCityOrder: CitySlug[] = ["albuquerque", "rio-rancho", "corrales", "los-ranchos-de-albuquerque", "sandia-park-cedar-crest", "los-lunas", "south-valley", "north-valley", "bernalillo", "placitas"];
