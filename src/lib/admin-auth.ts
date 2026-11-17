import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { isClientLocked } from "@/lib/businesses";

/*
 * Admin access is a single shared password from ADMIN_PASSWORD. A successful
 * login stores an HMAC of a fixed message under the password in an httpOnly
 * cookie, so the password itself is never stored in the browser. Changing the
 * password invalidates every session.
 *
 * Without ADMIN_PASSWORD, the panel is open in development (so `npm run dev`
 * works with no setup) and disabled in production builds. It is always
 * disabled on a client's locked deployment (CLIENT_SLUG), which shows one
 * business only.
 */

export const ADMIN_SESSION_COOKIE = "admin-session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 14; // 14 days

export function getAdminPassword(): string | undefined {
  const value = process.env.ADMIN_PASSWORD?.trim();
  return value ? value : undefined;
}

export function isAdminEnabled(): boolean {
  if (isClientLocked()) return false;
  return getAdminPassword() !== undefined || process.env.NODE_ENV !== "production";
}

/** True when no password is configured and we are in development. */
export function isAdminOpen(): boolean {
  return getAdminPassword() === undefined && process.env.NODE_ENV !== "production";
}

function sessionToken(password: string): string {
  return createHmac("sha256", password).update("admin-session-v1").digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

export function isCorrectPassword(candidate: string): boolean {
  const password = getAdminPassword();
  return password !== undefined && safeEqual(candidate, password);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  if (!isAdminEnabled()) return false;
  if (isAdminOpen()) return true;
  const password = getAdminPassword();
  if (!password) return false;
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  return token !== undefined && safeEqual(token, sessionToken(password));
}

/** Call from a Server Action after checking the password. */
export async function startAdminSession(): Promise<void> {
  const password = getAdminPassword();
  if (!password) return;
  (await cookies()).set(ADMIN_SESSION_COOKIE, sessionToken(password), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function endAdminSession(): Promise<void> {
  (await cookies()).delete({ name: ADMIN_SESSION_COOKIE, path: "/admin" });
}
