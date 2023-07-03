import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'vitest-mock-extended';

import db from '@/utils/db';

vi.mock('./client', () => mockDeep<PrismaClient>());

export const dbMock = db as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
  vi.resetAllMocks();
});

declare module 'vitest' {
  interface Assertion<T>
    extends jest.Matchers<void, T>,
      TestingLibraryMatchers<T, void> {}
}

vi.mock('next/router', () => require('next-router-mock'));

expect.extend(matchers);
