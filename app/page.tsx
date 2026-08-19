import type { Metadata } from "next";
import { AppLink as Link } from "./components/AppLink";
import {
  ArrowRight,
  Check,
  BarChart3,
  CircleDot,
  Code2,
  Globe2,
  MessagesSquare,
  MoveUpRight,
  Network,
  ShieldCheck,
} from "./components/Icons";
import { insights, projects, solutions, technology } from "./data";
import { ProcessExperience, ServiceExplorer } from "./components/HomeInteractions";
import { FinalCta, Reveal, SectionHeading } from "./components/Site";
import { InfiniteSlider } from "./components/core/infinite-slider";

export const metadata: Metadata = {
  title: { absolute: "Zerobugg — Your Digital Growth & Technology Partner" },
  description: "Zerobugg helps businesses diagnose digital bottlenecks and deliver strategy, product design, software, automation and growth through one accountable team.",
  alternates: { canonical: "/" },
  openGraph: { title: "Zerobugg — Your Digital Growth & Technology Partner", description: "Zerobugg helps businesses diagnose digital bottlenecks and deliver strategy, product design, software, automation and growth through one accountable team.", type: "website", url: "/", siteName: "Zerobugg", images: [{ url: "/og-zerobugg.png", width: 1733, height: 907, alt: "Zerobugg — Strategy. Technology. Growth. One Digital Partner." }] },
  twitter: { card: "summary_large_image", title: "Zerobugg — Your Digital Growth & Technology Partner", description: "Zerobugg helps businesses diagnose digital bottlenecks and deliver strategy, product design, software, automation and growth through one accountable team.", images: ["/og-zerobugg.png"] },
};

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow hero-kicker"><span /> Your digital growth &amp; technology partner</p>
          <h1 id="hero-title">
            From business challenge<br />{" "}
            to digital growth.<br />{" "}
            <em>One partner.</em>
          </h1>
          <div className="hero-lower">
            <p>We diagnose what&apos;s holding you back, define the roadmap, and deliver the design, technology, automation and marketing to move the business forward.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/contact">Tell us your challenge <ArrowRight size={17} /></Link>
              <Link className="button button-ghost" href="/process">See how we work <ArrowRight size={16} /></Link>
            </div>
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

      <section className="positioning section-pad light-section">
        <Reveal>
          <SectionHeading eyebrow="A connected capability" light title={<>One partner.<br />{" "}<em>Every digital need.</em></>} />
        </Reveal>
        <Reveal className="positioning-content">
          <p className="big-copy">When strategy, design, engineering and growth are split across vendors, you end up managing the gaps.</p>
          <div className="merge-visual" aria-label="Strategy, design, technology, marketing, automation and analytics integrated by Zerobugg">
            {[
              "STRATEGY", "DESIGN", "TECHNOLOGY", "MARKETING", "AUTOMATION", "ANALYTICS",
            ].map((item) => <span key={item}>{item}</span>)}
            <div><strong>Z</strong><p>ZEROBUGG</p><small>ONE DIGITAL PARTNER</small></div>
          </div>
          <div className="positioning-note">
            <p>One roadmap.<br />{" "}One team.<br />{" "}<strong>One accountable partner.</strong></p>
            <p>Zerobugg puts every discipline on one roadmap, with one team accountable from diagnosis through improvement.</p>
          </div>
        </Reveal>
      </section>

      <section className="services-section section-pad" id="services">
        <Reveal><SectionHeading eyebrow="What we do" title={<>Everything your business needs<br />{" "}<em>to grow digitally.</em></>} copy="Pick a capability or bring us the whole problem. We assemble the right team around the outcome." /></Reveal>
        <Reveal><ServiceExplorer /></Reveal>
        <Link className="section-link" href="/services">Explore all services <ArrowRight size={18} /></Link>
      </section>

      <section className="approach section-pad light-section" id="process">
        <Reveal><SectionHeading eyebrow="Our consulting approach" light title={<>We don&apos;t start with technology.<br />{" "}<em>We start with your business.</em></>} /></Reveal>
        <Reveal><ProcessExperience /></Reveal>
      </section>

      <section className="solutions-section section-pad" id="solutions">
        <Reveal><SectionHeading eyebrow="Built around outcomes" title={<>What are you trying<br />{" "}<em>to make happen?</em></>} copy="Start with the business outcome. We will connect the capabilities required to reach it." /></Reveal>
        <div className="solution-grid">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <Reveal key={solution.title} delay={index * 60} className="solution-card">
                <span className="card-index">0{index + 1}</span><Icon size={28} strokeWidth={1.45} />
                <h3>{solution.title}</h3><p>{solution.copy}</p>
                <div>{solution.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <Link className="solution-card-cta" href={`/contact?context=${encodeURIComponent(solution.title)}`} aria-label={`Explore outcome: ${solution.title}`}>Explore this outcome <MoveUpRight size={17} /></Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="work-section section-pad light-section" id="work">
        <Reveal><SectionHeading eyebrow="Concept studies" light title={<>How we think through<br />{" "}<em>complex digital work.</em></>} copy="Three illustrative studies across commerce, operations and customer experience. They show our approach, not client engagements or measured results." /></Reveal>
        <div className="project-list">
          {projects.map((project) => (
            <Reveal className="project-card" key={project.slug}>
              <Link href={`/work/${project.slug}`}>
                <div className={`project-visual ${project.tone}`}>
                  <div className="project-ui">
                    <div><span /><span /><span /></div>
                    <p>{project.name}</p>
                    <div className="ui-lines"><span /><span /><span /><span /></div>
                    <div className="ui-chart"><i /><i /><i /><i /><i /></div>
                  </div>
                  <span className="sample-badge">ILLUSTRATIVE CONCEPT</span>
                </div>
                <div className="project-meta">
                  <span>{project.number}</span><div><p>{project.category}</p><h3>{project.name}</h3><small>{project.services.join(" / ")}</small></div><MoveUpRight size={26} />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <Link className="section-link dark-link" href="/work">View all work <ArrowRight size={18} /></Link>
      </section>

      <section className="why-section section-pad">
        <Reveal><SectionHeading eyebrow="Why Zerobugg" title={<>A partner built for<br />{" "}<em>the whole journey.</em></>} /></Reveal>
        <div className="why-grid">
          {[
            [Globe2, "Diagnose before building", "We understand the business before recommending technology."],
            [Network, "One integrated team", "Strategy, design, engineering, growth and automation share one roadmap."],
            [Code2, "Reliable engineering", "Performance, accessibility and maintainability are considered from the start."],
            [MessagesSquare, "Clear communication", "Visible priorities, direct feedback and accountable delivery."],
            [BarChart3, "Measurement built in", "Success measures are agreed before delivery, not added after launch."],
            [ShieldCheck, "Keep improving", "Support, learning and optimization continue after the first release."],
          ].map(([Icon, title, copy], index) => {
            const ItemIcon = Icon as typeof Network;
            return <Reveal key={title as string} delay={index * 50} className="why-card"><span>0{index + 1}</span><ItemIcon size={26} strokeWidth={1.4} /><h3>{title as string}</h3><p>{copy as string}</p></Reveal>;
          })}
        </div>
      </section>

      <section className="engagement section-pad light-section">
        <Reveal><SectionHeading eyebrow="Engagement models" light title={<>Work with Zerobugg<br />{" "}<em>your way.</em></>} /></Reveal>
        <div className="engagement-grid">
          {[
            ["01", "Project-based", "For websites, products and defined digital initiatives with a clear scope and destination.", ["Defined scope", "Cross-functional team", "Milestone delivery"]],
            ["02", "Dedicated team", "Specialists working as an integrated extension of your company and internal rhythm.", ["Flexible capacity", "Embedded collaboration", "Specialist access"]],
            ["03", "Digital partner", "One continuous team for technology, website, growth, automation and improvement.", ["One accountable partner", "Continuous roadmap", "Priority access & strategy"]],
          ].map(([number, title, copy, points], index) => (
            <Reveal key={title as string} className={`engagement-card ${index === 2 ? "featured" : ""}`}>
              {index === 2 && <span className="recommended">RECOMMENDED</span>}<small>{number as string}</small><h3>{title as string}</h3><p>{copy as string}</p>
              <ul>{(points as string[]).map((point) => <li key={point}><Check size={14} />{point}</li>)}</ul><Link href={`/contact?context=${encodeURIComponent(`${title as string} engagement`)}`} aria-label={`Discuss the ${title as string} engagement model`}>Discuss this model <ArrowRight size={16} /></Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="insights-section section-pad">
        <Reveal><SectionHeading eyebrow="Insights" title={<>Useful thinking for<br />{" "}<em>digital decision-makers.</em></>} /></Reveal>
        <div className="insight-grid">
          {insights.slice(0, 3).map((article, index) => <Reveal key={article.slug} delay={index * 60} className="insight-card"><Link href={`/insights/${article.slug}`}><div><span>{article.category}</span><small>{article.read}</small></div><h3>{article.title}</h3><p>{article.excerpt}</p><ArrowRight size={20} /></Link></Reveal>)}
        </div>
        <Link className="section-link" href="/insights">Read all insights <ArrowRight size={18} /></Link>
      </section>

      <FinalCta />
    </>
  );
}
