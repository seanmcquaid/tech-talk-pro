import type { Talk } from '@prisma/client';
import { createApi } from '@reduxjs/toolkit/query/react';
import kyBaseQuery from '../kyBaseQuery';
import type CreateTalkBody from '@/types/requests/CreateTalkBody';

const talksApi = createApi({
  reducerPath: 'talksApi',
  baseQuery: kyBaseQuery({
    baseUrl: '/api',
  }),
  tagTypes: ['Talk', 'Talks'],
  endpoints: builder => ({
    getTalks: builder.query<Talk[], void>({
      query: () => ({ url: 'talks' }),
      providesTags: ['Talks'],
    }),
    createTalk: builder.mutation<Talk, CreateTalkBody>({
      query: json => ({ url: 'talks', method: 'POST', json }),
      invalidatesTags: result => ['Talks', { type: 'Talk', id: result?.id }],
    }),
    getTalk: builder.query<Talk, string>({
      query: id => ({ url: `talks/${id}` }),
      providesTags: result => [{ type: 'Talk', id: result?.id }],
    }),
    deleteTalk: builder.mutation<void, string>({
      query: id => ({ url: `talks/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Talks'],
    }),
    editTalk: builder.mutation<Talk, { talk: CreateTalkBody; id: string }>({
      query: ({ talk, id }) => ({
        url: `talks/${id}`,
        method: 'PUT',
        json: talk,
      }),
      invalidatesTags: result => [
        'Talks',
        {
          type: 'Talk',
          id: result?.id,
        },
      ],
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
