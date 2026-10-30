import type { Metadata } from "next";
import { business, siteUrl } from "@/data/business";

export const absoluteUrl = (path: string) => `${siteUrl}${path}`;

/** Turn a site path into the OG image key served by /og/[key]/. */
export function ogKey(path: string): string {
  const trimmed = path.replace(/^\/|\/$/g, "");
  return trimmed ? trimmed.replace(/\//g, "--") : "home";
}

export function ogImagePath(path: string): string {
  return `/og/${ogKey(path)}/`;
}

/** Truncate on a word boundary so titles/descriptions stay inside SERP limits. */
export function clamp(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

/**
 * Title pattern: `[base] | [brand]`. If that exceeds 60 chars, keep the keyword-rich
 * base on its own (Google shows the site name separately) so nothing gets truncated.
 */
export function titleWithBrand(base: string, brand = business.shortName): string {
  const full = `${base} | ${brand}`;
  if (full.length <= 60) return full;
  return clamp(base, 60);
}

type MetaInput = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  type?: "website" | "article";
  /** Article dates (ISO) for og:article tags. */
  publishedTime?: string;
  modifiedTime?: string;
  /** Primary page image, used as a secondary OG image after the generated card. */
  image?: string;
};

/** Directives that let Google show large image previews and full snippets. */
const indexable = {
  index: true,
  follow: true,
  googleBot: { index: true, follow: true, "max-image-preview": "large" as const, "max-snippet": -1, "max-video-preview": -1 },
};

export function buildMetadata({ title, description, path, noindex, type = "website", publishedTime, modifiedTime, image }: MetaInput): Metadata {
  const desc = clamp(description, 155);
  const ogCard = { url: ogImagePath(path), width: 1200, height: 630, alt: title, type: "image/png" };
  const images = image ? [ogCard, { url: image, alt: title }] : [ogCard];
  return {
    title: { absolute: title },
    description: desc,
    alternates: {
      canonical: path,
      // Single-language site: self-referencing hreflang + x-default.
      languages: { "en-US": path, "x-default": path },
      types: { "application/rss+xml": [{ url: "/blog/rss.xml", title: `${business.name} Blog` }] },
    },
    robots: noindex ? { index: false, follow: true, googleBot: { index: false, follow: true } } : indexable,
    openGraph: {
      type,
      url: path,
      title,
      description: desc,
      siteName: business.name,
      locale: "en_US",
      images,
      ...(type === "article" ? { publishedTime, modifiedTime: modifiedTime ?? publishedTime, authors: [business.name], section: "Permanent Lighting" } : {}),
    },
    twitter: { card: "summary_large_image", title, description: desc, images: [ogCard.url] },
  };
}
