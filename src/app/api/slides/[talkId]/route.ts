import { createSlideBodySchema } from '@/types/requests/CreateSlideBody';
import db from '@/utils/db';
import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { talkId: string } },
) {
  try {
    const { userId } = auth();
    const { talkId } = params;

    const slides = await db.slide.findMany({
      where: {
        userId: userId!,
        talkId,
      },
    });

    return NextResponse.json(slides);
  } catch (err) {
    return NextResponse.next({
      status: 500,
      statusText: "The slides couldn't be retrieved",
    });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { talkId: string } },
) {
  try {
    const { userId } = auth();
    const { talkId } = params;
    const res = await request.json();
    const body = createSlideBodySchema.parse(res);
    const { title, sortOrder, bulletPoints, notes } = body;
    const slide = await db.slide.create({
      data: {
        title,
        talkId,
        userId: userId!,
        sortOrder,
        bulletPoints,
        notes,
      },
    });
    return NextResponse.json(slide);
  } catch (err) {
    return NextResponse.next({
      status: 500,
      statusText: "The slide couldn't be created",
    });
  }
}
