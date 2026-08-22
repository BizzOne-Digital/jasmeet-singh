"use client";

import { useState, useMemo } from "react";
import { faqs, faqCategories, type FAQCategory } from "@/content/faq";
import { images } from "@/content/pages";
import { PageHero } from "@/components/ui/PageHero";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { AnimatedReveal } from "@/components/motion/AnimatedReveal";
import { cn } from "@/lib/utils";

export function FAQPageContent() {
  const [category, setCategory] = useState<FAQCategory | "all">("all");

  const filtered = useMemo(() => {
    if (category === "all") return faqs;
    return faqs.filter((f) => f.category === category);
  }, [category]);

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Clear answers to common questions about buying, selling, leasing, and investing in Ontario real estate."
        image={images.hero.faq}
        imageAlt="Modern home interior"
        breadcrumbs={[{ label: "FAQ" }]}
      />

      <section className="bg-warm-white py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="flex flex-wrap gap-2 border-b border-gold-border pb-6">
            <button
              onClick={() => setCategory("all")}
              className={cn(
                "px-3 py-1.5 text-xs uppercase tracking-wider transition-colors",
                category === "all" ? "bg-black text-white" : "text-muted-text hover:text-gold"
              )}
            >
              All
            </button>
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={cn(
                  "px-3 py-1.5 text-xs uppercase tracking-wider transition-colors",
                  category === cat.id ? "bg-black text-white" : "text-muted-text hover:text-gold"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <AnimatedReveal>
            <FAQAccordion items={filtered} className="mt-8" />
          </AnimatedReveal>

          <div className="mt-12 border border-gold-border bg-ivory p-8 text-center">
            <p className="font-display text-xl">Still have a question?</p>
            <div className="mt-4">
              <WhatsAppCTA label="Chat on WhatsApp" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
