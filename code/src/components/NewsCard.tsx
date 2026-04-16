import type { NewsItem } from '@/lib/types';

const SOURCE_BADGE: Record<NewsItem['source'], string> = {
  arxiv: 'badge-arxiv',
  thebatch: 'badge-thebatch',
  hackernews: 'badge-hackernews',
};

function formatDate(dateStr: string): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

export default function NewsCard({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block glass-card gradient-border rounded-2xl p-5 h-full flex flex-col group"
    >
      {/* Header: source badge + date */}
      <div className="flex items-center justify-between mb-3 gap-2">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${SOURCE_BADGE[item.source]}`}>
          {item.sourceName}
        </span>
        <span className="text-xs truncate" style={{ color: '#475569' }}>
          {formatDate(item.pubDate)}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-sm font-semibold leading-snug mb-3 line-clamp-3 transition-colors group-hover:text-cyan-300"
        style={{ color: '#f1f5f9' }}
      >
        {item.title}
      </h3>

      {/* Snippet */}
      <p className="text-xs leading-relaxed line-clamp-4 flex-1" style={{ color: '#64748b' }}>
        {item.snippet}
      </p>

      {/* Read more */}
      <div
        className="mt-4 flex items-center gap-1 text-xs font-semibold"
        style={{ color: '#22d3ee' }}
      >
        Read more
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className="group-hover:translate-x-1 transition-transform"
        >
          <path
            d="M2 6h8M7 3l3 3-3 3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </a>
  );
}
