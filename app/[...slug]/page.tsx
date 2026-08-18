import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Clock3, MoveUpRight } from "../components/Icons";
import { ContactForm, Reveal } from "../components/Interactive";
import { FinalCta, PageHero, PageShell, SectionHeading } from "../components/Site";
import { insights, jobs, processSteps, projects, services, solutions } from "../data";

type PageProps = { params: Promise<{ slug: string[] }> };

const pageMeta: Record<string, [string, string]> = {
  about: ["About Zeroberg", "Meet the integrated strategy, technology, design and growth partner built for the digital era."],
  services: ["Digital Consulting & Technology Services", "Explore Zeroberg services across strategy, design, development, growth, AI, automation and analytics."],
  solutions: ["Business Solutions", "Outcome-focused digital solutions for launching, digitizing, growing and automating your business."],
  work: ["Selected Work", "Explore illustrative Zeroberg case-study concepts across digital products, commerce and transformation."],
  process: ["How We Work", "A strategy-first methodology from business understanding to launch and continuous growth."],
  insights: ["Business & Technology Insights", "Practical thinking on digital strategy, technology, AI, design and growth."],
  careers: ["Careers at Zeroberg", "Join a multidisciplinary team building better digital businesses."],
  contact: ["Start a Project", "Tell Zeroberg about your business, challenge or idea. We will help define the right next move."],
  privacy: ["Privacy Policy", "How Zeroberg handles information shared through this website."],
  terms: ["Terms & Conditions", "The terms governing use of the Zeroberg website."],
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [section, detail] = slug;

  if (section === "services" && detail) {
    const service = services.find((item) => item.slug === detail);
    if (service) return detailMeta(service.title, service.description, `/services/${service.slug}`);
  }
  if (section === "work" && detail) {
    const project = projects.find((item) => item.slug === detail);
    if (project) return detailMeta(`${project.name} — Sample Case Study`, project.solution, `/work/${project.slug}`);
  }
  if (section === "insights" && detail) {
    const article = insights.find((item) => item.slug === detail);
    if (article) return detailMeta(article.title, article.excerpt, `/insights/${article.slug}`, "article");
  }

  const [title, description] = pageMeta[section] ?? ["Page not found", "The requested page could not be found."];
  return {
    title,
    description,
    alternates: { canonical: `/${slug.join("/")}` },
    openGraph: { title, description, url: `/${slug.join("/")}` },
    twitter: { card: "summary_large_image", title, description },
  };
}

function detailMeta(title: string, description: string, path: string, type: "website" | "article" = "website"): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type, images: [] },
    twitter: { card: "summary", title, description, images: [] },
  };
}

export default async function RoutedPage({ params }: PageProps) {
  const { slug } = await params;
  const [section, detail] = slug;

  if (section === "about" && !detail) return <AboutPage />;
  if (section === "services" && !detail) return <ServicesPage />;
  if (section === "services" && detail) {
    const service = services.find((item) => item.slug === detail);
    return service ? <ServicePage service={service} /> : <NotFoundPage />;
  }
  if (section === "solutions" && !detail) return <SolutionsPage />;
  if (section === "work" && !detail) return <WorkPage />;
  if (section === "work" && detail) {
    const project = projects.find((item) => item.slug === detail);
    return project ? <ProjectPage project={project} /> : <NotFoundPage />;
  }
  if (section === "process" && !detail) return <ProcessPage />;
  if (section === "insights" && !detail) return <InsightsPage />;
  if (section === "insights" && detail) {
    const article = insights.find((item) => item.slug === detail);
    return article ? <ArticlePage article={article} /> : <NotFoundPage />;
  }
  if (section === "careers" && !detail) return <CareersPage />;
  if (section === "contact" && !detail) return <ContactPage />;
  if (section === "privacy" && !detail) return <LegalPage type="privacy" />;
  if (section === "terms" && !detail) return <LegalPage type="terms" />;
  return <NotFoundPage />;
}

function AboutPage() {
  return (
    <PageShell>
      <PageHero eyebrow="About Zeroberg" title={<>One team for the<br /><em>whole digital business.</em></>} copy="We connect business thinking with hands-on execution—so strategy does not die in a deck and technology never loses sight of the outcome." />
      <section className="manifesto section-pad light-section">
        <Reveal><p className="display-quote">“You bring the business problem. We bring the strategy, technology and team to solve it.”</p></Reveal>
        <div className="manifesto-grid">
          <Reveal><span>WHY WE EXIST</span><h2>Digital progress should feel connected.</h2></Reveal>
          <Reveal><p>Most businesses are forced to split one challenge across consultants, designers, developers, marketers and software vendors. Each sees one piece. The business carries the coordination cost.</p><p>Zeroberg was designed around a different model: one integrated team that can understand the whole, recommend the right sequence and execute across every layer.</p></Reveal>
        </div>
      </section>
      <section className="principles section-pad">
        <SectionHeading eyebrow="Our operating principles" title={<>How we make<br /><em>good work happen.</em></>} />
        <div className="why-grid">
          {[
            ["01", "Business before output", "We earn the right to recommend by understanding what the company actually needs."],
            ["02", "Clarity over complexity", "Our job is to reduce uncertainty, not hide behind process or technical language."],
            ["03", "Systems, not fragments", "Brand, product, technology, operations and growth are designed to reinforce one another."],
            ["04", "Useful ambition", "We push for memorable work while staying grounded in adoption, performance and value."],
            ["05", "Ownership end to end", "The same strategic intent survives from the first conversation to the final release."],
            ["06", "Partnership after launch", "Real digital advantage is built through learning and continuous improvement."],
          ].map(([n, title, copy]) => <Reveal className="why-card" key={title}><span>{n}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}
        </div>
      </section>
      <section className="integrated-team section-pad light-section">
        <SectionHeading eyebrow="One integrated team" light title={<>Six disciplines.<br /><em>One direction.</em></>} />
        <div>{["Strategy", "Technology", "Design", "Marketing", "Automation", "Analytics"].map((item, index) => <Reveal key={item}><span>0{index + 1}</span><h3>{item}</h3><p>Connected to the same roadmap, evidence and business outcome.</p></Reveal>)}</div>
      </section>
      <FinalCta title={<>Ready for a partner<br /><em>who sees the whole?</em></>} />
    </PageShell>
  );
}

function ServicesPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Services" title={<>From business problem<br /><em>to digital performance.</em></>} copy="Use Zeroberg for one specialist capability or make us accountable for the entire digital journey." />
      <section className="services-catalog section-pad light-section">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Reveal key={service.slug} className="catalog-row">
              <span>{service.number}</span><Icon size={28} strokeWidth={1.35} />
              <div><p>{service.short}</p><h2>{service.title}</h2></div>
              <p>{service.description}</p>
              <Link href={`/services/${service.slug}`} aria-label={`Explore ${service.title}`}><ArrowRight /></Link>
            </Reveal>
          );
        })}
      </section>
      <section className="service-callout section-pad"><p className="eyebrow"><span />Not sure where to start?</p><h2>Bring us the problem,<br /><em>not a prescribed solution.</em></h2><p>We will help diagnose what is holding the business back, what should happen first and what can wait.</p><Link className="button button-light" href="/contact">Talk to a strategist <ArrowRight size={17} /></Link></section>
      <FinalCta />
    </PageShell>
  );
}

function ServicePage({ service }: { service: (typeof services)[number] }) {
  const Icon = service.icon;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: { "@type": "Organization", name: "Zeroberg", url: "https://zeroberg.com" },
  };
  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero index={service.number} eyebrow={service.short} title={<>{service.title.split(" ").slice(0, -1).join(" ")}<br /><em>{service.title.split(" ").slice(-1)}</em></>} copy={service.intro}>
        <Link className="button button-primary" href="/contact">Discuss your project <ArrowRight size={17} /></Link>
      </PageHero>
      <section className="service-detail-intro section-pad light-section">
        <div className="service-icon-large"><Icon size={52} strokeWidth={1.15} /></div>
        <div><p className="eyebrow"><span />Capability</p><h2>{service.description}</h2></div>
        <div><p>We shape every engagement around the operating reality of the business. That means the right amount of research, the right technology choices and a delivery plan your team can actually absorb.</p></div>
      </section>
      <section className="deliverables section-pad">
        <SectionHeading eyebrow="What we can deliver" title={<>A focused capability.<br /><em>Connected to the whole.</em></>} />
        <div>{service.items.map((item, index) => <Reveal className="deliverable-row" key={item}><span>0{index + 1}</span><h3>{item}</h3><Check size={20} /></Reveal>)}</div>
      </section>
      <section className="service-outcomes section-pad light-section">
        <SectionHeading eyebrow="What good looks like" light title={<>Built to make the<br /><em>next move easier.</em></>} />
        <div>{["A clearer strategic direction", "A better customer experience", "A maintainable operating foundation", "Measurement from the beginning"].map((item) => <Reveal key={item}><Check /><p>{item}</p></Reveal>)}</div>
      </section>
      <FinalCta title={<>Let&apos;s turn the challenge<br /><em>into a working system.</em></>} />
    </PageShell>
  );
}

function SolutionsPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Business solutions" title={<>Start with the outcome.<br /><em>We&apos;ll build the system.</em></>} copy="The business does not need another list of technologies. It needs a connected answer to a specific growth, product or operational challenge." />
      <section className="solution-detail-grid section-pad light-section">
        {solutions.map((solution, index) => {
          const Icon = solution.icon;
          return <Reveal className="solution-detail-card" key={solution.title}><span>0{index + 1}</span><Icon size={34} strokeWidth={1.3} /><h2>{solution.title}</h2><p>{solution.copy}</p><div>{solution.tags.map((tag) => <small key={tag}>{tag}</small>)}</div><Link href="/contact">Build this solution <ArrowRight size={16} /></Link></Reveal>;
        })}
      </section>
      <section className="solution-map section-pad">
        <SectionHeading eyebrow="The Zeroberg advantage" title={<>Every layer moves<br /><em>in one direction.</em></>} />
        <div className="solution-map-track">{["Business goal", "Strategy", "Experience", "Technology", "Growth", "Measurement"].map((item, i) => <Reveal key={item}><span>0{i + 1}</span><p>{item}</p>{i < 5 && <ArrowRight />}</Reveal>)}</div>
      </section>
      <FinalCta />
    </PageShell>
  );
}

function WorkPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Our work" title={<>Designed around<br /><em>business impact.</em></>} copy="Until verified Zeroberg client work is supplied, this portfolio shows clearly labeled sample concepts—not fabricated clients or results." />
      <section className="work-catalog section-pad light-section">
        <p className="placeholder-notice">DEVELOPMENT PORTFOLIO — ALL PROJECTS BELOW ARE SAMPLE CONCEPTS</p>
        {projects.map((project) => <Reveal className="work-row" key={project.slug}><Link href={`/work/${project.slug}`}><div className={`project-visual ${project.tone}`}><div className="project-ui"><div><span /><span /><span /></div><p>{project.name}</p><div className="ui-lines"><span /><span /><span /><span /></div><div className="ui-chart"><i /><i /><i /><i /><i /></div></div><span className="sample-badge">SAMPLE</span></div><div><small>{project.number} / {project.industry}</small><h2>{project.name}</h2><p>{project.category}</p><span>{project.services.join(" · ")}</span></div><MoveUpRight /></Link></Reveal>)}
      </section>
      <FinalCta title={<>Let&apos;s create the first<br /><em>real story together.</em></>} />
    </PageShell>
  );
}

function ProjectPage({ project }: { project: (typeof projects)[number] }) {
  return (
    <PageShell>
      <section className={`case-hero ${project.tone}`}>
        <p className="eyebrow"><span />Sample case study / {project.industry}</p>
        <h1>{project.name}</h1><p>{project.category}</p>
        <div className="case-hero-ui"><div className="project-ui"><div><span /><span /><span /></div><p>{project.name}</p><div className="ui-lines"><span /><span /><span /><span /></div><div className="ui-chart"><i /><i /><i /><i /><i /></div></div></div>
        <span className="case-disclaimer">ILLUSTRATIVE CONCEPT — NOT A PUBLISHED CLIENT ENGAGEMENT</span>
      </section>
      <section className="case-overview section-pad light-section">
        <div><p>Industry</p><strong>{project.industry}</strong></div><div><p>Services</p><strong>{project.services.join(" / ")}</strong></div><div><p>Technology</p><strong>{project.technology.join(" / ")}</strong></div>
      </section>
      <section className="case-story section-pad light-section">
        <div><span>01 / The challenge</span><h2>{project.problem}</h2></div>
        <div><span>02 / The response</span><h2>{project.solution}</h2></div>
        <div><span>03 / The impact</span><h2>{project.impact}</h2><p>Metrics will be added only after they are verified and approved for publication.</p></div>
      </section>
      <section className="next-project section-pad"><p>Next sample concept</p><Link href={`/work/${projects[(projects.indexOf(project) + 1) % projects.length].slug}`}>{projects[(projects.indexOf(project) + 1) % projects.length].name}<ArrowRight /></Link></section>
      <FinalCta />
    </PageShell>
  );
}

function ProcessPage() {
  return (
    <PageShell>
      <PageHero eyebrow="How we work" title={<>Clarity first.<br /><em>Momentum follows.</em></>} copy="A connected method that protects strategic intent from the first conversation through launch, adoption and growth." />
      <section className="process-page section-pad light-section">
        {processSteps.map((step, index) => <Reveal className="process-page-row" key={step.title}><span>{step.number}</span><div><small>STEP {step.number}</small><h2>{step.title}</h2></div><p>{step.copy}</p><div className="step-symbol" aria-hidden="true">{index === processSteps.length - 1 ? "∞" : "↓"}</div></Reveal>)}
      </section>
      <section className="working-rhythm section-pad">
        <SectionHeading eyebrow="The working rhythm" title={<>Visible progress.<br /><em>No black box.</em></>} />
        <div>{[["Weekly", "Working sessions and decision-making"], ["Continuous", "Prototypes, releases and feedback"], ["Milestones", "Clear acceptance and next-step alignment"]].map(([title, copy]) => <Reveal key={title}><p>{title}</p><h3>{copy}</h3></Reveal>)}</div>
      </section>
      <FinalCta />
    </PageShell>
  );
}

function InsightsPage() {
  const categories = ["All", "Business", "Technology", "AI", "Marketing", "Design", "Growth"];
  return (
    <PageShell>
      <PageHero eyebrow="Insights" title={<>Think clearer.<br /><em>Build better.</em></>} copy="Useful perspectives for leaders making decisions about digital growth, technology, design and operations." />
      <section className="insights-library section-pad light-section">
        <div className="category-pills">{categories.map((category, i) => <span className={i === 0 ? "active" : ""} key={category}>{category}</span>)}</div>
        <div className="article-list">{insights.map((article, index) => <Reveal className="article-row" key={article.slug}><Link href={`/insights/${article.slug}`}><span>0{index + 1}</span><div><small>{article.category} · {article.read}</small><h2>{article.title}</h2><p>{article.excerpt}</p></div><ArrowRight /></Link></Reveal>)}</div>
      </section>
      <FinalCta title={<>Have a harder<br /><em>question?</em></>} />
    </PageShell>
  );
}

function ArticlePage({ article }: { article: (typeof insights)[number] }) {
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.excerpt, author: { "@type": "Organization", name: "Zeroberg" }, publisher: { "@type": "Organization", name: "Zeroberg" } };
  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <article className="article-page">
        <header className="article-hero"><p className="eyebrow"><span />{article.category}</p><h1>{article.title}</h1><div><span><Clock3 size={15} />{article.read}</span><span>Zeroberg Editorial</span></div></header>
        <div className="article-body">
          <aside><p>In this article</p><a href="#context">The real question</a><a href="#framework">A better framework</a><a href="#next">What to do next</a></aside>
          <div>
            <p className="article-lead">{article.excerpt}</p>
            <h2 id="context">The real question behind the question</h2>
            <p>Digital decisions often look technical on the surface, but the useful starting point is operational: what should become easier for the customer, the team or the business? The right answer depends on the objective, the current constraints and how the result will be maintained after launch.</p>
            <p>A good solution makes the trade-offs visible. It separates what is essential now from what can be staged later, and it connects every output to a clear business job.</p>
            <blockquote>Start with the change you need in the business. Then decide what the digital system must do to make that change possible.</blockquote>
            <h2 id="framework">A better decision framework</h2>
            <ol><li><strong>Define the outcome.</strong> State the customer or business behavior that needs to change.</li><li><strong>Map the friction.</strong> Find where time, trust or information is being lost today.</li><li><strong>Choose the smallest complete system.</strong> Avoid isolated tactics that create another handoff.</li><li><strong>Plan measurement early.</strong> Decide what evidence will show whether the move is working.</li></ol>
            <h2 id="next">What to do next</h2>
            <p>Bring the problem to the table before the tool. A short discovery process should help the team agree on priorities, risks and a practical sequence before significant investment begins.</p>
            <div className="article-cta"><p>Working through a similar decision?</p><Link href="/contact">Talk it through with Zeroberg <ArrowRight size={16} /></Link></div>
          </div>
        </div>
      </article>
      <FinalCta />
    </PageShell>
  );
}

function CareersPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Careers" title={<>Build the future<br /><em>with us.</em></>} copy="We are assembling a multidisciplinary team that can think across business, experience, technology and growth." />
      <section className="career-culture section-pad light-section">
        <SectionHeading eyebrow="Life at Zeroberg" light title={<>Curious minds.<br /><em>Shared ownership.</em></>} />
        <div>{[["Think in systems", "See beyond your discipline and understand how the whole business moves."], ["Make ideas tangible", "Turn ambiguity into prototypes, decisions and progress."], ["Stay close to impact", "Measure the quality of the work by what becomes better for people."], ["Grow together", "Share context, teach generously and make the team stronger."]].map(([title, copy], i) => <Reveal key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}</div>
      </section>
      <section className="openings section-pad">
        <SectionHeading eyebrow="Open roles" title={<>Find your place<br /><em>in the system.</em></>} copy="Roles below are representative openings for the website build. Confirm availability before publishing." />
        <p className="placeholder-notice dark-notice">STAGING LIST — ROLE AVAILABILITY MUST BE CONFIRMED</p>
        <div>{jobs.map((job) => <Reveal className="job-row" key={job.title}><div><small>{job.department}</small><h2>{job.title}</h2></div><p>{job.location}</p><p>{job.type}</p><a href={`mailto:careers@zeroberg.com?subject=${encodeURIComponent(`Application: ${job.title}`)}`}>Apply <ArrowRight size={16} /></a></Reveal>)}</div>
      </section>
      <FinalCta title={<>Don&apos;t see your role?<br /><em>Start a conversation.</em></>} />
    </PageShell>
  );
}

function ContactPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Contact" title={<>Let&apos;s talk about<br /><em>your business.</em></>} copy="Tell us what is changing, what is stuck or what you want to build. You do not need to have the solution figured out." />
      <section className="contact-section section-pad light-section">
        <div className="contact-aside"><p className="eyebrow"><span />Start here</p><h2>A useful first conversation.</h2><p>We will ask about the business, the people involved, the current reality and the result you are trying to create.</p><div><span>Email</span><a href="mailto:hello@zeroberg.com">hello@zeroberg.com</a><span>Typical reply</span><p>Within 1–2 business days</p></div></div>
        <ContactForm />
      </section>
    </PageShell>
  );
}

function LegalPage({ type }: { type: "privacy" | "terms" }) {
  const privacy = type === "privacy";
  return (
    <PageShell>
      <PageHero eyebrow="Legal" title={<>{privacy ? "Privacy policy" : "Terms & conditions"}<br /><em>in plain language.</em></>} copy={privacy ? "How information shared with Zeroberg is collected, used and protected." : "The basic rules for using this website and its content."} />
      <section className="legal-page section-pad light-section">
        <aside><p>Last updated</p><strong>18 August 2026</strong><span>Draft for legal review before commercial publication.</span></aside>
        <div>
          {(privacy ? [
            ["Information we collect", "We may collect information you submit through forms, including your name, company, contact details, project interests and message. Basic technical information may also be processed for security and website analytics."],
            ["How we use information", "We use submitted information to respond to enquiries, evaluate potential engagements, operate and improve the website, and meet legal or security obligations."],
            ["Sharing and retention", "We do not sell personal information. Information may be processed by service providers that help us operate communications, analytics or hosting, subject to appropriate safeguards. We retain information only as long as reasonably needed."],
            ["Your choices", "You may request access, correction or deletion of personal information by contacting privacy@zeroberg.com. Applicable rights depend on your location."],
            ["Contact", "Questions about this policy can be sent to privacy@zeroberg.com."],
          ] : [
            ["Using this website", "You may use this website for lawful informational purposes. Do not attempt to disrupt, reverse engineer or misuse the website or its services."],
            ["Content and intellectual property", "Unless stated otherwise, Zeroberg owns or licenses the website content, visual identity and original materials. You may not republish or commercially exploit them without written permission."],
            ["Information, not advice", "Website content is general information and does not create a professional relationship, binding proposal or guarantee of results."],
            ["Third-party links", "Links to third-party services are provided for convenience. Zeroberg is not responsible for their content, availability or practices."],
            ["Changes and contact", "We may update these terms as the website evolves. Questions can be sent to legal@zeroberg.com."],
          ]).map(([title, copy], index) => <section key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{copy}</p></section>)}
        </div>
      </section>
    </PageShell>
  );
}

function NotFoundPage() {
  return <PageShell><section className="not-found"><span>404</span><h1>Wrong turn.<br /><em>Better route.</em></h1><p>The page you are looking for does not exist or has moved.</p><Link className="button button-light" href="/">Return home <ArrowRight size={16} /></Link></section></PageShell>;
}
