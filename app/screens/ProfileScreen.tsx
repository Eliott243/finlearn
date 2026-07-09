import { useCallback, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card, StreakBadge, ProfileStatsRow, SavingsGoalSection, ProfileAvatar } from '../components';
import { useAvatars } from '../context/AvatarContext';
import { useProgress } from '../context/ProgressContext';
import { RISK_PROFILE_DETAILS } from '../data/risk-profile';
import {
  getAverageQuizScore,
  getTotalActiveDays,
} from '../utils/profileStats';
import {
  getCertificates,
  syncCertificatesFromProgress,
  getLevelTitle,
  type LevelCertificate,
} from '../utils/certificates';
import { getUserDisplayName } from '../utils/userDisplay';
import type { ProfileStackParamList } from '../data/types';
import { layout, text } from '../constants/styles';
import { Colors } from '../constants/colors';

type Nav = NativeStackNavigationProp<ProfileStackParamList, 'Profile'>;

const BADGE_LABELS: Record<string, string> = {
  'badge-n1-epargne-precaution': '🛡️ Épargne de précaution',
  'badge-n1-budget': '📝 Maître du budget',
  'badge-n1-automatisation': '⚙️ Épargnant automatique',
  'badge-n1-credit-dette': '💳 Crédit maîtrisé',
  'badge-n1-mobile-money': '📱 Mobile money',
  'badge-n1-inflation-devises': '🌍 Devises & inflation',
  'badge-n1-budget-zero': '📒 Budget zero-based',
  'badge-n1-frais-bancaires': '🧾 Lecteur de relevés',
  'badge-n2-risque-rendement': '⚖️ Risque et rendement',
  'badge-n2-interets-composes': '🌱 Intérêts composés',
  'badge-n2-inflation': '💸 Inflation maîtrisée',
  'badge-n3-etf': '📦 Expert ETF',
  'badge-n3-enveloppes': '📋 Enveloppes fiscales',
  'badge-n3-fiche-etf': '🔍 Lecteur de fiches',
  'badge-n3-diversification': '🧺 Diversification',
  'badge-etf-reader': '📄 Fiches ETF (outil)',
  'badge-risk-profile': '🎯 Profil de risque identifié',
};

export function ProfileScreen() {
  const navigation = useNavigation<Nav>();
  const { progress } = useProgress();
  const { refreshAvatars } = useAvatars();
  const [certificates, setCertificates] = useState<LevelCertificate[]>([]);

  const averageScore = getAverageQuizScore(progress);
  const activeDays = getTotalActiveDays(progress);

  useFocusEffect(
    useCallback(() => {
      refreshAvatars();
      (async () => {
        const name = await getUserDisplayName();
        const synced = await syncCertificatesFromProgress(progress, name);
        setCertificates(synced);
      })();
    }, [progress, refreshAvatars])
  );

  return (
    <ScrollView style={layout.screen} contentContainerStyle={layout.scrollContent}>
      <Card style={{ alignItems: 'center', paddingVertical: 24, marginTop: 8 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Avatars')} activeOpacity={0.8}>
          <ProfileAvatar size={88} />
        </TouchableOpacity>
        <Text style={[text.h2, { marginTop: 12 }]}>Apprenant FinLearn</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Avatars')} style={{ marginTop: 8 }}>
          <Text style={[text.bodySmall, { color: Colors.primary, fontWeight: '600' }]}>
            Mes avatars
          </Text>
        </TouchableOpacity>
        {(progress.streak ?? 0) > 0 && (
          <View style={{ marginTop: 8 }}>
            <StreakBadge streak={progress.streak ?? 0} />
          </View>
        )}
        {progress.riskProfile && (
          <Text style={[text.bodySmall, { marginTop: 4 }]}>
            {RISK_PROFILE_DETAILS[progress.riskProfile].emoji}{' '}
            {RISK_PROFILE_DETAILS[progress.riskProfile].title}
          </Text>
        )}
      </Card>

      <ProfileStatsRow
        lessonsCompleted={progress.completedLessons.length}
        averageQuizScore={averageScore}
        activeDays={activeDays}
      />

      <SavingsGoalSection />

      {certificates.length > 0 && (
        <>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
            <Text style={text.h3}>Certificats</Text>
            <TouchableOpacity onPress={() => navigation.navigate('CertificateGallery')}>
              <Text style={[text.bodySmall, { color: Colors.primary, fontWeight: '600' }]}>
                Tout voir
              </Text>
            </TouchableOpacity>
          </View>
          {certificates.slice(0, 2).map((cert) => (
            <TouchableOpacity
              key={cert.level}
              onPress={() =>
                navigation.navigate('CertificateCelebration', { level: cert.level })
              }
            >
              <Card style={{ marginBottom: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 28, marginRight: 12 }}>🎓</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={[text.body, { fontWeight: '600' }]}>
                      {getLevelTitle(cert.level)}
                    </Text>
                    <Text style={text.caption}>
                      {new Date(cert.earnedAt).toLocaleDateString('fr-FR')}
                    </Text>
                  </View>
                  <Text style={{ color: Colors.primary }}>›</Text>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </>
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Referral')}>
        <Card style={{ marginBottom: 16, backgroundColor: 'rgba(91, 141, 239, 0.06)' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 32, marginRight: 14 }}>🤝</Text>
            <View style={{ flex: 1 }}>
              <Text style={[text.body, { fontWeight: '700' }]}>Parrainer un ami</Text>
              <Text style={text.bodySmall}>Partagez votre code FinLearn</Text>
            </View>
            <Text style={{ color: Colors.primary, fontSize: 18 }}>›</Text>
          </View>
        </Card>
      </TouchableOpacity>

      <Text style={[text.h3, { marginBottom: 12 }]}>Badges</Text>
      {progress.badges.length > 0 ? (
        progress.badges.map((badge) => (
          <Card key={badge} style={{ marginBottom: 8 }}>
            <Text style={text.body}>{BADGE_LABELS[badge] ?? `🎖️ ${badge}`}</Text>
          </Card>
        ))
      ) : (
        <Card style={{ alignItems: 'center', paddingVertical: 16, marginBottom: 16 }}>
          <Text style={text.bodySmall}>
            Complétez des quiz avec 60 %+ pour valider un module. Badge à 80 %+.
          </Text>
        </Card>
      )}

      <TouchableOpacity
        style={{
          backgroundColor: Colors.surface,
          borderWidth: 1,
          borderColor: Colors.border,
          borderRadius: 12,
          paddingVertical: 16,
          alignItems: 'center',
          marginTop: 8,
        }}
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={[text.body, { color: Colors.primary, fontWeight: '600' }]}>
          Paramètres
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
