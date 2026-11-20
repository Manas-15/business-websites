import { isSectionEnabled } from "@/config/sections";
import { ChefSection } from "@/templates/restaurant/shared/ChefSection";
import { RestaurantClosing } from "@/templates/restaurant/shared/RestaurantClosing";
import { featuredDishesFrom } from "@/templates/restaurant/shared/featured-dishes";
import { NightAbout } from "@/templates/restaurant/nightlife/NightAbout";
import { NightGallery } from "@/templates/restaurant/nightlife/NightGallery";
import { NightHero } from "@/templates/restaurant/nightlife/NightHero";
import { NightMarquee } from "@/templates/restaurant/nightlife/NightMarquee";
import { NightMenu } from "@/templates/restaurant/nightlife/NightMenu";
import { NightSignatures } from "@/templates/restaurant/nightlife/NightSignatures";
import { NightTestimonials } from "@/templates/restaurant/nightlife/NightTestimonials";
import { NightVibe } from "@/templates/restaurant/nightlife/NightVibe";
import type { ClientConfigOf, SectionKeyMap } from "@/types/client-config";

/**
 * Nightlife: bars, sky lounges and clubs. Built for a dark theme with a bright
 * primary colour: condensed uppercase headlines with a neon glow, a scrolling
 * ticker, swipeable signature cards, a tabbed food-and-bar menu and a bento gallery.
 */
export function NightlifeRestaurant({ config }: { config: ClientConfigOf<"restaurant"> }) {
  const { business, content, openingHours, sections } = config;
  const enabled = (key: SectionKeyMap["restaurant"]) => isSectionEnabled(sections, key);
  const dishes = featuredDishesFrom(content.menu);
  const aboutImage = content.about.image ?? content.gallery[0];
  const secondImage = content.gallery.find((image) => image.src !== aboutImage?.src);

  return (
    <>
      <NightHero business={business} eyebrow={content.heroEyebrow} openingHours={openingHours} highlights={content.highlights} />
      <NightMarquee items={content.features.map((feature) => feature.title)} />
      {enabled("about") && aboutImage ? <NightAbout copy={content.about} image={aboutImage} secondImage={secondImage} /> : null}
      {enabled("whyChooseUs") && content.features.length > 0 ? <NightVibe features={content.features} /> : null}
      {enabled("featuredDishes") && dishes.length > 0 ? <NightSignatures dishes={dishes} /> : null}
      {enabled("menu") ? <NightMenu categories={content.menu} note={content.menuNote} /> : null}
      {enabled("chef") && content.chef ? <ChefSection chef={content.chef} style="cards" /> : null}
      {enabled("gallery") && content.gallery.length > 0 ? <NightGallery images={content.gallery} /> : null}
      {enabled("testimonials") && content.testimonials.length > 0 ? (
        <NightTestimonials testimonials={content.testimonials} />
      ) : null}
      <RestaurantClosing config={config} enabled={enabled} />
    </>
  );
}
