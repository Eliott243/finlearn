import { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from '../components';
import { TIPS, TIP_CATEGORY_LABELS, type TipCategory } from '../data/tips';
import { useProgress } from '../context/ProgressContext';
import { layout, text } from '../constants/styles';
import { Colors } from '../constants/colors';

const CATEGORIES: (TipCategory | 'all')[] = ['all', 'epargne', 'budget', 'dette', 'investissement'];

export function TipsLibraryScreen() {
  const { progress } = useProgress();
  const [filter, setFilter] = useState<TipCategory | 'all'>('all');

  const filtered = useMemo(
    () => (filter === 'all' ? TIPS : TIPS.filter((t) => t.category === filter)),
    [filter]
  );

  const seenCount = progress.seenTipIds?.length ?? 0;

  return (
    <ScrollView style={layout.screen} contentContainerStyle={layout.scrollContent}>
      <Text style={[text.bodySmall, { marginBottom: 16 }]}>
        {seenCount} astuce{seenCount !== 1 ? 's' : ''} consultée{seenCount !== 1 ? 's' : ''}
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setFilter(cat)}
            style={{
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: 20,
              marginRight: 8,
              backgroundColor: filter === cat ? Colors.primary : Colors.surface,
              borderWidth: 1,
              borderColor: filter === cat ? Colors.primary : Colors.border,
            }}
          >
            <Text style={{ color: filter === cat ? '#FFF' : Colors.textPrimary, fontSize: 13 }}>
              {cat === 'all' ? 'Toutes' : TIP_CATEGORY_LABELS[cat]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {filtered.map((tip) => {
        const seen = progress.seenTipIds?.includes(tip.id);
        return (
          <Card key={tip.id} style={{ marginBottom: 12, opacity: seen ? 0.85 : 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
              <Text style={[text.label, { color: Colors.primary, fontSize: 11 }]}>
                {TIP_CATEGORY_LABELS[tip.category]}
              </Text>
              {seen && <Text style={{ fontSize: 12 }}>✓</Text>}
            </View>
            <Text style={[text.body, { lineHeight: 24 }]}>{tip.text}</Text>
          </Card>
        );
      })}
    </ScrollView>
  );
}
