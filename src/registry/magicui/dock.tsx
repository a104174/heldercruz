"use client";

import {
  createContext,
  useContext,
  useRef,
  type ReactNode
} from "react";
import {
  motion,
  type HTMLMotionProps,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue
} from "motion/react";
import { cn } from "@/lib/utils";

type DockDirection = "top" | "middle" | "bottom";

type DockContextValue = {
  mouseX: MotionValue<number>;
  iconSize: number;
  iconMagnification: number;
  iconDistance: number;
  direction: DockDirection;
};

const DockContext = createContext<DockContextValue | null>(null);

type DockProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  iconSize?: number;
  iconMagnification?: number;
  iconDistance?: number;
  direction?: DockDirection;
};

function getAlignment(direction: DockDirection) {
  if (direction === "top") {
    return "items-start";
  }

  if (direction === "bottom") {
    return "items-end";
  }

  return "items-center";
}

export function Dock({
  children,
  className,
  iconSize = 40,
  iconMagnification = 60,
  iconDistance = 120,
  direction = "middle",
  ...props
}: DockProps) {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);

  return (
    <DockContext.Provider
      value={{
        mouseX,
        iconSize,
        iconMagnification,
        iconDistance,
        direction
      }}
    >
      <motion.div
        onMouseMove={(event) => mouseX.set(event.clientX)}
        onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
        className={cn(
          "flex max-w-full gap-1 overflow-visible rounded-full p-2",
          getAlignment(direction),
          className
        )}
        style={{ minHeight: iconMagnification + 14 }}
        role="toolbar"
        {...props}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  );
}

type DockIconProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
};

export function DockIcon({ children, className, ...props }: DockIconProps) {
  const context = useContext(DockContext);
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  if (!context) {
    throw new Error("DockIcon must be used inside Dock.");
  }

  const distance = useTransform(context.mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect();

    if (!bounds) {
      return Number.POSITIVE_INFINITY;
    }

    return value - bounds.x - bounds.width / 2;
  });

  const size = useTransform(
    distance,
    [-context.iconDistance, 0, context.iconDistance],
    [context.iconSize, context.iconMagnification, context.iconSize]
  );

  const iconStyle = shouldReduceMotion
    ? { width: context.iconSize, height: context.iconSize }
    : { width: size, height: size };

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative flex aspect-square shrink-0 items-center justify-center rounded-full",
        className
      )}
      style={iconStyle}
      {...props}
    >
      {children}
    </motion.div>
  );
}
