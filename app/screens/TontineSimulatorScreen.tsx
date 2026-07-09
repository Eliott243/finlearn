import { useState, useMemo, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Card } from '../components';
import { Colors } from '../constants/colors';
import { layout, text, components } from '../constants/styles';
import { useCurrency } from '../hooks/useCurrency';
import { useAvatars } from '../context/AvatarContext';
import { checkAvatarOnTontineSimulation } from '../utils/avatarUnlock';
import {
  calculateTontine,
  type TontineFrequency,
} from '../utils/tontine';

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

function FrequencyButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: active ? Colors.primary : Colors.border,
        backgroundColor: active ? 'rgba(45, 106, 106, 0.08)' : Colors.surface,
        alignItems: 'center',
      }}
      onPress={onPress}
    >
      <Text style={[text.bodySmall, active && { color: Colors.primary, fontWeight: '600' }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export function TontineSimulatorScreen() {
  const { format, suffix, chartSuffix } = useCurrency();
  const { queueUnlocks } = useAvatars();
  const tontineUnlockChecked = useRef(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [participants, setParticipants] = useState('10');
  const [contribution, setContribution] = useState('50');
  const [receiveRank, setReceiveRank] = useState('3');
  const [frequency, setFrequency] = useState<TontineFrequency>('monthly');

  const participantCount = parseInt(participants, 10) || 0;
  const rank = parseInt(receiveRank, 10) || 0;

  const result = useMemo(() => {
    return calculateTontine({
      participants: participantCount,
      contribution: parseFloat(contribution) || 0,
      frequency,
      receiveRank: rank,
    });
  }, [participantCount, contribution, frequency, rank]);

  useEffect(() => {
    if (!result || !hasInteracted || tontineUnlockChecked.current) return;
    tontineUnlockChecked.current = true;
    checkAvatarOnTontineSimulation().then((id) => {
      if (id) queueUnlocks([id]);
    });
  }, [result, hasInteracted, queueUnlocks]);

  const chartData = useMemo(() => {
    if (!result) return null;
    return {
      labels: ['Épargne\nindividuelle', 'Cagnotte\ntontine'],
      datasets: [
        {
          data: [result.individualSavingsAtReceive, result.potReceived],
        },
      ],
    };
  }, [result]);

  return (
    <ScrollView
      style={layout.screen}
      contentContainerStyle={[layout.scrollContent, { paddingBottom: 48 }]}
      keyboardShouldPersistTaps="handled"
      nestedScrollEnabled
      showsVerticalScrollIndicator
    >
      <Text style={[text.body, { color: Colors.textSecondary, marginTop: 8, marginBottom: 20 }]}>
        Simulez une tontine rotative : visualisez quand vous recevrez la cagnotte et comparez
        avec une épargne individuelle sur la même durée. Simulation illustrative.
      </Text>

      <Card>
        <InputField
          label="Nombre de participants"
          value={participants}
          onChangeText={(v) => {
            setHasInteracted(true);
            setParticipants(v);
          }}
          placeholder="10"
        />
        <InputField
          label="Cotisation par personne"
          value={contribution}
          onChangeText={(v) => {
            setHasInteracted(true);
            setContribution(v);
          }}
          suffix={suffix}
          placeholder="50"
        />
        <InputField
          label="Votre rang de réception"
          value={receiveRank}
          onChangeText={(v) => {
            setHasInteracted(true);
            setReceiveRank(v);
          }}
          placeholder="3"
          suffix={`/ ${participantCount || '?'}`}
        />

        <Text style={[text.label, { marginBottom: 8 }]}>Fréquence des cotisations</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <FrequencyButton
            label="Mensuel"
            active={frequency === 'monthly'}
            onPress={() => {
              setHasInteracted(true);
              setFrequency('monthly');
            }}
          />
          <FrequencyButton
            label="Hebdomadaire"
            active={frequency === 'weekly'}
            onPress={() => {
              setHasInteracted(true);
              setFrequency('weekly');
            }}
          />
        </View>
      </Card>

      {result && (
        <>
          <Card>
            <Text style={[text.h3, { marginBottom: 16 }]}>Votre réception</Text>

            <View style={components.highlightBox}>
              <Text style={text.bodySmall}>Vous recevez la cagnotte après</Text>
              <Text style={[text.h1, text.primary, { marginTop: 4 }]}>
                {result.durationLabel}
              </Text>
              <Text style={[text.caption, { marginTop: 4 }]}>
                Tour n°{result.periodsUntilReceive} sur {participantCount}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 12, marginBottom: 8 }}>
              <View style={components.statBox}>
                <Text style={text.caption}>Total versé à ce moment</Text>
                <Text style={[text.h3, { marginTop: 4 }]}>
                  {format(result.totalPaidAtReceive)}
                </Text>
              </View>
              <View style={components.statBox}>
                <Text style={text.caption}>Cagnotte reçue</Text>
                <Text style={[text.h3, text.success, { marginTop: 4 }]}>
                  {format(result.potReceived)}
                </Text>
              </View>
            </View>

            {result.earlyAccessGap > 0 && (
              <View
                style={{
                  padding: 12,
                  backgroundColor: 'rgba(91, 141, 239, 0.08)',
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: 'rgba(91, 141, 239, 0.2)',
                }}
              >
                <Text style={[text.label, { color: Colors.accent, marginBottom: 4 }]}>
                  Écart vs épargne individuelle
                </Text>
                <Text style={text.body}>
                  +{format(result.earlyAccessGap)} de liquidité anticipée par rapport à
                  une épargne personnelle de {format(result.individualSavingsAtReceive)} sur
                  la même durée.
                </Text>
              </View>
            )}
          </Card>

          {chartData && (
            <Card>
              <Text style={[text.h3, { marginBottom: 16 }]}>
                Comparaison au moment de la réception
              </Text>
              <View pointerEvents="none">
                <BarChart
                  data={chartData}
                  width={screenWidth - 72}
                  height={220}
                  yAxisLabel=""
                  yAxisSuffix={chartSuffix}
                  fromZero
                  showValuesOnTopOfBars
                  chartConfig={{
                    backgroundColor: Colors.surface,
                    backgroundGradientFrom: Colors.surface,
                    backgroundGradientTo: Colors.surface,
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(45, 106, 106, ${opacity})`,
                    labelColor: () => Colors.textSecondary,
                    propsForBackgroundLines: { stroke: Colors.border },
                  }}
                  style={{ borderRadius: 12 }}
                />
              </View>
              <Text style={[text.caption, { marginTop: 12, textAlign: 'center' }]}>
                À la {result.periodsUntilReceive}e {frequency === 'weekly' ? 'semaine' : 'mensualité'},
                la tontine vous donne accès à la cagnotte collective.
              </Text>
            </Card>
          )}

          <Card>
            <Text style={[text.h3, { marginBottom: 12 }]}>Calendrier des tours</Text>
            {result.rounds.map((round) => (
              <View
                key={round.round}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                  paddingHorizontal: 12,
                  marginBottom: 6,
                  borderRadius: 10,
                  backgroundColor: round.isYourRound
                    ? 'rgba(45, 106, 106, 0.1)'
                    : Colors.background,
                  borderWidth: round.isYourRound ? 1 : 0,
                  borderColor: 'rgba(45, 106, 106, 0.3)',
                }}
              >
                <Text style={[text.bodySmall, { width: 70 }]}>
                  {frequency === 'weekly' ? 'S' : 'M'}{round.round}
                </Text>
                <Text style={[text.body, { flex: 1 }]}>
                  Participant n°{round.recipientRank}
                  {round.isYourRound ? ' (vous)' : ''}
                </Text>
                <Text style={[text.bodySmall, text.primary]}>
                  {format(round.potAmount)}
                </Text>
              </View>
            ))}
            <Text style={[text.caption, { marginTop: 8 }]}>
              Versé sur le cycle complet : {format(result.totalPaidFullCycle)} ({participantCount} × {format(parseFloat(contribution) || 0)})
            </Text>
          </Card>

          <Card style={{ backgroundColor: 'rgba(45, 106, 106, 0.06)' }}>
            <Text style={[text.label, text.primary, { marginBottom: 8 }]}>
              Ce qu'il faut retenir
            </Text>
            <Text style={[text.body, { lineHeight: 24 }]}>{result.insight}</Text>
            <Text style={[text.bodySmall, { marginTop: 12, lineHeight: 22 }]}>
              Sur un cycle complet, chaque participant verse et reçoit exactement la même
              somme ({format(result.totalPaidFullCycle)}). La différence, c'est le
              moment où vous accédez à la liquidité — pas le montant final.
            </Text>
          </Card>
        </>
      )}

      {participantCount >= 2 && rank > participantCount && (
        <Card style={{ backgroundColor: 'rgba(196, 92, 92, 0.08)' }}>
          <Text style={[text.bodySmall, { color: Colors.danger }]}>
            Votre rang de réception ne peut pas dépasser le nombre de participants ({participantCount}).
          </Text>
        </Card>
      )}
    </ScrollView>
  );
}
