import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ToolCard } from '../components';
import { useProgress } from '../context/ProgressContext';
import { RISK_PROFILE_DETAILS } from '../data/risk-profile';
import { etfSheets } from '../data/etf-sheets';
import type { ToolsStackParamList } from '../data/types';
import { layout, text } from '../constants/styles';
import { Colors } from '../constants/colors';

type Nav = NativeStackNavigationProp<ToolsStackParamList, 'Tools'>;

export function ToolsScreen() {
  const navigation = useNavigation<Nav>();
  const { progress } = useProgress();

  const riskLabel = progress.riskProfile
    ? RISK_PROFILE_DETAILS[progress.riskProfile].title
    : null;
  const etfProgress = `${progress.viewedETFSheets.length}/${etfSheets.length} fiches`;

  return (
    <ScrollView
      style={layout.screen}
      contentContainerStyle={layout.scrollContent}
    >
      <Text style={[text.body, { color: Colors.textSecondary, marginTop: 8, marginBottom: 20 }]}>
        Des simulateurs et outils pédagogiques pour mieux comprendre vos finances.
      </Text>

      <ToolCard
        title="Taux de change"
        description="Convertissez entre devises africaines et internationales"
        icon="💱"
        onPress={() => navigation.navigate('ExchangeRates')}
      />

      <ToolCard
        title="Calculateur d'inflation locale"
        description="Estimez la perte de pouvoir d'achat (FCFA, EUR, MAD…)"
        icon="💸"
        onPress={() => navigation.navigate('InflationCalculator')}
      />

      <ToolCard
        title="Simulateur de tontine digitale"
        description="Visualisez votre rang, la cagnotte et comparez à l'épargne individuelle"
        icon="🤝"
        onPress={() => navigation.navigate('TontineSimulator')}
      />

      <ToolCard
        title="Simulateur d'intérêts composés"
        description="Visualisez comment votre capital peut croître dans le temps"
        icon="📈"
        onPress={() => navigation.navigate('CompoundInterest')}
      />

      <ToolCard
        title="Quiz de profil de risque"
        description={
          riskLabel
            ? `Profil actuel : ${riskLabel}`
            : '6 questions pour découvrir votre profil investisseur'
        }
        icon="🎯"
        onPress={() => navigation.navigate('RiskProfile')}
      />

      <ToolCard
        title="Fiches ETF"
        description={
          progress.etfToolQuizPassed
            ? `Quiz validé · ${etfProgress} consultées`
            : `${etfProgress} consultées — apprenez à lire une fiche produit`
        }
        icon="📄"
        onPress={() => navigation.navigate('ETFSheets')}
      />

      <View
        style={{
          marginTop: 16,
          padding: 16,
          backgroundColor: 'rgba(74, 102, 112, 0.1)',
          borderRadius: 12,
          borderWidth: 1,
          borderColor: 'rgba(74, 102, 112, 0.2)',
        }}
      >
        <Text style={[text.bodySmall, { color: Colors.secondary, textAlign: 'center' }]}>
          Ces outils sont purement éducatifs et ne constituent pas un conseil en investissement.
        </Text>
      </View>
    </ScrollView>
  );
}
