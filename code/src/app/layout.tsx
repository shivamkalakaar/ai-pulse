import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AI Pulse — Latest in AI & Agents',
  description:
    'Stay current with the latest AI research, news, and learning resources. Auto-updated from ArXiv, The Batch, Hacker News, and YouTube.',
  openGraph: {
    title: 'AI Pulse — Latest in AI & Agents',
    description: 'Auto-curated AI news, papers, and tutorials. Updated hourly.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen antialiased" style={{ backgroundColor: '#0a0a0f' }}>
        {children}
      </body>
    </html>
  );
}
