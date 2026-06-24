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
  description?: string;
  items: ProjectGalleryItem[];
};

function GalleryHeading({
  eyebrow,
  title,
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
            : "mt-3 text-[clamp(2.25rem,3.5vw,4rem)]"
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
          ? "h-[var(--gallery-card-height)] w-[var(--gallery-card-width)] shrink-0"
          : "aspect-[4/3]" 
      )}
    >
      {pinned ? (
        <Image
          src={item.image}
          alt={item.alt}
          fill
          priority={priority}
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.012]"
          sizes="(min-width: 1440px) 1200px, 84vw"
        />
      ) : (
        <>
          <Image
            src={item.image}
            alt=""
            aria-hidden="true"
            fill
            className="scale-110 object-cover object-center opacity-55 blur-2xl"
            sizes="20vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/8" />
          <div className="absolute inset-0 p-4 sm:p-6">
            <div className="relative h-full w-full transition-transform duration-700 group-hover:scale-[1.01]">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                priority={priority}
                className="object-contain object-center drop-shadow-[0_24px_38px_rgba(0,0,0,0.22)]"
                sizes="(min-width: 640px) 46vw, 92vw"
              />
            </div>
          </div>
        </>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/24 via-transparent to-transparent" />
      <div
        className={cn(
          // Largura reduzida (de 460px para 360px)
          "absolute bottom-4 left-4 max-w-[min(360px,85%)] rounded-2xl border border-white/35 bg-white/78 shadow-[0_12px_35px_rgba(0,0,0,0.14)] backdrop-blur-xl",
          // Paddings reduzidos para um look mais compacto
          pinned ? "bottom-6 left-6 p-4" : "p-3 sm:bottom-5 sm:left-5 sm:p-4"
        )}
      >
        {/* Título mais pequeno (text-sm) */}
        <h3 className={cn("font-semibold leading-none text-black", pinned ? "text-sm" : "text-xs sm:text-sm")}>
          {item.title}
        </h3>
        {/* Descrição mais pequena (text-xs) com margem superior ligeiramente reduzida */}
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
        description={description}
        items={items}
        reducedMotion
      />
    );
  }

  const galleryStyle = {
    "--gallery-card-width": "min(84vw, 1200px)",
    // Aumentada a altura do cartão de 68svh/680px para 76svh/760px
    "--gallery-card-height": "min(76svh, 760px)",
    "--gallery-gutter": "max(2rem, calc((100vw - var(--gallery-card-width)) / 2))",
    height: scrollHeight
  } as CSSProperties;

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2">
      <GalleryFallback
        eyebrow={eyebrow}
        title={title}
        description={description}
        items={items}
      />

      <div
        data-project-gallery-header
        className="hidden px-10 pb-20 pt-8 lg:block motion-reduce:hidden xl:pb-24"
      >
        <GalleryHeading eyebrow={eyebrow} title={title} description={description} />
      </div>

      <section
        ref={sectionRef}
        data-project-horizontal-gallery
        className="relative hidden bg-[#fbfaf7] lg:block motion-reduce:hidden"
        style={galleryStyle}
      >
        <div
          ref={viewportRef}
          // Ajustado o min-h para 800px para suportar o cartão mais alto com folga
          className="sticky top-0 flex h-svh min-h-[800px] items-center overflow-hidden pb-8 pt-24"
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
