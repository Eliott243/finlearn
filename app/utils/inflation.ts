export interface CurrencyProfile {
  id: string;
  code: string;
  label: string;
  flag: string;
  /** Taux d'inflation illustratif annuel (%) — valeur pédagogique, pas temps réel */
  illustrativeInflationRate: number;
  locale: string;
}

export const CURRENCY_PROFILES: CurrencyProfile[] = [
  {
    id: 'xof',
    code: 'XOF',
    label: 'Franc CFA (UEMOA)',
    flag: '🇸🇳',
    illustrativeInflationRate: 3.5,
    locale: 'fr-SN',
  },
  {
    id: 'xaf',
    code: 'XAF',
    label: 'Franc CFA (CEMAC)',
    flag: '🇨🇲',
    illustrativeInflationRate: 3.2,
    locale: 'fr-CM',
  },
  {
    id: 'ngn',
    code: 'NGN',
    label: 'Naira nigérian',
    flag: '🇳🇬',
    illustrativeInflationRate: 24,
    locale: 'en-NG',
  },
  {
    id: 'ghs',
    code: 'GHS',
    label: 'Cedi ghanéen',
    flag: '🇬🇭',
    illustrativeInflationRate: 23,
    locale: 'en-GH',
  },
  {
    id: 'mad',
    code: 'MAD',
    label: 'Dirham marocain',
    flag: '🇲🇦',
    illustrativeInflationRate: 2.8,
    locale: 'fr-MA',
  },
  {
    id: 'egp',
    code: 'EGP',
    label: 'Livre égyptienne',
    flag: '🇪🇬',
    illustrativeInflationRate: 30,
    locale: 'ar-EG',
  },
  {
    id: 'kes',
    code: 'KES',
    label: 'Shilling kényan',
    flag: '🇰🇪',
    illustrativeInflationRate: 6.5,
    locale: 'en-KE',
  },
  {
    id: 'zar',
    code: 'ZAR',
    label: 'Rand sud-africain',
    flag: '🇿🇦',
    illustrativeInflationRate: 5.5,
    locale: 'en-ZA',
  },
  {
    id: 'eur',
    code: 'EUR',
    label: 'Euro (zone euro)',
    flag: '🇪🇺',
    illustrativeInflationRate: 2.5,
    locale: 'fr-FR',
  },
  {
    id: 'usd',
    code: 'USD',
    label: 'Dollar américain',
    flag: '🇺🇸',
    illustrativeInflationRate: 3,
    locale: 'en-US',
  },
];

export interface InflationInput {
  amount: number;
  years: number;
  inflationRate: number;
  savingsRate?: number;
}

export interface InflationYearPoint {
  year: number;
  nominalValue: number;
  realValue: number;
  purchasingPowerLost: number;
}

export interface InflationResult {
  initialAmount: number;
  finalNominalValue: number;
  finalRealValue: number;
  totalPurchasingPowerLost: number;
  lossPercent: number;
  yearlyData: InflationYearPoint[];
  insight: string;
}

export function getCurrencyById(id: string): CurrencyProfile | undefined {
  return CURRENCY_PROFILES.find((c) => c.id === id);
}

export function getInflationProfileForCurrency(code: string): CurrencyProfile {
  return (
    CURRENCY_PROFILES.find((c) => c.code === code) ?? {
      id: code.toLowerCase(),
      code,
      label: code,
      flag: '💱',
      illustrativeInflationRate: 5,
      locale: 'fr-FR',
    }
  );
}

export function calculateInflationImpact(input: InflationInput): InflationResult | null {
  const { amount, years, inflationRate, savingsRate = 0 } = input;

  if (amount <= 0 || years <= 0 || inflationRate < 0) return null;

  const inflationDecimal = inflationRate / 100;
  const savingsDecimal = savingsRate / 100;
  const yearlyData: InflationYearPoint[] = [];

  for (let year = 0; year <= years; year++) {
    const nominalValue = amount * Math.pow(1 + savingsDecimal, year);
    const realValue = nominalValue / Math.pow(1 + inflationDecimal, year);
    const purchasingPowerLost = nominalValue - realValue;

    yearlyData.push({
      year,
      nominalValue: Math.round(nominalValue),
      realValue: Math.round(realValue),
      purchasingPowerLost: Math.round(purchasingPowerLost),
    });
  }

  const finalPoint = yearlyData[yearlyData.length - 1];
  const lossPercent =
    finalPoint.nominalValue > 0
      ? (finalPoint.purchasingPowerLost / finalPoint.nominalValue) * 100
      : 0;

  let insight: string;
  if (savingsRate === 0) {
    insight =
      'Sans aucun rendement, votre argent garde le même montant en euros/devises, mais achète moins de biens chaque année. C\'est la « perte silencieuse » de l\'inflation.';
  } else if (savingsRate < inflationRate) {
    insight =
      'Votre épargne rapporte quelque chose, mais moins que l\'inflation : vous perdez quand même du pouvoir d\'achat réel, juste moins vite.';
  } else {
    insight =
      'Votre rendement dépasse l\'inflation illustrée : votre pouvoir d\'achat réel augmente. En pratique, vérifiez les frais et la fiscalité.';
  }

  return {
    initialAmount: amount,
    finalNominalValue: finalPoint.nominalValue,
    finalRealValue: finalPoint.realValue,
    totalPurchasingPowerLost: finalPoint.purchasingPowerLost,
    lossPercent,
    yearlyData,
    insight,
  };
}

export { formatCurrencyAmount } from '../constants/currencies';
