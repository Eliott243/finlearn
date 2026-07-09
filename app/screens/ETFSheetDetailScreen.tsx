import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { Card } from '../components';
import { getETFById } from '../data/etf-sheets';
import { ETF_READING_STEPS } from '../data/etf-learning';
import { markETFSheetViewed } from '../utils/storage';
import { useProgress } from '../context/ProgressContext';
import type { ToolsStackParamList } from '../data/types';
import { layout, text, components } from '../constants/styles';
import { Colors } from '../constants/colors';

type Route = RouteProp<ToolsStackParamList, 'ETFSheetDetail'>;

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={[text.label, text.primary, { marginBottom: 4 }]}>{label}</Text>
      <Text style={text.body}>{value}</Text>
    </View>
  );
}

export function ETFSheetDetailScreen() {
  const route = useRoute<Route>();
  const navigation = useNavigation();
  const { refreshProgress } = useProgress();
  const etf = getETFById(route.params.etfId);

  if (!etf) {
    return (
      <View style={[layout.screen, layout.center]}>
        <Text style={text.bodySmall}>Fiche introuvable</Text>
        <TouchableOpacity style={[components.button, { marginTop: 16 }]} onPress={() => navigation.goBack()}>
          <Text style={components.buttonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleMarkViewed = async () => {
    await markETFSheetViewed(etf.id);
    await refreshProgress();
    navigation.goBack();
  };

  return (
    <ScrollView style={layout.screen} contentContainerStyle={[layout.scrollContent, { paddingBottom: 40 }]}>
      <Text style={[text.h2, { marginTop: 8 }]}>{etf.name}</Text>
      <Text style={[text.bodySmall, { marginTop: 4, marginBottom: 20 }]}>{etf.description}</Text>

      <Card>
        <Text style={[text.h3, { marginBottom: 16 }]}>Éléments clés de la fiche</Text>
        <InfoRow label="Indice répliqué" value={etf.index} />
        <InfoRow label="TER (frais annuels)" value={etf.ter} />
        <InfoRow label="Réplication" value={etf.replicationType} />
        <InfoRow label="Zone / exposition" value={etf.region} />
      </Card>

      <Card>
        <Text style={[text.h3, { marginBottom: 12 }]}>Guide de lecture</Text>
        {ETF_READING_STEPS.map((step) => (
          <View key={step.id} style={{ marginBottom: 12 }}>
            <Text style={[text.body, { fontWeight: '600' }]}>
              {step.icon} {step.title}
            </Text>
            <Text style={[text.bodySmall, { marginTop: 4, lineHeight: 20 }]}>{step.description}</Text>
          </View>
        ))}
      </Card>

      <Card style={{ backgroundColor: 'rgba(91, 141, 239, 0.06)', borderColor: 'rgba(91, 141, 239, 0.2)' }}>
        <Text style={[text.label, { color: Colors.accent, marginBottom: 10 }]}>Termes à connaître</Text>
        {Object.entries(etf.termDefinitions).map(([term, definition]) => (
          <View key={term} style={{ marginBottom: 12 }}>
            <Text style={[text.body, { fontWeight: '600' }]}>{term}</Text>
            <Text style={[text.bodySmall, { marginTop: 2, lineHeight: 20 }]}>{definition}</Text>
          </View>
        ))}
      </Card>

      <Card style={{ backgroundColor: 'rgba(45, 106, 106, 0.06)', borderColor: 'rgba(45, 106, 106, 0.2)' }}>
        <Text style={[text.label, text.primary, { marginBottom: 8 }]}>Ce qu'il faut retenir</Text>
        <Text style={[text.body, { lineHeight: 24 }]}>
          {etf.id === 'etf-world' &&
            'Un ETF monde offre une diversification géographique large. Vérifiez que le TER reste bas (< 0,30 %).'}
          {etf.id === 'etf-sp500' &&
            'Le S&P 500 concentre le risque sur les États-Unis. Complétez avec d\'autres zones pour diversifier.'}
          {etf.id === 'etf-europe' &&
            'Un ETF Europe convient si vous souhaitez une exposition régionale, notamment via un PEA.'}
          {etf.id === 'etf-obligataire' &&
            'Les ETF obligataires réduisent la volatilité mais offrent un rendement plus modéré que les actions.'}
          {etf.id === 'etf-emerging' &&
            'Les marchés émergents offrent un potentiel de croissance plus élevé avec une volatilité accrue.'}
        </Text>
      </Card>

      <TouchableOpacity style={components.button} onPress={handleMarkViewed}>
        <Text style={components.buttonText}>Marquer comme consultée</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
