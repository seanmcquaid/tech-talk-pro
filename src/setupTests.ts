import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
import type { PrismaClient } from '@prisma/client';
import type { DeepMockProxy } from 'vitest-mock-extended';
import { mockDeep } from 'vitest-mock-extended';

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
