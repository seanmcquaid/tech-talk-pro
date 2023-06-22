'use client';
import useAppTranslation from '@/hooks/useAppTranslation';
import { Card, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const Dashboard = () => {
  const router = useRouter();
  const { t } = useAppTranslation();

  return (
    <>
      <StyledCard
        title={t('Dashboard.talksCardTitle')}
        size="default"
        onClick={() => router.push('/dashboard/talks')}
      >
        <Typography.Paragraph>
          {t('Dashboard.talksCardInfo')}
        </Typography.Paragraph>
      </StyledCard>
    </>
  );
};

const StyledCard = styled(Card)`
  cursor: pointer;
`;

export default Dashboard;
