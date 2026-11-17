import { defineClientConfig } from "@/config/define-client-config";

/** Example config: luxury salon. */
export const lumiereSalon = defineClientConfig({
  slug: "lumiere-salon",
  businessType: "salon",
  templateVariant: "luxury",

  business: {
    name: "Lumière",
    tagline: "Considered beauty, unhurried care",
    description: "A private studio for hair, skin and bridal work, with a consultation before every visit.",
    logo: "/clients/lumiere-salon/logo.svg",
    favicon: "/clients/lumiere-salon/favicon.svg",
    heroImage: "/clients/lumiere-salon/hero.svg",
  },

  theme: {
    primary: "#8c6a5d",
    secondary: "#f3e8e1",
    background: "#fdf9f6",
    text: "#3a2f2b",
    headingFont: "Cormorant Garamond",
    bodyFont: "Lato",
    radius: "lg",
  },

  contact: {
    phone: "+91 90000 24680",
    email: "studio@lumiere.example",
    address: "22 Garden Road, Bhubaneswar, Odisha 751003",
    whatsapp: "919000024680",
  },

  seo: {
    title: "Lumière | Hair, Skin and Bridal Studio in Bhubaneswar",
    description: "Hair, skin and bridal treatments in a calm private studio in Bhubaneswar.",
    keywords: ["salon", "bridal makeup", "facial", "Bhubaneswar"],
  },
});
