import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppLink as Link } from "../components/AppLink";
import { ArrowRight, Check, Clock3, MoveUpRight } from "../components/Icons";
import { ContactForm } from "../components/ContactForm";
import { FinalCta, PageHero, Reveal, SectionHeading } from "../components/Site";
import { insights, processSteps, projects, services, solutions } from "../data";
import { serializeJsonLd } from "../jsonLd";

type PageProps = { params: Promise<{ slug: string[] }> };

const relatedInsightByService: Record<string, string> = {
  consulting: "digitally-transform-traditional-business",
  "ui-ux": "website-vs-web-application",
  "web-development": "business-website-cost",
  "software-development": "website-vs-web-application",
  "digital-marketing": "seo-vs-paid-advertising",
  seo: "seo-vs-paid-advertising",
  "ai-automation": "ai-automation-repetitive-work",
  analytics: "digitally-transform-traditional-business",
};

const relatedServiceByInsight: Record<string, string> = {
  "business-website-cost": "web-development",
  "website-vs-web-application": "software-development",
  "ai-automation-repetitive-work": "ai-automation",
  "seo-vs-paid-advertising": "seo",
  "digitally-transform-traditional-business": "consulting",
};

export function generateStaticParams() {
  const sections = ["about", "services", "solutions", "work", "process", "insights", "careers", "contact", "privacy", "terms"];
  return [
    ...sections.map((section) => ({ slug: [section] })),
    ...services.map((service) => ({ slug: ["services", service.slug] })),
    ...projects.map((project) => ({ slug: ["work", project.slug] })),
    ...insights.map((article) => ({ slug: ["insights", article.slug] })),
  ];
}

const pageMeta: Record<string, [string, string]> = {
  about: ["About Zerobugg", "See how Zerobugg connects strategy, design, engineering, automation and growth so one accountable team can move a digital business forward."],
  services: ["Digital Consulting & Technology Services", "Explore strategy, product design, web and software development, digital growth, SEO, AI automation and analytics services from one connected team."],
  solutions: ["Business Solutions", "Start with the outcome: launch, modernize, generate demand, build a product, automate operations or grow commerce with one integrated digital partner."],
  work: ["Digital Concept Studies", "Explore transparent Zerobugg concept studies showing how we frame commerce, operations and customer-experience challenges without inventing client results."],
  process: ["How We Work", "See the Zerobugg method for understanding a business, diagnosing the real constraint, prioritizing the roadmap, delivering the work and improving with evidence."],
  insights: ["Business & Technology Insights", "Read practical Zerobugg perspectives on digital strategy, product decisions, websites, software, AI automation, SEO and sustainable business growth."],
  careers: ["Careers at Zerobugg", "Learn how Zerobugg works across strategy, design, engineering and growth, and how to make a thoughtful introduction for future opportunities."],
  contact: ["Tell Us Your Challenge", "Tell Zerobugg what is stuck, changing or ready to grow. Share the business challenge and prepare a private project brief in your own email app."],
  privacy: ["Privacy Policy", "How Zerobugg handles information shared through this website."],
  terms: ["Terms & Conditions", "The terms governing use of the Zerobugg website."],
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [section, detail] = slug;
  if (slug.length > 2) notFound();

  if (section === "services" && detail) {
    const service = services.find((item) => item.slug === detail);
    if (service) return detailMeta(service.title, service.metaDescription, `/services/${service.slug}`);
  }
  if (section === "work" && detail) {
    const project = projects.find((item) => item.slug === detail);
    if (project) return detailMeta(`${project.name} — Concept Study`, project.solution, `/work/${project.slug}`, "website", false);
  }
  if (section === "insights" && detail) {
    const article = insights.find((item) => item.slug === detail);
    if (article) return detailMeta(article.seoTitle, article.metaDescription, `/insights/${article.slug}`, "article");
  }

  const [title, description] = pageMeta[section] ?? ["Page not found", "The requested page could not be found."];
  return {
    title,
    description,
    alternates: { canonical: `/${slug.join("/")}` },
    robots: ["privacy", "terms", "work", "careers"].includes(section) ? { index: false, follow: true } : undefined,
    openGraph: { title, description, url: `/${slug.join("/")}`, siteName: "Zerobugg", images: [{ url: "/og-zerobugg.png", width: 1733, height: 907, alt: "Zerobugg — Strategy. Technology. Growth. One Digital Partner." }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og-zerobugg.png"] },
  };
}

function detailMeta(title: string, description: string, path: string, type: "website" | "article" = "website", index = true): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: index ? undefined : { index: false, follow: true },
    openGraph: { title, description, url: path, type, siteName: "Zerobugg", images: [] },
    twitter: { card: "summary", title, description, images: [] },
  };
}

function DetailBreadcrumb({ current, currentHref, parent, parentHref }: { current: string; currentHref: string; parent: string; parentHref: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://zerobugg.com/" },
      { "@type": "ListItem", position: 2, name: parent, item: `https://zerobugg.com${parentHref}` },
      { "@type": "ListItem", position: 3, name: current, item: `https://zerobugg.com${currentHref}` },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
      <nav className="detail-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span aria-hidden="true">/</span><Link href={parentHref}>{parent}</Link><span aria-hidden="true">/</span><span aria-current="page">{current}</span>
      </nav>
    </>
  );
}

export default async function RoutedPage({ params }: PageProps) {
  const { slug } = await params;
  if (slug.length > 2) notFound();
  const [section, detail] = slug;

  if (section === "about" && !detail) return <AboutPage />;
  if (section === "services" && !detail) return <ServicesPage />;
  if (section === "services" && detail) {
    const service = services.find((item) => item.slug === detail);
    return service ? <ServicePage service={service} /> : notFound();
  }
  if (section === "solutions" && !detail) return <SolutionsPage />;
  if (section === "work" && !detail) return <WorkPage />;
  if (section === "work" && detail) {
    const project = projects.find((item) => item.slug === detail);
    return project ? <ProjectPage project={project} /> : notFound();
  }
  if (section === "process" && !detail) return <ProcessPage />;
  if (section === "insights" && !detail) return <InsightsPage />;
  if (section === "insights" && detail) {
    const article = insights.find((item) => item.slug === detail);
    return article ? <ArticlePage article={article} /> : notFound();
  }
  if (section === "careers" && !detail) return <CareersPage />;
  if (section === "contact" && !detail) return <ContactPage />;
  if (section === "privacy" && !detail) return <LegalPage type="privacy" />;
  if (section === "terms" && !detail) return <LegalPage type="terms" />;
  return notFound();
}

function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Zerobugg" title={<>One team for the<br />{" "}<em>whole digital business.</em></>} copy="We connect business thinking with hands-on execution. Strategy does not die in a deck, and technology never loses sight of the outcome." />
      <section className="manifesto section-pad light-section">
        <Reveal><p className="display-quote">“You bring the business problem. We bring the strategy, technology and team to solve it.”</p></Reveal>
        <div className="manifesto-grid">
          <Reveal><span>WHY WE EXIST</span><h2>Digital progress should feel connected.</h2></Reveal>
          <Reveal><p>Most businesses are forced to split one challenge across consultants, designers, developers, marketers and software vendors. Each sees one piece. The business carries the coordination cost.</p><p>Zerobugg was designed around a different model: one integrated team that can understand the whole, recommend the right sequence and execute across every layer.</p></Reveal>
        </div>
      </section>
      <section className="principles section-pad">
        <SectionHeading eyebrow="Our operating principles" title={<>How we make<br />{" "}<em>good work happen.</em></>} />
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
        <SectionHeading eyebrow="One integrated team" light title={<>Six disciplines.<br />{" "}<em>One direction.</em></>} />
        <div>{["Strategy", "Technology", "Design", "Marketing", "Automation", "Analytics"].map((item, index) => <Reveal key={item}><span>0{index + 1}</span><h3>{item}</h3><p>Connected to the same roadmap, evidence and business outcome.</p></Reveal>)}</div>
      </section>
      <FinalCta title={<>Ready for a partner<br />{" "}<em>who sees the whole?</em></>} />
    </>
  );
}

function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title={<>From business problem<br />{" "}<em>to digital performance.</em></>} copy="Use Zerobugg for one specialist capability or make us accountable for the entire digital journey." />
      <section className="services-catalog section-pad light-section">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Reveal key={service.slug} className="catalog-row">
              <span>{service.number}</span><Icon size={28} strokeWidth={1.35} />
              <div><p>{service.short}</p><h2>{service.title}</h2></div>
              <p>{service.description}</p>
              <Link href={`/services/${service.slug}`} aria-label={`View ${service.title}`}>View service <ArrowRight size={16} /></Link>
            </Reveal>
          );
        })}
      </section>
      <section className="service-callout section-pad"><p className="eyebrow"><span />Not sure where to start?</p><h2>Bring us the problem,<br />{" "}<em>not a prescribed solution.</em></h2><p>We will help diagnose what is holding the business back, what should happen first and what can wait.</p><Link className="button button-light" href={`/contact?need=${encodeURIComponent("Business & Technology Consulting")}`}>Talk to a strategist <ArrowRight size={17} /></Link></section>
      <FinalCta />
    </>
  );
}

function ServicePage({ service }: { service: (typeof services)[number] }) {
  const Icon = service.icon;
  const relatedInsight = insights.find((article) => article.slug === relatedInsightByService[service.slug]);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    serviceType: service.short,
    url: `https://zerobugg.com/services/${service.slug}`,
    areaServed: "Worldwide",
    provider: { "@type": "Organization", name: "Zerobugg", url: "https://zerobugg.com" },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
      <DetailBreadcrumb current={service.title} currentHref={`/services/${service.slug}`} parent="Services" parentHref="/services" />
      <PageHero index={service.number} eyebrow={service.short} title={<>{service.title.split(" ").slice(0, -1).join(" ")}<br />{" "}<em>{service.title.split(" ").slice(-1)}</em></>} copy={service.intro}>
        <Link className="button button-primary" href={`/contact?need=${encodeURIComponent(service.title)}`}>Discuss your project <ArrowRight size={17} /></Link>
      </PageHero>
      <section className="service-detail-intro section-pad light-section">
        <div className="service-icon-large"><Icon size={52} strokeWidth={1.15} /></div>
        <div><p className="eyebrow"><span />Capability</p><h2>{service.description}</h2></div>
        <div><p>{service.fit}</p></div>
      </section>
      <section className="deliverables section-pad">
        <SectionHeading eyebrow="What we can deliver" title={<>A focused capability.<br />{" "}<em>Connected to the whole.</em></>} />
        <div>{service.items.map((item, index) => <Reveal className="deliverable-row" key={item}><span>0{index + 1}</span><h3>{item}</h3><Check size={20} /></Reveal>)}</div>
      </section>
      <section className="service-outcomes section-pad light-section">
        <SectionHeading eyebrow="What good looks like" light title={<>Built to make the<br />{" "}<em>next move easier.</em></>} />
        <div>{service.outcomes.map((item) => <Reveal key={item}><Check /><p>{item}</p></Reveal>)}</div>
      </section>
      <section className="service-method section-pad">
        <p className="eyebrow"><span />How we approach it</p>
        <h2>{service.approach}</h2>
        <Link className="text-link" href={`/contact?need=${encodeURIComponent(service.title)}`}>Talk through this capability <ArrowRight size={16} /></Link>
      </section>
      {relatedInsight && (
        <section className="related-content section-pad light-section" aria-labelledby="related-insight-title">
          <p className="eyebrow"><span />Related insight</p>
          <div>
            <h2 id="related-insight-title">{relatedInsight.title}</h2>
            <p>{relatedInsight.excerpt}</p>
            <Link className="text-link" href={`/insights/${relatedInsight.slug}`}>Read the insight <ArrowRight size={16} /></Link>
          </div>
        </section>
      )}
      <FinalCta title={<>Let&apos;s turn the challenge<br />{" "}<em>into a working system.</em></>} />
    </>
  );
}

function SolutionsPage() {
  return (
    <>
      <PageHero eyebrow="Business solutions" title={<>Start with the outcome.<br />{" "}<em>We&apos;ll build the system.</em></>} copy="The business does not need another list of technologies. It needs a connected answer to a specific growth, product or operational challenge." />
      <section className="solution-detail-grid section-pad light-section">
        {solutions.map((solution, index) => {
          const Icon = solution.icon;
          return <Reveal className="solution-detail-card" key={solution.title}><span>0{index + 1}</span><Icon size={34} strokeWidth={1.3} /><h2>{solution.title}</h2><p>{solution.copy}</p><div>{solution.tags.map((tag) => <small key={tag}>{tag}</small>)}</div><Link href={`/contact?context=${encodeURIComponent(solution.title)}`}>{solution.cta} <ArrowRight size={16} /></Link></Reveal>;
        })}
      </section>
      <section className="solution-map section-pad">
        <SectionHeading eyebrow="The Zerobugg advantage" title={<>Every layer moves<br />{" "}<em>in one direction.</em></>} />
        <div className="solution-map-track">{["Business goal", "Strategy", "Experience", "Technology", "Growth", "Measurement"].map((item, i) => <Reveal key={item}><span>0{i + 1}</span><p>{item}</p>{i < 5 && <ArrowRight />}</Reveal>)}</div>
      </section>
      <FinalCta />
    </>
  );
}

function WorkPage() {
  return (
    <>
      <PageHero eyebrow="Concept studies" title={<>How we think through<br />{" "}<em>complex digital work.</em></>} copy="Three illustrative studies across commerce, operations and customer experience. They show our approach, not client engagements or measured results." />
      <section className="work-catalog section-pad light-section">
        <p className="placeholder-notice">ILLUSTRATIVE CONCEPTS — NOT CLIENT ENGAGEMENTS OR REPORTED RESULTS</p>
        {projects.map((project) => <Reveal className="work-row" key={project.slug}><Link href={`/work/${project.slug}`}><div className={`project-visual ${project.tone}`}><div className="project-ui"><div><span /><span /><span /></div><p>{project.name}</p><div className="ui-lines"><span /><span /><span /><span /></div><div className="ui-chart"><i /><i /><i /><i /><i /></div></div><span className="sample-badge">ILLUSTRATIVE CONCEPT</span></div><div><small>{project.number} / {project.industry}</small><h2>{project.name}</h2><p>{project.category}</p><span>{project.services.join(" · ")}</span></div><MoveUpRight /></Link></Reveal>)}
      </section>
      <FinalCta title={<>Have a real challenge?<br />{" "}<em>Let&apos;s map it together.</em></>} />
    </>
  );
}

function ProjectPage({ project }: { project: (typeof projects)[number] }) {
  return (
    <>
      <DetailBreadcrumb current={project.name} currentHref={`/work/${project.slug}`} parent="Concept studies" parentHref="/work" />
      <section className={`case-hero ${project.tone}`}>
        <p className="eyebrow"><span />Illustrative concept / {project.industry}</p>
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
        <div><span>03 / What we would measure</span><h2>{project.impact}</h2><p>These are proposed success measures, not reported client results.</p></div>
      </section>
      <section className="next-project section-pad"><p>Next concept study</p><Link href={`/work/${projects[(projects.indexOf(project) + 1) % projects.length].slug}`}>{projects[(projects.indexOf(project) + 1) % projects.length].name}<ArrowRight /></Link></section>
      <FinalCta />
    </>
  );
}

function ProcessPage() {
  return (
    <>
      <PageHero eyebrow="How we work" title={<>Clarity first.<br />{" "}<em>Momentum follows.</em></>} copy="A connected method that protects strategic intent from the first conversation through launch, adoption and growth." />
      <section className="process-page section-pad light-section">
        {processSteps.map((step, index) => <Reveal className="process-page-row" key={step.title}><span>{step.number}</span><div><small>STEP {step.number}</small><h2>{step.title}</h2></div><p>{step.copy}</p><div className="step-symbol" aria-hidden="true">{index === processSteps.length - 1 ? "∞" : "↓"}</div></Reveal>)}
      </section>
      <section className="working-rhythm section-pad">
        <SectionHeading eyebrow="The working rhythm" title={<>Visible progress.<br />{" "}<em>No black box.</em></>} />
        <div>{[["Weekly", "Working sessions and decision-making"], ["Continuous", "Prototypes, releases and feedback"], ["Milestones", "Clear acceptance and next-step alignment"]].map(([title, copy]) => <Reveal key={title}><p>{title}</p><h3>{copy}</h3></Reveal>)}</div>
      </section>
      <FinalCta />
    </>
  );
}

function InsightsPage() {
  return (
    <>
      <PageHero eyebrow="Insights" title={<>Think clearly.<br />{" "}<em>Build better.</em></>} copy="Practical frameworks for leaders making decisions about technology, customer experience, operations and growth." />
      <section className="insights-library section-pad light-section">
        <div className="article-list">{insights.map((article, index) => <Reveal className="article-row" key={article.slug}><Link href={`/insights/${article.slug}`}><span>0{index + 1}</span><div><small>{article.category} · {article.read}</small><h2>{article.title}</h2><p>{article.excerpt}</p></div><ArrowRight /></Link></Reveal>)}</div>
      </section>
      <FinalCta title={<>Have a harder<br />{" "}<em>question?</em></>} />
    </>
  );
}

function ArticlePage({ article }: { article: (typeof insights)[number] }) {
  const articleUrl = `https://zerobugg.com/insights/${article.slug}`;
  const relatedService = services.find((service) => service.slug === relatedServiceByInsight[article.slug]);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    url: articleUrl,
    mainEntityOfPage: articleUrl,
    author: { "@type": "Organization", name: "Zerobugg", url: "https://zerobugg.com/about" },
    publisher: { "@type": "Organization", name: "Zerobugg", url: "https://zerobugg.com" },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
      <DetailBreadcrumb current={article.title} currentHref={`/insights/${article.slug}`} parent="Insights" parentHref="/insights" />
      <article className="article-page">
        <header className="article-hero"><p className="eyebrow"><span />{article.category}</p><h1>{article.title}</h1><div><span><Clock3 size={15} />{article.read}</span><span>Zerobugg perspective</span></div></header>
        <div className="article-body">
          <aside><p>In this article</p>{article.sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.title}</a>)}</aside>
          <div>
            <p className="article-lead">{article.lead}</p>
            {article.sections.map((section) => (
              <section key={section.id}>
                <h2 id={section.id}>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
              </section>
            ))}
            <blockquote>{article.takeaway}</blockquote>
            {relatedService && (
              <div className="related-capability">
                <small>Related capability</small>
                <h2>{relatedService.title}</h2>
                <p>{relatedService.description}</p>
                <Link href={`/services/${relatedService.slug}`}>Explore this capability <ArrowRight size={16} /></Link>
              </div>
            )}
            <div className="article-cta"><p>Working through a similar decision?</p><Link href={`/contact?context=${encodeURIComponent(article.title)}`}>Talk it through with Zerobugg <ArrowRight size={16} /></Link></div>
          </div>
        </div>
      </article>
      <FinalCta />
    </>
  );
}

function CareersPage() {
  return (
    <>
      <PageHero eyebrow="Careers" title={<>Do work that connects<br />{" "}<em>the whole business.</em></>} copy="Zerobugg brings strategy, design, engineering, automation and growth into one team. If you think beyond your discipline and care about useful outcomes, we&apos;d like to hear from you." />
      <section className="career-culture section-pad light-section">
        <SectionHeading eyebrow="Life at Zerobugg" light title={<>Curious minds.<br />{" "}<em>Shared ownership.</em></>} />
        <div>{[["Think in systems", "See beyond your discipline and understand how the whole business moves."], ["Make ideas tangible", "Turn ambiguity into prototypes, decisions and progress."], ["Stay close to impact", "Measure the quality of the work by what becomes better for people."], ["Grow together", "Share context, teach generously and make the team stronger."]].map(([title, copy], i) => <Reveal key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}</div>
      </section>
      <section className="openings section-pad">
        <SectionHeading eyebrow="Open roles" title={<>No confirmed openings<br />{" "}<em>right now.</em></>} copy="We are always interested in exceptional people across strategy, design, engineering and growth." />
        <div className="talent-intro"><p>If the way we work resonates, send a concise introduction with the problems you enjoy solving and a link to relevant work.</p><a className="button button-light" href="mailto:hatimaliasgar21@gmail.com?subject=Thoughtful%20introduction%20to%20Zerobugg">Send a thoughtful introduction <ArrowRight size={16} /></a></div>
      </section>
      <FinalCta />
    </>
  );
}

function ContactPage() {
  return (
    <>
      <PageHero variant="compact" eyebrow="Contact" title={<>Tell us what<br />{" "}<em>needs to change.</em></>} copy="Share the business challenge in plain language. You do not need to have the solution figured out." />
      <section className="contact-section section-pad light-section">
        <div className="contact-aside">
          <p className="eyebrow"><span />Start here</p>
          <h2>A useful first conversation.</h2>
          <p>We will ask about the business, the people involved, the current reality and the result you are trying to create.</p>
          <div>
            <span>Contact Person</span>
            <p style={{ margin: 0, fontSize: "18px", fontWeight: 600, color: "#111216" }}>Hatim Aliasgar</p>
            <span>Phone / WhatsApp</span>
            <a href="tel:+919752306452">+91 9752306452</a>
            <a href="https://wa.me/919752306452" target="_blank" rel="noopener noreferrer" style={{ color: "#16a34a", fontSize: "14px", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
              Chat directly on WhatsApp <MoveUpRight size={14} />
            </a>
            <span>Direct Email</span>
            <a href="mailto:hatimaliasgar21@gmail.com">hatimaliasgar21@gmail.com</a>
            <span>How this form works</span>
            <p>It prepares a private email draft in your own mail app or WhatsApp. You review and send it yourself.</p>
          </div>
        </div>
        <ContactForm needs={services.map((service) => service.title)} />
      </section>
    </>
  );
}

function LegalPage({ type }: { type: "privacy" | "terms" }) {
  const privacy = type === "privacy";
  return (
    <>
      <PageHero variant="compact" eyebrow="Legal" title={<>{privacy ? "Privacy policy" : "Terms & conditions"}<br />{" "}<em>in plain language.</em></>} copy={privacy ? "How information shared with Zerobugg is collected, used and protected." : "The basic rules for using this website and its content."} />
      <section className="legal-page section-pad light-section">
        <aside><p>Last updated</p><strong>18 August 2026</strong><span>Website policy template — obtain legal approval before public launch.</span></aside>
        <div>
          {(privacy ? [
            ["Information we collect", "The contact form prepares a message in your own email app. Zerobugg receives the details only after you choose to send that email. Hosting providers may process basic technical logs needed to deliver and secure the website."],
            ["How we use information", "We use submitted information to respond to enquiries, evaluate potential engagements, operate and improve the website, and meet legal or security obligations."],
            ["Sharing and retention", "We do not sell personal information. Information may be processed by service providers that help us operate communications, analytics or hosting, subject to appropriate safeguards. We retain information only as long as reasonably needed."],
            ["Your choices", "You may request access, correction or deletion of personal information by contacting hatimaliasgar21@gmail.com. Applicable rights depend on your location."],
            ["Contact", "Questions about this policy can be sent to hatimaliasgar21@gmail.com."],
          ] : [
            ["Using this website", "You may use this website for lawful informational purposes. Do not attempt to disrupt, reverse engineer or misuse the website or its services."],
            ["Content and intellectual property", "Unless stated otherwise, Zerobugg owns or licenses the website content, visual identity and original materials. You may not republish or commercially exploit them without written permission."],
            ["Information, not advice", "Website content is general information and does not create a professional relationship, binding proposal or guarantee of results."],
            ["Third-party links", "Links to third-party services are provided for convenience. Zerobugg is not responsible for their content, availability or practices."],
            ["Changes and contact", "We may update these terms as the website evolves. Questions can be sent to hatimaliasgar21@gmail.com."],
          ]).map(([title, copy], index) => <section key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{copy}</p></section>)}
        </div>
      </section>
    </>
  );
}
