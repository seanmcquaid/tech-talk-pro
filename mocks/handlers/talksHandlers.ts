import type { Talk } from '@prisma/client';
import { http, HttpResponse } from 'msw';

export const getTalksHandler = http.get('/api/talks', () =>
  HttpResponse.json([
    {
      id: '1',
      talkLength: 30,
      createdAt: new Date(),
      abstract: 'abstract',
      topic: 'topic',
      userId: '1',
      category: 'category',
    },
  ] satisfies Talk[]),
);

export const getTalkHandler = http.get('/api/talks/:id', ({ params }) =>
  HttpResponse.json({
    id: params.id as string,
    talkLength: 30,
    createdAt: new Date(),
    abstract: 'abstract',
    topic: 'topic',
    userId: '1',
    category: 'category',
  } satisfies Talk),
);

export const deleteTalkHandler = http.delete(
  '/api/talks/:id',
  () =>
    new HttpResponse(null, {
      status: 200,
      statusText: 'OK',
    }),
);

export const editTalkHandler = http.put(
  '/api/talks/:id',
  () =>
    new HttpResponse(null, {
      status: 200,
      statusText: 'OK',
    }),
);

export const createTalkHandler = http.post(
  '/api/talks',
  () =>
    new HttpResponse(
      JSON.stringify({
        id: '1',
        talkLength: 30,
        createdAt: new Date(),
        abstract: 'abstract',
        topic: 'topic',
        userId: '1',
        category: 'category',
      } satisfies Talk),
      {
        status: 200,
        statusText: 'OK',
      },
    ),
);
