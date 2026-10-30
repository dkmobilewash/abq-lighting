import type { Feature } from "@/data/types";
import type { Linker } from "@/lib/linker";
import { Icon } from "./Icon";

export function FeatureGrid({ items, tone = "dark", cols = 3, linker }: { items: Feature[]; tone?: "dark" | "light"; cols?: 2 | 3 | 4; linker?: Linker }) {
  const grid = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[cols];
  const dark = tone === "dark";
  return (
    <ul className={`grid gap-5 ${grid}`}>
      {items.map((f) => (
        <li key={f.title} className={`${dark ? "card" : "card-light"} reveal p-6`}>
          <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${dark ? "bg-cyan/10 text-cyan" : "bg-chile/10 text-chile"}`}>
            <Icon name={f.icon} />
          </div>
          <h3 className={`text-lg font-semibold ${dark ? "text-white" : "text-ink"}`}>{f.title}</h3>
          <p className={`mt-2 leading-relaxed ${dark ? "text-slate-400" : "text-slate-600"}`}>{linker ? linker.link(f.body) : f.body}</p>
        </li>
      ))}
    </ul>
  );
}
