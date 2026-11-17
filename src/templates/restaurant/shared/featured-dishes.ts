import type { MenuCategory, MenuItem } from "@/types/content";

/** A featured dish always has an image, so templates can render it without fallbacks. */
export type FeaturedDish = MenuItem & { image: string };

/** Collects menu items marked `featured` that include an image. */
export function featuredDishesFrom(categories: MenuCategory[]): FeaturedDish[] {
  return categories
    .flatMap((category) => category.items)
    .filter((item): item is FeaturedDish => Boolean(item.featured && item.image));
}
