"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ACTIVE_BUSINESS_COOKIE, encodeSelection } from "@/lib/active-business";
import {
  endAdminSession,
  isAdminAuthenticated,
  isAdminEnabled,
  isCorrectPassword,
  startAdminSession,
} from "@/lib/admin-auth";
import { getBusiness, isVariantOf } from "@/lib/businesses";
import { canWriteData, importBusinesses, writeDefaultBusiness } from "@/lib/business-store";

export interface ActionState {
  ok?: boolean;
  message?: string;
}

const SELECTION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function login(_prev: ActionState, formData: FormData): Promise<ActionState> {
  if (!isAdminEnabled()) return { ok: false, message: "The admin panel is disabled on this deployment. Set ADMIN_PASSWORD to enable it." };
  const password = String(formData.get("password") ?? "");
  if (!isCorrectPassword(password)) return { ok: false, message: "Wrong password." };
  await startAdminSession();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await endAdminSession();
  redirect("/admin/login");
}

async function requireAdmin(): Promise<void> {
  if (!(await isAdminAuthenticated())) throw new Error("Not signed in");
}

/** Reads and validates the slug/variant pair a form submitted. */
type Selection = { slug: string; variant: string | null };

function readSelection(formData: FormData): { error: string } | { selection: Selection } {
  const slug = String(formData.get("slug") ?? "");
  const config = getBusiness(slug);
  if (!config) return { error: `Unknown business "${slug}".` };
  const rawVariant = String(formData.get("variant") ?? "");
  if (rawVariant && !isVariantOf(config, rawVariant)) {
    return { error: `"${rawVariant}" is not a ${config.businessType} variant.` };
  }
  return { selection: { slug, variant: rawVariant && rawVariant !== config.templateVariant ? rawVariant : null } };
}

/** One entry point for the dashboard's buttons; `intent` picks the operation. */
export async function adminAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const intent = String(formData.get("intent") ?? "");

  switch (intent) {
    case "activate": {
      const read = readSelection(formData);
      if ("error" in read) return { ok: false, message: read.error };
      const { selection } = read;
      const store = await cookies();
      store.set(ACTIVE_BUSINESS_COOKIE, encodeSelection(selection.slug, selection.variant), {
        path: "/",
        sameSite: "lax",
        maxAge: SELECTION_MAX_AGE,
      });
      const name = getBusiness(selection.slug)?.business.name ?? selection.slug;
      return { ok: true, message: `The home page now shows ${name}${selection.variant ? ` (${selection.variant})` : ""} in this browser.` };
    }

    case "clear": {
      (await cookies()).delete(ACTIVE_BUSINESS_COOKIE);
      return { ok: true, message: "Selection cleared. The home page shows the committed default again." };
    }

    case "set-default": {
      const read = readSelection(formData);
      if ("error" in read) return { ok: false, message: read.error };
      const { selection } = read;
      if (!(await canWriteData())) {
        return { ok: false, message: "Defaults can only be written on your development machine, not on a hosted build." };
      }
      await writeDefaultBusiness(selection.slug, selection.variant);
      revalidatePath("/", "layout");
      const name = getBusiness(selection.slug)?.business.name ?? selection.slug;
      return { ok: true, message: `${name} is now the default in src/data/active-business.json. Commit it to ship it.` };
    }

    case "import": {
      if (!(await canWriteData())) {
        return { ok: false, message: "Importing writes to src/data/businesses.json, so it only works on your development machine." };
      }
      const json = String(formData.get("json") ?? "").trim();
      if (!json) return { ok: false, message: "Paste the JSON first." };
      try {
        const result = await importBusinesses(json);
        revalidatePath("/", "layout");
        const parts = [
          result.added.length ? `added ${result.added.join(", ")}` : "",
          result.updated.length ? `updated ${result.updated.join(", ")}` : "",
        ].filter(Boolean);
        return { ok: true, message: `Import complete: ${parts.join("; ")}. The dev server reloads the data automatically.` };
      } catch (error) {
        return { ok: false, message: error instanceof Error ? error.message : String(error) };
      }
    }

    default:
      return { ok: false, message: "Unknown action." };
  }
}
