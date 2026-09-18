import { useState, useEffect, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TabNavigator } from './TabNavigator';
import { ProgressProvider } from '../context/ProgressContext';
import { AvatarProvider } from '../context/AvatarContext';
import { AvatarUnlockModal } from '../components/AvatarUnlockModal';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import {
  getPreferences,
  markIntroShown,
  markAppOpened,
  shouldShowIntro,
} from '../utils/preferences';
import { recordAppOpen } from '../utils/storage';
import { checkAvatarsOnStreak } from '../utils/avatarUnlock';
import { Colors } from '../constants/colors';
import { IntroZoomAfricaScreen } from '../screens/IntroZoomAfricaScreen';
import { useAvatars } from '../context/AvatarContext';
import { isIosSimulator } from '../utils/device';
import type { UserProgress } from '../data/types';

function MainApp() {
  const { queueUnlocks } = useAvatars();

  const handleAppMount = useCallback(async (): Promise<UserProgress> => {
    const progress = await recordAppOpen();
    await markAppOpened();
    const unlocks = await checkAvatarsOnStreak(progress.streak ?? 0);
    queueUnlocks(unlocks);
    return progress;
  }, [queueUnlocks]);

  return (
    <ProgressProvider onMount={handleAppMount}>
      <NavigationContainer
        theme={{
          dark: false,
          colors: {
            primary: Colors.primary,
            background: Colors.background,
            card: Colors.surface,
            text: Colors.textPrimary,
            border: Colors.border,
            notification: Colors.accent,
          },
          fonts: {
            regular: { fontFamily: 'System', fontWeight: '400' },
            medium: { fontFamily: 'System', fontWeight: '500' },
            bold: { fontFamily: 'System', fontWeight: '700' },
            heavy: { fontFamily: 'System', fontWeight: '900' },
          },
        }}
      >
        <TabNavigator />
      </NavigationContainer>
      <AvatarUnlockModal />
    </ProgressProvider>
  );
}

export function RootNavigator() {
  const [ready, setReady] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [onboardingDone, setOnboardingDone] = useState(false);

  const loadPrefs = useCallback(async () => {
    const prefs = await getPreferences();
    setOnboardingDone(prefs.onboardingComplete);
    setShowIntro(!isIosSimulator() && shouldShowIntro(prefs));
    setReady(true);
  }, []);

  useEffect(() => {
    loadPrefs();
  }, [loadPrefs]);

  const handleIntroDone = async () => {
    await markIntroShown();
    setShowIntro(false);
  };

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (showIntro) {
    return (
      <SafeAreaProvider>
        <IntroZoomAfricaScreen onDone={handleIntroDone} />
      </SafeAreaProvider>
    );
  }

  if (!onboardingDone) {
    return (
      <SafeAreaProvider>
        <OnboardingScreen onComplete={() => setOnboardingDone(true)} />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <AvatarProvider>
        <MainApp />
      </AvatarProvider>
    </SafeAreaProvider>
  );
}
