"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";

export type MapPoint = { name: string; href: string; lat: number; lng: number };

/**
 * Leaflet + OpenStreetMap map, initialized only when scrolled into view.
 * The server-rendered city list next to it is the static fallback.
 */
export function ServiceAreaMap({ points }: { points: MapPoint[] }) {
  const el = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const node = el.current;
    if (!node) return;
    let map: import("leaflet").Map | undefined;
    const io = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      try {
        const L = await import("leaflet");
        map = L.map(node, { scrollWheelZoom: false, attributionControl: true });
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 18,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
        const bounds = L.latLngBounds([]);
        for (const p of points) {
          const m = L.circleMarker([p.lat, p.lng], { radius: 9, color: "#0B1220", weight: 2, fillColor: "#22D3EE", fillOpacity: 0.95 }).addTo(map);
          m.bindPopup(`<a href="${p.href}" style="font-weight:600">${p.name}</a>`);
          bounds.extend([p.lat, p.lng]);
        }
        map.fitBounds(bounds, { padding: [30, 30] });
      } catch {
        setFailed(true);
      }
    }, { rootMargin: "200px" });
    io.observe(node);
    return () => {
      io.disconnect();
      map?.remove();
    };
  }, [points]);

  return (
    <div className="relative">
      <div ref={el} className="h-[28rem] w-full overflow-hidden rounded-2xl border border-line bg-panel" role="region" aria-label="Map of our service area" />
      {failed && <p className="mt-2 text-sm text-slate-400">The map couldn&apos;t load. See the full list of areas below.</p>}
    </div>
  );
}
