'use client';
import React from 'react';
import { Space, Spin, Layout } from 'antd';

const Loading: React.FC = () => (
  <Layout>
    <Layout.Content>
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </Layout.Content>
  </Layout>
);

export default Loading;
