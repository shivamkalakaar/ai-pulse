import { NextResponse } from 'next/server';
import { fetchAllNews } from '@/lib/fetchRss';

export const revalidate = 3600;

export async function GET() {
  try {
    const news = await fetchAllNews();
    return NextResponse.json(news);
  } catch (error) {
    console.error('News API error:', error);
    return NextResponse.json([], { status: 500 });
  }
}
