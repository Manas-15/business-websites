import type { CSSProperties } from "react";
import { getReadableTextColor } from "@/lib/color";
import { fontVariable } from "@/lib/fonts";
import type { RadiusOption, ThemeConfig } from "@/types/client-config";

const RADIUS_VALUES: Record<RadiusOption, string> = {
  none: "0px",
  sm: "0.25rem",
  md: "0.5rem",
  lg: "0.875rem",
  full: "1.5rem",
};

/**
 * Converts client theme config into CSS custom properties. Applied as inline
 * styles on <html>, so the whole site themes from one config object with no
 * client-side JavaScript. Tokens use shadcn's names so its components inherit them.
 */
export function buildThemeStyle(theme: ThemeConfig): CSSProperties {
  const { primary, secondary, background, text } = theme;
  const border = `color-mix(in srgb, ${text} 14%, ${background})`;

  const variables: Record<string, string> = {
    "--primary": primary,
    "--primary-foreground": getReadableTextColor(primary),
    "--secondary": secondary,
    "--secondary-foreground": getReadableTextColor(secondary),
    "--accent": secondary,
    "--accent-foreground": getReadableTextColor(secondary),
    "--background": background,
    "--foreground": text,
    "--card": background,
    "--card-foreground": text,
    "--popover": background,
    "--popover-foreground": text,
    "--muted": `color-mix(in srgb, ${text} 6%, ${background})`,
    // 78% keeps secondary text above WCAG AA (4.5:1) even on tinted panels.
    "--muted-foreground": `color-mix(in srgb, ${text} 78%, ${background})`,
    "--border": border,
    "--input": border,
    "--ring": primary,
    "--radius": RADIUS_VALUES[theme.radius ?? "lg"],
    "--theme-font-heading": `var(${fontVariable(theme.headingFont)})`,
    "--theme-font-body": `var(${fontVariable(theme.bodyFont)})`,
  };

  return variables as CSSProperties;
}
