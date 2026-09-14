"use client";

import { useEffect, useRef } from "react";

const RETRY_EVENTS = ["pointerdown", "touchstart", "scroll", "keydown"] as const;

/**
 * Muted, looping hero background. Some browsers refuse autoplay even for muted video
 * (e.g. iOS Low Power Mode); those get another play() attempt on the first user
 * interaction. Until then the poster frame shows.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;

    const detach = () => RETRY_EVENTS.forEach((name) => window.removeEventListener(name, retry));
    const retry = () => { video.play().then(detach, () => {}); };

    video.play().catch(() => RETRY_EVENTS.forEach((name) => window.addEventListener(name, retry, { passive: true })));
    return detach;
  }, []);

  return (
    <video
      ref={ref}
      className="hero-video"
      src="/video/hero-planet.mp4"
      poster="/video/hero-planet-poster.webp"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
}
