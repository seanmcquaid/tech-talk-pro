import type { Talk } from '@prisma/client';
import createApiClient from './createApiClient';
import type CreateTalkBody from '@/types/requests/CreateTalkBody';

const apiClient = createApiClient('/api');

const talksService = {
  getTalks: () => apiClient.get('talks').json<Talk[]>(),
  getTalk: (id: string) => apiClient.get(`talks/${id}`).json<Talk>(),
  deleteTalk: (id: string) => apiClient.delete(`talks/${id}`),
  editTalk: ({ talk, id }: { talk: CreateTalkBody; id: string }) =>
    apiClient.put(`talks/${id}`, { json: talk }),
  createTalk: (talk: CreateTalkBody) =>
    apiClient.post('talks', { json: talk }).json<Talk>(),
} as const;

export default talksService;
