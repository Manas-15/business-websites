# Business Website Template

A reusable Next.js template for small business websites. Each client gets their own repository, created from this one, with their own configuration, content and assets. Each client site deploys independently and uses its own domain.

**Restaurants are data-driven.** Every restaurant lives as one JSON object in `src/data/businesses.json`, and the admin panel at `/admin` switches the whole website (name, colours, fonts, menu, photos, reviews, SEO) between them instantly. Use it to pitch the same site to several owners, then commit the winner as the default. See [docs/business-data.md](docs/business-data.md).

Templates are available for four business types, each with its own design:

| Business type | Variants | Look |
|---|---|---|
| Restaurant | `luxury`, `modern`, `traditional`, `casual`, `nightlife` | Editorial serif, split with rounded cards, centred and ruled, bold and colourful, dark neon for bars, lounges and clubs |
| Café | `minimalist`, `warm`, `modern`, `premium` | Text-led, cosy tinted bands, dark menu board, fine-dining typography |
| Gym | `dark-premium`, `modern-fitness`, `minimalist` | Heavy uppercase on dark, brand-colour block with card schedule, quiet ruled list |
| Salon | `luxury`, `elegant-minimal` | Arch-shaped photography, text-only hero with a single-column service list |

Variants are selected in the `templateVariant` field of the config. Validation rejects any variant that isn't listed in `IMPLEMENTED_VARIANTS`, so a config can't select a page that doesn't exist.

## Stack

Next.js (App Router) · React · TypeScript (strict) · Tailwind CSS v4 · shadcn/ui primitives · Motion · Formik + Yup · lucide-react icons. Fonts are self-hosted at build time with `next/font`.

No database, CMS or paid APIs. Forms prepare a message that the visitor sends through WhatsApp or email, so there is nothing to host or pay for on the server side.

## Repository layout

```
src/
  data/
    businesses.json        ← every restaurant the admin panel can switch between
    active-business.json   ← the committed default shown to the public
  app/admin/               ← the site switcher (password: ADMIN_PASSWORD)
  app/s/[slug]/            ← shareable, noindex preview of any business
  config/
    client.ts              ← resolves the default business from src/data
    examples/              ← reference configs for each business type
    define-client-config.ts
    navigation.ts, theme.ts, sections.ts
  data/                    ← client content: menus, services, team, gallery, reviews
    restaurant/  cafe/  gym/  salon/
  templates/               ← page layouts per business type and variant
    registry.tsx           ← maps businessType + templateVariant to a page
  components/
    common/                ← buttons, sections, headings, WhatsApp button, JSON-LD
    layout/                ← header, footer, announcement bar
    navigation/            ← desktop and mobile menus
    forms/                 ← Formik form fields and the inquiry form
    sections/              ← contact, location and request-form sections
    ui/                    ← shadcn primitives (card, sheet, separator, button)
  lib/                     ← validation, inquiry definitions, links, SEO helpers
  types/                   ← configuration and content types
public/clients/<slug>/     ← each client's logo, favicon, hero and photos
scripts/check-assets.mjs   ← fails the build if a referenced image is missing
docs/                      ← guides for creating, deploying and maintaining sites
```

## Local development

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build      # runs the asset check first
npm run start      # serve the production build
npm run use -- <slug>   # set the committed default business
```

Copy `.env.example` to `.env.local`. Set `NEXT_PUBLIC_SITE_URL` to the site's public address when testing canonical links and the sitemap, and `ADMIN_PASSWORD` to protect `/admin` (it is open in development when unset).

## Documentation

- [Business data and the admin panel](docs/business-data.md)
- [Creating a client website](docs/creating-a-client-site.md)
- [Deploying to Netlify](docs/deploying-to-netlify.md)
- [Connecting a custom domain](docs/custom-domain.md)
- [Updating the template safely](docs/updating-the-template.md)
- [Showing every variant to a customer](docs/template-showcase.md)

## Design principles

- **Config drives everything client-specific.** Reusable components never contain a client's name, colours, copy or images.
- **Accessibility and performance are checked at build time** where possible: contrast of text against background, asset references, and typed configuration.
- **Honest forms.** The site never claims a message was delivered when it was only prepared for the visitor to send.
