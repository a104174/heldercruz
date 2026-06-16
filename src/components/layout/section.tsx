import type { ReactNode } from "react";
import { AnimatedReveal } from "@/components/animations/animated-reveal";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  eyebrow?: string;
  id?: string;
  intro?: string;
  title?: string;
};

export function Section({
  children,
  className,
  contentClassName,
  eyebrow,
  id,
  intro,
  title
}: SectionProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <Container className={contentClassName}>
        {(eyebrow || title || intro) && (
          <AnimatedReveal className="mb-10 max-w-3xl md:mb-14">
            {eyebrow && (
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-semibold leading-[1.05] text-ink sm:text-4xl md:text-5xl">
                {title}
              </h2>
            )}
            {intro && <p className="mt-5 text-base leading-7 text-muted md:text-lg">{intro}</p>}
          </AnimatedReveal>
        )}
        {children}
      </Container>
    </section>
  );
}
