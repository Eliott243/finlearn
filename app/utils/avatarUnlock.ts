import { AVATARS, type AvatarId } from '../data/avatars';
import { unlockAvatar } from './avatarStorage';
import { QUIZ_PASS_THRESHOLD } from './progression';

export async function checkAvatarOnTontineSimulation(): Promise<AvatarId | null> {
  for (const avatar of AVATARS) {
    if (avatar.condition.type !== 'tontine_simulation') continue;
    if (await unlockAvatar(avatar.id)) return avatar.id;
  }
  return null;
}

export async function checkAvatarsOnStreak(streak: number): Promise<AvatarId[]> {
  const unlocked: AvatarId[] = [];
  for (const avatar of AVATARS) {
    if (avatar.condition.type !== 'streak') continue;
    if (streak >= avatar.condition.days && (await unlockAvatar(avatar.id))) {
      unlocked.push(avatar.id);
    }
  }
  return unlocked;
}

export async function checkAvatarsOnQuizComplete(
  moduleId: string,
  score: number
): Promise<AvatarId[]> {
  const unlocked: AvatarId[] = [];
  const passed = score >= QUIZ_PASS_THRESHOLD;

  for (const avatar of AVATARS) {
    const { condition } = avatar;

    if (condition.type === 'module_quiz_min') {
      if (
        condition.moduleId === moduleId &&
        score >= condition.minScore &&
        (await unlockAvatar(avatar.id))
      ) {
        unlocked.push(avatar.id);
      }
    }

    if (condition.type === 'module_passed') {
      if (
        condition.moduleId === moduleId &&
        passed &&
        (await unlockAvatar(avatar.id))
      ) {
        unlocked.push(avatar.id);
      }
    }
  }

  return unlocked;
}
