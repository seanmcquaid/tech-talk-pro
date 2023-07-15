import talksService from '@/services/talksService';
import type { Talk } from '@prisma/client';
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const talksApi = createApi({
  reducerPath: 'talksApi',
  baseQuery: fetchBaseQuery(),
  endpoints: builder => ({
    getTalks: builder.query<Talk[], void>({
      queryFn: async () => {
        return { data: await talksService.getTalks() };
      },
    }),
  }),
});

export const { useGetTalksQuery } = talksApi;

export default talksApi;
