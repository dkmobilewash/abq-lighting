"use client";

import Image from "next/image";
import { useState } from "react";
import { projectCategories, projects } from "@/data/projects";

type Filter = "All" | (typeof projectCategories)[number];

export function ProjectGallery({ cityNames }: { cityNames: Record<string, string> }) {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  return (
    <div>
      <div role="group" aria-label="Filter projects" className="mb-8 flex flex-wrap gap-2">
        {(["All", ...projectCategories] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`min-h-11 rounded-full border px-5 text-sm font-semibold transition ${filter === f ? "border-transparent bg-gradient-accent text-night" : "border-line text-slate-300 hover:text-cyan"}`}
          >
            {f}
          </button>
        ))}
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <li key={p.slug} id={p.slug} className="card scroll-mt-28 overflow-hidden">
            <div className="relative aspect-[4/3]">
              <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
              {p.placeholder && <span className="absolute left-3 top-3 rounded-full bg-night/80 px-2 py-0.5 text-xs text-zia">Sample concept</span>}
            </div>
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan">{p.category} · {p.area}{cityNames[p.city] && cityNames[p.city] !== p.area ? `, ${cityNames[p.city]}` : ""}</p>
              <h2 className="mt-1 text-lg font-semibold text-white">{p.title}</h2>
              <p className="mt-2 text-slate-400">{p.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
