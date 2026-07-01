"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform
} from "motion/react";
import Image from "next/image";
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties
} from "react";
import { cn } from "@/lib/utils";

export type ProjectGalleryItem = {
  title: string;
  description: string;
  image: string;
  alt: string;
};

type ProjectHorizontalGalleryProps = {
  eyebrow?: string;
  title: string;
  titleClassName?: string;
  description?: string;
  items: ProjectGalleryItem[];
};

function GalleryHeading({
  eyebrow,
  title,
  titleClassName,
  description,
  compact = false
}: Omit<ProjectHorizontalGalleryProps, "items"> & { compact?: boolean }) {
  return (
    <div className={cn("mx-auto w-full text-center", compact ? "max-w-[820px]" : "max-w-[1160px]")}>
      {eyebrow ? (
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/38">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-semibold leading-[0.95] text-black",
          compact
            ? "mt-3 text-3xl sm:text-4xl"
            : "mt-3 text-[clamp(2.25rem,3.5vw,4rem)]",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mx-auto max-w-[720px] text-black/56",
            compact ? "mt-5 text-sm leading-7" : "mt-4 text-[15px] leading-7"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function GalleryCard({
  item,
  priority = false,
  pinned = false
}: {
  item: ProjectGalleryItem;
  priority?: boolean;
  pinned?: boolean;
}) {
  return (
    <article
      data-project-gallery-card
      className={cn(
        "group relative min-w-0 overflow-hidden rounded-[28px] border border-black/5 bg-[#111111] shadow-[0_24px_80px_rgba(0,0,0,0.08)]",
        pinned
          ? "aspect-[4/3] w-[var(--gallery-card-width)] shrink-0"
          : "aspect-[4/3]"
      )}
    >
      <Image
        src={item.image}
        alt={item.alt}
        fill
        priority={priority}
        loading={pinned || priority ? "eager" : undefined}
        quality={95}
        className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.012]"
        sizes={
          pinned
            ? "(min-width: 1536px) 1080px, (min-width: 1024px) 74vw, 100vw"
            : "(min-width: 640px) 46vw, 100vw"
        }
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/24 via-transparent to-transparent" />
      <div
        className={cn(
          "absolute bottom-4 left-4 max-w-[min(420px,85%)] rounded-2xl border border-white/35 bg-white/78 shadow-[0_12px_35px_rgba(0,0,0,0.14)] backdrop-blur-xl",
          pinned ? "bottom-6 left-6 p-4" : "p-3 sm:bottom-5 sm:left-5 sm:p-4"
        )}
      >
        <h3 className={cn("font-semibold leading-none text-black", pinned ? "text-sm" : "text-xs sm:text-sm")}>
          {item.title}
        </h3>
        <p className={cn("text-black/60", pinned ? "mt-1.5 text-xs leading-5" : "mt-1.5 text-[11px] leading-4 sm:text-xs sm:leading-5")}>
          {item.description}
        </p>
      </div>
    </article>
  );
}


function GalleryFallback({
  eyebrow,
  title,
  description,
  items,
  reducedMotion = false
}: ProjectHorizontalGalleryProps & { reducedMotion?: boolean }) {
  return (
    <section
      data-project-gallery-fallback
      className={cn(
        "mx-auto w-full max-w-[1200px] px-5 py-24 sm:px-8 md:py-32 lg:px-10",
        !reducedMotion && "lg:hidden motion-reduce:lg:block"
      )}
    >
      <GalleryHeading eyebrow={eyebrow} title={title} description={description} compact />
      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {items.map((item, index) => (
          <GalleryCard key={item.image} item={item} priority={index < 2} />
        ))}
      </div>
    </section>
  );
}

export function ProjectHorizontalGallery({
  eyebrow,
  title,
  titleClassName,
  description,
  items
}: ProjectHorizontalGalleryProps) {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travelDistance, setTravelDistance] = useState(0);
  const [scrollHeight, setScrollHeight] = useState("100vh");
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travelDistance]);

  const measureGallery = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) {
      return;
    }

    const nextTravelDistance = Math.max(
      0,
      track.getBoundingClientRect().width - viewport.clientWidth
    );
    const viewportHeight = window.innerHeight;

    setTravelDistance(nextTravelDistance);
    setScrollHeight(`${Math.ceil(viewportHeight + nextTravelDistance)}px`);
  }, []);

  useLayoutEffect(() => {
    let isActive = true;
    const animationFrame = window.requestAnimationFrame(measureGallery);
    const fallbackTimer = window.setTimeout(measureGallery, 150);

    const resizeObserver = new ResizeObserver(measureGallery);

    if (viewportRef.current) {
      resizeObserver.observe(viewportRef.current);
    }

    if (trackRef.current) {
      resizeObserver.observe(trackRef.current);
    }

    window.addEventListener("resize", measureGallery);
    void document.fonts.ready.then(() => {
      if (isActive) {
        measureGallery();
      }
    });

    return () => {
      isActive = false;
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(fallbackTimer);
      resizeObserver.disconnect();
      window.removeEventListener("resize", measureGallery);
    };
  }, [measureGallery, items.length]);

  if (shouldReduceMotion || items.length < 3) {
    return (
      <GalleryFallback
        eyebrow={eyebrow}
        title={title}
        titleClassName={titleClassName}
        description={description}
        items={items}
        reducedMotion
      />
    );
  }

  const galleryStyle = {
    "--gallery-card-width": "min(74vw, 1080px, calc((100svh - 10rem) * 4 / 3))",
    "--gallery-gutter": "max(2rem, calc((100vw - var(--gallery-card-width)) / 2))",
    height: scrollHeight
  } as CSSProperties;

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2">
      <GalleryFallback
        eyebrow={eyebrow}
        title={title}
        titleClassName={titleClassName}
        description={description}
        items={items}
      />

      <div
        data-project-gallery-header
        className="hidden px-10 pb-20 pt-8 lg:block motion-reduce:hidden xl:pb-24"
      >
        <GalleryHeading
          eyebrow={eyebrow}
          title={title}
          titleClassName={titleClassName}
          description={description}
        />
      </div>

      <section
        ref={sectionRef}
        data-project-horizontal-gallery
        className="relative hidden bg-[#fbfaf7] lg:block motion-reduce:hidden"
        style={galleryStyle}
      >
        <div
          ref={viewportRef}
          className="sticky top-0 flex h-svh min-h-[680px] items-center overflow-hidden pb-8 pt-24"
        >
          <motion.div
            ref={trackRef}
            data-project-gallery-track
            className="flex w-max items-center gap-[clamp(1.25rem,2vw,2rem)] px-[var(--gallery-gutter)]"
            style={{ x }}
          >
            {items.map((item, index) => (
              <GalleryCard
                key={item.image}
                item={item}
                priority={index < 2}
                pinned
              />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
