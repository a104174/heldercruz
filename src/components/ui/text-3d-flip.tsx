"use client";

import type { ElementType, ReactNode } from "react";
import { motion, type Transition } from "motion/react";
import { cn } from "@/lib/utils";

type RotateDirection = "top" | "right" | "bottom" | "left";
type StaggerFrom = "first" | "last" | "center" | "random" | number;

type Text3DFlipProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  textClassName?: string;
  flipTextClassName?: string;
  rotateDirection?: RotateDirection;
  staggerDuration?: number;
  staggerFrom?: StaggerFrom;
  transition?: Transition;
};

const defaultTransition: Transition = {
  type: "spring",
  damping: 30,
  stiffness: 300
};

function getDistanceFromStaggerOrigin(index: number, length: number, staggerFrom: StaggerFrom) {
  if (typeof staggerFrom === "number") {
    return Math.abs(index - staggerFrom);
  }

  if (staggerFrom === "last") {
    return length - index - 1;
  }

  if (staggerFrom === "center") {
    return Math.abs(index - Math.floor(length / 2));
  }

  if (staggerFrom === "random") {
    return (index * 7) % Math.max(length, 1);
  }

  return index;
}

function getRotation(rotateDirection: RotateDirection) {
  if (rotateDirection === "top") {
    return {
      axis: "rotateX",
      hidden: -90,
      visibleExit: 90,
      origin: "50% 100%"
    } as const;
  }

  if (rotateDirection === "bottom") {
    return {
      axis: "rotateX",
      hidden: 90,
      visibleExit: -90,
      origin: "50% 0%"
    } as const;
  }

  if (rotateDirection === "left") {
    return {
      axis: "rotateY",
      hidden: -90,
      visibleExit: 90,
      origin: "100% 50%"
    } as const;
  }

  return {
    axis: "rotateY",
    hidden: 90,
    visibleExit: -90,
    origin: "0% 50%"
  } as const;
}

export default function Text3DFlip({
  children,
  as: Component = "p",
  className,
  textClassName,
  flipTextClassName,
  rotateDirection = "right",
  staggerDuration = 0.05,
  staggerFrom = "first",
  transition = defaultTransition
}: Text3DFlipProps) {
  const text = String(children);
  const letters = Array.from(text);
  const rotation = getRotation(rotateDirection);

  return (
    <Component className={cn("inline-block", className)} aria-label={text}>
      <motion.span
        aria-hidden="true"
        initial="initial"
        whileHover="hover"
        className="inline-flex flex-wrap justify-center [perspective:1000px]"
      >
        {letters.map((letter, index) => {
          const delay =
            getDistanceFromStaggerOrigin(index, letters.length, staggerFrom) * staggerDuration;
          const displayLetter = letter === " " ? "\u00A0" : letter;

          return (
            <span
              key={`${letter}-${index}`}
              className="relative inline-block h-[1em] min-w-[0.32em] leading-none [transform-style:preserve-3d]"
            >
              <motion.span
                className={cn(
                  "block leading-none [backface-visibility:hidden] [transform-style:preserve-3d]",
                  textClassName
                )}
                style={{ transformOrigin: rotation.origin }}
                variants={{
                  initial: { [rotation.axis]: 0, opacity: 1 },
                  hover: { [rotation.axis]: rotation.visibleExit, opacity: 0 }
                }}
                transition={{ ...transition, delay }}
              >
                {displayLetter}
              </motion.span>
              <motion.span
                className={cn(
                  "absolute inset-0 block leading-none [backface-visibility:hidden] [transform-style:preserve-3d]",
                  flipTextClassName
                )}
                style={{ transformOrigin: rotation.origin }}
                variants={{
                  initial: { [rotation.axis]: rotation.hidden, opacity: 0 },
                  hover: { [rotation.axis]: 0, opacity: 1 }
                }}
                transition={{ ...transition, delay }}
              >
                {displayLetter}
              </motion.span>
            </span>
          );
        })}
      </motion.span>
    </Component>
  );
}
