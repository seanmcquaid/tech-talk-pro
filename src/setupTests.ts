import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'vitest-mock-extended';

import db from '@/utils/db';

vi.mock('@/utils/db', () => mockDeep<PrismaClient>());

vi.mock('next/router', () => require('next-router-mock'));

export const mockDb = db as unknown as DeepMockProxy<PrismaClient>;

declare module 'vitest' {
  interface Assertion<T>
    extends jest.Matchers<void, T>,
      TestingLibraryMatchers<T, void> {}
}

expect.extend(matchers);

beforeEach(() => {
  vi.resetAllMocks();
});
