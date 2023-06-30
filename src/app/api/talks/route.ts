import db from '@/utils/db';
import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const { userId } = auth();
  const talks = await db.talk.findMany({
    where: {
      userId: userId!,
    },
  });
  return NextResponse.json(talks);
}

export async function POST(request: NextRequest) {
  const res = await request.json();

  return NextResponse.json(res);
}
