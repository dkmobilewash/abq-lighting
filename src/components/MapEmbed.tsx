import { business } from "@/data/business";

/** Lazy Google Maps embed (no API key). Falls back to the city until a street address is set. */
export function MapEmbed({ query, title }: { query?: string; title?: string }) {
  const hasAddress = !business.street.startsWith("[");
  const q = query ?? (hasAddress ? `${business.street}, ${business.city}, ${business.state} ${business.zip}` : `${business.city}, ${business.state}`);
  return (
    <iframe
      title={title ?? `Map of ${q}`}
      src={`https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`}
      className="h-72 w-full rounded-2xl border-0 sm:h-full sm:min-h-80"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
