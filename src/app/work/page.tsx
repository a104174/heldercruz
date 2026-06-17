import type { Metadata } from "next";
import { WorkPage } from "@/components/work/work-page";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Three real-world projects built for clients, combining clean interfaces, responsive design and practical business-focused features."
};

export default function Page() {
  return <WorkPage />;
}
