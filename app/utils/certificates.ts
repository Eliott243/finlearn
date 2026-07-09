import AsyncStorage from '@react-native-async-storage/async-storage';
import type { UserProgress } from '../data/types';
import { isLevelCompleted } from './progression';
import { LEVEL_LABELS } from '../data/modules';

export interface LevelCertificate {
  level: number;
  earnedAt: string;
  userName: string;
}

const CERT_KEY = '@finlearn_certificates';

export function getLevelTitle(level: number): string {
  return LEVEL_LABELS[level] ?? `Niveau ${level}`;
}

export async function getCertificates(): Promise<LevelCertificate[]> {
  try {
    const raw = await AsyncStorage.getItem(CERT_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as LevelCertificate[];
  } catch {
    return [];
  }
}

export async function saveCertificates(certs: LevelCertificate[]): Promise<void> {
  await AsyncStorage.setItem(CERT_KEY, JSON.stringify(certs));
}

export async function awardCertificate(
  level: number,
  userName: string
): Promise<LevelCertificate | null> {
  const existing = await getCertificates();
  if (existing.some((c) => c.level === level)) return null;

  const cert: LevelCertificate = {
    level,
    earnedAt: new Date().toISOString(),
    userName,
  };
  await saveCertificates([...existing, cert].sort((a, b) => a.level - b.level));
  return cert;
}

/** Synchronise les certificats avec la progression (rattrapage si niveau déjà complété). */
export async function syncCertificatesFromProgress(
  progress: UserProgress,
  userName: string
): Promise<LevelCertificate[]> {
  const existing = await getCertificates();
  const earnedLevels = new Set(existing.map((c) => c.level));
  const toAdd: LevelCertificate[] = [];

  for (const level of [1, 2, 3]) {
    if (!earnedLevels.has(level) && isLevelCompleted(progress, level)) {
      toAdd.push({
        level,
        earnedAt: new Date().toISOString(),
        userName,
      });
    }
  }

  if (toAdd.length > 0) {
    const merged = [...existing, ...toAdd].sort((a, b) => a.level - b.level);
    await saveCertificates(merged);
    return merged;
  }

  return existing;
}

export async function checkNewlyCompletedLevel(
  progress: UserProgress,
  level: number,
  userName: string
): Promise<LevelCertificate | null> {
  if (!isLevelCompleted(progress, level)) return null;
  return awardCertificate(level, userName);
}
