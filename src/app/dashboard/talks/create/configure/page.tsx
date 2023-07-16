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
import TalkLengths from '@/enums/TalkLengths';
import useAppTranslation from '@/hooks/useAppTranslation';

const formSchema = z.object({
  topic: Topics,
  talkLength: TalkLengths,
});

const ConfigurePage = () => {
  const { t } = useAppTranslation();
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
      <Typography.Title>{t('ConfigurePage.title')}</Typography.Title>
      <Typography.Paragraph>{t('ConfigurePage.subtitle')}</Typography.Paragraph>
      <form onSubmit={onSubmit}>
        <Controller
          name="topic"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
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
              {...field}
              options={Object.values(TalkLengths.enum).map(option => ({
                title: t('ConfigurePage.minutes', { numberOfMinutes: option }),
                value: option,
              }))}
            />
          )}
        />
        <Button htmlType="submit">{t('ConfigurePage.goToNextPage')}</Button>
      </form>
    </PageWrapper>
  );
};

export default ConfigurePage;
