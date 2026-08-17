// Temporary helper: one gentle pass over every route, checking a single image variant at a time.
const base = "http://localhost:3000";

const routes = [
  "/", "/about", "/services", "/services/oil-change", "/shop", "/blog",
  "/blog/when-should-you-change-your-oil", "/team", "/gallery",
  "/testimonials", "/contact", "/booking", "/pricing", "/faq",
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getWithRetry(url, attempts = 3) {
  for (let i = 0; i < attempts; i++) {
    try {
      const r = await fetch(url);
      if (r.ok) return r;
      if (r.status !== 500 && r.status !== 504) return r;
    } catch {
      /* retry */
    }
    await sleep(1500 * (i + 1));
  }
  return null;
}

let bad = 0;

for (const route of routes) {
  const res = await fetch(base + route);
  const html = await res.text();

  // One representative variant per distinct upstream photo on the page.
  const byPhoto = new Map();
  for (const m of html.matchAll(/\/_next\/image\?url=[^"'\s\\]+/g)) {
    const src = m[0].replace(/&amp;/g, "&");
    const id = decodeURIComponent(src).match(/photo-[0-9a-z-]+/i)?.[0];
    if (id && !byPhoto.has(id)) byPhoto.set(id, src);
  }

  const failed = [];
  for (const [id, src] of byPhoto) {
    const r = await getWithRetry(base + src);
    const ok = r && r.ok && (r.headers.get("content-type") ?? "").startsWith("image/");
    if (!ok) failed.push(`${id} (${r ? r.status : "network"})`);
    await sleep(600);
  }

  bad += failed.length;
  console.log(
    `${failed.length ? "FAIL" : "OK  "} ${route.padEnd(38)} page=${res.status} photos=${byPhoto.size}`
  );
  for (const f of failed) console.log(`      -> ${f}`);
}

console.log(`\n${bad === 0 ? "ALL ROUTES AND IMAGES OK" : `${bad} image(s) failing`}`);
