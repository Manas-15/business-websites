"use client";

import { Check, ExternalLink, Link2, LogOut, Star } from "lucide-react";
import Image from "next/image";
import { useActionState, useState } from "react";
import { adminAction, logout, type ActionState } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

export interface BusinessSummary {
  slug: string;
  name: string;
  tagline: string;
  city: string;
  businessType: string;
  defaultVariant: string;
  variants: string[];
  heroImage: string;
  logo: string | null;
  theme: { primary: string; secondary: string; background: string; text: string };
  fonts: string;
  /** Number of menu items, when the business carries its content in JSON. */
  sections: number | null;
}

interface Selection {
  slug: string;
  variant: string | null;
}

interface AdminPanelProps {
  businesses: BusinessSummary[];
  /** The cookie selection for this browser, if any. */
  active: Selection | null;
  /** The committed default from src/data/active-business.json. */
  defaultSelection: Selection;
  /** Whether this server can write to src/data (development only). */
  canWrite: boolean;
  /** True when no ADMIN_PASSWORD is set in development. */
  open: boolean;
}

function labelOf(variant: string): string {
  return variant.replace(/-/g, " ").replace(/^\w/, (char) => char.toUpperCase());
}

function describe(selection: Selection | null, businesses: BusinessSummary[]): string {
  if (!selection) return "";
  const match = businesses.find((business) => business.slug === selection.slug);
  const name = match?.name ?? selection.slug;
  return selection.variant ? `${name} · ${labelOf(selection.variant)}` : name;
}

const inputClass =
  "rounded-[var(--radius)] border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40";
const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius)] px-3.5 py-2 text-sm font-semibold transition-colors disabled:opacity-60";
const primaryButton = cn(buttonBase, "bg-primary text-primary-foreground hover:bg-primary/90");
const ghostButton = cn(buttonBase, "border border-border bg-transparent text-foreground hover:bg-muted");

/** The site switcher: pick which business the website shows, set the committed default, import JSON. */
export function AdminPanel({ businesses, active, defaultSelection, canWrite, open }: AdminPanelProps) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(adminAction, {});
  const [copied, setCopied] = useState<string | null>(null);

  const showing = active ?? defaultSelection;

  async function copyLink(path: string) {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${path}`);
      setCopied(path);
      setTimeout(() => setCopied(null), 1600);
    } catch {
      window.prompt("Copy this link", `${window.location.origin}${path}`);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.25em] text-primary uppercase">Site switcher</p>
          <h1 className="mt-1 font-heading text-2xl font-semibold sm:text-3xl">Choose the business to show</h1>
        </div>
        <div className="flex items-center gap-2">
          <a href="/" target="_blank" rel="noopener" className={primaryButton}>
            Open the website <ExternalLink className="size-4" aria-hidden="true" />
          </a>
          {!open ? (
            <form action={logout}>
              <button type="submit" className={ghostButton}>
                <LogOut className="size-4" aria-hidden="true" /> Sign out
              </button>
            </form>
          ) : null}
        </div>
      </header>

      <section aria-label="Status" className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-secondary p-5">
          <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Showing in this browser</p>
          <p className="mt-2 font-heading text-lg font-semibold">{describe(showing, businesses)}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {active ? "Set from this panel (cookie). Other visitors see the default." : "The committed default. No selection cookie is set."}
          </p>
          {active ? (
            <form action={formAction} className="mt-4">
              <input type="hidden" name="intent" value="clear" />
              <button type="submit" disabled={pending} className={ghostButton}>
                Back to default
              </button>
            </form>
          ) : null}
        </div>
        <div className="rounded-2xl border border-border bg-secondary p-5">
          <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Default for every visitor</p>
          <p className="mt-2 font-heading text-lg font-semibold">{describe(defaultSelection, businesses)}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Stored in <code className="text-foreground">src/data/active-business.json</code>. Commit it and deploy to change what the public sees.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-secondary p-5">
          <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">How to pitch</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Click <strong className="text-foreground">Show on the website</strong> on a business below.</li>
            <li>Open the website in a new tab. It is fully rebranded.</li>
            <li>Share a <strong className="text-foreground">preview link</strong> so the client can open it on their phone.</li>
          </ol>
        </div>
      </section>

      {open ? (
        <p className="mt-4 rounded-[var(--radius)] border border-primary/40 bg-primary/10 px-4 py-3 text-sm">
          No <code>ADMIN_PASSWORD</code> is set, so this panel is open while you develop. Set one in <code>.env.local</code> before deploying.
        </p>
      ) : null}

      <p role="status" aria-live="polite" className="mt-4 min-h-6 text-sm">
        {state.message ? (
          <span className={cn("inline-flex items-start gap-2 rounded-[var(--radius)] px-3 py-2", state.ok ? "bg-emerald-500/15 text-emerald-300" : "bg-red-500/15 text-red-300")}>
            {state.ok ? <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" /> : null}
            <span className="whitespace-pre-line">{state.message}</span>
          </span>
        ) : null}
      </p>

      <section aria-labelledby="businesses-heading" className="mt-6">
        <h2 id="businesses-heading" className="font-heading text-lg font-semibold">
          Businesses <span className="text-muted-foreground">({businesses.length})</span>
        </h2>
        <ul className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {businesses.map((business) => {
            const isActive = showing.slug === business.slug;
            const isDefault = defaultSelection.slug === business.slug;
            const previewPath = `/s/${business.slug}`;
            return (
              <li
                key={business.slug}
                className={cn(
                  "flex flex-col overflow-hidden rounded-2xl border bg-secondary transition-colors",
                  isActive ? "border-primary ring-2 ring-primary/30" : "border-border",
                )}
              >
                <div className="relative aspect-[16/9]">
                  <Image src={business.heroImage} alt="" fill sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center gap-3">
                      {business.logo ? (
                        <Image src={business.logo} alt="" width={36} height={36} className="size-9 rounded-md bg-white/90 object-contain p-1" />
                      ) : null}
                      <div>
                        <p className="font-heading text-lg font-semibold text-white">{business.name}</p>
                        <p className="text-xs text-white/80">{business.city}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {isActive ? (
                        <span className="rounded-full bg-primary px-2 py-0.5 text-[0.65rem] font-bold tracking-wider text-primary-foreground uppercase">Showing</span>
                      ) : null}
                      {isDefault ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[0.65rem] font-bold tracking-wider text-black uppercase">
                          <Star className="size-3" aria-hidden="true" /> Default
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-5">
                  <p className="text-sm text-muted-foreground">{business.tagline}</p>

                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                    <div>
                      <dt className="text-muted-foreground">Template</dt>
                      <dd className="font-medium capitalize">{business.businessType} · {labelOf(business.defaultVariant)}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Fonts</dt>
                      <dd className="font-medium">{business.fonts}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Palette</dt>
                      <dd className="mt-1 flex gap-1">
                        {Object.entries(business.theme).map(([key, value]) => (
                          <span key={key} title={`${key} ${value}`} className="size-5 rounded-full border border-white/20" style={{ background: value }} />
                        ))}
                      </dd>
                    </div>
                    {business.sections !== null ? (
                      <div>
                        <dt className="text-muted-foreground">Menu</dt>
                        <dd className="font-medium">{business.sections} dishes</dd>
                      </div>
                    ) : null}
                  </dl>

                  <form action={formAction} className="mt-auto space-y-3">
                    <input type="hidden" name="slug" value={business.slug} />
                    <label className="block text-xs text-muted-foreground">
                      Variant
                      <select name="variant" defaultValue={isActive ? (showing.variant ?? business.defaultVariant) : business.defaultVariant} className={cn(inputClass, "mt-1 w-full")}>
                        {business.variants.map((variant) => (
                          <option key={variant} value={variant}>
                            {labelOf(variant)}
                            {variant === business.defaultVariant ? " (configured)" : ""}
                          </option>
                        ))}
                      </select>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <button type="submit" name="intent" value="activate" disabled={pending} className={primaryButton}>
                        Show on the website
                      </button>
                      <button
                        type="submit"
                        name="intent"
                        value="set-default"
                        disabled={pending || !canWrite}
                        title={canWrite ? "Write this choice to src/data/active-business.json" : "Only available on your development machine"}
                        className={ghostButton}
                      >
                        <Star className="size-4" aria-hidden="true" /> Set as default
                      </button>
                    </div>
                  </form>

                  <div className="flex flex-wrap gap-2 border-t border-border pt-4 text-sm">
                    <a href={previewPath} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-primary hover:underline">
                      <ExternalLink className="size-4" aria-hidden="true" /> Preview
                    </a>
                    <button type="button" onClick={() => copyLink(previewPath)} className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
                      <Link2 className="size-4" aria-hidden="true" /> {copied === previewPath ? "Copied!" : "Copy preview link"}
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="import-heading" className="mt-12 rounded-2xl border border-border bg-secondary p-6">
        <h2 id="import-heading" className="font-heading text-lg font-semibold">
          Add or update businesses from JSON
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Paste one business object or an array. Entries are validated and merged into <code>src/data/businesses.json</code> by <code>slug</code>.
          {canWrite ? "" : " Importing only works on your development machine, where the source files exist."}
          {" "}See <code>docs/business-data.md</code> for the full shape.
        </p>
        <form action={formAction} className="mt-4 space-y-3">
          <input type="hidden" name="intent" value="import" />
          <textarea
            name="json"
            rows={10}
            spellCheck={false}
            placeholder='[{ "slug": "new-restaurant", "businessType": "restaurant", "templateVariant": "luxury", "business": { ... }, "theme": { ... }, "contact": { ... }, "seo": { ... }, "content": { ... } }]'
            className={cn(inputClass, "w-full font-mono text-xs leading-relaxed")}
            disabled={!canWrite}
          />
          <button type="submit" disabled={pending || !canWrite} className={primaryButton}>
            Validate and import
          </button>
        </form>
      </section>
    </div>
  );
}
