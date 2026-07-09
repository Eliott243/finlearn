import { View, Text } from 'react-native';
import { getStreakEmoji } from '../utils/streak';
import { text } from '../constants/styles';
import { Colors } from '../constants/colors';

interface StreakBadgeProps {
  streak: number;
}

export function StreakBadge({ streak }: StreakBadgeProps) {
  if (streak < 1) return null;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(45, 106, 106, 0.1)',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        alignSelf: 'flex-start',
      }}
    >
      <Text style={{ fontSize: 18, marginRight: 6 }}>{getStreakEmoji(streak)}</Text>
      <Text style={[text.bodySmall, { fontWeight: '600', color: Colors.primary }]}>
        {streak} jour{streak > 1 ? 's' : ''} d'affilée
      </Text>
    </View>
  );
}
