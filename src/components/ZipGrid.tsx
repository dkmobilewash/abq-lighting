import type { City } from "@/data/types";
import { cityLabel } from "@/data/cities";

export function ZipGrid({ cities }: { cities: City[] }) {
  const chips = cities.flatMap((c) => c.zips.map((z) => ({ zip: z, label: cityLabel(c), key: `${c.slug}-${z}` })));
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {chips.map((z) => (
        <li key={z.key} className="card-light flex flex-col px-4 py-3">
          <span className="font-heading text-lg font-semibold text-ink">{z.zip}</span>
          <span className="text-sm text-slate-500">{z.label}, NM</span>
        </li>
      ))}
    </ul>
  );
}
