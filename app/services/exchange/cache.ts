import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ExchangeRatesResult } from './types';

const CACHE_KEY = '@finlearn_exchange_cache';

export async function getCachedRates(): Promise<ExchangeRatesResult | null> {
  try {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ExchangeRatesResult;
  } catch {
    return null;
  }
}

export async function setCachedRates(data: ExchangeRatesResult): Promise<void> {
  await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
}

export function formatFetchedAt(iso: string): string {
  try {
    return new Date(iso).toLocaleString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}
