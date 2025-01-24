import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const AppLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Layout.Content style={{ padding: '0 50px', marginTop: 24 }}>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default AppLayout;