import type { LessonSection } from './types';

export const section = (
  type: LessonSection['type'],
  text: string
): LessonSection => ({ type, text });
