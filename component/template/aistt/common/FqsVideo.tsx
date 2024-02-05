import React, { HTMLAttributes } from "react";
import styled from "@emotion/styled";
import { Cross } from "@ComponentFarm/atom/icons";
import useSyncedRef from "HookFarm/useSyncedRef";

import useIsomorphicLayoutEffect from "HookFarm/useIsomorphicLayoutEffect";
import { VideoWrapStyle } from "./style";

const FqsVideo = React.forwardRef<
  HTMLVideoElement,
  HTMLAttributes<HTMLVideoElement> & {
    sticky?: boolean;
    closeButton?: boolean;
    loading?: boolean;
    src?: string;
    crossOrigin?: "anonymous" | "use-credentials" | "" | undefined;
  }
>(({ sticky, closeButton, crossOrigin, loading, ...props }, ref) => {
  const wrapperRef = useSyncedRef<HTMLDivElement>(null);
  const [viewportIn, setViewportIn] = React.useState(true);

  useIsomorphicLayoutEffect(() => {
    if (!wrapperRef.current || !sticky) return () => {};

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === wrapperRef.current) {
            setViewportIn(
              // 영상이 아래로 내려가면 viewport out
              entry.boundingClientRect.top < 0 ? entry.isIntersecting : true
            );
          }
        });
      },
      {
        rootMargin: "0px",
        threshold: [0.5, 1],
      }
    );

    io.observe(wrapperRef.current);

    return () => io.disconnect();
  }, [wrapperRef, sticky]);

  if (loading) {
    return (
      <VideoWrapStyle ref={wrapperRef}>
        <div className="empty">
          <p>비디오 정보를 불러오는중입니다.</p>
        </div>
      </VideoWrapStyle>
    );
  }
  return (
    <VideoWrapStyle
      ref={wrapperRef}
      className={sticky ? (viewportIn ? "viewport-in" : "viewport-out") : ""}
    >
      <div className="video-position">
        <video ref={ref} controls muted crossOrigin={crossOrigin} {...props} />
        {!viewportIn && closeButton && (
          <button
            type="button"
            className="video-fix-close"
            onClick={() => setViewportIn(true)}
          >
            <Cross />
          </button>
        )}
      </div>
    </VideoWrapStyle>
  );
});

FqsVideo.displayName = "FqsVideo";

export default FqsVideo;
