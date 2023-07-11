'use client';
import PageWrapper from '@/components/PageWrapper';
import { Button, Select, Typography } from 'antd';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';

const topicOptions = [
  'Artificial Intelligence',
  'Blockchain',
  'Cloud Computing',
  'Cyber Security',
  'Data Science',
  'DevOps',
  'Internet of Things',
  'Machine Learning',
  'Mobile Development',
  'Programming Languages',
  'Quantum Computing',
  'Software Architecture',
  'Software Engineering',
  'Web Development',
  'Android Development',
  'iOS Development',
  'Backend Development',
  'Leadership',
] as const;

const TopicEnum = z.enum(topicOptions);

const formSchema = z.object({
  topic: TopicEnum,
});

const SelectTopicPage = () => {
  const { control, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      topic: 'Software Engineering',
    },
  });

  return (
    <PageWrapper>
      <Typography.Title>{'Select a topic to start'}</Typography.Title>
      <form
        onSubmit={handleSubmit(value => {
          console.log(value.topic);
        })}
      >
        <Controller
          name="topic"
          control={control}
          render={({ field }) => (
            <Select
              onChange={field.onChange}
              value={field.value}
              options={TopicEnum.options.map(option => ({
                title: option,
                value: option,
              }))}
            />
          )}
        />
        <Button htmlType="submit">{'Go to the next page'}</Button>
      </form>
    </PageWrapper>
  );
};

export default SelectTopicPage;
