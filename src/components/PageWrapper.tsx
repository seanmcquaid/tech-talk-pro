'use client';
import { Layout } from 'antd';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface PageWrapperProps extends PropsWithChildren {
  isCentered?: boolean;
}

const PageWrapper = ({ children, isCentered = false }: PageWrapperProps) => {
  return (
    <StyledLayout>
      <StyledContent $isCentered={isCentered}>{children}</StyledContent>
    </StyledLayout>
  );
};

const StyledLayout = styled(Layout)`
  height: 100%;
  width: 100%;
`;

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
