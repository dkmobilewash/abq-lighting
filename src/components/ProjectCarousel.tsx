import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { cities, cityLabel } from "@/data/cities";

/** CSS scroll-snap carousel (no JS). */
export function ProjectCarousel({ title = "Our Work Across the Albuquerque Metro" }: { title?: string }) {
  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
        <Link href="/project-showcase/" className="inline-flex min-h-11 items-center text-sm font-semibold text-cyan hover:text-zia">See the full showcase →</Link>
      </div>
      <ul className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0" aria-label="Project examples">
        {projects.map((p) => {
          const city = cities.find((c) => c.slug === p.city);
          return (
            <li key={p.slug} className="card w-72 shrink-0 snap-start overflow-hidden sm:w-80">
              <Link href={`/project-showcase/#${p.slug}`} className="group block">
                <div className="relative aspect-[4/3]">
                  <Image src={p.image} alt={p.imageAlt} fill sizes="320px" className="object-cover transition group-hover:scale-105" />
                  {p.placeholder && <span className="absolute left-3 top-3 rounded-full bg-night/80 px-2 py-0.5 text-xs text-zia">Sample concept</span>}
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-cyan">{p.category} · {p.area}{city && p.area !== cityLabel(city) ? `, ${cityLabel(city)}` : ""}</p>
                  <h3 className="mt-1 font-semibold text-white">{p.title}</h3>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
