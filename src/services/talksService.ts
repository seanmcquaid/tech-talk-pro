import { Talk } from '@prisma/client';
import createApiClient from './createApiClient';

const apiClient = createApiClient('/api/talks');

const talksService = {
  getTalks: () => apiClient.get('').json<Talk[]>(),
} as const;

export default talksService;
