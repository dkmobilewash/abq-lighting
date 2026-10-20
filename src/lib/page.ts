import type { Metadata } from "next";
import { routeInfo } from "./routes";
import { buildMetadata } from "./seo";

/** Metadata for a registered route (title/description live in lib/routes.ts). */
export function metaFor(path: string, type: "website" | "article" = "website"): Metadata {
  const r = routeInfo(path);
  return buildMetadata({ title: r.title, description: r.description, path: r.path, noindex: r.noindex, type });
}
