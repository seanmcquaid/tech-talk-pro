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
import styled from 'styled-components';

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
        toast('Your talk was successfully edited');
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
        toast('Your talk was successfully deleted');
      })
      .catch(() => {
        toast('Something went wrong deleting your talk, try again!');
      });
  };

  return (
    <PageWrapper isLoading={isLoading}>
      <StyledForm onSubmit={onSubmit}>
        <RowWrapper>
          <Controller
            name="topic"
            control={control}
            render={({ field }) => <Input.TextArea {...field} />}
          />
        </RowWrapper>
        <RowWrapper>
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
                  title: t('ConfigurePage.minutes', {
                    numberOfMinutes: option,
                  }),
                  value: option,
                }))}
              />
            )}
          />
        </RowWrapper>
        <RowWrapper>
          <Controller
            name="abstract"
            control={control}
            render={({ field }) => <Input.TextArea {...field} />}
          />
        </RowWrapper>
        <RowWrapper>
          <StyledButton htmlType="submit" disabled={editTalkLoading}>
            {t('EditTalkPage.save')}
          </StyledButton>
          <StyledButton
            onClick={handleDeleteOnClick}
            disabled={deleteTalkLoading}
            htmlType="button"
          >
            {t('EditTalkPage.delete')}
          </StyledButton>
        </RowWrapper>
      </StyledForm>
    </PageWrapper>
  );
};

const StyledForm = styled.form`
  width: 100%;
  max-width: 600px;
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 16px;
  width: 100%;
`;

const StyledButton = styled(Button)`
  margin-right: 8px;
`;

export default EditTalkPage;
