"use client";

import { useState, type CSSProperties } from "react";
import { processSteps, services } from "../data";
import { AppLink as Link } from "./AppLink";
import { ArrowRight } from "./Icons";

export function ServiceExplorer() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="service-explorer">
      {services.map((service, index) => {
        const Icon = service.icon;
        const isActive = index === active;
        return (
          <article className={`service-card ${isActive ? "is-active" : ""}`} key={service.slug}>
            <button
              type="button"
              onClick={() => setActive((curr) => (curr === index ? null : index))}
              aria-expanded={isActive}
              aria-controls={`service-panel-${service.slug}`}
            >
              <span className="service-number">{service.number}</span>
              <Icon size={24} strokeWidth={1.5} />
              <span className="service-title">{service.short}</span>
              <span className="service-toggle" aria-hidden="true">{isActive ? "−" : "+"}</span>
            </button>
            <div className="service-card-detail" id={`service-panel-${service.slug}`} hidden={!isActive}>
              <p>{service.description}</p>
              <ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul>
              <Link href={`/services/${service.slug}`}>Explore service <ArrowRight size={15} /></Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}

/** Six steps in a quiet grid; each fades up in turn (via .reveal) while its hairline draws in. */
export function ProcessExperience() {
  return (
    <ol className="process-grid">
      {processSteps.map((step, index) => (
        <li
          key={step.title}
          className="process-step reveal"
          style={{ transitionDelay: `${index * 70}ms`, "--step-delay": `${index * 70}ms` } as CSSProperties}
        >
          <span className="process-num">{step.number}</span>
          <h3>{step.title}</h3>
          <p>{step.copy}</p>
        </li>
      ))}
    </ol>
  );
}
