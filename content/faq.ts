export type FAQCategory =
  | "general"
  | "buying"
  | "selling"
  | "leasing"
  | "residential"
  | "commercial"
  | "investment"
  | "service";

export interface FAQItem {
  question: string;
  answer: string;
  category: FAQCategory;
}

export const faqCategories: { id: FAQCategory; label: string }[] = [
  { id: "general", label: "General" },
  { id: "buying", label: "Buying" },
  { id: "selling", label: "Selling" },
  { id: "leasing", label: "Leasing" },
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "investment", label: "Investment" },
  { id: "service", label: "Service Area & Communication" },
];

export const faqs: FAQItem[] = [
  {
    category: "general",
    question: "What areas does Jasmeet Singh serve?",
    answer:
      "Jasmeet serves clients Ontario-wide, supporting residential and commercial real estate needs across the province. Specific cities and regions can be discussed based on your goals.",
  },
  {
    category: "general",
    question: "What services are offered?",
    answer:
      "Core services include buying, selling, leasing, and investing in both residential and commercial property. Each service has a dedicated page with more detail on the process and approach.",
  },
  {
    category: "general",
    question: "How do I get started?",
    answer:
      "The easiest way to begin is through WhatsApp, phone, or email. Share your goals and timeline, and we'll discuss the best path forward for your situation.",
  },
  {
    category: "buying",
    question: "Do I need pre-approval before searching for a home?",
    answer:
      "Pre-approval or pre-qualification is strongly recommended before making offers. It helps clarify your budget and strengthens your position. Speak with a mortgage professional for guidance specific to your finances.",
  },
  {
    category: "buying",
    question: "What should I expect during the buying process?",
    answer:
      "The process typically includes defining goals, securing financing, searching and evaluating properties, making offers, fulfilling conditions, and preparing for closing. Timelines vary by transaction.",
  },
  {
    category: "buying",
    question: "Can Jasmeet help with both residential and commercial purchases?",
    answer:
      "Yes. Guidance is available for residential properties such as homes and condos, as well as commercial acquisitions including office, retail, and industrial spaces.",
  },
  {
    category: "selling",
    question: "How is a property priced for sale?",
    answer:
      "Pricing involves analyzing comparable properties, current market conditions, and your property's unique features. A pricing conversation focuses on strategy — no specific sale price is guaranteed.",
  },
  {
    category: "selling",
    question: "What preparation is recommended before listing?",
    answer:
      "Preparation may include decluttering, minor repairs, staging considerations, and professional photography. The specific plan depends on your property and goals.",
  },
  {
    category: "selling",
    question: "How can I discuss selling my property?",
    answer:
      "Reach out via WhatsApp or phone to arrange a private conversation about your property, timeline, and selling objectives.",
  },
  {
    category: "leasing",
    question: "Does Jasmeet assist both tenants and landlords?",
    answer:
      "Yes. Support is available for tenants and occupiers seeking leases, as well as landlords and property owners looking to lease residential or commercial space.",
  },
  {
    category: "leasing",
    question: "What documents are typically involved in a lease?",
    answer:
      "Leases generally include the agreement itself, disclosure documents, and any schedules specific to the property. Requirements vary — consult appropriate legal counsel for lease-specific questions.",
  },
  {
    category: "residential",
    question: "What types of residential properties are covered?",
    answer:
      "Homes, condominiums, townhomes, and residential lease opportunities across Ontario.",
  },
  {
    category: "commercial",
    question: "What commercial property types are supported?",
    answer:
      "Office, retail, industrial, land, and mixed-use properties for acquisition, sale, lease, and investment purposes.",
  },
  {
    category: "commercial",
    question: "Is professional advice needed for commercial transactions?",
    answer:
      "Commercial transactions often involve legal, tax, financing, and inspection considerations beyond residential deals. Independent professional advice is recommended.",
  },
  {
    category: "investment",
    question: "Does the website provide investment advice?",
    answer:
      "No. Investment content on this site is general information only. Consult independent financial, tax, legal, and lending professionals before making investment decisions.",
  },
  {
    category: "investment",
    question: "What factors should I consider for real estate investment?",
    answer:
      "Common considerations include location, cash flow potential, financing options, operating costs, vacancy risk, and long-term market trends. Each opportunity requires individual evaluation.",
  },
  {
    category: "service",
    question: "What is the best way to contact Jasmeet?",
    answer:
      "WhatsApp is the primary channel for quick conversations. You can also call 647-861-0008, email investwithjaschawla@gmail.com, or connect on Instagram @jasrealtor.",
  },
  {
    category: "service",
    question: "Is there a contact form on this website?",
    answer:
      "Yes. You can use the contact form on the Contact page to send an inquiry directly by email. You can also reach out on WhatsApp, phone, email, or Instagram for a faster response.",
  },
];
