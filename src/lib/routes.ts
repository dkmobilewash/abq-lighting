import { applications } from "@/data/applications";
import { business } from "@/data/business";
import { cities, cityLabel, getCity } from "@/data/cities";
import { cityServices } from "@/data/cityServices";
import { holidays } from "@/data/holidays";
import { neighborhoods } from "@/data/neighborhoods";
import { pillar } from "@/data/pillar";
import { posts } from "@/data/posts";
import { services } from "@/data/services";
import type { City, CityService, Holiday, Neighborhood, Service } from "@/data/types";
import { titleWithBrand } from "./seo";

/**
 * Central route registry: every indexable page with its title + description.
 * Feeds page metadata, the sitemap, OG image generation and QA scripts.
 */
export type RouteInfo = {
  path: string;
  title: string;
  description: string;
  priority: number;
  noindex?: boolean;
};

export const holidayHubPath = "/permanent-holiday-lights/";

export const paths = {
  service: (s: Pick<Service, "slug">) => `/${s.slug}/`,
  application: (slug: string) => `/${slug}/`,
  holiday: (h: Pick<Holiday, "slug">) => `${holidayHubPath}${h.slug}/`,
  city: (slug: string) => `/service-areas/${slug}/`,
  neighborhood: (slug: string) => `/service-areas/albuquerque/${slug}/`,
  cityService: (cs: Pick<CityService, "city" | "service">) => `/service-areas/${cs.city}/${cs.service}/`,
  post: (slug: string) => `/blog/${slug}/`,
};

export const titles = {
  home: () => titleWithBrand("Permanent Outdoor Lighting Albuquerque, NM", business.name),
  city: (c: City) => titleWithBrand(`Permanent Outdoor Lighting in ${cityLabel(c)}, NM`),
  neighborhood: (n: Neighborhood) => titleWithBrand(`Permanent Lighting in ${n.name}, Albuquerque`),
  service: (s: Pick<Service, "name">) => titleWithBrand(`${s.name} in Albuquerque, NM`),
  holiday: (h: Holiday) => titleWithBrand(h.h1 ? h.h1.replace(/ in Albuquerque$/, " Albuquerque") : `Permanent ${h.name} Lights Albuquerque`),
  cityService: (cs: CityService) => titleWithBrand(`${cs.name} in ${cityLabel(getCity(cs.city)!)}, NM`),
};

const staticRoutes: RouteInfo[] = [
  {
    path: "/",
    title: titles.home(),
    description:
      "Permanent, app-controlled LED roofline lighting for Albuquerque homes and businesses. Warm white every night, colors for every holiday. Get a free quote today.",
    priority: 1,
  },
  {
    path: "/permanent-outdoor-lighting/",
    title: titleWithBrand("What Is Permanent Outdoor Lighting? Cost & How It Works"),
    description: pillar.metaDescription,
    priority: 0.9,
  },
  {
    path: "/get-a-quote/",
    title: titleWithBrand("Get a Free Permanent Lighting Quote"),
    description:
      "Request a free, no-pressure permanent lighting design and quote for your Albuquerque-area home or business. A local designer will follow up quickly.",
    priority: 0.8,
  },
  {
    path: "/project-showcase/",
    title: titleWithBrand("Permanent Lighting Projects in Albuquerque"),
    description:
      "Browse residential, commercial, holiday and landscape permanent lighting ideas from across the Albuquerque metro. Get a free quote today.",
    priority: 0.7,
  },
  {
    path: "/why-us/",
    title: titleWithBrand("Why Choose Our Albuquerque Lighting Crew"),
    description:
      "A local Albuquerque installer that designs for stucco, parapets and high-desert weather, backed by a local warranty. See why neighbors choose us.",
    priority: 0.7,
  },
  {
    path: "/how-it-works/",
    title: titleWithBrand("How Permanent Lighting Installation Works"),
    description:
      "Free consultation, custom design, a typical one-day install and full app setup. See how permanent lighting goes up on your Albuquerque home.",
    priority: 0.7,
  },
  {
    path: "/smart-app/",
    title: titleWithBrand("Smart Lighting App & Controls"),
    description:
      "Control colors, schedules, zones and effects from your phone. See what the permanent lighting app can do for your Albuquerque home.",
    priority: 0.6,
  },
  {
    path: "/warranty/",
    title: titleWithBrand("Permanent Lighting Warranty"),
    description:
      "What our permanent lighting warranty covers, how service works and how to reach our local Albuquerque crew if anything needs attention.",
    priority: 0.5,
  },
  {
    path: "/faqs/",
    title: titleWithBrand("Permanent Lighting FAQs"),
    description:
      "Answers about permanent outdoor lighting in Albuquerque: cost factors, installation, the app, HOAs, durability in New Mexico weather and warranty.",
    priority: 0.7,
  },
  {
    path: "/blog/",
    title: titleWithBrand("Permanent Lighting Blog"),
    description:
      "Guides and ideas for permanent outdoor lighting in Albuquerque: costs, flat roofs, HOAs, New Mexico weather and holiday lighting ideas.",
    priority: 0.6,
  },
  {
    path: "/contact-us/",
    title: titleWithBrand("Contact Us"),
    description:
      "Call, email or send a message to Albuquerque Permanent Lighting Co. We serve Albuquerque, Rio Rancho and the Middle Rio Grande Valley.",
    priority: 0.6,
  },
  {
    path: "/service-areas/",
    title: titleWithBrand("Service Areas: Albuquerque Metro & Beyond"),
    description:
      "Permanent lighting installation across Albuquerque, Rio Rancho, Corrales, the East Mountains and Valencia County. Find your city and get a free quote.",
    priority: 0.8,
  },
  {
    path: holidayHubPath,
    title: titleWithBrand("Permanent Holiday Lights Albuquerque"),
    description:
      "One permanent system for every holiday: Christmas, Halloween, Balloon Fiesta, luminaria season, game day and more. Get a free quote today.",
    priority: 0.8,
  },
  {
    path: "/privacy-policy/",
    title: titleWithBrand("Privacy Policy"),
    description: "How Albuquerque Permanent Lighting Co. collects, uses and protects information submitted through this website.",
    priority: 0.2,
  },
  {
    path: "/terms-and-conditions/",
    title: titleWithBrand("Terms and Conditions"),
    description: "Terms and conditions for using the Albuquerque Permanent Lighting Co. website and quote request forms.",
    priority: 0.2,
  },
  {
    path: "/thank-you/",
    title: titleWithBrand("Thank You"),
    description: "Thanks for your quote request. A member of our Albuquerque team will be in touch soon.",
    priority: 0,
    noindex: true,
  },
];

export function allRoutes(): RouteInfo[] {
  return [
    ...staticRoutes,
    ...services.map((s) => ({ path: paths.service(s), title: titles.service(s), description: s.metaDescription, priority: 0.9 })),
    ...applications.map((a) => ({ path: paths.application(a.slug), title: titleWithBrand(a.name.includes("Albuquerque") ? a.name : `${a.name} Albuquerque`), description: a.metaDescription, priority: 0.8 })),
    ...holidays.map((h) => ({ path: paths.holiday(h), title: titles.holiday(h), description: h.metaDescription, priority: h.slug === "christmas-lights" ? 0.9 : 0.7 })),
    ...cities.map((c) => ({ path: paths.city(c.slug), title: titles.city(c), description: c.metaDescription, priority: c.slug === "albuquerque" ? 0.9 : 0.8 })),
    ...neighborhoods.map((n) => ({ path: paths.neighborhood(n.slug), title: titles.neighborhood(n), description: n.metaDescription, priority: 0.7 })),
    ...cityServices.map((cs) => ({ path: paths.cityService(cs), title: titles.cityService(cs), description: cs.metaDescription, priority: 0.8 })),
    ...posts.map((p) => ({ path: paths.post(p.slug), title: titleWithBrand(p.title), description: p.description, priority: 0.6 })),
  ];
}

export function routeInfo(path: string): RouteInfo {
  const r = allRoutes().find((x) => x.path === path);
  if (!r) throw new Error(`No route registered for ${path}`);
  return r;
}
