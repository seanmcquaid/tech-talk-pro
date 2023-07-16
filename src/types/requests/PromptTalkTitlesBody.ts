import { z } from 'zod';

export const promptTalkTitlesBodySchema = z.object({
  prompt: z.string(),
});

type PromptTalkTitlesBody = z.infer<typeof promptTalkTitlesBodySchema>;

export default PromptTalkTitlesBody;
