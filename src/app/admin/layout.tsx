import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildThemeStyle } from "@/config/theme";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin" },
  robots: { index: false, follow: false },
};

/** The admin panel has its own fixed dark theme, independent of whichever business is active. */
const ADMIN_THEME = buildThemeStyle({
  primary: "#f2b53c",
  secondary: "#1b1f27",
  background: "#0d1016",
  text: "#eceef3",
  headingFont: "Montserrat",
  bodyFont: "Inter",
  radius: "md",
});

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div style={ADMIN_THEME} className="min-h-dvh bg-background font-sans text-foreground">
      {children}
    </div>
  );
}
