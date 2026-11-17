const HEX_COLOR = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

const DARK_TEXT = "#1a1a1a";
const LIGHT_TEXT = "#ffffff";

export function isHexColor(value: string): boolean {
  return HEX_COLOR.test(value);
}

function hexToRgb(hex: string): [number, number, number] {
  const body = hex.slice(1);
  const full =
    body.length === 3
      ? body
          .split("")
          .map((char) => char + char)
          .join("")
      : body;
  const value = parseInt(full, 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * (r ?? 0) + 0.7152 * (g ?? 0) + 0.0722 * (b ?? 0);
}

/** WCAG contrast ratio between two hex colors (1 to 21). */
export function getContrastRatio(a: string, b: string): number {
  const [lighter, darker] = [relativeLuminance(a), relativeLuminance(b)].sort(
    (x, y) => y - x,
  ) as [number, number];
  return (lighter + 0.05) / (darker + 0.05);
}

/** Picks whichever of dark or light text has better contrast on the given background. */
export function getReadableTextColor(background: string): string {
  return getContrastRatio(background, LIGHT_TEXT) >=
    getContrastRatio(background, DARK_TEXT)
    ? LIGHT_TEXT
    : DARK_TEXT;
}
