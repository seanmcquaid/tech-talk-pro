import { createApi } from '@reduxjs/toolkit/query/react';
import kyBaseQuery from '../kyBaseQuery';

const promptApi = createApi({
  reducerPath: 'promptApi',
  baseQuery: kyBaseQuery({
    baseUrl: '/api/prompt',
  }),
  endpoints: builder => ({
    promptTalkTitles: builder.mutation<unknown, { prompt: string }>({
      query: ({ prompt }) => ({
        url: 'talkTitles',
        method: 'post',
        json: { prompt },
      }),
    }),
  }),
});

export const { usePromptTalkTitlesMutation } = promptApi;

export default promptApi;
