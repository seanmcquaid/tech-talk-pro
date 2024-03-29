'use client';
import { Layout } from 'antd';
import type { PropsWithChildren } from 'react';
import styled from 'styled-components';
import LoadingSpinner from './LoadingSpinner';

interface PageWrapperProps extends PropsWithChildren {
  isCentered?: boolean;
  isLoading?: boolean;
}

const PageWrapper = ({
  children,
  isCentered = false,
  isLoading = false,
}: PageWrapperProps) => {
  return (
    <StyledContent $isCentered={isCentered}>
      {isLoading ? <LoadingSpinner /> : <>{children}</>}
    </StyledContent>
  );
};

const StyledContent = styled(Layout.Content)<{ $isCentered: boolean }>`
  padding: 16px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${({ $isCentered }) => ($isCentered ? 'center' : 'flex-start')};
  justify-content: ${({ $isCentered }) =>
    $isCentered ? 'center' : 'flex-start'};
`;

export default PageWrapper;
