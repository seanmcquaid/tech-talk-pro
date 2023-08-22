'use client';

import useAppTranslation from '@/hooks/useAppTranslation';
import { useAppSelector } from '@/store';
import {
  selectAbstract,
  selectTalkCategory,
  selectTalkLength,
  selectTopic,
} from '@/store/talk/selectors';
import { useChat } from 'ai/react/dist';

const CreateSlidesPage = () => {
  const { t } = useAppTranslation();
  const talkLength = useAppSelector(selectTalkLength);
  const talkCategory = useAppSelector(selectTalkCategory);
  const topic = useAppSelector(selectTopic);
  const abstract = useAppSelector(selectAbstract);
  const { messages, handleSubmit, reload, isLoading, error } = useChat({
    api: '/api/prompt',
    initialInput: `Give me a list of slides for a technical talk on ${topic} that is ${talkLength} minutes long and is in the ${talkCategory} category. The abstract is ${abstract}`,
  });

  return <div>{'Placeholder'}</div>;
};

export default CreateSlidesPage;
