import { isSectionEnabled } from "@/config/sections";
import { gymAbout, gymClasses, gymFacilities, gymGallery, gymPlans, gymTestimonials, gymTrainers } from "@/data/gym/content";
import { ContactSection } from "@/components/sections/ContactSection";
import { GymAbout } from "@/templates/gym/shared/GymAbout";
import { GymClasses } from "@/templates/gym/shared/GymClasses";
import { GymFacilities } from "@/templates/gym/shared/GymFacilities";
import { GymGallery } from "@/templates/gym/shared/GymGallery";
import { GymHero } from "@/templates/gym/dark-premium/GymHero";
import { GymPlans } from "@/templates/gym/shared/GymPlans";
import { GymTestimonials } from "@/templates/gym/shared/GymTestimonials";
import { GymTrainers } from "@/templates/gym/shared/GymTrainers";
import type { ClientConfigOf, SectionKeyMap } from "@/types/client-config";

/** Dark premium gym: heavy uppercase type, a schedule table, inverted pricing and greyscale coaches. */
export function GymDarkPremium({ config }: { config: ClientConfigOf<"gym"> }) {
  const { business, contact, social, sections } = config;
  const enabled = (key: SectionKeyMap["gym"]) => isSectionEnabled(sections, key);

  return (
    <>
      <GymHero business={business} />
      {enabled("about") ? <GymAbout copy={gymAbout} /> : null}
      {enabled("facilities") ? <GymFacilities facilities={gymFacilities} /> : null}
      {enabled("classes") ? <GymClasses classes={gymClasses} /> : null}
      {enabled("plans") ? <GymPlans plans={gymPlans} /> : null}
      {enabled("trainers") ? <GymTrainers trainers={gymTrainers} /> : null}
      {enabled("gallery") ? <GymGallery images={gymGallery} /> : null}
      {enabled("testimonials") ? <GymTestimonials testimonials={gymTestimonials} /> : null}
      {enabled("contact") ? (
        <ContactSection
          eyebrow="Join"
          title="Ready to train?"
          description="Pick a membership, book a free visit or ask us anything. We reply on WhatsApp or email."
          businessName={business.name}
          contact={contact}
          social={social}
          formKind="inquiry"
          formOptions={gymPlans.map((plan) => plan.name)}
        />
      ) : null}
    </>
  );
}
