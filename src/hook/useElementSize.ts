import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { throttleEvent } from "LibFarm/event";

export default function useElementSize<ELEM extends HTMLElement>(ref: React.RefObject<ELEM>) {
  const [clientWidth, setClientWidth] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const throttleCallback = useRef<(width: number, height: number) => void>((width: number, height: number) => {
    setClientWidth(width);
    setClientHeight(height);
  });

  const handleResize = useCallback(
    throttleEvent(() => {
      if (!ref.current) return;
      const $elem = ref.current;
      throttleCallback.current && throttleCallback.current($elem.clientWidth, $elem.clientHeight);
    }, 100),
    [ref.current]
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [ref.current]);

  return [clientWidth, clientHeight];
}
