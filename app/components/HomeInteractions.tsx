"use client";

import { useState } from "react";
import { processSteps, services } from "../data";
import { AppLink as Link } from "./AppLink";
import { ArrowRight } from "./Icons";

export function ServiceExplorer() {
  const [active, setActive] = useState<number | null>(0);

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

export function ProcessExperience() {
  const [active, setActive] = useState(0);

  return (
    <div className="process-experience">
      <div className="process-visual" aria-hidden="true">
        <div className="process-ring"><span>{processSteps[active].number}</span></div>
        <p>{processSteps[active].title}</p>
      </div>
      <ol className="process-list">
        {processSteps.map((step, index) => (
          <li key={step.title} className={index === active ? "is-active" : ""}>
            <button type="button" onClick={() => setActive(index)} onMouseEnter={() => setActive(index)} aria-pressed={index === active}>
              <span>{step.number}</span>
              <strong>{step.title}</strong>
              <span className="process-copy">{step.copy}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
