import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { business, hoursDisplay, telHref } from "@/data/business";
import { MapEmbed } from "./MapEmbed";
import { CallButton, QuoteButton } from "./ui";

export function NAPCard({ heading, mapQuery }: { heading: string; mapQuery?: string }) {
  return (
    <div className="card grid gap-8 overflow-hidden p-6 sm:p-8 lg:grid-cols-2">
      <div>
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">{heading}</h2>
        <address className="mt-6 space-y-4 not-italic text-slate-300">
          <p className="font-heading text-lg font-semibold text-white">{business.name}</p>
          <p className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-cyan" aria-hidden="true" />{business.street}, {business.city}, {business.state} {business.zip}</p>
          <p className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-cyan" aria-hidden="true" /><a href={telHref()} className="hover:text-cyan">{business.phone}</a></p>
          <p className="flex gap-3"><Mail className="h-5 w-5 shrink-0 text-cyan" aria-hidden="true" /><a href={`mailto:${business.email}`} className="hover:text-cyan">{business.email}</a></p>
          <p className="flex gap-3"><Clock className="h-5 w-5 shrink-0 text-cyan" aria-hidden="true" />{hoursDisplay}</p>
        </address>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <QuoteButton label="Get a Quote" />
          <CallButton />
        </div>
      </div>
      <MapEmbed query={mapQuery} />
    </div>
  );
}
