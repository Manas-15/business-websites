import type { ComponentType } from "react";
import { CafeMinimalist } from "@/templates/cafe/minimalist/CafeMinimalist";
import { ModernCafe } from "@/templates/cafe/modern/ModernCafe";
import { PremiumCafe } from "@/templates/cafe/premium/PremiumCafe";
import { WarmCafe } from "@/templates/cafe/warm/WarmCafe";
import { GymDarkPremium } from "@/templates/gym/dark-premium/GymDarkPremium";
import { FitnessGym } from "@/templates/gym/modern-fitness/FitnessGym";
import { MinimalGym } from "@/templates/gym/minimalist/MinimalGym";
import { ElegantSalon } from "@/templates/salon/elegant-minimal/ElegantSalon";
import { SalonLuxury } from "@/templates/salon/luxury/SalonLuxury";
import { CasualRestaurant } from "@/templates/restaurant/casual/CasualRestaurant";
import { LuxuryRestaurant } from "@/templates/restaurant/luxury/LuxuryRestaurant";
import { NightlifeRestaurant } from "@/templates/restaurant/nightlife/NightlifeRestaurant";
import { ModernRestaurant } from "@/templates/restaurant/modern/ModernRestaurant";
import { TraditionalRestaurant } from "@/templates/restaurant/traditional/TraditionalRestaurant";
import type { ClientConfig, ClientConfigOf, TemplateVariantMap } from "@/types/client-config";

/*
 * Maps each business type and variant to its page component. Adding a variant
 * means adding a folder under templates/<business>/<variant>/, one entry here,
 * and listing it in IMPLEMENTED_VARIANTS. Keys are type-checked against
 * TEMPLATE_VARIANTS, so a missing or misspelt variant fails the build.
 */
type TemplatePage<T extends keyof TemplateVariantMap> = ComponentType<{ config: ClientConfigOf<T> }>;

const restaurantTemplates: Record<TemplateVariantMap["restaurant"], TemplatePage<"restaurant">> = {
  luxury: LuxuryRestaurant,
  modern: ModernRestaurant,
  traditional: TraditionalRestaurant,
  casual: CasualRestaurant,
  nightlife: NightlifeRestaurant,
};

const cafeTemplates: Record<TemplateVariantMap["cafe"], TemplatePage<"cafe">> = {
  minimalist: CafeMinimalist,
  warm: WarmCafe,
  modern: ModernCafe,
  premium: PremiumCafe,
};

const gymTemplates: Record<TemplateVariantMap["gym"], TemplatePage<"gym">> = {
  "dark-premium": GymDarkPremium,
  "modern-fitness": FitnessGym,
  minimalist: MinimalGym,
};

const salonTemplates: Record<TemplateVariantMap["salon"], TemplatePage<"salon">> = {
  luxury: SalonLuxury,
  "elegant-minimal": ElegantSalon,
};

/** Renders the page for the configured business type and variant. */
export function ClientTemplate({ config }: { config: ClientConfig }) {
  switch (config.businessType) {
    case "restaurant": {
      const Template = restaurantTemplates[config.templateVariant];
      return <Template config={config} />;
    }
    case "cafe": {
      const Template = cafeTemplates[config.templateVariant];
      return <Template config={config} />;
    }
    case "gym": {
      const Template = gymTemplates[config.templateVariant];
      return <Template config={config} />;
    }
    case "salon": {
      const Template = salonTemplates[config.templateVariant];
      return <Template config={config} />;
    }
  }
}
