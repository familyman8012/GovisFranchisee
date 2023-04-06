import React, { useLayoutEffect, useState, useCallback } from "react";
import { throttleEvent } from "LibFarm/event";

export default function useScroll<ELEM extends HTMLElement>(
  ref: React.RefObject<ELEM>,
  throttleDelay?: number
): [number, number, () => void] {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const onScroll = useCallback(
    (e?: Event) => {
      if (!ref.current) return;
      const $elem = ref.current;
      setScrollTop($elem.scrollTop);
      setScrollLeft($elem.scrollLeft);
    },
    [ref.current]
  );

  const handleScroll = throttleDelay ? throttleEvent(onScroll, throttleDelay) : onScroll;

  useLayoutEffect(() => {
    ref.current?.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => ref.current?.removeEventListener("scroll", handleScroll);
  }, [ref.current]);

  return [scrollLeft, scrollTop, handleScroll];
}
