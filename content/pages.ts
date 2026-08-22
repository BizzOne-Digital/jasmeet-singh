/** Central image configuration — replace URLs with client photography when available */

export const images = {
  hero: {
    home: "/images/hero-home.png",
    about: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80",
    properties: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
    residential: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    commercial: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80",
    buyers: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&q=80",
    sellers: "https://images.unsplash.com/photo-1605276374101-dee6a782ed87?w=1920&q=80",
    leasing: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1920&q=80",
    investments: "https://images.unsplash.com/photo-1560520653-9a0de9b89d2b?w=1920&q=80",
    areas: "https://images.unsplash.com/photo-1517935708355-2065223b9a69?w=1920&q=80",
    testimonials: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&q=80",
    faq: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
    contact: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80",
    legal: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
  },
  services: {
    buy: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    sell: "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&q=80",
    lease: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    invest: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
  },
  split: {
    residential: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
    commercial: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
  },
  propertyTypes: {
    condo: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
    house: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    townhome: "https://images.unsplash.com/photo-1605276374101-dee6a782ed87?w=600&q=80",
    office: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80",
    retail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
    industrial: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
  },
  /** TODO: Replace with professional portrait of Jasmeet Singh when provided */
  portrait: {
    src: "/images/placeholder-portrait.svg",
    alt: "[Placeholder] Professional portrait of Jasmeet Singh — replace with client photography",
  },
  keys: "https://images.unsplash.com/photo-1582407947309-fd86f028f716?w=800&q=80",
  closing: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
} as const;

export const homeContent = {
  hero: {
    eyebrow: "JASMEET SINGH • ONTARIO REAL ESTATE",
    headlineLine1: "Turning Dreams",
    headlineLine2: "Into Addresses.",
    subheadline: "Buy, sell, lease and invest across Ontario.",
    statusLabel: "Residential • Commercial • Ontario-wide",
  },
  services: [
    {
      number: "01",
      title: "Buy with clarity",
      description: "Navigate Ontario's market with a structured approach to search, evaluation, and offer strategy.",
      href: "/buyers",
      image: images.services.buy,
    },
    {
      number: "02",
      title: "Sell with strategy",
      description: "Position your property with thoughtful preparation, presentation, and negotiation support.",
      href: "/sellers",
      image: images.services.sell,
    },
    {
      number: "03",
      title: "Lease with confidence",
      description: "Residential and commercial leasing guidance for tenants, occupiers, landlords, and owners.",
      href: "/leasing",
      image: images.services.lease,
    },
    {
      number: "04",
      title: "Invest with perspective",
      description: "Explore investment opportunities with clear-eyed analysis of location, cash flow, and risk.",
      href: "/investments",
      image: images.services.invest,
    },
  ],
  valuePillars: [
    {
      number: "01",
      title: "Clear, responsive communication",
      description: "Direct access and timely updates throughout your real estate journey.",
    },
    {
      number: "02",
      title: "Residential and commercial perspective",
      description: "Guidance across homes, condos, and business property opportunities.",
    },
    {
      number: "03",
      title: "Strategy tailored to each goal",
      description: "Every transaction receives a plan shaped by your timeline, budget, and objectives.",
    },
    {
      number: "04",
      title: "Ontario-wide service",
      description: "Serving clients across the province with local market insight where you need it.",
    },
  ],
  process: [
    { step: "01", title: "Share your goals", description: "Tell us what you're looking to achieve — buy, sell, lease, or invest." },
    { step: "02", title: "Build the strategy", description: "We develop a clear plan aligned with your timeline and priorities." },
    { step: "03", title: "Explore or position", description: "Search opportunities or prepare your property for the market." },
    { step: "04", title: "Negotiate and close", description: "Navigate offers, conditions, and closing with structured support." },
  ],
  finalCta: {
    headline: "Your next move starts with a conversation.",
    description:
      "Whether you're buying your first home, selling a property, exploring a lease, or evaluating an investment — let's discuss your goals.",
  },
} as const;
