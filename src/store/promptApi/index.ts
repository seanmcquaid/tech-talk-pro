import { createApi } from '@reduxjs/toolkit/query/react';
import kyBaseQuery from '../kyBaseQuery';

const promptApi = createApi({
  reducerPath: 'promptApi',
  baseQuery: kyBaseQuery({
    baseUrl: '/api/prompt',
  }),
  endpoints: builder => ({}),
});

export const {} = promptApi;

export default promptApi;
