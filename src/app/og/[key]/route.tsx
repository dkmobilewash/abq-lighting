import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { business } from "@/data/business";
import { allRoutes } from "@/lib/routes";
import { ogKey } from "@/lib/seo";

/** Per-page Open Graph images, prerendered at build: page title over a night-roofline background. */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return allRoutes().map((r) => ({ key: ogKey(r.path) }));
}

export async function GET(_req: Request, { params }: RouteContext<"/og/[key]">) {
  const { key } = await params;
  const route = allRoutes().find((r) => ogKey(r.path) === key);
  const title = (route?.title ?? business.name).split(" | ")[0];
  const bg = await readFile(join(process.cwd(), "public/images/placeholders/og-background.jpg"));
  const bgSrc = `data:image/jpeg;base64,${bg.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", backgroundColor: "#0B1220" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={bgSrc} alt="" width={1200} height={630} style={{ position: "absolute", inset: 0, objectFit: "cover", opacity: 0.55 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(11,18,32,0.95) 0%, rgba(11,18,32,0.6) 70%, rgba(11,18,32,0.3) 100%)" }} />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#22D3EE", fontSize: 26, letterSpacing: 4, textTransform: "uppercase" }}>
            <div style={{ width: 18, height: 18, borderRadius: 9, background: "#F2B705" }} />
            Albuquerque, New Mexico
          </div>
          <div style={{ display: "flex", fontSize: title.length > 48 ? 58 : 70, fontWeight: 700, color: "white", lineHeight: 1.1, maxWidth: 1000 }}>{title}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 120, height: 8, borderRadius: 4, background: "linear-gradient(90deg, #22D3EE, #3B82F6)" }} />
            <div style={{ color: "#CBD5E1", fontSize: 30 }}>{business.name}</div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
