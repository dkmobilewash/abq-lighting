import { SiteRelated } from "@/components/RelatedLinks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTABand } from "@/components/CTABand";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { ProjectGallery } from "@/components/ProjectGallery";
import { Section } from "@/components/ui";
import { cities, cityLabel } from "@/data/cities";
import { metaFor } from "@/lib/page";
import { routeInfo } from "@/lib/routes";
import { imageGalleryNode, pageGraph } from "@/lib/schema";
import { projects } from "@/data/projects";

const path = "/project-showcase/";
export const metadata = metaFor(path);

export default function Page() {
  const info = routeInfo(path);
  const crumbs = [{ name: "Home", path: "/" }, { name: "Project Showcase", path }];
  const cityNames = Object.fromEntries(cities.map((c) => [c.slug, cityLabel(c)]));
  return (
    <>
      <JsonLd data={pageGraph({ path, title: info.title, description: info.description, crumbs, pageType: "CollectionPage", extra: [imageGalleryNode(path, "Permanent lighting project ideas across the Albuquerque metro", projects.map((p) => ({ url: p.image, caption: p.imageAlt, location: `${p.area}, ${cityNames[p.city] ?? "Albuquerque"}, NM` })))] })} />
      <PageHeader eyebrow="Project Showcase" title="Permanent Lighting Projects Across the Albuquerque Metro" intro="Residential rooflines, Pueblo Revival parapets, storefronts, community entrances and holiday scenes. Filter by type to find ideas for your property." />
      <Breadcrumbs crumbs={crumbs} />
      <Section>
        <ProjectGallery cityNames={cityNames} />
      </Section>
      <SiteRelated current={path} />
      <CTABand title="Want Your Home in the Showcase?" secondaryHref="/how-it-works/" secondaryLabel="How It Works" />
    </>
  );
}
