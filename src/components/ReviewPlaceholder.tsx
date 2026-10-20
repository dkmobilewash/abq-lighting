import { Star } from "lucide-react";

/**
 * TODO-replace: placeholder for a real Google review. Do not invent reviews.
 * Swap each instance for real review text, first name + neighborhood, and date.
 */
export function ReviewPlaceholder({ index = 1 }: { index?: number }) {
  return (
    <figure className="card-light flex h-full flex-col border-dashed p-6" data-placeholder="review">
      <div className="flex gap-1 text-slate-300" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4" />)}
      </div>
      <blockquote className="mt-4 flex-1 text-slate-600 italic">
        [PLACEHOLDER] Real Google review #{index} goes here. Paste the customer&apos;s words exactly as written.
      </blockquote>
      <figcaption className="mt-4 text-sm font-semibold text-slate-600">[Reviewer first name] · [Neighborhood]</figcaption>
    </figure>
  );
}
