'use client';
import PageWrapper from '@/components/PageWrapper';
import { Typography, Button, Input } from 'antd';
import { useChat } from 'ai/react';

const SelectTitlePage = () => {
  const {
    messages,
    handleSubmit: handleChatSubmit,
    input,
    handleInputChange,
  } = useChat({
    api: '/api/prompt/talkTitles',
  });

  return (
    <PageWrapper>
      <Typography.Title>{'Time to figure out your title!'}</Typography.Title>
      <form onSubmit={handleChatSubmit}>
        <ul>
          {messages.map((m, index) => (
            <li key={index}>
              {m.role === 'user' ? 'User: ' : 'AI: '}
              {m.content}
            </li>
          ))}
        </ul>
        <Input value={input} onChange={handleInputChange} />
        <Button htmlType="submit">{'Prompt'}</Button>
      </form>
    </PageWrapper>
  );
};

export default SelectTitlePage;
