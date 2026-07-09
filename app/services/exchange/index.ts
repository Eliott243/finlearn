import type { ExchangeRateProvider, ExchangeRatesResult } from './types';
import { openErApiProvider } from './providers/openErApi';
import { getCachedRates, setCachedRates } from './cache';

let activeProvider: ExchangeRateProvider = openErApiProvider;

/** Permet de changer de fournisseur sans réécrire l'UI */
export function setExchangeProvider(provider: ExchangeRateProvider): void {
  activeProvider = provider;
}

export async function fetchExchangeRates(
  base: string,
  options?: { forceRefresh?: boolean }
): Promise<{ data: ExchangeRatesResult; fromCache: boolean; offline: boolean }> {
  if (!options?.forceRefresh) {
    const cached = await getCachedRates();
    if (cached && cached.base === base.toUpperCase()) {
      return { data: cached, fromCache: true, offline: false };
    }
  }

  try {
    const fresh = await activeProvider.fetchRates(base);
    await setCachedRates(fresh);
    return { data: fresh, fromCache: false, offline: false };
  } catch (error) {
    const cached = await getCachedRates();
    if (cached) {
      return { data: cached, fromCache: true, offline: true };
    }
    throw error;
  }
}

export function convertAmount(
  amount: number,
  from: string,
  to: string,
  rates: Record<string, number>,
  base: string
): number | null {
  if (from === to) return amount;
  const fromU = from.toUpperCase();
  const toU = to.toUpperCase();
  const baseU = base.toUpperCase();

  if (fromU === baseU && rates[toU]) return amount * rates[toU];
  if (toU === baseU && rates[fromU]) return amount / rates[fromU];
  if (rates[fromU] && rates[toU]) return (amount / rates[fromU]) * rates[toU];
  return null;
}

export { formatFetchedAt } from './cache';
