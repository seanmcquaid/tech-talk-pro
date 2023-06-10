import { z } from 'zod';
import createApiClient from './createApiClient';
import Post, { postSchema } from '@/types/Post';

const apiClient = createApiClient('https://jsonplaceholder.typicode.com');

const postsService = {
  getPosts: () =>
    apiClient
      .get('posts', { validationSchema: z.array(postSchema) })
      .json<Post[]>(),
} as const;

export default postsService;
