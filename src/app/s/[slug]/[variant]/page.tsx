import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { getShareableBusiness, getShareableBusinesses, isVariantOf, withVariant } from "@/lib/businesses";
import { buildSiteMetadata } from "@/lib/site-metadata";
import { ClientTemplate } from "@/templates/registry";
import { IMPLEMENTED_VARIANTS } from "@/types/client-config";

/** /s/<slug>/<variant>: the same business in another template variant, for side-by-side pitching. */
type Props = { params: Promise<{ slug: string; variant: string }> };

export function generateStaticParams() {
  return getShareableBusinesses().flatMap((business) => {
    const variants: readonly string[] = IMPLEMENTED_VARIANTS[business.businessType];
    return variants.map((variant) => ({ slug: business.slug, variant }));
  });
}

async function resolve(params: Props["params"]) {
  const { slug, variant } = await params;
  const base = getShareableBusiness(slug);
  if (!base || !isVariantOf(base, variant)) return undefined;
  return withVariant(base, variant);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const config = await resolve(params);
  if (!config) return { title: "Not found" };
  return buildSiteMetadata(config, { index: false });
}

export default function BusinessVariantPage({ params }: Props) {
  return (
    <Suspense fallback={null}>
      <ResolvedSite params={params} />
    </Suspense>
  );
}

async function ResolvedSite({ params }: Props) {
  const config = await resolve(params);
  if (!config) notFound();

  return (
    <SiteShell config={config}>
      <ClientTemplate config={config} />
    </SiteShell>
  );
}
