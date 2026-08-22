"use client";

import { useState, useMemo } from "react";
import { ctaLabels } from "@/content/business";
import { images } from "@/content/pages";
import { getPublishedProperties, type PropertySector } from "@/data/properties";
import { PageHero } from "@/components/ui/PageHero";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { AnimatedReveal } from "@/components/motion/AnimatedReveal";
import { cn } from "@/lib/utils";

type FilterTab = "all" | PropertySector | "for-sale" | "for-lease";

const tabs: { id: FilterTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "for-sale", label: "For Sale" },
  { id: "for-lease", label: "For Lease" },
];

export function PropertiesPageContent() {
  const allProperties = getPublishedProperties();
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [locationFilter, setLocationFilter] = useState("");

  const filtered = useMemo(() => {
    return allProperties.filter((p) => {
      if (activeTab === "residential" && p.sector !== "residential") return false;
      if (activeTab === "commercial" && p.sector !== "commercial") return false;
      if (activeTab === "for-sale" && p.status !== "for-sale") return false;
      if (activeTab === "for-lease" && p.status !== "for-lease") return false;
      if (locationFilter && !p.area.toLowerCase().includes(locationFilter.toLowerCase())) return false;
      return true;
    });
  }, [allProperties, activeTab, locationFilter]);

  return (
    <>
      <PageHero
        eyebrow="PROPERTIES"
        title="Discover opportunities across Ontario"
        description="Browse residential and commercial properties. Verified listings will appear here — current opportunities available by request."
        image={images.hero.properties}
        imageAlt="Luxury property exterior"
        breadcrumbs={[{ label: "Properties" }]}
      />

      <section className="bg-warm-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 border-b border-gold-border pb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-2 text-xs uppercase tracking-wider transition-colors",
                  activeTab === tab.id
                    ? "bg-black text-white"
                    : "text-muted-text hover:text-gold"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-6">
            <label htmlFor="location-filter" className="sr-only">Filter by location</label>
            <input
              id="location-filter"
              type="text"
              placeholder="Filter by area..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full max-w-sm border border-gold-border bg-white px-4 py-3 text-sm focus:border-gold focus:outline-none"
            />
          </div>

          {filtered.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((property) => (
                <PropertyCard key={property.slug} property={property} />
              ))}
            </div>
          ) : (
            <AnimatedReveal>
              <div className="mt-16 border border-gold-border bg-white p-12 text-center md:p-20">
                <p className="font-display text-2xl md:text-3xl">
                  Current opportunities available by request
                </p>
                <p className="mx-auto mt-4 max-w-lg text-muted-text">
                  No verified listings are published yet. Reach out to discuss available residential and commercial opportunities across Ontario.
                </p>
                <div className="mt-8">
                  <WhatsAppCTA label={ctaLabels.whatsappProperty} />
                </div>
              </div>
            </AnimatedReveal>
          )}
        </div>
      </section>
    </>
  );
}
