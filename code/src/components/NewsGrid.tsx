import type { NewsItem } from '@/lib/types';
import NewsCard from './NewsCard';

export default function NewsGrid({ items }: { items: NewsItem[] }) {
  return (
    <section id="news">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold" style={{ color: '#f1f5f9' }}>
            Latest News
          </h2>
          <p className="text-sm mt-1" style={{ color: '#64748b' }}>
            Auto-fetched from ArXiv, The Batch &amp; Hacker News · Updated hourly
          </p>
        </div>
        <div
          className="flex-1 h-px ml-4 hidden sm:block"
          style={{
            background: 'linear-gradient(90deg, rgba(34,211,238,0.3), transparent)',
          }}
        />
      </div>

      {/* Source legend */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {[
          { cls: 'badge-arxiv', label: 'ArXiv AI' },
          { cls: 'badge-thebatch', label: 'The Batch' },
          { cls: 'badge-hackernews', label: 'Hacker News' },
        ].map((s) => (
          <span key={s.label} className={`text-xs px-2 py-1 rounded-full ${s.cls}`}>
            {s.label}
          </span>
        ))}
      </div>

      {items.length === 0 ? (
        <div
          className="glass-card rounded-2xl p-12 text-center"
        >
          <p style={{ color: '#475569' }}>
            News feeds are loading. If this persists, the RSS sources may be temporarily unavailable.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.slice(0, 24).map((item, index) => (
            <NewsCard key={`${item.link}-${index}`} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
