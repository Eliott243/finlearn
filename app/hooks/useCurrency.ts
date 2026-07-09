import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import type { CurrencyCode } from '../constants/currencies';
import {
  formatCurrencyAmount,
  getChartCurrencySuffix,
  getCurrencyMeta,
} from '../constants/currencies';
import { getPreferences } from '../utils/preferences';

export function useCurrency() {
  const [currency, setCurrency] = useState<CurrencyCode>('XOF');
  const [ready, setReady] = useState(false);

  const refresh = useCallback(async () => {
    const prefs = await getPreferences();
    setCurrency(prefs.currency);
    setReady(true);
  }, []);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  const meta = getCurrencyMeta(currency);

  return {
    currency,
    meta,
    ready,
    refresh,
    format: (amount: number) => formatCurrencyAmount(amount, currency),
    suffix: meta.suffix,
    chartSuffix: getChartCurrencySuffix(currency),
  };
}
