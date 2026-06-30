import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/config/site";
import { projects } from "@/data/projects";
import { locales } from "@/i18n/locales";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const staticRoutes = ["", "/work", "/projects", "/about", "/experience", "/contact"];
  const projectRoutes = projects.map((project) => project.href);
  const localizedRoutes = locales.flatMap((locale) =>
    [...staticRoutes, ...projectRoutes].map((route) => `/${locale}${route}`)
  );

  return ["", ...localizedRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8
  }));
}
