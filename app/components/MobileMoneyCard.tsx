import { View, Text } from 'react-native';
import { text } from '../constants/styles';
import { Colors } from '../constants/colors';

interface MobileMoneyCardProps {
  tip: string;
}

export function MobileMoneyCard({ tip }: MobileMoneyCardProps) {
  return (
    <View
      style={{
        marginTop: 16,
        padding: 16,
        backgroundColor: 'rgba(255, 152, 0, 0.08)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 152, 0, 0.35)',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Text style={{ fontSize: 18, marginRight: 8 }}>📱</Text>
        <Text style={[text.label, { color: '#E65100' }]}>Mobile Money Ready</Text>
      </View>
      <Text style={[text.bodySmall, { lineHeight: 22, color: Colors.textPrimary }]}>
        {tip}
      </Text>
    </View>
  );
}
