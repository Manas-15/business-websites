import type { RestaurantContent } from "@/types/content";

export const BUSINESS_TYPES = ["restaurant", "cafe", "gym", "salon"] as const;
export type BusinessType = (typeof BUSINESS_TYPES)[number];

/** Design variations available for each business template. */
export const TEMPLATE_VARIANTS = {
  restaurant: ["luxury", "modern", "traditional", "casual"],
  cafe: ["minimalist", "warm", "modern", "premium"],
  gym: ["dark-premium", "modern-fitness", "minimalist"],
  salon: ["luxury", "elegant-minimal"],
} as const satisfies Record<BusinessType, readonly string[]>;

/** Variants with a finished template. Config may only select these until more are built. */
export const IMPLEMENTED_VARIANTS = {
  restaurant: ["luxury", "modern", "traditional", "casual"],
  cafe: ["minimalist", "warm", "modern", "premium"],
  gym: ["dark-premium", "modern-fitness", "minimalist"],
  salon: ["luxury", "elegant-minimal"],
} as const satisfies Record<BusinessType, readonly string[]>;

export type TemplateVariantMap = {
  [K in BusinessType]: (typeof TEMPLATE_VARIANTS)[K][number];
};

/** Google fonts the template can load. Each must be registered in `src/lib/fonts.ts`. */
export const FONT_NAMES = [
  "Playfair Display",
  "Cormorant Garamond",
  "Montserrat",
  "Inter",
  "Poppins",
  "Lato",
] as const;
export type FontName = (typeof FONT_NAMES)[number];

/** Optional page sections each template can render. Toggle them off via `sections` in config. */
export const SECTION_KEYS = {
  restaurant: [
    "featuredDishes",
    "menu",
    "about",
    "whyChooseUs",
    "chef",
    "gallery",
    "testimonials",
    "reservations",
    "location",
    "contact",
  ],
  cafe: ["menu", "offers", "about", "gallery", "testimonials", "hours", "location", "contact"],
  gym: ["about", "facilities", "plans", "trainers", "classes", "testimonials", "gallery", "contact"],
  salon: ["about", "services", "pricing", "team", "gallery", "testimonials", "appointment", "contact"],
} as const satisfies Record<BusinessType, readonly string[]>;

export type SectionKeyMap = {
  [K in BusinessType]: (typeof SECTION_KEYS)[K][number];
};

export const RADIUS_OPTIONS = ["none", "sm", "md", "lg", "full"] as const;
export type RadiusOption = (typeof RADIUS_OPTIONS)[number];

export interface BusinessInfo {
  name: string;
  tagline: string;
  description: string;
  /** Root-relative path under `public/` or an https URL. Omit to show a text monogram instead. */
  logo?: string;
  /** Root-relative path under `public/` or an https URL. Falls back to `/icons/favicon.svg`. */
  favicon?: string;
  /** Root-relative path under `public/` or an https URL for the hero image. */
  heroImage: string;
}

export interface ThemeConfig {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  headingFont: FontName;
  bodyFont: FontName;
  radius?: RadiusOption;
}

export interface ContactDetails {
  phone: string;
  email: string;
  address: string;
  /** WhatsApp number with country code and digits only, e.g. `919876543210`. */
  whatsapp?: string;
  /** Google Maps embed URL for the location section. */
  mapEmbedUrl?: string;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  x?: string;
}

export interface SeoConfig {
  /** Website title shown in the browser tab and search results. */
  title: string;
  description: string;
  keywords?: string[];
  /** Root-relative or absolute image path for social sharing previews. */
  ogImage?: string;
}

export interface OpeningHour {
  day: string;
  /** Free text such as `9:00 AM - 11:00 PM`, or `Closed`. */
  hours: string;
}

export interface Announcement {
  text: string;
  href?: string;
}

export interface NavItem {
  label: string;
  /** Section anchor (`#menu`), root path (`/menu`) or absolute URL. */
  href: string;
}

/** Content that belongs to one business type. Other types keep their sample data in `src/data/`. */
type ContentFor<T extends BusinessType> = T extends "restaurant"
  ? { content: RestaurantContent }
  : { content?: undefined };

type ClientConfigBase<T extends BusinessType> = ContentFor<T> & {
  /** URL-safe identifier, also used for the asset folder `public/clients/<slug>/`. */
  slug: string;
  businessType: T;
  templateVariant: TemplateVariantMap[T];
  business: BusinessInfo;
  theme: ThemeConfig;
  contact: ContactDetails;
  seo: SeoConfig;
  social?: SocialLinks;
  openingHours?: OpeningHour[];
  announcement?: Announcement;
  /** Overrides the default navigation for the business type. */
  navigation?: NavItem[];
  /** Set a section to `false` to hide it. Sections not listed are shown. */
  sections?: Partial<Record<SectionKeyMap[T], boolean>>;
};

/** Discriminated on `businessType`, so each template only accepts its own variants. */
export type ClientConfig = {
  [K in BusinessType]: ClientConfigBase<K>;
}[BusinessType];

export type ClientConfigOf<T extends BusinessType> = Extract<ClientConfig, { businessType: T }>;
