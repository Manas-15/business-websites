# Showing every variant to a customer

The master repository includes a showcase at `/preview`. It lists every business type and variant, and each link opens that variant with sample content. Use it to help a customer choose a look before you configure their site.

The showcase is off by default, so client sites never expose it.

## Run it locally

1. Create `.env.local` in the project root:

   ```
   TEMPLATE_PREVIEW=true
   ```

2. Start the site and open http://localhost:3000/preview:

   ```bash
   npm run dev
   ```

Remove the line, or set it to anything other than `true`, to hide the showcase again.

## Share it as a link

Deploy the master repository to Netlify as its own site, with `TEMPLATE_PREVIEW` set to `true` in **Site configuration → Environment variables**. Netlify then gives you a shareable link, for example `https://business-template-showcase.netlify.app/preview`.

Keep this showcase site separate from client sites. Do not set `TEMPLATE_PREVIEW` on a client's site.

## What the customer sees

- An index page with all 13 variants, grouped by business type.
- Each variant page has a bar at the top with a link back to the index. The site's header and footer are not shown, so the customer sees only the template layout.
- Every page is marked `noindex`, so search engines won't list the showcase.

## Notes

- All variants of one business share the same sample content, so differences come from the layout. Colours and fonts come from each business's sample config in `src/config/preview.ts`.
- A new variant appears in the showcase automatically once it is listed in `IMPLEMENTED_VARIANTS`.
- The showcase reads sample configs from `src/config/client.ts` (restaurant) and `src/config/examples/` (café, gym, salon). Changing those files changes the showcase too.
