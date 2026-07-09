import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AvatarId } from '../data/avatars';

const STORAGE_KEY = '@finlearn_avatars';

export interface AvatarState {
  unlocked: AvatarId[];
  activeAvatarId: AvatarId | null;
}

const DEFAULT_STATE: AvatarState = {
  unlocked: [],
  activeAvatarId: null,
};

export async function getAvatarState(): Promise<AvatarState> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

export async function saveAvatarState(state: AvatarState): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export async function unlockAvatar(id: AvatarId): Promise<boolean> {
  const state = await getAvatarState();
  if (state.unlocked.includes(id)) return false;
  state.unlocked.push(id);
  await saveAvatarState(state);
  return true;
}

export async function setActiveAvatar(id: AvatarId | null): Promise<AvatarState> {
  const state = await getAvatarState();
  if (id !== null && !state.unlocked.includes(id)) {
    throw new Error('Avatar non débloqué');
  }
  state.activeAvatarId = id;
  await saveAvatarState(state);
  return state;
}

export async function clearAvatarState(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
