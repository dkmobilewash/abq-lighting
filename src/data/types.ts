/**
 * Shared content types. Every page on the site is rendered from objects that
 * match these shapes — add a city, service or holiday by adding data, not code.
 */

export type FAQ = { q: string; a: string };

/** Short titled blurb used for benefits, pain points, feature tiles, etc. */
export type Point = { title: string; body: string };

/** Icon names map to lucide-react icons in src/components/Icon.tsx. */
export type IconName =
  | "smartphone"
  | "palette"
  | "clock"
  | "sunset"
  | "layers"
  | "mic"
  | "sun"
  | "zap"
  | "shield"
  | "wrench"
  | "users"
  | "music"
  | "home"
  | "building"
  | "store"
  | "car"
  | "trees"
  | "fence"
  | "lamp"
  | "sparkles"
  | "lock"
  | "mountain"
  | "wind"
  | "cloud-rain"
  | "snowflake"
  | "calendar"
  | "map-pin"
  | "badge-check"
  | "ruler"
  | "hammer"
  | "phone"
  | "heart"
  | "flag"
  | "church";

export type ServiceSlug =
  | "roofline-lighting"
  | "parapet-and-flat-roof-lighting"
  | "fence-and-wall-lighting"
  | "landscape-lighting"
  | "patio-and-decorative-lighting"
  | "security-accent-lighting";

export type Service = {
  slug: ServiceSlug;
  /** Full display name, e.g. "Roofline Lighting". Used in H1: `[name] in Albuquerque, NM`. */
  name: string;
  /** Short nav label. */
  shortName: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  /** ≤ 155 chars. */
  metaDescription: string;
  /** One sentence under the H1. */
  heroSubhead: string;
  /** One generic sentence for service cards. */
  cardBlurb: string;
  icon: IconName;
  image: string;
  imageAlt: string;
  /** "What it is" — 2–3 paragraphs. */
  whatItIs: string[];
  /** 4–6 benefits. */
  benefits: Point[];
  /** "Where it goes" — 3–4 placements, each with a photo. */
  placements: (Point & { image: string; imageAlt: string })[];
  /** New Mexico durability — 2–3 paragraphs. */
  durability: string[];
  /** 5–6 FAQs (rendered with FAQPage schema). */
  faqs: FAQ[];
};

export type ApplicationSlug =
  | "residential-permanent-lighting"
  | "commercial-permanent-lighting"
  | "restaurant-and-retail-lighting"
  | "car-dealership-lighting"
  | "hoa-and-community-lighting";

export type Application = {
  slug: ApplicationSlug;
  name: string; // "Commercial Permanent Lighting"
  shortName: string; // "Commercial"
  /** Nav grouping: commercial sub-pages nest under commercial. */
  parent?: ApplicationSlug;
  primaryKeyword: string;
  metaDescription: string;
  /** H1 text (should contain "Albuquerque"). */
  h1: string;
  heroSubhead: string;
  cardBlurb: string;
  icon: IconName;
  image: string;
  imageAlt: string;
  intro: string[];
  /** Pain points this solves (lift rentals, yearly installs, brand colors...). 3–5. */
  painPoints: Point[];
  /** ROI / visibility angle — NO invented statistics. 3–5. */
  benefits: Point[];
  /** Short list of property types / use cases. */
  useCases: string[];
  faqs: FAQ[];
  /** CTA button label, e.g. "Schedule a Site Walk". */
  ctaLabel: string;
};

export type Swatch = { name: string; hex: string };

export type Holiday = {
  slug: string; // "christmas-lights"
  /** Occasion name, e.g. "Christmas". Used in "Permanent [name] Lights in Albuquerque". */
  name: string;
  /** Optional override for the full H1 when "Permanent X Lights" reads badly. */
  h1?: string;
  /** Nav label. */
  navLabel: string;
  /** Month(s) it typically runs, e.g. "December". */
  month: string;
  /** Sort order on the holiday calendar strip (1 = January). */
  monthIndex: number;
  primaryKeyword: string;
  metaDescription: string;
  heroSubhead: string;
  intro: string[];
  /** 1–3 named palettes rendered as real color chips. */
  palettes: { name: string; colors: Swatch[] }[];
  /** 3–5 pattern / scene ideas. */
  ideas: Point[];
  /** "Set it in [month] and forget it" scheduling tip paragraph. */
  schedulingTip: string;
  /** Optional extra long-form sections (e.g. Christmas: permanent vs. hang-and-remove). */
  sections?: { heading: string; paragraphs: string[] }[];
  faqs: FAQ[];
  /** 3 sibling holiday slugs to cross-link (Christmas is always linked automatically). */
  siblings: string[];
};

export type CitySlug =
  | "albuquerque"
  | "rio-rancho"
  | "corrales"
  | "los-ranchos-de-albuquerque"
  | "north-valley"
  | "bernalillo"
  | "placitas"
  | "sandia-park-cedar-crest"
  | "tijeras"
  | "edgewood"
  | "los-lunas"
  | "bosque-farms"
  | "belen"
  | "south-valley";

/** The five services shown as cards on city pages (security accent is linked elsewhere). */
export type CityCardService = Exclude<ServiceSlug, "security-accent-lighting">;

export type City = {
  slug: CitySlug;
  /** Short name used in headings, e.g. "Rio Rancho". */
  name: string;
  /** Long name if different (e.g. "Sandia Park & Cedar Crest"). */
  fullName?: string;
  county: string;
  /** VERIFY before launch. */
  zips: string[];
  geo: { lat: number; lng: number };
  /** Show in header "Service Areas" dropdown (top 8). */
  featured?: boolean;
  metaDescription: string;
  heroSubhead: string;
  /** §3 "Transform Your [City] Home..." — 2 paragraphs. */
  intro: string[];
  /** §4 "Permanent Lighting Built for [City] Homes" — 2–3 paragraphs: architecture + climate. */
  homes: string[];
  /** §5 "Areas We Serve Across [City]". */
  areas: {
    intro: string;
    /** 4–8 real neighborhoods / landmarks. neighborhoodSlug links to /service-areas/albuquerque/[slug]/. */
    places: { name: string; neighborhoodSlug?: string }[];
  };
  /** §6 "Lighting Made for the Way [City] Lives Outdoors" — 2–3 paragraphs. */
  lifestyle: string[];
  /** §7 "A Local [City] Installer You Can Count On" — 2 paragraphs. */
  localInstaller: string[];
  /** §13 one localized sentence per service card. */
  serviceBlurbs: Record<CityCardService, string>;
  /** §17 6–8 localized FAQs. */
  faqs: FAQ[];
  /** ≥ 3 nearby city slugs. */
  nearby: CitySlug[];
};

export type Neighborhood = {
  slug: string;
  name: string;
  /** VERIFY before launch. */
  zips: string[];
  metaDescription: string;
  heroSubhead: string;
  /** 2 paragraphs. */
  intro: string[];
  /** Homes / architecture / HOA — 2 paragraphs. */
  homes: string[];
  /** Outdoor life & scheduling ideas — 1–2 paragraphs. */
  lifestyle: string[];
  /** 3–6 real streets, parks, landmarks. */
  landmarks: string[];
  /** 2–4 other neighborhood slugs. */
  nearby: string[];
  /** 4–5 FAQs. */
  faqs: FAQ[];
};

export type CityServiceSlug =
  | "permanent-christmas-lights"
  | "roofline-lighting"
  | "landscape-lighting"
  | "commercial-lighting";

export type CityService = {
  city: CitySlug;
  service: CityServiceSlug;
  /** e.g. "Permanent Christmas Lights" — H1: `[name] in [City], NM`. */
  name: string;
  /** The parent service/holiday/application page path this matrix page supports. */
  parentPath: string;
  metaDescription: string;
  heroSubhead: string;
  intro: string[];
  /** 2–3 localized sections. */
  sections: { heading: string; paragraphs: string[] }[];
  /** 4–5 localized FAQs. */
  faqs: FAQ[];
};

export type Feature = Point & { icon: IconName };

export type ProjectCategory = "Residential" | "Commercial" | "Holiday" | "Landscape";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  city: CitySlug;
  /** Neighborhood or area label shown on the card. */
  area: string;
  description: string;
  image: string;
  imageAlt: string;
  /** true until replaced with a real completed job (renders a "Sample concept" badge). */
  placeholder: boolean;
};

export type Post = {
  slug: string;
  title: string;
  /** ≤ 155 chars. */
  description: string;
  /** ISO date. */
  date: string;
  readMinutes: number;
  image: string;
  imageAlt: string;
  relatedService: string; // path
  relatedCity: CitySlug;
};
