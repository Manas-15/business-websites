import { ContactSection } from "@/components/sections/ContactSection";
import { InquirySection } from "@/components/sections/InquirySection";
import { LocationSection } from "@/components/sections/LocationSection";
import type { ClientConfigOf, SectionKeyMap } from "@/types/client-config";

interface RestaurantClosingProps {
  config: ClientConfigOf<"restaurant">;
  enabled: (key: SectionKeyMap["restaurant"]) => boolean;
}

/** Reservations, location and contact: the same three closing sections on every restaurant variant. */
export function RestaurantClosing({ config, enabled }: RestaurantClosingProps) {
  const { business, contact, social, openingHours } = config;

  return (
    <>
      {enabled("reservations") ? (
        <InquirySection
          id="reservations"
          eyebrow="Table reservations"
          title={`Reserve your table at ${business.name}`}
          description="Choose a date, time and party size. We will confirm your table by WhatsApp or phone."
          kind="reservation"
          businessName={business.name}
          contact={contact}
          tone="primary"
        />
      ) : null}
      {enabled("location") ? (
        <LocationSection
          eyebrow="Visit us"
          title={`Find ${business.name}`}
          businessName={business.name}
          contact={contact}
          openingHours={openingHours}
        />
      ) : null}
      {enabled("contact") ? (
        <ContactSection
          eyebrow="Contact"
          title="Questions or private events?"
          businessName={business.name}
          contact={contact}
          social={social}
        />
      ) : null}
    </>
  );
}
