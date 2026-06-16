"use client";

import type { ReactNode } from "react";
import { ContactProvider } from "@/components/contact/contact-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <ContactProvider>{children}</ContactProvider>
    </SmoothScrollProvider>
  );
}
