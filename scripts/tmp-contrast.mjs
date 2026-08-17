// Temporary helper: simulate the hero overlay stack and measure text contrast over each hero photo.
import sharp from "sharp";

const CHARCOAL = [0x1a, 0x1a, 0x1a];
const OFF_WHITE = [0xf8, 0xf8, 0xf8];

// Hero viewport used for the simulation (desktop).
const W = 1440;
const H = 620;

// Candidate tuning: stronger photo presence, lighter gradients.
const HOME_IMG = 0.75;
const PAGE_IMG = 0.7;
const HORIZ = [0.9, 0.7, 0.3]; // from / via / to
const VERT = [0.7, 0.0, 0.3]; // bottom / middle / top

const heroes = [
  { page: "/ (home)", id: "photo-1756575527484-2839c593ed84", imgAlpha: HOME_IMG, posX: 0.5 },
  { page: "/about", id: "photo-1597986346643-d54491ef85bb", imgAlpha: PAGE_IMG, posX: 0.6 },
  { page: "/services", id: "photo-1771340012319-0b4fca008b54", imgAlpha: PAGE_IMG, posX: 0.65 },
  { page: "/shop", id: "photo-1590227763209-821c686b932f", imgAlpha: PAGE_IMG, posX: 0.6 },
  { page: "/blog", id: "photo-1676018366904-c083ed678e60", imgAlpha: PAGE_IMG, posX: 0.6 },
  { page: "/team", id: "photo-1646807284302-170c9505b2e7", imgAlpha: PAGE_IMG, posX: 0.6 },
  { page: "/gallery", id: "photo-1669437921238-76df6d82668a", imgAlpha: PAGE_IMG, posX: 0.65 },
  { page: "/testimonials", id: "photo-1727893327548-031c0f831cdb", imgAlpha: PAGE_IMG, posX: 0.35 },
  { page: "/contact", id: "photo-1565580743984-49bf8ef4daa6", imgAlpha: PAGE_IMG, posX: 0.65 },
  { page: "/booking", id: "photo-1652852592938-15bf8c50ab6d", imgAlpha: PAGE_IMG, posX: 0.6 },
  { page: "/pricing", id: "photo-1530046339160-ce3e530c7d2f", imgAlpha: PAGE_IMG, posX: 0.6 },
  { page: "/faq", id: "photo-1730461748617-1ad7e6e56db2", imgAlpha: PAGE_IMG, posX: 0.6 },
];

const lerp = (a, b, t) => a + (b - a) * t;

function horizAlpha(t) {
  const [f, v, to] = HORIZ;
  return t < 0.5 ? lerp(f, v, t / 0.5) : lerp(v, to, (t - 0.5) / 0.5);
}

function vertAlpha(yFrac) {
  const [bottom, mid, top] = VERT;
  const t = 1 - yFrac;
  return t < 0.5 ? lerp(bottom, mid, t / 0.5) : lerp(mid, top, (t - 0.5) / 0.5);
}

function srgbToLin(c) {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function relLum([r, g, b]) {
  return 0.2126 * srgbToLin(r) + 0.7152 * srgbToLin(g) + 0.0722 * srgbToLin(b);
}

function contrast(a, b) {
  const [hi, lo] = [relLum(a), relLum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const textLum = relLum(OFF_WHITE);

console.log("Simulated hero text contrast (off-white text over composited background)\n");

let worstOverall = Infinity;

for (const hero of heroes) {
  const url = `https://images.unsplash.com/${hero.id}?auto=format&fit=crop&w=2400&q=80`;
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());

  // object-cover + object-position
  const meta = await sharp(buf).metadata();
  const scale = Math.max(W / meta.width, H / meta.height);
  const sw = Math.round(meta.width * scale);
  const sh = Math.round(meta.height * scale);
  const left = Math.round((sw - W) * hero.posX);
  const top = Math.round((sh - H) * 0.5);

  const { data } = await sharp(buf)
    .resize(sw, sh)
    .extract({ left, top, width: W, height: H })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Text block region: left-aligned copy inside the container.
  const x0 = Math.round(W * 0.06);
  const x1 = Math.round(W * 0.55);
  const y0 = Math.round(H * 0.3);
  const y1 = Math.round(H * 0.75);

  let worst = Infinity;
  let sum = 0;
  let n = 0;

  for (let y = y0; y < y1; y += 2) {
    for (let x = x0; x < x1; x += 2) {
      const i = (y * W + x) * 3;
      let px = [data[i], data[i + 1], data[i + 2]];

      // Layer 1: photo at reduced opacity over charcoal.
      px = px.map((c, k) => c * hero.imgAlpha + CHARCOAL[k] * (1 - hero.imgAlpha));
      // Layer 2: horizontal charcoal gradient.
      const ha = horizAlpha(x / W);
      px = px.map((c, k) => c * (1 - ha) + CHARCOAL[k] * ha);
      // Layer 3: vertical charcoal gradient.
      const va = vertAlpha(y / H);
      px = px.map((c, k) => c * (1 - va) + CHARCOAL[k] * va);

      const cr = (textLum + 0.05) / (relLum(px) + 0.05);
      if (cr < worst) worst = cr;
      sum += cr;
      n++;
    }
  }

  worstOverall = Math.min(worstOverall, worst);
  const verdict = worst >= 4.5 ? "PASS AAA-body" : worst >= 3 ? "PASS large-text" : "FAIL";
  console.log(
    `${verdict.padEnd(16)} ${hero.page.padEnd(16)} worst=${worst.toFixed(1)}:1  avg=${(sum / n).toFixed(1)}:1`
  );
}

console.log(
  `\nLowest contrast anywhere in a hero text area: ${worstOverall.toFixed(1)}:1 (WCAG AA needs 4.5:1 body / 3:1 large)`
);
console.log(`Plain charcoal reference (no photo): ${contrast(OFF_WHITE, CHARCOAL).toFixed(1)}:1`);
