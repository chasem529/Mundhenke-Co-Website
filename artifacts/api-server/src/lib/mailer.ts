// Resend integration — uses the Replit Connectors SDK to authenticate.
// See connection: connection:conn_resend_*
import { ReplitConnectors } from "@replit/connectors-sdk";
import { logger } from "./logger";

const connectors = new ReplitConnectors();

// Replace with a verified domain sender (e.g. "hello@mundhenke.co") once
// the domain is verified in the Resend dashboard.
const DEFAULT_FROM = "Mundhenke Inquiries <onboarding@resend.dev>";
const INQUIRY_RECIPIENT = "chase@mundhenke.co";

interface ContactNotificationPayload {
  name: string;
  email: string;
  business?: string | null;
  businessType?: string | null;
  projectType?: string | null;
  message: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildHtml(p: ContactNotificationPayload): string {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:8px 12px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;width:140px;vertical-align:top;">${label}</td>
      <td style="padding:8px 12px;color:#111827;font-size:14px;">${value}</td>
    </tr>`;

  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f9fafb;">
      <h2 style="font-family:Georgia,serif;color:#111827;margin:0 0 16px;">New inquiry from the Mundhenke site</h2>
      <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #e5e7eb;border-radius:6px;">
        ${row("Name", escapeHtml(p.name))}
        ${row("Email", `<a href="mailto:${escapeHtml(p.email)}">${escapeHtml(p.email)}</a>`)}
        ${p.business ? row("Business", escapeHtml(p.business)) : ""}
        ${p.businessType ? row("Type", escapeHtml(p.businessType)) : ""}
        ${p.projectType ? row("Looking For", escapeHtml(p.projectType)) : ""}
        ${row("Message", escapeHtml(p.message).replace(/\n/g, "<br/>"))}
      </table>
      <p style="color:#9ca3af;font-size:12px;margin-top:16px;">Reply directly to this email to respond to ${escapeHtml(p.name)}.</p>
    </div>`;
}

function buildText(p: ContactNotificationPayload): string {
  const lines = [
    `New inquiry from the Mundhenke site`,
    ``,
    `Name: ${p.name}`,
    `Email: ${p.email}`,
  ];
  if (p.business) lines.push(`Business: ${p.business}`);
  if (p.businessType) lines.push(`Type: ${p.businessType}`);
  if (p.projectType) lines.push(`Looking For: ${p.projectType}`);
  lines.push(``, `Message:`, p.message);
  return lines.join("\n");
}

export async function sendContactNotification(
  payload: ContactNotificationPayload,
): Promise<void> {
  const subject = `New inquiry — ${payload.name}${payload.business ? ` (${payload.business})` : ""}`;

  const response = await connectors.proxy("resend", "/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      from: DEFAULT_FROM,
      to: [INQUIRY_RECIPIENT],
      reply_to: payload.email,
      subject,
      html: buildHtml(payload),
      text: buildText(payload),
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    logger.error({ status: response.status, body }, "Resend send failed");
    throw new Error(`Resend responded with ${response.status}`);
  }
}
