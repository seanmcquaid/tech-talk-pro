import { NextRequest } from 'next/server';
import { POST } from '../route';
import { auth } from '@clerk/nextjs';
import { MockedFunction } from 'vitest';
import { SignedInAuthObject } from '@clerk/nextjs/dist/types/server';

vi.mock('@clerk/nextjs');

const mockAuth = auth as MockedFunction<typeof auth>;

describe('/talks', () => {
  describe('POST', () => {
    beforeEach(() => {
      mockAuth.mockReturnValue({ userId: 'test' } as SignedInAuthObject);
    });
    it('Successfully responds if a valid request body is provided', async () => {
      const result = await POST({
        json: async () => ({
          title: 'Test',
          talkLength: 30,
          abstract: 'Test',
          topic: 'Test',
        }),
      } as NextRequest);

      expect(result.status).toBe(200);
    });
    it('Throws an error if an invalid request body is provided', async () => {
      const result = await POST({
        json: async () => ({
          title: 'Test',
          talkLength: '30',
          abstract: 'Test',
          topic: 'Test',
        }),
      } as NextRequest);
      expect(result.status).toBe(400);
    });
  });
});
