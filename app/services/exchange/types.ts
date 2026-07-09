export interface ExchangeRatesResult {
  base: string;
  rates: Record<string, number>;
  fetchedAt: string;
  provider: string;
}

export interface ExchangeRateProvider {
  readonly name: string;
  fetchRates(base: string): Promise<ExchangeRatesResult>;
}
