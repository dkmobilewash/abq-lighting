# Albuquerque Permanent Lighting Co. website

A static, SEO-first marketing site built with Next.js (App Router), TypeScript and Tailwind CSS.
Every page is generated from typed data in `src/data/`, so you add a page by adding data, not code.

```bash
npm install
cp .env.example .env.local   # set QUOTE_WEBHOOK_URL
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
npm run lint && npm run typecheck
node scripts/qa-crawl.mjs http://localhost:3000   # after `npm start`: SEO/H1/link/JSON-LD checks
```

## Before launch: fill in the placeholders

1. **`src/data/business.ts`**: phone, email, address, ZIP, domain, controller brand, warranty years, license #, socials.
   Set `hasPublicApps: true` once your system has App Store / Google Play apps, and set `googleReviewsUrl`.
2. Search for anything left to fill in:
   ```bash
   grep -rn "\[PHONE\]\|\[EMAIL\]\|\[PLACEHOLDER\]\|\[DOMAIN\]\|\[CONFIRM\|\[DATE\]\|VERIFY" src
   ```
3. **Images**: replace everything in `public/images/placeholders/` (see `public/images/README.md`).
4. **Reviews**: `<ReviewPlaceholder />` (`src/components/ReviewPlaceholder.tsx`) marks every spot for a real Google review.
   Never add a star rating or `AggregateRating` schema until you have real reviews.
5. **Projects**: `src/data/projects.ts` lists sample concepts. Replace them with real jobs and set `placeholder: false`.
6. **Features**: `src/data/features.ts`. Remove anything your installed system doesn't actually do.
7. **Warranty, privacy and terms pages**: these are templates. Have them reviewed.
8. **ZIP codes**: every `// VERIFY` in `src/data/cities-*.ts` and `src/data/neighborhoods.ts`.
9. **Budget ranges** in the quote form: `src/lib/quoteSchema.ts` (`budgetRanges`).

## Common edits

**Change the phone number:** edit `phone` in `src/data/business.ts`. The header, footer, sticky mobile bar, NAP cards,
schema and `tel:` links all read from it.

**Add a city:**
1. Add the slug to the `CitySlug` union in `src/data/types.ts`.
2. Add a `City` object to `src/data/cities-b.ts` (or `cities-a.ts`). Write unique copy for every field.
   Don't name-swap another city's copy, or the page becomes thin, doorway-style content.
3. Optionally list it in other cities' `nearby` arrays.

The page `/service-areas/[slug]/`, footer link, sitemap entry, map pin, OG image and `areaServed` schema are all generated
from that data.

**Add an Albuquerque neighborhood:** add an entry to `src/data/neighborhoods.ts`. It appears at
`/service-areas/albuquerque/[slug]/`. Link to it from a city by setting `neighborhoodSlug` on a place in `areas.places`.

**Add a city × service page:** add an entry to `src/data/cityServices.ts` (extend `CityServiceSlug` if it's a new service).
Only add one when you've written genuinely local copy for it.

**Add a service:** add the slug to `ServiceSlug` in `types.ts` and an object to `src/data/services.ts`. It's served at
`/[slug]/` and appears in the nav, footer and sitemap. City page service cards show the five `CityCardService` slugs.

**Add a holiday:** add an object to `src/data/holidays.ts`. It's served at `/permanent-holiday-lights/[slug]/`.

**Add a blog post:** add `src/content/blog/[slug].mdx` (no frontmatter, no H1; start with a paragraph and use `##` headings),
then add its metadata to the top of `src/data/posts.ts`. Link to one service and one city in the body.

**Swap an image:** drop the new file into `public/images/` and update the path in the data file that references it.
Use JPG/PNG at ≥ 1600px wide. `next/image` serves AVIF/WebP at the right size automatically.

## How it's put together

| Path | What |
|---|---|
| `src/data/` | All content, as typed data (`types.ts` defines the shapes) |
| `src/lib/routes.ts` | Route registry: every page's path, title and description. Feeds metadata, the sitemap and OG images |
| `src/lib/schema.ts` | JSON-LD graph builders (WebSite, Organization, WebPage, BreadcrumbList, LocalBusiness, Service, FAQPage) |
| `src/lib/seo.ts` | Metadata, canonical and OG helpers. Titles over 60 chars drop the brand suffix |
| `src/components/templates/` | City, Neighborhood, City×Service, Service, Application and Holiday templates |
| `src/app/og/[key]/` | Per-page Open Graph images, prerendered at build time |
| `src/app/api/quote/` | Quote form endpoint: validates the submission, checks the honeypot and forwards JSON to `QUOTE_WEBHOOK_URL` |

The `/thank-you/` page is `noindex` and is where to fire conversion tracking.
