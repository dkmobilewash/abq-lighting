import type { MetadataRoute } from "next";
import { allRoutes } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";

/** XML sitemap with <lastmod> and image entries for every indexable page. */
export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes()
    .filter((r) => !r.noindex)
    .map((r) => ({
      url: absoluteUrl(r.path),
      lastModified: r.lastModified,
      changeFrequency: r.path.startsWith("/blog/") ? "monthly" : r.priority >= 0.8 ? "weekly" : "monthly",
      priority: r.priority,
      images: r.image ? [absoluteUrl(r.image)] : undefined,
    }));
}
