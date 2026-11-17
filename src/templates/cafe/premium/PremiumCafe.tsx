import { isSectionEnabled } from "@/config/sections";
import { cafeAbout, cafeGallery, cafeTestimonials } from "@/data/cafe/content";
import { cafeMenu } from "@/data/cafe/menu";
import { cafeOffers } from "@/data/cafe/offers";
import { ContactSection } from "@/components/sections/ContactSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { CafeAbout } from "@/templates/cafe/shared/CafeAbout";
import { CafeGallery } from "@/templates/cafe/shared/CafeGallery";
import { CafeHours } from "@/templates/cafe/shared/CafeHours";
import { CafeOffers } from "@/templates/cafe/shared/CafeOffers";
import { CafeTestimonials } from "@/templates/cafe/shared/CafeTestimonials";
import { PremiumCafeHero } from "@/templates/cafe/premium/PremiumCafeHero";
import { PremiumCafeMenu } from "@/templates/cafe/premium/PremiumCafeMenu";
import type { ClientConfigOf, SectionKeyMap } from "@/types/client-config";

/** Premium café: centred serif display, fine-dining menu typography and generous spacing. */
export function PremiumCafe({ config }: { config: ClientConfigOf<"cafe"> }) {
  const { business, contact, social, openingHours, sections } = config;
  const enabled = (key: SectionKeyMap["cafe"]) => isSectionEnabled(sections, key);

  return (
    <>
      <PremiumCafeHero business={business} images={cafeGallery} />
      {enabled("menu") ? <PremiumCafeMenu categories={cafeMenu} /> : null}
      {enabled("about") ? <CafeAbout copy={cafeAbout} /> : null}
      {enabled("offers") ? <CafeOffers offers={cafeOffers} /> : null}
      {enabled("gallery") ? <CafeGallery images={cafeGallery} /> : null}
      {enabled("testimonials") ? <CafeTestimonials testimonials={cafeTestimonials} /> : null}
      {enabled("hours") && openingHours && openingHours.length > 0 ? <CafeHours hours={openingHours} /> : null}
      {enabled("location") ? (
        <LocationSection eyebrow="Visit" title={`Find ${business.name}`} businessName={business.name} contact={contact} />
      ) : null}
      {enabled("contact") ? (
        <ContactSection eyebrow="Contact" title="Say hello" businessName={business.name} contact={contact} social={social} />
      ) : null}
    </>
  );
}
