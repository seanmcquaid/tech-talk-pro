'use client';
import { UserButton, useSession } from '@clerk/nextjs';
import { Layout, theme, Menu } from 'antd';
import { FC, PropsWithChildren } from 'react';

const { Header, Footer, Sider, Content } = Layout;

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  const {
    token: { colorBgLayout },
  } = theme.useToken();
  const { session } = useSession();

  return (
    <Layout
      hasSider
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <Sider breakpoint="md">
        <Menu
          theme="dark"
          mode="inline"
          items={[
            {
              icon: <UserButton afterSignOutUrl="/" />,
              key: 'user',
              disabled: !session,
            },
            { label: 'Dashboard', key: 'dashboard' },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgLayout }} />
        <Content
          style={{
            padding: '16px',
            height: '100%',
            width: '100%',
          }}
        >
          {children}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default AppLayout;
