import db from '@/utils/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET() {
  const { userId } = auth();
  const talks = await db.talk.findMany({
    where: {
      userId: userId!,
    },
  });
  return NextResponse.json(talks);
}
