'use client';
import NavigationCard from '@/components/NavigationCard';
import PageWrapper from '@/components/PageWrapper';
import useAppTranslation from '@/hooks/useAppTranslation';

const Dashboard = () => {
  const { t } = useAppTranslation();

  return (
    <PageWrapper>
      <NavigationCard
        title={t('Dashboard.talksCardTitle')}
        route="/dashboard/talks"
        text={t('Dashboard.talksCardInfo')}
      />
    </PageWrapper>
  );
};

export default Dashboard;
