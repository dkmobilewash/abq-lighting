import { business } from "@/data/business";
import { posts } from "@/data/posts";
import { paths } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";

/** RSS 2.0 feed of blog posts (linked from every page's <head> for discovery). */
export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = posts
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${absoluteUrl(paths.post(p.slug))}</link>
      <guid isPermaLink="true">${absoluteUrl(paths.post(p.slug))}</guid>
      <pubDate>${new Date(`${p.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(p.description)}</description>
      <enclosure url="${absoluteUrl(p.image)}" type="image/jpeg" length="0" />
    </item>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(business.name)} Blog</title>
    <link>${absoluteUrl("/blog/")}</link>
    <atom:link href="${absoluteUrl("/blog/rss.xml")}" rel="self" type="application/rss+xml" />
    <description>Permanent outdoor lighting guides for Albuquerque homeowners and businesses.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date(`${posts[0].date}T12:00:00Z`).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
