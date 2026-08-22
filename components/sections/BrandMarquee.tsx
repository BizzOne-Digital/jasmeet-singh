"use client";

import { business } from "@/content/business";

const items = [
  ...business.services.map((s) => s.toUpperCase()),
  ...business.sectors.map((s) => s.toUpperCase()),
  "ONTARIO",
];

export function BrandMarquee() {
  const text = items.join(" • ");

  return (
    <div className="w-full max-w-[100vw] overflow-hidden border-y border-gold-border bg-black py-3 sm:py-4" aria-label="Services offered">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="mx-6 text-xs uppercase tracking-[0.2em] text-gold/80 sm:mx-8 sm:text-sm sm:tracking-[0.3em]"
            aria-hidden={i > 0}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
