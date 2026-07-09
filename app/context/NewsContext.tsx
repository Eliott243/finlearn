import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { fetchNews } from '../services/news';
import type { NewsArticle } from '../services/news/types';

interface NewsContextValue {
  articles: NewsArticle[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  offline: boolean;
  lastUpdate: string | null;
  refresh: () => void;
  reload: () => void;
}

const NewsContext = createContext<NewsContextValue | null>(null);

export function NewsProvider({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offline, setOffline] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);

  const load = useCallback(async (force = false) => {
    try {
      setError(null);
      const { data, offline: isOffline } = await fetchNews({ forceRefresh: force });
      setArticles(data.articles);
      setOffline(isOffline);
      setLastUpdate(data.fetchedAt);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const refresh = useCallback(() => {
    setRefreshing(true);
    load(true);
  }, [load]);

  const value: NewsContextValue = {
    articles,
    loading,
    refreshing,
    error,
    offline,
    lastUpdate,
    refresh,
    reload: () => load(true),
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
}

export function useNews(): NewsContextValue {
  const ctx = useContext(NewsContext);
  if (!ctx) throw new Error('useNews must be used within NewsProvider');
  return ctx;
}
