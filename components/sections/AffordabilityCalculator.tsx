"use client";

import { useMemo, useState } from "react";
import { legal } from "@/content/business";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { AnimatedReveal } from "@/components/motion/AnimatedReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  calculateAffordability,
  formatCurrency,
  formatPercent,
} from "@/lib/mortgage";
import { cn } from "@/lib/utils";

function parseInput(value: string): number {
  const parsed = parseFloat(value.replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

const inputClass =
  "w-full border border-gold-border bg-white px-4 py-3 text-sm text-black focus:border-gold focus:outline-none";

interface AffordabilityCalculatorContentProps {
  idPrefix?: string;
  dark?: boolean;
  showHeading?: boolean;
  showWhatsApp?: boolean;
  className?: string;
}

export function AffordabilityCalculatorContent({
  idPrefix = "",
  dark = false,
  showHeading = true,
  showWhatsApp = true,
  className,
}: AffordabilityCalculatorContentProps) {
  const [income, setIncome] = useState("");
  const [coIncome, setCoIncome] = useState("");
  const [debts, setDebts] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [amortization, setAmortization] = useState<25 | 30>(25);
  const [mortgageRate, setMortgageRate] = useState("4.5");
  const [propertyTax, setPropertyTax] = useState("");
  const [condoFees, setCondoFees] = useState("");
  const [heating, setHeating] = useState("100");

  const result = useMemo(() => {
    const annualIncome = parseInput(income);
    if (annualIncome <= 0) return null;

    return calculateAffordability({
      annualIncome,
      coApplicantIncome: parseInput(coIncome),
      downPayment: parseInput(downPayment),
      monthlyDebts: parseInput(debts),
      amortizationYears: amortization,
      mortgageRate: parseInput(mortgageRate) / 100,
      annualPropertyTax: propertyTax ? parseInput(propertyTax) : undefined,
      monthlyCondoFees: parseInput(condoFees),
      monthlyHeating: heating ? parseInput(heating) : undefined,
    });
  }, [income, coIncome, debts, downPayment, amortization, mortgageRate, propertyTax, condoFees, heating]);

  const labelClass = cn(
    "mb-1 block text-xs uppercase tracking-wider",
    dark ? "text-white/55" : "text-muted-text"
  );

  const resultCardClass = cn(
    "border p-5",
    dark ? "border-gold-border bg-black text-white" : "border-gold-border bg-white"
  );

  const resultLabelClass = cn(
    "text-xs uppercase tracking-wider",
    dark ? "text-white/55" : "text-muted-text"
  );

  return (
    <div className={className}>
      {showHeading && (
        <SectionHeading
          eyebrow="ESTIMATE"
          title="Mortgage affordability calculator"
          description="Based on Canadian GDS/TDS ratios and the mortgage stress test. Estimates only."
          align="center"
          dark={dark}
        />
      )}

      <div className={cn("grid gap-4 sm:grid-cols-2", showHeading && "mt-8")}>
        <div className="sm:col-span-2">
          <label htmlFor={`${idPrefix}income`} className={labelClass}>
            Your annual income ($)
          </label>
          <input
            id={`${idPrefix}income`}
            type="number"
            min="0"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className={inputClass}
            placeholder="e.g. 200000"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${idPrefix}co-income`} className={labelClass}>
            Co-applicant annual income ($){" "}
            <span className={cn("normal-case", dark ? "text-white/40" : "text-muted-text/70")}>
              (optional)
            </span>
          </label>
          <input
            id={`${idPrefix}co-income`}
            type="number"
            min="0"
            value={coIncome}
            onChange={(e) => setCoIncome(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor={`${idPrefix}down`} className={labelClass}>
            Down payment ($)
          </label>
          <input
            id={`${idPrefix}down`}
            type="number"
            min="0"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            className={inputClass}
            placeholder="e.g. 80000"
          />
        </div>

        <div>
          <label htmlFor={`${idPrefix}debts`} className={labelClass}>
            Monthly debt payments ($)
          </label>
          <input
            id={`${idPrefix}debts`}
            type="number"
            min="0"
            value={debts}
            onChange={(e) => setDebts(e.target.value)}
            className={inputClass}
            placeholder="Car, loans, etc."
          />
        </div>

        <div>
          <label htmlFor={`${idPrefix}amortization`} className={labelClass}>
            Amortization
          </label>
          <select
            id={`${idPrefix}amortization`}
            value={amortization}
            onChange={(e) => setAmortization(Number(e.target.value) as 25 | 30)}
            className={inputClass}
          >
            <option value={25}>25 years</option>
            <option value={30}>30 years</option>
          </select>
        </div>

        <div>
          <label htmlFor={`${idPrefix}rate`} className={labelClass}>
            Mortgage rate (%)
          </label>
          <input
            id={`${idPrefix}rate`}
            type="number"
            min="0"
            step="0.01"
            value={mortgageRate}
            onChange={(e) => setMortgageRate(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor={`${idPrefix}property-tax`} className={labelClass}>
            Annual property tax ($){" "}
            <span className={cn("normal-case", dark ? "text-white/40" : "text-muted-text/70")}>
              (optional)
            </span>
          </label>
          <input
            id={`${idPrefix}property-tax`}
            type="number"
            min="0"
            value={propertyTax}
            onChange={(e) => setPropertyTax(e.target.value)}
            className={inputClass}
            placeholder="Estimated if blank"
          />
        </div>

        <div>
          <label htmlFor={`${idPrefix}condo`} className={labelClass}>
            Monthly condo fees ($){" "}
            <span className={cn("normal-case", dark ? "text-white/40" : "text-muted-text/70")}>
              (optional)
            </span>
          </label>
          <input
            id={`${idPrefix}condo`}
            type="number"
            min="0"
            value={condoFees}
            onChange={(e) => setCondoFees(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${idPrefix}heating`} className={labelClass}>
            Monthly heating ($)
          </label>
          <input
            id={`${idPrefix}heating`}
            type="number"
            min="0"
            value={heating}
            onChange={(e) => setHeating(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {result && (
        <div className="mt-8 space-y-4">
          <div className={cn(resultCardClass, "p-6 text-center")}>
            <p className={resultLabelClass}>Maximum purchase price</p>
            <p className="mt-2 font-display text-4xl">{formatCurrency(result.maxPurchasePrice)}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className={resultCardClass}>
              <p className={resultLabelClass}>Maximum mortgage</p>
              <p className="mt-2 font-display text-2xl">{formatCurrency(result.maxMortgage)}</p>
              <p className={cn("mt-1 text-xs", dark ? "text-white/55" : "text-muted-text")}>
                {result.mortgageToIncomeRatio.toFixed(1)}x annual income
              </p>
            </div>

            <div className={resultCardClass}>
              <p className={resultLabelClass}>Est. monthly payment</p>
              <p className="mt-2 font-display text-2xl">{formatCurrency(result.monthlyPayment)}</p>
              <p className={cn("mt-1 text-xs", dark ? "text-white/55" : "text-muted-text")}>
                At stress test rate {formatPercent(result.stressTestRate)}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className={cn(resultCardClass, "p-4 text-center")}>
              <p className={resultLabelClass}>GDS ratio</p>
              <p className="mt-1 text-lg font-medium">{formatPercent(result.gdsRatio)}</p>
              <p className={cn("text-xs", dark ? "text-white/55" : "text-muted-text")}>Limit 39%</p>
            </div>
            <div className={cn(resultCardClass, "p-4 text-center")}>
              <p className={resultLabelClass}>TDS ratio</p>
              <p className="mt-1 text-lg font-medium">{formatPercent(result.tdsRatio)}</p>
              <p className={cn("text-xs", dark ? "text-white/55" : "text-muted-text")}>Limit 44%</p>
            </div>
          </div>

          {result.cmhcPremium > 0 && (
            <p className={cn("text-center text-xs", dark ? "text-white/55" : "text-muted-text")}>
              Includes estimated CMHC insurance of {formatCurrency(result.cmhcPremium)}
            </p>
          )}

          <p className={cn("text-center text-xs", dark ? "text-white/45" : "text-muted-text")}>
            {legal.calculatorDisclaimer}
          </p>
        </div>
      )}

      {showWhatsApp && (
        <div className="mt-8 text-center">
          <WhatsAppCTA
            label="Discuss your budget on WhatsApp"
            message="Hi Jasmeet, I'd like to discuss my home buying budget and goals."
          />
        </div>
      )}
    </div>
  );
}

export function AffordabilityCalculator() {
  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-5 md:px-8">
        <AnimatedReveal>
          <AffordabilityCalculatorContent />
        </AnimatedReveal>
      </div>
    </section>
  );
}
