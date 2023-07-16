import type { Talk } from '@prisma/client';
import { createApi } from '@reduxjs/toolkit/query/react';
import kyBaseQuery from '../kyBaseQuery';
import { z } from 'zod';

const talksApi = createApi({
  reducerPath: 'talksApi',
  baseQuery: kyBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: builder => ({
    getTalks: builder.query<Talk[], void>({
      query: () => ({ url: 'talks' }),
    }),
  }),
});

export const { useGetTalksQuery } = talksApi;

export default talksApi;
