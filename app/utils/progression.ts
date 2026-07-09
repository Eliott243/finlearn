import type { Module, UserProgress } from '../data/types';
import { modules, getLevelModules } from '../data/modules';

export const QUIZ_PASS_THRESHOLD = 60;

export function getQuizScore(progress: UserProgress, moduleId: string): number | null {
  const score = progress.quizScores[moduleId];
  return score !== undefined ? score : null;
}

export function hasPassedQuiz(progress: UserProgress, moduleId: string): boolean {
  const score = getQuizScore(progress, moduleId);
  return score !== null && score >= QUIZ_PASS_THRESHOLD;
}

export function isLessonCompleted(progress: UserProgress, lessonId: string): boolean {
  return progress.completedLessons.includes(lessonId);
}

export function areAllLessonsCompleted(progress: UserProgress, module: Module): boolean {
  return module.lessons.every((lesson) => isLessonCompleted(progress, lesson.id));
}

export function isModuleCompleted(progress: UserProgress, module: Module): boolean {
  return areAllLessonsCompleted(progress, module) && hasPassedQuiz(progress, module.id);
}

export function isLevelCompleted(progress: UserProgress, level: number): boolean {
  return getLevelModules(level).every((module) => isModuleCompleted(progress, module));
}

export function getPreviousModule(module: Module): Module | null {
  const sameLevel = getLevelModules(module.level);
  const index = sameLevel.findIndex((m) => m.id === module.id);
  if (index <= 0) return null;
  return sameLevel[index - 1];
}

export function isModuleUnlocked(progress: UserProgress, module: Module): boolean {
  if (module.level === 1) {
    const previous = getPreviousModule(module);
    if (!previous) return true;
    return isModuleCompleted(progress, previous);
  }

  if (!isLevelCompleted(progress, module.level - 1)) {
    return false;
  }

  const previous = getPreviousModule(module);
  if (!previous) return true;
  return isModuleCompleted(progress, previous);
}

export function isLessonUnlocked(
  progress: UserProgress,
  module: Module,
  lessonId: string
): boolean {
  if (!isModuleUnlocked(progress, module)) return false;

  const lessonIndex = module.lessons.findIndex((lesson) => lesson.id === lessonId);
  if (lessonIndex === -1) return false;
  if (lessonIndex === 0) return true;

  const previousLesson = module.lessons[lessonIndex - 1];
  return isLessonCompleted(progress, previousLesson.id);
}

export function isQuizUnlocked(progress: UserProgress, module: Module): boolean {
  return isModuleUnlocked(progress, module) && areAllLessonsCompleted(progress, module);
}

export function getFirstIncompleteLesson(module: Module, progress: UserProgress) {
  return (
    module.lessons.find((lesson) => !isLessonCompleted(progress, lesson.id)) ??
    module.lessons[module.lessons.length - 1]
  );
}

export function getModuleProgressPercent(progress: UserProgress, module: Module): number {
  const lessonWeight = 0.8;
  const quizWeight = 0.2;
  const lessonsDone = module.lessons.filter((lesson) =>
    isLessonCompleted(progress, lesson.id)
  ).length;
  const lessonPercent =
    module.lessons.length > 0 ? (lessonsDone / module.lessons.length) * 100 : 0;
  const quizPercent = hasPassedQuiz(progress, module.id) ? 100 : 0;
  return lessonPercent * lessonWeight + quizPercent * quizWeight;
}

export function getOverallProgressPercent(progress: UserProgress): number {
  if (modules.length === 0) return 0;
  const total = modules.reduce(
    (acc, module) => acc + getModuleProgressPercent(progress, module),
    0
  );
  return total / modules.length;
}

export function getCurrentLesson(progress: UserProgress) {
  for (const module of modules) {
    if (!isModuleUnlocked(progress, module)) continue;
    const lesson = module.lessons.find(
      (item) => !isLessonCompleted(progress, item.id)
    );
    if (lesson) {
      return { ...lesson, moduleId: module.id, moduleTitle: module.title, level: module.level };
    }
  }
  return null;
}

export function getLearningResume(progress: UserProgress) {
  for (const module of modules) {
    if (!isModuleUnlocked(progress, module)) continue;
    const lesson = module.lessons.find((item) => !isLessonCompleted(progress, item.id));
    if (lesson) {
      return { type: 'lesson' as const, module, lesson };
    }
    if (areAllLessonsCompleted(progress, module) && !hasPassedQuiz(progress, module.id)) {
      return { type: 'quiz' as const, module };
    }
  }
  return null;
}
