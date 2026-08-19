import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");
const clientDir = path.join(distDir, "client");
const distStandalone = path.join(distDir, "standalone");
const nextDir = path.join(root, ".next");
const nextStandalone = path.join(nextDir, "standalone");
const nextStatic = path.join(nextDir, "static");
const clientStatic = path.join(clientDir, "_next", "static");

// 1. Ensure .next directory exists for Next.js runners
fs.mkdirSync(nextDir, { recursive: true });
fs.writeFileSync(path.join(nextDir, "BUILD_ID"), "production\n");

const serverFilesJson = path.join(nextDir, "required-server-files.json");
if (!fs.existsSync(serverFilesJson)) {
  fs.writeFileSync(
    serverFilesJson,
    JSON.stringify({ version: 1, config: { output: "standalone" }, appDir: root, files: [] }, null, 2),
  );
}

// 2. Mirror dist/standalone to .next/standalone
if (fs.existsSync(distStandalone)) {
  fs.mkdirSync(nextStandalone, { recursive: true });
  fs.cpSync(distStandalone, nextStandalone, { recursive: true });
}

// 3. Copy client assets to .next/static
if (fs.existsSync(clientStatic)) {
  fs.mkdirSync(nextStatic, { recursive: true });
  fs.cpSync(clientStatic, nextStatic, { recursive: true });

  const standaloneNextStatic = path.join(nextStandalone, ".next", "static");
  fs.mkdirSync(path.dirname(standaloneNextStatic), { recursive: true });
  fs.cpSync(clientStatic, standaloneNextStatic, { recursive: true });
}

// 4. Copy client static assets into root dist for static web hosts (Vite / Nginx preset)
if (fs.existsSync(clientDir)) {
  fs.cpSync(clientDir, distDir, { recursive: true });
}

// 5. Pre-render all static routes to HTML in dist/ so static hosting works out-of-the-box
const routes = [
  "/", "/about", "/services", "/solutions", "/work", "/process", "/insights", "/careers", "/contact", "/privacy", "/terms",
  "/services/consulting", "/services/ui-ux", "/services/web-development", "/services/software-development", "/services/digital-marketing", "/services/seo", "/services/ai-automation", "/services/analytics",
  "/work/multi-market-commerce", "/work/delivery-operations", "/work/healthcare-service-journey",
  "/insights/business-website-cost", "/insights/website-vs-web-application", "/insights/ai-automation-repetitive-work", "/insights/seo-vs-paid-advertising", "/insights/digitally-transform-traditional-business",
];

try {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  const { default: worker } = await import(workerUrl.href);
  const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
  const ctx = { waitUntil() {}, passThroughOnException() {} };

  for (const route of routes) {
    const res = await worker.fetch(new Request(`http://localhost${route}`, { headers: { accept: "text/html" } }), env, ctx);
    if (res.status === 200) {
      const html = await res.text();
      let targetFile;
      if (route === "/") {
        targetFile = path.join(distDir, "index.html");
      } else {
        const routeDir = path.join(distDir, ...route.split("/").filter(Boolean));
        fs.mkdirSync(routeDir, { recursive: true });
        targetFile = path.join(routeDir, "index.html");
      }
      fs.writeFileSync(targetFile, html, "utf-8");
    }
  }
  console.log(`[postbuild] Generated static HTML for ${routes.length} routes in dist/`);
} catch (err) {
  console.warn("[postbuild] Static pre-rendering notice:", err.message);
}

console.log("[postbuild] Build outputs ready for Static, Node.js and Next.js hosting.");
