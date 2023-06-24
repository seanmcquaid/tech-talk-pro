'use client';
import PageWrapper from '@/components/PageWrapper';
import useAppTranslation from '@/hooks/useAppTranslation';
import { Card, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const Dashboard = () => {
  const router = useRouter();
  const { t } = useAppTranslation();

  return (
    <PageWrapper>
      <StyledCard
        title={t('Dashboard.talksCardTitle')}
        size="default"
        onClick={() => router.push('/dashboard/talks')}
      >
        <Typography.Paragraph>
          {t('Dashboard.talksCardInfo')}
        </Typography.Paragraph>
      </StyledCard>
    </PageWrapper>
  );
};

const StyledCard = styled(Card)`
  cursor: pointer;
`;

export default Dashboard;
