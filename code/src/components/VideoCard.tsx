import Image from 'next/image';
import type { VideoItem } from '@/lib/types';

function formatDate(dateStr: string): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(dateStr));
  } catch {
    return '';
  }
}

export default function VideoCard({ video }: { video: VideoItem }) {
  return (
    <a
      href={video.videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block glass-card gradient-border rounded-2xl overflow-hidden group"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Play overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: 'rgba(10,10,15,0.6)' }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(34,211,238,0.9)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#0a0a0f">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3
          className="text-sm font-semibold leading-snug line-clamp-2 mb-2 transition-colors group-hover:text-cyan-300"
          style={{ color: '#f1f5f9' }}
        >
          {video.title}
        </h3>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs truncate" style={{ color: '#a855f7' }}>
            {video.channelTitle}
          </span>
          <span className="text-xs shrink-0" style={{ color: '#475569' }}>
            {formatDate(video.publishedAt)}
          </span>
        </div>
      </div>
    </a>
  );
}
