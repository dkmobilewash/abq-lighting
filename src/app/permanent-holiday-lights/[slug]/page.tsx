import { notFound } from "next/navigation";
import { HolidayPage } from "@/components/templates/HolidayPage";
import { holidays } from "@/data/holidays";
import { metaFor } from "@/lib/page";
import { paths } from "@/lib/routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return holidays.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: PageProps<"/permanent-holiday-lights/[slug]">) {
  const { slug } = await params;
  return metaFor(paths.holiday({ slug }));
}

export default async function Page({ params }: PageProps<"/permanent-holiday-lights/[slug]">) {
  const { slug } = await params;
  const h = holidays.find((x) => x.slug === slug);
  if (!h) notFound();
  return <HolidayPage h={h} />;
}
