import { createPageMetadata } from "@/lib/metadata";
import { JourneyPage } from "@/components/pages/JourneyPage";
import { AffordabilityCalculator } from "@/components/sections/AffordabilityCalculator";
import { images } from "@/content/pages";
import { ctaLabels, legal } from "@/content/business";

export const metadata = createPageMetadata({
  title: "Buyer Services",
  description: "Structured guidance for buying residential and commercial property across Ontario — from search to closing.",
  path: "/buyers",
});

export default function BuyersPage() {
  return (
    <JourneyPage
      eyebrow="BUYERS"
      title="Buy with clarity and confidence"
      description="From defining your goals to closing on your new property — structured guidance for Ontario buyers."
      heroImage={images.hero.buyers}
      heroImageAlt="Modern living room interior — Ontario residential"
      breadcrumbLabel="Buyers"
      ctaLabel={ctaLabels.whatsappGeneral}
      steps={[
        { number: "01", title: "Define your goals", description: "Clarify what you're looking for — property type, location, budget, and timeline." },
        { number: "02", title: "Financing and pre-approval", description: "Connect with a mortgage professional to understand your purchasing power. Pre-approval strengthens your position when making offers." },
        { number: "03", title: "Market and property search", description: "Explore available properties aligned with your criteria across Ontario markets." },
        { number: "04", title: "Viewings and evaluation", description: "Tour properties, assess condition, location, and value relative to your goals." },
        { number: "05", title: "Offer and negotiation", description: "Develop an offer strategy considering market conditions, competition, and your priorities." },
        { number: "06", title: "Conditions and due diligence", description: "Navigate inspection, financing, and other conditions with structured support." },
        { number: "07", title: "Closing preparation", description: "Coordinate final steps — legal review, insurance, utilities, and key handover." },
      ]}
      extraSection={<AffordabilityCalculator />}
      disclaimer={legal.calculatorDisclaimer}
    />
  );
}
