"use client";

import { useState } from "react";
import { legal } from "@/content/business";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { AnimatedReveal } from "@/components/motion/AnimatedReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AffordabilityCalculator() {
  const [income, setIncome] = useState("");
  const [debts, setDebts] = useState("");
  const [downPayment, setDownPayment] = useState("");

  const annualIncome = parseFloat(income) || 0;
  const monthlyDebts = parseFloat(debts) || 0;
  const down = parseFloat(downPayment) || 0;

  // Simple GDS/TDS estimate — not financial advice
  const maxMonthlyGDS = (annualIncome / 12) * 0.32;
  const maxMonthlyTDS = (annualIncome / 12) * 0.4 - monthlyDebts;
  const maxMonthly = Math.min(maxMonthlyGDS, maxMonthlyTDS);
  const estimatedMax = maxMonthly > 0 ? Math.round((maxMonthly * 12 * 5 + down) / 1000) * 1000 : 0;

  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="mx-auto max-w-xl px-5 md:px-8">
        <AnimatedReveal>
          <SectionHeading
            eyebrow="ESTIMATE"
            title="Affordability calculator"
            description="A rough estimate only — not financial advice. Speak with a mortgage professional for accurate figures."
            align="center"
          />
        </AnimatedReveal>

        <div className="mt-8 space-y-4">
          <div>
            <label htmlFor="income" className="mb-1 block text-xs uppercase tracking-wider text-muted-text">Annual household income ($)</label>
            <input id="income" type="number" value={income} onChange={(e) => setIncome(e.target.value)} className="w-full border border-gold-border bg-white px-4 py-3 text-sm focus:border-gold focus:outline-none" />
          </div>
          <div>
            <label htmlFor="debts" className="mb-1 block text-xs uppercase tracking-wider text-muted-text">Monthly debt payments ($)</label>
            <input id="debts" type="number" value={debts} onChange={(e) => setDebts(e.target.value)} className="w-full border border-gold-border bg-white px-4 py-3 text-sm focus:border-gold focus:outline-none" />
          </div>
          <div>
            <label htmlFor="down" className="mb-1 block text-xs uppercase tracking-wider text-muted-text">Down payment ($)</label>
            <input id="down" type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="w-full border border-gold-border bg-white px-4 py-3 text-sm focus:border-gold focus:outline-none" />
          </div>
        </div>

        {estimatedMax > 0 && (
          <div className="mt-8 border border-gold-border bg-white p-6 text-center">
            <p className="text-xs uppercase tracking-wider text-muted-text">Estimated maximum purchase price</p>
            <p className="mt-2 font-display text-3xl">${estimatedMax.toLocaleString()}</p>
            <p className="mt-2 text-xs text-muted-text">{legal.calculatorDisclaimer}</p>
          </div>
        )}

        <div className="mt-8 text-center">
          <WhatsAppCTA label="Discuss your budget on WhatsApp" message="Hi Jasmeet, I'd like to discuss my home buying budget and goals." />
        </div>
      </div>
    </section>
  );
}
