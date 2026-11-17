import { isSectionEnabled } from "@/config/sections";
import { ModernAbout } from "@/templates/restaurant/modern/ModernAbout";
import { ModernDishes } from "@/templates/restaurant/modern/ModernDishes";
import { ModernGallery } from "@/templates/restaurant/modern/ModernGallery";
import { ModernHero } from "@/templates/restaurant/modern/ModernHero";
import { ModernMenu } from "@/templates/restaurant/modern/ModernMenu";
import { ModernTestimonials } from "@/templates/restaurant/modern/ModernTestimonials";
import { ModernWhyUs } from "@/templates/restaurant/modern/ModernWhyUs";
import { ChefSection } from "@/templates/restaurant/shared/ChefSection";
import { Highlights } from "@/templates/restaurant/shared/Highlights";
import { RestaurantClosing } from "@/templates/restaurant/shared/RestaurantClosing";
import { featuredDishesFrom } from "@/templates/restaurant/shared/featured-dishes";
import type { ClientConfigOf, SectionKeyMap } from "@/types/client-config";

/** Modern / minimal restaurant: split hero, rounded cards and bold sans-serif headings. */
export function ModernRestaurant({ config }: { config: ClientConfigOf<"restaurant"> }) {
  const { business, contact, content, openingHours, sections } = config;
  const enabled = (key: SectionKeyMap["restaurant"]) => isSectionEnabled(sections, key);
  const dishes = featuredDishesFrom(content.menu);
  const aboutImage = content.about.image ?? content.gallery[1] ?? content.gallery[0];

  return (
    <>
      <ModernHero business={business} contact={contact} openingHours={openingHours} eyebrow={content.heroEyebrow} />
      {content.highlights ? <Highlights items={content.highlights} style="cards" /> : null}
      {enabled("about") && aboutImage ? <ModernAbout copy={content.about} image={aboutImage} /> : null}
      {enabled("featuredDishes") && dishes.length > 0 ? <ModernDishes dishes={dishes} /> : null}
      {enabled("menu") ? <ModernMenu categories={content.menu} note={content.menuNote} /> : null}
      {enabled("chef") && content.chef ? <ChefSection chef={content.chef} style="cards" /> : null}
      {enabled("whyChooseUs") && content.features.length > 0 ? <ModernWhyUs features={content.features} /> : null}
      {enabled("gallery") && content.gallery.length > 0 ? <ModernGallery images={content.gallery} /> : null}
      {enabled("testimonials") && content.testimonials.length > 0 ? (
        <ModernTestimonials testimonials={content.testimonials} />
      ) : null}
      <RestaurantClosing config={config} enabled={enabled} />
    </>
  );
}
