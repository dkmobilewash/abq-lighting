import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { QuoteForm } from "@/components/QuoteForm";
import { ReviewPlaceholder } from "@/components/ReviewPlaceholder";
import { Section } from "@/components/ui";
import { business, hoursDisplay, telHref } from "@/data/business";
import { processSteps } from "@/data/process";
import { metaFor } from "@/lib/page";
import { routeInfo } from "@/lib/routes";
import { pageGraph } from "@/lib/schema";

const path = "/get-a-quote/";
export const metadata = metaFor(path);

export default function Page() {
  const info = routeInfo(path);
  const crumbs = [{ name: "Home", path: "/" }, { name: "Get a Quote", path }];
  return (
    <>
      <JsonLd data={pageGraph({ path, title: info.title, description: info.description, crumbs, localBusiness: true })} />
      <PageHeader eyebrow="Free, No-Pressure Quote" title="Get a Free Permanent Lighting Quote" intro="Tell us a little about your property. A local designer will follow up to talk through your roofline, answer questions and put together a written quote." />
      <Breadcrumbs crumbs={crumbs} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div id="quote-form" className="card scroll-mt-28 p-6 sm:p-8">
            <h2 className="mb-6 text-2xl font-semibold text-white">Your Project Details</h2>
            <QuoteForm variant="full" idPrefix="quote" />
          </div>
          <aside className="space-y-6">
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-white">What Happens Next</h2>
              <ol className="mt-4 space-y-4">
                {processSteps.map((s) => (
                  <li key={s.step} className="flex gap-3">
                    <span className="font-heading font-semibold text-cyan">0{s.step}</span>
                    <span><span className="font-semibold text-white">{s.title}.</span> <span className="text-slate-400">{s.body}</span></span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-white">Prefer to Talk?</h2>
              <p className="mt-2 text-slate-400">Call <a href={telHref()} className="font-semibold text-cyan">{business.phone}</a> · {hoursDisplay}</p>
            </div>
            <ReviewPlaceholder index={1} />
          </aside>
        </div>
      </Section>
    </>
  );
}
