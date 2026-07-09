import AsyncStorage from '@react-native-async-storage/async-storage';
import type { UserProgress } from '../data/types';
import { computeStreakUpdate } from './streak';

const STORAGE_KEY = '@finlearn_progress';

const DEFAULT_PROGRESS: UserProgress = {
  completedLessons: [],
  quizScores: {},
  badges: [],
  viewedETFSheets: [],
  seenTipIds: [],
  streak: 0,
};

async function withActivity(progress: UserProgress): Promise<UserProgress> {
  const update = computeStreakUpdate(progress);
  const next = { ...progress, ...update };
  await saveProgress(next);
  return next;
}

export async function getProgress(): Promise<UserProgress> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

export async function saveProgress(progress: UserProgress): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export async function markLessonComplete(lessonId: string): Promise<UserProgress> {
  const progress = await getProgress();
  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
  }
  return withActivity(progress);
}

export async function saveQuizScore(
  moduleId: string,
  score: number
): Promise<UserProgress> {
  const progress = await getProgress();
  progress.quizScores[moduleId] = score;
  return withActivity(progress);
}

export async function markTipSeen(tipId: string): Promise<UserProgress> {
  const progress = await getProgress();
  if (!progress.seenTipIds.includes(tipId)) {
    progress.seenTipIds.push(tipId);
    await saveProgress(progress);
  }
  return progress;
}

export async function recordAppOpen(): Promise<UserProgress> {
  const progress = await getProgress();
  return withActivity(progress);
}

export async function unlockBadge(badgeId: string): Promise<UserProgress> {
  const progress = await getProgress();
  if (!progress.badges.includes(badgeId)) {
    progress.badges.push(badgeId);
    await saveProgress(progress);
  }
  return progress;
}

export async function saveRiskProfile(
  profile: UserProgress['riskProfile']
): Promise<UserProgress> {
  const progress = await getProgress();
  progress.riskProfile = profile;
  progress.riskProfileCompleted = true;
  if (!progress.badges.includes('badge-risk-profile')) {
    progress.badges.push('badge-risk-profile');
  }
  await saveProgress(progress);
  return progress;
}

export async function markETFSheetViewed(etfId: string): Promise<UserProgress> {
  const progress = await getProgress();
  if (!progress.viewedETFSheets.includes(etfId)) {
    progress.viewedETFSheets.push(etfId);
    await saveProgress(progress);
  }
  return progress;
}

export async function markETFToolQuizPassed(): Promise<UserProgress> {
  const progress = await getProgress();
  progress.etfToolQuizPassed = true;
  if (!progress.badges.includes('badge-etf-reader')) {
    progress.badges.push('badge-etf-reader');
  }
  await saveProgress(progress);
  return progress;
}

export async function clearProgress(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
