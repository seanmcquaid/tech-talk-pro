import { mockDb } from '@/setupTests';
import { auth } from '@clerk/nextjs';
import { MockedFunction } from 'vitest';
import { GET } from '../route';
import { NextRequest } from 'next/server';
import { SignedInAuthObject } from '@clerk/nextjs/dist/types/server';
import { Talk } from '@prisma/client';

vi.mock('@clerk/nextjs');

const mockAuth = auth as MockedFunction<typeof auth>;

describe('/talks/[id]', () => {
  describe('GET', () => {
    it('Returns 404 if no talk is found', async () => {
      mockAuth.mockReturnValueOnce({ userId: '123' } as SignedInAuthObject);
      const result = await GET({} as NextRequest, {
        params: {
          id: '123',
        },
      });
      expect(result.status).toBe(404);
    });
    it('Returns 403 if userId does not match the userId with the talk', async () => {
      mockAuth.mockReturnValueOnce({ userId: '123' } as SignedInAuthObject);
      mockDb.talk.findUnique.mockResolvedValueOnce({
        id: '123',
        title: 'Test talk',
        userId: '456',
        talkLength: 30,
        topic: 'Test topic',
        abstract: 'Test abstract',
      } as Talk);
      const result = await GET({} as NextRequest, {
        params: {
          id: '123',
        },
      });
      expect(result.status).toBe(403);
    });
    it('Returns successful response if talk is found and userId matches', async () => {
      mockAuth.mockReturnValueOnce({ userId: '456' } as SignedInAuthObject);
      mockDb.talk.findUnique.mockResolvedValueOnce({
        id: '123',
        title: 'Test talk',
        userId: '456',
        talkLength: 30,
        topic: 'Test topic',
        abstract: 'Test abstract',
      } as Talk);
      const result = await GET({} as NextRequest, {
        params: {
          id: '123',
        },
      });
      expect(result.status).toBe(200);
      expect(await result.json()).toEqual({
        id: '123',
        title: 'Test talk',
        userId: '456',
        talkLength: 30,
        topic: 'Test topic',
        abstract: 'Test abstract',
      });
    });
  });
});
