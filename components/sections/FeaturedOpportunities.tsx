import Link from "next/link";
import { ctaLabels } from "@/content/business";
import { getPublishedProperties } from "@/data/properties";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { AnimatedReveal } from "@/components/motion/AnimatedReveal";
import { PropertyCard } from "@/components/properties/PropertyCard";

export function FeaturedOpportunities() {
  const published = getPublishedProperties();

  return (
    <section className="bg-warm-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <AnimatedReveal>
          <SectionHeading
            eyebrow="OPPORTUNITIES"
            title="Featured properties"
            description="Current opportunities available by request."
          />
        </AnimatedReveal>

        {published.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {published.slice(0, 3).map((property) => (
              <PropertyCard key={property.slug} property={property} />
            ))}
          </div>
        ) : (
          <AnimatedReveal delay={0.1}>
            <div className="mt-12 border border-gold-border bg-white p-12 text-center md:p-16">
              <p className="font-display text-2xl text-black md:text-3xl">
                Current opportunities available by request
              </p>
              <p className="mx-auto mt-4 max-w-md text-muted-text">
                Verified property listings will appear here once supplied. In the meantime, reach out to discuss available opportunities across Ontario.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <WhatsAppCTA label={ctaLabels.whatsappProperty} />
                <Link
                  href="/properties"
                  className="inline-flex items-center border border-gold px-6 py-3 text-sm uppercase tracking-wider text-gold transition-colors hover:bg-gold/10"
                >
                  View properties page
                </Link>
              </div>
            </div>
          </AnimatedReveal>
        )}
      </div>
    </section>
  );
}
