import { createTalkBodySchema } from '@/types/requests/CreateTalkBody';
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
  const { userId } = auth();
  const res = await request.json();

  try {
    const body = createTalkBodySchema.parse(res);
    const { title, talkLength, abstract, topic } = body;
    const talk = await db.talk.create({
      data: {
        title,
        userId: userId!,
        talkLength,
        abstract,
        topic,
      },
    });
    return NextResponse.json(talk);
  } catch (err) {
    return NextResponse.next({
      status: 400,
      statusText: "The talk couldn't be created",
    });
  }
}
