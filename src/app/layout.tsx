import type { Metadata } from "next";
import type { ReactNode } from "react";
import { FONT_CLASS_NAMES } from "@/lib/fonts";
import { DEFAULT_FAVICON } from "@/lib/site-metadata";
import "./globals.css";

/** Fallback only. Each site page sets its own metadata from the business it renders. */
export const metadata: Metadata = {
  title: "Business website",
  icons: { icon: DEFAULT_FAVICON },
};

/*
 * Shared shell for every route. Fonts are registered here as CSS variables; the
 * business theme (colours, radius, font choice) is applied by SiteShell on a
 * wrapper element, so one build can render any business per request.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${FONT_CLASS_NAMES} h-full`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
