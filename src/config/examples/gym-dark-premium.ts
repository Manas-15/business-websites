import { defineClientConfig } from "@/config/define-client-config";

/** Example config: dark premium gym. Dark-premium expects a dark background and light text. */
export const ironForgeGym = defineClientConfig({
  slug: "iron-forge-gym",
  businessType: "gym",
  templateVariant: "dark-premium",

  business: {
    name: "Iron Forge",
    tagline: "Train hard. Train smart.",
    description: "A serious training floor with heavy racks, expert coaches and classes every day.",
    logo: "/clients/iron-forge-gym/logo.svg",
    favicon: "/clients/iron-forge-gym/favicon.svg",
    heroImage: "/clients/iron-forge-gym/hero.svg",
  },

  theme: {
    primary: "#e4572e",
    secondary: "#1f1f23",
    background: "#0f0f11",
    text: "#f2f2f2",
    headingFont: "Montserrat",
    bodyFont: "Inter",
    radius: "sm",
  },

  contact: {
    phone: "+91 90000 67890",
    email: "train@ironforge.example",
    address: "18 Industrial Estate, Bhubaneswar, Odisha 751010",
    whatsapp: "919000067890",
  },

  openingHours: [
    { day: "Monday - Friday", hours: "5:00 AM - 11:00 PM" },
    { day: "Saturday - Sunday", hours: "6:00 AM - 9:00 PM" },
  ],

  seo: {
    title: "Iron Forge | Strength Gym in Bhubaneswar",
    description: "Strength training, group classes and expert coaches at Iron Forge, Bhubaneswar.",
    keywords: ["gym", "strength training", "personal training", "Bhubaneswar"],
  },
});
