"use client";

import React, { useState, useSyncExternalStore } from "react";

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
  const [isHovered, setIsHovered] = useState(false);
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isHorizontal = direction === "horizontal";
  const activeDuration = isHovered && speedOnHover ? duration * (100 / speedOnHover) : duration;

  return (
    <div
      className={`infinite-slider-container overflow-hidden w-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="infinite-slider-track"
        style={{
          display: "flex",
          flexDirection: isHorizontal ? "row" : "column",
          flexWrap: "nowrap",
          width: "max-content",
          gap: `${gap}px`,
          animationDuration: `${activeDuration}s`,
          animationPlayState: isHovered && speedOnHover === undefined ? "paused" : "running",
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
