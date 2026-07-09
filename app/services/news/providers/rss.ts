import type { NewsArticle } from '../types';

function stripHtml(html: string): string {
  return html
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(text: string, max = 160): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
}

function extractTag(block: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const match = block.match(re);
  return match ? stripHtml(match[1]) : '';
}

function parseRssItems(xml: string, sourceName: string): NewsArticle[] {
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)];
  return items.map((match, index) => {
    const block = match[1];
    const title = extractTag(block, 'title') || 'Sans titre';
    const rawDesc =
      extractTag(block, 'description') ||
      extractTag(block, 'summary') ||
      extractTag(block, 'content:encoded');
    const link =
      extractTag(block, 'link') ||
      (block.match(/<link[^>]*>([^<]+)<\/link>/i)?.[1] ?? '');
    const pubDate = extractTag(block, 'pubDate') || extractTag(block, 'dc:date');

    return {
      id: `${sourceName}-${index}-${link.slice(-20)}`,
      title,
      excerpt: truncate(rawDesc),
      url: link.trim(),
      publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
      source: sourceName,
    };
  });
}

const RSS_FEEDS: { url: string; name: string }[] = [
  { url: 'https://www.agenceecofin.com/rss/all/rss.xml', name: 'Agence Ecofin' },
  { url: 'https://www.jeuneafrique.com/feed/', name: 'Jeune Afrique' },
];

export async function fetchRssFeed(url: string, sourceName: string): Promise<NewsArticle[]> {
  const response = await fetch(url, {
    headers: { Accept: 'application/rss+xml, application/xml, text/xml' },
  });
  if (!response.ok) throw new Error(`${sourceName}: HTTP ${response.status}`);
  const xml = await response.text();
  return parseRssItems(xml, sourceName).filter((a) => a.url && a.title);
}

export async function fetchAllRssArticles(): Promise<NewsArticle[]> {
  const results = await Promise.allSettled(
    RSS_FEEDS.map((f) => fetchRssFeed(f.url, f.name))
  );

  const articles = results
    .filter((r): r is PromiseFulfilledResult<NewsArticle[]> => r.status === 'fulfilled')
    .flatMap((r) => r.value);

  if (articles.length === 0) {
    const errors = results
      .filter((r): r is PromiseRejectedResult => r.status === 'rejected')
      .map((r) => r.reason?.message ?? 'Erreur');
    throw new Error(errors[0] ?? 'Aucun flux disponible');
  }

  return articles
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 40);
}
