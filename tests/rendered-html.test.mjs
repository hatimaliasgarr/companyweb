import assert from "node:assert/strict";
import { stat } from "node:fs/promises";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const ctx = { waitUntil() {}, passThroughOnException() {} };

function fetchApp(path = "/", init = {}) {
  const url = path.startsWith("http") ? path : `http://localhost${path}`;
  const headers = new Headers(init.headers);
  if (!headers.has("accept")) headers.set("accept", "text/html");
  return worker.fetch(new Request(url, { ...init, headers }), env, ctx);
}

async function html(path, init) {
  const response = await fetchApp(path, init);
  return { response, body: await response.text() };
}

function jsonLd(body) {
  return [...body.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
}

const routes = [
  "/", "/about", "/services", "/solutions", "/work", "/process", "/insights", "/careers", "/contact", "/privacy", "/terms",
  "/services/consulting", "/services/ui-ux", "/services/web-development", "/services/software-development", "/services/digital-marketing", "/services/seo", "/services/ai-automation", "/services/analytics",
  "/work/multi-market-commerce", "/work/delivery-operations", "/work/healthcare-service-journey",
  "/insights/business-website-cost", "/insights/website-vs-web-application", "/insights/ai-automation-repetitive-work", "/insights/seo-vs-paid-advertising", "/insights/digitally-transform-traditional-business",
];

test("renders the complete public route matrix with one primary heading", async () => {
  for (const route of routes) {
    const { response, body } = await html(route);
    assert.equal(response.status, 200, route);
    assert.equal((body.match(/<h1\b/g) ?? []).length, 1, `${route} should contain one h1`);
  }
});

test("keeps every rendered internal anchor on a live route", async () => {
  const paths = new Set();
  for (const route of routes) {
    const { body } = await html(route);
    for (const match of body.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
      const href = match[1].replaceAll("&amp;", "&");
      if (!href.startsWith("/")) continue;
      paths.add(new URL(href, "https://zerobugg.com").pathname);
    }
  }
  for (const path of paths) {
    const response = await fetchApp(path);
    assert.equal(response.status, 200, path);
  }
});

test("renders sharper homepage copy without staging endorsements", async () => {
  const { response, body } = await html("/");
  assert.equal(response.status, 200);
  assert.match(body, /From business challenge/);
  assert.match(body, /<title>Zerobugg — Your Digital Growth &amp; Technology Partner<\/title>/);
  assert.match(body, /Tell us your challenge/i);
  assert.match(body, /What should happen first/);
  assert.match(body, /One accountable partner/);
  assert.match(body, /aria-label="Explore outcome: Launch my business"/);
  assert.match(body, /aria-label="Discuss the Project-based engagement model"/);
  assert.doesNotMatch(body, /Placeholder testimonial|Sample Client|What our clients.*will say/);
  assert.doesNotMatch(body, /codex-preview|SkeletonPreview|react-loading-skeleton/);
  assert.doesNotMatch(body, /fonts\.googleapis|fonts\.gstatic/);
  assert.match(body, /name="theme-color" content="#08090c"/);
});

test("keeps the hero decision path available to assistive technology", async () => {
  const { body } = await html("/");
  assert.match(body, /class="partner-path"/);
  assert.doesNotMatch(body, /class="partner-path" aria-hidden="true"/);
});

test("renders one stable, scrollable technology list", async () => {
  const { body } = await html("/");
  const rail = body.match(/<div class="tech-rail"[\s\S]*?<\/div>/)?.[0] ?? "";
  assert.match(rail, /Scrollable technology list/);
  assert.equal((rail.match(/>React</g) ?? []).length, 1);
  assert.equal((rail.match(/>Cloudflare</g) ?? []).length, 1);
});

test("renders a specific and accessible UI/UX service offer", async () => {
  const { response, body } = await html("/services/ui-ux");
  assert.equal(response.status, 200);
  assert.match(body, /Make complex products easier to understand, use and trust/);
  assert.match(body, /User flows &amp; information architecture/);
  assert.match(body, /Usability testing/);
  assert.match(body, /Fewer usability barriers/);
  assert.match(body, /aria-label="Breadcrumb"/);
});

test("keeps concept studies explicit and avoids fabricated results", async () => {
  const { response, body } = await html("/work/multi-market-commerce");
  assert.equal(response.status, 200);
  assert.match(body, /ILLUSTRATIVE CONCEPT/);
  assert.match(body, /What we would measure/);
  assert.match(body, /not reported client results/i);
  assert.doesNotMatch(body, /\+\d+%/);
});

test("removes unconfirmed roles and false form-delivery claims", async () => {
  const careers = await html("/careers");
  assert.match(careers.body, /No confirmed openings/);
  assert.doesNotMatch(careers.body, /Senior Product Designer|Full-stack Engineer|Apply/);

  const contact = await html("/contact");
  assert.match(contact.body, /prepares a private email draft/i);
  assert.match(contact.body, /Nothing is sent until you review and send the email/i);
  assert.match(contact.body, /Open my email draft/i);
  assert.doesNotMatch(contact.body, /name="phone"|name="budget"/);
  assert.doesNotMatch(contact.body, /Message received|Within 1–2 business days/);
});

test("gives each insight topic substantive, distinct content", async () => {
  const cost = await html("/insights/business-website-cost");
  const automation = await html("/insights/ai-automation-repetitive-work");
  assert.match(cost.body, /Compare scopes, not headline prices/);
  assert.match(cost.body, /Fund the smallest complete version/);
  assert.match(automation.body, /Keep judgment and accountability visible/);
  assert.match(automation.body, /Pilot one workflow and measure the whole result/);
  assert.doesNotMatch(cost.body, /Keep judgment and accountability visible/);
  assert.doesNotMatch(cost.body, /Updated 18 Aug 2026|datePublished|dateModified/);
});

test("returns true 404 responses for unknown and over-deep routes", async () => {
  for (const route of ["/definitely-not-real", "/services/nope", "/services/ui-ux/extra", "/work/multi-market-commerce/extra", "/insights/business-website-cost/extra"]) {
    const { response, body } = await html(route);
    assert.equal(response.status, 404, route);
    assert.match(body, /Page Not Found|Wrong turn/);
    assert.match(body, /noindex/);
    assert.doesNotMatch(body, /rel="canonical"/);
    assert.doesNotMatch(body, /property="og:url" content="https:\/\/zerobugg\.com\/"/);
  }
});

test("uses production canonicals and only assigns social images that exist", async () => {
  const detail = await html("/services/ui-ux", { headers: { "x-forwarded-host": "preview.example", "x-forwarded-proto": "http" } });
  assert.match(detail.body, /<link rel="canonical" href="https:\/\/zerobugg\.com\/services\/ui-ux"/);
  assert.match(detail.body, /property="og:site_name" content="Zerobugg"/);
  assert.doesNotMatch(detail.body, /property="og:image"/);
  assert.match(detail.body, /name="twitter:card" content="summary"/);
  assert.doesNotMatch(detail.body, /preview\.example/);

  const collection = await html("/services");
  assert.match(collection.body, /property="og:image" content="https:\/\/zerobugg\.com\/og-zerobugg\.png"/);
  assert.match(collection.body, /name="twitter:card" content="summary_large_image"/);
});

test("emits parseable Organization, WebSite, Service and Breadcrumb schemas", async () => {
  const home = await html("/");
  const service = await html("/services/ui-ux");
  const schemas = [...jsonLd(home.body), ...jsonLd(service.body)];
  const flattened = schemas.flatMap((schema) => schema["@graph"] ?? [schema]);
  const types = flattened.map((schema) => schema["@type"]);
  assert.ok(types.includes("Organization"));
  assert.ok(types.includes("WebSite"));
  assert.ok(types.includes("Service"));
  assert.ok(types.includes("BreadcrumbList"));
  const serviceSchema = flattened.find((schema) => schema["@type"] === "Service");
  assert.equal(serviceSchema.url, "https://zerobugg.com/services/ui-ux");
  assert.equal(serviceSchema.areaServed, "Worldwide");
});

test("HTML-escapes every JSON-LD payload without changing its parsed data", async () => {
  const service = await html("/services/ui-ux");
  const payloads = [...service.body.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => match[1]);
  assert.ok(payloads.length >= 2);
  for (const payload of payloads) {
    assert.doesNotMatch(payload, /[<>&]/);
    assert.doesNotThrow(() => JSON.parse(payload));
  }
  assert.ok(jsonLd(service.body).some((schema) => JSON.stringify(schema).includes("UI/UX & Product Design")));
});

test("keeps homepage JavaScript within the shipping budget", async () => {
  const home = await html("/");
  const scripts = [...new Set([...home.body.matchAll(/(?:src|href)="(\/_next\/static\/chunks\/[^"]+\.js)[^"]*"/g)].map((match) => match[1]))];
  let totalBytes = 0;
  for (const script of scripts) {
    const asset = new URL(`../dist/client${script}`, import.meta.url);
    totalBytes += (await stat(asset)).size;
  }
  assert.ok(totalBytes <= 425_000, `homepage loads ${totalBytes} raw JS bytes; budget is 425000`);
});

test("uses a social card that matches the current Zerobugg brand", async () => {
  const home = await html("/");
  assert.match(home.body, /property="og:image" content="https:\/\/zerobugg\.com\/og-zerobugg\.png"/);
  assert.match(home.body, /name="twitter:image" content="https:\/\/zerobugg\.com\/og-zerobugg\.png"/);
  const asset = new URL("../public/og-zerobugg.png", import.meta.url);
  assert.ok((await stat(asset)).size > 10_000);
});

test("keeps desktop navigation focused on indexable decision paths", async () => {
  const home = await html("/");
  const desktopNav = home.body.match(/<nav class="desktop-nav"[\s\S]*?<\/nav>/)?.[0] ?? "";
  assert.match(desktopNav, /href="\/services"/);
  assert.match(desktopNav, /href="\/solutions"/);
  assert.match(desktopNav, /href="\/process"/);
  assert.match(desktopNav, /href="\/insights"/);
  assert.doesNotMatch(desktopNav, /href="\/(?:work|careers)"/);
});

test("makes service discovery and topical next steps explicit", async () => {
  const catalog = await html("/services");
  assert.match(catalog.body, />View service\b/);

  const service = await html("/services/ui-ux");
  assert.match(service.body, /Related insight/);
  assert.match(service.body, /href="\/insights\/website-vs-web-application"/);

  const article = await html("/insights/website-vs-web-application");
  assert.match(article.body, /Related capability/);
  assert.match(article.body, /href="\/services\/software-development"/);
});

test("uses an internationally dialable phone link", async () => {
  const contact = await html("/contact");
  assert.match(contact.body, /href="tel:\+919752306452"/);
  assert.doesNotMatch(contact.body, /href="tel:9752306452"/);
});

test("keeps draft, sample and empty publishing surfaces out of the index", async () => {
  const sitemap = await html("/sitemap.xml");
  assert.equal(sitemap.response.status, 200);
  assert.match(sitemap.body, /https:\/\/zerobugg\.com\/services\/ui-ux/);
  assert.doesNotMatch(sitemap.body, /https:\/\/zerobugg\.com\/work|https:\/\/zerobugg\.com\/careers|\/privacy<|\/terms<|northstar-commerce|kinetic-ops|form-health/);

  for (const route of ["/privacy", "/terms", "/work", "/work/multi-market-commerce", "/careers"]) {
    const page = await html(route);
    assert.match(page.body, /name="robots" content="noindex, follow"/);
  }

  const robots = await html("/robots.txt");
  assert.equal(robots.response.status, 200);
  assert.match(robots.body, /Sitemap: https:\/\/zerobugg\.com\/sitemap\.xml/);
});

test("keeps the unconfigured contact API honest", async () => {
  const invalid = await fetchApp("/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({ name: "A" }),
  });
  assert.equal(invalid.status, 422);

  const valid = await fetchApp("/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({ name: "Ada Lovelace", email: "ada@example.com", need: "Website", description: "We need a clearer website for a new service launch." }),
  });
  assert.equal(valid.status, 503);
  const payload = await valid.json();
  assert.equal(payload.ok, false);
  assert.match(payload.error, /not configured/i);
});

test("adds baseline security headers and canonical-host redirects", async () => {
  const response = await fetchApp("/about");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.match(response.headers.get("content-security-policy") ?? "", /frame-ancestors 'none'/);

  const redirect = await fetchApp("http://www.zerobugg.com/about", { redirect: "manual" });
  assert.equal(redirect.status, 308);
  assert.equal(redirect.headers.get("location"), "https://zerobugg.com/about");

  const favicon = await fetchApp("/favicon.ico", { redirect: "manual" });
  assert.equal(favicon.status, 308);
  assert.equal(favicon.headers.get("location"), "http://localhost/favicon.svg");
});
