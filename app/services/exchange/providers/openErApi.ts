import type { ExchangeRateProvider, ExchangeRatesResult } from '../types';

const API_URL = 'https://open.er-api.com/v6/latest';

/** Fournisseur gratuit open.er-api.com — sans clé API */
export const openErApiProvider: ExchangeRateProvider = {
  name: 'open.er-api.com',

  async fetchRates(base: string): Promise<ExchangeRatesResult> {
    const response = await fetch(`${API_URL}/${base.toUpperCase()}`);
    if (!response.ok) {
      throw new Error(`Erreur réseau (${response.status})`);
    }

    const data = await response.json();
    if (data.result !== 'success' || !data.rates) {
      throw new Error('Réponse API invalide');
    }

    const fetchedAt = data.time_last_update_utc
      ? new Date(data.time_last_update_utc).toISOString()
      : new Date().toISOString();

    return {
      base: data.base_code ?? base.toUpperCase(),
      rates: data.rates,
      fetchedAt,
      provider: 'open.er-api.com',
    };
  },
};
