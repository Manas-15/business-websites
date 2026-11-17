import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/s/", "/preview"] },
    sitemap: `${getSiteUrl().origin}/sitemap.xml`,
  };
}
