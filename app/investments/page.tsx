import { createPageMetadata } from "@/lib/metadata";
import { JourneyPage } from "@/components/pages/JourneyPage";
import { images } from "@/content/pages";
import { ctaLabels, legal } from "@/content/business";

export const metadata = createPageMetadata({
  title: "Real Estate Investment",
  description: "Explore real estate investment opportunities across Ontario with general educational guidance on residential and commercial assets.",
  path: "/investments",
});

export default function InvestmentsPage() {
  return (
    <JourneyPage
      eyebrow="INVESTMENTS"
      title="Invest with perspective"
      description="Explore real estate investment opportunities with clear-eyed analysis — general guidance, not financial advice."
      heroImage={images.hero.investments}
      heroImageAlt="Property investment concept — Ontario real estate"
      breadcrumbLabel="Investments"
      ctaLabel={ctaLabels.whatsappInvestment}
      steps={[
        { number: "01", title: "Clarify investment goals", description: "Define your objectives — cash flow, appreciation, portfolio diversification, or specific asset types." },
        { number: "02", title: "Residential investment", description: "Consider rental income potential, vacancy risk, property management, and market dynamics for residential assets." },
        { number: "03", title: "Commercial investment", description: "Evaluate tenant quality, lease terms, operating costs, and cap rates for commercial properties." },
        { number: "04", title: "Key factors", description: "Location, financing options, operating costs, cash flow projections, and market risk require careful analysis." },
        { number: "05", title: "Due diligence", description: "Property inspection, financial review, legal title search, and environmental assessments as appropriate." },
        { number: "06", title: "Next steps", description: "Discuss specific opportunities and develop a strategy aligned with your investment profile." },
      ]}
      disclaimer={legal.investmentDisclaimer}
    />
  );
}
