'use client';

import PageWrapper from '@/components/ui/PageWrapper';
import useAppTranslation from '@/hooks/useAppTranslation';
import { useGetTalkQuery } from '@/store/talksApi';
import { Button, Typography } from 'antd';
import { useParams, useRouter } from 'next/navigation';

const TalkDetailsPage = () => {
  const { t } = useAppTranslation();
  const router = useRouter();
  const params = useParams();
  const { data, isLoading } = useGetTalkQuery(params.id as string);

  const handleEditOnClick = () => {
    router.push(`/dashboard/talks/${params.id}/edit`);
  };

  return (
    <PageWrapper isLoading={isLoading}>
      <Typography.Title>{data?.topic}</Typography.Title>
      <Typography>{`${data?.talkLength} minutes long`}</Typography>
      <Typography>{data?.category}</Typography>
      <Typography>{data?.abstract}</Typography>
      <Button onClick={handleEditOnClick}>{t('TalkDetailsPage.edit')}</Button>
    </PageWrapper>
  );
};

export default TalkDetailsPage;
