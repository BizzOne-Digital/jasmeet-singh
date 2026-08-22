"use client";

import { useState, useMemo } from "react";
import { serviceAreas } from "@/data/areas";
import { business } from "@/content/business";
import { images } from "@/content/pages";
import { PageHero } from "@/components/ui/PageHero";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { AnimatedReveal } from "@/components/motion/AnimatedReveal";
import { FinalCTA } from "@/components/sections/FinalCTA";

export function AreasPageContent() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return serviceAreas;
    const q = search.toLowerCase();
    return serviceAreas.filter(
      (a) => a.name.toLowerCase().includes(q) || a.region.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <>
      <PageHero
        eyebrow="AREAS"
        title={`Serving ${business.serviceArea}`}
        description="Explore the Ontario communities where Jasmeet provides residential and commercial real estate guidance."
        image={images.hero.areas}
        imageAlt="Toronto skyline — Ontario"
        breadcrumbs={[{ label: "Areas Served" }]}
      >
        <WhatsAppCTA label="Ask about your area on WhatsApp" />
      </PageHero>

      <section className="bg-warm-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <label htmlFor="area-search" className="sr-only">Search areas</label>
          <input
            id="area-search"
            type="text"
            placeholder="Search by city or region..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md border border-gold-border bg-white px-4 py-3 text-sm focus:border-gold focus:outline-none"
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((area, i) => (
              <AnimatedReveal key={area.id} delay={i * 0.05}>
                <div className="border border-gold-border bg-white p-6 transition-all hover:border-gold hover:shadow-md">
                  <p className="text-xs uppercase tracking-wider text-gold">{area.region}</p>
                  <h3 className="mt-1 font-display text-2xl">{area.name}</h3>
                  <p className="mt-3 text-sm text-muted-text">{area.description}</p>
                  <div className="mt-4 flex gap-2">
                    {area.residential && (
                      <span className="border border-gold-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-text">Residential</span>
                    )}
                    {area.commercial && (
                      <span className="border border-gold-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-text">Commercial</span>
                    )}
                  </div>
                </div>
              </AnimatedReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-10 text-center text-muted-text">No areas match your search. Contact us to discuss your location.</p>
          )}
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
