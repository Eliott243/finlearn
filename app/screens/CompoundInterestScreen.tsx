import { useState, useMemo } from 'react';
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
import { calculateCompoundInterest } from '../utils/compoundInterest';

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
        {suffix && (
          <Text style={[text.bodySmall, { marginLeft: 8 }]}>{suffix}</Text>
        )}
      </View>
    </View>
  );
}

export function CompoundInterestScreen() {
  const { format, suffix, chartSuffix } = useCurrency();
  const [initialAmount, setInitialAmount] = useState('1000');
  const [monthlyContribution, setMonthlyContribution] = useState('200');
  const [years, setYears] = useState('20');
  const [annualRate, setAnnualRate] = useState('7');

  const result = useMemo(() => {
    const input = {
      initialAmount: parseFloat(initialAmount) || 0,
      monthlyContribution: parseFloat(monthlyContribution) || 0,
      years: parseInt(years, 10) || 0,
      annualRate: parseFloat(annualRate) || 0,
    };
    if (input.years <= 0) return null;
    return calculateCompoundInterest(input);
  }, [initialAmount, monthlyContribution, years, annualRate]);

  const chartData = useMemo(() => {
    if (!result || result.yearlyData.length === 0) return null;

    const labels = result.yearlyData.map((d) =>
      d.year % 5 === 0 || d.year === result.yearlyData.length ? `${d.year}a` : ''
    );

    return {
      labels,
      datasets: [
        {
          data: result.yearlyData.map((d) => d.total),
          color: () => Colors.chartLine,
          strokeWidth: 2,
        },
      ],
    };
  }, [result]);

  const interestPercent =
    result && result.finalAmount > 0
      ? (result.totalInterest / result.finalAmount) * 100
      : 0;

  const contributionsPercent = 100 - interestPercent;
  const chartWidth = Math.max(screenWidth - 72, (result?.yearlyData.length ?? 0) * 40);

  return (
    <ScrollView
      style={layout.screen}
      contentContainerStyle={[layout.scrollContent, { paddingBottom: 48 }]}
      keyboardShouldPersistTaps="handled"
      nestedScrollEnabled
      showsVerticalScrollIndicator
    >
      <Text style={[text.body, { color: Colors.textSecondary, marginTop: 8, marginBottom: 20 }]}>
        Estimez la croissance de votre capital grâce aux intérêts composés.
        Résultat illustratif, sans valeur de conseil.
      </Text>

      <Card>
        <InputField
          label="Montant initial"
          value={initialAmount}
          onChangeText={setInitialAmount}
          suffix={suffix}
          placeholder="1000"
        />
        <InputField
          label="Versement mensuel"
          value={monthlyContribution}
          onChangeText={setMonthlyContribution}
          suffix={`${suffix}/mois`}
          placeholder="200"
        />
        <InputField
          label="Durée"
          value={years}
          onChangeText={setYears}
          suffix="ans"
          placeholder="20"
        />
        <InputField
          label="Taux de rendement annuel estimé"
          value={annualRate}
          onChangeText={setAnnualRate}
          suffix="%"
          placeholder="7"
        />
      </Card>

      {result && (
        <>
          <Card>
            <Text style={[text.h3, { marginBottom: 16 }]}>Résultats</Text>

            <View style={components.highlightBox}>
              <Text style={text.bodySmall}>Capital final estimé</Text>
              <Text style={[text.h1, text.primary, { marginTop: 4 }]}>
                {format(result.finalAmount)}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
              <View style={components.statBox}>
                <Text style={text.caption}>Versements totaux</Text>
                <Text style={[text.h3, { marginTop: 4 }]}>
                  {format(result.totalContributions)}
                </Text>
              </View>
              <View style={components.statBox}>
                <Text style={text.caption}>Intérêts générés</Text>
                <Text style={[text.h3, text.success, { marginTop: 4 }]}>
                  {format(result.totalInterest)}
                </Text>
              </View>
            </View>

            <Text style={[text.label, { marginBottom: 8 }]}>
              Répartition du capital final
            </Text>
            <ProgressBar progress={contributionsPercent} label="Versements" showPercent />
            <View style={{ marginTop: 8 }}>
              <ProgressBar progress={interestPercent} label="Intérêts composés" showPercent />
            </View>
          </Card>

          {chartData && (
            <Card>
              <Text style={[text.h3, { marginBottom: 16 }]}>Évolution du capital</Text>
              <View style={{ overflow: 'hidden' }} pointerEvents="none">
                <LineChart
                  data={chartData}
                  width={chartWidth}
                  height={220}
                  yAxisLabel=""
                  yAxisSuffix={chartSuffix}
                  withVerticalLines={false}
                  withHorizontalLines
                  withDots={false}
                  withInnerLines
                  withOuterLines={false}
                  chartConfig={{
                    backgroundColor: Colors.surface,
                    backgroundGradientFrom: Colors.surface,
                    backgroundGradientTo: Colors.surface,
                    decimalPlaces: 0,
                    color: () => Colors.chartLine,
                    labelColor: () => Colors.textSecondary,
                    propsForDots: { r: '0' },
                    propsForBackgroundLines: {
                      strokeDasharray: '',
                      stroke: Colors.border,
                    },
                  }}
                  bezier
                  style={{ borderRadius: 12 }}
                  formatYLabel={(v) =>
                    parseInt(v, 10) >= 1000
                      ? `${Math.round(parseInt(v, 10) / 1000)}k`
                      : v
                  }
                />
              </View>
              <Text style={[text.caption, { marginTop: 12, textAlign: 'center' }]}>
                Simulation basée sur un taux constant. Les rendements passés ne préjugent
                pas des rendements futurs.
              </Text>
            </Card>
          )}

          <Card style={{ marginBottom: 8 }}>
            <Text style={[text.h3, { marginBottom: 8 }]}>Lecture du simulateur</Text>
            <Text style={[text.bodySmall, { lineHeight: 22 }]}>
              Plus la durée est longue, plus la part des intérêts composés augmente par
              rapport à vos versements. C'est l'effet boule de neige : les gains génèrent
              eux-mêmes des gains.
            </Text>
            <Text style={[text.bodySmall, { lineHeight: 22, marginTop: 12 }]}>
              Testez différents scénarios : augmenter le versement mensuel de 50 € ou
              commencer 5 ans plus tôt peut parfois avoir plus d'impact qu'un taux
              légèrement supérieur.
            </Text>
          </Card>
        </>
      )}
    </ScrollView>
  );
}
