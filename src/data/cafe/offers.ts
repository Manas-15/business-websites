import type { Offer } from "@/types/content";

/** Placeholder offers. Confirm terms with the client before publishing. */
export const cafeOffers: Offer[] = [
  {
    title: "Morning pairing",
    description: "Any coffee with a fresh croissant, served before 11 AM.",
    badge: "Weekdays",
    price: "₹360",
  },
  {
    title: "Loyalty card",
    description: "Collect a stamp with every drink. Your eighth coffee is on us.",
    badge: "Every day",
  },
  {
    title: "Study session",
    description: "Unlimited filter coffee and free Wi-Fi for laptop sessions until 6 PM.",
    badge: "Limited",
    price: "₹250",
  },
];
