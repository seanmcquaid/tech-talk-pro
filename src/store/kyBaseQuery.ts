import createApiClient from '@/services/createApiClient';
import type { BaseQueryFn } from '@reduxjs/toolkit/dist/query';
import type { HTTPError, Options } from 'ky';

interface KyBaseQuery extends Options {
  url: string;
}

const kyBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' },
  ): BaseQueryFn<KyBaseQuery, unknown, unknown> =>
  async ({ url, ...rest }) => {
    try {
      const apiClient = createApiClient(baseUrl);
      const result = await apiClient(url, {
        ...rest,
      });
      return { data: await result.json() };
    } catch (err) {
      const httpError = err as HTTPError;

      return {
        error: {
          status: httpError.response.status,
          data: httpError.responseData,
        },
      };
    }
  };

export default kyBaseQuery;
