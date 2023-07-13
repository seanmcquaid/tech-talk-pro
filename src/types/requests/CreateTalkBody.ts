import { z } from 'zod';

export const createTalkBodySchema = z.object({
  title: z.string(),
  talkLength: z.number(),
  abstract: z.string(),
  topic: z.string(),
});

type CreateTalkBody = z.infer<typeof createTalkBodySchema>;

export default CreateTalkBody;
