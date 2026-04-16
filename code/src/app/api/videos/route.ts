import { NextResponse } from 'next/server';
import { fetchYouTubeVideos } from '@/lib/fetchYouTube';

export const revalidate = 3600;

export async function GET() {
  try {
    const videos = await fetchYouTubeVideos();
    return NextResponse.json(videos);
  } catch (error) {
    console.error('Videos API error:', error);
    return NextResponse.json([], { status: 500 });
  }
}
