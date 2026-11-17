import type { MenuCategory } from "@/types/content";

/** Placeholder café menu. Replace with the client's real items and prices. */
export const cafeMenu: MenuCategory[] = [
  {
    id: "coffee",
    name: "Coffee",
    items: [
      { name: "Espresso", description: "Double shot from our house blend.", price: "₹140", vegetarian: true },
      { name: "Cappuccino", description: "Steamed milk, thick foam, espresso.", price: "₹220", vegetarian: true },
      { name: "Flat White", description: "Velvety microfoam over a ristretto.", price: "₹230", vegetarian: true },
      { name: "Cold Brew", description: "Steeped 18 hours, served over ice.", price: "₹260", vegetarian: true },
    ],
  },
  {
    id: "tea",
    name: "Tea",
    items: [
      { name: "Masala Chai", description: "Slow-brewed with ginger, cardamom and clove.", price: "₹120", vegetarian: true },
      { name: "Matcha Latte", description: "Ceremonial-grade matcha with oat or dairy milk.", price: "₹240", vegetarian: true },
      { name: "Green Tea", description: "Loose-leaf, served in a pot for two.", price: "₹180", vegetarian: true },
    ],
  },
  {
    id: "bakery",
    name: "Bakery",
    items: [
      { name: "Butter Croissant", description: "Laminated overnight, baked each morning.", price: "₹170", vegetarian: true },
      { name: "Banana Bread", description: "Walnut and dark chocolate, sliced to order.", price: "₹150", vegetarian: true },
      { name: "Blueberry Muffin", description: "Lemon zest and a crunchy sugar top.", price: "₹160", vegetarian: true },
    ],
  },
  {
    id: "light-bites",
    name: "Light bites",
    items: [
      { name: "Avocado Toast", description: "Sourdough, smashed avocado, chilli flakes, seeds.", price: "₹320", vegetarian: true },
      { name: "Paneer Sandwich", description: "Grilled paneer, mint chutney, roasted peppers.", price: "₹290", vegetarian: true },
    ],
  },
];
