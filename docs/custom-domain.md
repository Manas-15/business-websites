# Connecting a custom domain

This guide connects a client's own domain (for example `bellaitalia.example`) to their Netlify site. Do this after the site has deployed and works at its Netlify address.

## Before you start

- You can sign in to the client's domain registrar, or the client has given you access.
- The domain is registered. Domain registration is a separate cost from hosting.

## 1. Add the domain in Netlify

1. Open the client's site in Netlify and go to **Domain management**.
2. Choose **Add a domain**, enter the domain (for example `www.bellaitalia.example`), and confirm.
3. Add the bare domain (`bellaitalia.example`) too, and set Netlify to redirect it to the `www` version, or the other way round. Pick one as the primary and stick with it.

## 2. Update the DNS records

Netlify shows the records to add. At the registrar, add:

| Type | Name | Value |
|---|---|---|
| `CNAME` | `www` | the Netlify site address shown in the dashboard (`<site-name>.netlify.app`) |
| `A` | `@` (bare domain) | the load balancer IP that Netlify shows for the domain |

Use the exact values Netlify displays, because they can change. If the registrar offers Netlify DNS as an option, you can let Netlify manage all records, which is simpler.

DNS changes can take up to 48 hours to spread, though they often finish within an hour.

## 3. Turn on HTTPS

Once DNS points to Netlify, go to **Domain management** → **HTTPS** and choose **Verify DNS configuration**, then **Provision certificate**. Netlify issues a free Let's Encrypt certificate automatically. Enable **Force HTTPS** so visitors on `http://` are redirected.

## 4. Update the site address

Set `NEXT_PUBLIC_SITE_URL` in the site's environment variables to the primary address (for example `https://www.bellaitalia.example`), then trigger a new deploy. This makes canonical links, the sitemap and structured data use the right domain.

## 5. Check the result

- `https://www.bellaitalia.example` loads with a valid padlock.
- The bare domain redirects to the primary address.
- `/sitemap.xml` lists the same domain.
- Search Console (optional): add the property, then submit `/sitemap.xml`.

## Troubleshooting

- **"DNS configuration not verified"**: the records have not propagated yet, or the values differ from Netlify's. Recheck them at the registrar.
- **Certificate not issued**: the DNS must point at Netlify first. Verify DNS, then provision again.
- **Mixed content warnings**: an image or link uses `http://`. Change it to `https://` in the config or data.
