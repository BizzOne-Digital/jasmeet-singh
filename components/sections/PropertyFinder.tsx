"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { ctaLabels } from "@/content/business";
import { serviceAreas } from "@/data/areas";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedReveal } from "@/components/motion/AnimatedReveal";

const goals = ["Buy", "Sell", "Lease", "Invest"];
const sectors = ["Residential", "Commercial"];
const propertyTypes = [
  "House",
  "Condo",
  "Townhome",
  "Office",
  "Retail",
  "Industrial",
  "Land",
  "Mixed-use",
];
const budgets = [
  "Under $500K",
  "$500K – $1M",
  "$1M – $2M",
  "$2M – $5M",
  "Over $5M",
  "Prefer not to say",
];
const timelines = [
  "Immediately",
  "1–3 months",
  "3–6 months",
  "6–12 months",
  "Just exploring",
];

type Step = "goal" | "sector" | "area" | "type" | "budget" | "timeline" | "summary";

export function PropertyFinder() {
  const [step, setStep] = useState<Step>("goal");
  const [selections, setSelections] = useState({
    goal: "",
    sector: "",
    area: "",
    propertyType: "",
    budget: "",
    timeline: "",
  });

  const steps: Step[] = ["goal", "sector", "area", "type", "budget", "timeline", "summary"];
  const currentIndex = steps.indexOf(step);

  const select = (field: keyof typeof selections, value: string) => {
    setSelections((prev) => ({ ...prev, [field]: value }));
    const nextStep = steps[currentIndex + 1];
    if (nextStep) setStep(nextStep);
  };

  const goBack = () => {
    if (currentIndex > 0) setStep(steps[currentIndex - 1]);
  };

  const whatsappUrl = buildWhatsAppUrl({
    goal: selections.goal,
    sector: selections.sector,
    area: selections.area,
    propertyType: selections.propertyType,
    budget: selections.budget,
    timeline: selections.timeline,
  });

  const renderChoices = (items: string[], field: keyof typeof selections) => (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => select(field, item)}
          className="border border-gold-border px-5 py-4 text-left text-sm uppercase tracking-wider transition-all hover:border-gold hover:bg-gold/5 focus-visible:border-gold"
        >
          {item}
        </button>
      ))}
    </div>
  );

  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <AnimatedReveal>
          <SectionHeading
            eyebrow="PROPERTY FINDER"
            title="What are you looking for?"
            description="Select your preferences — no personal information required. Continue on WhatsApp when ready."
            align="center"
          />
        </AnimatedReveal>

        {/* Progress */}
        <div className="mt-8 flex gap-1">
          {steps.slice(0, -1).map((s, i) => (
            <div
              key={s}
              className={`h-0.5 flex-1 transition-colors ${i <= currentIndex ? "bg-gold" : "bg-gold-border"}`}
            />
          ))}
        </div>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === "goal" && (
                <>
                  <p className="mb-4 text-sm uppercase tracking-wider text-gold">Your goal</p>
                  {renderChoices(goals, "goal")}
                </>
              )}
              {step === "sector" && (
                <>
                  <p className="mb-4 text-sm uppercase tracking-wider text-gold">Property sector</p>
                  {renderChoices(sectors, "sector")}
                </>
              )}
              {step === "area" && (
                <>
                  <p className="mb-4 text-sm uppercase tracking-wider text-gold">Preferred area</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {serviceAreas.slice(0, 8).map((area) => (
                      <button
                        key={area.id}
                        onClick={() => select("area", area.name)}
                        className="border border-gold-border px-5 py-4 text-left text-sm transition-all hover:border-gold hover:bg-gold/5"
                      >
                        {area.name}
                      </button>
                    ))}
                  </div>
                </>
              )}
              {step === "type" && (
                <>
                  <p className="mb-4 text-sm uppercase tracking-wider text-gold">Property type</p>
                  {renderChoices(propertyTypes, "propertyType")}
                </>
              )}
              {step === "budget" && (
                <>
                  <p className="mb-4 text-sm uppercase tracking-wider text-gold">Approximate budget</p>
                  {renderChoices(budgets, "budget")}
                </>
              )}
              {step === "timeline" && (
                <>
                  <p className="mb-4 text-sm uppercase tracking-wider text-gold">Timeline</p>
                  {renderChoices(timelines, "timeline")}
                </>
              )}
              {step === "summary" && (
                <div className="text-center">
                  <p className="mb-6 text-muted-text">Your selections:</p>
                  <dl className="mx-auto mb-8 max-w-sm space-y-2 text-left text-sm">
                    {Object.entries(selections).map(([key, val]) =>
                      val ? (
                        <div key={key} className="flex justify-between border-b border-gold-border pb-2">
                          <dt className="capitalize text-muted-text">{key.replace(/([A-Z])/g, " $1")}</dt>
                          <dd className="font-medium">{val}</dd>
                        </div>
                      ) : null
                    )}
                  </dl>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-gold-gradient px-8 py-4 text-sm font-medium uppercase tracking-wider text-black transition-all hover:brightness-110"
                  >
                    {ctaLabels.whatsappContinue}
                  </a>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {step !== "summary" && currentIndex > 0 && (
            <button
              onClick={goBack}
              className="mt-6 flex items-center gap-1 text-sm text-muted-text transition-colors hover:text-gold"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
