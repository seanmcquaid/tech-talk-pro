import type { Talk } from '@prisma/client';
import createApiClient from './createApiClient';

const apiClient = createApiClient('/api');

const talksService = {
  getTalks: () => apiClient.get('talks').json<Talk[]>(),
} as const;

export default talksService;
