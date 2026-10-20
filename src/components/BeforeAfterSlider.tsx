"use client";

import Image from "next/image";
import { useState } from "react";

/** Accessible before/after slider: drag, click, or use arrow keys on the range input. */
export function BeforeAfterSlider({
  before, after, beforeAlt, afterAlt,
}: { before: string; after: string; beforeAlt: string; afterAlt: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="glow">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line select-none">
        <Image src={after} alt={afterAlt} fill sizes="(min-width: 1024px) 896px, 100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={before} alt={beforeAlt} fill sizes="(min-width: 1024px) 896px, 100vw" className="object-cover" />
        </div>
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-night/70 px-3 py-1 text-xs font-semibold text-white">Day</span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-night/70 px-3 py-1 text-xs font-semibold text-cyan">Night</span>
        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_12px_rgba(34,211,238,0.9)]" style={{ left: `${pos}%` }}>
          <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-night text-white">⇆</div>
        </div>
        <input
          type="range" min={0} max={100} value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Drag to compare the house by day and by night"
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
    </div>
  );
}
