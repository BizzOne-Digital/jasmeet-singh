"use client";

import { motion, useReducedMotion } from "framer-motion";
import { homeContent } from "@/content/pages";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedReveal } from "@/components/motion/AnimatedReveal";

export function ProcessTimeline() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <AnimatedReveal>
          <SectionHeading
            eyebrow="PROCESS"
            title="How we work together"
            description="A clear, structured approach from first conversation to closing."
            align="center"
          />
        </AnimatedReveal>

        <div className="relative mt-16">
          {/* Gold progress line */}
          <motion.div
            className="absolute left-0 top-8 hidden h-0.5 bg-gold-gradient md:block"
            style={{ right: 0 }}
            initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="grid gap-10 md:grid-cols-4 md:gap-6">
            {homeContent.process.map((item, i) => (
              <AnimatedReveal key={item.step} delay={i * 0.15}>
                <div className="relative text-center md:text-left">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center border border-gold bg-white font-display text-xl text-gold md:mx-0">
                    {item.step}
                  </div>
                  <h3 className="font-display text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-text">{item.description}</p>
                </div>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
