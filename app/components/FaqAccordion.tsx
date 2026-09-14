"use client";

import { useState } from "react";
import { faqs } from "../data";

function Chevron() {
  return (
    <svg className="faq-chevron" width={18} height={18} viewBox="0 0 18 18" fill="none" aria-hidden="true" focusable="false">
      <path d="M4 6.75L9 11.75L14 6.75" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FaqAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <div className="faq-list">
      {faqs.map((item, index) => {
        const isOpen = open === index;
        return (
          <div className={`faq-item ${isOpen ? "is-open" : ""}`} key={item.q}>
            <button
              type="button"
              id={`faq-trigger-${index}`}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${index}`}
              onClick={() => setOpen(isOpen ? -1 : index)}
            >
              <span>{item.q}</span>
              <Chevron />
            </button>
            <div className="faq-panel" id={`faq-panel-${index}`} role="region" aria-labelledby={`faq-trigger-${index}`}>
              <div className="faq-panel-inner">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
