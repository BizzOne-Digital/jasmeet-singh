import { homeContent } from "@/content/pages";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { AnimatedReveal } from "@/components/motion/AnimatedReveal";

export function ValuePillars() {
  return (
    <section className="bg-black py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <AnimatedReveal>
          <SectionHeading
            eyebrow="WHY JASMEET"
            title="Why work with Jasmeet?"
            dark
            align="center"
          />
        </AnimatedReveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {homeContent.valuePillars.map((pillar, i) => (
            <AnimatedReveal key={pillar.number} delay={i * 0.1}>
              <div className="border-t border-gold-border pt-6">
                <span className="font-display text-3xl text-gold/40">{pillar.number}</span>
                <GoldDivider className="my-4" width="w-8" />
                <h3 className="font-display text-xl">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{pillar.description}</p>
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
