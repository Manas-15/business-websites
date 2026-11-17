"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { NavLinks } from "@/components/navigation/NavLinks";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { NavItem } from "@/types/client-config";

interface MobileNavProps {
  items: NavItem[];
  businessName: string;
}

/** Hamburger menu for small screens. Sheet handles focus trapping and Escape-to-close. */
export function MobileNav({ items, businessName }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" aria-label="Open navigation menu" className="md:hidden" />
        }
      >
        <Menu className="size-6" aria-hidden="true" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[min(20rem,85vw)] bg-background p-6">
        <SheetHeader className="p-0">
          <SheetTitle className="font-heading text-lg">{businessName}</SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobile" className="mt-6">
          <NavLinks items={items} orientation="vertical" onNavigate={() => setOpen(false)} />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
