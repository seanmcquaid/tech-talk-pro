'use client';
import { Layout, Typography } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';

const NotFoundPage = () => {
  return (
    <FullHeightLayout>
      <StyledContent>
        <Typography.Title>{'Not Found'}</Typography.Title>
        <Link href="/">{'Go Home'}</Link>
      </StyledContent>
    </FullHeightLayout>
  );
};

const FullHeightLayout = styled(Layout)`
  height: 100%;
  width: 100%;
`;

const StyledContent = styled(Layout.Content)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default NotFoundPage;
