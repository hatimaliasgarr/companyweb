/**
 * Delivery for contact-form inquiries.
 *
 * Nodemailer is passed in by the caller rather than imported here: the App
 * Router boundary is bundled for the Cloudflare Worker build, which has no TCP
 * sockets, so a static `import "nodemailer"` would break that bundle. Each
 * entry point loads Nodemailer the way its own runtime allows and hands the
 * factory to `sendInquiry`.
 */
import { INQUIRY_RECIPIENT, buildHtml, buildSubject, buildText, type Inquiry } from "./contact-inquiry";

export type CreateTransport = (options: Record<string, unknown>) => {
  sendMail(message: Record<string, unknown>): Promise<unknown>;
};

export class MailNotConfiguredError extends Error {}

type MailConfig = { user: string; pass: string };

function readConfig(): MailConfig {
  const user = process.env.GMAIL_USER?.trim();
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
  if (!user || !pass) {
    throw new MailNotConfiguredError("GMAIL_USER and GMAIL_APP_PASSWORD are not set");
  }
  return { user, pass };
}

export async function sendInquiry(inquiry: Inquiry, createTransport: CreateTransport): Promise<void> {
  const { user, pass } = readConfig();

  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  await transport.sendMail({
    // The visitor never controls `from`; only the reply target.
    from: { name: "ZeroBugg Website", address: user },
    to: INQUIRY_RECIPIENT,
    replyTo: { name: inquiry.name, address: inquiry.email },
    subject: buildSubject(inquiry),
    text: buildText(inquiry),
    html: buildHtml(inquiry),
  });
}
