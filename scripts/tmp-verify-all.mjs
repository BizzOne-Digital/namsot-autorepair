// Temporary helper: extract every Unsplash photo id referenced in source and confirm it resolves.
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const roots = ["app", "components", "data", "lib"];
const ids = new Map();

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
    } else if (/\.(tsx?|jsx?|css)$/.test(entry.name)) {
      const src = await readFile(full, "utf8");
      for (const m of src.matchAll(/photo-[0-9a-f]+-[0-9a-z]+/gi)) {
        if (!ids.has(m[0])) ids.set(m[0], []);
        ids.get(m[0]).push(full);
      }
    }
  }
}

for (const r of roots) await walk(r);

console.log(`Found ${ids.size} unique Unsplash photo ids\n`);

let bad = 0;
for (const [id, files] of ids) {
  const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&q=60`;
  try {
    const res = await fetch(url);
    if (!res.ok) bad++;
    console.log(
      `${res.ok ? "OK " : "BAD"} ${res.status} ${id}  <- ${[...new Set(files)].join(", ")}`
    );
  } catch (e) {
    bad++;
    console.log(`ERR --- ${id} ${e.message}`);
  }
}

console.log(`\n${bad === 0 ? "ALL IMAGE URLS OK" : `${bad} BROKEN URL(S)`}`);
process.exit(bad === 0 ? 0 : 1);
