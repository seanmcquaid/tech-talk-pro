'use client';

import PageWrapper from '@/components/ui/PageWrapper';
import { useGetTalkQuery } from '@/store/talksApi';
import { Typography } from 'antd';
import { useParams } from 'next/navigation';

const TalkDetailsPage = () => {
  const params = useParams();
  const { data, isLoading } = useGetTalkQuery(params.id as string);

  return (
    <PageWrapper isLoading={isLoading}>
      <Typography.Title>{data?.topic}</Typography.Title>
      <Typography>{`${data?.talkLength} minutes long`}</Typography>
      <Typography>{data?.abstract}</Typography>
    </PageWrapper>
  );
};

export default TalkDetailsPage;
