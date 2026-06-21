import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { FooterRevealShell } from "@/components/layout/footer-reveal-shell";
import { Navbar } from "@/components/layout/navbar";
import { Providers } from "@/components/providers/providers";
import { getSiteUrl, siteConfig } from "@/config/site";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  icons: {
    icon: "/hc.png",
    shortcut: "/hc.png",
    apple: "/hc.png"
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: getSiteUrl(),
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={cn("bg-[#fbfaf7] font-sans", geist.variable)}>
      <body className="bg-[#fbfaf7]">
        <Providers>
          <Navbar />
          <FooterRevealShell footer={<Footer />}>{children}</FooterRevealShell>
        </Providers>
      </body>
    </html>
  );
}
