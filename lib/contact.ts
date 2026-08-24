export const contactServices = [
  "Buying a home",
  "Selling a property",
  "Leasing",
  "Investment",
  "Residential",
  "Commercial",
  "General inquiry",
] as const;

export type ContactService = (typeof contactServices)[number];

export interface ContactFormPayload {
  name: string;
  phone: string;
  email?: string;
  service: ContactService;
  message: string;
}
