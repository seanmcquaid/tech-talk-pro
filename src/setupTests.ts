import '@testing-library/jest-dom/vitest';
import type { PrismaClient } from '@prisma/client';
import type { DeepMockProxy } from 'vitest-mock-extended';
import { mockDeep } from 'vitest-mock-extended';
import db from '@/utils/db';

vi.mock('@/utils/db', () => mockDeep<PrismaClient>());

vi.mock('next/navigation', () => require('next-router-mock'));

vi.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {},
    };
  },
}));

export const mockDb = db as unknown as DeepMockProxy<PrismaClient>;
