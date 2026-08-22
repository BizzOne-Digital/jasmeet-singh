import { createPageMetadata } from "@/lib/metadata";
import { JourneyPage } from "@/components/pages/JourneyPage";
import { images } from "@/content/pages";
import { ctaLabels } from "@/content/business";

export const metadata = createPageMetadata({
  title: "Seller Services",
  description: "Premium seller positioning — preparation, pricing strategy, marketing, and negotiation support across Ontario.",
  path: "/sellers",
});

export default function SellersPage() {
  return (
    <JourneyPage
      eyebrow="SELLERS"
      title="Sell with strategy and presentation"
      description="Premium positioning for your property — from preparation through negotiation to closing."
      heroImage={images.hero.sellers}
      heroImageAlt="Elegant home exterior — Ontario residential"
      breadcrumbLabel="Sellers"
      ctaLabel={ctaLabels.whatsappSelling}
      steps={[
        { number: "01", title: "Preparation and positioning", description: "Assess your property's strengths and identify improvements that enhance market appeal." },
        { number: "02", title: "Pricing strategy", description: "Analyze comparable properties and current market conditions to develop a pricing approach. No specific sale price is guaranteed." },
        { number: "03", title: "Marketing presentation", description: "Professional photography, compelling listing materials, and strategic exposure across channels." },
        { number: "04", title: "Showing strategy", description: "Coordinate viewings to present your property at its best while respecting your schedule." },
        { number: "05", title: "Offer review and negotiation", description: "Evaluate offers considering price, conditions, closing timeline, and buyer qualifications." },
        { number: "06", title: "Closing coordination", description: "Navigate conditions, legal requirements, and final steps through to completion." },
      ]}
    />
  );
}
