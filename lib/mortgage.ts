/** Canadian mortgage affordability — estimates only, not financial advice */

export const GDS_LIMIT = 0.39;
export const TDS_LIMIT = 0.44;
export const STRESS_TEST_FLOOR = 0.0525;
export const STRESS_TEST_BUFFER = 0.02;
export const DEFAULT_HEATING_MONTHLY = 100;
export const DEFAULT_PROPERTY_TAX_RATE = 0.006; // ~0.6% of home value annually (Ontario estimate)

export interface AffordabilityInputs {
  annualIncome: number;
  coApplicantIncome?: number;
  downPayment: number;
  monthlyDebts?: number;
  amortizationYears?: 25 | 30;
  mortgageRate?: number; // contract rate as decimal, e.g. 0.045
  annualPropertyTax?: number;
  monthlyCondoFees?: number;
  monthlyHeating?: number;
}

export interface AffordabilityResult {
  maxPurchasePrice: number;
  maxMortgage: number;
  monthlyPayment: number;
  mortgageToIncomeRatio: number;
  gdsRatio: number;
  tdsRatio: number;
  stressTestRate: number;
  cmhcPremium: number;
}

export function getStressTestRate(contractRate: number): number {
  return Math.max(contractRate + STRESS_TEST_BUFFER, STRESS_TEST_FLOOR);
}

export function getMinDownPayment(purchasePrice: number): number {
  if (purchasePrice <= 500_000) return purchasePrice * 0.05;
  if (purchasePrice <= 1_500_000) return 500_000 * 0.05 + (purchasePrice - 500_000) * 0.1;
  return purchasePrice * 0.2;
}

export function getCmhcPremiumRate(ltv: number): number {
  if (ltv <= 0.8) return 0;
  if (ltv <= 0.85) return 0.028;
  if (ltv <= 0.9) return 0.031;
  return 0.04;
}

export function getMortgageRequired(purchasePrice: number, downPayment: number): {
  baseLoan: number;
  cmhcPremium: number;
  totalMortgage: number;
} {
  const baseLoan = Math.max(0, purchasePrice - downPayment);
  const ltv = purchasePrice > 0 ? baseLoan / purchasePrice : 0;
  const cmhcPremium = baseLoan * getCmhcPremiumRate(ltv);
  return {
    baseLoan,
    cmhcPremium,
    totalMortgage: baseLoan + cmhcPremium,
  };
}

export function monthlyMortgagePayment(
  principal: number,
  annualRate: number,
  amortizationYears: number
): number {
  if (principal <= 0) return 0;
  const months = amortizationYears * 12;
  const monthlyRate = annualRate / 12;
  if (monthlyRate === 0) return principal / months;
  const factor = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * factor) / (factor - 1);
}

export function estimateMonthlyPropertyTax(
  purchasePrice: number,
  annualPropertyTax?: number
): number {
  const annual = annualPropertyTax ?? purchasePrice * DEFAULT_PROPERTY_TAX_RATE;
  return annual / 12;
}

function qualifiesForPrice(
  purchasePrice: number,
  inputs: {
    annualIncome: number;
    coApplicantIncome: number;
    downPayment: number;
    monthlyDebts: number;
    amortizationYears: 25 | 30;
    mortgageRate: number;
    annualPropertyTax?: number;
    monthlyCondoFees: number;
    monthlyHeating: number;
  }
): { qualifies: boolean; gds: number; tds: number; payment: number; mortgage: number; cmhc: number } {
  const monthlyIncome = (inputs.annualIncome + inputs.coApplicantIncome) / 12;

  if (purchasePrice <= inputs.downPayment || monthlyIncome <= 0) {
    return { qualifies: false, gds: 0, tds: 0, payment: 0, mortgage: 0, cmhc: 0 };
  }

  if (inputs.downPayment < getMinDownPayment(purchasePrice)) {
    return { qualifies: false, gds: 0, tds: 0, payment: 0, mortgage: 0, cmhc: 0 };
  }

  const { totalMortgage, cmhcPremium } = getMortgageRequired(purchasePrice, inputs.downPayment);
  const stressRate = getStressTestRate(inputs.mortgageRate);
  const payment = monthlyMortgagePayment(totalMortgage, stressRate, inputs.amortizationYears);

  const propertyTaxMonthly = estimateMonthlyPropertyTax(purchasePrice, inputs.annualPropertyTax);
  const heatingMonthly = inputs.monthlyHeating;
  const condoPortion = inputs.monthlyCondoFees * 0.5;

  const housingCosts = payment + propertyTaxMonthly + heatingMonthly + condoPortion;
  const gds = housingCosts / monthlyIncome;
  const tds = (housingCosts + inputs.monthlyDebts) / monthlyIncome;

  return {
    qualifies: gds <= GDS_LIMIT && tds <= TDS_LIMIT,
    gds,
    tds,
    payment,
    mortgage: totalMortgage,
    cmhc: cmhcPremium,
  };
}

export function calculateAffordability(inputs: AffordabilityInputs): AffordabilityResult | null {
  const normalized = {
    annualIncome: inputs.annualIncome || 0,
    coApplicantIncome: inputs.coApplicantIncome || 0,
    downPayment: inputs.downPayment || 0,
    monthlyDebts: inputs.monthlyDebts || 0,
    amortizationYears: inputs.amortizationYears ?? 25,
    mortgageRate: inputs.mortgageRate ?? 0.045,
    annualPropertyTax: inputs.annualPropertyTax,
    monthlyCondoFees: inputs.monthlyCondoFees || 0,
    monthlyHeating: inputs.monthlyHeating ?? DEFAULT_HEATING_MONTHLY,
  };

  const totalIncome = normalized.annualIncome + normalized.coApplicantIncome;
  if (totalIncome <= 0) return null;

  let low = normalized.downPayment;
  let high = totalIncome * 8 + normalized.downPayment;

  // Binary search for maximum qualifying purchase price
  for (let i = 0; i < 40; i++) {
    const mid = (low + high) / 2;
    const result = qualifiesForPrice(mid, normalized);

    if (result.qualifies) {
      low = mid;
    } else {
      high = mid;
    }
  }

  const maxPurchasePrice = Math.round(low / 1000) * 1000;
  if (maxPurchasePrice <= normalized.downPayment) return null;

  const final = qualifiesForPrice(maxPurchasePrice, normalized);
  const stressTestRate = getStressTestRate(normalized.mortgageRate);

  return {
    maxPurchasePrice,
    maxMortgage: Math.round(final.mortgage),
    monthlyPayment: Math.round(final.payment),
    mortgageToIncomeRatio: final.mortgage / totalIncome,
    gdsRatio: final.gds,
    tdsRatio: final.tds,
    stressTestRate,
    cmhcPremium: Math.round(final.cmhc),
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number, decimals = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}
