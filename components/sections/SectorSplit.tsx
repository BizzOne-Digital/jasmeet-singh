"use client";

import Link from "next/link";
import Image from "next/image";
import { images } from "@/content/pages";
import { AnimatedReveal } from "@/components/motion/AnimatedReveal";

export function SectorSplit() {
  return (
    <section className="grid md:grid-cols-2">
      <AnimatedReveal className="group relative min-h-[400px] overflow-hidden bg-black">
        <Link href="/residential" className="block h-full">
          <Image
            src={images.split.residential}
            alt="Luxury residential interior — Ontario homes and condos"
            fill
            className="object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-50"
            sizes="50vw"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
            <span className="text-xs uppercase tracking-[0.2em] text-gold">Residential</span>
            <h3 className="mt-2 font-display text-3xl text-white md:text-4xl">
              Homes, condos, townhomes, and leases
            </h3>
            <span className="mt-4 inline-flex items-center gap-1 text-sm uppercase tracking-wider text-gold transition-all group-hover:gap-2">
              Explore residential →
            </span>
          </div>
        </Link>
      </AnimatedReveal>

      <AnimatedReveal delay={0.15} className="group relative min-h-[400px] overflow-hidden bg-charcoal">
        <Link href="/commercial" className="block h-full">
          <Image
            src={images.split.commercial}
            alt="Modern commercial architecture — Ontario business property"
            fill
            className="object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-50"
            sizes="50vw"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
            <span className="text-xs uppercase tracking-[0.2em] text-gold">Commercial</span>
            <h3 className="mt-2 font-display text-3xl text-white md:text-4xl">
              Acquisition, sale, lease, and investment
            </h3>
            <span className="mt-4 inline-flex items-center gap-1 text-sm uppercase tracking-wider text-gold transition-all group-hover:gap-2">
              Explore commercial →
            </span>
          </div>
        </Link>
      </AnimatedReveal>
    </section>
  );
}
