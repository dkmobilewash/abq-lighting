/**
 * Validates every page's JSON-LD against the schema.org vocabulary (via the schema-dts type
 * definitions): each @type must exist and each property must be defined on that type or one
 * of its ancestors.
 *   node scripts/validate-schema.mjs [baseUrl]
 */
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const dts = readFileSync(require.resolve("schema-dts/dist/schema.d.ts"), "utf8");

// interface FooBase extends BarBase, BazBase { "prop"?: ...; }
const parents = new Map();
const props = new Map();
for (const m of dts.matchAll(/interface (\w+)Base(?: extends ([^{]+))? \{([\s\S]*?)\n\}/g)) {
  const name = m[1];
  parents.set(name, [...(m[2] || "").matchAll(/(\w+)Base\b/g)].map((x) => x[1]));
  props.set(name, new Set([...m[3].matchAll(/"(\w+)"\??:/g)].map((x) => x[1])));
}
// Types without their own Base interface: interface FooLeaf extends BarBase
for (const m of dts.matchAll(/interface (\w+)Leaf extends (\w+)Base \{/g)) {
  if (!parents.has(m[1])) { parents.set(m[1], [m[2]]); props.set(m[1], new Set()); }
}
const typeExists = (t) => parents.has(t) || new RegExp(`(type|interface) ${t}(Leaf)?\\b`).test(dts);
function hasProp(type, prop, seen = new Set()) {
  if (seen.has(type)) return false;
  seen.add(type);
  if (props.get(type)?.has(prop)) return true;
  return (parents.get(type) || []).some((p) => hasProp(p, prop, seen));
}

const base = (process.argv[2] || "http://localhost:3100").replace(/\/$/, "");
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, ""));
const problems = new Set();
let nodes = 0;

function check(node, where) {
  if (Array.isArray(node)) return node.forEach((n) => check(n, where));
  if (!node || typeof node !== "object") return;
  const types = node["@type"] ? [].concat(node["@type"]) : [];
  if (types.length) nodes++;
  for (const t of types) if (!typeExists(t)) problems.add(`${where}: unknown @type ${t}`);
  for (const [k, v] of Object.entries(node)) {
    if (k.startsWith("@")) continue;
    if (types.length && !types.some((t) => hasProp(t, k))) problems.add(`${where}: ${types.join("+")} has no property "${k}"`);
    check(v, where);
  }
}

for (const p of paths) {
  const html = await (await fetch(base + p)).text();
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) check(JSON.parse(m[1])["@graph"], p);
}
console.log(`Checked ${nodes} typed nodes on ${paths.length} pages against schema.org.`);
console.log(problems.size ? [...problems].join("\n") : "All types and properties are valid schema.org.");
