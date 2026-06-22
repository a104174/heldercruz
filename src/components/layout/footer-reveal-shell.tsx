"use client";

import type { CSSProperties, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const FOOTER_REVEAL_ENABLED = true;

const FOOTER_REVEAL_HEIGHT = "clamp(440px, 45vh, 560px)";

export function shouldUseFooterReveal(pathname: string) {
  return (
    pathname === "/" ||
    pathname === "/projects" ||
    pathname === "/about" ||
    pathname === "/experience" ||
    pathname === "/contact" ||
    pathname.startsWith("/projects/")
  );
}

export function FooterRevealShell({
  children,
  footer
}: {
  children: ReactNode;
  footer: ReactNode;
}) {
  const pathname = usePathname();
  const revealEnabled = FOOTER_REVEAL_ENABLED && shouldUseFooterReveal(pathname);

  const revealStyle = revealEnabled
    ? ({ "--footer-reveal-height": FOOTER_REVEAL_HEIGHT } as CSSProperties)
    : undefined;

  return (
    <div
      className={cn(
        "relative bg-[#fbfaf7]",
        revealEnabled && "lg:isolate lg:bg-neutral-950"
      )}
      style={revealStyle}
    >
      {revealEnabled ? (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 bottom-0 z-[5] hidden h-[calc(var(--footer-reveal-height)+96px)] bg-neutral-950 lg:block"
        />
      ) : null}

      <div
        className={cn(
          "relative bg-[#fbfaf7]",
          revealEnabled &&
            "lg:z-30 lg:mb-[calc(var(--footer-reveal-height)-1px)] lg:overflow-visible lg:rounded-b-[2rem] xl:rounded-b-[3rem]"
        )}
      >
        {children}
      </div>

      <div
        className={cn(
          "bg-black lg:bg-neutral-950",
          revealEnabled &&
            "lg:fixed lg:inset-x-0 lg:bottom-0 lg:z-20 lg:h-[var(--footer-reveal-height)] lg:bg-neutral-950"
        )}
      >
        {footer}
      </div>
    </div>
  );
}
