import Link from "next/link";
import { ArrowRight, Linkedin, Instagram, Github } from "./Icons";
import { NewsletterForm, SiteHeader } from "./Interactive";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
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
}: {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  copy: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
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

export function FinalCta({ title = <>Have an idea?<br /><em>Let&apos;s build it.</em></> }: { title?: React.ReactNode }) {
  return (
    <section className="final-cta">
      <div className="final-orbit" aria-hidden="true"><span>Z</span></div>
      <p className="eyebrow"><span />Your next move</p>
      <h2>{title}</h2>
      <div className="final-cta-row">
        <p>Tell us where you want your business to go. We&apos;ll help you figure out how to get there.</p>
        <div>
          <Link className="button button-light" href="/contact">Start your project <ArrowRight size={17} /></Link>
          <Link className="text-link" href="/contact">Talk to Zeroberg <ArrowRight size={15} /></Link>
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
          <Link className="wordmark" href="/">ZEROBERG<span>.</span></Link>
          <p>Strategy × Technology × Growth</p>
          <NewsletterForm />
        </div>
        <div className="footer-links">
          <div><p>Services</p><Link href="/services/consulting">Consulting</Link><Link href="/services/web-development">Web development</Link><Link href="/services/software-development">Software</Link><Link href="/services/digital-marketing">Digital marketing</Link><Link href="/services/ai-automation">AI & automation</Link></div>
          <div><p>Company</p><Link href="/about">About</Link><Link href="/work">Work</Link><Link href="/process">Process</Link><Link href="/careers">Careers</Link><Link href="/contact">Contact</Link></div>
          <div><p>Resources</p><Link href="/insights">Insights</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><a href="mailto:hello@zeroberg.com">hello@zeroberg.com</a></div>
        </div>
      </div>
      <div className="footer-word">ZEROBERG</div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Zeroberg. All rights reserved.</p>
        <div aria-label="Social profiles coming soon"><span title="LinkedIn profile coming soon"><Linkedin size={17} /></span><span title="Instagram profile coming soon"><Instagram size={17} /></span><span title="GitHub profile coming soon"><Github size={17} /></span></div>
      </div>
    </footer>
  );
}
