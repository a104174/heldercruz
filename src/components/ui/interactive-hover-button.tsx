import * as React from "react"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

type InteractiveHoverButtonVariant = "default" | "navbar"

type InteractiveHoverButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  showArrow?: boolean
  showArrowOnIdle?: boolean
  variant?: InteractiveHoverButtonVariant
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(
  (
    {
      children,
      className,
      showArrow = true,
      showArrowOnIdle = false,
      variant = "default",
      ...props
    },
    ref
  ) => {
    const isNavbar = variant === "navbar"

    return (
      <button
        ref={ref}
        className={cn(
          "group bg-background relative inline-flex h-11 w-fit min-w-max cursor-pointer items-center justify-center overflow-hidden rounded-full border px-7 text-center font-semibold whitespace-nowrap",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-center gap-2">
          <div
            className={cn(
              "shrink-0 rounded-full transition-all duration-300",
              isNavbar
                ? "h-1.5 w-1.5 bg-white group-hover:scale-[100.8]"
                : "h-2 w-2 bg-primary group-hover:scale-[100.8]"
            )}
          />
          <span
            className={cn(
              "inline-block transition-all duration-300 group-hover:opacity-0",
              "group-hover:translate-x-4",
              isNavbar
                ? "font-sans text-[13px] font-semibold leading-none"
                : "font-sans text-sm font-bold leading-none"
            )}
          >
            {children}
          </span>
          <span
            aria-hidden="true"
            className={cn("shrink-0", isNavbar ? "h-1.5 w-1.5" : "h-2 w-2")}
          />
          {showArrow && (
            <ArrowRight
              aria-hidden="true"
              className={cn(
                "transition-all duration-300",
                "h-4 w-4",
                isNavbar
                  ? "absolute opacity-0"
                  : showArrowOnIdle
                    ? "absolute opacity-100 group-hover:translate-x-0.5 group-hover:opacity-0"
                    : "absolute opacity-0"
              )}
            />
          )}
        </div>
        <div
          className={cn(
            "absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100",
            "translate-x-4 gap-2",
            isNavbar ? "text-black" : "text-primary-foreground"
          )}
        >
          <span
            className={cn(
              isNavbar
                ? "font-sans text-[13px] font-semibold leading-none"
                : "font-sans text-sm font-bold leading-none"
            )}
          >
            {children}
          </span>
          {showArrow && (
            <ArrowRight
              aria-hidden="true"
              className={cn(
                "transition-transform duration-300 group-hover:translate-x-0.5",
                "h-4 w-4"
              )}
            />
          )}
        </div>
      </button>
    )
  }
)

InteractiveHoverButton.displayName = "InteractiveHoverButton"

export { InteractiveHoverButton }
