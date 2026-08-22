export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

/** Header + mobile menu — Testimonials, FAQ, Contact are footer-only */
export const headerNav: (NavItem | NavGroup)[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Properties", href: "/properties" },
  {
    label: "Services",
    items: [
      { label: "Buyers", href: "/buyers", description: "Guidance for purchasing property" },
      { label: "Sellers", href: "/sellers", description: "Strategic selling support" },
      { label: "Leasing", href: "/leasing", description: "Residential and commercial leases" },
      { label: "Investments", href: "/investments", description: "Real estate investment perspective" },
      { label: "Residential", href: "/residential", description: "Homes, condos, townhomes" },
      { label: "Commercial", href: "/commercial", description: "Office, retail, industrial" },
    ],
  },
  { label: "Areas", href: "/areas" },
];

export const footerLinks = {
  services: [
    { label: "Residential", href: "/residential" },
    { label: "Commercial", href: "/commercial" },
    { label: "Buyers", href: "/buyers" },
    { label: "Sellers", href: "/sellers" },
    { label: "Leasing", href: "/leasing" },
    { label: "Investments", href: "/investments" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Properties", href: "/properties" },
    { label: "Areas Served", href: "/areas" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Disclaimer", href: "/terms" },
  ],
} as const;

export function isNavGroup(item: NavItem | NavGroup): item is NavGroup {
  return "items" in item;
}
