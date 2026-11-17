import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

/** Single-page sites list only the home page. Add entries here if you add routes. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${getSiteUrl().origin}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
