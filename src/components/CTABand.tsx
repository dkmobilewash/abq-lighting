import { Button, QuoteButton } from "./ui";
import { MountainDivider } from "./MountainDivider";

export function CTABand({
  title, body = "Book a free, no-pressure design consultation. We'll map your roofline, show you what's possible and send a clear written quote.",
  secondaryHref = "/project-showcase/", secondaryLabel = "View Projects", primaryLabel,
}: { title: string; body?: string; secondaryHref?: string; secondaryLabel?: string; primaryLabel?: string }) {
  return (
    <section className="relative overflow-hidden bg-night pt-4">
      <MountainDivider />
      <div className="bg-panel">
        <div className="container-x py-16 text-center sm:py-20">
          <h2 className="mx-auto max-w-3xl text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">{body}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <QuoteButton label={primaryLabel} />
            <Button href={secondaryHref} variant="secondary">{secondaryLabel}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
