import type { VideoItem } from './types';

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

const SEARCH_QUERIES = [
  'AI agents tutorial 2025',
  'LLM news 2025',
  'large language models explained',
];

export async function fetchYouTubeVideos(): Promise<VideoItem[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    console.warn('YOUTUBE_API_KEY is not set — skipping video fetch');
    return [];
  }

  const results = await Promise.allSettled(
    SEARCH_QUERIES.map(async (query) => {
      const params = new URLSearchParams({
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: '4',
        order: 'relevance',
        relevanceLanguage: 'en',
        key: apiKey,
      });
      const res = await fetch(`${YOUTUBE_API_BASE}/search?${params}`, {
        next: { revalidate: 3600 },
      });
      if (!res.ok) {
        throw new Error(`YouTube API error: ${res.status}`);
      }
      const data = await res.json();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (data.items || []).map((item: any): VideoItem => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        thumbnailUrl:
          item.snippet.thumbnails?.medium?.url ||
          `https://i.ytimg.com/vi/${item.id.videoId}/mqdefault.jpg`,
        publishedAt: item.snippet.publishedAt,
        videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      }));
    })
  );

  const videos: VideoItem[] = [];
  const seenIds = new Set<string>();

  for (const result of results) {
    if (result.status === 'fulfilled') {
      for (const video of result.value) {
        if (!seenIds.has(video.videoId)) {
          seenIds.add(video.videoId);
          videos.push(video);
        }
      }
    }
  }

  return videos.slice(0, 9);
}
