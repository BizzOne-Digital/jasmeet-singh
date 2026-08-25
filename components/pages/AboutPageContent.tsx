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
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-end md:justify-start md:gap-3 lg:gap-5">
            <AnimatedReveal className="w-full md:w-auto md:shrink-0 md:-ml-2 lg:-ml-4">
              <div className="relative mx-auto md:mx-0">
                <Image
                  src="/images/jasmeet-portrait.png"
                  alt="Jasmeet Singh — Ontario real estate professional"
                  width={700}
                  height={1050}
                  className="h-auto w-full max-h-[min(72vh,670px)] object-contain object-bottom md:w-[min(58vw,630px)] md:max-h-[min(90vh,880px)] lg:w-[min(56vw,695px)] lg:max-h-[min(92vh,920px)]"
                  sizes="(max-width: 768px) 100vw, 630px"
                  priority
                />
              </div>
            </AnimatedReveal>

            <AnimatedReveal delay={0.1} className="w-full md:max-w-md md:-ml-4 md:-mt-10 lg:max-w-lg lg:-ml-8 lg:-mt-14">
              <div className="text-center md:pb-4 md:text-left lg:pb-6">
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
