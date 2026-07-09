import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { DisclaimerBanner } from '../components';
import { clearProgress } from '../utils/storage';
import { useProgress } from '../context/ProgressContext';
import {
  getPreferences,
  savePreferences,
  scheduleIntroOnNextLaunch,
  getCurrencyMeta,
  type UserPreferences,
} from '../utils/preferences';
import type { ProfileStackParamList } from '../data/types';
import {
  requestNotificationPermission,
  scheduleDailyTipNotification,
  cancelDailyNotifications,
} from '../utils/notifications';
import { layout, text } from '../constants/styles';
import { Colors } from '../constants/colors';

type Nav = NativeStackNavigationProp<ProfileStackParamList, 'Settings'>;

export function SettingsScreen() {
  const navigation = useNavigation<Nav>();
  const { refreshProgress } = useProgress();
  const [prefs, setPrefs] = useState<UserPreferences | null>(null);

  useEffect(() => {
    getPreferences().then(setPrefs);
  }, []);

  const toggleNotifications = async (enabled: boolean) => {
    if (enabled) {
      const granted = await requestNotificationPermission();
      if (!granted) {
        Alert.alert(
          'Notifications désactivées',
          'Activez les notifications dans les réglages de votre appareil pour recevoir l\'astuce du jour.'
        );
        return;
      }
      await scheduleDailyTipNotification();
    } else {
      await cancelDailyNotifications();
    }
    const updated = await savePreferences({ dailyNotifications: enabled });
    setPrefs(updated);
  };

  const handleReset = () => {
    Alert.alert(
      'Réinitialiser la progression',
      'Toutes vos leçons complétées, scores et badges seront effacés. Continuer ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Réinitialiser',
          style: 'destructive',
          onPress: async () => {
            await clearProgress();
            await refreshProgress();
          },
        },
      ]
    );
  };

  const handleReplayIntro = () => {
    Alert.alert(
      'Rejouer l’intro',
      'L’animation de démarrage sera rejouée au prochain lancement de l’app.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Rejouer',
          onPress: async () => {
            const updated = await scheduleIntroOnNextLaunch();
            setPrefs(updated);
            Alert.alert('OK', 'Fermez puis relancez l’app pour voir l’intro.');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={layout.screen} contentContainerStyle={layout.scrollContent}>
      <View style={{ marginTop: 16, marginBottom: 24 }}>
        <DisclaimerBanner />
      </View>

      {prefs && (
        <View
          style={{
            backgroundColor: Colors.surface,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: Colors.border,
            padding: 16,
            marginBottom: 20,
          }}
        >
          <Text style={[text.body, { fontWeight: '600', marginBottom: 12 }]}>Préférences</Text>
          <Text style={text.bodySmall}>Pays : {prefs.country}</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('CurrencySettings')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 12,
              paddingVertical: 8,
            }}
          >
            <View>
              <Text style={text.bodySmall}>Devise</Text>
              <Text style={[text.body, { fontWeight: '600', marginTop: 2 }]}>
                {getCurrencyMeta(prefs.currency).flag} {getCurrencyMeta(prefs.currency).label}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 16,
              paddingTop: 16,
              borderTopWidth: 1,
              borderTopColor: Colors.border,
            }}
          >
            <View style={{ flex: 1, marginRight: 12 }}>
              <Text style={[text.body, { fontWeight: '600' }]}>Astuce du jour</Text>
              <Text style={text.bodySmall}>Notification quotidienne à 9h</Text>
            </View>
            <Switch
              value={prefs.dailyNotifications}
              onValueChange={toggleNotifications}
              trackColor={{ false: Colors.border, true: Colors.primary }}
            />
          </View>
        </View>
      )}

      <View
        style={{
          backgroundColor: Colors.surface,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: Colors.border,
          padding: 16,
          marginBottom: 20,
        }}
      >
        <Text style={[text.body, { fontWeight: '600', marginBottom: 8 }]}>À propos</Text>
        <Text style={[text.bodySmall, { lineHeight: 22 }]}>
          FinLearn v1.0.0{'\n'}
          Application éducative d'apprentissage des finances personnelles.{'\n\n'}
          Fonctionne hors ligne après le premier chargement.{'\n\n'}
          Contenu éducatif, ne constitue pas un conseil en investissement.
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: 'rgba(45, 106, 106, 0.08)',
          borderWidth: 1,
          borderColor: 'rgba(45, 106, 106, 0.25)',
          borderRadius: 12,
          paddingVertical: 16,
          alignItems: 'center',
          marginBottom: 12,
        }}
        onPress={handleReplayIntro}
      >
        <Text style={{ color: Colors.primary, fontWeight: '700' }}>Rejouer l’intro</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: 'rgba(196, 92, 92, 0.1)',
          borderWidth: 1,
          borderColor: 'rgba(196, 92, 92, 0.3)',
          borderRadius: 12,
          paddingVertical: 16,
          alignItems: 'center',
        }}
        onPress={handleReset}
      >
        <Text style={{ color: Colors.danger, fontWeight: '600' }}>Réinitialiser la progression</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
