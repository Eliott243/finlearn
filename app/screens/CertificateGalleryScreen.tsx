import { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card } from '../components';
import { getCertificates, getLevelTitle, type LevelCertificate } from '../utils/certificates';
import type { ProfileStackParamList } from '../data/types';
import { layout, text } from '../constants/styles';
import { Colors } from '../constants/colors';

type Nav = NativeStackNavigationProp<ProfileStackParamList, 'CertificateGallery'>;

export function CertificateGalleryScreen() {
  const navigation = useNavigation<Nav>();
  const [certificates, setCertificates] = useState<LevelCertificate[]>([]);

  useFocusEffect(
    useCallback(() => {
      getCertificates().then(setCertificates);
    }, [])
  );

  return (
    <FlatList
      style={layout.screen}
      contentContainerStyle={[layout.scrollContent, { paddingBottom: 32 }]}
      data={certificates}
      keyExtractor={(item) => String(item.level)}
      ListHeaderComponent={
        <Text style={[text.bodySmall, { marginBottom: 16, lineHeight: 22 }]}>
          Vos certificats de fin de niveau. Appuyez pour afficher et partager.
        </Text>
      }
      ListEmptyComponent={
        <Card style={{ alignItems: 'center', paddingVertical: 24 }}>
          <Text style={{ fontSize: 40, marginBottom: 8 }}>📜</Text>
          <Text style={[text.body, { textAlign: 'center' }]}>
            Aucun certificat pour le moment. Complétez un niveau entier pour en obtenir un !
          </Text>
        </Card>
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CertificateCelebration', { level: item.level })
          }
        >
          <Card style={{ marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 32, marginRight: 14 }}>🎓</Text>
              <View style={{ flex: 1 }}>
                <Text style={[text.body, { fontWeight: '700' }]}>
                  {getLevelTitle(item.level)}
                </Text>
                <Text style={text.caption}>
                  {new Date(item.earnedAt).toLocaleDateString('fr-FR')}
                </Text>
              </View>
              <Text style={{ color: Colors.primary, fontSize: 18 }}>›</Text>
            </View>
          </Card>
        </TouchableOpacity>
      )}
    />
  );
}
