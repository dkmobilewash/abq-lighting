import { cities, cityLabel } from "./cities";
import { neighborhoods } from "./neighborhoods";

/**
 * Contextual internal-link phrases. Body copy across the site is scanned for these
 * phrases and the first occurrence on a page becomes a link (see src/lib/linker.tsx).
 * Longer phrases win over shorter ones. Edit freely: add phrases, remove ones that read oddly.
 */
export type LinkPhrase = {
  /** Phrases to match (case-insensitive, whole words). */
  phrases: string[];
  href: string;
  /** Optional regex source appended to every phrase, e.g. a negative lookahead. */
  notFollowedBy?: string;
};

const serviceAndTopicPhrases: LinkPhrase[] = [
  { href: "/permanent-outdoor-lighting/", phrases: ["permanent outdoor lighting", "permanent lighting system", "permanent LED lighting"] },
  { href: "/roofline-lighting/", phrases: ["roofline lighting", "roofline lights", "eave lighting", "soffit lighting", "permanent track lighting"] },
  { href: "/parapet-and-flat-roof-lighting/", phrases: ["parapet lighting", "flat roof lighting", "flat-roof lighting", "flat roofs", "flat roof", "stucco parapets", "parapets", "parapet"] },
  { href: "/fence-and-wall-lighting/", phrases: ["fence lighting", "wall lighting", "block walls", "block wall", "coyote fences", "coyote fence", "courtyard walls", "CMU walls"] },
  { href: "/landscape-lighting/", phrases: ["landscape lighting", "xeriscape lighting", "xeriscaped yards", "xeriscape", "pathway lighting", "yard lighting"] },
  { href: "/patio-and-decorative-lighting/", phrases: ["patio lighting", "pergola lighting", "portals", "portal", "ramadas", "ramada", "pergolas", "pergola"] },
  { href: "/security-accent-lighting/", phrases: ["security lighting", "accent lighting", "dusk-to-dawn lighting"] },
  { href: "/permanent-holiday-lights/", phrases: ["permanent holiday lights", "holiday lighting", "holiday lights"] },
  { href: "/permanent-holiday-lights/christmas-lights/", phrases: ["permanent Christmas lights", "Christmas light installation", "Christmas lights", "Christmas lighting"] },
  { href: "/permanent-holiday-lights/balloon-fiesta-lights/", phrases: ["Balloon Fiesta"] },
  { href: "/permanent-holiday-lights/luminaria-and-farolito-season/", phrases: ["luminarias", "luminaria", "farolitos", "farolito"] },
  { href: "/permanent-holiday-lights/game-day-lights/", phrases: ["game day", "game nights", "Lobos"] },
  { href: "/permanent-holiday-lights/fourth-of-july-lights/", phrases: ["Fourth of July", "Independence Day"] },
  { href: "/permanent-holiday-lights/halloween-lights/", phrases: ["Halloween"] },
  { href: "/permanent-holiday-lights/thanksgiving-lights/", phrases: ["Thanksgiving"] },
  { href: "/permanent-holiday-lights/new-years-lights/", phrases: ["New Year's Eve", "New Year's"] },
  { href: "/permanent-holiday-lights/valentines-day-lights/", phrases: ["Valentine's Day", "Valentine's"] },
  { href: "/permanent-holiday-lights/st-patricks-day-lights/", phrases: ["St. Patrick's Day", "St. Patrick's"] },
  { href: "/permanent-holiday-lights/easter-lights/", phrases: ["Easter"] },
  { href: "/permanent-holiday-lights/cinco-de-mayo-lights/", phrases: ["Cinco de Mayo"] },
  { href: "/permanent-holiday-lights/diwali-lights/", phrases: ["Diwali"] },
  { href: "/permanent-holiday-lights/zia-red-and-yellow/", phrases: ["Statehood Day", "Zia"] },
  { href: "/hoa-and-community-lighting/", phrases: ["HOA approval", "homeowners associations", "homeowners association", "architectural review", "HOAs", "HOA"] },
  { href: "/commercial-permanent-lighting/", phrases: ["commercial lighting", "commercial properties", "building outline lighting", "storefronts", "storefront"] },
  { href: "/restaurant-and-retail-lighting/", phrases: ["restaurants", "restaurant", "retail shops", "retail"] },
  { href: "/car-dealership-lighting/", phrases: ["car dealerships", "dealerships", "dealership"] },
  { href: "/residential-permanent-lighting/", phrases: ["residential lighting", "residential permanent lighting"] },
  { href: "/smart-app/", phrases: ["smartphone app", "lighting app", "the app"] },
  { href: "/warranty/", phrases: ["local warranty", "our warranty", "warranty"] },
  { href: "/how-it-works/", phrases: ["free consultation", "design consultation"] },
  { href: "/get-a-quote/", phrases: ["free quote", "written quote"] },
];

/** City names → city pages. "Albuquerque" itself is deliberately not auto-linked (it appears everywhere). */
const cityAliases: Record<string, string[]> = {
  "los-ranchos-de-albuquerque": ["Los Ranchos de Albuquerque", "Los Ranchos"],
  "sandia-park-cedar-crest": ["Sandia Park", "Cedar Crest", "East Mountains"],
};

const cityPhrases: LinkPhrase[] = cities
  .filter((c) => c.slug !== "albuquerque")
  .map((c) => ({
    href: `/service-areas/${c.slug}/`,
    phrases: cityAliases[c.slug] ?? [cityLabel(c)],
    // "Bernalillo County" is the county, not the town of Bernalillo.
    notFollowedBy: c.slug === "bernalillo" ? "(?!\\s+County)" : undefined,
  }));

/** Neighborhood names → Albuquerque neighborhood pages (generic names like "Country Club" and "Uptown" need context). */
const neighborhoodAliases: Record<string, string[]> = {
  "downtown-huning-highlands": ["Huning Highlands"],
  "westside-ventana-ranch": ["Ventana Ranch"],
  "country-club": ["Country Club neighborhood"],
  uptown: ["Uptown Albuquerque", "Uptown"],
  "high-desert": ["High Desert neighborhood", "High Desert community"],
};

const neighborhoodPhrases: LinkPhrase[] = neighborhoods.map((n) => ({
  href: `/service-areas/albuquerque/${n.slug}/`,
  phrases: neighborhoodAliases[n.slug] ?? [n.name],
}));

export const linkPhrases: LinkPhrase[] = [...serviceAndTopicPhrases, ...cityPhrases, ...neighborhoodPhrases];
