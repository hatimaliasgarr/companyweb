/**
 * Trims the build output for Vercel's static file hosting.
 *
 * `npm run build` produces one directory that serves three targets: the
 * Cloudflare Worker bundle (dist/server), the Node standalone server
 * (dist/standalone) and the pre-rendered static site (dist root, mirrored from
 * dist/client). Vercel only serves the static site plus the functions in
 * `api/`, so the server bundles would otherwise be published as downloadable
 * static assets. This removes them from the deployed output only; local,
 * Docker and Cloudflare builds are untouched.
 */
import fs from "node:fs";
import path from "node:path";

const distDir = path.join(process.cwd(), "dist");
const prune = ["server", "standalone", "client"];

for (const name of prune) {
  const target = path.join(distDir, name);
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
    console.log(`[vercel-prune] removed dist/${name}`);
  }
}

console.log("[vercel-prune] static output ready for Vercel.");
