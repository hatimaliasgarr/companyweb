"use client";

import { useEffect, useRef, useState } from "react";

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

/**
 * Rolling odometer number: each digit is a masked column that translates to its
 * target once the element scrolls into view. The rendered digits are decorative;
 * the final value is exposed through aria-label.
 */
export function StatCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [rolled, setRolled] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = window.requestAnimationFrame(() => setRolled(true));
      return () => window.cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRolled(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <span className="stat-counter" ref={ref} role="img" aria-label={`${value}${suffix}`}>
      <span className="stat-counter-digits" aria-hidden="true">
        {String(value).split("").map((digit, index) => (
          <span className="stat-digit" key={index}>
            <span
              className="stat-digit-track"
              style={{
                transform: rolled ? `translateY(calc(-${Number(digit)} * var(--stat-step, 1em)))` : "translateY(0)",
                transitionDelay: `${120 + index * 140}ms`,
              }}
            >
              {DIGITS.map((n) => (
                <span key={n}>{n}</span>
              ))}
            </span>
          </span>
        ))}
      </span>
      {suffix ? (
        <span className="stat-counter-suffix" aria-hidden="true" style={{ opacity: rolled ? 1 : 0 }}>
          {suffix}
        </span>
      ) : null}
    </span>
  );
}
