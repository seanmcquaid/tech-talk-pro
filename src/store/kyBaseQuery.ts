import createApiClient from '@/services/createApiClient';
import type { BaseQueryFn } from '@reduxjs/toolkit/dist/query';
import type { HTTPError, Options } from 'ky';

interface KyBaseQuery extends Options {
  url: string;
}

interface KyBaseQueryError {
  status: number;
  data: unknown;
}

const kyBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' },
  ): BaseQueryFn<KyBaseQuery, unknown, KyBaseQueryError> =>
  async ({ url, ...rest }) => {
    try {
      const apiClient = createApiClient(baseUrl);
      const result = await apiClient(url, {
        method: rest.method ?? 'get',
        ...rest,
      });
      return { data: await result.json() };
    } catch (err) {
      console.log('Api client', Object.entries(err), err);
      const httpError = err as HTTPError;

      return {
        error: {
          status: httpError.response?.status,
          data: httpError?.responseData,
        },
      };
    }
  };

export default kyBaseQuery;
