import type { ReactNode } from "react";
import { AppLink as Link } from "./AppLink";
import { ArrowRight } from "./Icons";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  light = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  copy?: string;
  light?: boolean;
}) {
  return (
    <div className={`section-heading ${light ? "on-light" : ""}`}>
      <p className="eyebrow"><span />{eyebrow}</p>
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
      <div className="page-hero-grid" aria-hidden="true" />
      <p className="eyebrow"><span />{eyebrow}</p>
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
      <div className="final-orbit" aria-hidden="true"><span>Z</span></div>
      <p className="eyebrow"><span />Start with the challenge</p>
      <h2>{title}</h2>
      <div className="final-cta-row">
        <p>Tell us what is stuck, changing or ready to grow. We&apos;ll help define the clearest next step.</p>
        <div>
          <Link className="button button-light" href="/contact">Tell us your challenge <ArrowRight size={17} /></Link>
          <Link className="text-link" href="/process">See how we work <ArrowRight size={15} /></Link>
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
          <Link className="wordmark" href="/" translate="no">ZEROBUGG<span>.</span></Link>
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
            <span style={{ display: "block", color: "#e4e1da", fontSize: "14px", fontWeight: 600 }}>Hatim Aliasgar</span>
            <a href="tel:+919752306452">+91 9752306452</a>
            <a href="mailto:hatimaliasgar21@gmail.com">hatimaliasgar21@gmail.com</a>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
      <div className="footer-word">ZEROBUGG</div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Zerobugg. All rights reserved.</p>
      </div>
    </footer>
  );
}
