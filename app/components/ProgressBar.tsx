import { View, Text } from 'react-native';
import { components, text } from '../constants/styles';

interface ProgressBarProps {
  progress: number;
  label?: string;
  showPercent?: boolean;
  height?: number;
}

export function ProgressBar({
  progress,
  label,
  showPercent = true,
  height = 8,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <View>
      {(label || showPercent) && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
          {label && <Text style={text.label}>{label}</Text>}
          {showPercent && (
            <Text style={[text.label, text.primary]}>{Math.round(clamped)} %</Text>
          )}
        </View>
      )}
      <View style={[components.progressTrack, { height }]}>
        <View style={[components.progressFill, { width: `${clamped}%` }]} />
      </View>
    </View>
  );
}
