// Sets the committed default business (and optional variant) without opening the admin panel.
//   npm run use -- kalinga-kitchen
//   npm run use -- kalinga-kitchen luxury
//   npm run use            (lists the available slugs)
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const businessesFile = join(root, "src", "data", "businesses.json");
const activeFile = join(root, "src", "data", "active-business.json");

const businesses = JSON.parse(readFileSync(businessesFile, "utf8"));

const [slug, variant] = process.argv.slice(2);
const list = () =>
  businesses.map((b) => `  ${b.slug.padEnd(24)} ${b.businessType} · ${b.templateVariant}  ${b.business?.name ?? ""}`).join("\n");

if (!slug) {
  console.log(`Current default: ${JSON.parse(readFileSync(activeFile, "utf8")).slug}\n\nAvailable businesses:\n${list()}`);
  process.exit(0);
}

const match = businesses.find((b) => b.slug === slug);
if (!match) {
  console.error(`No business with slug "${slug}". Available:\n${list()}`);
  process.exit(1);
}

writeFileSync(activeFile, `${JSON.stringify({ slug, templateVariant: variant ?? null }, null, 2)}\n`, "utf8");
console.log(`Default set to ${match.business?.name ?? slug}${variant ? ` (${variant})` : ""}. Commit src/data/active-business.json to ship it.`);
