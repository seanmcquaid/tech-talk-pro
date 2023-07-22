'use client';
import PageWrapper from '@/components/PageWrapper';
import { Typography, Button } from 'antd';
import { useChat } from 'ai/react';
import { selectTalkCategory } from '@/store/talk/selectors';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { setTopic } from '@/store/talk/slice';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store';
import LoadingSpinner from '@/components/LoadingSpinner';

const SelectTopicPage = () => {
  const talkCategory = useSelector(selectTalkCategory);
  const dispatch = useAppDispatch();
  const { messages, handleSubmit, reload, isLoading, error } = useChat({
    api: '/api/prompt',
    initialInput: `Give me a list of ten tech conference talk topics focused on ${talkCategory}`,
  });
  const router = useRouter();

  const handleSelectTopic = (topic: string) => {
    dispatch(setTopic(topic));
    router.push('/dashboard/talks/create/abstract');
  };

  return (
    <PageWrapper>
      <Typography.Title>{'Time to figure out your topic!'}</Typography.Title>
      <Typography.Paragraph>
        {
          'Based on your selections from earlier, here are some tech talk topics, Click the button below to see!'
        }
      </Typography.Paragraph>
      {!!messages.length && !isLoading && (
        <>
          <Typography.Paragraph>
            {'Unhappy with the results? Try again!'}
          </Typography.Paragraph>
          <Button onClick={() => reload()} loading={isLoading}>
            {'Reload'}
          </Button>
        </>
      )}
      {!messages.length && (
        <form onSubmit={handleSubmit}>
          <Button htmlType="submit" loading={isLoading}>
            {'Prompt'}
          </Button>
        </form>
      )}
      <ul>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          messages
            .filter(message => message.role !== 'user')
            .map((m, index) => (
              <StyledListItem key={index}>
                <ul>
                  {m.content.split('\n').map(str => (
                    <StyledListItem key={str}>
                      <span>{str}</span>
                      <Button onClick={() => handleSelectTopic(str)}>
                        {'Select this topic'}
                      </Button>
                    </StyledListItem>
                  ))}
                </ul>
              </StyledListItem>
            ))
        )}
      </ul>
      {error && <p>{error.message}</p>}
    </PageWrapper>
  );
};

const StyledListItem = styled.li`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
`;

export default SelectTopicPage;
