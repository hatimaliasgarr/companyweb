/**
 * Vercel serverless function: POST /api/contact
 *
 * Vercel's Node runtime picks up files in this directory regardless of the
 * framework preset, so the built site can stay a static export while inquiry
 * delivery runs server-side. The App Router boundary in
 * `app/api/contact/route.ts` mirrors this for the Node/Docker server.
 */
import type { IncomingMessage, ServerResponse } from "node:http";
import { MAX_BODY_BYTES, allowRequest, clientKey, parseInquiry } from "../app/lib/contact-inquiry.js";
import { MailNotConfiguredError, sendInquiry } from "../app/lib/send-inquiry.js";

type VercelRequest = IncomingMessage & { body?: unknown };

function send(res: ServerResponse, status: number, body: Record<string, unknown>) {
  res.statusCode = status;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "no-store");
  res.end(JSON.stringify(body));
}

/** Vercel may have parsed the body already; otherwise read it under a hard cap. */
async function readBody(req: VercelRequest): Promise<unknown> {
  if (req.body !== undefined && req.body !== null && typeof req.body !== "string") {
    return req.body;
  }

  let raw = typeof req.body === "string" ? req.body : "";
  if (!raw) {
    let size = 0;
    const chunks: Buffer[] = [];
    for await (const chunk of req) {
      const buffer = chunk as Buffer;
      size += buffer.length;
      if (size > MAX_BODY_BYTES) throw new Error("payload too large");
      chunks.push(buffer);
    }
    raw = Buffer.concat(chunks).toString("utf-8");
  }
  if (raw.length > MAX_BODY_BYTES) throw new Error("payload too large");
  return JSON.parse(raw);
}

export default async function handler(req: VercelRequest, res: ServerResponse) {
  if (req.method !== "POST") {
    res.setHeader("allow", "POST");
    return send(res, 405, { success: false, error: "Method not allowed" });
  }

  const forwarded = req.headers["x-forwarded-for"];
  const key = clientKey(Array.isArray(forwarded) ? forwarded[0] : forwarded, String(req.headers["x-real-ip"] ?? ""));
  if (!allowRequest(key)) {
    return send(res, 429, { success: false, error: "Too many submissions. Please try again shortly." });
  }

  let raw: unknown;
  try {
    raw = await readBody(req);
  } catch {
    return send(res, 400, { success: false, error: "Invalid form submission" });
  }

  const parsed = parseInquiry(raw);
  if (parsed.status === "spam") return send(res, 200, { success: true });
  if (parsed.status === "invalid") return send(res, 422, { success: false, error: parsed.error });

  try {
    await sendInquiry(parsed.inquiry);
  } catch (error) {
    // Server-side only: never leak provider responses or environment detail.
    console.error("[contact] delivery failed:", error instanceof Error ? error.message : error);
    const status = error instanceof MailNotConfiguredError ? 503 : 502;
    return send(res, status, { success: false, error: "Unable to send inquiry" });
  }

  return send(res, 200, { success: true });
}
