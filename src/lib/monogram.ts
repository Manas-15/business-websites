import { getReadableTextColor } from "@/lib/color";
import type { ClientConfig, RadiusOption } from "@/types/client-config";

/** First letters of up to two words, e.g. "Blanco Kitchen & Terrace" -> "BK". */
export function monogram(name: string): string {
  return name
    .split(/\s+/)
    .filter((word) => /^[a-z0-9]/i.test(word))
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

/** Corner radius on a 64-unit icon, following the theme's radius setting. */
const ICON_RADIUS: Record<RadiusOption, number> = { none: 0, sm: 6, md: 10, lg: 16, full: 32 };

const SERIF_FONTS = new Set(["Playfair Display", "Cormorant Garamond"]);

/**
 * A favicon for businesses without one: the monogram in the brand colours, as
 * an inline SVG data URI. Browser tabs cannot load web fonts for favicons, so a
 * system serif or sans stands in for the theme's heading font.
 */
export function monogramFaviconDataUri(config: Pick<ClientConfig, "business" | "theme">): string {
  const { primary, headingFont, radius } = config.theme;
  const letters = monogram(config.business.name) || "•";
  const fontFamily = SERIF_FONTS.has(headingFont) ? "Georgia, 'Times New Roman', serif" : "Arial, Helvetica, sans-serif";
  const fontSize = letters.length > 1 ? 30 : 40;
  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">`,
    `<rect width="64" height="64" rx="${ICON_RADIUS[radius ?? "md"]}" fill="${primary}"/>`,
    `<text x="32" y="33" text-anchor="middle" dominant-baseline="central" font-family="${fontFamily}" font-size="${fontSize}" font-weight="700" fill="${getReadableTextColor(primary)}">${letters}</text>`,
    `</svg>`,
  ].join("");
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
