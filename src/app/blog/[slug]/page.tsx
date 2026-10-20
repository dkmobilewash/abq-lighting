import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTABand } from "@/components/CTABand";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { CardLink } from "@/components/ui";
import { cityLabel, getCity } from "@/data/cities";
import { posts } from "@/data/posts";
import { metaFor } from "@/lib/page";
import { allRoutes, paths } from "@/lib/routes";
import { articleNode, pageGraph } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  return metaFor(paths.post(slug), "article");
}

export default async function Page({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  const { default: Body } = await import(`@/content/blog/${slug}.mdx`);
  const path = paths.post(slug);
  const crumbs = [{ name: "Home", path: "/" }, { name: "Blog", path: "/blog/" }, { name: post.title, path }];
  const city = getCity(post.relatedCity);
  const serviceTitle = allRoutes().find((r) => r.path === post.relatedService)?.title.split(" | ")[0] ?? "Related service";
  const more = posts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <JsonLd data={pageGraph({ path, title: post.title, description: post.description, crumbs, extra: [articleNode({ path, title: post.title, description: post.description, date: post.date, image: post.image })] })} />
      <PageHeader eyebrow="Blog" title={post.title}>
        <p className="mt-4 text-sm text-slate-400">
          <time dateTime={post.date}>{new Date(`${post.date}T12:00:00`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time> · {post.readMinutes} min read
        </p>
      </PageHeader>
      <Breadcrumbs crumbs={crumbs} />
      <article className="bg-adobe py-12 sm:py-16">
        <div className="container-x max-w-3xl">
          <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image src={post.image} alt={post.imageAlt} fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
          </div>
          <div className="prose-site">
            <Body />
          </div>
          <aside className="card mt-12 p-6">
            <h2 className="text-lg font-semibold text-white">Related</h2>
            <ul className="mt-2">
              <li><CardLink href={post.relatedService}>{serviceTitle}</CardLink></li>
              {city && <li><CardLink href={paths.city(city.slug)}>Permanent lighting in {cityLabel(city)}</CardLink></li>}
              {more.map((m) => <li key={m.slug}><CardLink href={paths.post(m.slug)}>{m.title}</CardLink></li>)}
            </ul>
          </aside>
        </div>
      </article>
      <CTABand title="Get a Free Quote for Your Home" />
    </>
  );
}
