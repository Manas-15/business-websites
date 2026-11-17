const FALLBACK_SITE_URL = "http://localhost:3000";

/**
 * The public URL of the deployed site, from NEXT_PUBLIC_SITE_URL. Used for
 * canonical links, Open Graph URLs, structured data and the sitemap.
 */
export function getSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!raw) {
    if (process.env.NODE_ENV === "production") {
      console.warn("NEXT_PUBLIC_SITE_URL is not set. Canonical URLs and the sitemap will point at localhost.");
    }
    return new URL(FALLBACK_SITE_URL);
  }

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(`NEXT_PUBLIC_SITE_URL must be an absolute URL such as https://www.example.com (got "${raw}").`);
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error(`NEXT_PUBLIC_SITE_URL must use http or https (got "${raw}").`);
  }
  return url;
}
