import { createTalkBodySchema } from '@/types/requests/CreateTalkBody';
import db from '@/utils/db';
import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const { userId } = auth();
    const talks = await db.talk.findMany({
      where: {
        userId: userId!,
      },
    });
    return NextResponse.json(talks);
  } catch (err) {
    return NextResponse.next({
      status: 500,
      statusText: "The talks couldn't be retrieved",
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    const res = await request.json();
    const { title, talkLength, abstract, topic } =
      createTalkBodySchema.parse(res);
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
      status: 500,
      statusText: "The talk couldn't be created",
    });
  }
}
