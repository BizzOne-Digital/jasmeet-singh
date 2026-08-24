"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { serviceAreas } from "@/data/areas";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedReveal } from "@/components/motion/AnimatedReveal";
import { cn } from "@/lib/utils";

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

const inputClass =
  "w-full border border-gold-border bg-white px-4 py-3 text-sm focus:border-gold focus:outline-none";

type Step = "goal" | "sector" | "area" | "type" | "budget" | "timeline" | "summary";
type SubmitStatus = "idle" | "loading" | "success" | "error";

export function PropertyFinder() {
  const [step, setStep] = useState<Step>("goal");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/property-finder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, selections }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

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

  if (status === "success") {
    return (
      <section className="bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-5 text-center md:px-8">
          <AnimatedReveal>
            <p className="text-xs uppercase tracking-wider text-gold">Inquiry sent</p>
            <h2 className="mt-3 font-display text-3xl">Thank you</h2>
            <p className="mt-4 text-muted-text">
              Your property preferences have been sent. Jasmeet will review your inquiry and contact you on WhatsApp shortly.
            </p>
          </AnimatedReveal>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <AnimatedReveal>
          <SectionHeading
            eyebrow="PROPERTY FINDER"
            title="What are you looking for?"
            description="Select your preferences, then share your contact details to send your inquiry by email."
            align="center"
          />
        </AnimatedReveal>

        <div className="mt-8 flex gap-1">
          {steps.slice(0, -1).map((s, i) => (
            <div
              key={s}
              className={cn("h-0.5 flex-1 transition-colors", i <= currentIndex ? "bg-gold" : "bg-gold-border")}
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
                <div>
                  <p className="mb-6 text-center text-muted-text">Your selections:</p>
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

                  <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4 border border-gold-border bg-white p-6">
                    <div>
                      <p className="mb-4 text-center text-xs uppercase tracking-wider text-gold">Your contact details</p>
                      <label htmlFor="finder-name" className="mb-1 block text-xs uppercase tracking-wider text-muted-text">
                        Full name *
                      </label>
                      <input
                        id="finder-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={inputClass}
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="finder-phone" className="mb-1 block text-xs uppercase tracking-wider text-muted-text">
                        WhatsApp number *
                      </label>
                      <input
                        id="finder-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={inputClass}
                        placeholder="647-555-1234"
                      />
                      <p className="mt-1 text-xs text-muted-text">Share the number where we can reach you on WhatsApp.</p>
                    </div>

                    <div>
                      <label htmlFor="finder-email" className="mb-1 block text-xs uppercase tracking-wider text-muted-text">
                        Email <span className="normal-case text-muted-text/70">(optional)</span>
                      </label>
                      <input
                        id="finder-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputClass}
                        placeholder="you@email.com"
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-sm text-red-700" role="alert">
                        {errorMessage}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full bg-gold-gradient px-8 py-4 text-sm font-medium uppercase tracking-wider text-black transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "loading" ? "Sending..." : "Send inquiry"}
                    </button>
                  </form>
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
