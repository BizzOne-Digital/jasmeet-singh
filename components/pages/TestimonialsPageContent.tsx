"use client";

import { useState, useMemo } from "react";
import { testimonials, testimonialCategories, type TestimonialCategory } from "@/content/testimonials";
import { images } from "@/content/pages";
import { PageHero } from "@/components/ui/PageHero";
import { AnimatedReveal } from "@/components/motion/AnimatedReveal";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { cn } from "@/lib/utils";

export function TestimonialsPageContent() {
  const [filter, setFilter] = useState<TestimonialCategory | "all">("all");

  const filtered = useMemo(() => {
    if (filter === "all") return testimonials;
    return testimonials.filter((t) => t.category === filter);
  }, [filter]);

  return (
    <>
      <PageHero
        eyebrow="CLIENT EXPERIENCES"
        title="Stories from clients"
        description="Client stories from buying, selling, leasing, and investment journeys across Ontario."
        image={images.hero.testimonials}
        imageAlt="Elegant interior — client experience"
        breadcrumbs={[{ label: "Testimonials" }]}
      />

      <section className="bg-warm-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap gap-2 border-b border-gold-border pb-6">
            {testimonialCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={cn(
                  "px-4 py-2 text-xs uppercase tracking-wider transition-colors",
                  filter === cat.id ? "bg-black text-white" : "text-muted-text hover:text-gold"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="mt-10 columns-1 gap-6 md:columns-2">
            {filtered.map((t) => (
              <AnimatedReveal key={t.id}>
                <blockquote className="mb-6 break-inside-avoid border border-gold-border bg-white p-8">
                  <p className="font-display text-xl italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="mt-4 text-sm text-muted-text">— {t.name}, {t.context}</footer>
                </blockquote>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
