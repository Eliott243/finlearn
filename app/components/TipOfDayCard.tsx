import { View, Text, TouchableOpacity } from 'react-native';
import { Card } from './Card';
import { TIP_CATEGORY_LABELS, type Tip } from '../data/tips';
import { text } from '../constants/styles';
import { Colors } from '../constants/colors';

interface TipOfDayCardProps {
  tip: Tip;
  onPressLibrary?: () => void;
}

export function TipOfDayCard({ tip, onPressLibrary }: TipOfDayCardProps) {
  return (
    <Card>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <Text style={[text.label, text.primary]}>💡 Astuce du jour</Text>
        <View
          style={{
            backgroundColor: 'rgba(45, 106, 106, 0.12)',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 8,
          }}
        >
          <Text style={[text.bodySmall, { fontSize: 11, color: Colors.primary }]}>
            {TIP_CATEGORY_LABELS[tip.category]}
          </Text>
        </View>
      </View>
      <Text style={[text.body, { lineHeight: 24 }]}>{tip.text}</Text>
      {onPressLibrary && (
        <TouchableOpacity onPress={onPressLibrary} style={{ marginTop: 12 }}>
          <Text style={[text.bodySmall, text.primary, { fontWeight: '600' }]}>
            Voir toutes les astuces →
          </Text>
        </TouchableOpacity>
      )}
    </Card>
  );
}
