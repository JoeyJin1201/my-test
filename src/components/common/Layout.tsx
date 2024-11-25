import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import AppHeader from './Header';
import AppFooter from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader />
      <Layout.Content style={{ padding: '0 50px', marginTop: '64px' }}>
        {children}
      </Layout.Content>
      <AppFooter />
    </Layout>
  );
};

export default AppLayout;
