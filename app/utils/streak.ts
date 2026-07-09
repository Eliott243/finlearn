import type { UserProgress } from '../data/types';

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayISO(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export function getStreakEmoji(streak: number): string {
  if (streak >= 30) return '🔥';
  if (streak >= 14) return '⚡';
  if (streak >= 7) return '✨';
  if (streak >= 3) return '🌱';
  return '💪';
}

export function computeStreakUpdate(
  progress: UserProgress,
  date = todayISO()
): Pick<UserProgress, 'streak' | 'lastActivityDate' | 'totalActiveDays'> {
  const last = progress.lastActivityDate;
  const currentStreak = progress.streak ?? 0;
  const currentTotal = progress.totalActiveDays ?? (last ? 1 : 0);

  if (last === date) {
    return {
      streak: currentStreak,
      lastActivityDate: date,
      totalActiveDays: currentTotal,
    };
  }

  const totalActiveDays = currentTotal + 1;

  if (last === yesterdayISO()) {
    return { streak: currentStreak + 1, lastActivityDate: date, totalActiveDays };
  }
  return { streak: 1, lastActivityDate: date, totalActiveDays };
}
