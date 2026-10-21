import type { City, CityService } from "./types";

/**
 * Primary (hero) image per page. Shared by the templates, the image sitemap and the
 * schema's primaryImageOfPage so every system agrees on each page's main image.
 */
export const defaultHero = { src: "/images/hero-albuquerque-stucco-home-night.jpg", alt: "Albuquerque stucco home with permanent warm white roofline lighting at night" };

export const cityHeroImages: Partial<Record<City["slug"], { src: string; alt: string }>> = {
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

export const cityServiceImages: Record<CityService["service"], { src: string; alt: (city: string) => string }> = {
  "permanent-christmas-lights": { src: "/images/placeholders/christmas-roofline-colors.jpg", alt: (c) => `${c} home with permanent Christmas lights in red, green and white` },
  "roofline-lighting": { src: "/images/placeholders/roofline-stucco-home-night.jpg", alt: (c) => `Stucco home in ${c} with permanent roofline lighting` },
  "landscape-lighting": { src: "/images/placeholders/landscape-xeriscape-lights.jpg", alt: (c) => `Xeriscaped yard in ${c} with landscape lighting at night` },
  "commercial-lighting": { src: "/images/placeholders/commercial-storefront-night.jpg", alt: (c) => `${c} storefront with permanent commercial outline lighting` },
};

const holidayImageNames: Record<string, string> = {
  "christmas-lights": "christmas-roofline-colors",
  "halloween-lights": "holiday-orange-purple",
  "thanksgiving-lights": "holiday-orange-purple",
  "luminaria-and-farolito-season": "luminaria-amber-glow",
  "balloon-fiesta-lights": "balloon-fiesta-colors",
  "game-day-lights": "game-day-red-silver",
  "diwali-lights": "luminaria-amber-glow",
};

export function holidayImage(slug: string): string {
  return `/images/placeholders/${holidayImageNames[slug] ?? "christmas-roofline-colors"}.jpg`;
}
