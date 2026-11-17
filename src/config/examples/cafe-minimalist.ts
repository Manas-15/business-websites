import { defineClientConfig } from "@/config/define-client-config";

/** Example config: minimalist café. Copy this into src/config/client.ts for a café client. */
export const urbanBrewCafe = defineClientConfig({
  slug: "urban-brew-cafe",
  businessType: "cafe",
  templateVariant: "minimalist",

  business: {
    name: "Urban Brew",
    tagline: "Slow coffee, fresh bread",
    description: "A calm neighbourhood café roasting in small batches and baking every morning.",
    logo: "/clients/urban-brew-cafe/logo.svg",
    favicon: "/clients/urban-brew-cafe/favicon.svg",
    heroImage: "/clients/urban-brew-cafe/hero.svg",
  },

  theme: {
    primary: "#3b2a20",
    secondary: "#efe4d2",
    background: "#fbf7f0",
    text: "#2b2119",
    headingFont: "Cormorant Garamond",
    bodyFont: "Lato",
    radius: "sm",
  },

  contact: {
    phone: "+91 90000 12345",
    email: "hello@urbanbrew.example",
    address: "4 Park Lane, Bhubaneswar, Odisha 751002",
    whatsapp: "919000012345",
  },

  openingHours: [
    { day: "Monday - Friday", hours: "7:30 AM - 9:00 PM" },
    { day: "Saturday - Sunday", hours: "8:30 AM - 10:00 PM" },
  ],

  seo: {
    title: "Urban Brew | Coffee and Bakery in Bhubaneswar",
    description: "Small-batch coffee and fresh bakes at Urban Brew, a calm café in Bhubaneswar.",
    keywords: ["café", "coffee", "bakery", "Bhubaneswar"],
  },
});
