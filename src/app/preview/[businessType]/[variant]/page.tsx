import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { buildThemeStyle } from "@/config/theme";
import { findPreviewConfig, previewConfigs } from "@/config/preview";
import { isTemplatePreviewEnabled } from "@/lib/template-preview";
import { ClientTemplate } from "@/templates/registry";

/*
 * Unknown or disabled routes are rejected in PreviewVariant with notFound().
 * Cache Components needs at least one static param, so a placeholder is returned
 * when the preview is off; it renders as a 404.
 */
export function generateStaticParams() {
  if (!isTemplatePreviewEnabled()) return [{ businessType: "_", variant: "_" }];
  return previewConfigs.map((config) => ({
    businessType: config.businessType,
    variant: config.templateVariant,
  }));
}

type PreviewVariantProps = {
  params: Promise<{ businessType: string; variant: string }>;
};

export default function PreviewVariantPage({ params }: PreviewVariantProps) {
  return (
    <Suspense fallback={null}>
      <PreviewVariant params={params} />
    </Suspense>
  );
}

async function PreviewVariant({ params }: PreviewVariantProps) {
  if (!isTemplatePreviewEnabled()) notFound();

  const { businessType, variant } = await params;
  const config = findPreviewConfig(businessType, variant);
  if (!config) notFound();

  return (
    <div style={buildThemeStyle(config.theme)} className="flex min-h-dvh flex-col bg-background font-sans text-foreground">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted px-4 py-3 text-sm sm:px-6">
        <Link href="/preview" className="font-medium text-primary underline-offset-4 hover:underline">
          ← All variants
        </Link>
        <span className="text-muted-foreground">
          Preview · {businessType} · {variant}
        </span>
      </div>
      <ClientTemplate config={config} />
    </div>
  );
}
