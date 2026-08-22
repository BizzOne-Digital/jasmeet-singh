import { createPageMetadata } from "@/lib/metadata";
import { ServicePageLayout } from "@/components/pages/ServicePageLayout";
import { images } from "@/content/pages";
import { ctaLabels } from "@/content/business";

export const metadata = createPageMetadata({
  title: "Residential Real Estate",
  description:
    "Homes, condos, townhomes, and residential leases across Ontario. Strategic guidance for buying, selling, and leasing.",
  path: "/residential",
});

const sections = [
  {
    title: "Buying a home",
    description: "From first-time purchases to upsizing — structured search, evaluation, and offer strategy.",
    href: "/buyers",
  },
  {
    title: "Selling your property",
    description: "Preparation, positioning, and negotiation support for residential sales.",
    href: "/sellers",
  },
  {
    title: "Residential leasing",
    description: "Guidance for tenants and landlords navigating residential lease agreements.",
    href: "/leasing",
  },
];

const propertyTypes = [
  { name: "Detached homes", image: images.propertyTypes.house },
  { name: "Condominiums", image: images.propertyTypes.condo },
  { name: "Townhomes", image: images.propertyTypes.townhome },
];

export default function ResidentialPage() {
  return (
    <ServicePageLayout
      eyebrow="RESIDENTIAL"
      title="Homes and living spaces across Ontario"
      description="Aspirational guidance for buying, selling, and leasing residential property — from downtown condos to suburban family homes."
      heroImage={images.hero.residential}
      heroImageAlt="Luxury residential home exterior in Ontario"
      breadcrumbs={[{ label: "Residential" }]}
      ctaLabel={ctaLabels.whatsappGeneral}
      sections={sections}
      propertyTypes={propertyTypes}
      disclaimer="Property information must be independently verified. Availability and pricing may change."
    />
  );
}
