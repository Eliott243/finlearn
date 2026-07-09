import type { NewsFeedResult, NewsProvider } from './types';
import { fetchAllRssArticles } from './providers/rss';
import { getCachedNews, setCachedNews } from './cache';

const rssProvider: NewsProvider = {
  name: 'rss',
  async fetchArticles() {
    const articles = await fetchAllRssArticles();
    return {
      articles,
      fetchedAt: new Date().toISOString(),
      provider: 'rss',
    };
  },
};

let activeProvider: NewsProvider = rssProvider;

export function setNewsProvider(provider: NewsProvider): void {
  activeProvider = provider;
}

export async function fetchNews(options?: {
  forceRefresh?: boolean;
}): Promise<{ data: NewsFeedResult; fromCache: boolean; offline: boolean }> {
  if (!options?.forceRefresh) {
    const cached = await getCachedNews();
    if (cached?.articles?.length) {
      return { data: cached, fromCache: true, offline: false };
    }
  }

  try {
    const fresh = await activeProvider.fetchArticles();
    await setCachedNews(fresh);
    return { data: fresh, fromCache: false, offline: false };
  } catch {
    const cached = await getCachedNews();
    if (cached) return { data: cached, fromCache: true, offline: true };
    throw new Error('Impossible de charger les actualités. Vérifiez votre connexion.');
  }
}

export { formatNewsDate, formatRelativeNewsDate } from './cache';
