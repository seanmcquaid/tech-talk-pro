import type { Talk } from '@prisma/client';
import { createApi } from '@reduxjs/toolkit/query/react';
import kyBaseQuery from '../kyBaseQuery';

const talksApi = createApi({
  reducerPath: 'talksApi',
  baseQuery: kyBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: builder => ({
    getTalks: builder.query<Talk[], void>({
      query: () => ({ url: 'talks' }),
    }),
    createTalk: builder.mutation<Talk, void>({
      query: () => ({ url: 'talks', method: 'POST' }),
    }),
  }),
});

export const { useGetTalksQuery } = talksApi;

export default talksApi;
