import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearProgress } from './storage';
import { clearPreferences } from './preferences';
import { clearAvatarState } from './avatarStorage';
import { cancelDailyNotifications } from './notifications';

const EXTRA_KEYS = [
  '@finlearn_certificates',
  '@finlearn_savings_goal',
  '@finlearn_referral_code',
  '@finlearn_news_cache',
  '@finlearn_exchange_cache',
];

/** Erases all local FinLearn data (Play Store / privacy requirement). */
export async function clearAllLocalData(): Promise<void> {
  await cancelDailyNotifications().catch(() => {});
  await clearProgress();
  await clearAvatarState();
  await clearPreferences();
  await AsyncStorage.multiRemove(EXTRA_KEYS);
}
