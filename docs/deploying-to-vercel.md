# Deploying to Vercel: one repo, many sites

Every site, demo or paid, is built from this one repository. Vercel lets you connect the same Git repository to as many projects as you like, and each project picks its business with an environment variable. A fix pushed to the repository reaches every site on its next deploy.

| | Demo site | Paid client site |
|---|---|---|
| Vercel projects | One, e.g. `yourname-demos` | One per client |
| Shows | Every business, via `/s/<slug>` links and `/admin` | Only the business named in `CLIENT_SLUG` |
| Domain | The free `*.vercel.app` address | The client's own domain |

## One-time: the demo site

1. In Vercel, choose **Add New → Project** and import this repository.
2. Add these environment variables:
   - `ADMIN_PASSWORD`: a password for `/admin`
   - `NEXT_PUBLIC_SITE_URL`: the project's address, e.g. `https://yourname-demos.vercel.app`
3. Deploy. Do **not** set `CLIENT_SLUG` on this project.

## Each new prospect (about 10 minutes)

1. Collect their name, menu, photos, phone, address and opening hours (Google Maps, Zomato and Instagram are good sources).
2. Add them to `src/data/businesses.json`, either directly or through **Import** in `/admin` on your machine. The format is in [business-data.md](business-data.md).
3. Run `npm run build` locally to catch validation errors, then commit and push.
4. When Vercel finishes deploying (about a minute), send the owner their link:
   - `https://yourname-demos.vercel.app/s/<slug>`
   - `https://yourname-demos.vercel.app/s/<slug>/<variant>` to show another design

If the owner declines, leave the entry in place or delete it. Nothing else changes.

## Each paid client (about 15 minutes)

1. Replace any placeholder content in their entry with real details: real reviews, confirmed prices and offers, their own photos.
2. In Vercel, choose **Add New → Project** and import **this same repository** again. Name the project after the client, e.g. `kalinga-kitchen`.
3. Add these environment variables:
   - `CLIENT_SLUG`: their slug, e.g. `kalinga-kitchen`
   - `CLIENT_VARIANT` (optional): the design they chose, e.g. `luxury`. Without it, their entry's `templateVariant` is used.
   - `NEXT_PUBLIC_SITE_URL`: their final address, e.g. `https://www.kalingakitchen.in`
   - Do **not** set `ADMIN_PASSWORD`. The admin panel is always off on client sites.
4. Deploy, then add their domain under **Settings → Domains** and follow Vercel's DNS instructions. See [custom-domain.md](custom-domain.md).
5. Check the live site: the home page shows their business, `/admin` returns 404, and `/s/<another-slug>` shows the "Not found" page.

### What `CLIENT_SLUG` does

- The home page always shows that business; the admin switcher cookie is ignored.
- `/admin` returns 404.
- `/s/` links work only for that business; any other slug shows the "Not found" page, so a client's domain never exposes other prospects' demos.
- A slug that is not in `businesses.json`, or a `CLIENT_VARIANT` that does not exist, fails the build with a clear message.

Environment variables are read at build time. After changing one, redeploy (**Deployments → ⋯ → Redeploy**).

## Updating client sites

Push to the repository. Every connected project rebuilds. To edit one client's content, change their entry in `businesses.json` and push; the other sites rebuild too but look the same.

If you would rather not rebuild every site on each push, set **Settings → Git → Ignored Build Step** on a client project, or turn off automatic deployments for it and redeploy by hand when you change that client.

## When to give a client their own repository

Only when they need something the template cannot do, such as online ordering or a custom page. A separate repository means fixes no longer reach it automatically. [creating-a-client-site.md](creating-a-client-site.md) covers that path.

## Costs

- Vercel's free Hobby plan is for non-commercial use. Once clients pay you, use the Pro plan, which covers all projects in the team, or host client sites on Netlify (see [deploying-to-netlify.md](deploying-to-netlify.md)).
- Register each domain in the client's name, or bill them yearly for it.
