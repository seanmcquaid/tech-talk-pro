'use client';

import PageWrapper from '@/components/ui/PageWrapper';
import {
  useDeleteTalkMutation,
  useEditTalkMutation,
  useGetTalkQuery,
} from '@/store/talksApi';
import type CreateTalkBody from '@/types/requests/CreateTalkBody';
import { createTalkBodySchema } from '@/types/requests/CreateTalkBody';
import { useParams, useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TalkCategories from '@/constants/TalkCategories';
import { Button, Input, Select } from 'antd';
import TalkLengths from '@/constants/TalkLengths';
import useAppTranslation from '@/hooks/useAppTranslation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const EditTalkPage = () => {
  const { t } = useAppTranslation();
  const router = useRouter();
  const params = useParams();
  const { data, isLoading } = useGetTalkQuery(params.id as string);
  const [editTalk, { isLoading: editTalkLoading }] = useEditTalkMutation();
  const [deleteTalk, { isLoading: deleteTalkLoading }] =
    useDeleteTalkMutation();
  const { handleSubmit, control, setValue } = useForm<CreateTalkBody>({
    defaultValues: {
      category: 'Software Engineering',
      talkLength: 30,
      topic: '',
      abstract: '',
    },
    resolver: zodResolver(createTalkBodySchema),
  });

  useEffect(() => {
    if (data) {
      setValue('category', data.category);
      setValue('talkLength', data.talkLength);
      setValue('topic', data.topic);
      setValue('abstract', data.abstract);
    }
  }, [data, setValue]);

  const onSubmit = handleSubmit(data => {
    editTalk({
      talk: data,
      id: params.id as string,
    })
      .unwrap()
      .then(() => {
        router.push(`/dashboard/talks/${params.id}`);
      })
      .catch(() => {
        toast('Something went wrong editing your talk, try again!');
      });
  });

  const handleDeleteOnClick = () => {
    deleteTalk(params.id as string)
      .unwrap()
      .then(() => {
        router.push('/dashboard/talks');
      })
      .catch(() => {
        toast('Something went wrong deleting your talk, try again!');
      });
  };

  return (
    <PageWrapper isLoading={isLoading}>
      <Button onClick={handleDeleteOnClick} disabled={deleteTalkLoading}>
        {t('EditTalkPage.delete')}
      </Button>
      <form onSubmit={onSubmit}>
        <Controller
          name="topic"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
        <Controller
          name="category"
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
        <Controller
          name="abstract"
          control={control}
          render={({ field }) => <Input.TextArea {...field} />}
        />
        <Button htmlType="submit" disabled={editTalkLoading}>
          {t('EditTalkPage.save')}
        </Button>
      </form>
    </PageWrapper>
  );
};

export default EditTalkPage;
