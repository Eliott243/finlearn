export type CurrencyCode =
  | 'XOF'
  | 'XAF'
  | 'NGN'
  | 'GHS'
  | 'MAD'
  | 'EGP'
  | 'KES'
  | 'ZAR'
  | 'EUR'
  | 'USD';

export interface CurrencyMeta {
  code: CurrencyCode;
  label: string;
  /** Suffixe court pour les champs de saisie */
  suffix: string;
  locale: string;
  /** Décimales à afficher (0 pour FCFA, etc.) */
  decimals: number;
  flag: string;
}

export const CURRENCIES: CurrencyMeta[] = [
  { code: 'XOF', label: 'Franc CFA (UEMOA)', suffix: 'FCFA', locale: 'fr-SN', decimals: 0, flag: '🇸🇳' },
  { code: 'XAF', label: 'Franc CFA (CEMAC)', suffix: 'FCFA', locale: 'fr-CM', decimals: 0, flag: '🇨🇲' },
  { code: 'NGN', label: 'Naira nigérian', suffix: '₦', locale: 'en-NG', decimals: 0, flag: '🇳🇬' },
  { code: 'GHS', label: 'Cedi ghanéen', suffix: 'GHS', locale: 'en-GH', decimals: 2, flag: '🇬🇭' },
  { code: 'MAD', label: 'Dirham marocain', suffix: 'MAD', locale: 'fr-MA', decimals: 2, flag: '🇲🇦' },
  { code: 'EGP', label: 'Livre égyptienne', suffix: 'EGP', locale: 'ar-EG', decimals: 2, flag: '🇪🇬' },
  { code: 'KES', label: 'Shilling kényan', suffix: 'KES', locale: 'en-KE', decimals: 0, flag: '🇰🇪' },
  { code: 'ZAR', label: 'Rand sud-africain', suffix: 'ZAR', locale: 'en-ZA', decimals: 2, flag: '🇿🇦' },
  { code: 'EUR', label: 'Euro', suffix: '€', locale: 'fr-FR', decimals: 2, flag: '🇪🇺' },
  { code: 'USD', label: 'Dollar américain', suffix: '$', locale: 'en-US', decimals: 2, flag: '🇺🇸' },
];

export const DEFAULT_CURRENCY: CurrencyCode = 'XOF';

export function getCurrencyMeta(code: CurrencyCode): CurrencyMeta {
  return CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];
}

export function formatCurrencyAmount(amount: number, code: CurrencyCode): string {
  const meta = getCurrencyMeta(code);
  const rounded =
    meta.decimals === 0
      ? Math.round(amount)
      : Math.round(amount * 10 ** meta.decimals) / 10 ** meta.decimals;

  if (code === 'XOF' || code === 'XAF') {
    return `${rounded.toLocaleString('fr-FR')} FCFA`;
  }
  if (code === 'NGN') {
    return `₦${rounded.toLocaleString('en-NG', { maximumFractionDigits: 0 })}`;
  }
  if (code === 'USD') {
    return `$${rounded.toLocaleString('en-US', { maximumFractionDigits: meta.decimals })}`;
  }
  if (code === 'EUR') {
    return `${rounded.toLocaleString('fr-FR', { maximumFractionDigits: meta.decimals })} €`;
  }

  try {
    return new Intl.NumberFormat(meta.locale, {
      style: 'currency',
      currency: code,
      maximumFractionDigits: meta.decimals,
      minimumFractionDigits: meta.decimals === 0 ? 0 : undefined,
    }).format(rounded);
  } catch {
    return `${rounded.toLocaleString('fr-FR')} ${meta.suffix}`;
  }
}

/** Symbole court pour graphiques (évite les suffixes longs) */
export function getChartCurrencySuffix(code: CurrencyCode): string {
  const meta = getCurrencyMeta(code);
  if (code === 'XOF' || code === 'XAF') return 'k';
  if (code === 'EUR') return '€';
  if (code === 'USD') return '$';
  return meta.suffix;
}
