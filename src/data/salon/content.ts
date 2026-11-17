import type {
  AboutCopy,
  GalleryImage,
  PricingPlan,
  ServiceCategory,
  TeamMember,
  Testimonial,
} from "@/types/content";

/** Placeholder salon content. Replace with the salon's own services, team and prices. */
export const salonAbout: AboutCopy = {
  eyebrow: "About the salon",
  title: "Considered care, from the first consultation",
  paragraphs: [
    "Lumière is a private studio for hair, skin and bridal work. Every visit starts with a conversation so the treatment suits you, not a trend.",
    "We use professional products, keep our rooms calm and run on time, so you can relax from the moment you arrive.",
  ],
};

export const salonServices: ServiceCategory[] = [
  {
    id: "hair",
    name: "Hair",
    items: [
      { name: "Cut & style", description: "Consultation, wash, cut and blow-dry finish.", duration: "60 min", price: "₹1,200" },
      { name: "Balayage", description: "Hand-painted highlights for a soft, sun-kissed finish.", duration: "150 min", price: "₹5,500" },
      { name: "Keratin treatment", description: "Smooths frizz and adds shine for up to three months.", duration: "120 min", price: "₹6,000" },
    ],
  },
  {
    id: "skin",
    name: "Skin",
    items: [
      { name: "Classic facial", description: "Cleanse, exfoliate, mask and massage tailored to your skin.", duration: "60 min", price: "₹1,800" },
      { name: "Detan therapy", description: "Brightening treatment for sun-exposed skin.", duration: "45 min", price: "₹1,100" },
    ],
  },
  {
    id: "nails",
    name: "Nails",
    items: [
      { name: "Manicure", description: "Shape, cuticle care, massage and polish.", duration: "45 min", price: "₹700" },
      { name: "Pedicure", description: "Soak, scrub, massage and polish.", duration: "60 min", price: "₹900" },
    ],
  },
];

export const salonPackages: PricingPlan[] = [
  {
    name: "Refresh",
    price: "₹2,800",
    description: "A half-day reset for hair and skin.",
    includes: ["Cut & style", "Classic facial", "Manicure"],
  },
  {
    name: "Signature",
    price: "₹4,900",
    period: "from",
    description: "Our most popular full-day routine.",
    includes: ["Colour or balayage", "Classic facial", "Manicure & pedicure"],
    highlighted: true,
  },
  {
    name: "Bridal",
    price: "₹18,000",
    period: "from",
    description: "Trial, wedding-day makeup and hair for the bride.",
    includes: ["Makeup trial", "Wedding-day makeup", "Hair styling", "Touch-up kit"],
  },
];

export const salonTeam: TeamMember[] = [
  {
    name: "Ananya Kapoor",
    role: "Creative director",
    image: "/clients/lumiere-salon/team/01.svg",
    bio: "Colourist and stylist with a focus on natural-looking results.",
  },
  {
    name: "Ritika Sen",
    role: "Senior esthetician",
    image: "/clients/lumiere-salon/team/02.svg",
    bio: "Specialises in skin treatments and bridal preparation.",
  },
  {
    name: "Pooja Nair",
    role: "Nail artist",
    image: "/clients/lumiere-salon/team/03.svg",
    bio: "Precise manicure and pedicure work with a light touch.",
  },
];

export const salonGallery: GalleryImage[] = [
  { src: "/clients/lumiere-salon/gallery/01.svg", alt: "Styling chair in a bright studio" },
  { src: "/clients/lumiere-salon/gallery/02.svg", alt: "Bridal hairstyle detail" },
  { src: "/clients/lumiere-salon/gallery/03.svg", alt: "Skincare products on a marble shelf" },
  { src: "/clients/lumiere-salon/gallery/04.svg", alt: "Manicure station" },
];

export const salonTestimonials: Testimonial[] = [
  {
    quote: "They listened before they cut a single hair. I walked out feeling like myself, only better.",
    author: "Ishita G.",
    context: "Regular client",
    rating: 5,
  },
  {
    quote: "My bridal trial was calm and unhurried, and the day-of look held up beautifully.",
    author: "Tanvi M.",
    context: "Bride",
    rating: 5,
  },
  {
    quote: "The facial was the best I have had. Quiet room, gentle hands, and no pressure to buy.",
    author: "Nisha D.",
    context: "First visit",
    rating: 4,
  },
];
