import { createPageMetadata } from "@/lib/metadata";
import { HomeHero } from "@/components/sections/HomeHero";
import { BrandMarquee } from "@/components/sections/BrandMarquee";
import { SignatureServices } from "@/components/sections/SignatureServices";
import { SectorSplit } from "@/components/sections/SectorSplit";
import { PropertyFinder } from "@/components/sections/PropertyFinder";
import { ValuePillars } from "@/components/sections/ValuePillars";
import { FeaturedOpportunities } from "@/components/sections/FeaturedOpportunities";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { OntarioCoverage } from "@/components/sections/OntarioCoverage";
import { ClientExperiencesPreview } from "@/components/sections/ClientExperiencesPreview";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata = createPageMetadata({
  title: "Home",
  description:
    "Jasmeet Singh Real Estate — Turning Dreams Into Addresses. Strategic guidance for buying, selling, leasing, and investing across Ontario.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <BrandMarquee />
      <SignatureServices />
      <SectorSplit />
      <PropertyFinder />
      <ValuePillars />
      <FeaturedOpportunities />
      <ProcessTimeline />
      <OntarioCoverage />
      <ClientExperiencesPreview />
      <FinalCTA />
    </>
  );
}
