"use client";

import { useActionState } from "react";
import { login, type ActionState } from "@/app/admin/actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(login, {});

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          className="mt-1.5 w-full rounded-[var(--radius)] border border-border bg-background px-3 py-2.5 text-base outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
        />
      </div>
      {state.message ? (
        <p role="alert" className="text-sm text-red-400">
          {state.message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-[var(--radius)] bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
