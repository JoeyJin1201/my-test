import React from 'react';
import { Layout, Typography, Card } from 'antd';

import AdminProfile from '@/components/backend/AdminProfile';

import withAuth from '@/hoc/withAuth';

const { Title } = Typography;
const { Content } = Layout;

const ProfileAdminPage: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Content style={{ padding: '24px' }}>
        <Title level={3} style={{ marginBottom: '16px' }}>
          Profile Management
        </Title>
        <Card style={{ padding: '16px' }}>
          <AdminProfile />
        </Card>
      </Content>
    </Layout>
  );
};

export default withAuth(ProfileAdminPage);
