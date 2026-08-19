import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const assetNames = [
  "c__Users_Muhammad_Memoon_AppData_Roaming_Cursor_User_workspaceStorage_2b4630893e416c11e7fd778481babb47_images_Gemini_Generated_Image_ck8l8lck8l8lck8l-removebg-preview-32ad1554-86b4-4aad-82bf-053aee92f620.png",
  "logo.png",
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

  const logoDest = path.join(root, "public", "logo.png");
  const iconDest = path.join(root, "app", "icon.png");

  fs.mkdirSync(path.dirname(logoDest), { recursive: true });
  fs.copyFileSync(src, logoDest);
  fs.copyFileSync(src, iconDest);

  console.log(`Copied logo from ${src}`);
  process.exit(0);
}

console.error("Logo source not found. Checked:", candidates);
process.exit(1);
