import Image from "next/image";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Children, type ReactNode } from "react";
import { Linker } from "@/lib/linker";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTABand } from "@/components/CTABand";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { RelatedLinks } from "@/components/RelatedLinks";
import { localHolidayLinks, popularServiceLinks, postLinks } from "@/lib/related";
import { cityLabel, getCity } from "@/data/cities";
import { posts } from "@/data/posts";
import { metaFor } from "@/lib/page";
import { allRoutes, paths } from "@/lib/routes";
import { articleNode, pageGraph } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";

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

  // Contextual links inside the article body, skipping pages the post already links to by hand.
  const source = await readFile(join(process.cwd(), "src/content/blog", `${slug}.mdx`), "utf8");
  const manual = [...source.matchAll(/\]\((\/[^)\s]*)\)/g)].map((m) => m[1]);
  const linker = new Linker(path, { maxPerPage: 10, maxPerParagraph: 1 }).exclude(...manual);
  const components = {
    p: ({ children }: { children?: ReactNode }) => <p>{Children.map(children, (c) => (typeof c === "string" ? linker.link(c) : c))}</p>,
    li: ({ children }: { children?: ReactNode }) => <li>{Children.map(children, (c) => (typeof c === "string" ? linker.link(c) : c))}</li>,
  };

  return (
    <>
      <JsonLd data={pageGraph({ path, title: post.title, description: post.description, crumbs, mainEntity: `${absoluteUrl(path)}#article`, extra: [articleNode({ path, title: post.title, description: post.description, date: post.date, image: post.image, wordCount: source.split(/\s+/).filter(Boolean).length, about: [{ name: serviceTitle, path: post.relatedService }, ...(city ? [{ name: `${cityLabel(city)}, NM`, path: paths.city(city.slug) }] : [])] })] })} />
      <PageHeader eyebrow="Blog" title={post.title}>
        <p className="mt-4 text-sm text-slate-400">
          <time dateTime={post.date}>{new Date(`${post.date}T12:00:00`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time> · {post.readMinutes} min read
        </p>
      </PageHeader>
      <Breadcrumbs crumbs={crumbs} />
      <article className="bg-adobe py-12 sm:py-16">
        <div className="container-x max-w-3xl">
          <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image src={post.image} alt={post.imageAlt} fill loading="eager" fetchPriority="high" sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
          </div>
          <div className="prose-site">
            <Body components={components} />
          </div>
        </div>
      </article>
      <RelatedLinks
        title="Keep Reading"
        groups={[
          { heading: "Related Service", links: [{ href: post.relatedService, label: serviceTitle }, { href: "/permanent-outdoor-lighting/", label: "What is permanent outdoor lighting?" }] },
          { heading: city ? `Lighting in ${cityLabel(city)}` : "Service Areas", links: city ? [{ href: paths.city(city.slug), label: `Permanent lighting in ${cityLabel(city)}` }, ...popularServiceLinks(city.slug).slice(0, 4)] : [] },
          { heading: "Holiday & Event Lighting", links: localHolidayLinks().slice(0, 5) },
          { heading: "More Articles", links: postLinks(more) },
        ]}
      />
      <CTABand title="Get a Free Quote for Your Home" />
    </>
  );
}
