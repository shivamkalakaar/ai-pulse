export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: 'arxiv' | 'thebatch' | 'hackernews';
  sourceName: string;
  snippet: string;
}

export interface VideoItem {
  videoId: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  publishedAt: string;
  videoUrl: string;
}
