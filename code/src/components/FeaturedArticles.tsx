const CURATED = [
  {
    title: 'Attention Is All You Need (Transformer Paper)',
    url: 'https://arxiv.org/abs/1706.03762',
    tag: 'Foundational',
    description: 'The original Transformer paper that launched the modern LLM era.',
  },
  {
    title: 'ReAct: Synergizing Reasoning and Acting in LLMs',
    url: 'https://arxiv.org/abs/2210.03629',
    tag: 'Agents',
    description: 'Framework for building LLM agents that reason and act iteratively.',
  },
  {
    title: 'LangChain Documentation',
    url: 'https://docs.langchain.com',
    tag: 'Framework',
    description: 'Build context-aware, reasoning applications using LangChain.',
  },
  {
    title: 'OpenAI Assistants API Guide',
    url: 'https://platform.openai.com/docs/assistants/overview',
    tag: 'API',
    description: 'Build AI assistants with tools, code execution, and file search.',
  },
  {
    title: 'Anthropic Model Card — Claude',
    url: 'https://www.anthropic.com/model-card',
    tag: 'Research',
    description: "Anthropic's analysis of Claude's capabilities and safety properties.",
  },
  {
    title: 'Google DeepMind — Gemini Overview',
    url: 'https://deepmind.google/technologies/gemini/',
    tag: 'Research',
    description: "Google's multimodal AI model technical overview and capabilities.",
  },
];

export default function FeaturedArticles() {
  return (
    <section id="articles">
      <div className="flex items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold" style={{ color: '#f1f5f9' }}>
            Featured Reading
          </h2>
          <p className="text-sm mt-1" style={{ color: '#64748b' }}>
            Essential papers, docs, and resources for AI practitioners
          </p>
        </div>
        <div
          className="flex-1 h-px ml-4 hidden sm:block"
          style={{
            background:
              'linear-gradient(90deg, rgba(34,211,238,0.2), rgba(168,85,247,0.2), transparent)',
          }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CURATED.map((item) => (
          <a
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card gradient-border rounded-2xl p-5 group flex flex-col gap-3"
          >
            <span
              className="text-xs font-semibold px-2 py-1 rounded-full self-start"
              style={{
                background: 'rgba(34,211,238,0.1)',
                color: '#22d3ee',
                border: '1px solid rgba(34,211,238,0.25)',
              }}
            >
              {item.tag}
            </span>
            <h3
              className="text-sm font-semibold leading-snug transition-colors group-hover:text-cyan-300"
              style={{ color: '#f1f5f9' }}
            >
              {item.title}
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>
              {item.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
