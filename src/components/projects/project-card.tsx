import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "@/components/projects/project-visual";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={project.href}
      className="group block rounded-lg border border-line bg-white p-3 transition duration-200 hover:-translate-y-1 hover:border-ink hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
    >
      <ProjectVisual project={project} compact />
      <div className="p-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold text-ink">{project.title}</h3>
          <ArrowUpRight
            aria-hidden="true"
            className="mt-1 h-5 w-5 shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
          />
        </div>
        <p className="mt-4 text-sm leading-6 text-muted">{project.shortDescription}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.techStack.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line bg-soft px-3 py-1 text-xs font-medium text-neutral-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
