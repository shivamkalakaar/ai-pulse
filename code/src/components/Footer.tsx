export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-24 border-t py-12 px-4"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <span
            className="text-lg font-bold"
            style={{
              background: 'linear-gradient(90deg, #22d3ee, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            AI Pulse
          </span>
          <p className="text-xs mt-1" style={{ color: '#475569' }}>
            Aggregated from ArXiv · TechCrunch AI · Hacker News · YouTube · Updated hourly
          </p>
          <p className="text-xs mt-1" style={{ color: '#334155' }}>
            Made by{' '}
            <span style={{ color: '#94a3b8', fontWeight: 600 }}>Shivam Kalkar</span>
          </p>
        </div>

        <p className="text-xs" style={{ color: '#334155' }}>
          © {year} · Built with Next.js 14 &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
