import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, type Locale } from "@/i18n/locales";

export type ProjectSlug = "casa-benfica-lenzburg" | "xv-studio" | "hausb";

export type Project = {
  slug: ProjectSlug;
  title: string;
  shortDescription: string;
  longDescription: string;
  role: string;
  year?: string;
  techStack: string[];
  features: string[];
  href: string;
  liveUrl?: string;
  image: {
    alt: string;
    label: string;
  };
  accent: string;
  technicalNotes: string[];
};

const baseProjects: Project[] = [
  {
    slug: "casa-benfica-lenzburg",
    title: "Casa Benfica Lenzburg",
    shortDescription:
      "Public website, reservation backoffice and restaurant billing system for Casa Benfica Lenzburg.",
    longDescription:
      "Developed the public website and internal backoffice systems for Casa Benfica Lenzburg, including reservation management and restaurant billing features.",
    role: "Full-stack Developer",
    year: "2025",
    techStack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Resend", "Vercel"],
    features: [
      "Public website",
      "Reservation management",
      "Admin backoffice",
      "Restaurant billing system",
      "Email integrations",
      "Database structure",
      "Production deployment"
    ],
    href: "/projects/casa-benfica-lenzburg",
    image: {
      alt: "Screenshots from the Casa Benfica Lenzburg website and backoffice",
      label: "Casa Benfica website, reservations and backoffice screens"
    },
    accent: "#111111",
    technicalNotes: [
      "Built around production-ready deployment flows on Vercel.",
      "Structured to support reservation and billing-related internal workflows.",
      "Email flows prepared with server-only Resend integration patterns."
    ]
  },
  {
    slug: "xv-studio",
    title: "XV Studio",
    shortDescription:
      "Multi-page service website with custom layouts, polished presentation and a guided contact flow.",
    longDescription:
      "Developed a multi-page service website with custom page layouts, polished visual presentation and an intuitive step-based contact experience.",
    role: "Frontend Developer",
    year: "2025",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Forms"],
    features: [
      "Multi-page website",
      "Custom service pages",
      "Guided contact flow",
      "Responsive layout",
      "Smooth user experience"
    ],
    href: "/projects/xv-studio",
    image: {
      alt: "Screenshots from the XV Studio website and contact flow",
      label: "XV Studio website screens and guided contact flow"
    },
    accent: "#3f3f46",
    technicalNotes: [
      "Component structure prepared for custom service pages.",
      "Contact experience designed around progressive, step-based input.",
      "Responsive layout patterns kept reusable for future page expansion."
    ]
  },
  {
    slug: "hausb",
    title: "HAUSB",
    shortDescription:
      "Modern business website focused on clean presentation, responsive layout and professional brand presence.",
    longDescription:
      "Developed a modern business website focused on clear communication, responsive design and professional presentation.",
    role: "Frontend Developer",
    year: "2025",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    features: [
      "Business website",
      "Responsive UI",
      "Clean layout",
      "Professional brand presentation",
      "Deployment-ready frontend"
    ],
    href: "/projects/hausb",
    image: {
      alt: "Screenshots from the HAUSB business website",
      label: "HAUSB website screens and responsive brand presence"
    },
    accent: "#525252",
    technicalNotes: [
      "Frontend structure optimized for clear content hierarchy.",
      "Reusable responsive sections prepared for future visual mockups.",
      "Deployment path kept simple for Vercel hosting."
    ]
  }
];

export function getProjects(locale: Locale = defaultLocale): Project[] {
  const dictionary = getDictionary(locale);

  return baseProjects.map((project) => {
    const translatedProject = dictionary.projects[project.slug];

    return {
      ...project,
      shortDescription: translatedProject.shortDescription,
      longDescription: translatedProject.longDescription,
      role: translatedProject.role,
      features: [...translatedProject.features],
      image: {
        alt: translatedProject.imageAlt,
        label: translatedProject.imageLabel
      },
      technicalNotes: [...translatedProject.technicalNotes]
    };
  });
}

export const projects: Project[] = getProjects();

export function getProjectBySlug(slug: string, locale: Locale = defaultLocale) {
  return getProjects(locale).find((project) => project.slug === slug);
}

export function getNextProject(slug: string, locale: Locale = defaultLocale) {
  const localizedProjects = getProjects(locale);
  const currentIndex = localizedProjects.findIndex((project) => project.slug === slug);

  if (currentIndex === -1) {
    return localizedProjects[0];
  }

  return localizedProjects[(currentIndex + 1) % localizedProjects.length];
}
