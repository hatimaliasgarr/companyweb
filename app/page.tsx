import type { Metadata } from "next";
import { AppLink as Link } from "./components/AppLink";
import {
  ArrowRight,
  Check,
  CircleDot,
  MoveUpRight,
} from "./components/Icons";
import { insights, industries, services, solutions, technology } from "./data";
import { ProcessExperience } from "./components/HomeInteractions";
import { BrandMark } from "./components/BrandMark";
import { FinalCta, Reveal, SectionHeading } from "./components/Site";
import { InfiniteSlider } from "./components/core/infinite-slider";
import { StatCounter } from "./components/StatCounter";
import { FaqAccordion } from "./components/FaqAccordion";

export const metadata: Metadata = {
  title: { absolute: "Zerobugg — Your Digital Growth & Technology Partner" },
  description: "Zerobugg helps businesses diagnose digital bottlenecks and deliver strategy, product design, software, automation and growth through one accountable team.",
  alternates: { canonical: "/" },
  openGraph: { title: "Zerobugg — Your Digital Growth & Technology Partner", description: "Zerobugg helps businesses diagnose digital bottlenecks and deliver strategy, product design, software, automation and growth through one accountable team.", type: "website", url: "/", siteName: "Zerobugg", images: [{ url: "/og-zerobugg.png", width: 1735, height: 906, alt: "Zerobugg — Strategy. Technology. Growth. One Digital Partner." }] },
  twitter: { card: "summary_large_image", title: "Zerobugg — Your Digital Growth & Technology Partner", description: "Zerobugg helps businesses diagnose digital bottlenecks and deliver strategy, product design, software, automation and growth through one accountable team.", images: ["/og-zerobugg.png"] },
};

const serviceMarqueeRows = [services.slice(0, Math.ceil(services.length / 2)), services.slice(Math.ceil(services.length / 2))];

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <video className="hero-video" src="/video/hero-planet.mp4" poster="/video/hero-planet-poster.webp" autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-stars" aria-hidden="true" />
        <div className="hero-copy">
          <p className="hero-badge"><span /> Your digital growth &amp; technology partner</p>
          <h1 id="hero-title">
            From business challenge<br />{" "}
            to digital growth.<br />{" "}
            <em>One partner.</em>
          </h1>
          <p className="hero-sub">We diagnose what&apos;s holding you back, define the roadmap, and deliver the design, technology, automation and marketing to move the business forward.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/contact">Tell us your challenge <ArrowRight size={17} /></Link>
            <Link className="button button-ghost" href="/process">See how we work <ArrowRight size={16} /></Link>
          </div>
        </div>

        <div className="partner-path">
          {[
            ["01", "Challenge", "What needs to change?"],
            ["02", "Roadmap", "What should happen first?"],
            ["03", "Delivery", "One team builds it."],
            ["04", "Measurement", "Evidence guides the next move."],
          ].map(([number, label, copy]) => <div className="partner-stage" key={number}><span>{number}</span><div><small>{label}</small><strong>{copy}</strong></div></div>)}
          <p><span>Z</span> One accountable partner, end to end</p>
        </div>
      </section>

      <section className="tech-strip" aria-label="Technology we build with">
        <div className="tech-label"><CircleDot size={14} /> Technology we build with</div>
        {/* A labelled scroll region needs a focus target for keyboard-only horizontal scrolling. */}
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <div className="tech-rail" role="region" aria-label="Scrollable technology list" tabIndex={0}>
          <InfiniteSlider speedOnHover={20} gap={0} duration={30}>
            {technology.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </InfiniteSlider>
        </div>
      </section>

      <section className="proof section-pad">
        <Reveal><SectionHeading center eyebrow="A connected capability" title={<>One partner.<br />{" "}<em>Every digital need.</em></>} /></Reveal>
        <div className="proof-grid">
          <Reveal className="proof-card proof-statement">
            <p className="pale-badge">Why one partner</p>
            <p className="proof-quote">When strategy, design, engineering and growth are split across vendors, you end up managing the gaps.</p>
            <p className="proof-note">Zerobugg puts every discipline on one roadmap, with one team accountable from diagnosis through improvement.</p>
          </Reveal>
          <div className="proof-stats">
            <Reveal className="proof-card stat-card" delay={80}>
              <div className="stat-top">
                <StatCounter value={services.length} />
                <span className="pale-badge">Service lines</span>
              </div>
              <p className="stat-note">Strategy, design, engineering, growth, automation and analytics under one roof.</p>
            </Reveal>
            <Reveal className="proof-card stat-card" delay={160}>
              <div className="stat-top">
                <StatCounter value={industries.length} suffix="+" />
                <span className="pale-badge">Industries served</span>
              </div>
              <p className="stat-note">From startups to healthcare, retail and finance — the method travels.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bento-section section-pad" aria-label="Why Zerobugg">
        <Reveal><SectionHeading center eyebrow="Why Zerobugg" title={<>A partner built for<br />{" "}<em>the whole journey.</em></>} /></Reveal>
        <div className="bento-grid">
          <Reveal className="bento-card bento-card--wide">
            <div className="bento-copy">
              <p className="pale-badge">One accountable partner</p>
              <h3>One roadmap.<br />{" "}One team.</h3>
              <p className="bento-sub">Strategy, design, engineering, growth and automation share one plan — so delivery never waits on a handoff.</p>
            </div>
            <div className="bento-visual" aria-hidden="true">
              <div className="project-ui">
                <div><span /><span /><span /></div>
                <p>Shared roadmap</p>
                <div className="ui-lines"><span /><span /><span /><span /></div>
                <div className="ui-chart"><i /><i /><i /><i /><i /></div>
              </div>
            </div>
          </Reveal>
          <Reveal className="bento-card" delay={80}>
            <div className="orbit-visual" aria-hidden="true">
              <span className="orbit-ring" />
              <span className="orbit-ring orbit-ring--inner" />
              {["STRATEGY", "DESIGN", "CODE", "GROWTH", "AUTOMATE", "MEASURE"].map((item, index) => (
                <span className={`orbit-item orbit-item-${index + 1}`} key={item}>{item}</span>
              ))}
              <div className="orbit-core">
                <BrandMark />
              </div>
            </div>
            <h3>Every discipline in orbit</h3>
            <p className="bento-sub">One integrated team: strategy, design, engineering, growth and automation on a single roadmap.</p>
          </Reveal>
          <Reveal className="bento-card bento-card--giant" delay={160}>
            <span className="bento-giant" aria-hidden="true">END&nbsp;TO&nbsp;END</span>
            <p className="pale-badge">Keep improving</p>
            <h3>From diagnosis<br />{" "}to improvement</h3>
            <p className="bento-sub">Success measures are agreed before delivery. Support, learning and optimization continue after the first release.</p>
          </Reveal>
        </div>
      </section>

      <section className="chip-band" aria-label="Services overview">
        <Reveal><SectionHeading center eyebrow="What we do" title={<>Everything your business needs<br />{" "}<em>to grow digitally.</em></>} copy="Pick a capability or bring us the whole problem. We assemble the right team around the outcome." /></Reveal>
        <div className="chip-rows">
          {serviceMarqueeRows.map((row, rowIndex) => (
            <div className="chip-row" key={rowIndex}>
              <InfiniteSlider duration={rowIndex === 0 ? 46 : 58} reverse={rowIndex === 1} gap={14}>
                {row.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Link className="chip" key={service.slug} href={`/services/${service.slug}`} aria-label={`${service.short}: ${service.title}`}>
                      <span className="chip-icon"><Icon size={19} strokeWidth={1.5} /></span>
                      <span className="chip-copy"><strong>{service.short}</strong><small>{service.title}</small></span>
                      <ArrowRight size={16} />
                    </Link>
                  );
                })}
              </InfiniteSlider>
            </div>
          ))}
        </div>
        <div className="chip-band-footer">
          <Link className="section-link" href="/services">Explore all services <ArrowRight size={18} /></Link>
        </div>
      </section>

      <section className="tiles-section section-pad" id="solutions">
        <Reveal><SectionHeading center eyebrow="Built around outcomes" title={<>What are you trying<br />{" "}<em>to make happen?</em></>} copy="Start with the business outcome. We will connect the capabilities required to reach it." /></Reveal>
        <div className="tile-grid">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <Reveal key={solution.title} delay={index * 60} className="tile-card">
                <span className="card-index">0{index + 1}</span>
                <span className="tile-icon"><Icon size={24} strokeWidth={1.45} /></span>
                <h3>{solution.title}</h3>
                <p>{solution.copy}</p>
                <div className="tile-tags">{solution.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <Link className="tile-cta" href={`/contact?context=${encodeURIComponent(solution.title)}`} aria-label={`Explore outcome: ${solution.title}`}>Explore this outcome <MoveUpRight size={17} /></Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="approach section-pad light-section" id="process">
        <Reveal><SectionHeading eyebrow="Our consulting approach" light title={<>We don&apos;t start with technology.<br />{" "}<em>We start with your business.</em></>} /></Reveal>
        <Reveal><ProcessExperience /></Reveal>
      </section>

      <section className="plans-section section-pad" id="engagement">
        <Reveal><SectionHeading center eyebrow="Engagement models" title={<>Work with Zerobugg<br />{" "}<em>your way.</em></>} /></Reveal>
        <div className="plan-grid">
          {[
            ["01", "Project-based", "For websites, products and defined digital initiatives with a clear scope and destination.", ["Defined scope", "Cross-functional team", "Milestone delivery"]],
            ["02", "Dedicated team", "Specialists working as an integrated extension of your company and internal rhythm.", ["Flexible capacity", "Embedded collaboration", "Specialist access"]],
            ["03", "Digital partner", "One continuous team for technology, website, growth, automation and improvement.", ["One accountable partner", "Continuous roadmap", "Priority access & strategy"]],
          ].map(([number, title, copy, points], index) => (
            <Reveal key={title as string} className={`plan-card ${index === 2 ? "plan-card--featured" : ""}`}>
              {index === 2 && <span className="plan-badge">RECOMMENDED</span>}
              <small>{number as string}</small>
              <h3>{title as string}</h3>
              <p>{copy as string}</p>
              <ul>{(points as string[]).map((point) => <li key={point}><Check size={14} />{point}</li>)}</ul>
              <Link className={`button ${index === 2 ? "button-light" : "button-ghost"}`} href={`/contact?context=${encodeURIComponent(`${title as string} engagement`)}`} aria-label={`Discuss the ${title as string} engagement model`}>Discuss this model <ArrowRight size={16} /></Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="faq-section section-pad">
        <Reveal><SectionHeading center eyebrow="FAQ" title={<>Questions?<br />{" "}We&apos;re here to assist!</>} /></Reveal>
        <Reveal><FaqAccordion /></Reveal>
      </section>

      <section className="posts-section section-pad">
        <Reveal>
          <div className="posts-heading">
            <div>
              <p className="eyebrow"><span />Insights</p>
              <h2>Useful thinking for<br />{" "}<em>digital decision-makers.</em></h2>
            </div>
            <Link className="button button-ghost" href="/insights">Read all insights <ArrowRight size={16} /></Link>
          </div>
        </Reveal>
        <div className="post-grid">
          {insights.slice(0, 3).map((article, index) => (
            <Reveal key={article.slug} delay={index * 60} className="post-card">
              <Link href={`/insights/${article.slug}`} aria-label={article.title}>
                <div className="post-meta"><span>{article.category}</span><small>{article.read}</small></div>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <span className="post-arrow" aria-hidden="true"><ArrowRight size={18} /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
