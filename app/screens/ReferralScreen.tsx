import { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, Share, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Card } from '../components';
import { getOrCreateReferralCode, getReferralShareMessage } from '../utils/referral';
import { text } from '../constants/styles';
import { Colors } from '../constants/colors';

export function ReferralScreen() {
  const [code, setCode] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      getOrCreateReferralCode().then(setCode);
    }, [])
  );

  const share = async () => {
    if (!code) return;
    try {
      await Share.share({ message: getReferralShareMessage(code) });
    } catch {
      Alert.alert('Erreur', 'Impossible de partager le code pour le moment.');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: Colors.background }}>
      <Card>
        <Text style={[text.h3, { marginBottom: 12 }]}>Parrainez un ami</Text>
        <Text style={[text.bodySmall, { lineHeight: 22, marginBottom: 20 }]}>
          Partagez FinLearn avec vos proches. Votre code unique leur permet de vous
          identifier lors de leur inscription.
        </Text>

        {code ? (
          <View
            style={{
              backgroundColor: 'rgba(45, 106, 106, 0.08)',
              borderRadius: 12,
              padding: 20,
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <Text style={text.caption}>Votre code</Text>
            <Text style={[text.h1, text.primary, { marginTop: 8, letterSpacing: 2 }]}>
              {code}
            </Text>
          </View>
        ) : null}

        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: 'center',
          }}
          onPress={share}
          disabled={!code}
        >
          <Text style={{ color: '#FFF', fontWeight: '700', fontSize: 16 }}>
            Partager mon code
          </Text>
        </TouchableOpacity>
      </Card>

      <View
        style={{
          marginTop: 20,
          padding: 16,
          backgroundColor: 'rgba(74, 102, 112, 0.08)',
          borderRadius: 12,
        }}
      >
        <Text style={[text.caption, { lineHeight: 20, color: Colors.secondary }]}>
          Note : ce système est une base locale uniquement. Un backend sera nécessaire
          pour valider les parrainages et débloquer les récompenses des deux côtés.
        </Text>
      </View>
    </View>
  );
}
