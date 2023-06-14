'use client';

import { Button, Layout, Typography } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';

interface ErrorPageProps {
  reset: () => void;
  title?: string;
}

const ErrorPage: FC<ErrorPageProps> = ({ reset, title }) => {
  return (
    <FullHeightLayout>
      <StyledContent>
        <Typography.Title>
          {title ? title : 'Something went wrong!'}
        </Typography.Title>
        <Button type="primary" onClick={reset} size="large">
          {'Try again'}
        </Button>
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

export default ErrorPage;
