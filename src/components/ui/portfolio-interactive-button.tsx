"use client";

import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";
import Link, { type LinkProps } from "next/link";
import { ArrowRight } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { cn } from "@/lib/utils";

const interactiveButtonClassName =
  "h-11 min-w-max rounded-full border-black/15 bg-white px-7 text-sm font-bold text-black shadow-[0_14px_32px_rgba(0,0,0,0.08)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black hover:border-black/30 disabled:pointer-events-none disabled:opacity-50";

const navbarInteractiveButtonClassName =
  "h-10 min-w-max rounded-full border-black bg-black px-5 font-sans text-[13px] font-semibold leading-none text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_8px_18px_rgba(0,0,0,0.16)] ring-1 ring-black/5 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black disabled:pointer-events-none disabled:opacity-50";

type PortfolioInteractiveButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  showArrow?: boolean;
};

type PortfolioInteractiveLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode;
    showArrow?: boolean;
  };

const PortfolioInteractiveButton = forwardRef<HTMLButtonElement, PortfolioInteractiveButtonProps>(
  function PortfolioInteractiveButton(
    { children, className, showArrow = true, type = "button", ...props },
    ref
  ) {
    return (
      <InteractiveHoverButton
        ref={ref}
        type={type}
        showArrow={showArrow}
        className={cn(className, interactiveButtonClassName)}
        {...props}
      >
        {children}
      </InteractiveHoverButton>
    );
  }
);

const NavbarInteractiveHoverButton = forwardRef<HTMLButtonElement, PortfolioInteractiveButtonProps>(
  function NavbarInteractiveHoverButton(
    { children, className, showArrow = true, type = "button", ...props },
    ref
  ) {
    return (
      <InteractiveHoverButton
        ref={ref}
        type={type}
        variant="navbar"
        showArrow={showArrow}
        className={cn(className, navbarInteractiveButtonClassName)}
        {...props}
      >
        {children}
      </InteractiveHoverButton>
    );
  }
);

export function NavbarInteractiveLink({
  children,
  className,
  showArrow = true,
  ...props
}: PortfolioInteractiveLinkProps) {
  return (
    <Link
      className={cn(
        "group relative inline-flex h-10 w-fit min-w-max cursor-pointer items-center justify-center overflow-hidden rounded-full border border-black bg-black px-5 text-center font-sans text-[13px] font-semibold leading-none text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_8px_18px_rgba(0,0,0,0.16)] ring-1 ring-black/5 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black whitespace-nowrap",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-white transition-all duration-300 group-hover:scale-[100.8]" />
        <span className="inline-block font-sans text-[13px] font-semibold leading-none transition-all duration-300 group-hover:translate-x-4 group-hover:opacity-0">
          {children}
        </span>
        <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0" />
        {showArrow && <ArrowRight aria-hidden="true" className="absolute h-4 w-4 opacity-0" />}
      </div>
      <div className="absolute inset-0 z-10 flex translate-x-4 items-center justify-center gap-2 text-black opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        <span className="font-sans text-[13px] font-semibold leading-none">{children}</span>
        {showArrow && (
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
          />
        )}
      </div>
    </Link>
  );
}

export function PortfolioInteractiveLink({
  children,
  className,
  showArrow = true,
  ...props
}: PortfolioInteractiveLinkProps) {
  return (
    <Link
      className={cn(
        "group relative inline-flex h-11 w-fit min-w-max cursor-pointer items-center justify-center overflow-hidden rounded-full border border-black/15 bg-white px-7 text-center text-sm font-bold leading-none text-black shadow-[0_14px_32px_rgba(0,0,0,0.08)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black hover:border-black/30 whitespace-nowrap",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-center gap-2 leading-none">
        <div className="h-2 w-2 rounded-full bg-black transition-all duration-300 group-hover:scale-[100.8]" />
        <span className="inline-flex items-center transition-all duration-300 group-hover:translate-x-4 group-hover:opacity-0">
          {children}
        </span>
        <span aria-hidden="true" className="h-2 w-2 shrink-0" />
        {showArrow && <ArrowRight aria-hidden="true" className="absolute h-4 w-4 opacity-0" />}
      </div>
      <div className="absolute inset-0 z-10 flex translate-x-4 items-center justify-center gap-2 leading-none text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        <span className="inline-flex items-center">{children}</span>
        {showArrow && <ArrowRight aria-hidden="true" className="h-4 w-4" />}
      </div>
    </Link>
  );
}

export { NavbarInteractiveHoverButton, PortfolioInteractiveButton };
