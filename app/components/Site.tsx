import type { ReactNode } from "react";
import { AppLink as Link } from "./AppLink";
import { BrandLockup } from "./BrandMark";
import { ArrowRight, InstagramIcon } from "./Icons";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  light = false,
  center = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  copy?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`section-heading ${light ? "on-light" : ""} ${center ? "on-center" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <div>
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </div>
    </div>
  );
}

export function PageHero({
  index,
  eyebrow,
  title,
  copy,
  children,
  variant = "default",
}: {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  copy: string;
  children?: React.ReactNode;
  variant?: "default" | "compact";
}) {
  return (
    <section className={`page-hero page-hero--${variant}`}>
      <p className="eyebrow">{eyebrow}</p>
      <div className="page-hero-main">
        <div>
          {index && <span className="page-index">{index}</span>}
          <h1>{title}</h1>
        </div>
        <div className="page-hero-side">
          <p>{copy}</p>
          {children}
        </div>
      </div>
    </section>
  );
}

export function FinalCta({ title = <>Ready to turn the problem<br />{" "}<em>into a plan?</em></> }: { title?: React.ReactNode }) {
  return (
    <section className="final-cta">
      <div className="final-cta-grid">
        <div className="final-visual-card" aria-hidden="true">
          <p className="final-visual-label">The working path</p>
          {[
            ["01", "Challenge", "What needs to change?"],
            ["02", "Roadmap", "What should happen first?"],
            ["03", "Delivery", "One team builds it."],
            ["04", "Measurement", "Evidence guides the next move."],
          ].map(([number, label, copy]) => (
            <div className="final-visual-row" key={number}>
              <span>{number}</span>
              <div><small>{label}</small><strong>{copy}</strong></div>
            </div>
          ))}
        </div>
        <div className="final-copy">
          <p className="eyebrow">Start with the challenge</p>
          <h2>{title}</h2>
          <div className="final-cta-row">
            <p>Tell us what is stuck, changing or ready to grow. We&apos;ll help define the clearest next step.</p>
            <div>
              <Link className="button button-light" href="/contact">Tell us your challenge <ArrowRight size={17} /></Link>
              <Link className="text-link" href="/process">See how we work <ArrowRight size={15} /></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link className="brand-lockup brand-lockup--footer" href="/" aria-label="Zerobugg home" translate="no"><BrandLockup /></Link>
          <p>Design × Engineering × Automation × Growth</p>
          <div className="footer-insights">
            <p>Practical thinking for better digital decisions.</p>
            <Link href="/insights">Read Zerobugg insights <ArrowRight size={16} /></Link>
          </div>
        </div>
        <div className="footer-links">
          <div><p>Services</p><Link href="/services/consulting">Consulting</Link><Link href="/services/ui-ux">UI/UX design</Link><Link href="/services/web-development">Web development</Link><Link href="/services/software-development">Software</Link><Link href="/services/digital-marketing">Digital marketing</Link><Link href="/services/seo">SEO</Link><Link href="/services/ai-automation">AI & automation</Link><Link href="/services/analytics">Analytics</Link></div>
          <div><p>Company</p><Link href="/about">About</Link><Link href="/work">Work</Link><Link href="/process">Process</Link><Link href="/careers">Careers</Link><Link href="/contact">Contact</Link></div>
          <div>
            <p>Contact</p>
            <a href="tel:+919752306452">+91 9752306452</a>
            <a href="mailto:office@zerobugg.in">office@zerobugg.in</a>
            <a href="https://www.instagram.com/zerobugg/" target="_blank" rel="noopener noreferrer">Instagram (@zerobugg)</a>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
      <div className="footer-word">ZEROBUGG</div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Zerobugg. All rights reserved.</p>
        <div>
          <a href="https://www.instagram.com/zerobugg/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }} aria-label="Zerobugg on Instagram">
            <InstagramIcon size={14} /> Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
