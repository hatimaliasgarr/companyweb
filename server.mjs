import { startProdServer } from "vinext/server/prod-server";

const port = Number.parseInt(process.env.PORT || "3000", 10);
const host = process.env.HOST || "0.0.0.0";

console.log(`Starting production server on ${host}:${port}...`);

startProdServer({
  port,
  host,
}).catch((error) => {
  console.error("[server] Failed to start production server:", error);
  process.exit(1);
});
