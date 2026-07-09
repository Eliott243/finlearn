import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components';
import { CURRENCIES } from '../constants/currencies';
import type { CurrencyCode } from '../constants/currencies';
import { getPreferences, savePreferences } from '../utils/preferences';
import type { ProfileStackParamList } from '../data/types';
import { layout, text } from '../constants/styles';
import { Colors } from '../constants/colors';

type Nav = NativeStackNavigationProp<ProfileStackParamList, 'CurrencySettings'>;

export function CurrencySettingsScreen() {
  const navigation = useNavigation<Nav>();
  const [selected, setSelected] = useState<CurrencyCode>('XOF');

  useEffect(() => {
    getPreferences().then((p) => setSelected(p.currency));
  }, []);

  const select = async (code: CurrencyCode) => {
    setSelected(code);
    await savePreferences({ currency: code });
  };

  return (
    <ScrollView style={layout.screen} contentContainerStyle={layout.scrollContent}>
      <Text style={[text.bodySmall, { marginBottom: 16, lineHeight: 22 }]}>
        Cette devise s'applique à tous les simulateurs et au comparateur de taux de change.
      </Text>

      {CURRENCIES.map((c) => {
        const active = selected === c.code;
        return (
          <TouchableOpacity key={c.code} onPress={() => select(c.code)} activeOpacity={0.7}>
            <Card
              style={{
                borderColor: active ? Colors.primary : Colors.border,
                backgroundColor: active ? 'rgba(45, 106, 106, 0.06)' : Colors.surface,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 28, marginRight: 14 }}>{c.flag}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[text.body, { fontWeight: active ? '700' : '500' }]}>{c.label}</Text>
                  <Text style={text.bodySmall}>{c.code}</Text>
                </View>
                {active && <Ionicons name="checkmark-circle" size={24} color={Colors.primary} />}
              </View>
            </Card>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity
        style={{ marginTop: 8, paddingVertical: 14, alignItems: 'center' }}
        onPress={() => navigation.goBack()}
      >
        <Text style={[text.body, text.primary, { fontWeight: '600' }]}>Retour</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
