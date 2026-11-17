# Business data and the admin panel

The website can be rebranded for any restaurant without touching code. Every business lives as one object in `src/data/businesses.json` (an array). The admin panel at `/admin` picks which one the home page shows.

## The pitch workflow

1. Run `npm run dev` and open `http://localhost:3000/admin`.
2. Click **Show on the website** on a business. The home page (`/`) now renders that business: name, colours, fonts, menu, photos, reviews, contact details and SEO tags. The choice is stored in a cookie, so it is instant and needs no rebuild.
3. Open `/` in another tab and present it. Use the **Variant** dropdown to show the same business in another layout (luxury, modern, traditional, casual).
4. To let the client open it on their phone, share the **preview link** `/s/<slug>` (or `/s/<slug>/<variant>`). These pages are prerendered for every business and marked `noindex`.
5. If the client does not sign, click **Show on the website** on the next restaurant. Nothing else changes.
6. When a client signs, create a new Vercel project from this same repository and set `CLIENT_SLUG=<slug>` on it. No separate repository is needed. See [deploying-to-vercel.md](deploying-to-vercel.md). (`src/data/active-business.json`, set with **Set as default** or `npm run use -- <slug>`, is still the fallback when `CLIENT_SLUG` is not set.)

**Hosted builds** (Netlify) can still switch via cookie and serve `/s/<slug>` links, but cannot write files, so **Set as default** and **Import** only work on your machine.

## Protecting the panel

Set `ADMIN_PASSWORD` in `.env.local` (and in the Netlify environment). Without it the panel is open in development and disabled in production.

## Adding businesses

Either paste JSON into **Add or update businesses from JSON** in the admin panel (validated, merged by `slug`), or edit `src/data/businesses.json` directly. Every entry is validated when the app starts; a bad entry fails the build with the slug and a list of problems.

A complete example is in [`examples/restaurant-business.example.json`](examples/restaurant-business.example.json).

## Shape of one business

```jsonc
{
  "slug": "kalinga-kitchen",            // lowercase, hyphens; also the folder under public/clients/
  "businessType": "restaurant",
  "templateVariant": "traditional",     // luxury | modern | traditional | casual

  "business": {
    "name": "Kalinga Kitchen",
    "tagline": "The true taste of Odisha, served with pride",   // hero headline
    "description": "One or two sentences shown under the headline.",
    "heroImage": "https://... or /clients/kalinga-kitchen/hero.jpg",
    "logo": "/clients/kalinga-kitchen/logo.svg",      // optional; a monogram is shown if missing
    "favicon": "/clients/kalinga-kitchen/favicon.svg" // optional
  },

  "theme": {
    "primary": "#1e3a5f",      // buttons, accents
    "secondary": "#f1dfa8",    // tinted panels, badges
    "background": "#fbf8f1",
    "text": "#1c2430",         // must have 4.5:1 contrast against background
    "headingFont": "Cormorant Garamond",  // Playfair Display | Cormorant Garamond | Montserrat | Inter | Poppins | Lato
    "bodyFont": "Lato",
    "radius": "none"           // none | sm | md | lg | full
  },

  "contact": {
    "phone": "+91 94370 11223",
    "email": "namaskar@kalingakitchen.example",
    "address": "Plot 21, Janpath Road, Bhubaneswar, Odisha 751001",
    "whatsapp": "919437011223",                 // optional, digits only with country code
    "mapEmbedUrl": "https://www.google.com/maps?q=...&output=embed"  // optional
  },

  "openingHours": [ { "day": "Every day", "hours": "11:30 AM - 11:00 PM" } ],   // optional
  "social": { "instagram": "https://...", "facebook": "https://...", "youtube": "https://...", "x": "https://..." }, // optional
  "announcement": { "text": "Raja festival thali, 14 to 16 June.", "href": "#reservations" },   // optional top strip

  "seo": {
    "title": "Kalinga Kitchen | Authentic Odia Restaurant in Bhubaneswar",
    "description": "Meta description for Google and social previews.",
    "keywords": ["Odia restaurant", "Bhubaneswar"],       // optional
    "ogImage": "https://..."                               // optional, defaults to heroImage
  },

  "sections": { "chef": false },   // optional: hide any of featuredDishes, menu, about, whyChooseUs, chef, gallery, testimonials, reservations, location, contact

  "content": {
    "heroEyebrow": "Authentic Odia cuisine · Est. 1998",   // optional small line above the headline
    "highlights": [ { "value": "25+", "label": "Years serving Odia food" } ],   // optional, 4 works best
    "about": {
      "eyebrow": "Our story",
      "title": "Food from our grandmothers' kitchens",
      "paragraphs": ["First paragraph.", "Second paragraph."],
      "image": { "src": "https://...", "alt": "Describe the photo" }   // optional, falls back to the first gallery photo
    },
    "chef": {                                   // optional
      "name": "Sulochana Mohanty",
      "title": "Founder & Head Cook",
      "quote": "Odia food is patient food.",
      "bio": "A short paragraph.",             // optional
      "image": "https://..."                   // optional
    },
    "features": [                               // "Why choose us" cards
      { "title": "Heritage recipes", "description": "…", "icon": "heart" }
      // icons: chef, leaf, flame, heart, coffee, users, clock, award, sparkles, shield, wine, utensils, map
    ],
    "menu": [
      {
        "id": "thalis",                         // lowercase, unique per business
        "name": "Thalis",
        "description": "Served with rice, dalma and a sweet.",   // optional
        "items": [
          {
            "name": "Odia Veg Thali",
            "description": "Dalma, santula, besara…",
            "price": "₹349",                   // optional; leave out if unknown and no price is shown
            "vegetarian": true,                 // optional
            "featured": true,                   // optional; featured dishes need an image
            "image": "https://...",             // optional
            "tag": "Most loved"                 // optional short badge
          }
        ]
      }
    ],
    "menuNote": "Prices include taxes.",        // optional line under the menu
    "gallery": [ { "src": "https://...", "alt": "The dining hall" } ],   // 5 or 6 photos work best
    "testimonials": [ { "quote": "…", "author": "Priya S.", "context": "Dinner guest", "rating": 5 } ]
  }
}
```

### Images

Image fields accept either an `https://` URL or a path under `public/` such as `/clients/<slug>/hero.jpg`. Local paths are checked at build time; missing files fail the build. Hosted URLs are not checked, so open the preview once after importing to make sure every photo loads.

### Changing the committed default from the terminal

```bash
npm run use                     # list businesses and show the current default
npm run use -- kalinga-kitchen  # make it the default
npm run use -- kalinga-kitchen luxury   # default, in another variant
```
