"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, Check, Menu, X } from "./Icons";
import { processSteps, services } from "../data";

const navItems = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Solutions", "/solutions"],
  ["Our Work", "/work"],
  ["Process", "/process"],
  ["Insights", "/insights"],
  ["Careers", "/careers"],
  ["Contact", "/contact"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 28);
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? (window.scrollY / height) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress / 100})` }} />
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <Link className="wordmark" href="/" aria-label="Zeroberg home">
          ZEROBERG<span>.</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.slice(1).map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <Link className="nav-cta" href="/contact">
          Start a project <ArrowRight size={15} aria-hidden="true" />
        </Link>
        <button className="menu-toggle" type="button" onClick={() => setOpen(true)} aria-label="Open navigation" aria-expanded={open}>
          <Menu size={20} />
        </button>
      </header>

      <div className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="mobile-menu-top">
          <span className="wordmark">ZEROBERG<span>.</span></span>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close navigation"><X size={24} /></button>
        </div>
        <nav aria-label="Mobile navigation">
          {navItems.map(([label, href], index) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              <small>{String(index + 1).padStart(2, "0")}</small>{label}<ArrowRight aria-hidden="true" />
            </Link>
          ))}
        </nav>
        <p>Strategy × Technology × Growth</p>
      </div>
    </>
  );
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function ServiceExplorer() {
  const [active, setActive] = useState(0);
  return (
    <div className="service-explorer">
      {services.slice(0, 6).map((service, index) => {
        const Icon = service.icon;
        const isActive = index === active;
        return (
          <article className={`service-card ${isActive ? "is-active" : ""}`} key={service.slug}>
            <button type="button" onClick={() => setActive(index)} aria-expanded={isActive}>
              <span className="service-number">{service.number}</span>
              <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
              <h3>{service.short}</h3>
              <span className="service-toggle">{isActive ? "−" : "+"}</span>
            </button>
            <div className="service-card-detail">
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
            <button type="button" onClick={() => setActive(index)} onMouseEnter={() => setActive(index)}>
              <span>{step.number}</span>
              <strong>{step.title}</strong>
              <p>{step.copy}</p>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Please check the highlighted fields and try again.");
      form.reset();
      setState("success");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong. Please try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="form-success" role="status">
        <div><Check size={38} /></div>
        <p className="eyebrow">Message received</p>
        <h2>We&apos;re on it.</h2>
        <p>Thank you for trusting us with the first look. A Zeroberg strategist will review your message and follow up.</p>
        <button className="button button-ghost" onClick={() => setState("idle")}>Send another message</button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="field-grid">
        <label><span>Name *</span><input name="name" autoComplete="name" required minLength={2} placeholder="Your name" /></label>
        <label><span>Company</span><input name="company" autoComplete="organization" placeholder="Company name" /></label>
        <label><span>Work email *</span><input name="email" type="email" autoComplete="email" required placeholder="you@company.com" /></label>
        <label><span>Phone</span><input name="phone" type="tel" autoComplete="tel" placeholder="+91 00000 00000" /></label>
      </div>
      <label><span>What do you need? *</span>
        <select name="need" required defaultValue="">
          <option value="" disabled>Select a starting point</option>
          {[
            "Website", "Software", "Marketing", "SEO", "AI / Automation", "Branding", "Complete Digital Solution", "Not Sure Yet",
          ].map((item) => <option key={item}>{item}</option>)}
        </select>
      </label>
      <label><span>Budget range</span>
        <select name="budget" defaultValue="">
          <option value="">Select a range</option>
          <option>Under ₹2 lakh</option><option>₹2–5 lakh</option><option>₹5–15 lakh</option><option>₹15 lakh+</option><option>Let&apos;s define it together</option>
        </select>
      </label>
      <label><span>Tell us about the business and the challenge *</span><textarea name="description" required minLength={20} rows={6} placeholder="Where are you today, and where do you want to go?" /></label>
      <div className="form-footer">
        <p>By submitting, you agree to our <Link href="/privacy">privacy policy</Link>.</p>
        <button className="button button-primary" disabled={state === "submitting"}>
          {state === "submitting" ? "Sending…" : "Start the conversation"}<ArrowRight size={17} />
        </button>
      </div>
      {error && <p className="form-error" role="alert">{error}</p>}
    </form>
  );
}

export function NewsletterForm() {
  const [joined, setJoined] = useState(false);
  return joined ? (
    <p className="newsletter-success" role="status"><Check size={15} /> You&apos;re on the list.</p>
  ) : (
    <form className="newsletter" onSubmit={(event) => { event.preventDefault(); setJoined(true); }}>
      <label htmlFor="newsletter">Ideas for building better digital businesses.</label>
      <div><input id="newsletter" name="email" type="email" required placeholder="Work email" aria-label="Work email for newsletter" /><button type="submit" aria-label="Subscribe"><ArrowRight size={18} /></button></div>
    </form>
  );
}
