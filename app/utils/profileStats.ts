import type { UserProgress } from '../data/types';
import { hasPassedQuiz } from './progression';

export function getAverageQuizScore(progress: UserProgress): number | null {
  const scores = Object.values(progress.quizScores);
  if (scores.length === 0) return null;
  const sum = scores.reduce((acc, score) => acc + score, 0);
  return Math.round(sum / scores.length);
}

export function getPassedQuizCount(progress: UserProgress): number {
  return Object.keys(progress.quizScores).filter((id) => hasPassedQuiz(progress, id)).length;
}

export function getTotalActiveDays(progress: UserProgress): number {
  if (progress.totalActiveDays !== undefined) return progress.totalActiveDays;
  return progress.lastActivityDate ? 1 : 0;
}
