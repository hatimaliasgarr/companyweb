import {
  BarChart3,
  Bot,
  Boxes,
  Braces,
  Compass,
  Gauge,
  Layers3,
  LineChart,
  Megaphone,
  Palette,
  Search,
  ShoppingBag,
  Sparkles,
  Workflow,
  type IconComponent,
} from "./components/Icons";

export type Service = {
  number: string;
  slug: string;
  short: string;
  title: string;
  description: string;
  metaDescription: string;
  intro: string;
  fit: string;
  approach: string;
  items: string[];
  outcomes: string[];
  icon: IconComponent;
};

export const services: Service[] = [
  {
    number: "01",
    slug: "consulting",
    short: "Strategy & Consulting",
    title: "Business & Technology Consulting",
    description: "Clarity before code. We connect business goals to a practical digital roadmap.",
    metaDescription: "Clarify which digital investments should happen first with business analysis, technology consulting, product strategy and an executable transformation roadmap.",
    intro: "We study how your business works, where growth is getting stuck and which digital moves will create the most value. Then we turn the answer into an executable plan.",
    fit: "Useful when priorities compete, the current stack is slowing growth or your team needs an independent view before committing to a major investment.",
    approach: "We map the business model, customer journey, operating workflows and constraints, then rank initiatives by value, risk and dependency.",
    items: ["Business analysis", "Digital strategy", "Technology consulting", "Product strategy", "Digital transformation"],
    outcomes: ["A shared view of the real problem", "Priorities tied to business value", "A practical delivery roadmap", "Clear measures for success"],
    icon: Compass,
  },
  {
    number: "02",
    slug: "ui-ux",
    short: "Design",
    title: "UI/UX & Product Design",
    description: "Make complex products easier to understand, use and trust.",
    metaDescription: "Turn complex digital products into clear, accessible experiences with UX research, information architecture, prototyping, usability testing and design systems.",
    intro: "We turn customer needs and business requirements into clear journeys, intuitive interfaces and design systems your team can build and scale.",
    fit: "Useful when people struggle to complete key tasks, a product has grown inconsistent or a new idea needs evidence before engineering begins.",
    approach: "We study the user job, map the journey, test the risky assumptions early and turn validated decisions into a reusable interface system.",
    items: ["UX research", "User flows & information architecture", "Wireframes & interactive prototypes", "Interface design & design systems", "Usability testing"],
    outcomes: ["Faster paths through key tasks", "Fewer usability barriers", "A consistent, reusable design system", "Clear specifications for development"],
    icon: Palette,
  },
  {
    number: "03",
    slug: "web-development",
    short: "Web Development",
    title: "Website & E-commerce Development",
    description: "Fast, precise digital platforms engineered to turn attention into action.",
    metaDescription: "Build a fast, accessible business website or e-commerce platform around the customer journey, with manageable content, reliable engineering and useful analytics.",
    intro: "We build high-performing websites and storefronts around your customer journey, not around a theme. Every build is responsive, measurable and ready to evolve.",
    fit: "Useful when an outdated site weakens trust, content is hard to manage or the buying journey is fragmented across pages and systems.",
    approach: "We align the offer and conversion path first, then design the content model, experience, integrations and launch plan as one working platform.",
    items: ["Business websites", "E-commerce", "Landing platforms", "CMS architecture", "Performance engineering"],
    outcomes: ["A faster path from attention to action", "Content your team can manage", "A responsive, accessible experience", "Measurement from launch"],
    icon: Braces,
  },
  {
    number: "04",
    slug: "software-development",
    short: "Software",
    title: "Custom Software Development",
    description: "Purpose-built applications that fit your operations instead of forcing your operations to fit software.",
    metaDescription: "Turn a product idea or operational bottleneck into maintainable custom software, from workflow design and prototyping to integrations, deployment and iteration.",
    intro: "We translate processes, product ideas and operational bottlenecks into dependable web applications, SaaS platforms and internal tools.",
    fit: "Useful when off-the-shelf tools cannot support a critical workflow, teams rely on fragile workarounds or a new digital product needs to be validated and built.",
    approach: "We model the workflow and edge cases, shape the smallest complete release, then engineer and release it in testable increments.",
    items: ["Web applications", "SaaS platforms", "Internal tools", "API integrations", "Cloud deployment"],
    outcomes: ["Software shaped around the workflow", "Less manual coordination", "A maintainable technical foundation", "A clear path to future releases"],
    icon: Boxes,
  },
  {
    number: "05",
    slug: "digital-marketing",
    short: "Digital Growth",
    title: "Digital & Performance Marketing",
    description: "A connected growth system across content, campaigns, conversion and measurement.",
    metaDescription: "Connect growth strategy, content, paid campaigns, conversion and measurement so every channel has a clear job and every decision has evidence behind it.",
    intro: "We unite creative, media and analytics so every campaign has a purpose, every channel has a role and every decision has evidence behind it.",
    fit: "Useful when activity is spread across channels but the team cannot see what creates qualified demand, conversion or repeatable learning.",
    approach: "We define the commercial goal, audience and offer, assign each channel a job, then improve the system through structured tests and shared measurement.",
    items: ["Growth strategy", "Performance marketing", "Social media", "Content strategy", "Conversion optimization"],
    outcomes: ["Clear channel roles and priorities", "Campaigns connected to conversion", "Useful reporting, not vanity metrics", "A repeatable learning rhythm"],
    icon: Megaphone,
  },
  {
    number: "06",
    slug: "seo",
    short: "SEO",
    title: "Search Engine Optimization",
    description: "Build durable visibility by making your site useful to people and legible to search engines.",
    metaDescription: "Improve durable search visibility through technical SEO, demand-led content planning, on-page optimization and reporting connected to meaningful business actions.",
    intro: "Our SEO work connects technical health, search intent and high-quality content into a long-term acquisition engine.",
    fit: "Useful when relevant buyers cannot find the business, organic traffic does not convert or technical and content priorities are competing without a roadmap.",
    approach: "We diagnose crawl and experience barriers, map real search demand to the offer, then sequence technical, on-page and content work by likely business value.",
    items: ["SEO strategy", "Technical SEO", "Content planning", "On-page optimization", "Reporting"],
    outcomes: ["A technically legible website", "Content aligned to real demand", "Stronger paths from search to action", "A prioritized improvement plan"],
    icon: Search,
  },
  {
    number: "07",
    slug: "ai-automation",
    short: "AI & Automation",
    title: "AI & Business Automation",
    description: "Remove repetitive work and connect the systems your team depends on.",
    metaDescription: "Find and automate well-understood business workflows with practical AI integrations, connected systems, clear human review and measurable operating outcomes.",
    intro: "We find the parts of your operation where AI and automation can save time, improve consistency or unlock a better customer experience, without adding complexity for its own sake.",
    fit: "Useful when people repeatedly copy, route, summarize or reconcile information and the workflow has a clear owner, output and exception path.",
    approach: "We document the current work, identify safe automation boundaries, pilot with real exceptions and keep human judgment visible where the risk requires it.",
    items: ["AI integrations", "AI agents", "Workflow automation", "CRM automation", "Process automation"],
    outcomes: ["Less repetitive work", "Fewer avoidable handoff errors", "Human review where it matters", "A workflow your team can operate"],
    icon: Bot,
  },
  {
    number: "08",
    slug: "analytics",
    short: "Data & Analytics",
    title: "Analytics & Business Intelligence",
    description: "Turn scattered activity into a clear view of what is working and what to do next.",
    metaDescription: "Create trusted tracking, dashboards and business intelligence that align teams around clear metric definitions, useful reporting and faster evidence-led decisions.",
    intro: "We create the tracking, dashboards and reporting layer leaders need to make faster, better-informed decisions.",
    fit: "Useful when reports disagree, teams spend hours rebuilding spreadsheets or leaders have activity data without a reliable view of business performance.",
    approach: "We define the decisions and metrics first, audit the source data, design the measurement model and build reporting around the questions people actually need to answer.",
    items: ["Analytics strategy", "Tracking setup", "Dashboards", "Business intelligence", "Performance reporting"],
    outcomes: ["Trusted definitions for key measures", "A clearer view of performance", "Less manual reporting", "Decisions linked to evidence"],
    icon: BarChart3,
  },
];

export const serviceAliases: Record<string, string> = {
  "web-development": "web-development",
  "software-development": "software-development",
  "ui-ux": "ui-ux",
  "digital-marketing": "digital-marketing",
  seo: "seo",
  "ai-automation": "ai-automation",
  analytics: "analytics",
};

export const solutions = [
  { icon: Sparkles, title: "Launch my business", copy: "Positioning, brand, website, launch campaign and measurement, planned and delivered together.", tags: ["Brand", "Web", "Launch"], cta: "Plan my launch" },
  { icon: Workflow, title: "Digitize my business", copy: "Modernize the customer journey, connect core workflows and give leaders a reliable view of performance.", tags: ["CRM", "Automation", "Data"], cta: "Map my roadmap" },
  { icon: LineChart, title: "Generate more leads", copy: "Turn search, campaigns, landing pages and follow-up into one measurable lead pipeline.", tags: ["SEO", "Media", "CRO"], cta: "Improve lead generation" },
  { icon: Layers3, title: "Build my product", copy: "Validate the product, design the experience and engineer a dependable first release.", tags: ["UX", "SaaS", "Cloud"], cta: "Scope my product" },
  { icon: Bot, title: "Automate operations", copy: "Reduce repetitive work with practical AI, connected workflows and clear operational reporting.", tags: ["AI", "Ops", "BI"], cta: "Find automation opportunities" },
  { icon: ShoppingBag, title: "Build my online store", copy: "Connect products, payments, inventory, fulfilment and conversion in one commerce experience.", tags: ["Commerce", "Growth", "Data"], cta: "Plan my commerce build" },
];

export const processSteps = [
  { number: "01", title: "Understand", copy: "We learn how the business makes money, how customers buy and where work slows down." },
  { number: "02", title: "Diagnose", copy: "We find the friction, risks and opportunities that matter most." },
  { number: "03", title: "Prioritize", copy: "We agree on the highest-value moves, their sequence and how success will be measured." },
  { number: "04", title: "Build", copy: "Designers, engineers and growth specialists turn the roadmap into a working solution." },
  { number: "05", title: "Launch", copy: "We test, deploy and prepare your team to use and own what we build." },
  { number: "06", title: "Improve", copy: "We use performance data to refine the experience, operations and acquisition." },
];

export const projects = [
  {
    slug: "multi-market-commerce",
    number: "01",
    name: "Multi-market Commerce",
    category: "E-commerce transformation",
    industry: "Retail",
    problem: "A sample multi-market retailer needed a clearer customer journey and a connected operating layer.",
    solution: "A conversion-led storefront concept with a modular content system and analytics foundation.",
    services: ["Strategy", "UI/UX", "Development", "Analytics"],
    technology: ["Next.js", "Commerce API", "PostgreSQL"],
    impact: "Product discovery, checkout completion and merchandising speed.",
    tone: "violet",
  },
  {
    slug: "delivery-operations",
    number: "02",
    name: "Delivery Operations",
    category: "Operations platform",
    industry: "Professional Services",
    problem: "A sample distributed team was coordinating delivery across disconnected tools and manual reports.",
    solution: "A unified workflow, client portal and management dashboard concept built around operational clarity.",
    services: ["Product strategy", "Software", "Automation", "BI"],
    technology: ["React", "Node.js", "Cloud"],
    impact: "Delivery cycle time, handoff delays and reporting effort.",
    tone: "cyan",
  },
  {
    slug: "healthcare-service-journey",
    number: "03",
    name: "Healthcare Service Journey",
    category: "Digital service experience",
    industry: "Healthcare",
    problem: "A sample healthcare brand needed to explain a complex service without overwhelming prospective patients.",
    solution: "A calm, accessible digital experience concept with guided content and a clearer conversion path.",
    services: ["Research", "Brand", "Web", "SEO"],
    technology: ["Next.js", "Headless CMS", "Analytics"],
    impact: "Service understanding, qualified enquiries and accessibility barriers.",
    tone: "lime",
  },
];

export type Insight = {
  slug: string;
  category: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  read: string;
  lead: string;
  sections: Array<{ id: string; title: string; paragraphs: string[]; points?: string[] }>;
  takeaway: string;
};

export const insights: Insight[] = [
  {
    slug: "business-website-cost",
    category: "Business",
    title: "How much should a business website cost?",
    seoTitle: "How Much Should a Business Website Cost?",
    metaDescription: "Understand what drives business website cost, how to compare proposals fairly and how to fund the smallest complete version without creating expensive rework.",
    excerpt: "A practical way to think about scope, complexity, value and the hidden cost of underbuilding.",
    read: "7 min read",
    lead: "The useful question is not only what a website costs. It is what the website must do, how complex the operation behind it is and what underbuilding will cost later.",
    sections: [
      {
        id: "drivers",
        title: "What actually drives the cost",
        paragraphs: [
          "Page count is a poor pricing shortcut. A concise site with several audiences, custom content workflows, integrations and strict accessibility requirements can be more demanding than a larger brochure site. The work is shaped by decisions, dependencies and risk—not simply by the number of screens.",
          "The main cost drivers are usually discovery, content, experience design, engineering complexity, integrations, migration, quality assurance and post-launch ownership. If one of those areas is left vague, the uncertainty does not disappear; it tends to return as delay or rework.",
        ],
        points: ["What action must each audience take?", "Who will create and maintain the content?", "Which systems must exchange data?", "What would failure cost after launch?"],
      },
      {
        id: "scope",
        title: "Compare scopes, not headline prices",
        paragraphs: [
          "Two proposals can use the same label while describing very different products. One may cover a template, supplied copy and a basic contact form. Another may include research, positioning, original content, a flexible design system, analytics, integrations and launch support. Comparing totals without normalizing the scope rewards omissions.",
          "Ask every partner to state assumptions, exclusions, decision points and who owns each input. A strong proposal should make the work legible enough for you to understand why it costs what it does and what would change the estimate.",
        ],
      },
      {
        id: "decision",
        title: "Fund the smallest complete version",
        paragraphs: [
          "A sensible first release is not the cheapest collection of pages. It is the smallest version that can perform its core job end to end: communicate the offer, establish trust, support a decision, capture the right action and produce useful evidence.",
          "Stage optional capabilities when that reduces risk, but do not remove the foundations that make the site operable. Content ownership, responsive behavior, accessibility, performance and measurement are cheaper to design in than to retrofit under pressure.",
        ],
      },
    ],
    takeaway: "Define the business job, surface the operational complexity and compare like-for-like scopes before comparing prices.",
  },
  {
    slug: "website-vs-web-application",
    category: "Technology",
    title: "Website vs. web application: what does your business need?",
    seoTitle: "Website vs. Web Application: Which Do You Need?",
    metaDescription: "Compare websites and web applications by user tasks, data, permissions and operating responsibility, then choose the simplest architecture that supports the full job.",
    excerpt: "The difference is less about labels and more about workflows, users and operational responsibility.",
    read: "6 min read",
    lead: "A website primarily informs and converts. A web application lets people perform ongoing tasks, manage data or run a workflow. Many useful products sit somewhere between the two.",
    sections: [
      {
        id: "difference",
        title: "Start with what the user must do",
        paragraphs: [
          "If the main job is to explain an offer, build confidence and generate an enquiry or purchase, a content-led website is usually the right foundation. If users need accounts, permissions, saved state, collaboration, calculations or recurring workflows, you are moving into application territory.",
          "The label matters less than the behavior. A customer portal can share a public marketing layer and an authenticated application layer. Treating the whole thing as one undifferentiated build often hides the very different security, data and support responsibilities involved.",
        ],
        points: ["Does the user return to continue work?", "Must the system store sensitive or changing data?", "Are roles and permissions required?", "Will failure interrupt an operational process?"],
      },
      {
        id: "responsibility",
        title: "Applications create an operating commitment",
        paragraphs: [
          "An application is not finished when its screens ship. It needs monitoring, data protection, access control, backups, support and a plan for changes in browsers, dependencies and connected services. Those responsibilities should influence the architecture and budget from the beginning.",
          "A conventional website still deserves strong engineering, but its operating risk is usually lower. Choosing an application architecture for a content problem can add avoidable cost; forcing a workflow into a brochure site can create fragile manual workarounds.",
        ],
      },
      {
        id: "path",
        title: "Choose a staged path when uncertainty is high",
        paragraphs: [
          "When the workflow is new, validate it before engineering the full system. A service blueprint, clickable prototype or manually supported pilot can reveal whether the process makes sense and which exceptions matter.",
          "Build the stable core first, then add automation and sophistication as evidence grows. That sequence protects the budget without boxing the team into a disposable first version.",
        ],
      },
    ],
    takeaway: "Choose the simplest architecture that supports the complete user job and the level of operational responsibility you can sustain.",
  },
  {
    slug: "ai-automation-repetitive-work",
    category: "AI",
    title: "Where AI automation can remove repetitive business work",
    seoTitle: "Where AI Automation Can Remove Repetitive Work",
    metaDescription: "Find repetitive workflows that are ready for AI automation, keep human judgment visible and run a bounded pilot that measures review effort as well as time saved.",
    excerpt: "A grounded framework for finding tasks that are ready for automation—and the ones that are not.",
    read: "8 min read",
    lead: "Start with repetitive, rules-heavy work where inputs and outputs can be observed—not with a tool looking for a problem.",
    sections: [
      {
        id: "candidates",
        title: "Look for queues, copying and predictable decisions",
        paragraphs: [
          "Good candidates often live between systems: re-entering form data, routing requests, preparing standard summaries, checking known conditions or assembling recurring reports. The task should happen often enough that reducing effort matters, and its successful output should be recognizable.",
          "Document the current process before automating it. If no one can explain the inputs, exceptions, owner and definition of done, automation will make the ambiguity move faster rather than make it disappear.",
        ],
        points: ["High frequency", "Stable inputs", "Observable output", "Manageable exceptions", "A clear human owner"],
      },
      {
        id: "judgment",
        title: "Keep judgment and accountability visible",
        paragraphs: [
          "AI is useful when language or messy information prevents ordinary rules from working, but probabilistic output changes the risk. A draft, classification or recommendation can be helpful while still requiring review. The workflow must say who checks it and what happens when confidence is low.",
          "Avoid silently automating decisions that materially affect people, money, safety or legal rights. In those cases, the system should support a qualified human, preserve context and make its actions traceable.",
        ],
      },
      {
        id: "pilot",
        title: "Pilot one workflow and measure the whole result",
        paragraphs: [
          "Estimate the current time, error rate, delay and rework before changing anything. Then run a bounded pilot with real examples, including awkward exceptions. Track not only time saved, but also review effort and the new failure modes the automation introduces.",
          "A useful pilot ends with an operating decision: stop, revise or scale. If it scales, add monitoring, permissions, documentation and a named owner before the workflow becomes business-critical.",
        ],
      },
    ],
    takeaway: "Automate a well-understood workflow, keep a human accountable and measure review effort as carefully as time saved.",
  },
  {
    slug: "seo-vs-paid-advertising",
    category: "Growth",
    title: "SEO vs. paid advertising: choosing the right growth mix",
    seoTitle: "SEO vs. Paid Advertising: Choosing the Right Mix",
    metaDescription: "Compare the roles, economics and time horizons of SEO and paid advertising, then build a resilient acquisition mix around qualified demand and conversion.",
    excerpt: "Two very different acquisition engines, one shared job: profitable, dependable demand.",
    read: "5 min read",
    lead: "Paid media rents immediate attention; SEO compounds relevant visibility over time. The right mix depends on urgency, economics and how your buyers look for help.",
    sections: [
      {
        id: "roles",
        title: "Give each channel the right job",
        paragraphs: [
          "Paid campaigns can test an offer quickly, reach a defined audience and create demand before organic visibility exists. They also stop producing traffic when spend stops. SEO takes longer because technical quality, authority and useful content develop over time, but strong pages can continue helping buyers without paying for every visit.",
          "Neither channel fixes a weak proposition or a poor conversion path. Sending more people to an unclear page only makes the leak more expensive and more visible.",
        ],
        points: ["Use paid media for speed, testing and precise distribution", "Use SEO for durable demand capture and topic authority", "Use conversion evidence to improve both"],
      },
      {
        id: "economics",
        title: "Work backward from the economics",
        paragraphs: [
          "Estimate what a qualified enquiry or sale can reasonably cost after margin, close rate and sales effort. That gives paid acquisition a boundary and helps prioritize search topics with genuine commercial relevance.",
          "Separate leading signals from business outcomes. Rankings, impressions and clicks can explain movement, but the decision ultimately depends on qualified demand, conversion, revenue quality and payback.",
        ],
      },
      {
        id: "mix",
        title: "Let the mix change over time",
        paragraphs: [
          "A new offer may lean on paid distribution while the team learns which messages and audiences respond. Those lessons can shape product pages, comparison content and search-led resources. As organic demand strengthens, paid activity can focus on launches, high-value segments or retargeting.",
          "Review the portfolio as one acquisition system. The goal is not to declare a permanent winner; it is to build a more resilient and efficient path to the right customers.",
        ],
      },
    ],
    takeaway: "Use paid media to learn and reach quickly, SEO to build durable demand capture, and one commercial measurement model for both.",
  },
  {
    slug: "digitally-transform-traditional-business",
    category: "Strategy",
    title: "How to digitally transform a traditional business",
    seoTitle: "How to Digitally Transform a Traditional Business",
    metaDescription: "Modernize a traditional business by mapping real friction, improving one meaningful journey end to end and measuring adoption alongside technical delivery.",
    excerpt: "Start with friction, not software. A useful sequence for modernization that teams can actually adopt.",
    read: "9 min read",
    lead: "Transformation starts where customers or employees lose time, information or trust—not with a software shopping list.",
    sections: [
      {
        id: "friction",
        title: "Map the journey and the work behind it",
        paragraphs: [
          "Follow a real customer request from first contact through delivery, service and reporting. Note where information is copied, decisions wait, ownership becomes unclear or the customer has to ask what is happening. Those moments reveal the operating system more accurately than an org chart.",
          "Include the people who do the work. They know which exceptions keep the process alive and which unofficial spreadsheets compensate for system gaps. Ignoring that knowledge produces elegant diagrams that fail in daily use.",
        ],
        points: ["Customer delay", "Repeated data entry", "Manual reconciliation", "Invisible ownership", "Decisions without reliable evidence"],
      },
      {
        id: "sequence",
        title: "Prioritize a thin end-to-end improvement",
        paragraphs: [
          "Choose a journey important enough to matter but bounded enough to change. Improve it from request to outcome rather than optimizing one department and handing the bottleneck to the next.",
          "Sequence foundational work deliberately. Shared definitions, clean data and clear ownership may need attention before automation. A roadmap should show dependencies, decision points and adoption work—not only a list of software releases.",
        ],
      },
      {
        id: "adoption",
        title: "Design adoption into the change",
        paragraphs: [
          "People adopt a new process when it makes their job clearer and the transition is supported. Involve users early, test with real cases, document exceptions and give managers a visible way to resolve issues.",
          "Measure whether the experience improved: cycle time, error rate, customer effort, adoption and decision quality. Then use what you learn to choose the next journey. Transformation is a repeatable operating capability, not a one-time technology project.",
        ],
      },
    ],
    takeaway: "Modernize one meaningful journey end to end, include the people who run it and measure adoption alongside technical delivery.",
  },
];

export const industries = ["Startups", "Healthcare", "Retail", "E-commerce", "Real Estate", "Hospitality", "Professional Services", "Manufacturing", "Education", "Finance", "Local Businesses"];

export const technology = ["React", "Next.js", "Node.js", "Python", "AWS", "Vercel", "Supabase", "MongoDB", "PostgreSQL", "Firebase", "Cloudflare", "Figma", "GitHub"];

export const capabilityItems = [
  { icon: Gauge, title: "Fast loading", copy: "Performance considered from architecture through launch." },
  { icon: Search, title: "Search ready", copy: "Semantic, structured and built for discoverability." },
  { icon: Boxes, title: "Scalable", copy: "Modular foundations that can evolve with the business." },
  { icon: BarChart3, title: "Analytics ready", copy: "Measurement planned into the experience from day one." },
];
