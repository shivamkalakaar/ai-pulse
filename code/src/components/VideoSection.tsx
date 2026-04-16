import type { VideoItem } from '@/lib/types';
import VideoCard from './VideoCard';

export default function VideoSection({ videos }: { videos: VideoItem[] }) {
  return (
    <section id="videos">
      <div className="flex items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold" style={{ color: '#f1f5f9' }}>
            Learn &amp; Guidance
          </h2>
          <p className="text-sm mt-1" style={{ color: '#64748b' }}>
            Curated YouTube videos on AI agents, LLMs &amp; tutorials
          </p>
        </div>
        <div
          className="flex-1 h-px ml-4 hidden sm:block"
          style={{
            background: 'linear-gradient(90deg, rgba(168,85,247,0.3), transparent)',
          }}
        />
      </div>

      {videos.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <p style={{ color: '#475569' }}>
            Video content unavailable. Add your{' '}
            <code className="text-xs px-1 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.08)', color: '#22d3ee' }}>
              YOUTUBE_API_KEY
            </code>{' '}
            environment variable to enable this section.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos.map((video) => (
            <VideoCard key={video.videoId} video={video} />
          ))}
        </div>
      )}
    </section>
  );
}
