import { business } from "@/content/business";

export interface WhatsAppMessageParams {
  goal?: string;
  sector?: string;
  area?: string;
  propertyType?: string;
  budget?: string;
  timeline?: string;
  customMessage?: string;
}

function getWhatsAppPhoneDigits(): string {
  const raw = process.env.NEXT_PUBLIC_PHONE ?? "+16478610008";
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `1${digits}`;
  return digits;
}

/** wa.me/message/ links don't support prefill — use phone-based URL with text instead. */
function withWhatsAppText(message: string): string {
  const baseUrl = business.whatsapp.url;

  if (baseUrl.includes("/message/")) {
    return `https://wa.me/${getWhatsAppPhoneDigits()}?text=${encodeURIComponent(message)}`;
  }

  const encoded = encodeURIComponent(message);
  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}text=${encoded}`;
}

export function getWhatsAppDefaultMessage(): string {
  return business.whatsapp.defaultMessage;
}

export function buildWhatsAppUrl(params?: WhatsAppMessageParams): string {
  if (!params) {
    return withWhatsAppText(getWhatsAppDefaultMessage());
  }

  if (params.customMessage) {
    return withWhatsAppText(params.customMessage);
  }

  const parts: string[] = ["Hi Jasmeet, I'd like to discuss my real estate goals."];
  if (params.goal) parts.push(`Goal: ${params.goal}`);
  if (params.sector) parts.push(`Sector: ${params.sector}`);
  if (params.area) parts.push(`Area: ${params.area}`);
  if (params.propertyType) parts.push(`Property type: ${params.propertyType}`);
  if (params.budget) parts.push(`Budget: ${params.budget}`);
  if (params.timeline) parts.push(`Timeline: ${params.timeline}`);

  return withWhatsAppText(parts.join("\n"));
}

export function getWhatsAppHref(message?: string): string {
  if (message) {
    return withWhatsAppText(message);
  }
  return withWhatsAppText(getWhatsAppDefaultMessage());
}
