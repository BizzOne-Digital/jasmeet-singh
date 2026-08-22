import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { AnimatedReveal } from "@/components/motion/AnimatedReveal";
import { FinalCTA } from "@/components/sections/FinalCTA";

interface JourneyStep {
  number: string;
  title: string;
  description: string;
}

interface JourneyPageProps {
  eyebrow: string;
  title: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
  breadcrumbLabel: string;
  ctaLabel: string;
  steps: JourneyStep[];
  extraSection?: React.ReactNode;
  disclaimer?: string;
}

export function JourneyPage({
  eyebrow,
  title,
  description,
  heroImage,
  heroImageAlt,
  breadcrumbLabel,
  ctaLabel,
  steps,
  extraSection,
  disclaimer,
}: JourneyPageProps) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        image={heroImage}
        imageAlt={heroImageAlt}
        breadcrumbs={[{ label: breadcrumbLabel }]}
      >
        <WhatsAppCTA label={ctaLabel} />
      </PageHero>

      <section className="bg-warm-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <AnimatedReveal>
            <SectionHeading eyebrow="YOUR JOURNEY" title="Step by step" description="A structured approach to guide you through each stage." />
          </AnimatedReveal>
          <div className="mt-12 space-y-0">
            {steps.map((step, i) => (
              <AnimatedReveal key={step.number} delay={i * 0.08}>
                <div className="grid gap-4 border-t border-gold-border py-8 md:grid-cols-[80px_1fr] md:gap-8">
                  <span className="font-display text-3xl text-gold/40">{step.number}</span>
                  <div>
                    <h3 className="font-display text-xl md:text-2xl">{step.title}</h3>
                    <p className="mt-2 text-muted-text leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </section>

      {extraSection}

      {disclaimer && (
        <section className="bg-ivory py-8">
          <div className="mx-auto max-w-3xl px-5 text-center text-xs text-muted-text md:px-8">
            {disclaimer}
          </div>
        </section>
      )}

      <FinalCTA />
    </>
  );
}
