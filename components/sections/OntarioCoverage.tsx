import Link from "next/link";
import { business } from "@/content/business";
import { serviceAreas } from "@/data/areas";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedReveal } from "@/components/motion/AnimatedReveal";

export function OntarioCoverage() {
  return (
    <section className="relative overflow-hidden bg-black py-20 text-white md:py-28">
      {/* Abstract map treatment */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <svg viewBox="0 0 800 600" className="h-full w-full" fill="none">
          <path
            d="M200 100 L350 80 L500 120 L600 200 L550 350 L400 450 L250 400 L150 250 Z"
            stroke="#C8A45A"
            strokeWidth="1"
            fill="rgba(200,164,90,0.05)"
          />
          <circle cx="400" cy="280" r="4" fill="#C8A45A" />
          <circle cx="350" cy="200" r="3" fill="#C8A45A" />
          <circle cx="500" cy="250" r="3" fill="#C8A45A" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <AnimatedReveal>
          <SectionHeading
            eyebrow="COVERAGE"
            title={`Serving ${business.serviceArea}`}
            description="Strategic real estate guidance across Ontario's diverse markets — from urban cores to growing communities."
            dark
            align="center"
          />
        </AnimatedReveal>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {serviceAreas.map((area) => (
            <span
              key={area.id}
              className="border border-gold-border px-4 py-2 text-xs uppercase tracking-wider text-white/70"
            >
              {area.name}
            </span>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/areas"
            className="text-sm uppercase tracking-wider text-gold transition-colors hover:text-bright-gold"
          >
            Explore all areas →
          </Link>
        </div>
      </div>
    </section>
  );
}
