export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: 'arxiv' | 'thebatch' | 'hackernews' | 'anthropic' | 'openai' | 'deepmind';
  sourceName: string;
  snippet: string;
  aiSummary?: string;
  topics: string[];
}

export interface VideoItem {
  videoId: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  publishedAt: string;
  videoUrl: string;
}
