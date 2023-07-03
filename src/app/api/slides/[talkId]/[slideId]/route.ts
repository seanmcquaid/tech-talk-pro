import { createSlideBodySchema } from '@/types/requests/CreateSlideBody';
import db from '@/utils/db';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slideId = searchParams.get('slideId');

  try {
    await db.slide.delete({
      where: {
        id: slideId!,
      },
    });
    return NextResponse.next({
      status: 204,
    });
  } catch (err) {
    return NextResponse.next({
      status: 400,
      statusText: "The slide couldn't be deleted",
    });
  }
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slideId = searchParams.get('slideId');
  const res = await request.json();

  try {
    const body = createSlideBodySchema.parse(res);
    const { title, sortOrder, bulletPoints, notes } = body;
    const slide = await db.slide.update({
      where: {
        id: slideId!,
      },
      data: {
        title,
        sortOrder,
        bulletPoints,
        notes,
      },
    });
    return NextResponse.json(slide);
  } catch (err) {
    return NextResponse.next({
      status: 400,
      statusText: "The slide couldn't be updated",
    });
  }
}
