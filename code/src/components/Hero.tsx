export default function Hero() {
  return (
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Animated background orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse-slow pointer-events-none"
        style={{ background: 'radial-gradient(circle, #22d3ee, transparent)' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl animate-pulse-slow pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #a855f7, transparent)',
          animationDelay: '2s',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-10 blur-3xl animate-pulse-slow pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #6366f1, transparent)',
          animationDelay: '4s',
        }}
      />

      {/* Content */}
      <div className="relative z-10 animate-fade-in">
        <span
          className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full mb-6"
          style={{
            background: 'rgba(34,211,238,0.1)',
            color: '#22d3ee',
            border: '1px solid rgba(34,211,238,0.3)',
          }}
        >
          Live · Updated hourly
        </span>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          <span style={{ color: '#f1f5f9' }}>AI</span>{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, #22d3ee, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Pulse
          </span>
        </h1>

        <p
          className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
          style={{ color: '#94a3b8' }}
        >
          The latest in AI research, agent frameworks, and learning resources —
          auto-curated from ArXiv, The Batch, Hacker News, and YouTube.
        </p>

        <div className="mt-8 flex gap-4 justify-center flex-wrap">
          <a
            href="#news"
            className="px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
              color: '#0a0a0f',
            }}
          >
            Latest News
          </a>
          <a
            href="#videos"
            className="glass-card px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
            style={{ color: '#e2e8f0' }}
          >
            Watch &amp; Learn
          </a>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(transparent, #0a0a0f)' }}
      />
    </section>
  );
}
