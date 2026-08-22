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

export function buildWhatsAppUrl(params?: WhatsAppMessageParams): string {
  const baseUrl = business.whatsapp.url;

  if (!params) return baseUrl;

  const parts: string[] = [];

  if (params.customMessage) {
    parts.push(params.customMessage);
  } else {
    parts.push("Hi Jasmeet, I'd like to discuss my real estate goals.");
    if (params.goal) parts.push(`Goal: ${params.goal}`);
    if (params.sector) parts.push(`Sector: ${params.sector}`);
    if (params.area) parts.push(`Area: ${params.area}`);
    if (params.propertyType) parts.push(`Property type: ${params.propertyType}`);
    if (params.budget) parts.push(`Budget: ${params.budget}`);
    if (params.timeline) parts.push(`Timeline: ${params.timeline}`);
  }

  const message = parts.join("\n");

  // wa.me/message/ links don't support text param — append only for standard wa.me/number links
  if (baseUrl.includes("/message/")) {
    return baseUrl;
  }

  const encoded = encodeURIComponent(message);
  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}text=${encoded}`;
}

export function getWhatsAppHref(message?: string): string {
  if (message) {
    return buildWhatsAppUrl({ customMessage: message });
  }
  return business.whatsapp.url;
}
