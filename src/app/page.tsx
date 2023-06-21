'use client';
import { UserButton, useSession } from '@clerk/nextjs';
import { Button, Layout } from 'antd';
import { useRouter } from 'next/navigation';

const { Header, Footer, Content } = Layout;

const Home = () => {
  const { session } = useSession();
  const router = useRouter();

  return (
    <Layout
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        {session ? (
          <UserButton />
        ) : (
          <Button type="link" onClick={() => router.push('/sign-in')}>
            Sign In
          </Button>
        )}
      </Header>
      <Layout>
        <Content
          style={{
            padding: '16px',
            height: '100%',
            width: '100%',
          }}
        >
          main content
        </Content>
      </Layout>
      <Footer>SeanMcQuaidCode 2023</Footer>
    </Layout>
  );
};

export default Home;
