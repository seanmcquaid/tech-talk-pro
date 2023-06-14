import { Analytics } from '@vercel/analytics/react';
import { ClerkProvider } from '@clerk/nextjs';
import StyledComponentsRegistry from '@/styles/StyledComponentsRegistry';
import ReduxProvider from '@/store/ReduxProvider';
import InitializeApp from '@/components/InitializeApp';
import '@/i18n/client';
import 'antd/dist/reset.css';
import { PropsWithChildren } from 'react';
import GlobalStyle from '@/styles/GlobalStyle';
import AppLayout from '@/components/AppLayout';
import '@/env.client';
import '@/env.server';

export const metadata = {
  title: 'Tech Talk Pro',
  description: 'Helping first time speakers get on stage!',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <ClerkProvider>
      <StyledComponentsRegistry>
        <GlobalStyle />
        <html lang="en-US">
          <Analytics />
          <body>
            <ReduxProvider>
              <InitializeApp>
                <AppLayout>{children}</AppLayout>
              </InitializeApp>
            </ReduxProvider>
          </body>
        </html>
      </StyledComponentsRegistry>
    </ClerkProvider>
  );
};

export default RootLayout;
