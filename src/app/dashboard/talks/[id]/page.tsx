'use client';

import PageWrapper from '@/components/ui/PageWrapper';
import useAppTranslation from '@/hooks/useAppTranslation';
import { useGetTalkQuery } from '@/store/talksApi';
import { Button, Typography } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import styled from 'styled-components';

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
      <StyledButton onClick={handleEditOnClick}>
        {t('TalkDetailsPage.edit')}
      </StyledButton>
      <Typography>
        {data?.category + ' - '} {`${data?.talkLength} minutes long`}
      </Typography>
      <Typography>{data?.abstract}</Typography>
    </PageWrapper>
  );
};

const StyledButton = styled(Button)`
  margin: 16px 0;
`;

export default TalkDetailsPage;
