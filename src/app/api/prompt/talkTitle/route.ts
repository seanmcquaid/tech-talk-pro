import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import type { NextRequest } from 'next/server';
import { promptTalkTitlesBodySchema } from '@/types/requests/PromptTalkTitlesBody';
import serverEnv from '@/env.server';

export const runtime = 'edge';

const apiConfig = new Configuration({
  apiKey: serverEnv.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(apiConfig);

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { prompt } = promptTalkTitlesBodySchema.parse(body);

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
