import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTABand } from "@/components/CTABand";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui";
import { posts } from "@/data/posts";
import { metaFor } from "@/lib/page";
import { paths, routeInfo } from "@/lib/routes";
import { pageGraph } from "@/lib/schema";

const path = "/blog/";
export const metadata = metaFor(path);

const fmt = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

export default function Page() {
  const info = routeInfo(path);
  const crumbs = [{ name: "Home", path: "/" }, { name: "Blog", path }];
  return (
    <>
      <JsonLd data={pageGraph({ path, title: info.title, description: info.description, crumbs })} />
      <PageHeader eyebrow="Blog" title="Permanent Lighting Guides & Ideas" intro="Costs, flat roofs, HOAs, New Mexico weather and holiday ideas, written for Albuquerque homeowners." />
      <Breadcrumbs crumbs={crumbs} />
      <Section>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug} className="card overflow-hidden">
              <Link href={paths.post(p.slug)} className="group block h-full">
                <div className="relative aspect-[16/9]"><Image src={p.image} alt={p.imageAlt} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" /></div>
                <div className="p-6">
                  <p className="text-xs text-slate-400"><time dateTime={p.date}>{fmt(p.date)}</time> · {p.readMinutes} min read</p>
                  <h2 className="mt-2 text-lg font-semibold text-white group-hover:text-cyan">{p.title}</h2>
                  <p className="mt-2 text-sm text-slate-400">{p.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <CTABand title="Ready to Talk About Your Home?" />
    </>
  );
}
