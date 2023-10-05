'use client';

import LoadingSpinner from '@/components/ui/LoadingSpinner';
import PageWrapper from '@/components/ui/PageWrapper';
import useAppTranslation from '@/hooks/useAppTranslation';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  selectTalkCategory,
  selectTalkLength,
  selectTopic,
} from '@/store/talk/selectors';
import { setAbstract } from '@/store/talk/slice';
import { useCreateTalkMutation } from '@/store/talksApi';
import { useChat } from 'ai/react';
import { Button, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import styled from 'styled-components';

const CreateAbstractPage = () => {
  const { t } = useAppTranslation();
  const dispatch = useAppDispatch();
  const topic = useAppSelector(selectTopic);
  const talkLength = useAppSelector(selectTalkLength);
  const category = useAppSelector(selectTalkCategory);
  const { messages, handleSubmit, reload, isLoading, error } = useChat({
    api: '/api/prompt',
    initialInput: `Give me a one paragraph abstract for a talk on ${topic}`,
  });
  const filteredMessages = messages.filter(message => message.role !== 'user');
  const router = useRouter();
  const [createTalk, { isLoading: createTalkLoading }] =
    useCreateTalkMutation();

  const handleGoToNextPage = () => {
    const abstract = filteredMessages[0];
    dispatch(setAbstract(abstract.content));
    createTalk({
      abstract: abstract.content,
      topic,
      category,
      talkLength,
    })
      .unwrap()
      .then(() => {
        router.push('/dashboard/talks');
        toast('Talk created successfully');
      })
      .catch(() => {
        toast('Something went wrong creating your talk, try again!');
      });
  };

  return (
    <PageWrapper>
      <Typography.Title>{t('CreateAbstractPage.title')}</Typography.Title>
      <ButtonWrapper>
        {!!messages.length && !isLoading && (
          <StyledButton
            onClick={handleGoToNextPage}
            loading={createTalkLoading}
          >
            {t('CreateAbstractPage.goToNextPage')}
          </StyledButton>
        )}
        {!!messages.length && !isLoading ? (
          <StyledButton onClick={() => reload()} loading={isLoading}>
            {t('CreateAbstractPage.reload')}
          </StyledButton>
        ) : (
          <form onSubmit={handleSubmit}>
            <StyledButton htmlType="submit" loading={isLoading}>
              {t('CreateAbstractPage.load')}
            </StyledButton>
          </form>
        )}
      </ButtonWrapper>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <StyledList data-testid="abstract">
          {filteredMessages.map((m, index) => (
            <li key={index}>{m.content}</li>
          ))}
        </StyledList>
      )}
      {error && <Typography.Paragraph>{error.message}</Typography.Paragraph>}
    </PageWrapper>
  );
};

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const StyledButton = styled(Button)`
  margin-right: 1rem;
`;

export default CreateAbstractPage;
