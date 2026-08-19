/**
 * Verifies every image path referenced in data/images.ts exists on disk.
 * Run: node scripts/verify-local-images.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const imagesTs = fs.readFileSync(path.join(root, "data", "images.ts"), "utf8");
const paths = [...imagesTs.matchAll(/src: "(\/images\/[^"]+)"/g)].map((m) => m[1]);

let missing = 0;

for (const src of paths) {
  const file = path.join(root, "public", src.replace(/^\//, "").replace(/\//g, path.sep));
  if (!fs.existsSync(file)) {
    console.error(`MISSING ${src}`);
    missing++;
  } else {
    console.log(`OK      ${src}`);
  }
}

if (missing > 0) {
  console.error(`\n${missing} missing file(s). Run: node scripts/download-images.mjs`);
  process.exit(1);
}

console.log(`\nAll ${paths.length} local images present.`);
