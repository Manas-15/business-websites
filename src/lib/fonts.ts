import {
  Bebas_Neue,
  Cormorant_Garamond,
  Inter,
  Lato,
  Montserrat,
  Playfair_Display,
  Poppins,
} from "next/font/google";
import type { FontName } from "@/types/client-config";

/*
 * Each font is self-hosted at build time by next/font and exposed as a CSS
 * variable. Theme config picks fonts by name, so switching a client's fonts
 * never touches component code. next/font requires literal options, so the
 * variable names are repeated in the loaders and in FONT_VARIABLES.
 */
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
  preload: false,
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant-garamond",
  display: "swap",
  preload: false,
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  preload: false,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  preload: false,
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
  preload: false,
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
  display: "swap",
  preload: false,
});

const FONT_VARIABLES: Record<FontName, string> = {
  "Playfair Display": "--font-playfair-display",
  "Cormorant Garamond": "--font-cormorant-garamond",
  Montserrat: "--font-montserrat",
  Inter: "--font-inter",
  Poppins: "--font-poppins",
  Lato: "--font-lato",
  "Bebas Neue": "--font-bebas-neue",
};

/** Class names that define every registered font variable on <html>. */
export const FONT_CLASS_NAMES = [
  playfairDisplay,
  cormorantGaramond,
  montserrat,
  inter,
  poppins,
  lato,
  bebasNeue,
]
  .map((font) => font.variable)
  .join(" ");

export function fontVariable(name: FontName): string {
  return FONT_VARIABLES[name];
}
