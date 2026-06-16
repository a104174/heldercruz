import type { Project } from "@/data/projects";

type ProjectMetaProps = {
  project: Project;
};

export function ProjectMeta({ project }: ProjectMetaProps) {
  const items = [
    { label: "Role", value: project.role },
    { label: "Year", value: project.year || "Selected project" },
    { label: "Stack", value: project.techStack.join(", ") }
  ];

  return (
    <dl className="grid gap-4 rounded-lg border border-line bg-white p-5">
      {items.map((item) => (
        <div key={item.label} className="border-b border-line pb-4 last:border-0 last:pb-0">
          <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">{item.label}</dt>
          <dd className="mt-2 text-sm font-medium leading-6 text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
