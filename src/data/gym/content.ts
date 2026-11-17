import type {
  AboutCopy,
  ClassSession,
  Feature,
  GalleryImage,
  PricingPlan,
  Testimonial,
  Trainer,
} from "@/types/content";

/** Placeholder gym content. Replace with the client's own facilities, classes and prices. */
export const gymAbout: AboutCopy = {
  eyebrow: "About the gym",
  title: "Built for training that actually shows",
  paragraphs: [
    "Iron Forge is a training floor for people who take their workouts seriously. Heavy racks, clear space and coaches who watch your form.",
    "Whether you are lifting for the first time or chasing a personal best, you get a plan, a community and the kit to do the work.",
  ],
};

export const gymFacilities: Feature[] = [
  { title: "Strength floor", description: "Power racks, platforms and a full range of free weights.", icon: "dumbbell" },
  { title: "Cardio zone", description: "Treadmills, rowers and bikes with screens and fans.", icon: "heart" },
  { title: "Functional area", description: "Turf, sleds and battle ropes for conditioning work.", icon: "flame" },
  { title: "Open hours", description: "Early mornings to late nights, seven days a week.", icon: "clock" },
  { title: "Secure lockers", description: "Daily lockers with showers and changing rooms.", icon: "shield" },
  { title: "Community", description: "Small groups and friendly coaches who know your name.", icon: "users" },
];

export const gymClasses: ClassSession[] = [
  { name: "Strength & Conditioning", day: "Monday", time: "6:30 AM", instructor: "Arjun", level: "All levels" },
  { name: "HIIT", day: "Tuesday", time: "7:00 PM", instructor: "Neha", level: "Intermediate" },
  { name: "Yoga Flow", day: "Wednesday", time: "7:00 AM", instructor: "Ritu", level: "All levels" },
  { name: "Indoor Cycling", day: "Thursday", time: "6:30 PM", instructor: "Karan", level: "All levels" },
  { name: "Boxing Fundamentals", day: "Saturday", time: "9:00 AM", instructor: "Vikram", level: "Beginner" },
];

export const gymPlans: PricingPlan[] = [
  {
    name: "Basic",
    price: "₹1,499",
    period: "/ month",
    description: "Full access to the training floor.",
    includes: ["Gym floor access", "Locker and showers", "Open-hours entry"],
  },
  {
    name: "Plus",
    price: "₹2,499",
    period: "/ month",
    description: "Everything in Basic, plus group classes.",
    includes: ["Everything in Basic", "Unlimited group classes", "Guest pass once a month"],
    highlighted: true,
  },
  {
    name: "Premium",
    price: "₹3,999",
    period: "/ month",
    description: "Coaching and a plan built around your goals.",
    includes: ["Everything in Plus", "Two coach sessions a month", "Body composition check"],
  },
];

export const gymTrainers: Trainer[] = [
  {
    name: "Arjun Mehta",
    role: "Head coach",
    bio: "Strength coach with 10 years on the floor. Focuses on technique first.",
    image: "/clients/iron-forge-gym/trainers/01.svg",
  },
  {
    name: "Neha Iyer",
    role: "Conditioning coach",
    bio: "Leads our HIIT and functional classes. Former athlete, now a coach.",
    image: "/clients/iron-forge-gym/trainers/02.svg",
  },
  {
    name: "Vikram Rao",
    role: "Boxing coach",
    bio: "Teaches fundamentals and fitness boxing for every level.",
    image: "/clients/iron-forge-gym/trainers/03.svg",
  },
];

export const gymGallery: GalleryImage[] = [
  { src: "/clients/iron-forge-gym/gallery/02.svg", alt: "Group class in session" },
  { src: "/clients/iron-forge-gym/gallery/03.svg", alt: "Cardio machines facing the windows" },
  { src: "/clients/iron-forge-gym/gallery/04.svg", alt: "Functional training turf area" },
];

export const gymTestimonials: Testimonial[] = [
  {
    quote: "I came in for the classes and stayed for the coaches. My squat has never been better.",
    author: "Rohan P.",
    context: "Member for 1 year",
    rating: 5,
  },
  {
    quote: "Clean, well-equipped and never crowded at 6 AM. The staff actually check your form.",
    author: "Kavya S.",
    context: "Early-morning member",
    rating: 5,
  },
  {
    quote: "The Premium plan paid for itself. The body composition check kept me honest.",
    author: "Aditya J.",
    context: "Premium member",
    rating: 4,
  },
];
