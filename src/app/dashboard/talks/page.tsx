'use client';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import NavigationCard from '@/components/ui/NavigationCard';
import PageWrapper from '@/components/ui/PageWrapper';
import useAppTranslation from '@/hooks/useAppTranslation';
import { useGetTalksQuery } from '@/store/talksApi';
import { Typography } from 'antd';
import styled from 'styled-components';

const TalksPage = () => {
  const { t } = useAppTranslation();
  const { data, isLoading } = useGetTalksQuery();

  return (
    <PageWrapper>
      <Typography.Title>{t('TalksPage.title')}</Typography.Title>
      <NavigationCard
        title={t('TalksPage.createNewTalk')}
        route="/dashboard/talks/create/configure"
        text={t('TalksPage.createNewTalkInfo')}
      />
      {isLoading && <LoadingSpinner />}
      <FlexWrap>
        {data?.map(talk => (
          <NavigationCard
            title={talk.topic}
            route={`/dashboard/talks/${talk.id}`}
            key={talk.id}
            text={talk.category}
          />
        ))}
      </FlexWrap>
    </PageWrapper>
  );
};

const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
`;

export default TalksPage;
