import { isSectionEnabled } from "@/config/sections";
import { LuxuryAbout } from "@/templates/restaurant/luxury/LuxuryAbout";
import { LuxuryDishes } from "@/templates/restaurant/luxury/LuxuryDishes";
import { LuxuryGallery } from "@/templates/restaurant/luxury/LuxuryGallery";
import { LuxuryTestimonials } from "@/templates/restaurant/luxury/LuxuryTestimonials";
import { LuxuryWhyUs } from "@/templates/restaurant/luxury/LuxuryWhyUs";
import { ChefSection } from "@/templates/restaurant/shared/ChefSection";
import { Highlights } from "@/templates/restaurant/shared/Highlights";
import { RestaurantClosing } from "@/templates/restaurant/shared/RestaurantClosing";
import { featuredDishesFrom } from "@/templates/restaurant/shared/featured-dishes";
import { TraditionalHero } from "@/templates/restaurant/traditional/TraditionalHero";
import { TraditionalMenu } from "@/templates/restaurant/traditional/TraditionalMenu";
import type { ClientConfigOf, SectionKeyMap } from "@/types/client-config";

/** Traditional restaurant: centred, ruled and formal. Reuses the luxury about, gallery and review layouts. */
export function TraditionalRestaurant({ config }: { config: ClientConfigOf<"restaurant"> }) {
  const { business, content, sections } = config;
  const enabled = (key: SectionKeyMap["restaurant"]) => isSectionEnabled(sections, key);
  const dishes = featuredDishesFrom(content.menu);
  const aboutImage = content.about.image ?? content.gallery[0];

  return (
    <>
      <TraditionalHero business={business} eyebrow={content.heroEyebrow} />
      {content.highlights ? <Highlights items={content.highlights} style="editorial" /> : null}
      {enabled("about") && aboutImage ? <LuxuryAbout copy={content.about} image={aboutImage} /> : null}
      {enabled("featuredDishes") && dishes.length > 0 ? <LuxuryDishes dishes={dishes} /> : null}
      {enabled("menu") ? <TraditionalMenu categories={content.menu} note={content.menuNote} /> : null}
      {enabled("chef") && content.chef ? <ChefSection chef={content.chef} style="editorial" /> : null}
      {enabled("whyChooseUs") && content.features.length > 0 ? <LuxuryWhyUs features={content.features} /> : null}
      {enabled("gallery") && content.gallery.length > 0 ? <LuxuryGallery images={content.gallery} /> : null}
      {enabled("testimonials") && content.testimonials.length > 0 ? (
        <LuxuryTestimonials testimonials={content.testimonials} />
      ) : null}
      <RestaurantClosing config={config} enabled={enabled} />
    </>
  );
}
