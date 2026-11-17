import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import activeDefault from "@/data/active-business.json";
import { AdminPanel, type BusinessSummary } from "@/app/admin/AdminPanel";
import { ACTIVE_BUSINESS_COOKIE, decodeSelection } from "@/lib/active-business";
import { isAdminAuthenticated, isAdminEnabled, isAdminOpen } from "@/lib/admin-auth";
import { businesses, getBusiness } from "@/lib/businesses";
import { canWriteData } from "@/lib/business-store";
import { IMPLEMENTED_VARIANTS } from "@/types/client-config";

export const metadata: Metadata = { title: "Site switcher" };

export default function AdminPage() {
  return (
    <Suspense fallback={<p className="p-8 text-sm text-muted-foreground">Loading…</p>}>
      <AdminDashboard />
    </Suspense>
  );
}

/** Last comma-separated part before the postcode line, e.g. "Bhubaneswar" from a full address. */
function cityOf(address: string): string {
  const parts = address.split(",").map((part) => part.trim()).filter(Boolean);
  const candidate = parts.length >= 2 ? parts[parts.length - 2] : parts[0];
  return candidate ?? "";
}

async function AdminDashboard() {
  if (!isAdminEnabled()) notFound();
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const selection = decodeSelection((await cookies()).get(ACTIVE_BUSINESS_COOKIE)?.value);
  const active = selection && getBusiness(selection.slug) ? selection : null;

  const summaries: BusinessSummary[] = businesses.map((config) => ({
    slug: config.slug,
    name: config.business.name,
    tagline: config.business.tagline,
    city: cityOf(config.contact.address),
    businessType: config.businessType,
    defaultVariant: config.templateVariant,
    variants: [...IMPLEMENTED_VARIANTS[config.businessType]],
    heroImage: config.business.heroImage,
    logo: config.business.logo ?? null,
    theme: {
      primary: config.theme.primary,
      secondary: config.theme.secondary,
      background: config.theme.background,
      text: config.theme.text,
    },
    fonts: `${config.theme.headingFont} / ${config.theme.bodyFont}`,
    sections: config.content ? config.content.menu.reduce((count, category) => count + category.items.length, 0) : null,
  }));

  return (
    <AdminPanel
      businesses={summaries}
      active={active ? { slug: active.slug, variant: active.variant ?? null } : null}
      defaultSelection={{ slug: activeDefault.slug, variant: activeDefault.templateVariant }}
      canWrite={await canWriteData()}
      open={isAdminOpen()}
    />
  );
}
