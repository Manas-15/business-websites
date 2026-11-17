import { isSectionEnabled } from "@/config/sections";
import { cafeAbout, cafeGallery, cafeTestimonials } from "@/data/cafe/content";
import { cafeMenu } from "@/data/cafe/menu";
import { cafeOffers } from "@/data/cafe/offers";
import { LocationSection } from "@/components/sections/LocationSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { CafeAbout } from "@/templates/cafe/shared/CafeAbout";
import { CafeGallery } from "@/templates/cafe/shared/CafeGallery";
import { CafeHero } from "@/templates/cafe/minimalist/CafeHero";
import { CafeHours } from "@/templates/cafe/shared/CafeHours";
import { CafeMenu } from "@/templates/cafe/minimalist/CafeMenu";
import { CafeOffers } from "@/templates/cafe/shared/CafeOffers";
import { CafeTestimonials } from "@/templates/cafe/shared/CafeTestimonials";
import type { ClientConfigOf, SectionKeyMap } from "@/types/client-config";

/** Minimalist café: text-led hero, hairline lists, generous whitespace and a prominent hours block. */
export function CafeMinimalist({ config }: { config: ClientConfigOf<"cafe"> }) {
  const { business, contact, social, openingHours, sections } = config;
  const enabled = (key: SectionKeyMap["cafe"]) => isSectionEnabled(sections, key);

  return (
    <>
      <CafeHero business={business} />
      {enabled("menu") ? <CafeMenu categories={cafeMenu} /> : null}
      {enabled("offers") ? <CafeOffers offers={cafeOffers} /> : null}
      {enabled("about") ? <CafeAbout copy={cafeAbout} /> : null}
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
