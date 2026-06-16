import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "dark";
type ButtonSize = "sm" | "md" | "lg";

type ButtonVariantOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-ink text-white hover:-translate-y-0.5 hover:bg-black",
  secondary: "border border-line bg-white text-ink hover:-translate-y-0.5 hover:border-ink",
  ghost: "text-ink hover:bg-soft",
  dark: "border border-white/15 bg-white text-ink hover:-translate-y-0.5 hover:bg-white/90"
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base"
};

export function buttonVariants({ variant = "primary", size = "md" }: ButtonVariantOptions = {}) {
  return cn(baseClasses, variants[variant], sizes[size]);
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariantOptions & {
    children: ReactNode;
  };

export function Button({ children, className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </button>
  );
}

type ButtonLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  ButtonVariantOptions & {
    children: ReactNode;
  };

export function ButtonLink({ children, className, variant, size, ...props }: ButtonLinkProps) {
  return (
    <Link className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </Link>
  );
}
