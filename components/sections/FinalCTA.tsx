import Link from "next/link";
import { business, ctaLabels } from "@/content/business";
import { homeContent } from "@/content/pages";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { AnimatedReveal } from "@/components/motion/AnimatedReveal";

export function FinalCTA() {
  const { finalCta } = homeContent;

  return (
    <section className="relative overflow-hidden bg-black py-24 text-white md:py-32">
      <div className="absolute inset-0 bg-gold-gradient opacity-5" aria-hidden="true" />
      <div className="absolute left-0 top-0 h-full w-px bg-gold-gradient opacity-30" aria-hidden="true" />
      <div className="absolute right-0 top-0 h-full w-px bg-gold-gradient opacity-30" aria-hidden="true" />

      <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
        <AnimatedReveal>
          <h2 className="font-display text-3xl leading-tight md:text-5xl lg:text-6xl">
            {finalCta.headline}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
            {finalCta.description}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <WhatsAppCTA label={ctaLabels.whatsappSecondary} size="lg" />
            <Link
              href={business.phone.href}
              className="inline-flex items-center justify-center border border-white/30 px-8 py-4 text-sm font-medium uppercase tracking-wider text-white transition-all hover:border-gold hover:text-gold"
            >
              Call {business.phone.display}
            </Link>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
}
