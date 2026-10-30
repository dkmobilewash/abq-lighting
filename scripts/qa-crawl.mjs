/**
 * On-site SEO QA crawler.
 *   npm run build && npm start   (in another terminal)
 *   node scripts/qa-crawl.mjs [baseUrl] [--list]
 *
 * Reads sitemap.xml, fetches every page and checks:
 *  - HTTP 200, exactly one <h1>, no skipped heading levels inside <main>
 *  - title ≤ 60 chars, description ≤ 155 chars, both unique site-wide
 *  - canonical, og:image, twitter card, hreflang, robots meta
 *  - JSON-LD parses, has the required nodes, and every internal @id reference resolves
 *  - every <img> has an alt attribute
 *  - thin content (< 300 words in <main>) on indexable content pages
 *  - every internal link resolves with 200 (no redirects), no contextual self-links
 *  - inbound internal links per page and click depth from the homepage (BFS)
 */
const args = process.argv.slice(2);
const base = (args.find((a) => !a.startsWith("--")) || "http://localhost:3100").replace(/\/$/, "");
const list = args.includes("--list");

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, ""));
const sitemapImages = (sitemap.match(/<image:loc>/g) || []).length;
const pages = [...urls, "/thank-you/"];
const utility = new Set(["/thank-you/", "/get-a-quote/", "/contact-us/", "/site-map/", "/privacy-policy/", "/terms-and-conditions/", "/blog/", "/project-showcase/"]);

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const problems = [];
const warn = (m) => problems.push(m);
const titles = new Map();
const descs = new Map();
const graphEdges = new Map(); // page -> all internal hrefs (incl. nav/footer)
const inboundContent = new Map(pages.map((p) => [p, 0]));
const allTargets = new Set();
const rows = [];
let totalCtx = 0;

for (const path of pages) {
  const res = await fetch(base + path, { redirect: "manual" });
  const html = await res.text();
  if (res.status !== 200) { warn(`${path}: HTTP ${res.status}`); continue; }

  const head = html.split("</head>")[0];
  const main = html.split('<main id="main">')[1]?.split("</main>")[0] || "";
  const title = decode((head.match(/<title>([^<]*)<\/title>/) || [])[1] || "");
  const desc = decode((head.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "");
  const canonical = (head.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || "";
  const robots = (head.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || "";
  const noindex = /noindex/.test(robots);

  // Head tags
  if (title.length > 60) warn(`${path}: title ${title.length} chars`);
  if (!desc || desc.length > 155) warn(`${path}: description ${desc.length} chars`);
  if (!canonical.endsWith(path)) warn(`${path}: canonical ${canonical}`);
  if (!/property="og:image"/.test(head)) warn(`${path}: missing og:image`);
  if (!/name="twitter:card"/.test(head)) warn(`${path}: missing twitter:card`);
  if (!/hrefLang="en-US"|hreflang="en-US"/i.test(head)) warn(`${path}: missing hreflang`);
  if (!robots) warn(`${path}: missing robots meta`);
  if (path !== "/thank-you/" && noindex) warn(`${path}: unexpected noindex`);
  if (path === "/thank-you/" && !noindex) warn(`${path}: should be noindex`);
  if (!noindex) {
    titles.set(title, [...(titles.get(title) || []), path]);
    descs.set(desc, [...(descs.get(desc) || []), path]);
  }

  // Headings
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) warn(`${path}: ${h1} <h1> tags`);
  const levels = [...main.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1) { warn(`${path}: heading jumps h${levels[i - 1]} → h${levels[i]}`); break; }
  }

  // Images
  for (const m of html.matchAll(/<img\b[^>]*>/g)) if (!/\balt=/.test(m[0])) warn(`${path}: <img> without alt: ${m[0].slice(0, 80)}`);

  // Content depth
  const words = main.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  if (!noindex && !utility.has(path) && words < 300) warn(`${path}: thin content (${words} words)`);

  // JSON-LD
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!ld.length) warn(`${path}: no JSON-LD`);
  let types = [];
  for (const m of ld) {
    try {
      const data = JSON.parse(m[1]);
      const nodes = data["@graph"];
      types = nodes.map((n) => [].concat(n["@type"]).join("+"));
      for (const need of ["WebSite", "Organization"]) if (!types.includes(need)) warn(`${path}: JSON-LD missing ${need}`);
      if (path !== "/" && !types.includes("BreadcrumbList")) warn(`${path}: JSON-LD missing BreadcrumbList`);
      const defined = new Set();
      const refs = new Set();
      const walk = (o) => {
        if (Array.isArray(o)) return o.forEach(walk);
        if (o && typeof o === "object") {
          const keys = Object.keys(o);
          if (o["@id"] && keys.length === 1) refs.add(o["@id"]);
          else if (o["@id"]) defined.add(o["@id"]);
          keys.forEach((k) => walk(o[k]));
        }
      };
      walk(nodes);
      for (const r of refs) if (!defined.has(r)) warn(`${path}: JSON-LD @id reference not defined in graph: ${r}`);
    } catch (e) {
      warn(`${path}: invalid JSON-LD ${e.message}`);
    }
  }

  // Links
  const all = new Set();
  for (const m of html.matchAll(/<a\b[^>]*href="(\/[^"#?]*)/g)) {
    const href = m[1];
    if (/^\/(_next|images|og)\//.test(href) || /\.(xml|txt|png|jpg|svg)$/.test(href)) continue;
    all.add(href);
    allTargets.add(href);
  }
  graphEdges.set(path, all);
  const contentLinks = new Set([...main.matchAll(/<a\b[^>]*href="(\/[^"#?]*)/g)].map((m) => m[1]));
  for (const href of contentLinks) if (inboundContent.has(href) && href !== path) inboundContent.set(href, inboundContent.get(href) + 1);
  for (const m of main.matchAll(/<a\b[^>]*class="ctx-link"[^>]*>/g)) {
    totalCtx++;
    const href = (m[0].match(/href="([^"]*)"/) || [])[1];
    if (href === path) warn(`${path}: contextual link to itself`);
  }
  rows.push({ path, title, words, types: types.join(", ") });
}

// Duplicates
for (const [t, ps] of titles) if (ps.length > 1) warn(`duplicate title "${t}": ${ps.join(", ")}`);
for (const ps of descs.values()) if (ps.length > 1) warn(`duplicate description: ${ps.join(", ")}`);

// Broken / redirecting link targets
for (const href of allTargets) {
  const r = await fetch(base + href, { redirect: "manual" });
  if (r.status !== 200) warn(`link target ${href}: HTTP ${r.status}`);
}

// Click depth (BFS over every internal link, nav and footer included)
const depth = new Map([["/", 0]]);
const queue = ["/"];
while (queue.length) {
  const p = queue.shift();
  for (const n of graphEdges.get(p) || []) if (!depth.has(n) && graphEdges.has(n)) { depth.set(n, depth.get(p) + 1); queue.push(n); }
}
const maxDepth = Math.max(...depth.values());
for (const p of urls) if (!depth.has(p)) warn(`unreachable from home: ${p}`);
for (const [p, n] of inboundContent) if (n < 3 && p !== "/" && p !== "/thank-you/") warn(`weakly linked (only ${n} in-content inbound links): ${p}`);

const inbound = [...inboundContent.entries()].filter(([p]) => p !== "/thank-you/").map(([, n]) => n);
console.log(`Crawled ${pages.length} pages · ${allTargets.size} unique internal link targets · ${sitemapImages} sitemap images`);
console.log(`Contextual in-copy links: ${totalCtx} · in-content inbound links per page: min ${Math.min(...inbound)}, median ${inbound.sort((a, b) => a - b)[Math.floor(inbound.length / 2)]} · max click depth from home: ${maxDepth}`);
console.log(problems.length ? problems.join("\n") : "No problems found.");
if (list) for (const r of rows) console.log(`${r.path}\t${r.title}\t${r.words}`);
