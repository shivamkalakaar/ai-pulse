'use client';

import { useState } from 'react';
import type { NewsItem } from '@/lib/types';
import NewsCard from './NewsCard';

type FilterSource = 'all' | NewsItem['source'];

const FILTERS: { value: FilterSource; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'arxiv', label: 'ArXiv AI' },
  { value: 'thebatch', label: 'TechCrunch AI' },
  { value: 'hackernews', label: 'Hacker News' },
  { value: 'anthropic', label: 'Anthropic' },
  { value: 'openai', label: 'OpenAI' },
  { value: 'deepmind', label: 'DeepMind' },
];

const TOPICS = ['Agents', 'LLMs', 'Safety', 'Vision', 'Code', 'Industry'];

export default function NewsGrid({ items }: { items: NewsItem[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterSource>('all');
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  function handleSourceFilter(value: FilterSource) {
    setActiveFilter(value);
    setActiveTopic(null);
  }

  const bySource =
    activeFilter === 'all' ? items : items.filter((i) => i.source === activeFilter);

  const filtered =
    activeTopic === null
      ? bySource
      : bySource.filter((i) => i.topics.includes(activeTopic));

  return (
    <section id="news">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold" style={{ color: '#f1f5f9' }}>
            Latest News
          </h2>
          <p className="text-sm mt-1" style={{ color: '#64748b' }}>
            Auto-fetched from ArXiv, TechCrunch AI, Hacker News, Anthropic, OpenAI &amp; DeepMind · Updated hourly
          </p>
        </div>
        <div
          className="flex-1 h-px ml-4 hidden sm:block"
          style={{
            background: 'linear-gradient(90deg, rgba(34,211,238,0.3), transparent)',
          }}
        />
      </div>

      {/* Source filter buttons */}
      <div className="flex gap-2 mb-3 flex-wrap">
        {FILTERS.map((f) => {
          const isActive = activeFilter === f.value;
          return (
            <button
              key={f.value}
              onClick={() => handleSourceFilter(f.value)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105"
              style={
                isActive
                  ? {
                      background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
                      color: '#0a0a0f',
                    }
                  : {
                      background: 'rgba(255,255,255,0.05)',
                      color: '#94a3b8',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }
              }
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Topic filter buttons */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setActiveTopic(null)}
          className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105"
          style={
            activeTopic === null
              ? { background: 'rgba(168,85,247,0.25)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.4)' }
              : { background: 'rgba(255,255,255,0.03)', color: '#64748b', border: '1px solid rgba(255,255,255,0.07)' }
          }
        >
          All Topics
        </button>
        {TOPICS.map((topic) => {
          const isActive = activeTopic === topic;
          return (
            <button
              key={topic}
              onClick={() => setActiveTopic(isActive ? null : topic)}
              className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105"
              style={
                isActive
                  ? { background: 'rgba(168,85,247,0.25)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.4)' }
                  : { background: 'rgba(255,255,255,0.03)', color: '#64748b', border: '1px solid rgba(255,255,255,0.07)' }
              }
            >
              {topic}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <p style={{ color: '#475569' }}>
            {items.length === 0
              ? 'News feeds are loading. If this persists, the RSS sources may be temporarily unavailable.'
              : 'No articles found for this filter combination.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.slice(0, 24).map((item, index) => (
            <NewsCard key={`${item.link}-${index}`} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
