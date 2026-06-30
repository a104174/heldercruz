import ProjectDetailPage, {
  generateMetadata
} from "@/app/projects/[slug]/page";
import { projects } from "@/data/projects";
import { locales } from "@/i18n/locales";

export { generateMetadata };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((project) => ({
      locale,
      slug: project.slug
    }))
  );
}

export default ProjectDetailPage;
