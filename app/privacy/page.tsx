import { createPageMetadata } from "@/lib/metadata";
import { legal } from "@/content/business";
import { images } from "@/content/pages";
import { PageHero } from "@/components/ui/PageHero";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for Jasmeet Singh Real Estate website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL"
        title="Privacy Policy"
        description="How your information is handled when you connect with Jasmeet Singh Real Estate."
        image={images.hero.legal}
        imageAlt="Modern interior — privacy policy"
        breadcrumbs={[{ label: "Privacy Policy" }]}
        compact
        align="center"
      />
      <div className="bg-warm-white py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="whitespace-pre-line leading-relaxed text-muted-text">
            {legal.privacyPolicy}
          </div>
        </div>
      </div>
    </>
  );
}
