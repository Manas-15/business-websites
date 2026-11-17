import type { AboutCopy, GalleryImage, Testimonial } from "@/types/content";

/** Placeholder café copy, gallery and reviews. Replace with the client's own. */
export const cafeAbout: AboutCopy = {
  eyebrow: "About the café",
  title: "A quiet place to slow down",
  paragraphs: [
    "We roast in small batches and bake every morning. The room is simple on purpose, so the coffee, the bread and the conversation can take centre stage.",
    "Come for a quick espresso on the way to work, or stay all afternoon with a book. Either way, you are welcome here.",
  ],
};

export const cafeGallery: GalleryImage[] = [
  { src: "/clients/urban-brew-cafe/gallery/01.jpg", alt: "Espresso in a dark cup, seen from above" },
  { src: "/clients/urban-brew-cafe/gallery/02.svg", alt: "Counter with fresh pastries" },
  { src: "/clients/urban-brew-cafe/gallery/03.jpg", alt: "Fresh croissant" },
  { src: "/clients/urban-brew-cafe/gallery/04.svg", alt: "Coffee beans on a wooden table" },
];

export const cafeTestimonials: Testimonial[] = [
  {
    quote: "The flat white is the best in the neighbourhood, and the staff remember how I like it.",
    author: "Meera K.",
    context: "Weekday regular",
    rating: 5,
  },
  {
    quote: "My favourite place to work. Quiet corners, good Wi-Fi and the banana bread is excellent.",
    author: "Dev R.",
    context: "Remote worker",
    rating: 5,
  },
  {
    quote: "Lovely, calm atmosphere. The matcha latte is smooth and not too sweet.",
    author: "Sana L.",
    context: "First visit",
    rating: 4,
  },
];
