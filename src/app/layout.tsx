import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import { business, siteUrl } from "@/data/business";
import { FloatingQuote } from "@/components/FloatingQuote";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap", preload: false });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap", weight: ["500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl.startsWith("https://[") ? "https://example.com" : siteUrl),
  applicationName: business.name,
  authors: [{ name: business.name, url: "/" }],
  creator: business.name,
  publisher: business.name,
  category: "Home Improvement",
  formatDetection: { telephone: false },
  // Search Console / Bing Webmaster verification (set the env vars; nothing renders when unset).
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : undefined,
  },
  // Local geo-targeting meta tags.
  other: {
    "geo.region": "US-NM",
    "geo.placename": `${business.city}, ${business.state}`,
    "geo.position": `${business.geo.lat};${business.geo.lng}`,
    ICBM: `${business.geo.lat}, ${business.geo.lng}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1220",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileStickyBar />
        <FloatingQuote />
      </body>
    </html>
  );
}
