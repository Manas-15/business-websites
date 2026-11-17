import type { BusinessType, ClientConfig, NavItem } from "@/types/client-config";

/** Default menu per business type. Anchors must match section ids in each template. */
const defaultNavigation: Record<BusinessType, NavItem[]> = {
  restaurant: [
    { label: "Menu", href: "#menu" },
    { label: "About", href: "#about" },
    { label: "Gallery", href: "#gallery" },
    { label: "Reservations", href: "#reservations" },
    { label: "Contact", href: "#contact" },
  ],
  cafe: [
    { label: "Menu", href: "#menu" },
    { label: "Offers", href: "#offers" },
    { label: "About", href: "#about" },
    { label: "Visit", href: "#location" },
    { label: "Contact", href: "#contact" },
  ],
  gym: [
    { label: "Classes", href: "#classes" },
    { label: "Membership", href: "#plans" },
    { label: "Trainers", href: "#trainers" },
    { label: "Facilities", href: "#facilities" },
    { label: "Contact", href: "#contact" },
  ],
  salon: [
    { label: "Services", href: "#services" },
    { label: "Pricing", href: "#pricing" },
    { label: "Team", href: "#team" },
    { label: "Gallery", href: "#gallery" },
    { label: "Book", href: "#appointment" },
    { label: "Contact", href: "#contact" },
  ],
};

/**
 * Custom navigation is used as written. Default links whose target section is
 * switched off are dropped, so the menu never points at a hidden section.
 */
export function getNavigation(config: ClientConfig): NavItem[] {
  if (config.navigation) return config.navigation;
  const sections: Partial<Record<string, boolean>> = config.sections ?? {};
  return defaultNavigation[config.businessType].filter((item) => {
    const sectionKey = item.href.replace(/^#/, "");
    return sections[sectionKey] !== false;
  });
}
