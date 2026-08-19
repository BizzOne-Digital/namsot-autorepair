import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const assetNames = [
  "c__Users_Muhammad_Memoon_AppData_Roaming_Cursor_User_workspaceStorage_2b4630893e416c11e7fd778481babb47_images_Gemini_Generated_Image_97dx5m97dx5m97dx-b9d4a27d-d034-408d-8964-4cc31a9daf99.png",
  "c__Users_Muhammad_Memoon_AppData_Roaming_Cursor_User_workspaceStorage_2b4630893e416c11e7fd778481babb47_images_7a3d9d69-7653-4f16-9d97-90137937f12a-350f39ab-30c4-4672-b38b-250924f55744.png",
];

const candidates = assetNames.flatMap((assetName) => [
  path.join(root, "assets", assetName),
  path.join(
    process.env.USERPROFILE ?? "",
    ".cursor",
    "projects",
    "d-projects-Namsot-autorepair",
    "assets",
    assetName,
  ),
]);

for (const src of candidates) {
  if (!fs.existsSync(src)) continue;

  const logoDest = path.join(root, "public", "logo.jpg");
  const iconDest = path.join(root, "app", "icon.jpg");

  fs.mkdirSync(path.dirname(logoDest), { recursive: true });
  fs.copyFileSync(src, logoDest);
  fs.copyFileSync(src, iconDest);

  console.log(`Copied logo from ${src}`);
  process.exit(0);
}

console.error("Logo source not found. Checked:", candidates);
process.exit(1);
