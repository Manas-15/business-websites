export interface MenuItem {
  name: string;
  description: string;
  price: string;
  vegetarian?: boolean;
  /** Shown in the featured dishes section. Requires `image`. */
  featured?: boolean;
  /** Root-relative path under `public/`, or an absolute https URL. */
  image?: string;
  /** Short label such as "Chef's pick" or "Spicy". */
  tag?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  /** Optional one-line intro shown under the category name. */
  description?: string;
  items: MenuItem[];
}

export interface Testimonial {
  quote: string;
  author: string;
  /** Short context such as "Dined in March" or "Regular customer". */
  context: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

export interface GalleryImage {
  /** Root-relative path under `public/`, or an absolute https URL. */
  src: string;
  alt: string;
}

export const FEATURE_ICON_NAMES = [
  "chef",
  "leaf",
  "flame",
  "heart",
  "coffee",
  "dumbbell",
  "users",
  "clock",
  "award",
  "sparkles",
  "scissors",
  "shield",
  "wine",
  "utensils",
  "map",
] as const;
export type FeatureIconName = (typeof FEATURE_ICON_NAMES)[number];

export interface Feature {
  title: string;
  description: string;
  icon: FeatureIconName;
}

export interface AboutCopy {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  /** Photo shown beside the story. Falls back to the first gallery image. */
  image?: GalleryImage;
}

/** A short number-led fact, e.g. value "25+" label "Years of service". */
export interface Highlight {
  value: string;
  label: string;
}

export interface ChefProfile {
  name: string;
  /** Role such as "Head Chef" or "Founder". */
  title: string;
  /** A short quote or philosophy, shown in large type. */
  quote: string;
  bio?: string;
  image?: string;
}

/** Everything a restaurant page shows that is not part of the core business config. */
export interface RestaurantContent {
  about: AboutCopy;
  features: Feature[];
  menu: MenuCategory[];
  gallery: GalleryImage[];
  testimonials: Testimonial[];
  /** Optional strip of number-led facts under the hero. */
  highlights?: Highlight[];
  /** Optional chef / founder section. */
  chef?: ChefProfile;
  /** Short hero eyebrow such as "Coastal Odia cuisine · Bhubaneswar". */
  heroEyebrow?: string;
  /** Short note shown under the menu, e.g. "Prices include taxes". */
  menuNote?: string;
}

export interface Offer {
  title: string;
  description: string;
  /** Short label such as "Weekdays" or "Limited". */
  badge?: string;
  price?: string;
}

/** A priced package or membership tier, with a list of what it includes. */
export interface PricingPlan {
  name: string;
  price: string;
  /** Billing period or unit, e.g. "/ month" or "from". */
  period?: string;
  description: string;
  includes: string[];
  highlighted?: boolean;
}

export interface ClassSession {
  name: string;
  day: string;
  time: string;
  instructor?: string;
  level?: string;
}

export interface Trainer {
  name: string;
  role: string;
  bio: string;
  /** Root-relative path under `public/`. */
  image: string;
}

export interface Service {
  name: string;
  description: string;
  duration?: string;
  price: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  items: Service[];
}

export interface TeamMember {
  name: string;
  role: string;
  /** Root-relative path under `public/`. */
  image: string;
  bio?: string;
}
