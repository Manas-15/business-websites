import { clientConfig } from "@/config/client";
import { defineClientConfig } from "@/config/define-client-config";
import { urbanBrewCafe } from "@/config/examples/cafe-minimalist";
import { ironForgeGym } from "@/config/examples/gym-dark-premium";
import { lumiereSalon } from "@/config/examples/salon-luxury";
import { IMPLEMENTED_VARIANTS, type ClientConfig, type ThemeConfig } from "@/types/client-config";

/*
 * Sample configs for the template showcase. Each business type uses one sample
 * content set. Each variant gets its own palette and font pairing, so the
 * showcase shows the range the way a theme marketplace does. Every config goes
 * through defineClientConfig, so an invalid colour pair or variant fails the build.
 */
const SAMPLE_CONFIGS: ClientConfig[] = [clientConfig, urbanBrewCafe, ironForgeGym, lumiereSalon];

const VARIANT_THEMES: Record<string, ThemeConfig> = {
  "restaurant/luxury": {
    primary: "#8b1e24", secondary: "#f5e6d3", background: "#fffdf9", text: "#2a2220",
    headingFont: "Playfair Display", bodyFont: "Lato", radius: "md",
  },
  "restaurant/modern": {
    primary: "#0f766e", secondary: "#ccfbf1", background: "#f8fafc", text: "#0f172a",
    headingFont: "Poppins", bodyFont: "Inter", radius: "lg",
  },
  "restaurant/traditional": {
    primary: "#1e3a5f", secondary: "#e8dcc4", background: "#fbf8f1", text: "#1c2430",
    headingFont: "Cormorant Garamond", bodyFont: "Lato", radius: "none",
  },
  "restaurant/casual": {
    primary: "#c2410c", secondary: "#fde68a", background: "#fffbeb", text: "#1c1917",
    headingFont: "Poppins", bodyFont: "Inter", radius: "full",
  },
  "cafe/minimalist": {
    primary: "#3b2a20", secondary: "#efe4d2", background: "#fbf7f0", text: "#2b2119",
    headingFont: "Cormorant Garamond", bodyFont: "Lato", radius: "sm",
  },
  "cafe/warm": {
    primary: "#9a3412", secondary: "#fed7aa", background: "#fff7ed", text: "#431407",
    headingFont: "Playfair Display", bodyFont: "Lato", radius: "lg",
  },
  "cafe/modern": {
    primary: "#0e7490", secondary: "#cffafe", background: "#ffffff", text: "#0f172a",
    headingFont: "Inter", bodyFont: "Inter", radius: "md",
  },
  "cafe/premium": {
    primary: "#c9a45c", secondary: "#2a2420", background: "#14110f", text: "#f5f0e6",
    headingFont: "Playfair Display", bodyFont: "Montserrat", radius: "none",
  },
  "gym/dark-premium": {
    primary: "#e4572e", secondary: "#1f1f23", background: "#0f0f11", text: "#f2f2f2",
    headingFont: "Montserrat", bodyFont: "Inter", radius: "sm",
  },
  "gym/modern-fitness": {
    primary: "#e11d48", secondary: "#ffe4e6", background: "#ffffff", text: "#111827",
    headingFont: "Poppins", bodyFont: "Inter", radius: "sm",
  },
  "gym/minimalist": {
    primary: "#171717", secondary: "#e5e5e5", background: "#fafafa", text: "#171717",
    headingFont: "Inter", bodyFont: "Inter", radius: "none",
  },
  "salon/luxury": {
    primary: "#8c6a5d", secondary: "#f3e8e1", background: "#fdf9f6", text: "#3a2f2b",
    headingFont: "Cormorant Garamond", bodyFont: "Lato", radius: "lg",
  },
  "salon/elegant-minimal": {
    primary: "#4d6350", secondary: "#e7ece4", background: "#fbfbf8", text: "#2f3a30",
    headingFont: "Lato", bodyFont: "Lato", radius: "lg",
  },
};

function variantsOf(base: ClientConfig): ClientConfig[] {
  const variants: readonly string[] = IMPLEMENTED_VARIANTS[base.businessType];
  return variants.map((templateVariant) => {
    const theme = VARIANT_THEMES[`${base.businessType}/${templateVariant}`] ?? base.theme;
    return defineClientConfig({ ...base, templateVariant, theme } as ClientConfig);
  });
}

export const previewConfigs: ClientConfig[] = SAMPLE_CONFIGS.flatMap(variantsOf);

export function findPreviewConfig(businessType: string, variant: string): ClientConfig | undefined {
  return previewConfigs.find((config) => config.businessType === businessType && config.templateVariant === variant);
}
