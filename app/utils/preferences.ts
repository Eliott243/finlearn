import AsyncStorage from '@react-native-async-storage/async-storage';
import type { CurrencyCode } from '../constants/currencies';
import { CURRENCIES, DEFAULT_CURRENCY } from '../constants/currencies';
import { isIosSimulator } from './device';

export type { CurrencyCode };

export interface UserPreferences {
  onboardingComplete: boolean;
  hasSeenIntro: boolean;
  lastIntroShownAt?: string;
  lastAppOpenAt?: string;
  forceIntroOnNextLaunch?: boolean;
  country: string;
  currency: CurrencyCode;
  dailyNotifications: boolean;
}

const PREFS_KEY = '@finlearn_prefs';

export const INTRO_INTERVAL_MS = 24 * 60 * 60 * 1000;

export {
  CURRENCIES,
  formatCurrencyAmount,
  getCurrencyMeta,
} from '../constants/currencies';

export const CURRENCY_OPTIONS = CURRENCIES.map((c) => ({
  code: c.code,
  label: `${c.flag} ${c.label}`,
}));

export const COUNTRY_OPTIONS = [
  'France',
  'Sénégal',
  "Côte d'Ivoire",
  'Cameroun',
  'Bénin',
  'Mali',
  'Burkina Faso',
  'Autre',
];

const DEFAULT_PREFS: UserPreferences = {
  onboardingComplete: false,
  hasSeenIntro: false,
  country: 'France',
  currency: DEFAULT_CURRENCY,
  dailyNotifications: false,
};

function msSince(iso?: string): number {
  if (!iso) return Infinity;
  return Date.now() - new Date(iso).getTime();
}

export function shouldShowIntro(prefs: UserPreferences): boolean {
  if (isIosSimulator()) return false;
  if (prefs.forceIntroOnNextLaunch) return true;
  if (!prefs.onboardingComplete) return !prefs.hasSeenIntro;
  return msSince(prefs.lastIntroShownAt) >= INTRO_INTERVAL_MS;
}

export async function getPreferences(): Promise<UserPreferences> {
  try {
    const raw = await AsyncStorage.getItem(PREFS_KEY);
    if (!raw) return { ...DEFAULT_PREFS };

    const merged: UserPreferences = { ...DEFAULT_PREFS, ...JSON.parse(raw) };

    if (merged.hasSeenIntro && !merged.lastIntroShownAt) {
      merged.lastIntroShownAt = new Date().toISOString();
      await AsyncStorage.setItem(PREFS_KEY, JSON.stringify(merged));
    }

    return merged;
  } catch {
    return { ...DEFAULT_PREFS };
  }
}

export async function savePreferences(prefs: Partial<UserPreferences>): Promise<UserPreferences> {
  const current = await getPreferences();
  const merged = { ...current, ...prefs };
  await AsyncStorage.setItem(PREFS_KEY, JSON.stringify(merged));
  return merged;
}

export async function markIntroShown(): Promise<UserPreferences> {
  return savePreferences({
    hasSeenIntro: true,
    lastIntroShownAt: new Date().toISOString(),
    forceIntroOnNextLaunch: false,
  });
}

export async function markAppOpened(): Promise<UserPreferences> {
  return savePreferences({ lastAppOpenAt: new Date().toISOString() });
}

export async function scheduleIntroOnNextLaunch(): Promise<UserPreferences> {
  return savePreferences({ forceIntroOnNextLaunch: true });
}

export async function clearPreferences(): Promise<void> {
  await AsyncStorage.removeItem(PREFS_KEY);
}
