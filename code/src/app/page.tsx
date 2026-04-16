import { fetchAllNews } from '@/lib/fetchRss';
import { fetchYouTubeVideos } from '@/lib/fetchYouTube';
import Hero from '@/components/Hero';
import NewsGrid from '@/components/NewsGrid';
import VideoSection from '@/components/VideoSection';
import FeaturedArticles from '@/components/FeaturedArticles';
import Footer from '@/components/Footer';

// ISR: regenerate at most every hour
export const revalidate = 3600;

export default async function Home() {
  // Fetch all data in parallel; gracefully degrade if one fails
  const [newsResult, videosResult] = await Promise.allSettled([
    fetchAllNews(),
    fetchYouTubeVideos(),
  ]);

  const news = newsResult.status === 'fulfilled' ? newsResult.value : [];
  const videos = videosResult.status === 'fulfilled' ? videosResult.value : [];

  return (
    <main className="relative overflow-x-hidden">
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        <NewsGrid items={news} />
        <VideoSection videos={videos} />
        <FeaturedArticles />
      </div>

      <Footer />
    </main>
  );
}
