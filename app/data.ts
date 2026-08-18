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
  intro: string;
  items: string[];
  icon: IconComponent;
};

export const services: Service[] = [
  {
    number: "01",
    slug: "consulting",
    short: "Strategy & Consulting",
    title: "Business & Technology Consulting",
    description: "Clarity before code. We connect business goals to a practical digital roadmap.",
    intro: "We study how your business works, where growth is getting stuck and which digital moves will create the most value. Then we turn the answer into an executable plan.",
    items: ["Business analysis", "Digital strategy", "Technology consulting", "Product strategy", "Digital transformation"],
    icon: Compass,
  },
  {
    number: "02",
    slug: "ui-ux",
    short: "Design",
    title: "UI/UX & Product Design",
    description: "Digital experiences that make complex businesses feel simple, useful and unmistakably yours.",
    intro: "From product flows to brand systems, we design interfaces around how real people think and act—then pressure-test every decision before development begins.",
    items: ["UI/UX design", "Website design", "Product design", "Brand identity", "Creative direction"],
    icon: Palette,
  },
  {
    number: "03",
    slug: "web-development",
    short: "Web Development",
    title: "Website & E-Commerce Development",
    description: "Fast, precise digital platforms engineered to turn attention into action.",
    intro: "We build high-performing websites and storefronts around your customer journey—not around a theme. Every build is responsive, measurable and ready to evolve.",
    items: ["Business websites", "E-commerce", "Landing platforms", "CMS architecture", "Performance engineering"],
    icon: Braces,
  },
  {
    number: "04",
    slug: "software-development",
    short: "Software",
    title: "Custom Software Development",
    description: "Purpose-built applications that fit your operations instead of forcing your operations to fit software.",
    intro: "We translate processes, product ideas and operational bottlenecks into dependable web applications, SaaS platforms and internal tools.",
    items: ["Web applications", "SaaS platforms", "Internal tools", "API integrations", "Cloud deployment"],
    icon: Boxes,
  },
  {
    number: "05",
    slug: "digital-marketing",
    short: "Digital Growth",
    title: "Digital & Performance Marketing",
    description: "A connected growth system across content, campaigns, conversion and measurement.",
    intro: "We unite creative, media and analytics so every campaign has a purpose, every channel has a role and every decision has evidence behind it.",
    items: ["Growth strategy", "Performance marketing", "Social media", "Content strategy", "Conversion optimization"],
    icon: Megaphone,
  },
  {
    number: "06",
    slug: "seo",
    short: "SEO",
    title: "Search Engine Optimization",
    description: "Build durable visibility by making your site useful to people and legible to search engines.",
    intro: "Our SEO work connects technical health, search intent and high-quality content into a long-term acquisition engine.",
    items: ["SEO strategy", "Technical SEO", "Content planning", "On-page optimization", "Reporting"],
    icon: Search,
  },
  {
    number: "07",
    slug: "ai-automation",
    short: "AI & Automation",
    title: "AI & Business Automation",
    description: "Remove repetitive work and connect the systems your team depends on.",
    intro: "We find the parts of your operation where AI and automation can save time, improve consistency or unlock a better customer experience—without adding complexity for its own sake.",
    items: ["AI integrations", "AI agents", "Workflow automation", "CRM automation", "Process automation"],
    icon: Bot,
  },
  {
    number: "08",
    slug: "analytics",
    short: "Data & Analytics",
    title: "Analytics & Business Intelligence",
    description: "Turn scattered activity into a clear view of what is working and what to do next.",
    intro: "We create the tracking, dashboards and reporting layer leaders need to make faster, better-informed decisions.",
    items: ["Analytics strategy", "Tracking setup", "Dashboards", "Business intelligence", "Performance reporting"],
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
  { icon: Sparkles, title: "Launch my business", copy: "Strategy, brand, website, social foundation and analytics—built as one launch system.", tags: ["Brand", "Web", "Launch"] },
  { icon: Workflow, title: "Digitize my business", copy: "Modernize your customer experience, internal systems and decision-making infrastructure.", tags: ["CRM", "Automation", "Data"] },
  { icon: LineChart, title: "Generate more leads", copy: "Landing experiences, search visibility, campaigns and follow-up automation working together.", tags: ["SEO", "Media", "CRO"] },
  { icon: Layers3, title: "Build my product", copy: "Product strategy, interface design, software engineering and reliable cloud deployment.", tags: ["UX", "SaaS", "Cloud"] },
  { icon: Bot, title: "Automate operations", copy: "AI, connected workflows and dashboards that give time back to your team.", tags: ["AI", "Ops", "BI"] },
  { icon: ShoppingBag, title: "Build my online store", copy: "E-commerce, payments, inventory connections and a growth engine designed around conversion.", tags: ["Commerce", "Growth", "Data"] },
];

export const processSteps = [
  { number: "01", title: "Understand", copy: "We learn the company, customers, processes, competition and objectives." },
  { number: "02", title: "Identify", copy: "We surface digital gaps, operational bottlenecks and growth opportunities." },
  { number: "03", title: "Strategize", copy: "We decide which design, technology and marketing moves will create the most value." },
  { number: "04", title: "Build", copy: "Our integrated team designs and develops the required digital infrastructure." },
  { number: "05", title: "Launch", copy: "We test, refine and deploy with a clear path from handoff to adoption." },
  { number: "06", title: "Grow", copy: "We improve performance continuously through marketing, automation and analytics." },
];

export const projects = [
  {
    slug: "northstar-commerce",
    number: "01",
    name: "Northstar Commerce",
    category: "E-commerce transformation",
    industry: "Retail",
    problem: "A sample multi-market retailer needed a clearer customer journey and a connected operating layer.",
    solution: "A conversion-led storefront concept with a modular content system and analytics foundation.",
    services: ["Strategy", "UI/UX", "Development", "Analytics"],
    technology: ["Next.js", "Commerce API", "PostgreSQL"],
    impact: "Sample concept — outcome not yet measured",
    tone: "violet",
  },
  {
    slug: "kinetic-ops",
    number: "02",
    name: "Kinetic Ops",
    category: "Operations platform",
    industry: "Professional Services",
    problem: "A sample distributed team was coordinating delivery across disconnected tools and manual reports.",
    solution: "A unified workflow, client portal and management dashboard concept built around operational clarity.",
    services: ["Product strategy", "Software", "Automation", "BI"],
    technology: ["React", "Node.js", "Cloud"],
    impact: "Sample concept — business impact not yet verified",
    tone: "cyan",
  },
  {
    slug: "form-health",
    number: "03",
    name: "Form Health",
    category: "Digital service experience",
    industry: "Healthcare",
    problem: "A sample healthcare brand needed to explain a complex service without overwhelming prospective patients.",
    solution: "A calm, accessible digital experience concept with guided content and a clearer conversion path.",
    services: ["Research", "Brand", "Web", "SEO"],
    technology: ["Next.js", "Headless CMS", "Analytics"],
    impact: "Sample concept — no client metrics claimed",
    tone: "lime",
  },
];

export const insights = [
  {
    slug: "business-website-cost",
    category: "Business",
    title: "How much should a business website cost?",
    excerpt: "A practical way to think about scope, complexity, value and the hidden cost of underbuilding.",
    read: "7 min read",
  },
  {
    slug: "website-vs-web-application",
    category: "Technology",
    title: "Website vs. web application: what does your business need?",
    excerpt: "The difference is less about labels and more about workflows, users and operational responsibility.",
    read: "6 min read",
  },
  {
    slug: "ai-automation-repetitive-work",
    category: "AI",
    title: "Where AI automation can remove repetitive business work",
    excerpt: "A grounded framework for finding tasks that are ready for automation—and the ones that are not.",
    read: "8 min read",
  },
  {
    slug: "seo-vs-paid-advertising",
    category: "Growth",
    title: "SEO vs. paid advertising: choosing the right growth mix",
    excerpt: "Two very different acquisition engines, one shared job: profitable, dependable demand.",
    read: "5 min read",
  },
  {
    slug: "digitally-transform-traditional-business",
    category: "Strategy",
    title: "How to digitally transform a traditional business",
    excerpt: "Start with friction, not software. A useful sequence for modernization that teams can actually adopt.",
    read: "9 min read",
  },
];

export const industries = ["Startups", "Healthcare", "Retail", "E-Commerce", "Real Estate", "Hospitality", "Professional Services", "Manufacturing", "Education", "Finance", "Local Businesses"];

export const technology = ["React", "Next.js", "Node.js", "Python", "AWS", "Vercel", "Supabase", "MongoDB", "PostgreSQL", "Firebase", "Cloudflare", "Figma", "GitHub"];

export const jobs = [
  { title: "Senior Product Designer", department: "Design", location: "Remote / Hybrid", type: "Full-time" },
  { title: "Full-Stack Engineer", department: "Technology", location: "Remote / Hybrid", type: "Full-time" },
  { title: "Growth Strategist", department: "Growth", location: "Remote", type: "Full-time" },
];

export const capabilityItems = [
  { icon: Gauge, title: "Fast loading", copy: "Performance considered from architecture through launch." },
  { icon: Search, title: "Search ready", copy: "Semantic, structured and built for discoverability." },
  { icon: Boxes, title: "Scalable", copy: "Modular foundations that can evolve with the business." },
  { icon: BarChart3, title: "Analytics ready", copy: "Measurement planned into the experience from day one." },
];
