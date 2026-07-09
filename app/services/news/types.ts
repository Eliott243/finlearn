export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  publishedAt: string;
  source: string;
}

export interface NewsFeedResult {
  articles: NewsArticle[];
  fetchedAt: string;
  provider: string;
}

export interface NewsProvider {
  readonly name: string;
  fetchArticles(): Promise<NewsFeedResult>;
}
