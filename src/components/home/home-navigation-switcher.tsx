"use client";

import { useEffect, useRef, useState } from "react";
import { HomeDock } from "@/components/home/home-dock";
import { HomeNav } from "@/components/home/home-nav";

const TOP_THRESHOLD = 80;
const SCROLL_DELTA_TOLERANCE = 10;

export function HomeNavigationSwitcher() {
  const [dockVisible, setDockVisible] = useState(false);
  const dockVisibleRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const updateDockVisibility = (nextVisible: boolean) => {
      if (dockVisibleRef.current === nextVisible) {
        return;
      }

      dockVisibleRef.current = nextVisible;
      setDockVisible(nextVisible);
    };

    const onScroll = () => {
      if (tickingRef.current) {
        return;
      }

      tickingRef.current = true;

      window.requestAnimationFrame(() => {
        const currentScrollY = Math.max(window.scrollY, 0);
        const delta = currentScrollY - lastScrollYRef.current;

        if (currentScrollY < TOP_THRESHOLD) {
          updateDockVisibility(false);
          lastScrollYRef.current = currentScrollY;
          tickingRef.current = false;
          return;
        }

        if (Math.abs(delta) >= SCROLL_DELTA_TOLERANCE) {
          updateDockVisibility(delta > 0);
          lastScrollYRef.current = currentScrollY;
        }

        tickingRef.current = false;
      });
    };

    lastScrollYRef.current = Math.max(window.scrollY, 0);
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <HomeNav visible={!dockVisible} />
      <HomeDock visible={dockVisible} />
    </>
  );
}
