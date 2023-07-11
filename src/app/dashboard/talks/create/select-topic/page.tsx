import PageWrapper from '@/components/PageWrapper';
import { Select, Typography } from 'antd';
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
  const { control } = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      topic: 'Software Engineering',
    },
  });

  return (
    <PageWrapper>
      <Typography.Title>{'Select a topic to start'}</Typography.Title>
      <Controller
        name="topic"
        control={control}
        render={({ field }) => (
          <Select onChange={field.onChange} value={field.value} />
        )}
      />
    </PageWrapper>
  );
};

export default SelectTopicPage;
