export const siteConfig = {
  name: "Hélder Cruz",
  title: "Hélder Cruz | Software Engineer",
  description:
    "Software Engineer crafting clean, scalable and user-focused web applications.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://heldercruz.dev",
  links: {
    github: "#",
    linkedin: "#",
    email: "mailto:hello@heldercruz.dev",
    resume: "#"
  }
};

export function getSiteUrl() {
  return siteConfig.url.replace(/\/$/, "");
}
