import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { LoginForm } from "@/app/admin/login/LoginForm";
import { isAdminAuthenticated, isAdminEnabled } from "@/lib/admin-auth";

export const metadata: Metadata = { title: "Sign in" };

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginGate />
    </Suspense>
  );
}

async function LoginGate() {
  if (!isAdminEnabled()) notFound();
  if (await isAdminAuthenticated()) redirect("/admin");

  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-secondary p-8 shadow-2xl">
        <p className="text-xs font-semibold tracking-[0.25em] text-primary uppercase">Site switcher</p>
        <h1 className="mt-3 font-heading text-2xl font-semibold">Sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">Enter the admin password to choose which business the website shows.</p>
        <LoginForm />
      </div>
    </main>
  );
}
