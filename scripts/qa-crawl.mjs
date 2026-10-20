/**
 * QA crawler: node scripts/qa-crawl.mjs [baseUrl]
 * Reads sitemap.xml, fetches every page, and checks status, H1 count, title/description
 * length, canonical, JSON-LD parse, broken internal links and orphan pages.
 */
const base = (process.argv[2] || "http://localhost:3100").replace(/\/$/, "");
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, ""));
const pages = [...urls, "/thank-you/"];

const inbound = new Map(pages.map((p) => [p, 0]));
const linkTargets = new Set();
const problems = [];
const rows = [];

for (const path of pages) {
  const res = await fetch(base + path, { redirect: "manual" });
  const html = await res.text();
  if (res.status !== 200) { problems.push(`${path}: HTTP ${res.status}`); continue; }
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "";
  const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || "";
  const t = title.replace(/&amp;/g, "&").replace(/&#x27;/g, "'");
  const d = desc.replace(/&amp;/g, "&").replace(/&#x27;/g, "'");
  if (h1 !== 1) problems.push(`${path}: ${h1} <h1> tags`);
  if (t.length > 60) problems.push(`${path}: title ${t.length} chars`);
  if (!d || d.length > 155) problems.push(`${path}: description ${d.length} chars`);
  if (!canonical.endsWith(path)) problems.push(`${path}: canonical ${canonical}`);
  if (path !== "/thank-you/" && /noindex/.test(html.match(/<meta name="robots"[^>]*>/)?.[0] || "")) problems.push(`${path}: unexpected noindex`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(m[1]);
      const types = data["@graph"].map((n) => [].concat(n["@type"]).join("+"));
      for (const need of ["WebSite", "Organization", "WebPage"]) if (!types.includes(need)) problems.push(`${path}: JSON-LD missing ${need}`);
      if (path !== "/" && !types.includes("BreadcrumbList")) problems.push(`${path}: JSON-LD missing BreadcrumbList`);
      rows.push({ path, title: t, types: types.join(", ") });
    } catch (e) {
      problems.push(`${path}: invalid JSON-LD ${e.message}`);
    }
  }
  const main = html.split('<main id="main">')[1]?.split("</main>")[0] || "";
  for (const m of main.matchAll(/href="(\/[^"#?]*)/g)) {
    const href = m[1];
    if (href.startsWith("/_next") || href.startsWith("/images") || href.startsWith("/og/")) continue;
    linkTargets.add(href);
    if (inbound.has(href) && href !== path) inbound.set(href, inbound.get(href) + 1);
  }
}

for (const href of linkTargets) {
  const r = await fetch(base + href, { redirect: "manual" });
  if (r.status !== 200) problems.push(`broken link target ${href}: HTTP ${r.status}`);
}
for (const [p, n] of inbound) if (n === 0 && p !== "/" && p !== "/thank-you/") problems.push(`orphan (no in-content links): ${p}`);

console.log(`Crawled ${pages.length} pages, checked ${linkTargets.size} internal link targets.`);
console.log(problems.length ? problems.join("\n") : "No problems found.");
if (process.argv.includes("--list")) for (const r of rows) console.log(`${r.path}\t${r.title}`);
