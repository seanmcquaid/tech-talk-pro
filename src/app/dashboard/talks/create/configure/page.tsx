'use client';
import PageWrapper from '@/components/PageWrapper';
import { Button, Select, Typography } from 'antd';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { setTalkLength, setTopic } from '@/store/talk/slice';
import { useRouter } from 'next/navigation';
import { selectTalkCategory, selectTalkLength } from '@/store/talk/selectors';
import TalkLengths from '@/enums/TalkLengths';
import useAppTranslation from '@/hooks/useAppTranslation';
import TalkCategories from '@/enums/TalkCategories';
import { useAppDispatch } from '@/store';

const formSchema = z.object({
  talkCategory: TalkCategories,
  talkLength: TalkLengths,
});

const ConfigurePage = () => {
  const { t } = useAppTranslation();
  const talkLength = useSelector(selectTalkLength);
  const talkCategory = useSelector(selectTalkCategory);
  console.log(talkCategory);
  const { control, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      talkCategory,
      talkLength,
    },
  });
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = handleSubmit(value => {
    dispatch(setTalkLength(value.talkLength));
    dispatch(setTopic(value.talkCategory));
    router.push('/dashboard/talks/create/topic');
  });

  return (
    <PageWrapper>
      <Typography.Title>{t('ConfigurePage.title')}</Typography.Title>
      <Typography.Paragraph>{t('ConfigurePage.subtitle')}</Typography.Paragraph>
      <form onSubmit={onSubmit}>
        <Controller
          name="talkCategory"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={TalkCategories.options.map(option => ({
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
