"use client";

import React, { useRef, useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  speedOnHover?: number;
  direction?: "horizontal" | "vertical";
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 32,
  duration = 30,
  speedOnHover,
  direction = "horizontal",
  className = "",
}: InfiniteSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isHorizontal = direction === "horizontal";
  // Changing animation-duration mid-flight remaps the animation's progress and
  // makes the track jump; adjusting playbackRate keeps the current position.
  const setPlaybackRate = (rate: number) => {
    for (const animation of trackRef.current?.getAnimations() ?? []) {
      animation.playbackRate = rate;
    }
  };
  const hoverRate = speedOnHover ? speedOnHover / 100 : 1;

  return (
    <div
      className={`infinite-slider-container overflow-hidden w-full ${className}`}
      onMouseEnter={() => setPlaybackRate(hoverRate)}
      onMouseLeave={() => setPlaybackRate(1)}
    >
      <div
        ref={trackRef}
        className="infinite-slider-track"
        style={{
          display: "flex",
          flexDirection: isHorizontal ? "row" : "column",
          flexWrap: "nowrap",
          width: "max-content",
          gap: `${gap}px`,
          animationDuration: `${duration}s`,
        }}
      >
        <div
          className="infinite-slider-group"
          style={{
            display: "flex",
            flexDirection: isHorizontal ? "row" : "column",
            flexWrap: "nowrap",
            flexShrink: 0,
            alignItems: "center",
            whiteSpace: "nowrap",
            gap: `${gap}px`,
          }}
        >
          {children}
        </div>
        {isMounted && (
          <div
            className="infinite-slider-group"
            style={{
              display: "flex",
              flexDirection: isHorizontal ? "row" : "column",
              flexWrap: "nowrap",
              flexShrink: 0,
              alignItems: "center",
              whiteSpace: "nowrap",
              gap: `${gap}px`,
            }}
            aria-hidden="true"
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
