"use client";

import Image from "next/image";
import Link from "next/link";
import { aboutContent } from "@/content/about";
import { business, ctaLabels } from "@/content/business";
import { images } from "@/content/pages";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { BrandMarquee } from "@/components/sections/BrandMarquee";
import { AnimatedReveal } from "@/components/motion/AnimatedReveal";
import { FinalCTA } from "@/components/sections/FinalCTA";

export function AboutPageContent() {
  return (
    <>
      <PageHero
        eyebrow={aboutContent.hero.eyebrow}
        title={aboutContent.hero.headline}
        description={aboutContent.hero.subheadline}
        image={images.hero.about}
        imageAlt="Real estate keys and property — Ontario"
        breadcrumbs={[{ label: "About" }]}
        compact
      />

      <section className="bg-warm-white pb-16 pt-6 md:pb-24 md:pt-8">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid items-start gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
            <AnimatedReveal>
              <div className="relative mx-auto w-full max-w-sm md:mx-0 md:max-w-none">
                <Image
                  src="/images/jasmeet-portrait.png"
                  alt="Jasmeet Singh — Ontario real estate professional"
                  width={600}
                  height={900}
                  className="h-auto w-full max-h-[min(58vh,520px)] object-contain object-bottom"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </AnimatedReveal>

            <AnimatedReveal delay={0.1}>
              <div className="text-center md:text-left">
                <span className="font-display text-[clamp(3rem,8vw,6rem)] leading-none text-black">
                  JASMEET
                </span>
                <GoldDivider className="mx-auto my-6 md:mx-0" />
                <p className="text-lg leading-relaxed text-muted-text md:text-xl">
                  {aboutContent.intro.biography}
                </p>
              </div>
            </AnimatedReveal>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <AnimatedReveal>
            <SectionHeading title={aboutContent.approach.title} />
          </AnimatedReveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {aboutContent.approach.points.map((point, i) => (
              <AnimatedReveal key={point.title} delay={i * 0.1}>
                <div className="border-t border-gold-border pt-6">
                  <span className="text-xs uppercase tracking-wider text-gold">0{i + 1}</span>
                  <h3 className="mt-2 font-display text-2xl">{point.title}</h3>
                  <p className="mt-3 text-muted-text">{point.description}</p>
                </div>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <AnimatedReveal>
            <SectionHeading title={aboutContent.expertise.title} dark align="center" />
          </AnimatedReveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <AnimatedReveal>
              <div className="border border-gold-border p-8">
                <h3 className="font-display text-2xl text-gold">Residential</h3>
                <p className="mt-4 text-white/70">{aboutContent.expertise.residential}</p>
                <Link href="/residential" className="mt-4 inline-block text-sm uppercase tracking-wider text-gold hover:text-bright-gold">
                  Explore residential →
                </Link>
              </div>
            </AnimatedReveal>
            <AnimatedReveal delay={0.1}>
              <div className="border border-gold-border p-8">
                <h3 className="font-display text-2xl text-gold">Commercial</h3>
                <p className="mt-4 text-white/70">{aboutContent.expertise.commercial}</p>
                <Link href="/commercial" className="mt-4 inline-block text-sm uppercase tracking-wider text-gold hover:text-bright-gold">
                  Explore commercial →
                </Link>
              </div>
            </AnimatedReveal>
          </div>
        </div>
      </section>

      <BrandMarquee />

      <section className="bg-warm-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <AnimatedReveal>
            <SectionHeading title={aboutContent.principles.title} align="center" />
            <ul className="mt-8 space-y-4">
              {aboutContent.principles.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-muted-text">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </AnimatedReveal>
          <div className="mt-10 text-center">
            <p className="text-sm text-muted-text">{business.brokerage.display}</p>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16 text-center">
        <AnimatedReveal>
          <p className="text-sm uppercase tracking-wider text-muted-text">Follow on Instagram</p>
          <Link
            href={business.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block font-display text-2xl text-gold hover:text-bright-gold"
          >
            {business.instagram.handle}
          </Link>
          <div className="mt-6">
            <WhatsAppCTA label={ctaLabels.whatsappSecondary} />
          </div>
        </AnimatedReveal>
      </section>

      <FinalCTA />
    </>
  );
}
