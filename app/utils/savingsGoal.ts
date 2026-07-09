import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SavingsGoal {
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
  updatedAt: string;
}

const GOAL_KEY = '@finlearn_savings_goal';

export async function getSavingsGoal(): Promise<SavingsGoal | null> {
  try {
    const raw = await AsyncStorage.getItem(GOAL_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SavingsGoal;
  } catch {
    return null;
  }
}

export async function saveSavingsGoal(goal: SavingsGoal): Promise<void> {
  await AsyncStorage.setItem(GOAL_KEY, JSON.stringify(goal));
}

export async function clearSavingsGoal(): Promise<void> {
  await AsyncStorage.removeItem(GOAL_KEY);
}

export function getSavingsProgress(goal: SavingsGoal): number {
  if (goal.targetAmount <= 0) return 0;
  return Math.min(100, (goal.currentAmount / goal.targetAmount) * 100);
}
