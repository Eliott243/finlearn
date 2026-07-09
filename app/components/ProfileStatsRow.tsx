import { View, Text } from 'react-native';
import { text } from '../constants/styles';
import { Colors } from '../constants/colors';

interface StatBlockProps {
  value: string;
  label: string;
}

function StatBlock({ value, label }: StatBlockProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={[text.h2, text.primary, { fontSize: 22 }]}>{value}</Text>
      <Text style={[text.caption, { marginTop: 4, textAlign: 'center' }]}>{label}</Text>
    </View>
  );
}

interface ProfileStatsRowProps {
  lessonsCompleted: number;
  averageQuizScore: number | null;
  activeDays: number;
}

export function ProfileStatsRow({
  lessonsCompleted,
  averageQuizScore,
  activeDays,
}: ProfileStatsRowProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: Colors.surface,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.border,
        paddingVertical: 16,
        paddingHorizontal: 8,
        marginBottom: 16,
      }}
    >
      <StatBlock value={String(lessonsCompleted)} label="Leçons" />
      <View style={{ width: 1, backgroundColor: Colors.border, marginVertical: 4 }} />
      <StatBlock
        value={averageQuizScore !== null ? `${averageQuizScore}%` : '—'}
        label="Score moyen"
      />
      <View style={{ width: 1, backgroundColor: Colors.border, marginVertical: 4 }} />
      <StatBlock value={String(activeDays)} label="Jours actifs" />
    </View>
  );
}
