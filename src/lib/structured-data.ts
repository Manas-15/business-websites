import type { BusinessType, ClientConfig } from "@/types/client-config";

/** schema.org types that match each business category. */
const SCHEMA_TYPES: Record<BusinessType, string> = {
  restaurant: "Restaurant",
  cafe: "CafeOrCoffeeShop",
  gym: "HealthClub",
  salon: "BeautySalon",
};

/**
 * LocalBusiness JSON-LD for the site's home page. Opening hours are left out:
 * they are free text in config and schema.org needs a machine format.
 */
export function buildLocalBusinessJsonLd(config: ClientConfig, siteUrl: URL): Record<string, unknown> {
  const { business, contact, seo, social } = config;
  const sameAs = social ? Object.values(social).filter((link): link is string => Boolean(link)) : [];

  return {
    "@context": "https://schema.org",
    "@type": SCHEMA_TYPES[config.businessType],
    name: business.name,
    description: seo.description,
    url: siteUrl.origin,
    image: new URL(business.heroImage, siteUrl).toString(),
    ...(business.logo ? { logo: new URL(business.logo, siteUrl).toString() } : {}),
    telephone: contact.phone,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address,
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}
