import Image from "next/image";
import { business } from "@/data/business";
import { Icon } from "./Icon";
import { CardLink, Eyebrow } from "./ui";

export function AppSection() {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <div className="glow mx-auto w-full max-w-md">
        <Image src="/images/placeholders/app-phone-mockup.jpg" alt="Permanent lighting app on a phone showing color and scene controls" width={800} height={1000} sizes="(min-width: 1024px) 448px, 90vw" className="rounded-2xl" />
      </div>
      <div>
        <Eyebrow>The App</Eyebrow>
        <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Control Everything From One App</h2>
        <p className="mt-4 text-lg text-slate-300">Warm white on a weeknight, red and green in December, cherry and silver on game day. Every zone, color and schedule lives in one simple app on your phone.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <div className="card p-6">
            <Icon name="zap" className="h-6 w-6 text-zia" />
            <h3 className="mt-3 font-semibold text-white">Set Up in Minutes</h3>
            <p className="mt-2 text-slate-400">We connect the controller to your Wi-Fi and walk you through the app before we leave.</p>
          </div>
          <div className="card p-6">
            <Icon name="palette" className="h-6 w-6 text-zia" />
            <h3 className="mt-3 font-semibold text-white">Unlimited Colors & Patterns</h3>
            <p className="mt-2 text-slate-400">Use built-in holiday scenes or design your own patterns, chases and twinkles.</p>
          </div>
        </div>
        {business.hasPublicApps && (
          <p className="mt-6 text-sm text-slate-400">Available on the App Store and Google Play. {/* TODO: add official store badges */}</p>
        )}
        <div className="mt-6"><CardLink href="/smart-app/">Explore the app features</CardLink></div>
      </div>
    </div>
  );
}
