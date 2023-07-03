import { createTalkBodySchema } from '@/types/requests/CreateTalkBody';
import db from '@/utils/db';
import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { userId } = auth();
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

  if (talk.userId !== userId) {
    return NextResponse.next({
      status: 403,
      statusText: 'You are not authorized to view this talk',
    });
  }

  return NextResponse.json(talk);
}

export function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    db.talk.delete({
      where: {
        id: id!,
      },
    });
    return NextResponse.next({
      status: 204,
    });
  } catch (err) {
    return NextResponse.next({
      status: 400,
      statusText: "The talk couldn't be deleted",
    });
  }
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const res = await request.json();

  try {
    const { title, talkLength, topic, abstract } =
      createTalkBodySchema.parse(res);
    const talk = await db.talk.update({
      where: {
        id: id!,
      },
      data: {
        title,
        talkLength,
        topic,
        abstract,
      },
    });
    return NextResponse.json(talk);
  } catch (err) {
    return NextResponse.next({
      status: 400,
      statusText: "The talk couldn't be updated",
    });
  }
}
