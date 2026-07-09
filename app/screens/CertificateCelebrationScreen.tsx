import { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { CertificateVisual } from '../components/CertificateVisual';
import { useProgress } from '../context/ProgressContext';
import {
  awardCertificate,
  getCertificates,
  type LevelCertificate,
} from '../utils/certificates';
import { getUserDisplayName } from '../utils/userDisplay';
import type { ProfileStackParamList } from '../data/types';
import { layout, text, components } from '../constants/styles';
import { Colors } from '../constants/colors';

type Route = RouteProp<ProfileStackParamList, 'CertificateCelebration'>;
type Nav = NativeStackNavigationProp<ProfileStackParamList, 'CertificateCelebration'>;

export function CertificateCelebrationScreen() {
  const route = useRoute<Route>();
  const navigation = useNavigation<Nav>();
  const { level } = route.params;
  const { refreshProgress } = useProgress();
  const [certificate, setCertificate] = useState<LevelCertificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [sharing, setSharing] = useState(false);
  const certRef = useRef<View>(null);

  useEffect(() => {
    (async () => {
      const name = await getUserDisplayName();
      const existing = await getCertificates();
      const found = existing.find((c) => c.level === level);
      if (found) {
        setCertificate(found);
      } else {
        const awarded = await awardCertificate(level, name);
        if (awarded) setCertificate(awarded);
      }
      await refreshProgress();
      setLoading(false);
    })();
  }, [level, refreshProgress]);

  const handleShare = useCallback(async () => {
    if (!certRef.current) return;
    try {
      setSharing(true);
      const uri = await captureRef(certRef, { format: 'png', quality: 1 });
      const available = await Sharing.isAvailableAsync();
      if (!available) {
        Alert.alert('Partage indisponible', 'Le partage n\'est pas disponible sur cet appareil.');
        return;
      }
      await Sharing.shareAsync(uri, {
        mimeType: 'image/png',
        dialogTitle: 'Partager mon certificat FinLearn',
      });
    } catch {
      Alert.alert('Erreur', 'Impossible de partager le certificat pour le moment.');
    } finally {
      setSharing(false);
    }
  }, []);

  if (loading) {
    return (
      <View style={[layout.screen, layout.center]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!certificate) {
    return (
      <View style={[layout.screen, layout.center, { padding: 32 }]}>
        <Text style={[text.body, { textAlign: 'center' }]}>
          Certificat introuvable pour ce niveau.
        </Text>
        <TouchableOpacity style={[components.button, { marginTop: 20 }]} onPress={() => navigation.goBack()}>
          <Text style={components.buttonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={layout.screen} contentContainerStyle={[layout.scrollContent, { paddingBottom: 40 }]}>
      <Text style={{ fontSize: 48, textAlign: 'center', marginBottom: 8 }}>🎉</Text>
      <Text style={[text.h2, { textAlign: 'center', marginBottom: 8 }]}>Félicitations !</Text>
      <Text style={[text.bodySmall, { textAlign: 'center', marginBottom: 24, lineHeight: 22 }]}>
        Vous avez complété un niveau entier du parcours FinLearn.
      </Text>

      <CertificateVisual ref={certRef} certificate={certificate} />

      <TouchableOpacity
        style={[components.button, { marginTop: 24 }]}
        onPress={handleShare}
        disabled={sharing}
      >
        <Text style={components.buttonText}>
          {sharing ? 'Préparation…' : 'Partager'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 12, paddingVertical: 14, alignItems: 'center' }}
        onPress={() => navigation.navigate('CertificateGallery')}
      >
        <Text style={[text.body, text.primary, { fontWeight: '600' }]}>Voir tous mes certificats</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 8, paddingVertical: 14, alignItems: 'center' }}
        onPress={() => navigation.popToTop()}
      >
        <Text style={text.bodySmall}>Retour au profil</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
