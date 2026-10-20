import type { MetadataRoute } from "next";
import { allRoutes } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes()
    .filter((r) => !r.noindex)
    .map((r) => ({ url: absoluteUrl(r.path), changeFrequency: "monthly", priority: r.priority }));
}
