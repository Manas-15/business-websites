import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { getShareableBusiness, getShareableBusinesses } from "@/lib/businesses";
import { buildSiteMetadata } from "@/lib/site-metadata";
import { ClientTemplate } from "@/templates/registry";

/*
 * Shareable preview of one business at /s/<slug>, prerendered for every entry
 * in businesses.json. Send this link to a prospect; it needs no cookie and no
 * rebuild. Marked noindex so demo sites never compete with the real one.
 * On a client's locked deployment (CLIENT_SLUG) only that client's slug resolves.
 */
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getShareableBusinesses().map((business) => ({ slug: business.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const config = getShareableBusiness((await params).slug);
  if (!config) return { title: "Not found" };
  return buildSiteMetadata(config, { index: false });
}

export default function BusinessPreviewPage({ params }: Props) {
  return (
    <Suspense fallback={null}>
      <ResolvedSite params={params} />
    </Suspense>
  );
}

async function ResolvedSite({ params }: Props) {
  const config = getShareableBusiness((await params).slug);
  if (!config) notFound();

  return (
    <SiteShell config={config}>
      <ClientTemplate config={config} />
    </SiteShell>
  );
}
