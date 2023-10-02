import type { Talk } from '@prisma/client';
import { createApi } from '@reduxjs/toolkit/query/react';
import kyBaseQuery from '../kyBaseQuery';
import type CreateTalkBody from '@/types/requests/CreateTalkBody';

const talksApi = createApi({
  reducerPath: 'talksApi',
  baseQuery: kyBaseQuery({
    baseUrl: '/api',
  }),
  tagTypes: ['Talk'],
  endpoints: builder => ({
    getTalks: builder.query<Talk[], void>({
      query: () => ({ url: 'talks' }),
      providesTags: result =>
        result ? result.map(({ id }) => ({ type: 'Talk', id })) : [],
    }),
    createTalk: builder.mutation<Talk, CreateTalkBody>({
      query: json => ({ url: 'talks', method: 'POST', json }),
      invalidatesTags: ['Talk'],
    }),
    getTalk: builder.query<Talk, string>({
      query: id => ({ url: `talks/${id}` }),
      providesTags: result => [{ type: 'Talk', id: result?.id }],
    }),
    deleteTalk: builder.mutation<void, string>({
      query: id => ({ url: `talks/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Talk'],
    }),
    editTalk: builder.mutation<Talk, { talk: CreateTalkBody; id: string }>({
      query: ({ talk, id }) => ({
        url: `talks/${id}`,
        method: 'PUT',
        json: talk,
      }),
      invalidatesTags: ['Talk'],
    }),
  }),
});

export const {
  useGetTalksQuery,
  useCreateTalkMutation,
  useDeleteTalkMutation,
  useEditTalkMutation,
  useGetTalkQuery,
} = talksApi;

export default talksApi;
