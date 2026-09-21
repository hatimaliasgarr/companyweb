/**
 * Framework-agnostic core for the contact form.
 *
 * Shared by the App Router boundary (`app/api/contact/route.ts`, used by the
 * Vinext dev server and the Node/Docker production server) and the Vercel
 * serverless function (`api/contact.ts`). Keep this file free of Node-only
 * imports so both runtimes can load it.
 */

export const INQUIRY_RECIPIENT = "office@zerobugg.in";

/** Field limits. Mirrored by the form's own `maxLength`/`minLength` attributes. */
export const LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  company: { max: 120 },
  need: { max: 120 },
  context: { max: 120 },
  description: { min: 20, max: 900 },
} as const;

/** Largest request body we will read before rejecting it outright. */
export const MAX_BODY_BYTES = 16 * 1024;

export type Inquiry = {
  name: string;
  email: string;
  description: string;
  company: string;
  need: string;
  context: string;
};

export type ParseResult =
  | { status: "ok"; inquiry: Inquiry }
  | { status: "invalid"; error: string }
  | { status: "spam" };

/**
 * Deliberately conservative: no quoted locals, no bare domains, single `@`.
 * Anything with a control character or whitespace is rejected before it can
 * reach a mail header.
 */
const EMAIL_PATTERN = /^[^\s@<>,;:"'\\[\]]+@[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?)+$/;

function text(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  // Strip control characters (including CR/LF) everywhere except message bodies,
  // then collapse the remaining whitespace so header values stay single-line.
  // eslint-disable-next-line no-control-regex -- stripping control characters is the point: they enable header injection.
  return value.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

function multiline(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  // eslint-disable-next-line no-control-regex -- message bodies keep newlines but never raw control characters.
  return value.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim().slice(0, max);
}

export function parseInquiry(raw: unknown): ParseResult {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return { status: "invalid", error: "Invalid form submission" };
  }
  const body = raw as Record<string, unknown>;

  // Honeypot: hidden from real visitors, so anything in it is a bot. Report
  // success to the caller so the bot has no signal to tune against.
  const honeypot = body.website;
  if (typeof honeypot === "string" && honeypot.trim() !== "") return { status: "spam" };

  const name = text(body.name, LIMITS.name.max);
  const email = text(body.email, LIMITS.email.max);
  const company = text(body.company, LIMITS.company.max);
  const need = text(body.need, LIMITS.need.max);
  const context = text(body.context, LIMITS.context.max);
  const description = multiline(body.description, LIMITS.description.max);

  if (name.length < LIMITS.name.min) {
    return { status: "invalid", error: "Please enter your name." };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { status: "invalid", error: "Please enter a valid email address." };
  }
  if (description.length < LIMITS.description.min) {
    return { status: "invalid", error: `Please describe your project in at least ${LIMITS.description.min} characters.` };
  }

  return { status: "ok", inquiry: { name, email, description, company, need, context } };
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Subject lines are built server-side; the visitor only supplies the name. */
export function buildSubject(inquiry: Inquiry): string {
  return `New ZeroBugg Inquiry — ${inquiry.name}`;
}

function rows(inquiry: Inquiry): Array<[string, string]> {
  const entries: Array<[string, string]> = [
    ["Name", inquiry.name],
    ["Email", inquiry.email],
    ["Company", inquiry.company || "Not provided"],
    ["Closest area", inquiry.need || "Not sure yet"],
  ];
  if (inquiry.context) entries.push(["Starting context", inquiry.context]);
  return entries;
}

export function buildHtml(inquiry: Inquiry): string {
  const body = rows(inquiry)
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e3e1da;color:#63646b;font-size:12px;letter-spacing:.06em;text-transform:uppercase;width:150px;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:10px 0;border-bottom:1px solid #e3e1da;color:#111216;font-size:14px;vertical-align:top;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f2f0e9;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #d7d5ce;">
      <tr>
        <td style="padding:24px 28px;border-bottom:1px solid #d7d5ce;">
          <p style="margin:0;color:#111216;font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">New ZeroBugg website inquiry</p>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 28px 4px;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">${body}</table>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 28px 24px;">
          <p style="margin:0 0 8px;color:#63646b;font-size:12px;letter-spacing:.06em;text-transform:uppercase;">Message</p>
          <p style="margin:0;color:#111216;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(inquiry.description)}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 28px;border-top:1px solid #d7d5ce;background:#faf9f5;">
          <p style="margin:0;color:#77787e;font-size:12px;">Submitted from the ZeroBugg website. Reply to this email to answer ${escapeHtml(inquiry.name)} directly.</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function buildText(inquiry: Inquiry): string {
  return [
    "NEW ZEROBUGG WEBSITE INQUIRY",
    "",
    ...rows(inquiry).map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    inquiry.description,
    "",
    "Submitted from: ZeroBugg Website",
    "Reply to this email to answer the sender directly.",
  ].join("\n");
}

/**
 * Best-effort, in-memory rate limit. Serverless instances are short-lived and
 * not shared, so this throttles bursts from a single warm instance rather than
 * acting as a global quota — enough to blunt rapid repeat submissions without
 * adding external state.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

export function allowRequest(key: string, now: number = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((at) => now - at < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 500) {
    for (const [id, times] of hits) {
      if (times.every((at) => now - at >= WINDOW_MS)) hits.delete(id);
    }
  }
  return true;
}

/** First hop in `x-forwarded-for`, which is the client on Vercel and Cloudflare. */
export function clientKey(forwardedFor: string | null | undefined, realIp?: string | null): string {
  const first = forwardedFor?.split(",")[0]?.trim();
  return first || realIp?.trim() || "unknown";
}
