'use client';
import PageWrapper from '@/components/PageWrapper';
import { Typography, Button } from 'antd';
import { useChat } from 'ai/react';
import { selectTalkCategory } from '@/store/talk/selectors';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setTopic } from '@/store/talk/slice';
import { useRouter } from 'next/navigation';

const SelectTopicPage = () => {
  const talkCategory = useSelector(selectTalkCategory);
  const dispatch = useDispatch();
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
      {!messages.length && !isLoading && (
        <form onSubmit={handleSubmit}>
          <Button htmlType="submit" loading={isLoading}>
            {'Prompt'}
          </Button>
        </form>
      )}
      <ul>
        {messages
          .filter(message => message.role !== 'user')
          .map((m, index) => (
            <StyledListItem key={index}>
              {m.content.split('\n').map(str => (
                <span key={str}>
                  {str}{' '}
                  <Button onClick={() => handleSelectTopic(str)}>
                    {'Select this topic'}
                  </Button>
                </span>
              ))}
            </StyledListItem>
          ))}
      </ul>
      {error && <p>{error.message}</p>}
    </PageWrapper>
  );
};

const StyledListItem = styled.li`
  display: flex;
  flex-direction: column;
`;

export default SelectTopicPage;
