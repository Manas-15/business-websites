import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { getActiveBusiness } from "@/lib/active-business";
import { buildSiteMetadata } from "@/lib/site-metadata";
import { ClientTemplate } from "@/templates/registry";

export async function generateMetadata(): Promise<Metadata> {
  return buildSiteMetadata(await getActiveBusiness());
}

/**
 * The home page renders the active business: the admin panel's selection for
 * this browser, or the committed default. The selection is read from a cookie,
 * so the site streams inside a Suspense boundary.
 */
export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <ActiveSite />
    </Suspense>
  );
}

async function ActiveSite() {
  const config = await getActiveBusiness();
  return (
    <SiteShell config={config}>
      <ClientTemplate config={config} />
    </SiteShell>
  );
}
