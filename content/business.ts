/**
 * Central business configuration — update all contact details, social links,
 * brokerage wording, CTA labels, and legal disclosures from this file.
 */

export const business = {
  name: "Jasmeet Singh",
  brand: "Jasmeet Singh Real Estate",
  tagline: "Turning Dreams Into Addresses",
  brokerage: {
    display: "Brokerage — HomeLife Miracle",
  },
  phone: {
    display: "647-861-0008",
    tel: process.env.NEXT_PUBLIC_PHONE ?? "tel:+16478610008",
    href: `tel:${process.env.NEXT_PUBLIC_PHONE ?? "+16478610008"}`,
  },
  email: {
    display: process.env.NEXT_PUBLIC_EMAIL ?? "investwithjaschawla@gmail.com",
    href: `mailto:${process.env.NEXT_PUBLIC_EMAIL ?? "investwithjaschawla@gmail.com"}`,
  },
  whatsapp: {
    url: process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "https://wa.me/message/7PKVI5UK46YQI1",
    defaultMessage:
      "Hi Jasmeet, I'm interested in your real estate services. I'd like to speak with you.",
    label: "Chat on WhatsApp",
  },
  instagram: {
    url: "https://www.instagram.com/jasrealtor?igsh=NGViaWN6OHRxeXN5&utm_source=qr",
    handle: "@jasrealtor",
  },
  serviceArea: "Ontario-wide",
  services: ["Buy", "Sell", "Lease", "Invest"] as const,
  sectors: ["Residential", "Commercial"] as const,
  logo: {
    src: "/brand/jasmeet-singh-logo.png",
    alt: "Jasmeet Singh Realty",
    width: 1024,
    height: 361,
  },
  /** TODO: Replace with client-confirmed availability wording */
  availability:
    "[TODO: Insert confirmed availability and response-time wording from Jasmeet Singh.]",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://jasmeetsingh.ca",
} as const;

export const ctaLabels = {
  whatsappPrimary: "Start on WhatsApp",
  whatsappSecondary: "Message Jasmeet on WhatsApp",
  whatsappProperty: "Ask About a Property",
  whatsappDetails: "Request Property Details",
  whatsappSelling: "Talk About Selling",
  whatsappCommercial: "Explore Commercial Opportunities",
  whatsappInvestment: "Discuss an Investment Goal",
  whatsappGeneral: "Discuss Your Next Move",
  whatsappContinue: "Continue on WhatsApp",
  call: "Call Jasmeet",
  exploreServices: "Explore Services",
} as const;

export const legal = {
  /** TODO: Replace with client-approved privacy policy */
  privacyPolicy: `[TODO: Insert privacy policy text approved by Jasmeet Singh and legal counsel.

This placeholder outlines that personal information shared via phone, email, WhatsApp, or Instagram is used solely to respond to real estate inquiries. No data is collected through website forms as this site does not include contact forms.]`,

  /** TODO: Replace with client-approved terms and disclaimer */
  termsDisclaimer: `[TODO: Insert terms of use and website disclaimer approved by Jasmeet Singh and legal counsel.

General Information: Content on this website is for general informational purposes only and does not constitute legal, financial, tax, or investment advice. Property information must be independently verified. Availability and pricing may change without notice.]`,

  investmentDisclaimer:
    "Information on this page is general in nature and does not constitute financial, tax, legal, or investment advice. Past performance is not indicative of future results. Consult independent professionals before making investment decisions.",

  commercialDisclaimer:
    "Website content is general information. Professional legal, tax, financing, and inspection advice may be required for commercial transactions.",

  propertyDisclaimer:
    "Property details must be independently verified. Listings, availability, and pricing may change without notice.",

  calculatorDisclaimer:
    "Results are estimates only and do not constitute financial advice. Actual costs and affordability may vary.",
} as const;

export type BusinessConfig = typeof business;
export type CTALabels = typeof ctaLabels;
