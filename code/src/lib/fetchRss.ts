import Parser from 'rss-parser';
import type { NewsItem } from './types';

const parser = new Parser({
  customFields: {
    item: [
      ['description', 'contentSnippet'],
      ['summary', 'summary'],
    ],
  },
});

const FEEDS: Array<{
  url: string;
  source: NewsItem['source'];
  sourceName: string;
}> = [
  {
    url: 'https://arxiv.org/rss/cs.AI',
    source: 'arxiv',
    sourceName: 'ArXiv AI',
  },
  {
    url: 'https://techcrunch.com/category/artificial-intelligence/feed/',
    source: 'thebatch',
    sourceName: 'TechCrunch AI',
  },
  {
    url: 'https://hnrss.org/newest?q=AI&points=10',
    source: 'hackernews',
    sourceName: 'Hacker News',
  },
];

function truncate(text: string | undefined, length = 200): string {
  if (!text) return '';
  const clean = text.replace(/<[^>]+>/g, '').trim();
  return clean.length > length ? clean.slice(0, length) + '…' : clean;
}

export async function fetchAllNews(): Promise<NewsItem[]> {
  const results = await Promise.allSettled(
    FEEDS.map(async (feed) => {
      const parsed = await parser.parseURL(feed.url);
      return (parsed.items || []).slice(0, 10).map((item): NewsItem => ({
        title: item.title || 'Untitled',
        link: item.link || '#',
        pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
        source: feed.source,
        sourceName: feed.sourceName,
        snippet: truncate(item.contentSnippet || (item as unknown as Record<string, string>).summary || (item as unknown as Record<string, string>).content),
      }));
    })
  );

  const allItems: NewsItem[] = [];
  for (const result of results) {
    if (result.status === 'fulfilled') {
      allItems.push(...result.value);
    }
  }

  return allItems.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );
}
