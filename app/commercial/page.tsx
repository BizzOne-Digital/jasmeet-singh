import { createPageMetadata } from "@/lib/metadata";
import { ServicePageLayout } from "@/components/pages/ServicePageLayout";
import { images } from "@/content/pages";
import { ctaLabels, legal } from "@/content/business";

export const metadata = createPageMetadata({
  title: "Commercial Real Estate",
  description:
    "Office, retail, industrial, land, and mixed-use commercial property across Ontario. Acquisition, sale, lease, and investment.",
  path: "/commercial",
});

const sections = [
  {
    title: "Acquisition",
    description: "Identify and evaluate commercial properties aligned with your business objectives.",
    href: "/buyers",
  },
  {
    title: "Disposition",
    description: "Strategic positioning and marketing for commercial property sales.",
    href: "/sellers",
  },
  {
    title: "Commercial leasing",
    description: "Support for tenants, occupiers, landlords, and property owners.",
    href: "/leasing",
  },
  {
    title: "Investment opportunities",
    description: "Explore commercial assets with clear-eyed analysis of location, cash flow, and risk.",
    href: "/investments",
  },
];

const propertyTypes = [
  { name: "Office", image: images.propertyTypes.office },
  { name: "Retail", image: images.propertyTypes.retail },
  { name: "Industrial", image: images.propertyTypes.industrial },
];

export default function CommercialPage() {
  return (
    <ServicePageLayout
      eyebrow="COMMERCIAL"
      title="Business property with strategic clarity"
      description="Architecture-led guidance for commercial acquisition, sale, lease, and investment across Ontario's business corridors."
      heroImage={images.hero.commercial}
      heroImageAlt="Modern commercial office building"
      breadcrumbs={[{ label: "Commercial" }]}
      ctaLabel={ctaLabels.whatsappCommercial}
      sections={sections}
      propertyTypes={propertyTypes}
      disclaimer={legal.commercialDisclaimer}
    />
  );
}
