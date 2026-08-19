/**
 * Downloads curated real automotive workshop photos into public/images/.
 * Run: node scripts/download-images.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "public", "images");

/** Real Unsplash photography — auto repair workshops, lifts, and vehicles being serviced. */
const assets = [
  { file: "hero-auto-shop.jpg", id: "photo-1756575527484-2839c593ed84", w: 2400 },
  { file: "shop-service-bays.jpg", id: "photo-1597986346643-d54491ef85bb", w: 2400 },
  { file: "workshop-floor.jpg", id: "photo-1785338215401-51c15e4037b8", w: 2400 },
  { file: "mechanic-oil-service.jpg", id: "photo-1771340742493-52fbd5476ccb", w: 1600 },
  { file: "car-on-lift-workshop.jpg", id: "photo-1764122623556-90a7d480df53", w: 1600 },
  { file: "luxury-car-workshop.jpg", id: "photo-1786529622893-d0930335a22b", w: 1600 },
  { file: "technician-bay.jpg", id: "photo-1771340012319-0b4fca008b54", w: 2400 },
  { file: "mechanic-repairing.jpg", id: "photo-1786490001670-b2f1009030e2", w: 2400 },
  { file: "car-on-lift.jpg", id: "photo-1652852592938-15bf8c50ab6d", w: 2400 },
  { file: "auto-shop-front.jpg", id: "photo-1565580743984-49bf8ef4daa6", w: 2400 },
  { file: "shop-floor-lift.jpg", id: "photo-1669437921238-76df6d82668a", w: 2400 },
  { file: "mechanic-workshop.jpg", id: "photo-1676018366904-c083ed678e60", w: 2400 },
  { file: "busy-repair-shop.jpg", id: "photo-1646807284302-170c9505b2e7", w: 2400 },
  { file: "vehicles-in-shop.jpg", id: "photo-1727893327548-031c0f831cdb", w: 2400 },
  { file: "sports-car-workshop.jpg", id: "photo-1503376780353-7e6692767b70", w: 2400 },
  { file: "tools-wall.jpg", id: "photo-1530046339160-ce3e530c7d2f", w: 2400 },
  { file: "repair-shop-interior.jpg", id: "photo-1581094271453-1298de1aa392", w: 2400 },
  { file: "parts-shelves.jpg", id: "photo-1590227763209-821c686b932f", w: 2400 },
  { file: "garage-repair.jpg", id: "photo-1570645454423-28e4574ba515", w: 1600 },
  { file: "tire-service.jpg", id: "photo-1645445522156-9ac06bc7a767", w: 1200 },
  { file: "brake-service.jpg", id: "photo-1585747860715-2ba37e788b70", w: 1200 },
  { file: "brake-caliper.jpg", id: "photo-1760317890322-364a810cd4da", w: 1200 },
  { file: "engine-diagnostics.jpg", id: "photo-1632733711679-529326f6db12", w: 1200 },
  { file: "car-battery.jpg", id: "photo-1676337167752-2062c6ca7366", w: 1200 },
  { file: "alloy-wheel.jpg", id: "photo-1617788138017-80ad40651399", w: 1200 },
  { file: "engine-bay.jpg", id: "photo-1725289339928-06ee31684df5", w: 1200 },
  { file: "engine-maintenance.jpg", id: "photo-1486262715619-67b85e0b08d3", w: 1200 },
  { file: "inspection-service.jpg", id: "photo-1771340012378-3c86cb649193", w: 1200 },
  { file: "diagnostic-scan.jpg", id: "photo-1638729529430-c4307b3616ec", w: 1200 },
  { file: "tire-on-lift.jpg", id: "photo-1613214040468-d4d1cda18506", w: 1200 },
  { file: "mechanic-under-car.jpg", id: "photo-1656232976683-7b688560e427", w: 1200 },
  { file: "undercarriage-inspection.jpg", id: "photo-1764869427688-3e97480f4b82", w: 1200 },
  { file: "alignment-equipment.jpg", id: "photo-1658351354155-e854d19233e0", w: 1200 },
  { file: "tire-closeup.jpg", id: "photo-1727582921142-c1ec394c2ced", w: 1200 },
  { file: "ac-dashboard.jpg", id: "photo-1762250320345-8cbbd44637d4", w: 1200 },
  { file: "winter-driving.jpg", id: "photo-1579385509017-a5864e8c7c4d", w: 1200 },
  { file: "product-oil.jpg", id: "photo-1746014995485-e8a698f39804", w: 800 },
  { file: "product-oil-filter.jpg", id: "photo-1552195634-fdabf904f26e", w: 800 },
  { file: "mechanic-at-work.jpg", id: "photo-1558618666-fcd25c85cd64", w: 900 },
  { file: "mechanic-portrait.jpg", id: "photo-1554178562-3d08ff874bd8", w: 900 },
  { file: "technician-diagnostics.jpg", id: "photo-1581091224003-01e7c2e69f6f", w: 900 },
  { file: "oil-service-engine.jpg", id: "photo-1677230017881-a7bd1fb08d36", w: 1200 },
  // Service page cards — workshop + premium vehicles
  { file: "service-vehicle-on-lift.jpg", id: "photo-1764122623556-90a7d480df53", w: 1400 },
  { file: "service-porsche.jpg", id: "photo-1503376780353-7e6692767b70", w: 1400 },
  { file: "service-luxury-workshop.jpg", id: "photo-1786529622893-d0930335a22b", w: 2400 },
  { file: "service-luxury-performance.jpg", id: "photo-1542362567-b07e54358753", w: 1400 },
  { file: "service-premium-suv.jpg", id: "photo-1606664515524-ed2f786a0bd6", w: 1400 },
];

fs.mkdirSync(outDir, { recursive: true });

let failed = 0;

for (const { file, id, w } of assets) {
  const dest = path.join(outDir, file);
  const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`FAIL ${res.status} ${file} (${id})`);
      failed++;
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    console.log(`OK   ${file}`);
  } catch (error) {
    console.error(`ERR  ${file}: ${error.message}`);
    failed++;
  }
}

if (failed > 0) {
  console.error(`\n${failed} image(s) failed to download.`);
  process.exit(1);
}

console.log(`\nAll ${assets.length} images saved to public/images/`);
