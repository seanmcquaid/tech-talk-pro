'use client';
import NavigationCard from '@/components/NavigationCard';
import PageWrapper from '@/components/PageWrapper';
import useAppTranslation from '@/hooks/useAppTranslation';
import { useGetTalksQuery } from '@/store/talksApi';
import { Typography } from 'antd';

const TalksPage = () => {
  const { t } = useAppTranslation();
  const { data } = useGetTalksQuery();

  return (
    <PageWrapper>
      <Typography.Title>{t('Talks.title')}</Typography.Title>
      <NavigationCard
        title={t('Talks.createNewTalk')}
        route="/dashboard/talks/create/configure"
        text={t('Talks.createNewTalkInfo')}
      />
      {data?.map(talk => (
        <NavigationCard
          title={talk.title}
          text={talk.topic}
          route={`/dashboard/talks/${talk.id}`}
          key={talk.id}
        />
      ))}
    </PageWrapper>
  );
};

export default TalksPage;
