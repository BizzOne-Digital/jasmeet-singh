"use client";

import NextLink from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { homeContent } from "@/content/pages";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedReveal } from "@/components/motion/AnimatedReveal";

export function SignatureServices() {
  return (
    <section className="bg-warm-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <AnimatedReveal>
          <SectionHeading
            eyebrow="SERVICES"
            title="How can we help you move forward?"
            description="Four pathways, one strategic approach — tailored to your goals across Ontario."
          />
        </AnimatedReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {homeContent.services.map((service, i) => (
            <AnimatedReveal key={service.href} delay={i * 0.1}>
              <NextLink
                href={service.href}
                className="group relative flex flex-col overflow-hidden border border-gold-border bg-white transition-all duration-500 hover:border-gold hover:shadow-xl md:flex-row"
              >
                <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:w-2/5">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <span className="absolute left-4 top-4 font-display text-4xl text-white/30">
                    {service.number}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
                  <h3 className="font-display text-2xl md:text-3xl">{service.title}</h3>
                  <p className="mt-3 text-muted-text leading-relaxed">{service.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium uppercase tracking-wider text-gold transition-all group-hover:gap-2">
                    Explore
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </NextLink>
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
