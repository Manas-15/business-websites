import { isSectionEnabled } from "@/config/sections";
import { gymAbout, gymClasses, gymFacilities, gymGallery, gymPlans, gymTestimonials, gymTrainers } from "@/data/gym/content";
import { ContactSection } from "@/components/sections/ContactSection";
import { GymAbout } from "@/templates/gym/shared/GymAbout";
import { GymFacilities } from "@/templates/gym/shared/GymFacilities";
import { GymGallery } from "@/templates/gym/shared/GymGallery";
import { GymPlans } from "@/templates/gym/shared/GymPlans";
import { GymTestimonials } from "@/templates/gym/shared/GymTestimonials";
import { GymTrainers } from "@/templates/gym/shared/GymTrainers";
import { FitnessClasses } from "@/templates/gym/modern-fitness/FitnessClasses";
import { FitnessHero } from "@/templates/gym/modern-fitness/FitnessHero";
import type { ClientConfigOf, SectionKeyMap } from "@/types/client-config";

/** Modern fitness: a bold brand-coloured hero and card-based class schedule. */
export function FitnessGym({ config }: { config: ClientConfigOf<"gym"> }) {
  const { business, contact, social, sections } = config;
  const enabled = (key: SectionKeyMap["gym"]) => isSectionEnabled(sections, key);

  return (
    <>
      <FitnessHero business={business} />
      {enabled("about") ? <GymAbout copy={gymAbout} /> : null}
      {enabled("facilities") ? <GymFacilities facilities={gymFacilities} /> : null}
      {enabled("classes") ? <FitnessClasses classes={gymClasses} /> : null}
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
