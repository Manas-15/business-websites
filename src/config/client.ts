import { getDefaultBusiness } from "@/lib/businesses";

/**
 * The business a production build is committed to. The home page prefers the
 * admin panel's cookie selection (see src/lib/active-business.ts); the sitemap,
 * robots file and template showcase use this default. Content for every
 * business lives in src/data/businesses.json.
 */
export const clientConfig = getDefaultBusiness();
