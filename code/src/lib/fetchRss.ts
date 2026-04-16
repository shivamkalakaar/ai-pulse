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

const RSS_FEEDS: Array<{
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
    url: 'https://www.anthropic.com/feed.xml',
    source: 'anthropic',
    sourceName: 'Anthropic',
  },
  {
    url: 'https://openai.com/news/rss.xml',
    source: 'openai',
    sourceName: 'OpenAI',
  },
  {
    url: 'https://deepmind.google/blog/rss.xml',
    source: 'deepmind',
    sourceName: 'DeepMind',
  },
];

const TOPIC_KEYWORDS: Record<string, string[]> = {
  'Agents':   ['agent', 'agentic', 'tool use', 'tool-use', 'autonomous', 'multi-agent', 'orchestrat'],
  'LLMs':     ['llm', 'language model', 'gpt', 'transformer', 'fine-tun', 'pretrain', 'rlhf', 'instruction tun'],
  'Safety':   ['safety', 'alignment', 'bias', 'fairness', 'harmful', 'risk', 'ethics', 'jailbreak', 'adversarial'],
  'Vision':   ['vision', 'multimodal', 'image', 'video', 'diffusion', 'clip', 'vqa', 'text-to-image'],
  'Code':     ['code', 'coding', 'programming', 'software', 'benchmark', 'evaluation', 'github'],
  'Industry': ['openai', 'anthropic', 'google', 'deepmind', 'meta', 'microsoft', 'funding', 'product launch', 'startup'],
};

function assignTopics(title: string, snippet: string): string[] {
  const text = `${title} ${snippet}`.toLowerCase();
  return Object.entries(TOPIC_KEYWORDS)
    .filter(([, kws]) => kws.some(kw => text.includes(kw)))
    .map(([topic]) => topic);
}

function truncate(text: string | undefined, length = 200): string {
  if (!text) return '';
  const clean = text.replace(/<[^>]+>/g, '').trim();
  return clean.length > length ? clean.slice(0, length) + '…' : clean;
}

async function fetchRssFeeds(): Promise<NewsItem[]> {
  const results = await Promise.allSettled(
    RSS_FEEDS.map(async (feed) => {
      const parsed = await parser.parseURL(feed.url);
      return (parsed.items || []).slice(0, 10).map((item): NewsItem => {
        const snippet = truncate(
          item.contentSnippet ||
          (item as unknown as Record<string, string>).summary ||
          (item as unknown as Record<string, string>).content
        );
        return {
          title: item.title || 'Untitled',
          link: item.link || '#',
          pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
          source: feed.source,
          sourceName: feed.sourceName,
          snippet,
          topics: assignTopics(item.title || '', snippet),
        };
      });
    })
  );

  const items: NewsItem[] = [];
  for (const result of results) {
    if (result.status === 'fulfilled') items.push(...result.value);
  }
  return items;
}

// Uses the official HN Algolia API — works reliably from Vercel's servers
async function fetchHackerNews(): Promise<NewsItem[]> {
  const url =
    'https://hn.algolia.com/api/v1/search?query=AI&tags=story&numericFilters=points%3E15&hitsPerPage=10';
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`HN Algolia API error: ${res.status}`);
  const data = await res.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data.hits || []).map((hit: any): NewsItem => {
    const snippet = truncate(hit.story_text || `${hit.points} points · ${hit.num_comments} comments`);
    return {
      title: hit.title || 'Untitled',
      link: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
      pubDate: hit.created_at || new Date().toISOString(),
      source: 'hackernews',
      sourceName: 'Hacker News',
      snippet,
      topics: assignTopics(hit.title || '', snippet),
    };
  });
}

export async function fetchAllNews(): Promise<NewsItem[]> {
  const [rssResult, hnResult] = await Promise.allSettled([
    fetchRssFeeds(),
    fetchHackerNews(),
  ]);

  const allItems: NewsItem[] = [];
  if (rssResult.status === 'fulfilled') allItems.push(...rssResult.value);
  if (hnResult.status === 'fulfilled') allItems.push(...hnResult.value);

  return allItems.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );
}
