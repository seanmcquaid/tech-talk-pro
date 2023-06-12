import { Analytics } from '@vercel/analytics/react';
import { ClerkProvider } from '@clerk/nextjs';
import StyledComponentsRegistry from '@/theme/StyledComponentsRegistry';
import ReduxProvider from '@/store/ReduxProvider';
import InitializeApp from '@/components/InitializeApp';
import '@/i18n/client';
import 'antd/dist/reset.css';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en-US">
        <Analytics />
        <body>
          <StyledComponentsRegistry>
            <ReduxProvider>
              <InitializeApp>{children}</InitializeApp>
            </ReduxProvider>
          </StyledComponentsRegistry>
        </body>
      </html>
    </ClerkProvider>
  );
}
