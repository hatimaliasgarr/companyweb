import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const distStandalone = path.join(root, "dist", "standalone");
const nextDir = path.join(root, ".next");
const nextStandalone = path.join(nextDir, "standalone");
const nextStatic = path.join(nextDir, "static");
const clientStatic = path.join(root, "dist", "client", "_next", "static");

// Ensure .next directory exists
fs.mkdirSync(nextDir, { recursive: true });

// Write BUILD_ID
fs.writeFileSync(path.join(nextDir, "BUILD_ID"), "production\n");

// Write required-server-files.json if missing
const serverFilesJson = path.join(nextDir, "required-server-files.json");
if (!fs.existsSync(serverFilesJson)) {
  fs.writeFileSync(
    serverFilesJson,
    JSON.stringify({ version: 1, config: { output: "standalone" }, appDir: root, files: [] }, null, 2),
  );
}

// Mirror dist/standalone to .next/standalone
if (fs.existsSync(distStandalone)) {
  fs.mkdirSync(nextStandalone, { recursive: true });
  fs.cpSync(distStandalone, nextStandalone, { recursive: true });
}

// Copy static assets
if (fs.existsSync(clientStatic)) {
  fs.mkdirSync(nextStatic, { recursive: true });
  fs.cpSync(clientStatic, nextStatic, { recursive: true });

  const standaloneNextStatic = path.join(nextStandalone, ".next", "static");
  fs.mkdirSync(path.dirname(standaloneNextStatic), { recursive: true });
  fs.cpSync(clientStatic, standaloneNextStatic, { recursive: true });
}

console.log("[postbuild] Next.js and Node.js standalone outputs prepared successfully.");
