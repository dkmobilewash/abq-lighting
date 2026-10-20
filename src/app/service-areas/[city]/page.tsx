import { notFound } from "next/navigation";
import { CityPage } from "@/components/templates/CityPage";
import { cities, getCity } from "@/data/cities";
import { metaFor } from "@/lib/page";
import { paths } from "@/lib/routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/service-areas/[city]">) {
  const { city } = await params;
  return metaFor(paths.city(city));
}

export default async function Page({ params }: PageProps<"/service-areas/[city]">) {
  const { city } = await params;
  const c = getCity(city);
  if (!c) notFound();
  return <CityPage city={c} />;
}
