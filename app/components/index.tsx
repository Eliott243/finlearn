import { View, Text, TouchableOpacity } from 'react-native';
import { components, text } from '../constants/styles';
import { Card } from './Card';

export { Card } from './Card';
export { ProgressBar } from './ProgressBar';

interface ToolCardProps {
  title: string;
  description: string;
  icon: string;
  onPress: () => void;
}

export function ToolCard({ title, description, icon, onPress }: ToolCardProps) {
  return (
    <Card onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={components.iconBox}>
          <Text style={components.iconEmoji}>{icon}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[text.body, { fontWeight: '600' }]}>{title}</Text>
          <Text style={[text.bodySmall, { marginTop: 2 }]}>{description}</Text>
        </View>
        <Text style={[text.bodySmall, { fontSize: 18 }]}>›</Text>
      </View>
    </Card>
  );
}

interface DisclaimerBannerProps {
  compact?: boolean;
}

export function DisclaimerBanner({ compact = false }: DisclaimerBannerProps) {
  return (
    <View
      style={[
        components.disclaimer,
        compact && { paddingHorizontal: 12, paddingVertical: 8 },
      ]}
    >
      <Text style={[components.disclaimerText, compact && { fontSize: 11 }]}>
        ⚠️ Contenu éducatif, ne constitue pas un conseil en investissement
      </Text>
    </View>
  );
}

export { MobileMoneyCard } from './MobileMoneyCard';
export { StreakBadge } from './StreakBadge';
export { TipOfDayCard } from './TipOfDayCard';
export { NewsCarousel } from './NewsCarousel';
export { ProfileStatsRow } from './ProfileStatsRow';
export { SavingsGoalSection } from './SavingsGoalSection';
export { CertificateVisual } from './CertificateVisual';
export { ProfileAvatar, AvatarImage } from './ProfileAvatar';
export { AvatarUnlockModal } from './AvatarUnlockModal';
