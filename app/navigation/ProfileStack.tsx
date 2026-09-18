import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ProfileStackParamList } from '../data/types';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { CurrencySettingsScreen } from '../screens/CurrencySettingsScreen';
import { CertificateCelebrationScreen } from '../screens/CertificateCelebrationScreen';
import { CertificateGalleryScreen } from '../screens/CertificateGalleryScreen';
import { ReferralScreen } from '../screens/ReferralScreen';
import { AvatarsScreen } from '../screens/AvatarsScreen';
import { LegalScreen } from '../screens/LegalScreen';
import { Colors } from '../constants/colors';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.background },
        headerShadowVisible: false,
        headerTintColor: Colors.primary,
        headerTitleStyle: { fontWeight: '600', color: Colors.textPrimary },
        contentStyle: { backgroundColor: Colors.background },
      }}
    >
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profil' }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Paramètres' }}
      />
      <Stack.Screen
        name="Legal"
        component={LegalScreen}
        options={{ title: 'Mentions légales' }}
      />
      <Stack.Screen
        name="CurrencySettings"
        component={CurrencySettingsScreen}
        options={{ title: 'Devise' }}
      />
      <Stack.Screen
        name="CertificateCelebration"
        component={CertificateCelebrationScreen}
        options={{ title: 'Certificat' }}
      />
      <Stack.Screen
        name="CertificateGallery"
        component={CertificateGalleryScreen}
        options={{ title: 'Mes certificats' }}
      />
      <Stack.Screen
        name="Referral"
        component={ReferralScreen}
        options={{ title: 'Parrainage' }}
      />
      <Stack.Screen
        name="Avatars"
        component={AvatarsScreen}
        options={{ title: 'Mes avatars' }}
      />
    </Stack.Navigator>
  );
}
