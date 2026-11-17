import { isSectionEnabled } from "@/config/sections";
import { gymAbout, gymClasses, gymFacilities, gymPlans, gymTestimonials, gymTrainers } from "@/data/gym/content";
import { ContactSection } from "@/components/sections/ContactSection";
import { GymAbout } from "@/templates/gym/shared/GymAbout";
import { GymClasses } from "@/templates/gym/shared/GymClasses";
import { GymFacilities } from "@/templates/gym/shared/GymFacilities";
import { GymTestimonials } from "@/templates/gym/shared/GymTestimonials";
import { GymTrainers } from "@/templates/gym/shared/GymTrainers";
import { MinimalGymHero } from "@/templates/gym/minimalist/MinimalGymHero";
import { MinimalGymPlans } from "@/templates/gym/minimalist/MinimalGymPlans";
import type { ClientConfigOf, SectionKeyMap } from "@/types/client-config";

/** Minimalist gym: a quiet hero, ruled membership list and plain, text-led sections. */
export function MinimalGym({ config }: { config: ClientConfigOf<"gym"> }) {
  const { business, contact, social, sections } = config;
  const enabled = (key: SectionKeyMap["gym"]) => isSectionEnabled(sections, key);

  return (
    <>
      <MinimalGymHero business={business} />
      {enabled("about") ? <GymAbout copy={gymAbout} /> : null}
      {enabled("plans") ? <MinimalGymPlans plans={gymPlans} /> : null}
      {enabled("facilities") ? <GymFacilities facilities={gymFacilities} /> : null}
      {enabled("classes") ? <GymClasses classes={gymClasses} /> : null}
      {enabled("trainers") ? <GymTrainers trainers={gymTrainers} /> : null}
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
