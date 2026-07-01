"use client";

import { motion, type Variants } from "motion/react";
import { AnimatedReveal } from "@/components/animations/animated-reveal";
import { cn } from "@/lib/utils";

const listContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const listItemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export function TechnicalNotesSection({
  eyebrow,
  title,
  notes,
  className
}: {
  eyebrow: string;
  title: string;
  notes: readonly string[];
  className?: string;
}) {
  return (
    <section className={cn("mt-28 border-y border-black/10 py-24 md:py-32", className)}>
      <div className="grid gap-16 lg:grid-cols-[0.35fr_1fr] lg:items-start lg:gap-24">
        <AnimatedReveal className="lg:sticky lg:top-32">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
            {eyebrow}
          </p>
          <h2 className="mt-5 text-[34px] font-semibold leading-[0.95] tracking-tight text-black md:text-[46px]">
            {title}
          </h2>
        </AnimatedReveal>

        <motion.div
          variants={listContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col border-t border-black/10"
        >
          {notes.map((note, index) => (
            <motion.article
              key={`${index}-${note}`}
              variants={listItemVariants}
              className="group flex flex-col gap-4 border-b border-black/10 py-8 transition-colors duration-500 hover:bg-black/[0.02] sm:-mx-6 sm:flex-row sm:items-start sm:gap-8 sm:px-6"
            >
              <span className="shrink-0 pt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-black/30 transition-colors duration-500 group-hover:text-black">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="max-w-[720px] text-[15px] leading-8 text-black/60 transition-colors duration-500 group-hover:text-black/80">
                {note}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
