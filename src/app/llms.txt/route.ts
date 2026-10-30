import { applications } from "@/data/applications";
import { business, hoursDisplay } from "@/data/business";
import { cities, cityLabel } from "@/data/cities";
import { cityServices } from "@/data/cityServices";
import { holidays } from "@/data/holidays";
import { neighborhoods } from "@/data/neighborhoods";
import { posts } from "@/data/posts";
import { services } from "@/data/services";
import { paths } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";

/**
 * /llms.txt: a plain-markdown summary of the business and its key pages for AI assistants
 * and answer engines (see llmstxt.org). Generated from the same data as the site.
 */
export const dynamic = "force-static";

export function GET() {
  const link = (label: string, path: string, note?: string) => `- [${label}](${absoluteUrl(path)})${note ? `: ${note}` : ""}`;
  const body = `# ${business.name}

> Local installer of permanent, app-controlled LED roofline and outdoor lighting in ${business.city}, New Mexico. Warm white for everyday curb appeal and any color for holidays, controlled from a phone app. Serving Albuquerque, Rio Rancho and the Middle Rio Grande Valley.

- Phone: ${business.phone}
- Email: ${business.email}
- Address: ${business.street}, ${business.city}, ${business.state} ${business.zip}
- Hours: ${hoursDisplay}
- Free quotes: ${absoluteUrl("/get-a-quote/")}

## Services
${services.map((s) => link(s.name, paths.service(s), s.cardBlurb)).join("\n")}
${link("What is permanent outdoor lighting?", "/permanent-outdoor-lighting/", "how it works, cost factors, permanent vs. traditional Christmas lights")}

## Applications
${applications.map((a) => link(a.name, paths.application(a.slug), a.cardBlurb)).join("\n")}

## Holiday lighting
${holidays.map((h) => link(`${h.navLabel} lights`, paths.holiday(h))).join("\n")}

## Service areas
${cities.map((c) => link(`${cityLabel(c)}, NM`, paths.city(c.slug), `${c.county} County`)).join("\n")}

## Albuquerque neighborhoods
${neighborhoods.map((n) => link(n.name, paths.neighborhood(n.slug))).join("\n")}

## Local service pages
${cityServices.map((cs) => link(`${cs.name} in ${cityLabel(cities.find((c) => c.slug === cs.city)!)}`, paths.cityService(cs))).join("\n")}

## Guides
${posts.map((p) => link(p.title, paths.post(p.slug), p.description)).join("\n")}

## Optional
${link("FAQs", "/faqs/")}
${link("How it works", "/how-it-works/")}
${link("Warranty", "/warranty/")}
${link("Contact", "/contact-us/")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
