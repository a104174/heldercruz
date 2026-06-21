"use client";

import type { CSSProperties, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const FOOTER_REVEAL_ENABLED = true;

const FOOTER_REVEAL_HEIGHT = "clamp(440px, 45vh, 560px)";
const HOME_PATHS = new Set(["/"]);

export function FooterRevealShell({
  children,
  footer
}: {
  children: ReactNode;
  footer: ReactNode;
}) {
  const pathname = usePathname();
  const revealEnabled = FOOTER_REVEAL_ENABLED && HOME_PATHS.has(pathname);
  const revealStyle = revealEnabled
    ? ({ "--footer-reveal-height": FOOTER_REVEAL_HEIGHT } as CSSProperties)
    : undefined;

  return (
    <div className="bg-[#fbfaf7]" style={revealStyle}>
      <div
        className={cn(
          "bg-[#fbfaf7]",
          revealEnabled &&
            "lg:relative lg:z-10 lg:mb-[var(--footer-reveal-height)] lg:overflow-visible lg:rounded-b-[2rem] lg:shadow-[0_24px_70px_rgba(0,0,0,0.18)] xl:rounded-b-[3rem]"
        )}
      >
        {children}
      </div>

      <div
        className={cn(
          "bg-black",
          revealEnabled &&
            "lg:fixed lg:inset-x-0 lg:bottom-0 lg:z-0 lg:h-[var(--footer-reveal-height)]"
        )}
      >
        {footer}
      </div>
    </div>
  );
}
