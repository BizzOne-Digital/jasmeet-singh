import { createPageMetadata } from "@/lib/metadata";
import { legal } from "@/content/business";
import { images } from "@/content/pages";
import { PageHero } from "@/components/ui/PageHero";

export const metadata = createPageMetadata({
  title: "Terms & Disclaimer",
  description: "Terms of use and website disclaimer for Jasmeet Singh Real Estate.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL"
        title="Terms & Website Disclaimer"
        description="Important information about using this website and its content."
        image={images.hero.legal}
        imageAlt="Modern interior — terms and disclaimer"
        breadcrumbs={[{ label: "Terms & Disclaimer" }]}
        compact
        align="center"
      />
      <div className="bg-warm-white py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="whitespace-pre-line leading-relaxed text-muted-text">
            {legal.termsDisclaimer}
          </div>
        </div>
      </div>
    </>
  );
}
