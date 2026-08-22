import { business } from "@/content/business";

export function getStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: business.name,
    description: `${business.brand} — ${business.tagline}`,
    url: business.siteUrl,
    telephone: business.phone.href.replace("tel:", ""),
    email: business.email.display,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Ontario",
    },
    sameAs: [business.instagram.url],
    parentOrganization: {
      "@type": "Organization",
      name: "HomeLife Miracle",
    },
    knowsAbout: [...business.services, ...business.sectors],
  };
}
