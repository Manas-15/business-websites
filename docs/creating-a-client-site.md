# Creating a client website

This guide takes a new client from a business brief to a configured repository that builds and runs locally. Deployment is covered in [deploying-to-netlify.md](deploying-to-netlify.md).

## 1. Choose the business type and variant

Pick the template that matches the client's business and the look they want.

| `businessType` | `templateVariant` |
|---|---|
| `restaurant` | `luxury`, `modern`, `traditional` or `casual` |
| `cafe` | `minimalist`, `warm`, `modern` or `premium` |
| `gym` | `dark-premium`, `modern-fitness` or `minimalist` |
| `salon` | `luxury` or `elegant-minimal` |

Build-time validation rejects any other value. Each variant has its own layout, so pick the one that matches the client's brand rather than the one whose sections look closest.

## 2. Create the client repository

1. On GitHub, open the master repository and choose **Use this template** → **Create a new repository**.
2. Name it after the client, for example `bella-italia-restaurant`.
3. Clone it locally and install dependencies:

   ```bash
   git clone https://github.com/<you>/bella-italia-restaurant.git
   cd bella-italia-restaurant
   npm install
   ```

Use **Use this template** rather than forking, so the client repository has no shared history with other clients.

## 3. Write the configuration

**Restaurants:** skip this and step 4. Add the restaurant to `src/data/businesses.json` (or import it through `/admin`), then run `npm run use -- <slug>` so it becomes the committed default. The format is documented in [business-data.md](business-data.md).

**Other business types:** edit `src/config/client.ts`. Start from the matching reference config in `src/config/examples/`:

| Business | Reference file |
|---|---|
| Café | `cafe-minimalist.ts` |
| Gym | `gym-dark-premium.ts` |
| Salon | `salon-luxury.ts` |
| Restaurant | the current `client.ts` |

Fill in:

- **business**: name, tagline, description, and the paths to the logo, favicon and hero image.
- **theme**: `primary`, `secondary`, `background` and `text` colours (hex values), plus heading and body fonts from the supported list and an optional corner radius.
- **contact**: phone, email, address, WhatsApp number (digits with country code, no `+`), and optionally a Google Maps embed URL.
- **openingHours**, **social**, **announcement**: optional. Leave out what the client doesn't need.
- **seo**: the browser title, meta description, keywords and optional social-share image.
- **sections** (optional): set any section to `false` to hide it. Navigation links to hidden sections are removed automatically.

Colour rules are checked at build time. The body text must reach a contrast ratio of at least 4.5:1 against the background, or the build fails with the actual ratio.

### Supported fonts

Playfair Display, Cormorant Garamond, Montserrat, Inter, Poppins, Lato.

### Dark themes

The `dark-premium` gym template is designed for a dark background and light text. Set a dark `background` and a light `text` colour.

## 4. Replace the content

Content lives in `src/data/<business>/`. Edit the files for the client's business:

- **Restaurant**: `menu.ts`, `about.ts`, `features.ts`, `gallery.ts`, `testimonials.ts`
- **Café**: `menu.ts`, `offers.ts`, `content.ts`
- **Gym**: `content.ts` (facilities, classes, plans, trainers, gallery, reviews, about)
- **Salon**: `content.ts` (services, packages, team, gallery, reviews, about)

Items marked `featured: true` with an `image` appear in the restaurant's featured dishes section.

Keep the data types from `src/types/content.ts`. The compiler reports anything that doesn't match.

### Replace placeholder text

Every template ships with placeholder prices, testimonials, bios and offer terms. Replace them before launch. Do not publish testimonials that are not from real customers, and confirm offer terms with the client.

## 5. Add the client's images

Put images under `public/clients/<slug>/`, using the slug that appears in the paths in your config and data files:

```
public/clients/bella-italia/
  logo.svg          favicon.svg       hero.jpg
  dishes/           gallery/          team/ or trainers/
```

Use descriptive file names and keep photos reasonably small (under about 500 KB each). JPEG or WebP is better than SVG for photographs. Use JPEG or PNG for `seo.ogImage`, because many social platforms ignore SVG previews.

Every `/clients/...` path in `src/` must have a matching file in `public/`. `npm run build` checks this and stops with the list of missing files if any are absent.

## 6. Set the site address

Create `.env.local` for local testing, and set the same value in Netlify later:

```
NEXT_PUBLIC_SITE_URL=https://www.bellaitalia.example
```

Use the final public address, without a trailing slash. Canonical links, Open Graph URLs and the sitemap all depend on it.

## 7. Check it locally

```bash
npm run typecheck
npm run lint
npm run build
npm run start
```

Then open `http://localhost:3000` and check:

- every section appears, and the ones you turned off are gone
- the navigation links scroll to the right section, under the header
- the contact, reservation or appointment forms show errors for empty fields and produce a message preview when valid
- the WhatsApp and email links open with the message filled in
- the page works at phone width (around 390 px) with no sideways scrolling

## 8. Commit and push

Commit the client's configuration, content and assets. Do not commit `.env.local`.

```bash
git add -A
git commit -m "Configure Bella Italia site"
git push
```

Then deploy using [deploying-to-netlify.md](deploying-to-netlify.md).

## Troubleshooting

| Message | Cause and fix |
|---|---|
| `businessType must be one of…` | Check the spelling against the table in step 1. |
| `templateVariant must be one of: …` | The variant isn't implemented yet. Use one from the list in the error. |
| `theme.text needs at least 4.5:1 contrast` | Choose a darker text colour or a lighter background. |
| `Missing image or asset files referenced from source` | Add the file under `public/` or correct the path. |
| `NEXT_PUBLIC_SITE_URL must be an absolute URL` | Include the scheme, e.g. `https://www.example.com`. |
