'use client';
import { UserButton, useSession } from '@clerk/nextjs';
import { Layout, theme, Menu } from 'antd';
import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

const { Header, Footer, Sider, Content } = Layout;

const AppLayout = ({ children }: PropsWithChildren) => {
  const {
    token: { colorBgLayout },
  } = theme.useToken();
  const { session } = useSession();
  const router = useRouter();

  const handleClickItem = ({ key }: { key: string }) => {
    if (key === '/user') return;
    router.push(key);
  };

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
              key: '/user',
              disabled: !session,
            },
            { label: 'Home', key: '/' },
            { label: 'Dashboard', key: '/dashboard' },
          ]}
          onClick={handleClickItem}
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
