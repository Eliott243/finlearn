import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import type { UserProgress } from '../data/types';
import { getProgress, saveProgress } from '../utils/storage';
import { getCurrentLesson, getLearningResume, getOverallProgressPercent } from '../utils/progression';

interface ProgressContextValue {
  progress: UserProgress;
  loading: boolean;
  refreshProgress: () => Promise<void>;
  overallProgress: number;
  currentLesson: ReturnType<typeof getCurrentLesson>;
  learningResume: ReturnType<typeof getLearningResume>;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({
  children,
  onMount,
}: {
  children: React.ReactNode;
  onMount?: () => Promise<UserProgress>;
}) {
  const [progress, setProgress] = useState<UserProgress>({
    completedLessons: [],
    quizScores: {},
    badges: [],
    viewedETFSheets: [],
    seenTipIds: [],
    streak: 0,
  });
  const [loading, setLoading] = useState(true);

  const refreshProgress = useCallback(async () => {
    const data = await getProgress();
    setProgress(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    (async () => {
      if (onMount) {
        const data = await onMount();
        setProgress(data);
      } else {
        await refreshProgress();
      }
      setLoading(false);
    })();
  }, [refreshProgress, onMount]);

  const overallProgress = useMemo(
    () => getOverallProgressPercent(progress),
    [progress]
  );

  const currentLesson = useMemo(
    () => getCurrentLesson(progress),
    [progress]
  );

  const learningResume = useMemo(
    () => getLearningResume(progress),
    [progress]
  );

  const value: ProgressContextValue = {
    progress,
    loading,
    refreshProgress,
    overallProgress,
    currentLesson,
    learningResume,
  };

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}

export { saveProgress, getProgress };
