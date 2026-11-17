import { isSectionEnabled } from "@/config/sections";
import {
  salonAbout,
  salonGallery,
  salonPackages,
  salonServices,
  salonTeam,
  salonTestimonials,
} from "@/data/salon/content";
import { ContactSection } from "@/components/sections/ContactSection";
import { InquirySection } from "@/components/sections/InquirySection";
import { SalonAbout } from "@/templates/salon/shared/SalonAbout";
import { SalonGallery } from "@/templates/salon/shared/SalonGallery";
import { SalonPricing } from "@/templates/salon/shared/SalonPricing";
import { SalonTeam } from "@/templates/salon/shared/SalonTeam";
import { SalonTestimonials } from "@/templates/salon/shared/SalonTestimonials";
import { ElegantHero } from "@/templates/salon/elegant-minimal/ElegantHero";
import { ElegantServices } from "@/templates/salon/elegant-minimal/ElegantServices";
import type { ClientConfigOf, SectionKeyMap } from "@/types/client-config";

/** Elegant minimal salon: text-first hero and a quiet, single-column services list. */
export function ElegantSalon({ config }: { config: ClientConfigOf<"salon"> }) {
  const { business, contact, social, sections } = config;
  const enabled = (key: SectionKeyMap["salon"]) => isSectionEnabled(sections, key);
  const serviceNames = salonServices.flatMap((category) => category.items.map((item) => item.name));

  return (
    <>
      <ElegantHero business={business} />
      {enabled("about") ? <SalonAbout copy={salonAbout} /> : null}
      {enabled("services") ? <ElegantServices categories={salonServices} /> : null}
      {enabled("pricing") ? <SalonPricing packages={salonPackages} /> : null}
      {enabled("team") ? <SalonTeam team={salonTeam} /> : null}
      {enabled("gallery") ? <SalonGallery images={salonGallery} /> : null}
      {enabled("testimonials") ? <SalonTestimonials testimonials={salonTestimonials} /> : null}
      {enabled("appointment") ? (
        <InquirySection
          id="appointment"
          eyebrow="Appointments"
          title="Choose a time that suits you"
          description="Pick a service and a preferred day. We will confirm your appointment and any preparation needed."
          kind="appointment"
          options={serviceNames}
          businessName={business.name}
          contact={contact}
        />
      ) : null}
      {enabled("contact") ? (
        <ContactSection eyebrow="Visit the studio" title="We would love to see you" businessName={business.name} contact={contact} social={social} />
      ) : null}
    </>
  );
}
