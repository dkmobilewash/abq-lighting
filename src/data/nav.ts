import { applications } from "./applications";
import { cities, cityLabel } from "./cities";
import { holidays } from "./holidays";
import { services } from "./services";

export type NavLink = { label: string; href: string; children?: NavLink[] };
export type NavGroup = { label: string; href: string; links: NavLink[] };

const app = (slug: string) => applications.find((a) => a.slug === slug)!;
const appLink = (slug: string): NavLink => ({ label: app(slug).shortName, href: `/${slug}/` });

const holidaysSorted = [...holidays].sort((a, b) => (a.slug === "christmas-lights" ? -1 : b.slug === "christmas-lights" ? 1 : a.monthIndex - b.monthIndex));

export const mainNav: NavGroup[] = [
  {
    label: "Lighting",
    href: "/permanent-outdoor-lighting/",
    links: [
      { label: "What Is Permanent Lighting?", href: "/permanent-outdoor-lighting/" },
      ...services.map((s) => ({ label: s.name, href: `/${s.slug}/` })),
    ],
  },
  {
    label: "Applications",
    href: "/residential-permanent-lighting/",
    links: [
      appLink("residential-permanent-lighting"),
      { ...appLink("commercial-permanent-lighting"), children: [appLink("restaurant-and-retail-lighting"), appLink("car-dealership-lighting")] },
      appLink("hoa-and-community-lighting"),
    ],
  },
  {
    label: "Holiday Lights",
    href: "/permanent-holiday-lights/",
    links: [{ label: "All Holiday Lighting", href: "/permanent-holiday-lights/" }, ...holidaysSorted.map((h) => ({ label: h.navLabel, href: `/permanent-holiday-lights/${h.slug}/` }))],
  },
  {
    label: "Service Areas",
    href: "/service-areas/",
    links: [
      ...[...cities.filter((c) => c.featured), ...cities.filter((c) => !c.featured)].slice(0, 8).map((c) => ({ label: cityLabel(c), href: `/service-areas/${c.slug}/` })),
      { label: "All Service Areas", href: "/service-areas/" },
    ],
  },
];

export const simpleNav: NavLink[] = [
  { label: "Projects", href: "/project-showcase/" },
  { label: "Why Us", href: "/why-us/" },
];

export const holidaysOrdered = holidaysSorted;
