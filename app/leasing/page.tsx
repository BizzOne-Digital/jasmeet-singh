import { createPageMetadata } from "@/lib/metadata";
import { JourneyPage } from "@/components/pages/JourneyPage";
import { images } from "@/content/pages";
import { ctaLabels } from "@/content/business";

export const metadata = createPageMetadata({
  title: "Leasing Services",
  description: "Residential and commercial leasing guidance for tenants, occupiers, landlords, and property owners across Ontario.",
  path: "/leasing",
});

export default function LeasingPage() {
  return (
    <JourneyPage
      eyebrow="LEASING"
      title="Lease with confidence"
      description="Guidance for both sides of the lease — tenants seeking space and landlords preparing properties."
      heroImage={images.hero.leasing}
      heroImageAlt="Modern apartment interior — Ontario leasing"
      breadcrumbLabel="Leasing"
      ctaLabel={ctaLabels.whatsappGeneral}
      steps={[
        { number: "01", title: "Tenants and occupiers", description: "Define your space requirements, budget, and timeline. Explore available residential and commercial lease opportunities." },
        { number: "02", title: "Landlords and property owners", description: "Prepare your property for lease, establish competitive terms, and navigate tenant selection." },
        { number: "03", title: "Residential leases", description: "Guidance on residential lease agreements, tenant rights, and landlord obligations in Ontario." },
        { number: "04", title: "Commercial leases", description: "Navigate commercial lease structures, terms, and negotiations for business occupiers and owners." },
        { number: "05", title: "Preparation checklist", description: "Property condition, documentation, and marketing materials needed before listing for lease." },
        { number: "06", title: "Documentation", description: "Review lease agreements and required disclosures. Consult legal counsel for lease-specific questions." },
      ]}
    />
  );
}
