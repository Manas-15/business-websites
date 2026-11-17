// Fails the build if any "/clients/..." path referenced in src/ (code or JSON data) is missing from public/.
// Hosted https images are not checked.
// Runs automatically before `npm run build` (see "prebuild" in package.json).
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const srcDir = join(root, "src");
const publicDir = join(root, "public");
const pattern = /["'`](\/clients\/[^"'`\s)]+)["'`]/g;

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, files);
    else if (/\.(ts|tsx|json)$/.test(name)) files.push(path);
  }
  return files;
}

const missing = [];
let checked = 0;

for (const file of walk(srcDir)) {
  const text = readFileSync(file, "utf8");
  for (const match of text.matchAll(pattern)) {
    const assetPath = match[1];
    checked += 1;
    if (!existsSync(join(publicDir, assetPath))) {
      missing.push(`${relative(root, file)}: ${assetPath}`);
    }
  }
}

if (missing.length > 0) {
  console.error("Missing image or asset files referenced from source:");
  for (const entry of missing) console.error(`  - ${entry}`);
  process.exit(1);
}

console.log(`Asset check passed: ${checked} references found under public/clients.`);
