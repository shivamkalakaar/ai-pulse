import Anthropic from '@anthropic-ai/sdk';
import type { NewsItem } from './types';

const client = new Anthropic();

export async function enhanceWithSummaries(items: NewsItem[]): Promise<NewsItem[]> {
  if (!process.env.ANTHROPIC_API_KEY) return items;
  const arxiv = items.filter(i => i.source === 'arxiv').slice(0, 10);
  if (!arxiv.length) return items;

  try {
    const prompt = arxiv
      .map((item, i) => `${i + 1}. Title: ${item.title}\nAbstract: ${item.snippet}`)
      .join('\n\n');

    const res = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `For each ArXiv paper below, write exactly one sentence (max 25 words) in plain English — no jargon — explaining what it does and why it matters. Return ONLY a valid JSON array of strings, one per paper, in the same order.\n\nPapers:\n${prompt}`,
        },
      ],
    });

    const text = res.content[0].type === 'text' ? res.content[0].text : '[]';
    const match = text.match(/\[[\s\S]*\]/);
    const summaries: string[] = JSON.parse(match?.[0] ?? '[]');

    const summaryMap = new Map(arxiv.map((item, i) => [item.link, summaries[i] ?? '']));
    return items.map(item =>
      item.source === 'arxiv' && summaryMap.has(item.link)
        ? { ...item, aiSummary: summaryMap.get(item.link) }
        : item
    );
  } catch {
    return items;
  }
}

export async function generateBriefing(items: NewsItem[]): Promise<string[]> {
  if (!process.env.ANTHROPIC_API_KEY || !items.length) return [];
  try {
    const headlines = items
      .slice(0, 20)
      .map(i => `- ${i.title} (${i.sourceName})`)
      .join('\n');

    const res = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 512,
      messages: [
        {
          role: 'user',
          content: `You are a sharp AI news editor. Based on today's headlines, write exactly 4 bullet points summarizing the most important themes. Each bullet: start with the theme name followed by a colon, then one crisp sentence. Be specific. Return ONLY a valid JSON array of 4 plain strings (no markdown, no asterisks — e.g. "Agents: OpenAI launched a new...").\n\nHeadlines:\n${headlines}`,
        },
      ],
    });

    const text = res.content[0].type === 'text' ? res.content[0].text : '[]';
    const match = text.match(/\[[\s\S]*\]/);
    return JSON.parse(match?.[0] ?? '[]');
  } catch {
    return [];
  }
}
