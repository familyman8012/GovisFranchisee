import React, { useEffect, useLayoutEffect, useState } from "react";

import useScroll from "HookFarm/useScroll";
import useSyncedRef from "HookFarm/useSyncedRef";

import { toClasses } from "LibFarm/toClasses";

import { OverflowXAxiosWrapper, ScrollShadow } from "./styles";

interface OverflowChartWrapperProps {
  className?: string;
  len?: number;
}

const OverflowChartWrapper = React.forwardRef(
  ({ className, len, children }: React.PropsWithChildren<OverflowChartWrapperProps>, ref) => {
    const refs = useSyncedRef<HTMLInputElement>(ref ?? null);
    const [scrollLeft] = useScroll(refs, 100);
    const [hasScrollLeft, setHasScrollLeft] = useState(false);
    const [hasScrollRight, setHasScrollRight] = useState(false);

    useEffect(() => {
      const elem = refs.current;
      if (!elem) return;
      setHasScrollLeft(elem.scrollLeft > 0);
      setHasScrollRight(elem.scrollWidth - elem.clientWidth - elem.scrollLeft > 0);
    }, [scrollLeft, len]);

    return (
      <ScrollShadow className={toClasses([hasScrollLeft ? "left-show" : "", hasScrollRight ? "right-show" : ""])}>
        <OverflowXAxiosWrapper ref={refs} className={className}>
          {children}
        </OverflowXAxiosWrapper>
      </ScrollShadow>
    );
  }
);

OverflowChartWrapper.displayName = "OverflowChartWrapper";

export default OverflowChartWrapper;
