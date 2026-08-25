"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Home, MessageCircle } from "lucide-react";
import { business, ctaLabels } from "@/content/business";
import { getWhatsAppHref } from "@/lib/whatsapp";
import { homeContent, images } from "@/content/pages";

function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-2" aria-hidden="true">
      <div className="relative h-9 w-5 rounded-full border border-gold/50">
        <motion.div
          className="absolute left-1/2 top-1.5 h-1.5 w-0.5 -translate-x-1/2 rounded-full bg-gold"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const { hero } = homeContent;

  return (
    <section ref={ref} className="relative flex min-h-[100svh] max-w-[100vw] items-center overflow-hidden bg-black">
      {/* Background image — house on right */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={prefersReducedMotion ? {} : { y, scale }}
      >
        <Image
          src={images.hero.home}
          alt="Luxury modern home at dusk with Toronto skyline — Ontario real estate"
          fill
          priority
          className="object-cover object-[70%_center] md:object-[right_center]"
          sizes="100vw"
        />
      </motion.div>

      {/* Left-heavy gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/20 md:from-black md:via-black/75 md:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* Content — left aligned, vertically centred */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-28 pt-28 sm:px-5 md:px-8 md:pb-24 md:pt-36">
        <div className="mt-6 max-w-2xl overflow-hidden sm:mt-8 md:mt-12">
          <motion.p
            className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold sm:mb-5 sm:text-[11px] sm:tracking-[0.25em] md:text-xs"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            className="font-display text-[clamp(2rem,8.5vw,5rem)] leading-[1.08] break-words"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="block text-white">{hero.headlineLine1}</span>
            <span className="block text-gold-gradient">{hero.headlineLine2}</span>
          </motion.h1>

          <motion.p
            className="mt-5 max-w-md text-base leading-relaxed text-white/80 md:text-lg"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Link
              href={getWhatsAppHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2.5 bg-gold-gradient px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-black transition-all hover:brightness-110 sm:w-auto sm:px-6 md:px-7 md:text-sm"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {ctaLabels.whatsappPrimary}
            </Link>
            <Link
              href="/properties"
              className="inline-flex w-full items-center justify-center border border-gold/70 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-gold transition-all hover:bg-gold/10 sm:w-auto sm:px-6 md:px-7 md:text-sm"
            >
              Explore Properties
            </Link>
          </motion.div>

          <motion.div
            className="mt-10 inline-flex items-center gap-2.5"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.5 }}
          >
            <Home className="h-4 w-4 text-gold" aria-hidden="true" />
            <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-gold sm:text-[11px] sm:tracking-[0.2em] md:text-xs">
              {hero.statusLabel}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — bottom centre */}
      <motion.div
        className="absolute bottom-[5.5rem] left-1/2 z-10 -translate-x-1/2 md:bottom-10"
        initial={prefersReducedMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <ScrollIndicator />
      </motion.div>
    </section>
  );
}
