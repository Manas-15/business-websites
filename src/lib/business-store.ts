import "server-only";
import { access, constants, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { ClientConfigError, validateClientConfig } from "@/lib/validate-client-config";

/*
 * Writes to the JSON files under src/data/. This only works where the source
 * tree is present and writable, i.e. on the developer's machine. Hosted builds
 * (Netlify) have no source tree, so every write reports that clearly instead
 * of failing silently. Cookie-based switching still works everywhere.
 */

const DATA_DIR = join(process.cwd(), "src", "data");
export const BUSINESSES_FILE = join(DATA_DIR, "businesses.json");
export const ACTIVE_FILE = join(DATA_DIR, "active-business.json");

export async function canWriteData(): Promise<boolean> {
  if (process.env.NODE_ENV === "production") return false;
  try {
    await access(BUSINESSES_FILE, constants.W_OK);
    await access(ACTIVE_FILE, constants.W_OK);
    return true;
  } catch {
    return false;
  }
}

export async function writeDefaultBusiness(slug: string, templateVariant: string | null): Promise<void> {
  await writeFile(ACTIVE_FILE, `${JSON.stringify({ slug, templateVariant }, null, 2)}\n`, "utf8");
}

export interface ImportResult {
  added: string[];
  updated: string[];
}

/**
 * Validates pasted JSON (one business object or an array) and merges it into
 * businesses.json by slug. Existing slugs are replaced; new ones are appended.
 * Throws with a readable message listing every problem.
 */
export async function importBusinesses(jsonText: string): Promise<ImportResult> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch (error) {
    throw new Error(`That is not valid JSON: ${error instanceof Error ? error.message : String(error)}`);
  }
  const incoming = Array.isArray(parsed) ? parsed : [parsed];
  if (incoming.length === 0) throw new Error("The array is empty. Paste at least one business.");

  const problems: string[] = [];
  const validated = incoming.map((entry, index) => {
    try {
      return validateClientConfig(entry);
    } catch (error) {
      const label = typeof (entry as { slug?: unknown })?.slug === "string" ? (entry as { slug: string }).slug : `item ${index + 1}`;
      const detail = error instanceof ClientConfigError ? error.issues.join("; ") : String(error);
      problems.push(`${label}: ${detail}`);
      return undefined;
    }
  });
  if (problems.length > 0) throw new Error(problems.join("\n"));

  const current = JSON.parse(await readFile(BUSINESSES_FILE, "utf8")) as Array<{ slug: string }>;
  const result: ImportResult = { added: [], updated: [] };

  for (const [index, config] of validated.entries()) {
    if (!config) continue;
    const raw = incoming[index];
    const position = current.findIndex((item) => item.slug === config.slug);
    if (position === -1) {
      current.push(raw as { slug: string });
      result.added.push(config.slug);
    } else {
      current[position] = raw as { slug: string };
      result.updated.push(config.slug);
    }
  }

  await writeFile(BUSINESSES_FILE, `${JSON.stringify(current, null, 2)}\n`, "utf8");
  return result;
}
