# Deploying to Netlify

Each client repository deploys as its own Netlify site. The steps below are the same for every client.

## Before you start

- The client repository is on GitHub and `npm run build` passes locally.
- You know the site's final public address, for example `https://www.bellaitalia.example`.

## Plan and limits

Netlify's free plan is enough for a small business site, but the limits have changed. Accounts created before 4 September 2025 use a fixed allowance of bandwidth and build minutes. Newer accounts use a credit system instead, and the monthly allowance is lower. Check the billing page in your Netlify account for the model that applies to you.

On the free plan, a site is paused when it exceeds its quota, not billed. A paused site returns an error until the next billing period or until you upgrade.

To keep usage low:

- compress photos before adding them (see [creating-a-client-site.md](creating-a-client-site.md))
- avoid rebuilding for every small text change in a busy period
- use one Netlify site per client, since builds count against each site

Hosting, domain and other third-party costs are separate from the Netlify plan. The template itself has no paid dependencies.

## 1. Create the site

1. In Netlify, choose **Add new site** → **Import an existing project**.
2. Connect GitHub and select the client repository.
3. Netlify detects Next.js. Leave the build settings as detected. The repository's `netlify.toml` sets the build command and Node version.
4. Choose **Deploy**.

## 2. Set the environment variable

In **Site configuration** → **Environment variables**, add:

| Key | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://www.bellaitalia.example` (your final address, no trailing slash) |

Redeploy after adding it, because `NEXT_PUBLIC_` values are compiled into the build.

Until a custom domain is connected, the site's own Netlify address works for testing. Set `NEXT_PUBLIC_SITE_URL` to that address first, then change it once the domain is live.

## 3. Check the deployment

When the deploy finishes, open the site and check:

- the page loads and the title in the browser tab is correct
- `/sitemap.xml` lists the home page with the right domain
- `/robots.txt` points to the sitemap
- an unknown URL such as `/does-not-exist` shows the "page not found" page
- the contact form's WhatsApp and email links work on a phone

## Build settings used

`netlify.toml` in the repository sets:

```toml
[build]
  command = "npm run build"

[build.environment]
  NODE_VERSION = "22"
```

`npm run build` runs an asset check before compiling. If the check fails, the deploy log lists each missing file.

## Troubleshooting

- **Deploy fails with "Missing image or asset files"**: the path is in `src/` but the file is not in `public/`. Add the file, or correct the path, and push again.
- **Sitemap or canonical links show `localhost`**: `NEXT_PUBLIC_SITE_URL` is not set in Netlify, or the site was not redeployed after setting it.
- **Build fails on Node version**: check that `NODE_VERSION` in `netlify.toml` is 20.9 or newer.
- **Fonts look like the fallback**: fonts are downloaded at build time. Check the build log for a font download error.
