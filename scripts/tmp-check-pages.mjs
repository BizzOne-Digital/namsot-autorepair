// Temporary helper: render each route via the dev server and confirm every optimized image responds.
const base = process.argv[2] ?? "http://localhost:3000";

const routes = [
  "/",
  "/about",
  "/services",
  "/services/oil-change",
  "/shop",
  "/blog",
  "/blog/when-should-you-change-your-oil",
  "/team",
  "/gallery",
  "/testimonials",
  "/contact",
  "/booking",
  "/pricing",
  "/faq",
];

let failures = 0;

for (const route of routes) {
  let html;
  try {
    const res = await fetch(base + route);
    html = await res.text();
    if (!res.ok) {
      failures++;
      console.log(`PAGE BAD ${res.status} ${route}`);
      continue;
    }
  } catch (e) {
    failures++;
    console.log(`PAGE ERR ${route} ${e.message}`);
    continue;
  }

  const srcs = new Set(
    [...html.matchAll(/\/_next\/image\?url=[^"'\s\\]+/g)].map((m) =>
      m[0].replace(/&amp;/g, "&")
    )
  );

  let ok = 0;
  const bad = [];
  for (const src of srcs) {
    try {
      const r = await fetch(base + src);
      if (r.ok && (r.headers.get("content-type") ?? "").startsWith("image/")) ok++;
      else bad.push(`${r.status} ${decodeURIComponent(src).slice(0, 90)}`);
    } catch (e) {
      bad.push(`ERR ${e.message}`);
    }
  }

  failures += bad.length;
  console.log(
    `${bad.length ? "FAIL" : "OK  "} ${route.padEnd(38)} images=${srcs.size} ok=${ok}`
  );
  for (const b of bad) console.log(`      -> ${b}`);
}

console.log(`\n${failures === 0 ? "ALL PAGES + IMAGES OK" : `${failures} FAILURE(S)`}`);
process.exit(failures === 0 ? 0 : 1);
