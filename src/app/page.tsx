import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";

export const metadata: Metadata = {
  title: "Software Engineer",
  description:
    "Hélder Cruz is a Software Engineer crafting clean, scalable and user-focused web applications."
};

export default function Page() {
  return <HomePage />;
}
