import Link from "next/link";
import { testimonials } from "@/content/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedReveal } from "@/components/motion/AnimatedReveal";

export function ClientExperiencesPreview() {
  const preview = testimonials.slice(0, 2);

  return (
    <section className="bg-warm-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <AnimatedReveal>
          <SectionHeading
            eyebrow="CLIENT EXPERIENCES"
            title="What clients say"
            description="Honest feedback from clients across buying, selling, leasing, and investing throughout Ontario."
          />
        </AnimatedReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {preview.map((t) => (
            <AnimatedReveal key={t.id}>
              <blockquote className="border border-gold-border bg-white p-8 md:p-10">
                <p className="font-display text-xl italic leading-relaxed text-black/80 md:text-2xl">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-6 text-sm text-muted-text">
                  — {t.name}, {t.context}
                </footer>
              </blockquote>
            </AnimatedReveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/testimonials"
            className="text-sm uppercase tracking-wider text-gold transition-colors hover:text-bright-gold"
          >
            View all experiences →
          </Link>
        </div>
      </div>
    </section>
  );
}
