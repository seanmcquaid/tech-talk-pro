'use client';
import PageWrapper from '@/components/PageWrapper';
import { Button, Select, Typography } from 'antd';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setTalkLength, setTopic } from '@/store/talk/slice';
import { useRouter } from 'next/navigation';
import { selectTalkLength, selectTopic } from '@/store/talk/selectors';
import Topics from '@/enums/Topics';
import AppConstants from '@/AppConstants';

const formSchema = z.object({
  topic: Topics,
  talkLength: z.union([
    z.literal(5),
    z.literal(10),
    z.literal(15),
    z.literal(20),
    z.literal(25),
    z.literal(30),
    z.literal(35),
    z.literal(40),
    z.literal(45),
    z.literal(50),
    z.literal(55),
    z.literal(60),
  ]),
});

const ConfigurePage = () => {
  const talkLength = useSelector(selectTalkLength);
  const topic = useSelector(selectTopic);
  const { control, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      topic,
      talkLength,
    },
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = handleSubmit(value => {
    dispatch(setTalkLength(value.talkLength));
    dispatch(setTopic(value.topic));
    router.push('/dashboard/talks/create/title');
  });

  return (
    <PageWrapper>
      <Typography.Title>{'Select a topic to start'}</Typography.Title>
      <form onSubmit={onSubmit}>
        <Controller
          name="topic"
          control={control}
          render={({ field }) => (
            <Select
              onChange={field.onChange}
              value={field.value}
              options={Topics.options.map(option => ({
                title: option,
                value: option,
              }))}
            />
          )}
        />
        <Controller
          name="talkLength"
          control={control}
          render={({ field }) => (
            <Select
              onChange={field.onChange}
              value={field.value}
              options={AppConstants.talkLengthOptions.map(option => ({
                title: `${option} minutes`,
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

export default ConfigurePage;
