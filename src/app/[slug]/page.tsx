import { notFound } from "next/navigation";
import { ApplicationPage } from "@/components/templates/ApplicationPage";
import { ServicePage } from "@/components/templates/ServicePage";
import { applications } from "@/data/applications";
import { services } from "@/data/services";
import { metaFor } from "@/lib/page";

/** Root-level service pages (/roofline-lighting/) and application pages (/commercial-permanent-lighting/). */
export const dynamicParams = false;

export function generateStaticParams() {
  return [...services.map((s) => ({ slug: s.slug })), ...applications.map((a) => ({ slug: a.slug }))];
}

export async function generateMetadata({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  return metaFor(`/${slug}/`);
}

export default async function Page({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (s) return <ServicePage s={s} />;
  const a = applications.find((x) => x.slug === slug);
  if (a) return <ApplicationPage a={a} />;
  notFound();
}
