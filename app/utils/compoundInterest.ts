import type { CompoundInterestInput, CompoundInterestResult } from '../data/types';

export function calculateCompoundInterest(
  input: CompoundInterestInput
): CompoundInterestResult {
  const { initialAmount, monthlyContribution, years, annualRate } = input;
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = years * 12;

  let balance = initialAmount;
  let totalContributions = initialAmount;
  const yearlyData: CompoundInterestResult['yearlyData'] = [];

  for (let year = 1; year <= years; year++) {
    for (let month = 0; month < 12; month++) {
      balance = balance * (1 + monthlyRate) + monthlyContribution;
      totalContributions += monthlyContribution;
    }

    const interest = balance - totalContributions;
    yearlyData.push({
      year,
      total: Math.round(balance),
      contributions: Math.round(totalContributions),
      interest: Math.round(interest),
    });
  }

  const finalAmount = Math.round(balance);
  const totalInterest = finalAmount - Math.round(totalContributions);

  return {
    finalAmount,
    totalContributions: Math.round(totalContributions),
    totalInterest,
    yearlyData,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)} %`;
}
