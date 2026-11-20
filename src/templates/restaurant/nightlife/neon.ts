import type { CSSProperties } from "react";

/*
 * Glow effects for the nightlife template, built from the theme's primary
 * colour so every business gets neon in its own brand colour.
 */
export const neonText: CSSProperties = {
  textShadow: "0 0 18px color-mix(in srgb, var(--primary) 75%, transparent), 0 0 42px color-mix(in srgb, var(--primary) 45%, transparent)",
};

export const neonBox: CSSProperties = {
  boxShadow: "0 0 0 1px color-mix(in srgb, var(--primary) 70%, transparent), 0 0 28px color-mix(in srgb, var(--primary) 35%, transparent)",
};
