import type { City, CitySlug } from "./types";
import { citiesA } from "./cities-a";
import { citiesB } from "./cities-b";

/** All service-area cities. Copy lives in cities-a.ts / cities-b.ts. ZIPs: VERIFY before launch. */
export const cities: City[] = [...citiesA, ...citiesB];

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export function cityLabel(c: City): string {
  return c.fullName ?? c.name;
}

export const citySlugs = cities.map((c) => c.slug) as CitySlug[];
