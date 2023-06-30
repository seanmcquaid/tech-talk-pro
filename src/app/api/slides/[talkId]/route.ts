import { createSlideBodySchema } from '@/types/requests/CreateSlideBody';
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

export async function POST(request: NextRequest) {
  const { userId } = auth();
  const { searchParams } = new URL(request.url);
  const talkId = searchParams.get('talkId');
  const res = await request.json();

  try {
    const body = createSlideBodySchema.parse(res);
    const { title, sortOrder, bulletPoints, notes } = body;
    const slide = await db.slide.create({
      data: {
        title,
        talkId: talkId!,
        userId: userId!,
        sortOrder,
        bulletPoints,
        notes,
      },
    });
    return NextResponse.json(slide);
  } catch (err) {
    return NextResponse.next({
      status: 400,
      statusText: "The slide couldn't be created",
    });
  }
}
