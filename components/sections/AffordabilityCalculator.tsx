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

function parseInput(value: string): number {
  const parsed = parseFloat(value.replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

const inputClass =
  "w-full border border-gold-border bg-white px-4 py-3 text-sm focus:border-gold focus:outline-none";

export function AffordabilityCalculator() {
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

  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-5 md:px-8">
        <AnimatedReveal>
          <SectionHeading
            eyebrow="ESTIMATE"
            title="Mortgage affordability calculator"
            description="Based on Canadian GDS/TDS ratios and the mortgage stress test — similar to bank and broker calculators. Estimates only."
            align="center"
          />
        </AnimatedReveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="income" className="mb-1 block text-xs uppercase tracking-wider text-muted-text">
              Your annual income ($)
            </label>
            <input
              id="income"
              type="number"
              min="0"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className={inputClass}
              placeholder="e.g. 200000"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="co-income" className="mb-1 block text-xs uppercase tracking-wider text-muted-text">
              Co-applicant annual income ($) <span className="normal-case text-muted-text/70">(optional)</span>
            </label>
            <input
              id="co-income"
              type="number"
              min="0"
              value={coIncome}
              onChange={(e) => setCoIncome(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="down" className="mb-1 block text-xs uppercase tracking-wider text-muted-text">
              Down payment ($)
            </label>
            <input
              id="down"
              type="number"
              min="0"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              className={inputClass}
              placeholder="e.g. 80000"
            />
          </div>

          <div>
            <label htmlFor="debts" className="mb-1 block text-xs uppercase tracking-wider text-muted-text">
              Monthly debt payments ($)
            </label>
            <input
              id="debts"
              type="number"
              min="0"
              value={debts}
              onChange={(e) => setDebts(e.target.value)}
              className={inputClass}
              placeholder="Car, loans, etc."
            />
          </div>

          <div>
            <label htmlFor="amortization" className="mb-1 block text-xs uppercase tracking-wider text-muted-text">
              Amortization
            </label>
            <select
              id="amortization"
              value={amortization}
              onChange={(e) => setAmortization(Number(e.target.value) as 25 | 30)}
              className={inputClass}
            >
              <option value={25}>25 years</option>
              <option value={30}>30 years</option>
            </select>
          </div>

          <div>
            <label htmlFor="rate" className="mb-1 block text-xs uppercase tracking-wider text-muted-text">
              Mortgage rate (%)
            </label>
            <input
              id="rate"
              type="number"
              min="0"
              step="0.01"
              value={mortgageRate}
              onChange={(e) => setMortgageRate(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="property-tax" className="mb-1 block text-xs uppercase tracking-wider text-muted-text">
              Annual property tax ($) <span className="normal-case text-muted-text/70">(optional)</span>
            </label>
            <input
              id="property-tax"
              type="number"
              min="0"
              value={propertyTax}
              onChange={(e) => setPropertyTax(e.target.value)}
              className={inputClass}
              placeholder="Estimated if blank"
            />
          </div>

          <div>
            <label htmlFor="condo" className="mb-1 block text-xs uppercase tracking-wider text-muted-text">
              Monthly condo fees ($) <span className="normal-case text-muted-text/70">(optional)</span>
            </label>
            <input
              id="condo"
              type="number"
              min="0"
              value={condoFees}
              onChange={(e) => setCondoFees(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="heating" className="mb-1 block text-xs uppercase tracking-wider text-muted-text">
              Monthly heating ($)
            </label>
            <input
              id="heating"
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
            <div className="border border-gold-border bg-white p-6 text-center">
              <p className="text-xs uppercase tracking-wider text-muted-text">Maximum purchase price</p>
              <p className="mt-2 font-display text-4xl">{formatCurrency(result.maxPurchasePrice)}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border border-gold-border bg-white p-5">
                <p className="text-xs uppercase tracking-wider text-muted-text">Maximum mortgage</p>
                <p className="mt-2 font-display text-2xl">{formatCurrency(result.maxMortgage)}</p>
                <p className="mt-1 text-xs text-muted-text">
                  {result.mortgageToIncomeRatio.toFixed(1)}x annual income
                </p>
              </div>

              <div className="border border-gold-border bg-white p-5">
                <p className="text-xs uppercase tracking-wider text-muted-text">Est. monthly payment</p>
                <p className="mt-2 font-display text-2xl">{formatCurrency(result.monthlyPayment)}</p>
                <p className="mt-1 text-xs text-muted-text">
                  At stress test rate {formatPercent(result.stressTestRate)}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border border-gold-border bg-white p-4 text-center">
                <p className="text-xs uppercase tracking-wider text-muted-text">GDS ratio</p>
                <p className="mt-1 text-lg font-medium">{formatPercent(result.gdsRatio)}</p>
                <p className="text-xs text-muted-text">Limit 39%</p>
              </div>
              <div className="border border-gold-border bg-white p-4 text-center">
                <p className="text-xs uppercase tracking-wider text-muted-text">TDS ratio</p>
                <p className="mt-1 text-lg font-medium">{formatPercent(result.tdsRatio)}</p>
                <p className="text-xs text-muted-text">Limit 44%</p>
              </div>
            </div>

            {result.cmhcPremium > 0 && (
              <p className="text-center text-xs text-muted-text">
                Includes estimated CMHC insurance of {formatCurrency(result.cmhcPremium)}
              </p>
            )}

            <p className="text-center text-xs text-muted-text">{legal.calculatorDisclaimer}</p>
          </div>
        )}

        <div className="mt-8 text-center">
          <WhatsAppCTA
            label="Discuss your budget on WhatsApp"
            message="Hi Jasmeet, I'd like to discuss my home buying budget and goals."
          />
        </div>
      </div>
    </section>
  );
}
