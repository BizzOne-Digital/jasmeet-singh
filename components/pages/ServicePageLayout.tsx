import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { AnimatedReveal } from "@/components/motion/AnimatedReveal";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { business } from "@/content/business";

interface ServiceSection {
  title: string;
  description: string;
  href: string;
}

interface PropertyType {
  name: string;
  image: string;
}

interface ServicePageLayoutProps {
  eyebrow: string;
  title: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
  breadcrumbs: { label: string; href?: string }[];
  ctaLabel: string;
  sections: ServiceSection[];
  propertyTypes?: PropertyType[];
  disclaimer?: string;
}

export function ServicePageLayout({
  eyebrow,
  title,
  description,
  heroImage,
  heroImageAlt,
  breadcrumbs,
  ctaLabel,
  sections,
  propertyTypes,
  disclaimer,
}: ServicePageLayoutProps) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        image={heroImage}
        imageAlt={heroImageAlt}
        breadcrumbs={breadcrumbs}
      >
        <WhatsAppCTA label={ctaLabel} />
      </PageHero>

      <section className="bg-warm-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <AnimatedReveal>
            <SectionHeading eyebrow="PATHWAYS" title="How we can help" />
          </AnimatedReveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {sections.map((section, i) => (
              <AnimatedReveal key={section.title} delay={i * 0.1}>
                <Link href={section.href} className="group block border border-gold-border p-8 transition-all hover:border-gold hover:shadow-lg">
                  <span className="text-xs uppercase tracking-wider text-gold">0{i + 1}</span>
                  <h3 className="mt-2 font-display text-2xl">{section.title}</h3>
                  <p className="mt-3 text-muted-text">{section.description}</p>
                  <span className="mt-4 inline-block text-sm uppercase tracking-wider text-gold group-hover:underline">Learn more →</span>
                </Link>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </section>

      {propertyTypes && (
        <section className="bg-ivory py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <AnimatedReveal>
              <SectionHeading eyebrow="PROPERTY TYPES" title="What we cover" align="center" />
            </AnimatedReveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {propertyTypes.map((type) => (
                <AnimatedReveal key={type.name}>
                  <div className="group relative aspect-[4/5] overflow-hidden">
                    <Image src={type.image} alt={type.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <h3 className="absolute bottom-6 left-6 font-display text-2xl text-white">{type.name}</h3>
                  </div>
                </AnimatedReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-black py-16 text-center text-white">
        <AnimatedReveal>
          <p className="text-sm uppercase tracking-wider text-gold">Ontario-wide service</p>
          <p className="mt-2 font-display text-2xl">Serving clients across {business.serviceArea}</p>
          <div className="mt-6">
            <WhatsAppCTA label={ctaLabel} />
          </div>
          {disclaimer && (
            <p className="mx-auto mt-8 max-w-2xl text-xs text-white/40">{disclaimer}</p>
          )}
        </AnimatedReveal>
      </section>

      <FinalCTA />
    </>
  );
}
