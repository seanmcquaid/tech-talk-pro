import db from '@/utils/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.next({
      status: 400,
      statusText: 'No ID was provided',
    });
  }

  const talk = await db.talk.findUnique({
    where: {
      id,
    },
  });

  if (!talk) {
    return NextResponse.next({
      status: 404,
      statusText: 'Talk not found',
    });
  }

  return NextResponse.json(talk);
}
