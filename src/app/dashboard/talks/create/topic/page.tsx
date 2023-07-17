'use client';
import PageWrapper from '@/components/PageWrapper';
import { Typography, Button, Input } from 'antd';
import { useChat } from 'ai/react';
import { selectTalkCategory } from '@/store/talk/selectors';
import { useSelector } from 'react-redux';

const SelectTopicPage = () => {
  const talkCategory = useSelector(selectTalkCategory);
  const { messages, handleSubmit, reload, isLoading, error } = useChat({
    api: '/api/prompt',
    initialInput: `Give me a list of ten tech conference talk topics focused on ${talkCategory}`,
  });

  console.log(isLoading, error);

  return (
    <PageWrapper>
      <Typography.Title>{'Time to figure out your title!'}</Typography.Title>
      <Typography.Paragraph>
        {
          'Based on your selections from earlier, here are some tech talk titles, Click enter to see!'
        }
      </Typography.Paragraph>
      <ul>
        {messages.map((m, index) => (
          <li key={index}>
            {m.role === 'user' ? 'User: ' : 'AI: '}
            {m.content}
          </li>
        ))}
      </ul>
      {!!messages.length && (
        <>
          <Typography.Paragraph>
            {'Unhappy with the results? Try again!'}
          </Typography.Paragraph>
          <Button onClick={() => reload()}>{'Reload'}</Button>
        </>
      )}
      <form onSubmit={handleSubmit}>
        <Button htmlType="submit">{'Prompt'}</Button>
      </form>
    </PageWrapper>
  );
};

export default SelectTopicPage;
