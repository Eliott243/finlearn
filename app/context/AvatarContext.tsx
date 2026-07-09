import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { AvatarId } from '../data/avatars';
import {
  getAvatarState,
  setActiveAvatar as persistActiveAvatar,
  type AvatarState,
} from '../utils/avatarStorage';

interface AvatarContextValue {
  state: AvatarState;
  loading: boolean;
  refreshAvatars: () => Promise<void>;
  selectAvatar: (id: AvatarId) => Promise<void>;
  clearActiveAvatar: () => Promise<void>;
  isUnlocked: (id: AvatarId) => boolean;
  queueUnlocks: (ids: AvatarId[]) => void;
  pendingUnlock: AvatarId | null;
  dismissPendingUnlock: () => void;
}

const AvatarContext = createContext<AvatarContextValue | null>(null);

export function AvatarProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AvatarState>({ unlocked: [], activeAvatarId: null });
  const [loading, setLoading] = useState(true);
  const [unlockQueue, setUnlockQueue] = useState<AvatarId[]>([]);

  const pendingUnlock = unlockQueue[0] ?? null;

  const refreshAvatars = useCallback(async () => {
    const next = await getAvatarState();
    setState(next);
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshAvatars();
  }, [refreshAvatars]);

  const selectAvatar = useCallback(async (id: AvatarId) => {
    const next = await persistActiveAvatar(id);
    setState(next);
  }, []);

  const clearActiveAvatar = useCallback(async () => {
    const next = await persistActiveAvatar(null);
    setState(next);
  }, []);

  const isUnlocked = useCallback(
    (id: AvatarId) => state.unlocked.includes(id),
    [state.unlocked]
  );

  const queueUnlocks = useCallback((ids: AvatarId[]) => {
    if (ids.length === 0) return;
    setUnlockQueue((q) => [...q, ...ids]);
  }, []);

  const dismissPendingUnlock = useCallback(() => {
    setUnlockQueue((q) => q.slice(1));
  }, []);

  const value: AvatarContextValue = {
    state,
    loading,
    refreshAvatars,
    selectAvatar,
    clearActiveAvatar,
    isUnlocked,
    queueUnlocks,
    pendingUnlock,
    dismissPendingUnlock,
  };

  return <AvatarContext.Provider value={value}>{children}</AvatarContext.Provider>;
}

export function useAvatars(): AvatarContextValue {
  const ctx = useContext(AvatarContext);
  if (!ctx) throw new Error('useAvatars must be used within AvatarProvider');
  return ctx;
}
