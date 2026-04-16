export default function BriefingSection({ points }: { points: string[] }) {
  if (!points.length) return null;

  return (
    <section className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xl font-bold" style={{ color: '#f1f5f9' }}>
          Today&apos;s AI Briefing
        </h2>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium"
          style={{
            background: 'rgba(168,85,247,0.15)',
            color: '#c084fc',
            border: '1px solid rgba(168,85,247,0.3)',
          }}
        >
          ✦ Powered by Claude
        </span>
      </div>
      <ul className="space-y-2">
        {points.map((pt, i) => (
          <li key={i} className="text-sm flex gap-2" style={{ color: '#94a3b8' }}>
            <span style={{ color: '#22d3ee', flexShrink: 0 }}>→</span>
            {pt}
          </li>
        ))}
      </ul>
    </section>
  );
}
