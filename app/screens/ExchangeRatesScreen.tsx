import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Card } from '../components';
import { CURRENCIES, formatCurrencyAmount } from '../constants/currencies';
import type { CurrencyCode } from '../constants/currencies';
import { useCurrency } from '../hooks/useCurrency';
import {
  convertAmount,
  fetchExchangeRates,
  formatFetchedAt,
} from '../services/exchange';
import type { ExchangeRatesResult } from '../services/exchange/types';
import { layout, text, components } from '../constants/styles';
import { Colors } from '../constants/colors';

const TABLE_CURRENCIES: CurrencyCode[] = [
  'USD', 'EUR', 'XOF', 'XAF', 'NGN', 'GHS', 'MAD', 'EGP', 'KES', 'ZAR',
];

function CurrencyPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: CurrencyCode;
  onChange: (c: CurrencyCode) => void;
}) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={[text.label, { marginBottom: 8 }]}>{label}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {CURRENCIES.map((c) => {
          const active = value === c.code;
          return (
            <TouchableOpacity
              key={c.code}
              onPress={() => onChange(c.code)}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 20,
                marginRight: 8,
                borderWidth: 1,
                borderColor: active ? Colors.primary : Colors.border,
                backgroundColor: active ? 'rgba(45, 106, 106, 0.1)' : Colors.surface,
              }}
            >
              <Text style={[text.bodySmall, active && { color: Colors.primary, fontWeight: '700' }]}>
                {c.flag} {c.code}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

export function ExchangeRatesScreen() {
  const { currency: prefCurrency } = useCurrency();
  const [from, setFrom] = useState<CurrencyCode>(prefCurrency);
  const [to, setTo] = useState<CurrencyCode>('USD');
  const [amount, setAmount] = useState('1000');
  const [rates, setRates] = useState<ExchangeRatesResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offline, setOffline] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);

  const load = useCallback(async (force = false) => {
    try {
      setError(null);
      const { data, offline: isOffline } = await fetchExchangeRates(prefCurrency, {
        forceRefresh: force,
      });
      setRates(data);
      setOffline(isOffline);
      setLastUpdate(data.fetchedAt);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [prefCurrency]);

  useEffect(() => {
    setLoading(true);
    load();
  }, [load]);

  useEffect(() => {
    setFrom(prefCurrency);
  }, [prefCurrency]);

  const converted = useMemo(() => {
    if (!rates) return null;
    const n = parseFloat(amount) || 0;
    return convertAmount(n, from, to, rates.rates, rates.base);
  }, [amount, from, to, rates]);

  const tableRows = useMemo(() => {
    if (!rates) return [];
    const base = rates.base;
    return TABLE_CURRENCIES.filter((c) => c !== base).map((code) => {
      const rate = convertAmount(1, base, code, rates.rates, rates.base);
      return { code, rate };
    });
  }, [rates]);

  if (loading && !rates) {
    return (
      <View style={[layout.screen, layout.center]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={layout.screen}
      contentContainerStyle={[layout.scrollContent, { paddingBottom: 40 }]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            load(true);
          }}
          tintColor={Colors.primary}
        />
      }
    >
      {lastUpdate && (
        <Text style={[text.bodySmall, { marginBottom: 12, color: Colors.textSecondary }]}>
          {offline ? 'Hors ligne — ' : ''}Dernière mise à jour : {formatFetchedAt(lastUpdate)}
        </Text>
      )}

      {error && !rates && (
        <Card style={{ backgroundColor: 'rgba(196, 92, 92, 0.08)', borderColor: 'rgba(196, 92, 92, 0.3)' }}>
          <Text style={[text.body, { color: Colors.danger }]}>{error}</Text>
          <TouchableOpacity style={{ marginTop: 12 }} onPress={() => load(true)}>
            <Text style={[text.body, text.primary, { fontWeight: '600' }]}>Réessayer</Text>
          </TouchableOpacity>
        </Card>
      )}

      <Card>
        <CurrencyPicker label="Devise source" value={from} onChange={setFrom} />
        <CurrencyPicker label="Devise cible" value={to} onChange={setTo} />

        <Text style={[text.label, { marginBottom: 6 }]}>Montant</Text>
        <View style={components.inputRow}>
          <TextInput
            style={{ flex: 1, paddingVertical: 12, fontSize: 16, color: Colors.textPrimary }}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="1000"
            placeholderTextColor={Colors.textSecondary}
          />
          <Text style={[text.bodySmall, { marginLeft: 8 }]}>{from}</Text>
        </View>

        {converted !== null && (
          <View style={[components.highlightBox, { marginTop: 16 }]}>
            <Text style={text.bodySmall}>Résultat</Text>
            <Text style={[text.h2, text.primary, { marginTop: 4 }]}>
              {formatCurrencyAmount(converted, to)}
            </Text>
            <Text style={[text.caption, { marginTop: 4 }]}>
              {amount} {from} → {to}
            </Text>
          </View>
        )}
      </Card>

      {rates && (
        <Card>
          <Text style={[text.h3, { marginBottom: 12 }]}>
            Taux principaux (base {prefCurrency})
          </Text>
          {tableRows.map((row) => (
            <View
              key={row.code}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: Colors.border,
              }}
            >
              <Text style={text.body}>{row.code}</Text>
              <Text style={[text.body, { fontWeight: '600' }]}>
                {row.rate !== null ? row.rate.toFixed(4) : '—'}
              </Text>
            </View>
          ))}
          <Text style={[text.caption, { marginTop: 12, lineHeight: 18 }]}>
            Données via open.er-api.com. À titre informatif uniquement.
          </Text>
        </Card>
      )}
    </ScrollView>
  );
}
