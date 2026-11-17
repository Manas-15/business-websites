import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { previewConfigs } from "@/config/preview";
import { isTemplatePreviewEnabled } from "@/lib/template-preview";
import { BUSINESS_TYPES, type BusinessType } from "@/types/client-config";

const BUSINESS_LABELS: Record<BusinessType, string> = {
  restaurant: "Restaurant",
  cafe: "Café",
  gym: "Gym",
  salon: "Salon",
};

function variantLabel(variant: string): string {
  const words = variant.replace(/-/g, " ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/** Reads the environment at request time, so the page stays hidden when the preview is off. */
async function PreviewGate({ children }: { children: React.ReactNode }) {
  await connection();
  if (!isTemplatePreviewEnabled()) notFound();
  return children;
}

export default function TemplatePreviewIndex() {
  return (
    <Suspense fallback={null}>
      <PreviewGate>
        <main className="min-h-dvh bg-background px-4 py-16 text-foreground sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">Template showcase</p>
            <h1 className="mt-4 font-heading text-4xl sm:text-5xl">Every business type and variant</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Each link shows one template with the same sample content, so you can compare layouts side by side. This
              page is only available when TEMPLATE_PREVIEW is set to true.
            </p>

            <div className="mt-12 space-y-12">
              {BUSINESS_TYPES.map((businessType) => (
                <section key={businessType} aria-labelledby={`preview-${businessType}`}>
                  <h2 id={`preview-${businessType}`} className="font-heading text-2xl">
                    {BUSINESS_LABELS[businessType]}
                  </h2>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {previewConfigs
                      .filter((config) => config.businessType === businessType)
                      .map((config) => (
                        <li key={config.templateVariant}>
                          <Link
                            href={`/preview/${businessType}/${config.templateVariant}`}
                            className="flex items-center justify-between rounded-[var(--radius)] border border-border bg-card px-5 py-4 text-card-foreground transition-colors hover:bg-muted"
                          >
                            <span className="font-medium">{variantLabel(config.templateVariant)}</span>
                            <span aria-hidden="true" className="text-primary">
                              View
                            </span>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </main>
      </PreviewGate>
    </Suspense>
  );
}
