import type { Metadata } from "next";
import { monogramFaviconDataUri } from "@/lib/monogram";
import { getSiteUrl } from "@/lib/site-url";
import type { ClientConfig } from "@/types/client-config";

export const DEFAULT_FAVICON = "/icons/favicon.svg";

/** Title, description, icons and social-sharing tags for one business's home page. */
export function buildSiteMetadata(config: ClientConfig, options: { index?: boolean } = {}): Metadata {
  const { business, seo } = config;
  const ogImage = seo.ogImage ?? business.heroImage;

  return {
    metadataBase: getSiteUrl(),
    title: {
      default: seo.title,
      template: `%s | ${business.name}`,
    },
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: "/" },
    // Each business gets its own tab icon: its favicon file, or its initials in the brand colour.
    icons: { icon: business.favicon ?? monogramFaviconDataUri(config) },
    robots: options.index === false ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      url: "/",
      siteName: business.name,
      title: seo.title,
      description: seo.description,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [ogImage],
    },
  };
}
