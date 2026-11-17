import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius)] font-semibold whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-border bg-transparent text-foreground hover:bg-muted",
        ghost: "text-foreground hover:bg-muted",
      },
      size: {
        md: "px-6 py-3 text-sm",
        lg: "px-8 py-4 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

interface LinkButtonProps extends ButtonVariantProps {
  href: string;
  children: ReactNode;
  className?: string;
  /** Opens external URLs in a new tab with safe rel attributes. */
  external?: boolean;
}

interface ActionButtonProps
  extends ButtonVariantProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  href?: undefined;
  type?: "button" | "submit";
}

export type ButtonProps = LinkButtonProps | ActionButtonProps;

/** Renders a Next.js Link for `href`, or a native button otherwise. */
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { href, children, className, variant, size, external } = props;
    const classes = cn(buttonVariants({ variant, size }), className);
    const isNative = /^(mailto|tel):/.test(href);
    const isWeb = /^https?:\/\//.test(href);
    if (external || isNative) {
      const newTab = external && isWeb;
      return (
        <a
          href={href}
          className={classes}
          target={newTab ? "_blank" : undefined}
          rel={newTab ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { children, className, variant, size, type = "button", ...rest } = props;
  return (
    <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...rest}>
      {children}
    </button>
  );
}
