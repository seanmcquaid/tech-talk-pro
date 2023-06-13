'use client'; // Error components must be Client Components

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
          {title ? title : 'Something went wrong'}
        </Typography.Title>
        <Button type="primary" onClick={reset}>
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
`;

export default ErrorPage;
