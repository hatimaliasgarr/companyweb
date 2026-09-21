import { MAX_BODY_BYTES, allowRequest, clientKey, parseInquiry } from "../../lib/contact-inquiry";
import { MailNotConfiguredError, sendInquiry, type CreateTransport } from "../../lib/send-inquiry";

/**
 * Nodemailer is resolved at runtime through a variable specifier so the bundler
 * leaves it out of the Cloudflare Worker build, which cannot open SMTP sockets.
 * On Node (the standalone server, Docker, `npm run dev`) it resolves normally.
 */
const NODEMAILER = "nodemailer";

async function loadCreateTransport(): Promise<CreateTransport> {
  const mod = (await import(/* @vite-ignore */ NODEMAILER)) as {
    createTransport?: CreateTransport;
    default?: { createTransport: CreateTransport };
  };
  const createTransport = mod.createTransport ?? mod.default?.createTransport;
  if (!createTransport) throw new Error("nodemailer.createTransport is unavailable");
  return createTransport;
}

function json(body: Record<string, unknown>, status: number) {
  return Response.json(body, { status, headers: { "cache-control": "no-store" } });
}

export async function POST(request: Request) {
  const declaredLength = Number.parseInt(request.headers.get("content-length") ?? "", 10);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return json({ success: false, error: "Invalid form submission" }, 413);
  }

  const key = clientKey(request.headers.get("x-forwarded-for"), request.headers.get("cf-connecting-ip"));
  if (!allowRequest(key)) {
    return json({ success: false, error: "Too many submissions. Please try again shortly." }, 429);
  }

  let raw: unknown;
  try {
    const body = await request.text();
    if (body.length > MAX_BODY_BYTES) {
      return json({ success: false, error: "Invalid form submission" }, 413);
    }
    raw = JSON.parse(body);
  } catch {
    return json({ success: false, error: "Invalid form submission" }, 400);
  }

  const parsed = parseInquiry(raw);
  if (parsed.status === "spam") return json({ success: true }, 200);
  if (parsed.status === "invalid") return json({ success: false, error: parsed.error }, 422);

  let createTransport: CreateTransport;
  try {
    createTransport = await loadCreateTransport();
  } catch (error) {
    // Reached on Cloudflare Workers, which has no SMTP sockets. Deploy the
    // Vercel function in `api/contact.ts` or the Node server instead.
    console.error("[contact] SMTP is unavailable in this runtime:", error instanceof Error ? error.message : error);
    return json({ success: false, error: "Unable to send inquiry" }, 503);
  }

  try {
    await sendInquiry(parsed.inquiry, createTransport);
  } catch (error) {
    // Logged server-side only; the client never sees SMTP or environment detail.
    console.error("[contact] delivery failed:", error instanceof Error ? error.message : error);
    return json({ success: false, error: "Unable to send inquiry" }, error instanceof MailNotConfiguredError ? 503 : 502);
  }

  return json({ success: true }, 200);
}
