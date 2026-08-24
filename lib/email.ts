import nodemailer from "nodemailer";
import type { ContactFormPayload } from "@/lib/contact";
import type { PropertyFinderPayload } from "@/lib/property-finder";
import { buildPropertyFinderWhatsAppMessage } from "@/lib/property-finder";

function getSmtpConfig() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const host = process.env.SMTP_HOST ?? "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT ?? "587");
  const to = process.env.CONTACT_TO_EMAIL ?? user;

  if (!user || !pass || !to) {
    throw new Error("SMTP is not configured. Set SMTP_USER, SMTP_PASS, and CONTACT_TO_EMAIL.");
  }

  return { user, pass, host, port, to };
}

export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `1${digits}`;
  return digits;
}

export function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone;
}

function buildWhatsAppUrl(phone: string, message: string): string {
  const normalized = normalizePhone(phone);
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildContactEmailHtml(payload: ContactFormPayload): string {
  const phoneDisplay = formatPhoneDisplay(payload.phone);
  const normalizedPhone = normalizePhone(payload.phone);
  const suggestedMessage = `Hi ${payload.name}, I'm Jasmeet from Jasmeet Singh Real Estate. I'm reaching out about the ${payload.service.toLowerCase()} inquiry you sent through my website.`;
  const whatsappUrl = buildWhatsAppUrl(payload.phone, suggestedMessage);

  return `
    <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6; max-width: 640px;">
      <h2 style="margin: 0 0 16px; color: #111;">New website inquiry</h2>
      <p style="margin: 0 0 20px;">Someone submitted the contact form on your website.</p>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; width: 140px;">Name</td>
          <td style="padding: 8px 0;">${escapeHtml(payload.name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Phone / WhatsApp</td>
          <td style="padding: 8px 0;">
            <a href="tel:+${normalizedPhone}" style="color: #8e6b2e; text-decoration: none;">${escapeHtml(phoneDisplay)}</a>
          </td>
        </tr>
        ${
          payload.email
            ? `<tr>
          <td style="padding: 8px 0; font-weight: bold;">Email</td>
          <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(payload.email)}" style="color: #8e6b2e; text-decoration: none;">${escapeHtml(payload.email)}</a></td>
        </tr>`
            : ""
        }
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Service</td>
          <td style="padding: 8px 0;">${escapeHtml(payload.service)}</td>
        </tr>
      </table>

      <div style="margin: 24px 0; padding: 16px; background: #fbfaf7; border-left: 4px solid #c8a45a;">
        <p style="margin: 0 0 8px; font-weight: bold;">Message</p>
        <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(payload.message)}</p>
      </div>

      <div style="margin: 24px 0; padding: 16px; background: #111; color: #fff;">
        <p style="margin: 0 0 12px; font-weight: bold; color: #c8a45a;">Quick reply on WhatsApp</p>
        <p style="margin: 0 0 16px; color: #fff;">Suggested message:</p>
        <p style="margin: 0 0 16px; color: #fff; white-space: pre-wrap;">${escapeHtml(suggestedMessage)}</p>
        <a href="${whatsappUrl}" style="display: inline-block; padding: 12px 18px; background: #c8a45a; color: #111; text-decoration: none; font-weight: bold;">
          Open WhatsApp chat
        </a>
      </div>
    </div>
  `;
}

export function buildContactEmailText(payload: ContactFormPayload): string {
  const phoneDisplay = formatPhoneDisplay(payload.phone);
  const suggestedMessage = `Hi ${payload.name}, I'm Jasmeet from Jasmeet Singh Real Estate. I'm reaching out about the ${payload.service.toLowerCase()} inquiry you sent through my website.`;

  return [
    "New website inquiry",
    "",
    `Name: ${payload.name}`,
    `Phone / WhatsApp: ${phoneDisplay}`,
    payload.email ? `Email: ${payload.email}` : null,
    `Service: ${payload.service}`,
    "",
    "Message:",
    payload.message,
    "",
    "Suggested WhatsApp reply:",
    suggestedMessage,
    "",
    `WhatsApp: https://wa.me/${normalizePhone(payload.phone)}?text=${encodeURIComponent(suggestedMessage)}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function sendContactEmail(payload: ContactFormPayload) {
  const { user, pass, host, port, to } = getSmtpConfig();

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const subject = `New inquiry: ${payload.service} — ${payload.name}`;

  await transporter.sendMail({
    from: `"Jasmeet Singh Real Estate" <${user}>`,
    to,
    replyTo: payload.email || undefined,
    subject,
    text: buildContactEmailText(payload),
    html: buildContactEmailHtml(payload),
  });
}

function formatSelectionLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
}

export function buildPropertyFinderEmailHtml(payload: PropertyFinderPayload): string {
  const phoneDisplay = formatPhoneDisplay(payload.phone);
  const normalizedPhone = normalizePhone(payload.phone);
  const whatsappMessage = buildPropertyFinderWhatsAppMessage(payload.name, payload.selections);
  const whatsappUrl = buildWhatsAppUrl(payload.phone, whatsappMessage);

  const selectionRows = Object.entries(payload.selections)
    .filter(([, value]) => value)
    .map(
      ([key, value]) => `
        <tr>
          <td style="padding: 8px 0; font-weight: bold; width: 160px;">${escapeHtml(formatSelectionLabel(key))}</td>
          <td style="padding: 8px 0;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  return `
    <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6; max-width: 640px;">
      <h2 style="margin: 0 0 16px; color: #111;">New Property Finder inquiry</h2>
      <p style="margin: 0 0 20px;">Someone completed the Property Finder on your website.</p>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; width: 160px;">Name</td>
          <td style="padding: 8px 0;">${escapeHtml(payload.name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">WhatsApp number</td>
          <td style="padding: 8px 0;">
            <a href="tel:+${normalizedPhone}" style="color: #8e6b2e; text-decoration: none;">${escapeHtml(phoneDisplay)}</a>
          </td>
        </tr>
        ${
          payload.email
            ? `<tr>
          <td style="padding: 8px 0; font-weight: bold;">Email</td>
          <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(payload.email)}" style="color: #8e6b2e; text-decoration: none;">${escapeHtml(payload.email)}</a></td>
        </tr>`
            : ""
        }
      </table>

      <div style="margin: 24px 0; padding: 16px; background: #fbfaf7; border-left: 4px solid #c8a45a;">
        <p style="margin: 0 0 12px; font-weight: bold;">Property preferences</p>
        <table style="width: 100%; border-collapse: collapse;">
          ${selectionRows}
        </table>
      </div>

      <div style="margin: 24px 0; padding: 16px; background: #111; color: #fff;">
        <p style="margin: 0 0 12px; font-weight: bold; color: #c8a45a;">Chat on WhatsApp</p>
        <p style="margin: 0 0 16px; color: #fff;">Pre-filled message:</p>
        <p style="margin: 0 0 16px; color: #fff; white-space: pre-wrap;">${escapeHtml(whatsappMessage)}</p>
        <a href="${whatsappUrl}" style="display: inline-block; padding: 12px 18px; background: #c8a45a; color: #111; text-decoration: none; font-weight: bold;">
          Chat on WhatsApp
        </a>
      </div>
    </div>
  `;
}

export function buildPropertyFinderEmailText(payload: PropertyFinderPayload): string {
  const phoneDisplay = formatPhoneDisplay(payload.phone);
  const whatsappMessage = buildPropertyFinderWhatsAppMessage(payload.name, payload.selections);

  const selectionLines = Object.entries(payload.selections)
    .filter(([, value]) => value)
    .map(([key, value]) => `${formatSelectionLabel(key)}: ${value}`);

  return [
    "New Property Finder inquiry",
    "",
    `Name: ${payload.name}`,
    `WhatsApp number: ${phoneDisplay}`,
    payload.email ? `Email: ${payload.email}` : null,
    "",
    "Property preferences:",
    ...selectionLines,
    "",
    "Pre-filled WhatsApp message:",
    whatsappMessage,
    "",
    `WhatsApp: https://wa.me/${normalizePhone(payload.phone)}?text=${encodeURIComponent(whatsappMessage)}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function sendPropertyFinderEmail(payload: PropertyFinderPayload) {
  const { user, pass, host, port, to } = getSmtpConfig();

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const subject = `Property Finder: ${payload.selections.goal || "Inquiry"} — ${payload.name}`;

  await transporter.sendMail({
    from: `"Jasmeet Singh Real Estate" <${user}>`,
    to,
    replyTo: payload.email || undefined,
    subject,
    text: buildPropertyFinderEmailText(payload),
    html: buildPropertyFinderEmailHtml(payload),
  });
}
