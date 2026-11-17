import "server-only";
import { cookies } from "next/headers";
import { cache } from "react";
import { getBusiness, getDefaultBusiness, isClientLocked, withVariant } from "@/lib/businesses";
import type { ClientConfig } from "@/types/client-config";

/** Cookie set by the admin panel. Value is `<slug>` or `<slug>/<variant>`. */
export const ACTIVE_BUSINESS_COOKIE = "active-business";

export function encodeSelection(slug: string, variant?: string | null): string {
  return variant ? `${slug}/${variant}` : slug;
}

export function decodeSelection(value: string | undefined): { slug: string; variant?: string } | null {
  if (!value) return null;
  const [slug, variant] = value.split("/");
  if (!slug) return null;
  return { slug, variant };
}

/**
 * The business shown at `/` for this request: the admin's cookie selection when
 * it names a known business, otherwise the committed default. On a client's
 * locked deployment (CLIENT_SLUG) the cookie is ignored. Reads cookies, so
 * callers must sit inside a <Suspense> boundary. Memoised per request.
 */
export const getActiveBusiness = cache(async (): Promise<ClientConfig> => {
  const store = await cookies();
  if (isClientLocked()) return getDefaultBusiness();
  const selection = decodeSelection(store.get(ACTIVE_BUSINESS_COOKIE)?.value);
  if (selection) {
    const config = getBusiness(selection.slug);
    if (config) return withVariant(config, selection.variant);
  }
  return getDefaultBusiness();
});
