import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { JsonLd } from "./JsonLd";
import { PageHeader } from "./PageHeader";
import { routeInfo } from "@/lib/routes";
import { pageGraph } from "@/lib/schema";

export function LegalPage({ path, title, updated, children }: { path: string; title: string; updated: string; children: ReactNode }) {
  const info = routeInfo(path);
  const crumbs = [{ name: "Home", path: "/" }, { name: title, path }];
  return (
    <>
      <JsonLd data={pageGraph({ path, title: info.title, description: info.description, crumbs })} />
      <PageHeader eyebrow="Legal" title={title} intro={`Last updated: ${updated}`} />
      <Breadcrumbs crumbs={crumbs} />
      <section className="bg-adobe py-14">
        <div className="container-x max-w-3xl prose-site">
          <p className="rounded-xl border border-dashed border-chile/40 bg-white p-4 text-sm">[PLACEHOLDER] Template only. Have this reviewed by your attorney before launch.</p>
          {children}
        </div>
      </section>
    </>
  );
}
