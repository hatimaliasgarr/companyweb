import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Check,
  CircleDot,
  Code2,
  Globe2,
  MessagesSquare,
  MoveUpRight,
  Network,
  Rocket,
  ShieldCheck,
  Sparkles,
} from "./components/Icons";
import { capabilityItems, industries, insights, projects, solutions, technology } from "./data";
import { ProcessExperience, Reveal, ServiceExplorer } from "./components/Interactive";
import { FinalCta, PageShell, SectionHeading } from "./components/Site";

export default function Home() {
  return (
    <PageShell>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow hero-kicker"><span /> Strategy × Technology × Growth</p>
          <h1 id="hero-title">
            We build digital<br />
            businesses. <em>Not just</em><br />
            websites.
          </h1>
          <div className="hero-lower">
            <p>Zeroberg combines strategy, design, technology and growth into one accountable digital partner.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/contact">Start a project <ArrowRight size={17} /></Link>
              <Link className="button button-ghost" href="#work">Explore our work <ArrowDown size={16} /></Link>
            </div>
          </div>
        </div>

        <div className="ecosystem" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="core"><span>Z</span><small>ONE PARTNER</small></div>
          <span className="node node-strategy">Strategy</span><span className="node node-design">Design</span>
          <span className="node node-tech">Technology</span><span className="node node-growth">Growth</span><span className="node node-data">Data</span>
        </div>
        <div className="scroll-cue" aria-hidden="true"><span /> SCROLL TO DISCOVER</div>
      </section>

      <section className="tech-strip" aria-label="Technology we build with">
        <div className="tech-label"><CircleDot size={14} /> Technology we build with</div>
        <div className="marquee"><div>{[...technology, ...technology].map((item, i) => <span key={`${item}-${i}`}>{item}</span>)}</div></div>
      </section>

      <section className="positioning section-pad light-section">
        <Reveal>
          <SectionHeading eyebrow="A connected capability" light title={<>One partner.<br /><em>Every digital need.</em></>} />
        </Reveal>
        <Reveal className="positioning-content">
          <p className="big-copy">You shouldn&apos;t need five agencies to move one business forward.</p>
          <div className="merge-visual" aria-label="Strategy, design, technology, marketing, automation and analytics integrated by Zeroberg">
            {[
              "STRATEGY", "DESIGN", "TECHNOLOGY", "MARKETING", "AUTOMATION", "ANALYTICS",
            ].map((item) => <span key={item}>{item}</span>)}
            <div><strong>Z</strong><p>ZEROBERG</p><small>ONE DIGITAL PARTNER</small></div>
          </div>
          <div className="positioning-note">
            <p>One strategy.<br />One team.<br /><strong>One digital partner.</strong></p>
            <p>We see the whole system: how your brand, customer experience, technology, operations and growth channels affect one another.</p>
          </div>
        </Reveal>
      </section>

      <section className="services-section section-pad" id="services">
        <Reveal><SectionHeading eyebrow="What we do" title={<>Everything your business needs<br /><em>to grow digitally.</em></>} copy="Pick a capability or bring us the whole problem. We assemble the right team around the outcome." /></Reveal>
        <Reveal><ServiceExplorer /></Reveal>
        <Link className="section-link" href="/services">Explore all services <ArrowRight size={18} /></Link>
      </section>

      <section className="approach section-pad light-section" id="process">
        <Reveal><SectionHeading eyebrow="Our consulting approach" light title={<>We don&apos;t start with technology.<br /><em>We start with your business.</em></>} /></Reveal>
        <Reveal><ProcessExperience /></Reveal>
      </section>

      <section className="solutions-section section-pad" id="solutions">
        <Reveal><SectionHeading eyebrow="Built around outcomes" title={<>What are you trying<br /><em>to make happen?</em></>} copy="Start with the business outcome. We will connect the capabilities required to reach it." /></Reveal>
        <div className="solution-grid">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <Reveal key={solution.title} delay={index * 60} className="solution-card">
                <span className="card-index">0{index + 1}</span><Icon size={28} strokeWidth={1.45} />
                <h3>{solution.title}</h3><p>{solution.copy}</p>
                <div>{solution.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <Link href="/solutions" aria-label={`Learn about ${solution.title}`}><MoveUpRight size={19} /></Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="work-section section-pad light-section" id="work">
        <Reveal><SectionHeading eyebrow="Selected work" light title={<>Experiences designed<br /><em>to create impact.</em></>} copy="Illustrative case-study concepts showing how Zeroberg approaches different business challenges. No client results are claimed." /></Reveal>
        <div className="project-list">
          {projects.map((project) => (
            <Reveal key={project.slug} className="project-card">
              <Link href={`/work/${project.slug}`}>
                <div className={`project-visual ${project.tone}`}>
                  <div className="project-ui">
                    <div><span /><span /><span /></div>
                    <p>{project.name}</p>
                    <div className="ui-lines"><span /><span /><span /><span /></div>
                    <div className="ui-chart"><i /><i /><i /><i /><i /></div>
                  </div>
                  <span className="sample-badge">SAMPLE CONCEPT</span>
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
        <Reveal><SectionHeading eyebrow="Why Zeroberg" title={<>A partner built for<br /><em>the whole journey.</em></>} /></Reveal>
        <div className="why-grid">
          {[
            [Globe2, "Strategy first", "We understand the business before recommending technology."],
            [Network, "End-to-end execution", "Strategy, design, development, growth and automation under one roof."],
            [Rocket, "Built to scale", "Decisions made for the next stage of the business, not only today."],
            [MessagesSquare, "Clear communication", "Visible priorities, direct feedback and accountable delivery."],
            [Code2, "Modern technology", "Reliable tools selected around your needs, team and constraints."],
            [ShieldCheck, "Long-term partnership", "Support, learning and optimization continue after launch."],
          ].map(([Icon, title, copy], index) => {
            const ItemIcon = Icon as typeof Network;
            return <Reveal key={title as string} delay={index * 50} className="why-card"><span>0{index + 1}</span><ItemIcon size={26} strokeWidth={1.4} /><h3>{title as string}</h3><p>{copy as string}</p></Reveal>;
          })}
        </div>
      </section>

      <section className="engineering-section section-pad">
        <div className="engineering-bg" aria-hidden="true"><span /><span /><span /><span /><span /></div>
        <Reveal><SectionHeading eyebrow="Engineering standards" title={<>Beautiful outside.<br /><em>Powerful inside.</em></>} copy="The experience gets attention. The engineering earns trust." /></Reveal>
        <div className="capability-grid">
          {capabilityItems.map((item, index) => {
            const Icon = item.icon;
            return <Reveal key={item.title} delay={index * 60} className="capability-card"><Icon size={25} strokeWidth={1.4} /><h3>{item.title}</h3><p>{item.copy}</p><span><Check size={13} /> BUILT IN</span></Reveal>;
          })}
        </div>
        <div className="engineering-ticker"><span>Responsive</span><span>Secure</span><span>Scalable</span><span>Accessible</span><span>Analytics ready</span></div>
      </section>

      <section className="engagement section-pad light-section">
        <Reveal><SectionHeading eyebrow="Engagement models" light title={<>Work with Zeroberg<br /><em>your way.</em></>} /></Reveal>
        <div className="engagement-grid">
          {[
            ["01", "Project based", "For websites, products and defined digital initiatives with a clear scope and destination.", ["Defined scope", "Cross-functional team", "Milestone delivery"]],
            ["02", "Dedicated team", "Specialists working as an integrated extension of your company and internal rhythm.", ["Flexible capacity", "Embedded collaboration", "Specialist access"]],
            ["03", "Digital partner", "One continuous team for technology, website, growth, automation and improvement.", ["One accountable partner", "Continuous roadmap", "Recommended"]],
          ].map(([number, title, copy, points], index) => (
            <Reveal key={title as string} className={`engagement-card ${index === 2 ? "featured" : ""}`}>
              {index === 2 && <span className="recommended">RECOMMENDED</span>}<small>{number as string}</small><h3>{title as string}</h3><p>{copy as string}</p>
              <ul>{(points as string[]).map((point) => <li key={point}><Check size={14} />{point}</li>)}</ul><Link href="/contact">Discuss this model <ArrowRight size={16} /></Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="industry-section section-pad">
        <Reveal><SectionHeading eyebrow="Industries" title={<>Industry-aware.<br /><em>Problem obsessed.</em></>} copy="Different sectors, one starting point: understand the business on its own terms." /></Reveal>
        <div className="industry-grid">{industries.map((industry, index) => <Reveal key={industry} delay={(index % 4) * 45} className="industry-item"><span>{String(index + 1).padStart(2, "0")}</span>{industry}<ArrowRight size={16} /></Reveal>)}</div>
      </section>

      <section className="outcomes section-pad light-section">
        <Reveal><SectionHeading eyebrow="Built around outcomes" light title={<>Progress you can<br /><em>feel in the business.</em></>} /></Reveal>
        <div className="outcome-track">
          {["Faster digital execution", "Scalable technology", "Data-driven decisions", "Better customer experiences", "Automated operations"].map((item, index) => <Reveal key={item} className="outcome-item"><span>0{index + 1}</span><h3>{item}</h3><ArrowRight size={24} /></Reveal>)}
        </div>
        <p className="outcome-note">We publish verified performance numbers only when real Zeroberg client data is available.</p>
      </section>

      <section className="testimonials section-pad">
        <Reveal><SectionHeading eyebrow="Client perspective" title={<>What our clients<br /><em>will say.</em></>} copy="This section is reserved for verified client stories. The samples below are clearly marked for staging." /></Reveal>
        <div className="testimonial-track">
          {[
            ["Placeholder testimonial", "Sample Client", "Company / Role"],
            ["Verified client feedback will appear here after approval.", "Sample Client", "Company / Role"],
            ["No invented endorsement is being presented as genuine.", "Sample Client", "Company / Role"],
          ].map(([quote, name, role]) => <article key={quote}><span>PLACEHOLDER — NOT A REAL ENDORSEMENT</span><blockquote>“{quote}”</blockquote><div><i>{name.charAt(0)}</i><p><strong>{name}</strong><small>{role}</small></p></div></article>)}
        </div>
      </section>

      <section className="about-preview section-pad light-section">
        <Reveal><p className="eyebrow"><span />About Zeroberg</p></Reveal>
        <div className="about-preview-grid">
          <Reveal><h2>Building businesses<br />for the <em>digital era.</em></h2></Reveal>
          <Reveal>
            <p>Businesses should not have to coordinate five agencies to create one connected digital presence.</p>
            <p>Zeroberg brings strategy, technology, design, marketing, automation and analytics into one integrated team.</p>
            <Link className="text-link dark-link" href="/about">Discover Zeroberg <ArrowRight size={16} /></Link>
          </Reveal>
        </div>
      </section>

      <section className="insights-section section-pad">
        <Reveal><SectionHeading eyebrow="Insights" title={<>Useful thinking for<br /><em>digital decision-makers.</em></>} /></Reveal>
        <div className="insight-grid">
          {insights.slice(0, 3).map((article, index) => <Reveal key={article.slug} delay={index * 60} className="insight-card"><Link href={`/insights/${article.slug}`}><div><span>{article.category}</span><small>{article.read}</small></div><h3>{article.title}</h3><p>{article.excerpt}</p><ArrowRight size={20} /></Link></Reveal>)}
        </div>
        <Link className="section-link" href="/insights">Read all insights <ArrowRight size={18} /></Link>
      </section>

      <section className="careers-preview section-pad">
        <div aria-hidden="true" className="careers-glow"><Sparkles /></div>
        <Reveal><p className="eyebrow"><span />Careers</p><h2>Build the future<br /><em>with us.</em></h2><p>We&apos;re building a team of thinkers, designers, developers and growth specialists.</p><Link className="button button-light" href="/careers">Explore careers <ArrowRight size={17} /></Link></Reveal>
      </section>

      <FinalCta />
    </PageShell>
  );
}
