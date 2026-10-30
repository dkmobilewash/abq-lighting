import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";
import type { CityCardService } from "@/data/types";
import { Icon } from "./Icon";
import { CardLink } from "./ui";

const cardSlugs: CityCardService[] = [
  "roofline-lighting",
  "parapet-and-flat-roof-lighting",
  "fence-and-wall-lighting",
  "landscape-lighting",
  "patio-and-decorative-lighting",
];

/**
 * Service cards. Pass `blurbs` for city-localized copy and `localLinks` to add a
 * link to a city×service page when one exists.
 */
export function ServiceCards({
  blurbs, localLinks = {}, cityName, includeSecurity = false,
}: {
  blurbs?: Partial<Record<string, string>>;
  localLinks?: Partial<Record<string, string>>;
  cityName?: string;
  includeSecurity?: boolean;
}) {
  const list = services.filter((s) => (cardSlugs as string[]).includes(s.slug) || (includeSecurity && s.slug === "security-accent-lighting"));
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((s) => (
        <li key={s.slug} className="card reveal flex flex-col overflow-hidden">
          <Link href={`/${s.slug}/`} className="relative block aspect-[16/10]" tabIndex={-1} aria-hidden="true">
            <Image src={s.image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
          </Link>
          <div className="flex flex-1 flex-col p-6">
            <div className="mb-3 flex items-center gap-3 text-cyan">
              <Icon name={s.icon} className="h-5 w-5" />
              <h3 className="text-lg font-semibold text-white">{s.name}</h3>
            </div>
            <p className="flex-1 leading-relaxed text-slate-400">{blurbs?.[s.slug] ?? s.cardBlurb}</p>
            <div className="mt-4 flex flex-wrap gap-x-5">
              <CardLink href={`/${s.slug}/`}>Learn more<span className="sr-only"> about {s.name}</span></CardLink>
              {localLinks[s.slug] && cityName && (
                <CardLink href={localLinks[s.slug]!}>{s.shortName} in {cityName}</CardLink>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
