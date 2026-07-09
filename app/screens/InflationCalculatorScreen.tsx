import { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Card, ProgressBar } from '../components';
import { Colors } from '../constants/colors';
import { layout, text, components } from '../constants/styles';
import { useCurrency } from '../hooks/useCurrency';
import {
  getInflationProfileForCurrency,
  calculateInflationImpact,
} from '../utils/inflation';

const screenWidth = Dimensions.get('window').width;

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  suffix?: string;
  placeholder?: string;
}

function InputField({ label, value, onChangeText, suffix, placeholder }: InputFieldProps) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={[text.label, { marginBottom: 6 }]}>{label}</Text>
      <View style={components.inputRow}>
        <TextInput
          style={{ flex: 1, paddingVertical: 12, fontSize: 16, color: Colors.textPrimary }}
          value={value}
          onChangeText={onChangeText}
          keyboardType="numeric"
          placeholder={placeholder}
          placeholderTextColor={Colors.textSecondary}
        />
        {suffix && <Text style={[text.bodySmall, { marginLeft: 8 }]}>{suffix}</Text>}
      </View>
    </View>
  );
}

export function InflationCalculatorScreen() {
  const { currency, format, suffix } = useCurrency();
  const [amount, setAmount] = useState('100000');
  const [years, setYears] = useState('10');
  const [savingsRate, setSavingsRate] = useState('0');
  const [customInflation, setCustomInflation] = useState<string | null>(null);

  const profile = getInflationProfileForCurrency(currency);
  const inflationRate = customInflation !== null
    ? parseFloat(customInflation) || profile.illustrativeInflationRate
    : profile.illustrativeInflationRate;

  useEffect(() => {
    setCustomInflation(null);
  }, [currency]);

  const result = useMemo(() => {
    return calculateInflationImpact({
      amount: parseFloat(amount) || 0,
      years: parseInt(years, 10) || 0,
      inflationRate,
      savingsRate: parseFloat(savingsRate) || 0,
    });
  }, [amount, years, inflationRate, savingsRate]);

  const chartData = useMemo(() => {
    if (!result || result.yearlyData.length === 0) return null;

    const labels = result.yearlyData.map((d) =>
      d.year % 5 === 0 || d.year === result.yearlyData.length - 1 ? `${d.year}a` : ''
    );

    return {
      labels,
      datasets: [
        {
          data: result.yearlyData.map((d) => d.nominalValue),
          color: () => Colors.textSecondary,
          strokeWidth: 2,
        },
        {
          data: result.yearlyData.map((d) => d.realValue),
          color: () => Colors.primary,
          strokeWidth: 2,
        },
      ],
      legend: ['Valeur nominale', 'Pouvoir d\'achat réel'],
    };
  }, [result]);

  const formatValue = (value: number) => format(value);

  return (
    <ScrollView
      style={layout.screen}
      contentContainerStyle={[layout.scrollContent, { paddingBottom: 48 }]}
      keyboardShouldPersistTaps="handled"
      nestedScrollEnabled
      showsVerticalScrollIndicator
    >
      <Text style={[text.body, { color: Colors.textSecondary, marginTop: 8, marginBottom: 20 }]}>
        Estimez la perte de pouvoir d'achat si votre argent reste non investi. Les taux
        d'inflation utilisés sont illustratifs, clairement indiqués comme tels.
      </Text>

      <Card>
        <View
          style={{
            padding: 12,
            backgroundColor: Colors.background,
            borderRadius: 10,
            marginBottom: 16,
          }}
        >
          <Text style={text.bodySmall}>
            {profile.flag} {profile.label}
          </Text>
          <Text style={[text.caption, { marginTop: 4 }]}>
            Devise : paramètres de l'app · Inflation illustrative : {profile.illustrativeInflationRate} %/an
          </Text>
        </View>

        <InputField
          label="Montant aujourd'hui"
          value={amount}
          onChangeText={setAmount}
          suffix={suffix}
          placeholder="100000"
        />
        <InputField
          label="Durée"
          value={years}
          onChangeText={setYears}
          suffix="ans"
          placeholder="10"
        />
        <InputField
          label="Rendement annuel de l'épargne (optionnel)"
          value={savingsRate}
          onChangeText={setSavingsRate}
          suffix="%"
          placeholder="0"
        />
        <InputField
          label="Taux d'inflation (ajustable)"
          value={customInflation ?? String(profile.illustrativeInflationRate)}
          onChangeText={(v) => setCustomInflation(v)}
          suffix="%/an"
          placeholder={String(profile.illustrativeInflationRate)}
        />
      </Card>

      {result && (
        <>
          <Card>
            <Text style={[text.h3, { marginBottom: 16 }]}>Impact sur le pouvoir d'achat</Text>

            <View style={components.highlightBox}>
              <Text style={text.bodySmall}>Pouvoir d'achat réel dans {years} ans</Text>
              <Text style={[text.h1, text.primary, { marginTop: 4 }]}>
                {formatValue(result.finalRealValue)}
              </Text>
              <Text style={[text.caption, { marginTop: 4 }]}>
                vs {formatValue(result.finalNominalValue)} en valeur nominale
              </Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
              <View style={components.statBox}>
                <Text style={text.caption}>Perte de pouvoir d'achat</Text>
                <Text style={[text.h3, { color: Colors.danger, marginTop: 4 }]}>
                  −{formatValue(result.totalPurchasingPowerLost)}
                </Text>
              </View>
              <View style={components.statBox}>
                <Text style={text.caption}>Érosion estimée</Text>
                <Text style={[text.h3, { marginTop: 4 }]}>
                  {result.lossPercent.toFixed(0)} %
                </Text>
              </View>
            </View>

            <Text style={[text.label, { marginBottom: 8 }]}>
              Ce que {formatValue(result.initialAmount)} achètera dans {years} ans
            </Text>
            <ProgressBar
              progress={Math.max(0, 100 - result.lossPercent)}
              label="Pouvoir d'achat conservé"
            />
          </Card>

          {chartData && (
            <Card>
              <Text style={[text.h3, { marginBottom: 4 }]}>Évolution dans le temps</Text>
              <View style={{ flexDirection: 'row', gap: 16, marginBottom: 12 }}>
                <View style={layout.row}>
                  <View
                    style={{
                      width: 12,
                      height: 3,
                      backgroundColor: Colors.textSecondary,
                      marginRight: 6,
                    }}
                  />
                  <Text style={text.caption}>Nominal</Text>
                </View>
                <View style={layout.row}>
                  <View
                    style={{
                      width: 12,
                      height: 3,
                      backgroundColor: Colors.primary,
                      marginRight: 6,
                    }}
                  />
                  <Text style={text.caption}>Réel</Text>
                </View>
              </View>
              <View pointerEvents="none">
                <LineChart
                  data={{
                    labels: chartData.labels,
                    datasets: chartData.datasets,
                  }}
                  width={screenWidth - 72}
                  height={220}
                  yAxisLabel=""
                  yAxisSuffix=""
                  withDots={false}
                  chartConfig={{
                    backgroundColor: Colors.surface,
                    backgroundGradientFrom: Colors.surface,
                    backgroundGradientTo: Colors.surface,
                    decimalPlaces: 0,
                    color: () => Colors.primary,
                    labelColor: () => Colors.textSecondary,
                    propsForBackgroundLines: { stroke: Colors.border },
                  }}
                  bezier
                  style={{ borderRadius: 12 }}
                  formatYLabel={(v) => {
                    const n = parseInt(v, 10);
                    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
                    if (n >= 1_000) return `${Math.round(n / 1_000)}k`;
                    return v;
                  }}
                />
              </View>
            </Card>
          )}

          <Card style={{ backgroundColor: 'rgba(45, 106, 106, 0.06)' }}>
            <Text style={[text.label, text.primary, { marginBottom: 8 }]}>
              Ce qu'il faut retenir
            </Text>
            <Text style={[text.body, { lineHeight: 24, marginBottom: 12 }]}>{result.insight}</Text>
            <Text style={[text.bodySmall, { lineHeight: 22 }]}>
              Exemple concret : avec {inflationRate} % d'inflation par an, ce qui coûte{' '}
              {formatValue(100)} aujourd'hui coûtera environ{' '}
              {formatValue(Math.round(100 * Math.pow(1 + inflationRate / 100, 5)))} dans 5 ans.
            </Text>
          </Card>

          <Card>
            <Text style={[text.bodySmall, { textAlign: 'center', lineHeight: 22, color: Colors.secondary }]}>
              ⚠️ Taux illustratifs à but pédagogique uniquement. Les taux réels varient selon
              les pays, les années et les catégories de dépenses. Ne constitue pas un conseil
              financier.
            </Text>
          </Card>
        </>
      )}
    </ScrollView>
  );
}
