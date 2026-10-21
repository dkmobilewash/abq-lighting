/**
 * Generates stylized placeholder images (night roofline illustrations) into
 * public/images/placeholders/. Run: node scripts/generate-placeholders.mjs
 * TODO-replace every output with real photography before launch.
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "public/images/placeholders");
mkdirSync(OUT, { recursive: true });

const W = 1600;
const H = 1000;
const GROUND = 820;

const WARM = ["#FFD9A0"];
const XMAS = ["#E11D48", "#16A34A", "#F8FAFC"];
const AMBER = ["#F59E0B", "#FBBF24", "#FB923C"];

// --- shapes: each returns { body: svg string, lights: [[x,y],...] polylines } ---
const shapes = {
  parapet() {
    const pts = [[260, GROUND], [260, 520], [420, 520], [420, 470], [700, 470], [700, 430], [980, 430], [980, 490], [1340, 490], [1340, GROUND]];
    return {
      body: poly(pts, "#1E2638") + windows([[330, 600], [520, 580], [800, 560], [1100, 600], [1230, 600]]) + canales([[420, 500], [980, 460]]),
      lights: [pts.slice(1, -1)],
    };
  },
  pitched() {
    const roof = [[220, 560], [800, 330], [1380, 560]];
    return {
      body: poly([[260, GROUND], [260, 560], [1340, 560], [1340, GROUND]], "#1E2638") + poly([[200, 570], [800, 320], [1400, 570]], "#151C2C") + windows([[360, 640], [700, 640], [1050, 640]]),
      lights: [roof],
    };
  },
  twostory() {
    const roof = [[300, 400], [700, 250], [1100, 400]];
    const lower = [[1060, 560], [1250, 470], [1440, 560]];
    return {
      body: poly([[330, GROUND], [330, 400], [1070, 400], [1070, GROUND]], "#1E2638") + poly([[1070, GROUND], [1070, 560], [1420, 560], [1420, GROUND]], "#1A2233") + poly([[280, 410], [700, 240], [1120, 410]], "#151C2C") + poly([[1050, 570], [1250, 460], [1450, 570]], "#151C2C") + windows([[420, 470], [640, 470], [860, 470], [420, 660], [860, 660], [1180, 660]]),
      lights: [roof, lower],
    };
  },
  wall() {
    const cap = [[0, 640], [1600, 640]];
    return {
      body: poly([[200, 640], [200, 420], [900, 420], [900, 640]], "#161D2D") + rect(0, 640, 1600, GROUND - 640, "#222B3F") + pillars(),
      lights: [cap],
    };
  },
  landscape() {
    const eaves = [[300, 500], [1300, 500]];
    return {
      body: poly([[300, GROUND], [300, 500], [1300, 500], [1300, GROUND]], "#1E2638") + windows([[420, 600], [800, 600], [1100, 600]]) + desertPlants(),
      lights: [eaves],
      spots: [[200, 780], [560, 800], [1000, 790], [1420, 780]],
    };
  },
  portal() {
    const beam = [[200, 470], [1400, 470]];
    return {
      body: poly([[160, GROUND], [160, 380], [1440, 380], [1440, GROUND]], "#1A2233") + rect(200, 470, 1200, 30, "#3A2A1C") + posts([260, 560, 860, 1160, 1360]) + windows([[420, 600], [1000, 600]]),
      lights: [beam],
    };
  },
  storefront() {
    const outline = [[220, GROUND], [220, 360], [1380, 360], [1380, GROUND]];
    return {
      body: poly(outline, "#1E2638") + rect(300, 560, 1000, 260, "#2C3A55") + rect(300, 440, 1000, 70, "#111827"),
      lights: [outline],
    };
  },
  lot() {
    const roof = [[300, 430], [1300, 430]];
    return {
      body: poly([[300, 720], [300, 430], [1300, 430], [1300, 720]], "#1E2638") + rect(340, 520, 920, 200, "#2C3A55") + cars(),
      lights: [roof, [[0, 760], [1600, 760]]],
    };
  },
  entrance() {
    const pts = [[260, GROUND], [260, 560], [700, 500], [900, 500], [1340, 560], [1340, GROUND]];
    return {
      body: poly(pts, "#2A2F3F") + rect(620, 600, 360, 120, "#1A2233"),
      lights: [pts.slice(1, -1)],
    };
  },
  mountain() {
    const roof = [[260, 560], [800, 300], [1340, 560]];
    return {
      body: poly([[300, GROUND], [300, 560], [1300, 560], [1300, GROUND]], "#2A2118") + poly([[230, 575], [800, 285], [1370, 575]], "#3B4252") + pines() + windows([[420, 640], [760, 640], [1080, 640]]),
      lights: [roof],
    };
  },
  adobe() {
    const pts = [[260, GROUND], [260, 540], [760, 540], [760, 500], [1340, 500], [1340, GROUND]];
    return {
      body: poly(pts, "#3A2A20") + vigas([[300, 560], [380, 560], [460, 560], [820, 520], [900, 520], [980, 520]]) + windows([[400, 640], [960, 640], [1180, 640]]),
      lights: [pts.slice(1, -1)],
    };
  },
  ranch() {
    const roof = [[160, 590], [500, 470], [1100, 470], [1440, 590]];
    return {
      body: poly([[220, GROUND], [220, 590], [1380, 590], [1380, GROUND]], "#1E2638") + poly([[140, 600], [500, 460], [1100, 460], [1460, 600]], "#151C2C") + windows([[340, 660], [700, 660], [1060, 660]]),
      lights: [roof],
    };
  },
};

const images = [
  // hero image is now a real photo: public/images/hero-albuquerque-stucco-home-night.jpg
  ["roofline-stucco-home-night", "pitched", WARM],
  ["parapet-pueblo-revival-night", "parapet", WARM],
  ["territorial-home-warm-white", "adobe", WARM],
  ["fence-block-wall-lights", "wall", WARM],
  ["landscape-xeriscape-lights", "landscape", WARM],
  ["patio-portal-lights", "portal", WARM],
  ["ramada-pergola-lights", "portal", ["#FFE4B5", "#FFD9A0"]],
  ["security-warm-white-entry", "ranch", ["#FFF1D6"]],
  ["commercial-storefront-night", "storefront", ["#22D3EE", "#3B82F6"]],
  ["restaurant-patio-lights", "portal", ["#FBBF24", "#F472B6"]],
  ["car-dealership-lot-night", "lot", ["#3B82F6", "#F8FAFC"]],
  ["hoa-community-entrance", "entrance", WARM],
  ["christmas-roofline-colors", "twostory", XMAS],
  ["holiday-orange-purple", "pitched", ["#F97316", "#A855F7"]],
  ["luminaria-amber-glow", "adobe", AMBER],
  ["balloon-fiesta-colors", "parapet", ["#EF4444", "#F59E0B", "#FDE047", "#22C55E", "#3B82F6", "#A855F7"]],
  ["game-day-red-silver", "ranch", ["#B91C1C", "#CBD5E1"]],
  ["ranch-home-night", "ranch", WARM],
  ["mountain-home-night", "mountain", WARM],
  ["valley-adobe-night", "adobe", WARM],
  ["new-build-two-story-night", "twostory", WARM],
  ["og-background", "parapet", ["#22D3EE", "#3B82F6"]],
];

for (const [name, shape, colors] of images) {
  await render(name, svgScene(shapes[shape](), colors, { night: true }));
}
// Before/after pair for the "Invisible by Day" slider (same house).
await render("before-day-home", svgScene(shapes.parapet(), WARM, { night: false }));
await render("after-night-home", svgScene(shapes.parapet(), ["#FFD9A0", "#22D3EE"], { night: true }));
await renderPhone();
console.log("done");

// ---------------- helpers ----------------
function svgScene(shape, colors, { night }) {
  const sky = night
    ? `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#050913"/><stop offset="0.7" stop-color="#0E1A33"/><stop offset="1" stop-color="#1B2A4A"/></linearGradient>`
    : `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7DB7E8"/><stop offset="1" stop-color="#D7E9F7"/></linearGradient>`;
  const stars = night ? Array.from({ length: 70 }, (_, i) => {
    const x = (i * 337) % W, y = (i * 191) % 380;
    return `<circle cx="${x}" cy="${y}" r="${(i % 3) * 0.6 + 0.6}" fill="#fff" opacity="${0.3 + (i % 5) / 10}"/>`;
  }).join("") : "";
  const mtn = `<path d="M0 ${GROUND - 260} L180 ${GROUND - 330} L420 ${GROUND - 420} L640 ${GROUND - 470} L860 ${GROUND - 440} L1100 ${GROUND - 380} L1350 ${GROUND - 320} L1600 ${GROUND - 280} L1600 ${GROUND} L0 ${GROUND} Z" fill="${night ? "#0A1222" : "#9BAFC4"}"/>`;
  const ground = `<rect x="0" y="${GROUND}" width="${W}" height="${H - GROUND}" fill="${night ? "#0B0F18" : "#C9B79A"}"/>`;
  let body = shape.body;
  if (!night) body = body.replace(/fill="#[0-9A-Fa-f]{6}"/g, () => `fill="#D9C3A5"`);
  let lights = "";
  if (night) {
    for (const line of shape.lights) {
      const dots = dotsAlong(line, 22);
      lights += `<g filter="url(#glow)">${dots.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="7" fill="${colors[i % colors.length]}"/>`).join("")}</g>`;
      lights += dots.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#fff" opacity="0.9"/>`).join("");
    }
    for (const [x, y] of shape.spots || []) {
      lights += `<ellipse cx="${x}" cy="${y - 120}" rx="70" ry="160" fill="${colors[0]}" opacity="0.18" filter="url(#soft)"/>`;
    }
  } else {
    for (const line of shape.lights) {
      lights += `<polyline points="${line.map((p) => p.join(",")).join(" ")}" fill="none" stroke="#C8B08F" stroke-width="5"/>`;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>${sky}
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9"/></filter>
    <filter id="soft"><feGaussianBlur stdDeviation="30"/></filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/>${stars}${mtn}${ground}${body}${lights}
  <text x="40" y="${H - 34}" font-family="sans-serif" font-size="22" fill="${night ? "#64748B" : "#5B4A33"}">PLACEHOLDER IMAGE: replace with real project photo</text>
</svg>`;
}

function dotsAlong(points, spacing) {
  const out = [];
  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i], [x2, y2] = points[i + 1];
    const len = Math.hypot(x2 - x1, y2 - y1);
    const n = Math.max(1, Math.round(len / spacing));
    for (let k = 0; k < n; k++) out.push([x1 + ((x2 - x1) * k) / n, y1 + ((y2 - y1) * k) / n]);
  }
  out.push(points[points.length - 1]);
  return out;
}

function poly(pts, fill) { return `<polygon points="${pts.map((p) => p.join(",")).join(" ")}" fill="${fill}"/>`; }
function rect(x, y, w, h, fill) { return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>`; }
function windows(list) { return list.map(([x, y]) => `<rect x="${x}" y="${y}" width="90" height="110" rx="4" fill="#F5C77E" opacity="0.55"/>`).join(""); }
function canales(list) { return list.map(([x, y]) => `<rect x="${x - 10}" y="${y}" width="20" height="60" fill="#3A2A1C"/>`).join(""); }
function vigas(list) { return list.map(([x, y]) => `<rect x="${x}" y="${y}" width="40" height="16" rx="6" fill="#4B3626"/>`).join(""); }
function posts(xs) { return xs.map((x) => `<rect x="${x}" y="500" width="24" height="${GROUND - 500}" fill="#3A2A1C"/>`).join(""); }
function pillars() { return [80, 520, 980, 1440].map((x) => `<rect x="${x}" y="600" width="60" height="${GROUND - 600}" fill="#2A3449"/>`).join(""); }
function desertPlants() {
  return [[200, GROUND], [560, GROUND], [1000, GROUND], [1420, GROUND]].map(([x, y]) =>
    `<path d="M${x} ${y} l-40 -90 l40 60 l0 -110 l20 110 l40 -70 l-30 100 Z" fill="#1F3A2C"/>`).join("") +
    `<ellipse cx="760" cy="${GROUND - 10}" rx="90" ry="40" fill="#2B2F38"/>`;
}
function pines() {
  return [120, 1480].map((x) => `<polygon points="${x},${GROUND} ${x - 70},${GROUND} ${x},${GROUND - 300} ${x + 70},${GROUND}" fill="#0F2A1E"/>`).join("");
}
function cars() {
  return [140, 420, 700, 980, 1260].map((x) => `<rect x="${x}" y="${GROUND - 20}" width="200" height="70" rx="20" fill="#334155"/>`).join("");
}

async function render(name, svg) {
  await sharp(Buffer.from(svg)).jpeg({ quality: 78, mozjpeg: true }).toFile(join(OUT, `${name}.jpg`));
}

async function renderPhone() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
  <rect width="800" height="1000" fill="#0B1220"/>
  <rect x="230" y="80" width="340" height="700" rx="48" fill="#111A2E" stroke="#334155" stroke-width="6"/>
  <rect x="260" y="140" width="280" height="160" rx="16" fill="#1E293B"/>
  ${["#FFD9A0", "#E11D48", "#16A34A", "#F97316", "#A855F7", "#22D3EE", "#F2B705", "#C2410C"].map((c, i) => `<circle cx="${300 + (i % 4) * 66}" cy="${380 + Math.floor(i / 4) * 80}" r="26" fill="${c}"/>`).join("")}
  <rect x="260" y="560" width="280" height="44" rx="22" fill="#22D3EE"/>
  <rect x="260" y="620" width="280" height="44" rx="22" fill="#1E293B"/>
  <rect x="260" y="680" width="280" height="44" rx="22" fill="#1E293B"/>
  <text x="400" y="880" text-anchor="middle" font-family="sans-serif" font-size="22" fill="#64748B">PLACEHOLDER: replace with app screenshot</text>
</svg>`;
  await render("app-phone-mockup", svg);
}
