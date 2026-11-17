import activeDefault from "@/data/active-business.json";
import businessesJson from "@/data/businesses.json";
import { ClientConfigError, validateClientConfig } from "@/lib/validate-client-config";
import { IMPLEMENTED_VARIANTS, type ClientConfig } from "@/types/client-config";

/*
 * Every business the admin panel can switch between lives in
 * src/data/businesses.json, an array of client configs. Each entry is validated
 * when this module loads, so a bad record fails the build with its slug and the
 * list of problems instead of breaking a page at request time.
 */

function loadBusinesses(): ClientConfig[] {
  const raw: unknown = businessesJson;
  if (!Array.isArray(raw)) throw new Error("src/data/businesses.json must be an array of businesses");

  const seen = new Set<string>();
  return raw.map((entry, index) => {
    const label = typeof entry?.slug === "string" ? entry.slug : `#${index}`;
    try {
      const config = validateClientConfig(entry);
      if (seen.has(config.slug)) throw new Error(`businesses.json: slug "${config.slug}" is used more than once`);
      seen.add(config.slug);
      return config;
    } catch (error) {
      if (error instanceof ClientConfigError) {
        throw new Error(`businesses.json entry "${label}" is invalid:\n - ${error.issues.join("\n - ")}`);
      }
      throw error;
    }
  });
}

export const businesses: ClientConfig[] = loadBusinesses();

export function getBusiness(slug: string): ClientConfig | undefined {
  return businesses.find((business) => business.slug === slug);
}

/** True when `variant` is a finished template for this business type. */
export function isVariantOf(config: ClientConfig, variant: string): boolean {
  const variants: readonly string[] = IMPLEMENTED_VARIANTS[config.businessType];
  return variants.includes(variant);
}

/** Same business rendered with another template variant. Unknown variants are ignored. */
export function withVariant(config: ClientConfig, variant: string | null | undefined): ClientConfig {
  if (!variant || variant === config.templateVariant || !isVariantOf(config, variant)) return config;
  return { ...config, templateVariant: variant } as ClientConfig;
}

function readEnv(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

/**
 * The slug a paid client's deployment is locked to, from the CLIENT_SLUG
 * environment variable. When set, the site shows only this business: the admin
 * panel is disabled, the switcher cookie is ignored, and /s/ links for every
 * other business return 404. Leave it unset on the demo deployment.
 */
export function getLockedSlug(): string | undefined {
  return readEnv("CLIENT_SLUG");
}

/** True on a paid client's deployment (CLIENT_SLUG is set). */
export function isClientLocked(): boolean {
  return getLockedSlug() !== undefined;
}

/**
 * Businesses that /s/<slug> share links may show on this deployment: all of
 * them on the demo site, only the locked one on a client's site.
 */
export function getShareableBusinesses(): ClientConfig[] {
  const locked = getLockedSlug();
  if (!locked) return businesses;
  // Validates CLIENT_SLUG and CLIENT_VARIANT, throwing a readable build error.
  getDefaultBusiness();
  return businesses.filter((business) => business.slug === locked);
}

export function getShareableBusiness(slug: string): ClientConfig | undefined {
  const locked = getLockedSlug();
  if (locked && slug !== locked) return undefined;
  return getBusiness(slug);
}

/**
 * The business a production build shows at `/` when no admin selection cookie
 * is present. CLIENT_SLUG (and optionally CLIENT_VARIANT) take priority; without
 * them it comes from src/data/active-business.json, set from the admin panel or
 * with `npm run use -- <slug>`.
 */
export function getDefaultBusiness(): ClientConfig {
  const locked = getLockedSlug();
  const slug = locked ?? activeDefault.slug;
  const config = getBusiness(slug);
  if (!config) {
    const source = locked ? "The CLIENT_SLUG environment variable" : "src/data/active-business.json";
    throw new Error(
      `${source} points at "${slug}", which is not in businesses.json. Known slugs: ${businesses
        .map((business) => business.slug)
        .join(", ")}`,
    );
  }
  if (locked) {
    const variant = readEnv("CLIENT_VARIANT");
    if (variant && !isVariantOf(config, variant)) {
      throw new Error(
        `CLIENT_VARIANT "${variant}" is not a ${config.businessType} variant. Use one of: ${IMPLEMENTED_VARIANTS[config.businessType].join(", ")}`,
      );
    }
    return withVariant(config, variant);
  }
  return withVariant(config, activeDefault.templateVariant);
}
