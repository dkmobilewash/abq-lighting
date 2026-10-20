/**
 * Single source of truth for NAP + brand facts.
 * Find/replace the [BRACKETED] placeholders before launch.
 */
export const business = {
  name: "Albuquerque Permanent Lighting Co.",
  shortName: "ABQ Permanent Lighting",
  phone: "[PHONE]", // e.g. (505) 555-0123
  email: "[EMAIL]",
  street: "[STREET ADDRESS]",
  city: "Albuquerque",
  state: "NM",
  zip: "[ZIP]",
  geo: { lat: 35.0844, lng: -106.6504 },
  hours: "Mo-Sa 08:00-18:00",
  domain: "https://[DOMAIN]",
  controllerBrand: "[CONTROLLER/LIGHT SYSTEM BRAND]", // the system we install
  warrantyYears: "[X]",
  socials: { facebook: "", instagram: "", google: "", nextdoor: "" },
  licenseNumber: "[NM LICENSE #]",
  /** Set true only once the controller brand has public App Store / Google Play apps. */
  hasPublicApps: false,
  /** Paste your Google Business Profile reviews URL once it exists. */
  googleReviewsUrl: "",
};

/** Human-readable hours for display. Keep in sync with `business.hours`. */
export const hoursDisplay = "Mon–Sat, 8:00 AM – 6:00 PM";

/** Digits-only phone for tel: links (falls back to "#" while the placeholder is in place). */
export function telHref(): string {
  const digits = business.phone.replace(/[^\d+]/g, "");
  return digits.length >= 10 ? `tel:${digits}` : "/contact-us/";
}

export const fullAddress = `${business.street}, ${business.city}, ${business.state} ${business.zip}`;

/** Canonical origin without trailing slash. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || business.domain).replace(/\/$/, "");

export const sameAs = Object.values(business.socials).filter(Boolean);
