'use client';
import { theme } from 'antd';
import { PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyle';

const AppThemeProvider = ({ children }: PropsWithChildren) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);

export default AppThemeProvider;
