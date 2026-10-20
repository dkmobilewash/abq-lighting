import { z } from "zod";

export const propertyTypes = ["Residential", "Commercial", "HOA / Community"] as const;
export const budgetRanges = ["Not sure yet", "Under $3,000", "$3,000 – $6,000", "$6,000 – $10,000", "$10,000+"] as const; // EDIT to match your pricing tiers
export const contactPrefs = ["Call", "Text", "Email"] as const;

const phone = z
  .string()
  .trim()
  .refine((v) => v.replace(/\D/g, "").length >= 10, "Enter a 10-digit phone number");

const base = {
  firstName: z.string().trim().min(1, "First name is required").max(60),
  lastName: z.string().trim().min(1, "Last name is required").max(60),
  email: z.string().trim().email("Enter a valid email"),
  phone,
  zip: z.string().trim().regex(/^\d{5}$/, "Enter a 5-digit ZIP"),
  propertyType: z.enum(propertyTypes, { message: "Choose a property type" }),
  terms: z.literal(true, { message: "Please accept the terms to continue" }),
  smsConsent: z.boolean().optional(),
  // Honeypot: real users never see or fill this.
  company_website: z.string().max(0).optional().or(z.literal("")),
  // Hidden tracking fields
  pageUrl: z.string().max(500).optional(),
  citySlug: z.string().max(80).optional(),
  utm_source: z.string().max(200).optional(),
  utm_medium: z.string().max(200).optional(),
  utm_campaign: z.string().max(200).optional(),
  utm_term: z.string().max(200).optional(),
  utm_content: z.string().max(200).optional(),
};

/** Short hero form. */
export const compactQuoteSchema = z.object({ ...base, variant: z.literal("compact") });

/** Full quote page form. */
export const fullQuoteSchema = z.object({
  ...base,
  variant: z.literal("full"),
  street: z.string().trim().min(3, "Street address is required").max(120),
  city: z.string().trim().min(2, "City is required").max(80),
  linearFeet: z.string().max(40).optional(),
  budget: z.enum(budgetRanges).optional().or(z.literal("")),
  contactPref: z.enum(contactPrefs).optional().or(z.literal("")),
  message: z.string().max(2000).optional(),
});

export const quoteSchema = z.discriminatedUnion("variant", [compactQuoteSchema, fullQuoteSchema]);
export type QuoteInput = z.infer<typeof quoteSchema>;
