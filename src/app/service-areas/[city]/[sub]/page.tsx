import { notFound } from "next/navigation";
import { CityServicePage } from "@/components/templates/CityServicePage";
import { NeighborhoodPage } from "@/components/templates/NeighborhoodPage";
import { cityServices } from "@/data/cityServices";
import { neighborhoods } from "@/data/neighborhoods";
import { metaFor } from "@/lib/page";
import { paths } from "@/lib/routes";

/**
 * Two page types share this segment:
 *  - /service-areas/albuquerque/[neighborhood]/
 *  - /service-areas/[city]/[service]/ (city × service matrix, only where copy exists)
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...neighborhoods.map((n) => ({ city: "albuquerque", sub: n.slug })),
    ...cityServices.map((cs) => ({ city: cs.city, sub: cs.service })),
  ];
}

function resolve(city: string, sub: string) {
  const cs = cityServices.find((x) => x.city === city && x.service === sub);
  if (cs) return { kind: "service" as const, cs, path: paths.cityService(cs) };
  const n = city === "albuquerque" ? neighborhoods.find((x) => x.slug === sub) : undefined;
  if (n) return { kind: "neighborhood" as const, n, path: paths.neighborhood(n.slug) };
  return null;
}

export async function generateMetadata({ params }: PageProps<"/service-areas/[city]/[sub]">) {
  const { city, sub } = await params;
  const r = resolve(city, sub);
  return r ? metaFor(r.path) : {};
}

export default async function Page({ params }: PageProps<"/service-areas/[city]/[sub]">) {
  const { city, sub } = await params;
  const r = resolve(city, sub);
  if (!r) notFound();
  return r.kind === "service" ? <CityServicePage cs={r.cs} /> : <NeighborhoodPage n={r.n} />;
}
