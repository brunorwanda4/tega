"use client";
import { useEffect, useRef, useState } from "react";

export function useScrollDirection(offset: number = 0) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const THRESHOLD = 6;

  useEffect(() => {
    if (typeof window === "undefined") return;

    lastScrollY.current = window.scrollY;

    const update = () => {
      const currentY = window.scrollY;

      if (currentY <= offset) {
        setIsVisible(true);
      } else {
        if (currentY > lastScrollY.current + THRESHOLD) {
          setIsVisible(false);
        } else if (currentY < lastScrollY.current - THRESHOLD) {
          setIsVisible(true);
        }
      }

      lastScrollY.current = currentY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(update);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return isVisible;
}
