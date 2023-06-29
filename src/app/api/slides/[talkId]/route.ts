import db from '@/utils/db';
import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { userId } = auth();
  const { searchParams } = new URL(request.url);
  const talkId = searchParams.get('talkId');

  if (!talkId) {
    return NextResponse.next({
      status: 400,
      statusText: 'No ID was provided',
    });
  }

  const slides = await db.slide.findMany({
    where: {
      userId: userId!,
      talkId,
    },
  });

  return NextResponse.json(slides);
}
