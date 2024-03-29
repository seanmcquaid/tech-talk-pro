import { createTalkBodySchema } from '@/types/requests/CreateTalkBody';
import db from '@/utils/db';
import { auth } from '@clerk/nextjs';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { userId } = auth();
    const { id } = params;

    const talk = await db.talk.findUnique({
      where: {
        id: id!,
      },
    });

    if (!talk) {
      return NextResponse.json(null, {
        status: 404,
        statusText: 'Talk not found',
      });
    }

    if (talk.userId !== userId) {
      return NextResponse.json(null, {
        status: 403,
        statusText: 'You are not authorized to view this talk',
      });
    }

    return NextResponse.json(talk);
  } catch (err) {
    return NextResponse.json(null, {
      status: 500,
      statusText: "The talk couldn't be retrieved",
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    await db.talk.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(null, {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(null, {
      status: 500,
      statusText: "The talk couldn't be deleted",
    });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { userId } = auth();
    const { id } = params;
    const body = await request.json();
    const originalTalk = await db.talk.findUnique({
      where: {
        id,
      },
    });

    if (!originalTalk) {
      return NextResponse.json(null, {
        status: 404,
        statusText: 'Talk not found',
      });
    }

    if (originalTalk.userId !== userId) {
      return NextResponse.json(null, {
        status: 403,
        statusText: 'You are not authorized to view this talk',
      });
    }

    const { talkLength, topic, abstract, category } =
      createTalkBodySchema.parse(body);
    const updatedTalk = await db.talk.update({
      where: {
        id,
      },
      data: {
        talkLength,
        topic,
        abstract,
        category,
      },
    });
    return NextResponse.json(updatedTalk);
  } catch (err) {
    return NextResponse.json(null, {
      status: 500,
      statusText: "The talk couldn't be updated",
    });
  }
}
