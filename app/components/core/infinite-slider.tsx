"use client";

import React, { useRef, type CSSProperties } from "react";

export type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  speedOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  /** Identical groups on the track (min 2). Raise it when one group is narrower than the widest viewport. */
  copies?: number;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 32,
  duration = 30,
  speedOnHover,
  direction = "horizontal",
  reverse = false,
  copies = 2,
  className = "",
}: InfiniteSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const groups = Math.max(2, Math.round(copies));

  const isHorizontal = direction === "horizontal";
  // Changing animation-duration mid-flight remaps the animation's progress and
  // makes the track jump; adjusting playbackRate keeps the current position.
  const setPlaybackRate = (rate: number) => {
    for (const animation of trackRef.current?.getAnimations() ?? []) {
      animation.playbackRate = rate;
    }
  };
  const hoverRate = speedOnHover ? speedOnHover / 100 : 1;

  // Each group carries its trailing gap as padding, so every group has the same size and
  // shifting the track by exactly one group (100% / groups) loops without a seam.
  const groupStyle: CSSProperties = {
    display: "flex",
    flexDirection: isHorizontal ? "row" : "column",
    flexWrap: "nowrap",
    flexShrink: 0,
    alignItems: "center",
    whiteSpace: "nowrap",
    gap: `${gap}px`,
    [isHorizontal ? "paddingRight" : "paddingBottom"]: `${gap}px`,
  };

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
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
          "--slider-shift": `${-100 / groups}%`,
        } as CSSProperties}
      >
        {Array.from({ length: groups }, (_, index) => (
          <div className="infinite-slider-group" style={groupStyle} aria-hidden={index > 0 ? true : undefined} key={index}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
