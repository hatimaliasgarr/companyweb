import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the Zeroberg home experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /We build digital/);
  assert.match(html, /One partner/);
  assert.match(html, /Start a project/i);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
});

test("renders representative interior routes with specific metadata", async () => {
  const response = await render("/services/ai-automation");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /AI &amp; Business Automation/);
  assert.match(html, /AI agents/);
  assert.match(html, /Service/);
});

test("keeps sample work explicitly labeled", async () => {
  const response = await render("/work/northstar-commerce");
  const html = await response.text();
  assert.match(html, /ILLUSTRATIVE CONCEPT/);
  assert.doesNotMatch(html, /\+\d+%/);
});
