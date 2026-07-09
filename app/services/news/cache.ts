import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NewsFeedResult } from './types';

const CACHE_KEY = '@finlearn_news_cache';

export async function getCachedNews(): Promise<NewsFeedResult | null> {
  try {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as NewsFeedResult;
  } catch {
    return null;
  }
}

export async function setCachedNews(data: NewsFeedResult): Promise<void> {
  await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
}

export function formatNewsDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

export function formatRelativeNewsDate(iso: string): string {
  try {
    const diffMs = Date.now() - new Date(iso).getTime();
    if (diffMs < 0) return "à l'instant";

    const minutes = Math.floor(diffMs / 60_000);
    if (minutes < 1) return "à l'instant";
    if (minutes < 60) return `il y a ${minutes} min`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `il y a ${hours}h`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `il y a ${days}j`;

    return formatNewsDate(iso);
  } catch {
    return '';
  }
}
